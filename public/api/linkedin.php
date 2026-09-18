<?php
/**
 * Latest LinkedIn company posts, as headline + date + link, for the header news ticker.
 *
 * LinkedIn does not let a browser read a company page directly, so the server does it and
 * this endpoint returns only what the ticker shows. Configure ONE source in config.php:
 *
 *   'linkedin' => array(
 *     // A: any RSS/Atom/JSON feed of the company page (rss.app, Zapier, Make, ...).
 *     'feed_url' => 'https://rss.app/feeds/XXXX.xml',
 *
 *     // B: LinkedIn's own API. Needs a developer app approved for the Community
 *     //    Management API; the token has to be refreshed before it expires.
 *     'access_token'    => '...',
 *     'organization_id' => '12345678',   // digits from the company page admin URL
 *   ),
 *
 * With neither set this returns an empty list, and the ticker falls back to the
 * announcements managed in Admin > News updates. Results are cached for 30 minutes so a
 * slow or rate-limited LinkedIn never slows the site down; a stale cache is served if a
 * refresh fails.
 */
require __DIR__ . '/_lib.php';

define('LINKEDIN_CACHE_TTL', 1800);
define('LINKEDIN_MAX_POSTS', 12);
define('LINKEDIN_MAX_TITLE', 140);

function linkedin_config() {
    if (!file_exists(__DIR__ . '/config.php')) return array();
    $cfg = cfg();
    return isset($cfg['linkedin']) && is_array($cfg['linkedin']) ? $cfg['linkedin'] : array();
}

function linkedin_cache_path() {
    return sys_get_temp_dir() . '/jsan-linkedin-feed.json';
}

function linkedin_read_cache($max_age) {
    $path = linkedin_cache_path();
    if (!file_exists($path)) return null;
    if ($max_age !== null && (time() - filemtime($path)) > $max_age) return null;
    $data = json_decode((string) file_get_contents($path), true);
    return is_array($data) ? $data : null;
}

function linkedin_http_get($url, $headers = array()) {
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT        => 10,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_USERAGENT      => 'JSAN-Website/1.0',
            CURLOPT_HTTPHEADER     => $headers,
        ));
        $body = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return ($body !== false && $status >= 200 && $status < 300) ? $body : null;
    }
    $context = stream_context_create(array('http' => array(
        'timeout' => 10,
        'header'  => implode("\r\n", array_merge(array('User-Agent: JSAN-Website/1.0'), $headers)),
    )));
    $body = @file_get_contents($url, false, $context);
    return $body === false ? null : $body;
}

function linkedin_sort_newest_first($a, $b) {
    return strcmp($b['date'], $a['date']);
}

/* mbstring is not guaranteed on shared hosting; fall back to byte-safe trimming. */
function linkedin_strlen($text) {
    return function_exists('mb_strlen') ? mb_strlen($text, 'UTF-8') : strlen($text);
}

function linkedin_substr($text, $length) {
    if (function_exists('mb_substr')) return mb_substr($text, 0, $length, 'UTF-8');
    $cut = substr($text, 0, $length);
    // Do not leave half a multi-byte character behind.
    return preg_replace('/[\x80-\xBF]*$|[\xC0-\xFD][\x80-\xBF]*$/', '', $cut);
}

/** First meaningful line of a post, trimmed to a ticker-sized headline. */
function linkedin_headline($text) {
    $text = strip_tags((string) $text);
    $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
    $text = preg_replace('/https?:\/\/\S+/u', '', $text);
    $lines = preg_split('/\R+/u', $text);
    $headline = '';
    foreach ($lines as $line) {
        $line = trim(preg_replace('/\s+/u', ' ', $line));
        if ($line !== '' && linkedin_strlen($line) > 3) { $headline = $line; break; }
    }
    if ($headline === '') return '';
    if (linkedin_strlen($headline) > LINKEDIN_MAX_TITLE) {
        $headline = rtrim(linkedin_substr($headline, LINKEDIN_MAX_TITLE - 1));
        $headline = preg_replace('/[\s\p{P}]+$/u', '', $headline) . '…';
    }
    return $headline;
}

function linkedin_post($title, $timestamp, $href) {
    $title = linkedin_headline($title);
    if ($title === '' || !$timestamp) return null;
    if (!is_string($href) || !preg_match('#^https://([a-z0-9-]+\.)*linkedin\.com/#i', $href)) {
        $href = 'https://www.linkedin.com/company/jsan-consulting-group/posts/?feedView=all';
    }
    return array('title' => $title, 'date' => gmdate('Y-m-d', $timestamp), 'href' => $href);
}

/** RSS, Atom or JSON Feed from a LinkedIn-to-feed service. */
function linkedin_from_feed($url) {
    $body = linkedin_http_get($url);
    if ($body === null) return null;
    $posts = array();

    $trimmed = ltrim($body);
    if ($trimmed !== '' && ($trimmed[0] === '{' || $trimmed[0] === '[')) {
        $data = json_decode($body, true);
        if (!is_array($data)) return null;
        $items = isset($data['items']) ? $data['items'] : (isset($data['posts']) ? $data['posts'] : $data);
        if (!is_array($items)) return null;
        foreach ($items as $item) {
            if (!is_array($item)) continue;
            $text = isset($item['title']) ? $item['title'] : (isset($item['content_text']) ? $item['content_text'] : (isset($item['summary']) ? $item['summary'] : ''));
            $when = isset($item['date_published']) ? $item['date_published'] : (isset($item['pubDate']) ? $item['pubDate'] : (isset($item['published']) ? $item['published'] : ''));
            $link = isset($item['url']) ? $item['url'] : (isset($item['link']) ? $item['link'] : '');
            $stamp = strtotime((string) $when);
            $post = linkedin_post($text, $stamp, $link);
            if ($post) $posts[] = $post;
        }
        return $posts;
    }

    $previous = libxml_use_internal_errors(true);
    $xml = simplexml_load_string($body);
    libxml_clear_errors();
    libxml_use_internal_errors($previous);
    if ($xml === false) return null;

    if (isset($xml->channel->item)) {
        foreach ($xml->channel->item as $item) {
            $text = (string) $item->title;
            if (trim($text) === '') $text = (string) $item->description;
            $post = linkedin_post($text, strtotime((string) $item->pubDate), (string) $item->link);
            if ($post) $posts[] = $post;
        }
        return $posts;
    }
    if (isset($xml->entry)) {
        foreach ($xml->entry as $entry) {
            $link = '';
            if (isset($entry->link['href'])) $link = (string) $entry->link['href'];
            $when = (string) (isset($entry->published) ? $entry->published : $entry->updated);
            $text = (string) $entry->title;
            if (trim($text) === '') $text = (string) $entry->summary;
            $post = linkedin_post($text, strtotime($when), $link);
            if ($post) $posts[] = $post;
        }
        return $posts;
    }
    return null;
}

/** LinkedIn REST API (Community Management). */
function linkedin_from_api($token, $organization_id) {
    $author = rawurlencode('urn:li:organization:' . $organization_id);
    $url = 'https://api.linkedin.com/rest/posts?author=' . $author . '&q=author&count=' . LINKEDIN_MAX_POSTS . '&sortBy=LAST_MODIFIED';
    $body = linkedin_http_get($url, array(
        'Authorization: Bearer ' . $token,
        'LinkedIn-Version: ' . gmdate('Ym', strtotime('-1 month')),
        'X-Restli-Protocol-Version: 2.0.0',
    ));
    if ($body === null) return null;
    $data = json_decode($body, true);
    if (!is_array($data) || !isset($data['elements']) || !is_array($data['elements'])) return null;

    $posts = array();
    foreach ($data['elements'] as $element) {
        if (!is_array($element)) continue;
        $text = isset($element['commentary']) ? $element['commentary'] : '';
        $created = isset($element['createdAt']) ? intval($element['createdAt'] / 1000) : 0;
        $urn = isset($element['id']) ? $element['id'] : '';
        $href = $urn ? 'https://www.linkedin.com/feed/update/' . rawurlencode($urn) . '/' : '';
        $post = linkedin_post($text, $created, $href);
        if ($post) $posts[] = $post;
    }
    return $posts;
}

function linkedin_fetch() {
    $config = linkedin_config();
    if (!empty($config['feed_url'])) {
        $posts = linkedin_from_feed($config['feed_url']);
        if ($posts !== null) return $posts;
    }
    if (!empty($config['access_token']) && !empty($config['organization_id'])) {
        $posts = linkedin_from_api($config['access_token'], $config['organization_id']);
        if ($posts !== null) return $posts;
    }
    return null;
}

if (method() !== 'GET') send_json(array('error' => 'Method not allowed'), 405);

$config = linkedin_config();
if (empty($config['feed_url']) && empty($config['access_token'])) {
    // Not configured: an empty list, not an error, so the ticker just uses its own updates.
    header('Cache-Control: public, max-age=900');
    send_json(array());
}

$fresh = isset($_GET['refresh']) && verify_token(bearer_token());
$cached = $fresh ? null : linkedin_read_cache(LINKEDIN_CACHE_TTL);
if ($cached !== null) {
    header('Cache-Control: public, max-age=900');
    send_json($cached);
}

$posts = linkedin_fetch();
if ($posts === null) {
    // Upstream failed: serve whatever was cached last, however old, rather than nothing.
    $stale = linkedin_read_cache(null);
    header('Cache-Control: public, max-age=300');
    send_json($stale === null ? array() : $stale);
}

usort($posts, 'linkedin_sort_newest_first');
$posts = array_slice($posts, 0, LINKEDIN_MAX_POSTS);
@file_put_contents(linkedin_cache_path(), json_encode($posts));
header('Cache-Control: public, max-age=900');
send_json($posts);

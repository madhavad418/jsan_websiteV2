<?php
/** Admin-managed ticker announcements. Public reads never expose drafts. */
require __DIR__ . '/_lib.php';
header('Cache-Control: no-store');
$method = method();
$admin = isset($_GET['all']) || $method !== 'GET';
if ($admin) require_admin();
$pdo = db();

try {
    // Add this independent table on the first authenticated admin visit.
    // Existing blog/job tables and data are not changed.
    if ($admin) {
        $pdo->exec("CREATE TABLE IF NOT EXISTS news_updates (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(180) NOT NULL,
            date DATE NOT NULL,
            href VARCHAR(500) NOT NULL DEFAULT '/insights',
            published TINYINT(1) NOT NULL DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    }

    if ($method === 'GET') {
        $sql = 'SELECT id, title, date, href, published FROM news_updates';
        if (!$admin) $sql .= ' WHERE published = 1 AND date <= UTC_DATE()';
        $sql .= ' ORDER BY date DESC, id DESC';
        if (!$admin) $sql .= ' LIMIT 6';
        $rows = $pdo->query($sql)->fetchAll();
        foreach ($rows as &$row) {
            $row['id'] = intval($row['id']);
            $row['published'] = (bool) intval($row['published']);
        }
        unset($row);
        send_json($rows);
    }

    if ($method === 'POST' && isset($_GET['delete'])) {
        $id = filter_var(isset($_GET['id']) ? $_GET['id'] : '', FILTER_VALIDATE_INT, array('options' => array('min_range' => 1)));
        if (!$id) send_json(array('error' => 'A valid update ID is required'), 422);
        $st = $pdo->prepare('DELETE FROM news_updates WHERE id = ?');
        $st->execute(array($id));
        if (!$st->rowCount()) send_json(array('error' => 'Update not found'), 404);
        send_json(array('ok' => true));
    }

    if ($method === 'POST') {
        $x = body_json();
        foreach (array('title', 'date', 'href') as $key) {
            if (!isset($x[$key]) || !is_string($x[$key])) send_json(array('error' => 'Headline, date and link are required'), 422);
        }
        $title = trim($x['title']);
        $date = DateTime::createFromFormat('!Y-m-d', $x['date']);
        $href = trim($x['href']);
        if ($title === '' || preg_match_all('/./us', $title) > 180) send_json(array('error' => 'Headline must contain 1–180 characters'), 422);
        if (!$date || $date->format('Y-m-d') !== $x['date']) send_json(array('error' => 'Enter a valid date'), 422);
        // Only local website destinations; never javascript: or protocol-relative URLs.
        if (strlen($href) > 500 || !preg_match('~^/(?!/)~', $href) || preg_match('/[\\\\\x00-\x20]/', $href)) {
            send_json(array('error' => 'Use a website path such as /insights or /news/jsan-atlas-ops'), 422);
        }
        if (!isset($x['published']) || !is_bool($x['published'])) send_json(array('error' => 'Choose draft or published status'), 422);
        $values = array($title, $x['date'], $href, $x['published'] ? 1 : 0);
        if (isset($x['id'])) {
            $id = filter_var($x['id'], FILTER_VALIDATE_INT, array('options' => array('min_range' => 1)));
            if (!$id) send_json(array('error' => 'Invalid update ID'), 422);
            $check = $pdo->prepare('SELECT id FROM news_updates WHERE id = ?');
            $check->execute(array($id));
            if (!$check->fetch()) send_json(array('error' => 'Update not found'), 404);
            $values[] = $id;
            $st = $pdo->prepare('UPDATE news_updates SET title=?, date=?, href=?, published=? WHERE id=?');
        } else {
            $st = $pdo->prepare('INSERT INTO news_updates (title,date,href,published) VALUES (?,?,?,?)');
        }
        $st->execute($values);
        send_json(array('ok' => true));
    }
    send_json(array('error' => 'Method not allowed'), 405);
} catch (Exception $e) {
    error_log('News updates API: ' . $e->getMessage());
    send_json(array('error' => 'News updates are unavailable. Check the API deployment and database setup.'), 503);
}

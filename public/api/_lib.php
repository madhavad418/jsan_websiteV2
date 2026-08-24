<?php
/**
 * Shared helpers for the JSAN admin API (PHP 7.1+ compatible).
 * Same-origin (jsanconsulting.com) so no CORS needed.
 */

function cfg() {
  static $c = null;
  if ($c === null) {
    $path = __DIR__ . '/config.php';
    if (!file_exists($path)) {
      send_json(array('error' => 'Server not configured (config.php missing)'), 500);
    }
    $c = require $path;
  }
  return $c;
}

function db() {
  static $pdo = null;
  if ($pdo === null) {
    $d = cfg()['db'];
    $dsn = 'mysql:host=' . $d['host'] . ';dbname=' . $d['name'] . ';charset=' . $d['charset'];
    try {
      $pdo = new PDO($dsn, $d['user'], $d['pass'], array(
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
      ));
    } catch (Exception $e) {
      send_json(array('error' => 'Database connection failed'), 500);
    }
  }
  return $pdo;
}

function send_json($data, $code = 200) {
  http_response_code($code);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data);
  exit;
}

function method() {
  return isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
}

function body_json() {
  $raw = file_get_contents('php://input');
  $d = json_decode($raw, true);
  return is_array($d) ? $d : array();
}

/* ---- auth: stateless HMAC tokens ---- */

function sign_token($payload) {
  $c = cfg();
  $payload['exp'] = time() + intval($c['token_ttl']);
  $body = rtrim(strtr(base64_encode(json_encode($payload)), '+/', '-_'), '=');
  $sig  = hash_hmac('sha256', $body, $c['token_secret']);
  return $body . '.' . $sig;
}

function verify_token($token) {
  $c = cfg();
  $parts = explode('.', (string) $token);
  if (count($parts) !== 2) return false;
  $expected = hash_hmac('sha256', $parts[0], $c['token_secret']);
  if (!hash_equals($expected, $parts[1])) return false;
  $json = base64_decode(strtr($parts[0], '-_', '+/'));
  $payload = json_decode($json, true);
  if (!is_array($payload) || !isset($payload['exp']) || $payload['exp'] < time()) return false;
  return $payload;
}

function bearer_token() {
  // Prefer a custom header (Apache often strips Authorization).
  if (!empty($_SERVER['HTTP_X_AUTH_TOKEN'])) return $_SERVER['HTTP_X_AUTH_TOKEN'];
  $auth = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
  if (!$auth && function_exists('apache_request_headers')) {
    $h = apache_request_headers();
    if (isset($h['Authorization'])) $auth = $h['Authorization'];
    if (isset($h['X-Auth-Token'])) return $h['X-Auth-Token'];
  }
  if (stripos($auth, 'Bearer ') === 0) return substr($auth, 7);
  return '';
}

function require_admin() {
  if (!verify_token(bearer_token())) {
    send_json(array('error' => 'Unauthorized'), 401);
  }
}

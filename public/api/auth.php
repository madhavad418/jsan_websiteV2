<?php
/** POST { username, password } -> { token }.  Used by the /admin login. */
require __DIR__ . '/_lib.php';

if (method() !== 'POST') send_json(array('error' => 'Method not allowed'), 405);

$b = body_json();
$u = isset($b['username']) ? trim($b['username']) : '';
$p = isset($b['password']) ? (string) $b['password'] : '';
$a = cfg()['admin'];

if (!hash_equals($a['username'], $u) || !password_verify($p, $a['password_hash'])) {
  send_json(array('error' => 'Invalid credentials'), 401);
}

send_json(array('token' => sign_token(array('u' => $u))));

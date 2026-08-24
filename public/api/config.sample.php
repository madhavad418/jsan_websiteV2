<?php
/**
 * Copy this file to `config.php` ON THE SERVER ONLY (never commit the real one).
 * The cpanel deploy never overwrites or deletes remote-only files, so config.php
 * (with the real secrets) survives every `cpanel --prod`.
 *
 * Generate the admin password hash locally with:
 *   php -r "echo password_hash('YourStrongPassword', PASSWORD_DEFAULT), PHP_EOL;"
 */
return array(
  'db' => array(
    'host'    => 'localhost',
    'name'    => 'REPLACE_DB_NAME',     // e.g. reddy13_jsan
    'user'    => 'REPLACE_DB_USER',     // e.g. reddy13_jsanadmin
    'pass'    => 'REPLACE_DB_PASSWORD',
    'charset' => 'utf8mb4',
  ),
  // Admin login for the /admin panel
  'admin' => array(
    'username'      => 'admin',
    'password_hash' => 'REPLACE_WITH_password_hash_OUTPUT',
  ),
  // Long random string used to sign session tokens (HMAC). Keep secret.
  'token_secret' => 'REPLACE_WITH_LONG_RANDOM_STRING',
  'token_ttl'    => 28800, // seconds (8 hours)
  // One-time token required to run migrate.php (then you can blank it out).
  'setup_token'  => 'REPLACE_WITH_RANDOM_SETUP_TOKEN',
);

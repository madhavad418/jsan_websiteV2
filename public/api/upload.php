<?php
/**
 * Admin image upload. POST multipart/form-data with field "file" + X-Auth-Token.
 * Saves into /uploads and returns { url: "/uploads/<name>" }.
 */
require __DIR__ . '/_lib.php';
require_admin();

if (method() !== 'POST') send_json(array('error' => 'Method not allowed'), 405);
if (empty($_FILES['file']) || !isset($_FILES['file']['tmp_name'])) send_json(array('error' => 'No file uploaded'), 422);

$f = $_FILES['file'];
if ($f['error'] !== UPLOAD_ERR_OK) send_json(array('error' => 'Upload error code ' . $f['error']), 422);
if ($f['size'] > 12 * 1024 * 1024) send_json(array('error' => 'File too large (max 12MB)'), 422);

$allowed = array(
  'image/jpeg' => 'jpg',
  'image/png'  => 'png',
  'image/webp' => 'webp',
  'image/gif'  => 'gif',
  'image/avif' => 'avif',
);
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($f['tmp_name']);
if (!isset($allowed[$mime])) send_json(array('error' => 'Unsupported image type: ' . $mime), 422);
$ext = $allowed[$mime];

$dir = dirname(__DIR__) . '/uploads';  // public_html/uploads
if (!is_dir($dir) && !@mkdir($dir, 0755, true)) send_json(array('error' => 'Could not create uploads folder'), 500);

$base = preg_replace('/[^a-z0-9]+/', '-', strtolower(pathinfo($f['name'], PATHINFO_FILENAME)));
$base = trim($base, '-');
if ($base === '') $base = 'image';
$name = substr($base, 0, 60) . '-' . substr(bin2hex(random_bytes(4)), 0, 8) . '.' . $ext;

if (!move_uploaded_file($f['tmp_name'], $dir . '/' . $name)) {
  send_json(array('error' => 'Could not save file'), 500);
}

send_json(array('ok' => true, 'url' => '/uploads/' . $name));

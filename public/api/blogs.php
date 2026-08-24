<?php
/**
 * Blogs API.
 *   GET  /api/blogs.php                -> published blogs (date desc)
 *   GET  /api/blogs.php?all=1          -> all incl. hidden  (admin)
 *   GET  /api/blogs.php?slug=xxx       -> single blog
 *   POST /api/blogs.php                -> create/update (admin), body = blog JSON
 *   DELETE /api/blogs.php?slug=xxx     -> delete (admin)
 */
require __DIR__ . '/_lib.php';
$pdo = db();
$m = method();

function blog_out($r) {
  $content = json_decode($r['content'], true);
  if ($content === null && $r['content'] !== null) $content = $r['content']; // plain string fallback
  return array(
    'slug' => $r['slug'], 'title' => $r['title'], 'excerpt' => $r['excerpt'],
    'category' => $r['category'], 'date' => $r['date'], 'readTime' => $r['read_time'],
    'image' => $r['image'], 'backgroundImage' => $r['background_image'], 'author' => $r['author'],
    'content' => $content, 'hidden' => (bool) intval($r['hidden']),
  );
}

if ($m === 'GET') {
  if (!empty($_GET['slug'])) {
    $st = $pdo->prepare('SELECT * FROM blogs WHERE slug = ?');
    $st->execute(array($_GET['slug']));
    $row = $st->fetch();
    if (!$row) send_json(array('error' => 'Not found'), 404);
    send_json(blog_out($row));
  }
  $where = isset($_GET['all']) ? '' : ' WHERE hidden = 0';
  $rows = $pdo->query('SELECT * FROM blogs' . $where . ' ORDER BY date DESC, id DESC')->fetchAll();
  send_json(array_map('blog_out', $rows));
}

// ---- writes require admin ----
require_admin();

// Delete: DELETE method, or POST ?delete=1 (some shared hosts block DELETE).
if ($m === 'DELETE' || ($m === 'POST' && isset($_GET['delete']))) {
  $slug = !empty($_GET['slug']) ? $_GET['slug'] : '';
  if (!$slug) { $bb = body_json(); $slug = isset($bb['slug']) ? $bb['slug'] : ''; }
  if (!$slug) send_json(array('error' => 'slug required'), 422);
  try {
    $st = $pdo->prepare('DELETE FROM blogs WHERE slug = ?');
    $st->execute(array($slug));
  } catch (Exception $e) {
    send_json(array('error' => 'delete failed', 'detail' => $e->getMessage()), 500);
  }
  send_json(array('ok' => true, 'deleted' => $st->rowCount()));
}

if ($m === 'POST' || $m === 'PUT') {
  $x = body_json();
  if (empty($x['slug']) || empty($x['title'])) send_json(array('error' => 'slug and title are required'), 422);
  $st = $pdo->prepare("INSERT INTO blogs (slug,title,excerpt,category,date,read_time,image,background_image,author,content,hidden)
    VALUES (:slug,:title,:excerpt,:category,:date,:read_time,:image,:background_image,:author,:content,:hidden)
    ON DUPLICATE KEY UPDATE title=VALUES(title),excerpt=VALUES(excerpt),category=VALUES(category),date=VALUES(date),
      read_time=VALUES(read_time),image=VALUES(image),background_image=VALUES(background_image),author=VALUES(author),
      content=VALUES(content),hidden=VALUES(hidden)");
  $st->execute(array(
    ':slug' => $x['slug'], ':title' => $x['title'], ':excerpt' => isset($x['excerpt']) ? $x['excerpt'] : '',
    ':category' => isset($x['category']) ? $x['category'] : '', ':date' => isset($x['date']) ? $x['date'] : null,
    ':read_time' => isset($x['readTime']) ? $x['readTime'] : '', ':image' => isset($x['image']) ? $x['image'] : '',
    ':background_image' => isset($x['backgroundImage']) ? $x['backgroundImage'] : null,
    ':author' => isset($x['author']) ? $x['author'] : '',
    ':content' => is_string($x['content']) ? $x['content'] : json_encode(isset($x['content']) ? $x['content'] : array()),
    ':hidden' => !empty($x['hidden']) ? 1 : 0,
  ));
  send_json(array('ok' => true, 'slug' => $x['slug']));
}

send_json(array('error' => 'Method not allowed'), 405);

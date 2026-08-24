<?php
/**
 * Jobs API (careers).
 *   GET  /api/jobs.php             -> all jobs (sort_order)
 *   GET  /api/jobs.php?id=xxx      -> single job
 *   POST /api/jobs.php             -> create/update (admin), body = job JSON
 *   DELETE /api/jobs.php?id=xxx    -> delete (admin)
 */
require __DIR__ . '/_lib.php';
$pdo = db();
$m = method();

// Human "posted" label derived from the created_at epoch (UTC, TZ-safe via
// UNIX_TIMESTAMP). This replaces the old free-text "posted" column that stayed
// frozen at "Just now" forever; it now ages (Just now -> 2 days ago -> ...).
function relative_posted($epoch) {
  $epoch = intval($epoch);
  if ($epoch <= 0) return 'Recently';
  $diff = time() - $epoch;
  if ($diff < 0) $diff = 0;
  if ($diff < 60) return 'Just now';
  $units = array(
    array(31536000, 'year'), array(2592000, 'month'), array(604800, 'week'),
    array(86400, 'day'), array(3600, 'hour'), array(60, 'minute'),
  );
  foreach ($units as $u) {
    if ($diff >= $u[0]) {
      $n = intval(floor($diff / $u[0]));
      return $n . ' ' . $u[1] . ($n === 1 ? '' : 's') . ' ago';
    }
  }
  return 'Just now';
}

function job_out($r) {
  // Prefer the real creation time; fall back to any stored text, else "Recently".
  $posted = !empty($r['created_ts'])
    ? relative_posted($r['created_ts'])
    : (isset($r['posted']) && $r['posted'] !== '' ? $r['posted'] : 'Recently');
  return array(
    'id' => $r['id'], 'title' => $r['title'], 'level' => $r['level'], 'location' => $r['location'],
    'department' => $r['department'], 'type' => $r['type'], 'description' => $r['description'],
    'posted' => $posted, 'fullDescription' => $r['full_description'],
    'requirements' => json_decode($r['requirements'], true) ?: array(),
    'qualifications' => json_decode($r['qualifications'], true) ?: array(),
    'benefits' => json_decode($r['benefits'], true) ?: array(),
    'filled' => !empty($r['filled']),
  );
}

if ($m === 'GET') {
  if (!empty($_GET['id'])) {
    $st = $pdo->prepare('SELECT *, UNIX_TIMESTAMP(created_at) AS created_ts FROM jobs WHERE id = ?');
    $st->execute(array($_GET['id']));
    $row = $st->fetch();
    if (!$row) send_json(array('error' => 'Not found'), 404);
    send_json(job_out($row));
  }
  // Ignore system/test rows (ids prefixed with "__").
  $rows = $pdo->query("SELECT *, UNIX_TIMESTAMP(created_at) AS created_ts FROM jobs WHERE LEFT(id,2) <> '__' ORDER BY sort_order ASC, created_at DESC")->fetchAll();
  send_json(array_map('job_out', $rows));
}

// ---- writes require admin ----
require_admin();

// Delete: DELETE method, or POST ?delete=1 (some shared hosts block DELETE).
if ($m === 'DELETE' || ($m === 'POST' && isset($_GET['delete']))) {
  $id = !empty($_GET['id']) ? $_GET['id'] : '';
  if (!$id) { $bb = body_json(); $id = isset($bb['id']) ? $bb['id'] : ''; }
  if (!$id) send_json(array('error' => 'id required'), 422);
  try {
    $st = $pdo->prepare('DELETE FROM jobs WHERE id = ?');
    $st->execute(array($id));
  } catch (Exception $e) {
    send_json(array('error' => 'delete failed', 'detail' => $e->getMessage()), 500);
  }
  send_json(array('ok' => true, 'deleted' => $st->rowCount()));
}

if ($m === 'POST' || $m === 'PUT') {
  $x = body_json();
  if (empty($x['id']) || empty($x['title'])) send_json(array('error' => 'id and title are required'), 422);
  // New jobs go to the top (lowest sort_order) unless one is provided.
  $sort = isset($x['sortOrder']) ? intval($x['sortOrder'])
        : intval($pdo->query('SELECT COALESCE(MIN(sort_order),0)-1 FROM jobs')->fetchColumn());
  $st = $pdo->prepare("INSERT INTO jobs (id,title,level,location,department,type,description,posted,full_description,requirements,qualifications,benefits,filled,sort_order)
    VALUES (:id,:title,:level,:location,:department,:type,:description,:posted,:full_description,:requirements,:qualifications,:benefits,:filled,:sort_order)
    ON DUPLICATE KEY UPDATE title=VALUES(title),level=VALUES(level),location=VALUES(location),department=VALUES(department),
      type=VALUES(type),description=VALUES(description),posted=VALUES(posted),full_description=VALUES(full_description),
      requirements=VALUES(requirements),qualifications=VALUES(qualifications),benefits=VALUES(benefits),filled=VALUES(filled)");
  $st->execute(array(
    ':id' => $x['id'], ':title' => $x['title'], ':level' => isset($x['level']) ? $x['level'] : '',
    ':location' => isset($x['location']) ? $x['location'] : '', ':department' => isset($x['department']) ? $x['department'] : '',
    ':type' => isset($x['type']) ? $x['type'] : '', ':description' => isset($x['description']) ? $x['description'] : '',
    ':posted' => isset($x['posted']) ? $x['posted'] : '', ':full_description' => isset($x['fullDescription']) ? $x['fullDescription'] : '',
    ':requirements' => json_encode(isset($x['requirements']) ? $x['requirements'] : array()),
    ':qualifications' => json_encode(isset($x['qualifications']) ? $x['qualifications'] : array()),
    ':benefits' => json_encode(isset($x['benefits']) ? $x['benefits'] : array()),
    ':filled' => !empty($x['filled']) ? 1 : 0,
    ':sort_order' => $sort,
  ));
  send_json(array('ok' => true, 'id' => $x['id']));
}

send_json(array('error' => 'Method not allowed'), 405);

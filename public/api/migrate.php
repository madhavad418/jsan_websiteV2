<?php
/**
 * One-time schema setup + optional content seeding.
 * Run once:  https://www.jsanconsulting.com/api/migrate.php?token=YOUR_SETUP_TOKEN
 * Seed:      POST the same URL with JSON { "blogs": [...], "jobs": [...] } and header X-Auth-Token (admin).
 * After setup, blank out setup_token in config.php.
 */
require __DIR__ . '/_lib.php';

$token = isset($_GET['token']) ? $_GET['token'] : '';
if (!hash_equals((string) cfg()['setup_token'], (string) $token)) {
  send_json(array('error' => 'Invalid setup token'), 403);
}

$pdo = db();

$pdo->exec("CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(120),
  date DATE,
  read_time VARCHAR(50),
  image TEXT,
  background_image TEXT,
  author VARCHAR(120),
  content MEDIUMTEXT,        -- JSON array of blocks, or plain string
  hidden TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

$pdo->exec("CREATE TABLE IF NOT EXISTS jobs (
  id VARCHAR(191) PRIMARY KEY,         -- slug-style id, e.g. 'prompt-engineer'
  title TEXT NOT NULL,
  level VARCHAR(60),
  location VARCHAR(160),
  department VARCHAR(120),
  type VARCHAR(60),
  description TEXT,
  posted VARCHAR(60),
  full_description MEDIUMTEXT,
  requirements MEDIUMTEXT,             -- JSON array
  qualifications MEDIUMTEXT,           -- JSON array
  benefits MEDIUMTEXT,                 -- JSON array
  filled TINYINT(1) NOT NULL DEFAULT 0, -- job stays visible but stops accepting applications
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// Idempotent add for databases created before the `filled` column existed.
// (MySQL has no portable ADD COLUMN IF NOT EXISTS, so ignore the duplicate-column error.)
try {
  $pdo->exec("ALTER TABLE jobs ADD COLUMN filled TINYINT(1) NOT NULL DEFAULT 0");
} catch (Exception $e) {
  // Column already exists  safe to ignore.
}

// Optional seeding (admin-authenticated POST).
$seeded = array('blogs' => 0, 'jobs' => 0);
if (method() === 'POST') {
  require_admin();
  $b = body_json();

  if (!empty($b['blogs']) && is_array($b['blogs'])) {
    $st = $pdo->prepare("INSERT INTO blogs (slug,title,excerpt,category,date,read_time,image,background_image,author,content,hidden)
      VALUES (:slug,:title,:excerpt,:category,:date,:read_time,:image,:background_image,:author,:content,:hidden)
      ON DUPLICATE KEY UPDATE title=VALUES(title),excerpt=VALUES(excerpt),category=VALUES(category),date=VALUES(date),
        read_time=VALUES(read_time),image=VALUES(image),background_image=VALUES(background_image),author=VALUES(author),
        content=VALUES(content),hidden=VALUES(hidden)");
    foreach ($b['blogs'] as $x) {
      $st->execute(array(
        ':slug' => $x['slug'], ':title' => $x['title'], ':excerpt' => isset($x['excerpt']) ? $x['excerpt'] : '',
        ':category' => isset($x['category']) ? $x['category'] : '', ':date' => isset($x['date']) ? $x['date'] : null,
        ':read_time' => isset($x['readTime']) ? $x['readTime'] : '', ':image' => isset($x['image']) ? $x['image'] : '',
        ':background_image' => isset($x['backgroundImage']) ? $x['backgroundImage'] : null,
        ':author' => isset($x['author']) ? $x['author'] : '',
        ':content' => is_string($x['content']) ? $x['content'] : json_encode($x['content']),
        ':hidden' => !empty($x['hidden']) ? 1 : 0,
      ));
      $seeded['blogs']++;
    }
  }

  if (!empty($b['jobs']) && is_array($b['jobs'])) {
    $i = 0;
    $st = $pdo->prepare("INSERT INTO jobs (id,title,level,location,department,type,description,posted,full_description,requirements,qualifications,benefits,filled,sort_order)
      VALUES (:id,:title,:level,:location,:department,:type,:description,:posted,:full_description,:requirements,:qualifications,:benefits,:filled,:sort_order)
      ON DUPLICATE KEY UPDATE title=VALUES(title),level=VALUES(level),location=VALUES(location),department=VALUES(department),
        type=VALUES(type),description=VALUES(description),posted=VALUES(posted),full_description=VALUES(full_description),
        requirements=VALUES(requirements),qualifications=VALUES(qualifications),benefits=VALUES(benefits),filled=VALUES(filled),sort_order=VALUES(sort_order)");
    foreach ($b['jobs'] as $x) {
      $st->execute(array(
        ':id' => $x['id'], ':title' => $x['title'], ':level' => isset($x['level']) ? $x['level'] : '',
        ':location' => isset($x['location']) ? $x['location'] : '', ':department' => isset($x['department']) ? $x['department'] : '',
        ':type' => isset($x['type']) ? $x['type'] : '', ':description' => isset($x['description']) ? $x['description'] : '',
        ':posted' => isset($x['posted']) ? $x['posted'] : '', ':full_description' => isset($x['fullDescription']) ? $x['fullDescription'] : '',
        ':requirements' => json_encode(isset($x['requirements']) ? $x['requirements'] : array()),
        ':qualifications' => json_encode(isset($x['qualifications']) ? $x['qualifications'] : array()),
        ':benefits' => json_encode(isset($x['benefits']) ? $x['benefits'] : array()),
        ':filled' => !empty($x['filled']) ? 1 : 0,
        ':sort_order' => $i++,
      ));
      $seeded['jobs']++;
    }
  }
}

send_json(array('ok' => true, 'tables' => array('blogs', 'jobs'), 'seeded' => $seeded));

<?php
require __DIR__ . '/config_admin.php';
header('Content-Type: text/plain');

try {
    $pdoAdmin->exec(
        "CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_admins_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
    );
    echo "Admins table is ready.\n";

    $count = (int)$pdoAdmin->query('SELECT COUNT(*) FROM admins')->fetchColumn();
    echo "Admins count: {$count}\n";

    if (isset($_GET['seed']) && $_GET['seed'] === '1') {
        $email = 'admin@ocaa.local';
        $name  = 'Super Admin';
        $hash  = password_hash('admin123', PASSWORD_DEFAULT);
        $s = $pdoAdmin->prepare('SELECT id FROM admins WHERE email=?');
        $s->execute([$email]);
        if (!$s->fetch()) {
            $ins = $pdoAdmin->prepare('INSERT INTO admins (email, password_hash, full_name) VALUES (?, ?, ?)');
            $ins->execute([$email, $hash, $name]);
            echo "Seeded admin: {$email} / admin123\n";
        } else {
            echo "Admin already exists: {$email}\n";
        }
    }

    echo "All good.\n";
} catch (Throwable $e) {
    http_response_code(500);
    echo 'Error: '.$e->getMessage();
}



<?php
require __DIR__ . '/config.php';

header('Content-Type: text/plain');
echo "DB check starting...\n";

try {
    // Create users table if not exists
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            phone VARCHAR(30) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_users_phone (phone)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
    );
    echo "Users table is ready.\n";

    // Show existing rows count
    $count = (int)$pdo->query('SELECT COUNT(*) FROM users')->fetchColumn();
    echo "Users count: {$count}\n";

    // Show table structure
    $cols = $pdo->query('SHOW COLUMNS FROM users')->fetchAll();
    echo "\nusers columns:\n";
    foreach ($cols as $c) {
        echo "- {$c['Field']} {$c['Type']}\n";
    }

    // Optional: seed a test user if ?seed=1
    if ((isset($_GET['seed']) && $_GET['seed'] === '1')) {
        $phone = '+639000000000';
        $name  = 'Test User';
        $hash  = password_hash('123456', PASSWORD_DEFAULT);
        $stmt  = $pdo->prepare('SELECT id FROM users WHERE phone = ?');
        $stmt->execute([$phone]);
        if (!$stmt->fetch()) {
            $ins = $pdo->prepare('INSERT INTO users (full_name, phone, password_hash) VALUES (?, ?, ?)');
            $ins->execute([$name, $phone, $hash]);
            echo "\nSeeded test user: phone=+639000000000 password=123456\n";
        } else {
            echo "\nTest user already exists: phone=+639000000000 password=123456\n";
        }
    }

    echo "All good.\n";
} catch (Throwable $e) {
    http_response_code(500);
    echo "Error: " . $e->getMessage() . "\n";
}



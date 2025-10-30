<?php
require __DIR__ . '/config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['login'])) {
    header('Location: index.html');
    exit;
}

$phone    = trim($_POST['Number'] ?? '');
$password = $_POST['password'] ?? '';

if ($phone === '' || $password === '') {
    header('Location: index.html');
    exit;
}

$stmt = $pdo->prepare('SELECT id, full_name, password_hash FROM users WHERE phone = ?');
$stmt->execute([$phone]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    header('Location: index.html');
    exit;
}

$_SESSION['user_id'] = (int)$user['id'];
$_SESSION['full_name'] = $user['full_name'];

header('Location: dashboard.html');
exit;



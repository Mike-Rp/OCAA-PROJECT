<?php
require __DIR__ . '/config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['signUp'])) {
    header('Location: index.html');
    exit;
}

$fullName = trim($_POST['FLname'] ?? '');
$phone    = trim($_POST['Number'] ?? '');
$password = $_POST['password'] ?? '';
$confirm  = $_POST['ConfirmPassword'] ?? '';

if ($fullName === '' || $phone === '' || $password === '' || $confirm === '') {
    header('Location: index.html?err=required');
    exit;
}
if ($password !== $confirm) {
    header('Location: index.html?err=nomatch');
    exit;
}
if (!preg_match('/^\+?\d{7,15}$/', $phone)) {
    header('Location: index.html?err=invalid_phone');
    exit;
}

$stmt = $pdo->prepare('SELECT id FROM users WHERE phone = ?');
$stmt->execute([$phone]);
if ($stmt->fetch()) {
    header('Location: index.html?err=duplicate');
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare('INSERT INTO users (full_name, phone, password_hash) VALUES (?, ?, ?)');
try {
    $stmt->execute([$fullName, $phone, $hash]);
} catch (Throwable $e) {
    header('Location: index.html?err=insert');
    exit;
}

// After registration, send user to the login tab only if insert succeeded
header('Location: index.html?login=1&ok=1');
exit;

<?php
require __DIR__ . '/config_admin.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: admin.html');
    exit;
}

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    header('Location: admin.html?err=required');
    exit;
}

$stmt = $pdoAdmin->prepare('SELECT id, full_name, password_hash FROM admins WHERE email = ?');
$stmt->execute([$email]);
$admin = $stmt->fetch();

if (!$admin || !password_verify($password, $admin['password_hash'])) {
    header('Location: admin.html?err=invalid');
    exit;
}

$_SESSION['admin_id'] = (int)$admin['id'];
$_SESSION['admin_name'] = $admin['full_name'];

header('Location: dashboard.html');
exit;



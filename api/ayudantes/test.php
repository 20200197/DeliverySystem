<?php
require_once('security_token.php');

session_start();

$token = new SecurityToken;

if (isset($_SESSION['admin_token'])) {
    if ($admin_token == $_SESSION['admin_token']) {
        echo '1';
        echo $_SESSION['admin_token'];
        echo '<br><br>';
        echo $admin_token;
    } else {
        echo '2';
        echo 'uuu';
    }
} else {
    $token->setToken('admin');
    echo '3';
    var_dump($_SESSION);
    echo '<br><br>';
    var_dump($admin_token);
}
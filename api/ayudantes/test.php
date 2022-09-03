<?php
require_once('security_token.php');

session_start();

$token = new SecurityToken;

if (isset($_SESSION['admin_token'])) {
    if ($token->getAdminToken() == $_SESSION['admin_token']) {

        echo 'aaaaa';
        echo($_SESSION['admin_token']);
    } else {
        echo 'uuu';
    }
} else {
    $token->setToken('admin');
    var_dump($token->getAdminToken());
}
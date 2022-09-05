<?php
require_once('../ayudantes/security_token.php');

session_start();

$token = new SecurityToken;

$result = array('status' => 0, 'token' => 0);


if (isset($_SESSION['admin_token'])) {
    switch($_GET['action']) {
        case 'getToken':
            $result['token'] = $_SESSION['admin_token'];
            break;
    }
}

print(json_encode($result));
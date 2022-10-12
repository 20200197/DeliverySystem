<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/cliente.php');

if (isset($_GET['action'])) {

    $result = ['status' => 0, 'message' => null, 'exception' => null];

    session_start();

    $cliente = new Cliente();
    if (isset($_SESSION['id_cliente'])) {
        switch ($_GET['action']) {
            case 'logOut':
                //Se verifica que exista una sesión activa
                if (!isset($_SESSION['id_cliente'])) {
                   $result['exception'] = 'No hya una sesión activa';
                } else {
                    //Se elimina la esión
                    unset($_SESSION['id_cliente']);
                    if (isset($_SESSION['id_cliente'])) {
                       $result['exception'] = 'OCurrió un problema durante el cerrado de sesión';
                    } else {
                        $result['status'] = 1;
                        $result['message'] = 'Sesión cerrada con éxito';
                    }
                }
                break;
            default:
                $result['exception'] = 'Accion no disponible dentro de la sesión';
                break;
        }
    } else {
        switch ($_GET['action']) {
            case 'register':
                $_POST = $cliente->validateForm($_POST);
                if (!$cliente->setNombre($_POST['name'])) {
                    $result['exception'] = 'Nombre invalido';
                } elseif (!$cliente->setApellido($_POST['lastname'])) {
                    $result['exception'] = 'Apellido invalido';
                } elseif (!$cliente->setCorreo($_POST['email'])) {
                    $result['exception'] = 'Correo invalido';
                } elseif ($cliente->getData('correo_cliente', $_POST['email'])) {
                    $result['exception'] = 'El correo ingresado ya está en uso';
                } elseif (!$cliente->setDui($_POST['dui'])) {
                    $result['exception'] = 'DUI invalido';
                } elseif ($cliente->getData('dui_cliente', $_POST['dui'])) {
                    $result['exception'] = 'El dui ingresado ya está en uso';
                } elseif (!$cliente->setTelefono($_POST['phone'])) {
                    $result['exception'] = 'Teléfono invalido';
                } elseif ($cliente->getData('telefono_cliente', $_POST['phone'])) {
                    $result['exception'] = 'El teléfono ingresado ya está en uso';
                } elseif (!$cliente->setUsuario($_POST['user'])) {
                    $result['exception'] = 'Usuario invalido';
                } elseif ($cliente->getData('usuario_cliente', $_POST['user'])) {
                    $result['exception'] = 'El usuario ingresado ya está en uso';
                } elseif ($_POST['pass1'] != $_POST['pass2']) {
                    $result['exception'] = 'Las contraseñas no coinciden';
                } elseif (!$cliente->setClave($_POST['pass1'])) {
                    $result['exception'] = 'Contraseña invalida';
                } elseif (!$cliente->setFoto($_FILES['file'])) {
                    $result['exception'] = $cliente->getFileError();
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    if ($cliente->saveFile($_FILES['file'], $cliente->getRuta(), $cliente->getFoto())) {
                        $result['message'] = 'Cuenta creada correctamente';
                        $cliente->insertCambio();
                    } else {
                        $result['message'] = 'Cuenta creada pero no se guardó la imagen';
                        $cliente->insertCambio();
                    }
                    $result['exception'] = Database::getException();
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Hubo un error inesperado';
                }
                break;
            case 'login':
                $_POST = $cliente->validateForm($_POST);
                if (!$cliente->setUsuario($_POST['user'])) {
                    $result['exception'] = 'Usuario inválido';
                } elseif (!$cliente->checkUser()) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$cliente->getStatus()) {
                    $result['exception'] = 'Lo sentimos pero tu cuenta ha sido desactivada';
                } elseif ($cliente->checkPass($_POST['password'])) {


                    $_SESSION['id_cliente'] = $cliente->getId();
                    $_SESSION['usuario_cliente'] = $cliente->getUsuario();

                    $result['dataset'] = $cliente->checkRango();
                    if (in_array("91 days", $result['dataset']) == true) {
                        $_SESSION['id_cliente'] = null;

                        $result['status'] = 0;
                        $result['exception'] = 'Lo sentimos, no cambio la contraseña hace 90 dias, debe de recuperarla';
                    } else {

                        $result['status'] = 1;
                        $result['message'] = 'Autenticación correcta';
                    }
                } elseif (!$cliente->checkPass($_POST['password'])) {
                    $result['exception'] = 'Contraseña incorrecta';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                }
                break;
            default:
                $result['exception'] = 'Accion no disponible';
                break;
        }
    }
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}

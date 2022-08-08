<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/cliente.php');

if (isset($_GET['action'])) {

    $result = ['status' => 0, 'message' => null, 'exception' => null];

    $cliente = new Cliente();
    //if (isset($_SESSION['id_cliente'])) {}
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
            } else {
                $result['message'] = 'Cuenta creada pero no se guardó la imagen';
            }
        } elseif (Database::getException()) {
            $result['exception'] = Database::getException();
        } else {
            $result['exception'] ='Hubo un error inesperado';
        }
            break;
        default:
            break;
    }
    print(json_encode($result));
} else {
print(json_encode('Recurso no disponible'));
}


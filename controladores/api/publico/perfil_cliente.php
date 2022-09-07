<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/perfil_cliente.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $perfil = new PerfilCliente;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (true) { //isset($_SESSION['id_cliente'])
        //Colocamos la sesion como 1
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un repartidor ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if (!$perfil->setIdentificador(1)) { //$perfil->setIdentificador($_SESSION['id_cliente'])
                    $result['exception'] = 'No se encontró la sesión de tu cuenta';
                } elseif ($result['dataset'] = $perfil->datosPerfil()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'El perfil a buscar no existe';
                }
                break;
            case 'ActualizarPerfil':
                $_POST = $perfil->validateForm($_POST);
                if (!$perfil->setIdentificador($_SESSION['id_cliente'])) { //$_SESSION['id_cliente']
                    $result['exception'] = "No se encontró la sesión de tu cuenta";
                } elseif (!$data = $perfil->datosPerfil()) {
                    $result['exception'] = "Los datos de la cuenta no se encontraron";
                } elseif (!$perfil->setNombreCliente($_POST['nombre'])) {
                    $result['exception'] = 'Nombre no valido';
                } elseif (!$perfil->setApellidoCliente($_POST['apellido'])) {
                    $result['exception'] = 'Apellido no valido';
                } elseif (!$perfil->setCorreoCliente($_POST['correo'])) {
                    $result['exception'] = 'Correo no valido';
                } elseif (!$perfil->setTelefonoCliente($_POST['telefono'])) {
                    $result['exception'] = 'Teléfono no valido';
                } elseif (!is_uploaded_file($_FILES['foto']['tmp_name'])) {
                    if ($perfil->actualizarPerfil($data['foto_cliente'])) {
                        $result['message'] = 'Perfil actualizado con éxito';
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$perfil->setFotoCliente($_FILES['foto'])) {
                    $result['exception'] = 'Dimensiones o formato de imagen incorrectos';
                } elseif ($perfil->actualizarPerfil($perfil->getFotoCliente())) {
                    $result['status'] = 1;
                    if ($perfil->saveFile($_FILES['foto'], $perfil->getRuta(), $perfil->getFotoCliente())) {
                        $result['message'] = 'Perfil actualizado con éxito';
                    } else {
                        $result['message'] = 'Perfil actualizado pero no se cargó la nueva imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }

                break;
            case 'verificarPass':
                $_POST = $perfil->validateForm($_POST);
                unset($_SESSION['verificar']);
                if ($perfil->verificarPass($_POST['passwordV'])) {
                    if ($result['dataset'] = $perfil->nombreUsuario()) {
                        $result['status'] = 1;
                        $_SESSION['verificar'] = true;
                    } else {
                        $result['exception'] = 'Ocurrió un problema al cargar tus datos';
                    }
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Contraseña incorrecta';
                }
                break;
            case 'actualizarPass':
                $_POST = $perfil->validateForm($_POST);
                if (!isset($_SESSION['verificar'])) {
                    $result['exception'] = 'Debes de verificar tu contraseña para cambiarla';
                } elseif (!$perfil->setUserCliente($_POST['user'])) {
                    $result['exception'] = 'Nombre de usuario invalido';
                } elseif (empty($_POST['password'])) {
                    if (!$data = $perfil->datosCuenta()) {
                        $result['exception'] = 'No se encontró tu cuenta';
                    } elseif ($perfil->actualizarCuenta($perfil->getUser(), $data['clave_cliente'])) {
                        $result['message'] = 'Cuenta actualizada con éxito';
                        unset($_SESSION['verificar']);
                        $result['status'] = 1;
                        $perfil->changeCambio();
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$perfil->setPassCliente($_POST['password'])) {
                    $result['exception'] = 'Contraseña invalida';
                } elseif ($perfil->actualizarCuenta($perfil->getUser(), $perfil->getPass())) {
                    $result['status'] = 1;
                    unset($_SESSION['verificar']);
                    $result['message'] = 'Cuenta actualizada con éxito';
                    $perfil->changeCambio();
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible dentro de la sesión';
        }
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}

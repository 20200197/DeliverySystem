<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_perfil.php');
require_once('../modelos/administrar_admin.php');
require_once('../ayudantes/security_token.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $perfil = new AdministrarPerfil;
    $token = new SecurityToken;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_admin']) && $token->getToken('admin') == $_SESSION['admin_token']) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if (!$perfil->setIdentificador($_SESSION['id_admin'])) {
                    $result['exception'] = 'No se logró identificar tu perfil';
                } elseif ($result['dataset'] = $perfil->cargarPerfil()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
            case 'actualizarUsuario':
                $_POST = $perfil->validateForm($_POST);
                if (!$perfil->setIdentificador($_POST['id'])) {
                    $result['exception'] = 'No se logró identificar tu usuario';
                } elseif (!$perfil->setNombre($_POST['nombre'])) {
                    $result['exception'] = 'Nombre invalido';
                } elseif (!$perfil->setApellido($_POST['apellido'])) {
                    $result['exception'] = 'Apellido invalido';
                } elseif (!$perfil->setCorreo($_POST['correo'])) {
                    $result['exception'] = 'Correo invalido';
                } elseif (!$perfil->setTelefono($_POST['telefono'])) {
                    $result['exception'] = 'Teléfono invalido';
                } elseif (!$perfil->setDui($_POST['dui'])) {
                    $result['exception'] = 'DUI invalido';
                } elseif ($perfil->actualizarUsuario()) {
                    $result['status'] = 1;
                    $result['message'] = 'Datos de usuario correctamente modificados';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'actualizarCuenta':
                $_POST = $perfil->validateForm($_POST);
                if (!$perfil->setIdentificador($_POST['id'])) {
                    $result['exception'] = 'No se logró identificar tu usuario';
                } elseif (!$perfil->setUsuario($_POST['usuario'])) {
                    $result['exception'] = 'Usuario invalido';
                } elseif ($_POST['pass'] == null) {
                    if (!$data = $perfil->cargarPass()) {
                        $result['exception'] = 'Error al reconocer datos';
                    } elseif (!$perfil->setPass($data['clave_admin'])) {
                        $result['exception'] = 'Error al reconocer esenciales';
                    } elseif ($perfil->actualizarCuenta()) {
                        $result['status'] = 1;
                        $result['message'] = 'Datos de la cuenta correctamente modificados';
                        $perfil->changeCambio();
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$perfil->setPass($_POST['pass'])) {
                        $result['exception'] = 'Contraseña invalido';
                } elseif ($perfil->checkPass($_POST['pass'])) {
                    $result['exception'] = 'Por favor ingrese una contraseña diferente a la actual';
                } elseif ($perfil->actualizarCuenta()) {
                    $result['status'] = 1;
                    $result['message'] = 'Datos de la cuenta correctamente modificados';
                    $perfil->changeCambio();
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'cargarCuenta':
                if (!$perfil->setIdentificador($_POST['id'])) {
                    $result['exception'] = 'No se logró identificar tu usuario';
                } elseif ($result['dataset'] = $perfil->cargarCuenta()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'cargarUsuario':
                if (!$perfil->setIdentificador($_POST['id'])) {
                    $result['exception'] = 'No se logró identificar tu usuario';
                } elseif ($result['dataset'] = $perfil->cargarUsuario()) {
                    $result['status'] = 1;
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
        switch ($_GET['action']) {
            default:
                $result['exception'] = 'Acción no disponible fuera de la sesión';
        }
        print(json_encode($result));
    }
} else {
    print(json_encode('Recurso no disponible'));
}

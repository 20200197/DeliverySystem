<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_baneo.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $baneo = new Baneo;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_admin'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
                //Cargos de usuario
            case 'readAll':
                if ($result['dataset'] = $baneo->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Administradores con bloqueo por intentos o baneados
            case 'readAllAdmin':
                if ($result['dataset'] = $baneo->readAllAdmin()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Repartidores con bloqueo por intentos o baneados
            case 'readAllRepartidor':
                if ($result['dataset'] = $baneo->readAllRepartidor()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Vendedores con bloqueo por intentos o baneados
            case 'readAllVendedor':
                if ($result['dataset'] = $baneo->readAllVendedor()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Cliente con bloqueo por intentos o baneados
            case 'readAllCliente':
                if ($result['dataset'] = $baneo->readAllCliente()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar categoria
            case 'search':
                $_POST = $categoria->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un valor para buscar';
                    // $entrega->readAll();
                } elseif ($result['dataset'] = $categoria->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Valor encontrado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
                //Banear administrador
            case 'updateBaneoAdministrador':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Administrador incorrecto';
                } elseif ($baneo->updateBaneoAdministrador()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario baneado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Banear repartidor
            case 'updateBaneoRepartidor':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Repartidor incorrecto';
                } elseif ($baneo->updateBaneoRepartidor()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario baneado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Banear vendedor
            case 'updateBaneoVendedor':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Vendedor incorrecto';
                } elseif ($baneo->updateBaneoVendedor()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario baneado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Banear cliente
            case 'updateBaneoCliente':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($baneo->updateBaneoCliente()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario baneado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Desbanear administrador
            case 'updateDesbaneoAdministrador':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($baneo->updateDesbaneoAdministrador()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario desbaneado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Desbanear vendedor
            case 'updateDesbaneoVendedor':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($baneo->updateDesbaneoVendedor()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario desbaneado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Desbanear repartidor
            case 'updateDesbaneoRepartidor':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($baneo->updateDesbaneoRepartidor()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario desbaneado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Desbanear cliente
            case 'updateDesbaneoCliente':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($baneo->updateDesbaneoCliente()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario desbaneado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Cambiar hora desbaneo administrador
            case 'updateHoraDesbaneoAdministrador':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif (!$baneo->setFechaDesbloqueo($_POST['hora_desbloqueo'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($baneo->updateHoraDesbaneoAdministrador()) {
                    $result['status'] = 1;
                    $result['message'] = 'Fecha desbloqueo cambiada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Cambiar hora desbaneo repartidor
            case 'updateHoraDesbaneoRepartidor':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif (!$baneo->setFechaDesbloqueo($_POST['hora_desbloqueo'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($baneo->updateHoraDesbaneoRepartidor()) {
                    $result['status'] = 1;
                    $result['message'] = 'Fecha desbloqueo cambiada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Cambiar fecha desbaneo vendedor
            case 'updateHoraDesbaneoVendedor':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif (!$baneo->setFechaDesbloqueo($_POST['hora_desbloqueo'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($baneo->updateHoraDesbaneoVendedor()) {
                    $result['status'] = 1;
                    $result['message'] = 'Fecha desbloqueo cambiada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Cambiar fecha desbaneo cliente
            case 'updateHoraDesbaneoCliente':
                $_POST = $baneo->validateForm($_POST);
                if (!$baneo->setId($_POST['id_aa'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif (!$baneo->setFechaDesbloqueo($_POST['hora_desbloqueo'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($baneo->updateHoraDesbaneoCliente()) {
                    $result['status'] = 1;
                    $result['message'] = 'Fecha desbloqueo cambiada correctamente';
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

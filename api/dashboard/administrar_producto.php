<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_productos.php');
require_once('../ayudantes/security_token.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $producto = new Producto;
    $token = new SecurityToken;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_admin']) && $token->getToken('admin') == $_SESSION['admin_token']) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $producto->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar empleado
            case 'search':
                $_POST = $producto->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un valor para buscar';
                    // $entrega->readAll();
                } elseif ($result['dataset'] = $producto->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Valor encontrado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
            case 'readOne':
                if (!$producto->setId($_POST['idP'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif ($result['dataset'] = $producto->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Producto inexistente';
                }
                break;
            case 'update':
                $_POST = $producto->validateForm($_POST);
                if (!$producto->setId($_POST['idP'])) /*idProducto*/ {
                    $result['exception'] = 'Producto incorrecto';
                } elseif (!$producto->setEstadoProducto($_POST['estadoP'])) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif ($producto->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto modificado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'porcentajeProductos':
                if ($result['dataset'] = $producto->porcentajeProductos()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay datos disponibles';
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

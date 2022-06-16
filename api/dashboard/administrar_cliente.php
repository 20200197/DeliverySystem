<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_cliente.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administrar_cliente = new Clientes;
    $administrar_compra = new Clientes;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_usuario'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $administrar_cliente->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar cliente
            case 'search':
                $_POST = $administrar_cliente->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un valor para buscar';
                } elseif ($result['dataset'] = $administrar_cliente->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Valor encontrado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
                //Leer compras
            case 'readCompras':
                if (!$administrar_cliente->setId($_POST['idcliente'])) {
                    $result['exception'] = 'Cliente incorrecto';
                } elseif ($result['dataset'] = $administrar_cliente->readCompras()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
            case 'readOne':
                if (!$administrar_cliente->setId($_POST['id'])) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif ($result['dataset'] = $administrar_cliente->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Estado inexistente';
                }
                break;
                //Actualizar la fila
            case 'update':
                $_POST = $administrar_cliente->validateForm($_POST);
                if (!$administrar_cliente->setId($_POST['id'])) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif (!$administrar_cliente->setId_estado_cliente($_POST['id_estado_cliente'])) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif (!$data = $administrar_cliente->readCompras()) {
                    $result['exception'] = 'Cliente inexistente';
                } elseif ($administrar_cliente->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'La acción se ejecutó con éxito';
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

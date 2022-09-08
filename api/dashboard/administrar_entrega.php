<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_entrega.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $entrega = new Entrega;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_admin'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $entrega->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar empleado
            case 'search':
                $_POST = $entrega->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un valor para buscar';
                    // $entrega->readAll();
                } elseif ($result['dataset'] = $entrega->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Valor encontrado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
            case 'readRepartidorAvaible':
                if ($result['dataset'] = $entrega->repartidorAvaible()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Faacturas disponibles
            case 'readFac':
                if ($result['dataset'] = $entrega->readFac()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Productos disponibles
            case 'readProductosEntrega':
                $_POST = $entrega->validateForm($_POST);
                if (!$entrega->setIdDetalle($_POST['id_tt'])) {
                    $result['exception'] = 'Factura incorrecta';
                } elseif ($result['dataset'] = $entrega->readProductosEntrega()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Actualizamos repartidor
            case 'updatePk':
                $_POST = $entrega->validateForm($_POST);
                if (!$entrega->setIdRepartidor($_POST['id_repartidor'])) {
                    $result['exception'] = 'Repartidor incorrecto';
                } elseif (!$entrega->setFechaReparto($_POST['fecha_reparto'])) {
                    $result['exception'] = 'Fecha reparto incorrecto';
                } elseif (!$entrega->setIdDetalle($_POST['id_detalle'])) {
                    $result['exception'] = 'Detalle incorrecto';
                } elseif (!$entrega->setIdFactura($_POST['id_factura'])) {
                    $result['exception'] = 'Factura incorrecto';
                } elseif ($entrega->updatePk()) {
                    //Asignamos fecha
                    $entrega->updatePkPk();
                    $result['status'] = 1;
                    $result['message'] = 'Envio modificado correctamente';
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

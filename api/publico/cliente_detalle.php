<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/cliente_detalle.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $detalle = new clienteDetalle;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (true) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'cargarDetalle':
                $_POST = $detalle->validateForm($_POST);
                if (!$detalle->setIdentificador($_POST['identificador'])) {
                    $result['exception'] = 'No se logró identificar el pedido a mostrar';
                } elseif ($result['dataset'] = $detalle->cargarProductos()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos disponibles para este pedido';
                }
                break;
            case 'cargarRepartidor':
                if (!$detalle->setIdentificador($_POST['identificador'])) {
                    $result['exception'] = 'No se logró identificar el pedido a mostrar';
                } elseif ($result['dataset'] = $detalle->datosRepartidor()) {
                    if($detalle->validarNoRepeticiones()) {
                        $result['status'] = 1;
                    } else {
                        $result['status'] = 3;
                        $result['exception'] = 'Ya has valorado al repartidor en esta entrega';
                        $result['dataset'] = null;
                    }
                    
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos disponibles para este pedido';
                }
                break;
            case 'valorarRepartidor':
                $_POST = $detalle->validateForm($_POST);
                if(!$detalle->setIdentificadorRepartidor($_POST['identificador'])) {
                    $result['exception'] = 'No se ha encontrado el repartidor a valorar';
                } elseif(!$detalle->setValoracion($_POST['estrellas'])) {
                    $result['exception'] = 'La valoración colocada no es valida';
                } elseif(!$detalle->setComentario($_POST['valoracionRepartidor'])) {
                    $result['exception'] = 'El comentario colocado no es valido';
                } elseif ($detalle->guardarRepartidor()) {
                    $result['status'] = 1;
                    $result['message'] = 'El repartidor ha sido valorado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'cargarDatosProducto':
                $_POST = $detalle->validateForm($_POST);
                if(!$detalle->setIdentificador($_POST['identificador'])) {
                    $result['exception'] = 'No se logró identificar el producto';
                } elseif($result['dataset'] = $detalle->cargarDatosProductos()) {
                    $result['status'] = 1;
                } elseif(Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'El producto no existe';
                }
                break;
            case 'valorarProducto':
                $_POST = $detalle->validateForm($_POST);
                if (!$detalle->setIdentificadorDetalle($_POST['identificadorDetalle'])) {
                    $result['exception'] = 'No se ha encontrado el repartidor a valorar';
                } elseif (!$detalle->setValoracion($_POST['estrellas'])) {
                    $result['exception'] = 'La valoración colocada no es valida';
                } elseif (!$detalle->setComentario($_POST['valoracionProducto'])) {
                    $result['exception'] = 'El comentario colocado no es valido';
                } elseif ($detalle->guardarProducto()) {
                    $result['status'] = 1;
                    $result['message'] = 'El repartidor ha sido valorado correctamente';
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

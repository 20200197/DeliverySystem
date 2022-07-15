<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/paquetes_pendientes.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $paquetes = new PaquetesPendientes;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (true) { //isset($_SESSION['id_repartidor'])
        //Colocamos la sesion como 1
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un repartidor ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if (!$paquetes->setIdentificador(1)) { //$_SESSION['id_repartidor'] Se debería colocar
                    $result['exception'] = 'No se logró identificar tu usuario';
                }elseif($result['dataset'] = $paquetes->cargarFacturas()) {
                    $result['status'] = 1;
                }elseif (Database::getException()){
                    $result['exception'] = Database::getException();
                }else{
                    $result['exception'] = 'No hay paquetes pendientes';
                }
                break;
            case 'entregar':
                $_POST = $paquetes->validateForm($_POST);
                if (!$paquetes->setIdentificador($_POST['identificador'])) { 
                    $result['exception'] = 'No se logró identificar el pedido a modificar';
                }elseif($paquetes->entregar()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido modificado correctamente';
                }else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'cancelar':
                    $_POST = $paquetes->validateForm($_POST);
                    if (!$paquetes->setIdentificador($_POST['identificador'])) { 
                        $result['exception'] = 'No se logró identificar el pedido a modificar';
                    }elseif($paquetes->cancelar()) {
                        $result['status'] = 1;
                        $result['message'] = 'Pedido modificado correctamente';
                    }else {
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

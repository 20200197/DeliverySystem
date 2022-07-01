<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_cliente.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) { 
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administrar_cliente = new AdministrarCliente;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_admin'])) { 
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if($result['dataset'] = $administrar_cliente->obtenerClientes())
                {
                    $result['status'] = 1;
                }elseif($result['exception'] = Database::getException())
                {
                    $result['exception'] = Database::getException();
                }else{
                    $result['exception'] = 'No hay datos de momento';
                }
                break;
            case 'cambiarEstado':
                if(!$administrar_cliente->setEstado($_POST['estado']))
                {
                    $result['exception'] = 'Estado no valido';
                }elseif(!$administrar_cliente->setIdentificador($_POST['identificador']))
                {
                    $result['exception'] = 'Identificador no valido';
                }elseif($administrar_cliente->cambiarEstado())
                {
                    $result['status'] = 1;
                    $result['message'] = 'Cambio de estado exitoso';
                }else{
                    $result['exception'] = Database::getException();
                }
                break;
            case 'buscar':
                $_POST = $administrar_cliente->validateForm($_POST);
                if(!$administrar_cliente->setBuscador($_POST['buscador']))
                {
                    $result['exception'] = 'Entrada de busqueda no valida';
                }elseif($result['dataset'] = $administrar_cliente->buscar())
                {
                    $result['status'] = 1;
                }else{
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

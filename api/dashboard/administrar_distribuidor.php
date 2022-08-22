<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_distribuidor.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administrar_distribuidor = new Distribuidor;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_admin'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $administrar_distribuidor->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar dustribuidor
            case 'search':
                $_POST = $administrar_distribuidor->validateForm($_POST);
                if ($result['dataset'] = $administrar_distribuidor->searchRows($_POST['data'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Valor encontrado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
                //Crear fila
            case 'create':
                $_POST = $administrar_marca->validateForm($_POST);
                if (!$administrar_marca->setNombreMarca($_POST['nombre_marca'])) {
                    $result['exception'] = 'Marca incorrecta';
                } elseif ($administrar_marca->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Marca registrada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'readOne':
                if (!$administrar_distribuidor->setId($_POST['id'])) {
                    $result['exception'] = 'distribuidor incorrecto';
                } elseif ($result['dataset'] = $administrar_distribuidor->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'distribuidor inexistente';
                }
                break;
            case 'updateStatus':
                if (!$administrar_distribuidor->setId($_POST['idP'])) {
                    $result['exception'] = 'Ha ocurrido un error al ejecutar la acción';
                } elseif (!$administrar_distribuidor->setStatusRepartidor($_POST['estadoP'])) {
                    $result['exception'] = 'No se pudo obtener el estado';
                }elseif ($administrar_distribuidor->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado cambiado correctamente';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Ha ocurrido un error inseperado';
                }
                break;
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

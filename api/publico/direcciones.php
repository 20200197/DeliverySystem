<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_cliente.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $direcciones = new AdministrarCliente;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    //if (isset($_SESSION['id_admin'])) {
    $result['session'] = 1;
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET['action']) {
            //Leer direcciones del cliente  
        case 'readAll':
            if ($result['dataset'] = $direcciones->readDirecciones()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay datos registrados';
            }
            break;
            //Leemos datos de un registro
        case 'readOne':
            if (!$direcciones->setIdDireccion($_POST['id'])) {
                $result['exception'] = 'Dirección incorrecto';
            } elseif ($result['dataset'] = $direcciones->readOneDireccion()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'Dirección inexistente';
            }
            break;
            //Craemos direccion
        case 'create':
            $_POST = $direcciones->validateForm($_POST);
            if (!$direcciones->setDescripcionDireccion($_POST['descripcion-direccion'])) {
                $result['exception'] = 'Descripción incorrecta';
            } elseif (!$direcciones->setPuntoReferencia($_POST['punto-ref'])) {
                $result['exception'] = 'Punto de referencia incorrecto';
            } elseif (!$direcciones->setCoordenadas($_POST['coordenadas'])) {
                $result['exception'] = 'Coordenadas incorrecta';
            } elseif (!$direcciones->setIdMunicipio($_POST['municipio'])) {
                $result['exception'] = 'Municipio incorrecto';
            } elseif ($direcciones->createDireccion()) {
                $result['status'] = 1;
                $result['message'] = 'Dirección creada correctamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
        case 'update':
            $_POST = $direcciones->validateForm($_POST);
            if (!$direcciones->setIdDireccion($_POST['id_direccion'])) {
                $result['exception'] = 'Descripción incorrecta';
            } elseif (!$data = $direcciones->readOneDireccion()) {
                $result['exception'] = 'Tipo de auto inexistente ';
            } elseif (!$direcciones->setDescripcionDireccion($_POST['descripcion_direccion'])) {
                $result['exception'] = 'Descripción incorrecta';
            } elseif (!$direcciones->setPuntoReferencia($_POST['punto_referencia'])) {
                $result['exception'] = 'Punto de referencia incorrecto';
            } elseif (!$direcciones->setCoordenadas($_POST['coordenadas_direccion'])) {
                $result['exception'] = 'Coordenadas incorrecta';
            } elseif (!$direcciones->setIdMunicipio($_POST['municipio_editar'])) {
                $result['exception'] = 'Municipio incorrecto';
            } elseif ($direcciones->updateDireccion()) {
                $result['status'] = 1;
                $result['message'] = 'Producto creado correctamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
        case 'delete':
            if (!$direcciones->setIdDireccion($_POST['id'])) {
                $result['exception'] = 'Dirección incorrecta';
            } elseif (!$data = $direcciones->readOneDireccion()) {
                $result['exception'] = 'Dirección inexistente';
            } elseif ($direcciones->deleteDireccion()) {
                $result['status'] = 1;
                $result['message'] = 'Dirección eliminada correctamente';
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
    // } else {
    //   print(json_encode('Acceso denegado'));
    // }
} else {
    print(json_encode('Recurso no disponible'));
}

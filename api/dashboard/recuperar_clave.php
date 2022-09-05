<?php
//Se cargan el resto de archivos .php necesarios
require_once '../ayudantes/database.php';
require_once '../ayudantes/validator.php';
require_once '../modelos/recuperacion.php';
//Se instancia la clase a utilizar
$recuperar = new Recuperacion;
//Se crea un arreglo donde se guardarán los datos a retornar
$result = array('status' => false, 'dataset' => null, 'message' => null, 'exception' => null);
//Se verifica que si haya una acción
if (isset($_GET['action'])) {
    //Se revisa la acción
    switch ($_GET['action']) {
        case 'solicitarCambio':
            //Se sanean los campos enviados
            $_POST = $recuperar->validateForm($_POST);
            //Se verifica si existe el campo de usuario
            if (!$recuperar->setUsuarioAdmin($_POST['usuario'])) {
                $result['exception'] = 'Nombre de usuario incorrecto';
            } elseif ($dataset->obtenerCorreoAdministrador()) {
                $result['status'] = true;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No existe el nombre de usuario';
            }
            break;
        default:
            $result['exception'] = 'La acción solicitada no está disponible';
            break;
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode('Recurso no disponible'));
}

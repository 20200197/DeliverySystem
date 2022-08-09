
<?php
//Se importan los archivos necesarios
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/sesion.php');

/*
    * Comprobación para la acción que se realizará usando los métodos del modelo
    * de empleado y ejecutados en database.php
    *
    * La acción se recibirá del controlador
    */
if (isset($_GET['action'])) {
    //Se crea o reiniciar una sesión
    session_start();
    $sesion = new Sesion;
    //Se crea un vector con los datos para crear el mensaje (Se devuelve al controllador)
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'exception' => null);
    //Se escoge el proceso que se ejecutará en el modelo
    switch ($_GET['action']) {
        case 'obtenerSesion':
            if (isset($_SESSION['id_admin'])) {
                if ($result['dataset'] = $sesion->sesion($_SESSION['id_admin'])) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = Database::getException();
                }
            }
            break;
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}


?>
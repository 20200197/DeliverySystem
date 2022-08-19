<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/estadistica_repartidor.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $estadistica = new EstadisticaRepartidor;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if ($_SESSION['id_vendedor']) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'promedioTotal':
                $_POST = $estadistica->validateForm($_POST);
                $resultado = array();
                foreach ($_POST['opciones'] AS $valor) {
                    if (!$estadistica->setDepartamento($valor)) {
                        $result['exception'] = 'Los valores de elección no son correctos';
                        $resultado = array();
                        break;
                    }  elseif ($data = $estadistica->topCliente()) {
                        $resultado = array_push($resultado, $data);
                    } elseif (Database::getException()) {
                        $result['exception'] = Database::getException();
                        break;
                    } else {
                        if ($data = $estadistica->nombreDepartamento()) {
                            $resultado = array_push($resultado, $data);
                        }
                    }
                }
                $result['dataset'] = $resultado;
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

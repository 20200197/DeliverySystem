<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/tipo_auto.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $tipo_auto = new Tipo_auto;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_usuario'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $tipo_auto->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar tipo de auto
            case 'search':
                $_POST = $tipo_auto->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un tipo de auto para buscar';
                } elseif ($result['dataset'] = $tipo_auto->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'tipo de auto encontrado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
                //Crear fila
            case 'create':
                $_POST = $tipo_auto->validateForm($_POST);
                if (!$tipo_auto->setTipo_auto($_POST['tipo_auto'])) {
                    $result['exception'] = 'Tipo  de auto incorrecto';
                } elseif (!is_uploaded_file($_FILES['imagen_tipo_auto']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen';
                } elseif (!$tipo_auto->setImagen_tipo_auto($_FILES['imagen_tipo_auto'])) {
                    $result['exception'] = $tipo_auto->getFileError();
                } elseif ($tipo_auto->createRow()) {
                    $result['status'] = 1;
                    if ($tipo_auto->saveFile($_FILES['imagen_tipo_auto'], $tipo_auto->getRuta(), $tipo_auto->getImagen_tipo_auto())) {
                        $result['message'] = 'Tipo de auto creado correctamente';
                    } else {
                        $result['message'] = 'Tipo de auto creado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'readOne':
                if (!$tipo_auto->setId($_POST['id'])) {
                    $result['exception'] = 'Tipo de auto incorrecta';
                } elseif ($result['dataset'] = $tipo_auto->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Tipo de auto inexistente';
                }
                break;
                //Actualizar fila
            case 'update':
                $_POST = $tipo_auto->validateForm($_POST);
                if (!$tipo_auto->setId($_POST['id_editar'])) {
                    $result['exception'] = 'Tipo de auto incorrecto';
                } elseif (!$data = $tipo_auto->readOne()) {
                    $result['exception'] = 'Tipo de auto inexistente ';
                } elseif (!$tipo_auto->setTipo_auto($_POST['tipo_auto'])) {
                    $result['exception'] = 'Tipo de auto incorrecto';
                } elseif (!is_uploaded_file($_FILES['imagen_tipo_auto']['tmp_name'])) {
                    if ($tipo_auto->updateRow($data['imagen_tipo_auto'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Tipo de auto modificado correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$tipo_auto->setImagen_tipo_auto($_FILES['imagen_tipo_auto'])) {
                    $result['exception'] = $tipo_auto->getFileError();
                } elseif ($tipo_auto->updateRow($data['imagen_tipo_auto'])) {
                    $result['status'] = 1;
                    if ($tipo_auto->saveFile($_FILES['imagen_tipo_auto'], $tipo_auto->getRuta(), $tipo_auto->getImagen_tipo_auto())) {
                        $result['message'] = 'Tipo de auto modificado correctamente';
                    } else {
                        $result['message'] = 'Tipo de auto modificado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Eliminar fila
            case 'delete':
                if (!$tipo_auto->setId($_POST['id'])) {
                    $result['exception'] = 'Tipo de auto incorrecta';
                } elseif (!$data = $tipo_auto->readOne()) {
                    $result['exception'] = 'Tipo de auto inexistente';
                } elseif ($tipo_auto->deleteRow()) {
                    $result['status'] = 1;
                    if ($tipo_auto->deleteFile($tipo_auto->getRuta(), $data['imagen_tipo_auto'])) {
                        $result['message'] = 'Tipo de auto eliminado correctamente';
                    } else {
                        $result['message'] = 'tipo de auto eliminado pero no se borró la imagen';
                    }
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

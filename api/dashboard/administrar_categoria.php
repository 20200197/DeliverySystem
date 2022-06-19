<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_categoria.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administrar_categoria = new Categoria;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_usuario'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $administrar_categoria->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar categoria
            case 'search':
                $_POST = $administrar_categoria->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese una categoria de producto para buscar';
                } elseif ($result['dataset'] = $administrar_categoria->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoria de producto encontrado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
                //Crear filas
            case 'create':
                $_POST = $administrar_categoria->validateForm($_POST);
                if (!$administrar_categoria->setNombre_categoria($_POST['nombre_categoria'])) {
                    $result['exception'] = 'Nombre de categoria incorrecto';
                } elseif (!is_uploaded_file($_FILES['imagen_categoria']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen';
                } elseif (!$administrar_categoria->setImagen_categoria($_FILES['imagen_categoria'])) {
                    $result['exception'] = $administrar_categoria->getFileError();
                } elseif ($administrar_categoria->createRow()) {
                    $result['status'] = 1;
                    if ($administrar_categoria->saveFile($_FILES['imagen_categoria'], $administrar_categoria->getRuta(), $administrar_categoria->getImagen_categoria())) {
                        $result['message'] = 'Categoria de producto creado correctamente';
                    } else {
                        $result['message'] = 'Categoria de producto creado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'readOne':
                if (!$administrar_categoria->setId($_POST['id'])) {
                    $result['exception'] = 'Categoria de producto incorrecto';
                } elseif ($result['dataset'] = $administrar_categoria->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Categoria de producto inexistente';
                }
                break;
                //Actualizar filas
            case 'update':
                $_POST = $administrar_categoria->validateForm($_POST);
                if (!$administrar_categoria->setId($_POST['id_editar'])) {
                    $result['exception'] = 'Categoria de producto incorrecto';
                } elseif (!$data = $administrar_categoria->readOne()) {
                    $result['exception'] = 'Categoria de producto inexistente ';
                } elseif (!$administrar_categoria->setNombre_categoria($_POST['nombre_categoria'])) {
                    $result['exception'] = 'Categoria de producto incorrecto';
                } elseif (!is_uploaded_file($_FILES['imagen_categoria']['tmp_name'])) {
                    if ($administrar_categoria->updateRow($data['imagen_categoria'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Categoria de producto modificada correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$administrar_categoria->setImagen_categoria($_FILES['imagen_categoria'])) {
                    $result['exception'] = $administrar_categoria->getFileError();
                } elseif ($administrar_categoria->updateRow($data['imagen_categoria'])) {
                    $result['status'] = 1;
                    if ($administrar_categoria->saveFile($_FILES['imagen_categoria'], $administrar_categoria->getRuta(), $administrar_categoria->getImagen_categoria())) {
                        $result['message'] = 'Categoria de producto modificada correctamente';
                    } else {
                        $result['message'] = 'Categoria de producto modificado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Eliminar fila
            case 'delete':
                if (!$administrar_categoria->setId($_POST['id'])) {
                    $result['exception'] = 'Categoria de producto incorrecta';
                } elseif (!$data = $administrar_categoria->readOne()) {
                    $result['exception'] = 'Categoria de producto inexistente';
                } elseif ($administrar_categoria->deleteRow()) {
                    $result['status'] = 1;
                    if ($administrar_categoria->deleteFile($administrar_categoria->getRuta(), $data['imagen_categoria'])) {
                        $result['message'] = 'Categoria de producto eliminada correctamente';
                    } else {
                        $result['message'] = 'Categoria de producto eliminado pero no se borró la imagen';
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

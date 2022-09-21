<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_categoria.php');
require_once('../ayudantes/security_token.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $categoria = new Categoria;
    $token = new SecurityToken;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_admin']) && $token->getToken('admin') == $_SESSION['admin_token']) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $categoria->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar categoria
            case 'search':
                $_POST = $categoria->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un valor para buscar';
                    // $entrega->readAll();
                } elseif ($result['dataset'] = $categoria->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Valor encontrado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
            case 'readOne':
                if (!$categoria->setId($_POST['id'])) {
                    $result['exception'] = 'Categoria incorrecta';
                } elseif ($result['dataset'] = $categoria->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Categoria inexistente';
                }
                break;
            case 'update':
                $_POST = $producto->validateForm($_POST);
                if (!$producto->setId($_POST['idP'])) /*idProducto*/ {
                    $result['exception'] = 'Producto incorrecto';
                } elseif (!$producto->setEstadoProducto($_POST['estadoP'])) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif ($producto->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto modificado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'create':
                $_POST = $categoria->validateForm($_POST);
                if (!$categoria->setNombre_categoria($_POST['nombre_catego'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!is_uploaded_file($_FILES['archivo_categO']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen';
                } elseif (!$categoria->setImagen_categoria($_FILES['archivo_categO'])) {
                    $result['exception'] = $categoria->getFileError();
                    //Comprobamos si hay categoria repetida
                } elseif ($categoria->read('categoria', $categoria->getNombre_categoria())) {
                    $result['exception'] = 'Esta categoría ya esta registrada';
                } elseif ($categoria->createRow()) {
                    $result['status'] = 1;
                    if ($categoria->saveFile($_FILES['archivo_categO'], $categoria->getRuta(), $categoria->getImagen_categoria())) {
                        $result['message'] = 'Categoria de producto creado correctamente';
                    } else {
                        $result['message'] = 'Categoria de producto creado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Actualizar fila
            case 'updateCa':
                $_POST = $categoria->validateForm($_POST);
                if (!$categoria->setId($_POST['id_ca'])) {
                    $result['exception'] = 'Categoria incorrecta';
                } elseif (!$data = $categoria->readOne()) {
                    $result['exception'] = 'Categoria inexistente';
                } elseif (!$categoria->setNombre_categoria($_POST['nombre_cate'])) {
                    $result['exception'] = 'Nombre incorrecto';
                    //Comprobamos que no haya una categoria repetida
                } elseif ($categoria->readD('categoria', $categoria->getNombre_categoria())) {
                    $result['exception'] = 'Esta categoría  ya esta registrada';
                } elseif (!is_uploaded_file($_FILES['archivo_cate']['tmp_name'])) {
                    if ($categoria->updateRow($data['imagen_categoria'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Categoria modificada correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$categoria->setImagen_categoria($_FILES['archivo_cate'])) {
                    $result['exception'] = $categoria->getFileError();
                } elseif ($categoria->updateRow($data['imagen_categoria'])) {
                    $result['status'] = 1;
                    if ($categoria->saveFile($_FILES['archivo_cate'], $categoria->getRuta(), $categoria->getImagen_categoria())) {
                        $result['message'] = 'Categoria modificada correctamente';
                    } else {
                        $result['message'] = 'Categoria modificada pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'updateEstado':
                $_POST = $categoria->validateForm($_POST);
                if (!$categoria->setId($_POST['id'])) {
                    $result['exception'] = 'Categoria incorrecta';
                } elseif (!$categoria->setEstado_categoria(($_POST['estado']))) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif ($categoria->updateEstado()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado modificado con exito';
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

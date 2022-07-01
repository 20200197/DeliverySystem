<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_categoria.php');
require_once('../modelos/productos.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancian las clases correspondientes.
    $categoria = new Categoria;
    $producto = new Producto;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_cliente'])) {
        // Se compara la acción a realizar según la petición del controlador.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $categoria->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No existen categorías para mostrar';
                }
                break;
                //Leer productos por categoria
            case 'readProductosCategoria':
                if (!$producto->setId($_POST['id_categoria_producto'])) {
                    $result['exception'] = 'Categoría incorrecta';
                } elseif ($result['dataset'] = $producto->readProductosCategoria()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No existen productos para mostrar';
                }
                break;
                //Leer comentario de producto  
            case 'readComent':
                if (!$producto->setId($_POST['id_producto'])) {
                    $result['exception'] = 'Producto incorrecta';
                } elseif ($result['dataset'] = $producto->readComent()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Comentario inexistente';
                }
                break;
                //Leer datos de producto     
            case 'readOne':
                if (!$producto->setId($_POST['id_producto'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif ($result['dataset'] = $producto->readOne()) {
                    $result['status'] = 1;
                    $result['message'] = 'Conectado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Producto inexistente';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible';
        }
    } else {
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $categoria->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No existen categorías para mostrar';
                }
                break;
                //Leer productos por categoria
            case 'readProductosCategoria':
                if (!$producto->setId($_POST['id_categoria_producto'])) {
                    $result['exception'] = 'Categoría incorrecta';
                } elseif ($result['dataset'] = $producto->readProductosCategoria()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No existen productos para mostrar';
                }
                break;
                //Leer comentario de producto  
            case 'readComent':
                if (!$producto->setId($_POST['id_producto'])) {
                    $result['exception'] = 'Producto incorrecta';
                } elseif ($result['dataset'] = $producto->readComent()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Comentario inexistente';
                }
                break;
                //Leer datos de producto     
            case 'readOne':
                if (!$producto->setId($_POST['id_producto'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif ($result['dataset'] = $producto->readOne()) {
                    $result['status'] = 1;
                    $result['message'] = 'Desconectado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Producto inexistente';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible';
        }
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}

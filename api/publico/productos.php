<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_productos.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $producto = new Producto;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    //if (isset($_SESSION['id_admin'])) {
    $result['session'] = 1;
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET['action']) {
            //Leer todos los productos 
        case 'readProductos':
            if ($result['dataset'] = $producto->readProductos()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay datos registrados';
            }
            break;
            //Leer categorias
        case 'readCategoria':
            if ($result['dataset'] = $producto->readCategoria()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay datos registrados';
            }
            break;
            //Leer productos por categoria
        case 'readProductosCategoria':
            if (!$producto->setIdCategoria($_POST['id_categoria_producto'])) {
                $result['exception'] = 'Categoria incorrecta';
            } elseif ($result['dataset'] = $producto->readProductosCategoria()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay datos registrados';
            }
            break;
            //Leer calidad de productos
        case 'readCali':
            if (!$producto->setIdDetalleProducto($_POST['id_detalle'])) {
                $result['exception'] = 'Detalle incorrecto';
            } elseif ($result['dataset'] = $producto->readCali()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay valoraciones asignadas';
            }
            break;
            //Leemos datos de un producto
        case 'readOneProducto':
            if (!$producto->setId($_POST['id_producto'])) {
                $result['exception'] = 'Producto incorrecto';
            } elseif ($result['dataset'] = $producto->readOneProducto()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay datos registrados';
            }
            break;
            //Leemos comentarios de producto
        case 'readComent':
            if (!$producto->setId($_POST['id_producto'])) {
                $result['exception'] = 'Producto incorrecto';
            } elseif ($result['dataset'] = $producto->readComent()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay comentarios para este producto';
            }
            break;
            //Buscar producto
        case 'searchProductoPrecio':
            $_POST = $producto->validateForm($_POST);
            if (!$producto->setBuscadorI($_POST['data1'])) {
                $result['exception'] = 'Entrada de búsqueda no válida';
            } elseif (!$producto->setBuscadorL($_POST['data2'])) {
                $result['exception'] = 'Entrada de búsqueda no válida';
            } elseif ($result['dataset'] = $producto->searchProductoPrecio()) {
                $result['status'] = 1;
                $result['message'] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay coincidencias';
            }
            break;
        case 'search':
            $_POST = $producto->validateForm($_POST);
            if ($_POST['search'] == '') {
                $result['exception'] = 'Ingrese un valor para buscar';
                // $entrega->readAll();
            } elseif ($result['dataset'] = $producto->searchRows($_POST['search'])) {
                $result['status'] = 1;
                $result['message'] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay coincidencias';
            }
            break;
        case 'searchProductoCategoria':
            $_POST = $producto->validateForm($_POST);
            if ($_POST['search'] == '') {
                $result['exception'] = 'Ingrese un valor para buscar';
                // $entrega->readAll();
            } elseif ($result['dataset'] = $producto->searchRowsProductoCategoria($_POST['search'], $_POST['id_categoria'])) {
                $result['status'] = 1;
                $result['message'] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay coincidencias';
            }
            break;
            //Buscar producto
        case 'searchProductoPrecioCategoria':
            $_POST = $producto->validateForm($_POST);
            if (!$producto->setBuscadorI($_POST['data1'])) {
                $result['exception'] = 'Entrada de búsqueda no válida';
            } elseif (!$producto->setBuscadorL($_POST['data2'])) {
                $result['exception'] = 'Entrada de búsqueda no válida';
            } elseif ($result['dataset'] = $producto->searchProductoPrecioCategoria($_POST['idC'])) {
                $result['status'] = 1;
                $result['message'] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay coincidencias';
            }
            break;
        case 'searchProductoCalidad':
            $_POST = $producto->validateForm($_POST);
            if ($result['dataset'] = $producto->searchProductoCalidad($_POST['dataU'], $_POST['dataD'], $_POST['dataT'], $_POST['dataC'], $_POST['dataCi'])) {
                $result['status'] = 1;
                $result['message'] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay coincidencias';
            }
            break;
            //Buscar productos
        case 'searchProductoCalidadCategoria':
            $_POST = $producto->validateForm($_POST);
            if ($result['dataset'] = $producto->searchProductoCalidadCategoria($_POST['data'], $_POST['id_categoria'])) {
                $result['status'] = 1;
                $result['message'] = 'Valor encontrado';
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay coincidencias';
            }
            break;
        case 'readOne':
            if (!$producto->setId($_POST['idP'])) {
                $result['exception'] = 'Producto incorrecto';
            } elseif ($result['dataset'] = $producto->readOne()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'Producto inexistente';
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

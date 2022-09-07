<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/factura_detalle.php');

if (isset($_GET['action'])) {

    $result = ['status' => 0, 'message' => null, 'exception' => null];

    session_start();

    $factura = new Factura();

    if (isset($_SESSION['id_cliente'])) {
        switch ($_GET['action']) {
            case 'addCart':
                $_POST = $factura->validateForm($_POST);
                if (!$factura->checkDirection()) {
                    $result['exception'] = 'Por favor, primero ingrese una dirección nueva desde mi perfil para poder agregar al carrito';
                } elseif (!$factura->checkOrder()) {
                    $result['exception'] = 'Ocurrió un problema al obtener el pedido';
                } elseif (!$factura->setCantidadPorducto($_POST['cantidad'])) {
                    $result['exception'] = 'Ocurrió un problema al obtener la cantidad del producto';
                } elseif (!$factura->setIdProducto($_POST['id_producto'])) {
                    $result['exception'] = 'Ocurrió un problema al obtener el id del producto';
                } elseif ($factura->checkProductExist()) {
                    $result['exception'] = 'Ya existe este producto en el carrito de compra';
                } elseif (!$factura->checkStock()) {
                    $result['exception'] = 'Lo sentimos, no contamos con el inventario suficiente para agregar este producto al carrito';
                } elseif ($factura->createDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto agregado correctamente';
                    $_SESSION['id_factura'] = $factura->getIdFactura();
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Ha ocurrido un error inesperado';
                }
                break;
            case 'loadCart':
                if (!$factura->checkOrder()) {
                    $result['exception'] = 'Debe agregar un producto al carrito';
                } elseif ($result['dataset'] = $factura->readDetail()) {
                    $result['status'] = 1;
                    $result['total'] = $factura->total();
                    $result['NProd'] = $factura->getNProd();
                    $_SESSION['id_factura'] = $factura->getIdFactura();
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No tiene productos en el carrito';
                }
                break;
            case 'sumarCant':
                $_POST = $factura->validateForm($_POST);
                if (!$factura->checkOrder()) {
                    $result['exception'] = 'Ha ocurrido un error obteniendo el pedido';
                } elseif (!$factura->setCantidadPorducto($_POST['cantidad'])) {
                    $result['exception'] = 'Ha ocurrido un error con la cantidad';
                } elseif (!$factura->setIdProducto($_POST['id'])) {
                    $result['exception'] = 'Ha ocurrido un error con el id del producto';
                } elseif (!$factura->checkStock()) {
                    $result['exception'] = 'Lo sentimos, pero no contamos con el suficiente inventario para realizar la acción';
                } elseif ($factura->sumarCant()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Ha ocurrido un error inesperado';
                }
                break;
            case 'restarCant':
                $_POST = $factura->validateForm($_POST);
                if (!$factura->checkOrder()) {
                    $result['exception'] = 'Ha ocurrido un error obteniendo el pedido';
                } elseif (!$factura->setCantidadPorducto($_POST['cantidad'])) {
                    $result['exception'] = 'Ha ocurrido un error con la cantidad';
                } elseif (!$factura->setIdProducto($_POST['id'])) {
                    $result['exception'] = 'Ha ocurrido un error con el id del producto';
                } elseif ($factura->restarCant()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Ha ocurrido un error inesperado';
                }
                break;
            case 'actualizarDatos':
                $_POST = $factura->validateForm($_POST);
                if (!$factura->checkOrder()) {
                    $result['exception'] = 'Ha ocurrido un error obteniendo el pedido';
                } elseif (!$factura->setIdProducto($_POST['id'])) {
                    $result['exception'] = 'Ha ocurrido un error con el id del producto';
                } elseif ($result['subtotal'] = $factura->subTotal()) {
                    $result['total'] = $factura->total();
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Ha ocurrido un error inesperado';
                }
                break;
            case 'deleteRow':
                $_POST = $factura->validateForm($_POST);
                if (!$factura->checkOrder()) {
                    $result['exception'] = 'Ha ocurrido un error obteniendo el pedido';
                } elseif (!$factura->setIdProducto($_POST['id'])) {
                    $result['exception'] = 'Ha ocurrido un error con el id del producto';
                } elseif ($factura->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto eliminado del carrito';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Ha ocurrido un error inesperado';
                }
                break;
            case 'cargarMetodos':
                if ($result['dataset'] = $factura->loadMethod()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'cargarDireccion':
                if ($result['dataset'] = $factura->loadDirections()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                }
                break;

            case 'cargarDatos':
                if (!$factura->checkOrder()) {
                    $result['exception'] = 'Ha ocurrido un error obteniendo el pedido';
                } elseif ($result['dataset'] = $factura->getDataUser()) {
                    $result['total'] = $factura->total();
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'finishOrder':
                $_POST = $factura->validateForm($_POST);
                if (!isset($_POST['pay-method'])) {
                    $result['exception'] = 'Seleccione un método de pago por favor';
                } elseif (!$factura->setIdDirection($_POST['direction'])) {
                    $result['exception'] = 'Ha sucedido un error con la direccion';
                } elseif (!$factura->setIdMetodo($_POST['pay-method'])) {
                    $result['exception'] = 'Ha sucedido un error con el método de pago';
                } elseif ($factura->finishOrder()) {
                    $result['status'] = 1;
                    $result['message'] = 'Compra realizada con éxito';
                    if (!$factura->minusStock()) {
                        $result['exception'] = 'Ha ocurrido un error inesperado con el inventario';
                    }
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Ha ocurrido un error inesperado';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible dentro de la sesión';
                break;
        }
    } else {
        switch ($_GET['action']) {
            case 'addCart':
                $result['exception'] = 'Debe de iniciar sesión para añadir productos al carrito';
                break;
        }
    }
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}

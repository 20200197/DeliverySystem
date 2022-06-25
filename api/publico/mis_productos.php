<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/vendedor_producto.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $productos = new VendedorProducto;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (true) { //isset($_SESSION['id_usuario'])
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if (!$productos->setIdentificador(1)) { //Se debería de colocar el id de la sesión
                    $result['exception'] = 'No se logró identificar tu usuario';
                } elseif ($result['dataset'] = $productos->cargarProductos()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay productos registrados';
                }
                break;
            case 'categoria':
                if ($result['dataset'] = $productos->categorias()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay categorias disponibles';
                }
                break;
            case 'marca':
                if ($result['dataset'] = $productos->marca()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay categorias disponibles';
                }
                break;
            case 'guardar':
                $_POST = $productos->validateForm($_POST);
                if (!$productos->setNombre($_POST['nombre_productoA'])) {
                    $result['exception'] = 'Nombre no valido';
                } elseif (!$productos->setCantidad($_POST['cantidad_productoA'])) {
                    $result['exception'] = 'Cantidad no válida';
                } elseif (!$productos->setPrecio($_POST['precio_productoA'])) {
                    $result['exception'] = 'Precio no valido';
                } elseif (!$productos->setDescripcion($_POST['descripcion_productoA'])) {
                    $result['exception'] = 'Descripción no válida';
                } elseif (!$productos->setCategoria($_POST['categoriaA'])) {
                    $result['exception'] = 'Categoria no válida';
                } elseif (!$productos->setMarca($_POST['marcaA'])) {
                    $result['exception'] = 'Marca no válida';
                } elseif (!$productos->setUsuario(1)) { //Se debería colocar el id de la sesión
                    $result['exception'] = 'Usuario no válido';
                } elseif (!$productos->setImagen($_FILES['imagenA'])) {
                    $result['exception'] = $productos->getFileError();
                } elseif ($productos->guardarProducto()) {
                    $result['status'] = 1;
                    if ($productos->saveFile($_FILES['imagenA'], $productos->getRuta(), $productos->getImagen())) {
                        $result['message'] = 'Producto creado correctamente';
                    } else {
                        $result['message'] = 'Producto creado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'individual':
                if (!$productos->setIdentificador($_POST['identificador'])) {
                    $result['exception'] = 'No se encontró el producto a editar';
                } elseif ($result['dataset'] = $productos->productoIndividual()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'cantidadActual':
                if (!$productos->setIdentificador($_POST['identificador'])) {
                    $result['exception'] = 'No se encontró el producto a editar';
                } elseif ($result['dataset'] = $productos->cantidadActual()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'actualizarProducto':
                $_POST = $productos->validateForm($_POST);
                if (!$productos->setNombre($_POST['nombre_productoM'])) {
                    $result['exception'] = 'Nombre no valido';
                } elseif (!$productos->setCantidad($_POST['cantidad_productoM'])) {
                    $result['exception'] = 'Cantidad no válida';
                } elseif (!$productos->setPrecio($_POST['precio_productoM'])) {
                    $result['exception'] = 'Precio no valido';
                } elseif (!$productos->setDescripcion($_POST['descripcion_productoM'])) {
                    $result['exception'] = 'Descripción no válida';
                } elseif (!$productos->setCategoria($_POST['categoriaM'])) {
                    $result['exception'] = 'Categoria no válida';
                } elseif (!$productos->setMarca($_POST['marcaM'])) {
                    $result['exception'] = 'Marca no válida';
                } elseif (!$productos->setIdentificador($_POST['identificador'])) { //Se debería colocar el id de la sesión
                    $result['exception'] = 'Producto a actualizar no reconocido';
                } elseif(!$data = $productos->productoIndividual()) {
                    $result['exception'] = 'El producto a actualizar no existe';
                }elseif (!is_uploaded_file($_FILES['imagenM']['tmp_name'])) {
                    if ($productos->actualizar($_POST['opciones'], $data['imagen'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Producto modificado correctamente';
                    } else {
                        $result['message'] = 'Errocillo del bueno';
                        $result['exception'] = Database::getException();
                    }
                }elseif(!$productos->setImagen($_FILES['imagenM'])){
                    $result['exception'] = $productos->getFileError();
                }elseif($productos->actualizar($_POST['opciones'], $productos->getImagen())) {
                    $result['status'] = 1;
                    if ($productos->saveFile($_FILES['imagenM'], $productos->getRuta(), $productos->getImagen())) {
                        $result['message'] = 'Producto modificado correctamente';
                    } else {
                        $result['message'] = 'Producto modificado pero no se guardó la imagen';
                    }

                }else{
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

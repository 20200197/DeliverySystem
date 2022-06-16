<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_empleados.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $empleado = new Admin_Empleados;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_usuario'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $empleado->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar empleado
            case 'search':
                $_POST = $empleado->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un valor para buscar';
                } elseif ($result['dataset'] = $empleado->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Valor encontrado';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
                //Crear fila
            case 'create':
                $_POST = $empleado->validateForm($_POST);
                if (!$empleado->setNombre($_POST['nombre_empleado'])) {
                    $result['exception'] = 'Nombres incorrectos';
                } elseif (!$empleado->setApellido($_POST['apellido_empleado'])) {
                    $result['exception'] = 'Apellidos incorrectos';
                } elseif (!$empleado->setCorreo($_POST['correo_empleado'])) {
                    $result['exception'] = 'Correo incorrecto';
                    //Vertficamos si hay Correo idéntico
                } elseif ($empleado->read('correo_empleado', $empleado->getCorreo())) {
                    $result['exception'] = 'El correo ingresado ya esta registrado';
                } elseif (!$empleado->setUsuario($_POST['usuario_empleado'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$empleado->setDui($_POST['dui_empleado'])) {
                    $result['exception'] = 'Dui incorrecto';
                    //Vertficamos si hay Dui idéntico
                } elseif ($empleado->read('dui_empleado', $empleado->getDui())) {
                    $result['exception'] = 'El Dui ingresado ya esta registrado';
                } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen';
                } elseif (!$empleado->setImagen($_FILES['archivo'])) {
                    $result['exception'] = $empleado->getFileError();
                } elseif (!$empleado->setEstado($_POST['estado_ep'])) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif (!isset($_POST['id_tipo_empleado'])) {
                    $result['exception'] = 'Seleccione un tipo de empleado';
                } elseif (!$empleado->setTipo($_POST['id_tipo_empleado'])) {
                    $result['exception'] = 'Tipo de empleado incorrecto';
                } elseif ($_POST['contrasenia_empleado'] != $_POST['confirmar']) {
                    $result['exception'] = 'Claves diferentes';
                } elseif (!$empleado->setContrasenia($_POST['contrasenia_empleado'])) {
                    $result['exception'] = $empleado->getPasswordError();
                } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen';
                } elseif (!$empleado->setImagen($_FILES['archivo'])) {
                    $result['exception'] = $categoria->getFileError();
                } elseif ($empleado->createRow()) {
                    if ($empleado->saveFile($_FILES['archivo'], $empleado->getRut(), $empleado->getImagen())) {
                        $result['status'] = 1;
                        $result['message'] = 'Empleado registrado correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                }
                break;
            case 'readOne':
                if (!$empleado->setId($_POST['id'])) {
                    $result['exception'] = 'Empleado incorrecto';
                } elseif ($result['dataset'] = $empleado->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Empleado inexistente';
                }
                break;
                //Actualizar fila
            case 'update':
                $_POST = $empleado->validateForm($_POST);
                if (!$empleado->setId($_POST['id'])) {
                    $result['exception'] = 'Empleado incorrecto';
                } elseif (!$data = $empleado->readOne()) {
                    $result['exception'] = 'Empleado inexistente';
                } elseif (!$empleado->setNombre($_POST['nombre_em'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!$empleado->setApellido($_POST['apellido_em'])) {
                    $result['exception'] = 'Apellido incorrecto';
                } elseif (!$empleado->setCorreo($_POST['correo_em'])) {
                    $result['exception'] = 'Correo incorrecto';
                    //Vertficamos si hay Correo idéntico
                } elseif ($empleado->read('correo_empleado', $empleado->getCorreo())) {
                    $result['exception'] = 'El correo ingresado ya esta registrado';
                } elseif (!$empleado->setUsuario($_POST['usuario_em'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$empleado->setDui($_POST['dui_em'])) {
                    $result['exception'] = 'Dui incorrecto';
                } elseif (!$empleado->setEstado(isset($_POST['estado_em']) ? 1 : 0)) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif (!isset($_POST['id_tipo_em'])) {
                    $result['exception'] = 'Seleccione un tipo de empleado';
                } elseif (!$empleado->setTipo($_POST['id_tipo_em'])) {
                    $result['exception'] = 'Tipo de empleado incorrecto';
                } elseif ($_POST['contrasenia_em'] != $_POST['confirmar_contra']) {
                    $result['exception'] = 'Claves diferentes';
                } elseif (!$empleado->setContrasenia($_POST['contrasenia_em'])) {
                    $result['exception'] = $empleado->getPasswordError();
                } elseif (!is_uploaded_file($_FILES['img_em']['tmp_name'])) {
                    if ($empleado->updateRow($data['imagen_perfil_empleado'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Empleado modificado correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$empleado->setImagen($_FILES['img_em'])) {
                    $result['exception'] = $empleado->getFileError();
                } elseif ($empleado->updateRow($data['imagen_perfil_empleado'])) {
                    $result['status'] = 1;
                    if ($empleado->saveFile($_FILES['img_em'], $empleado->getRut(), $empleado->getImagen())) {
                        $result['message'] = 'Empleado modificado correctamente';
                    } else {
                        $result['message'] = 'Empleado modificado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Actualizar empleado 
            case 'update_':
                $_POST = $empleado->validateForm($_POST);
                if (!$empleado->setId($_POST['id'])) {
                    $result['exception'] = 'Empleado incorrecto';
                } elseif (!$data = $empleado->readOne()) {
                    $result['exception'] = 'Empleado inexistente';
                } elseif (!$empleado->setNombre($_POST['nombre_em'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!$empleado->setApellido($_POST['apellido_em'])) {
                    $result['exception'] = 'Apellido incorrecto';
                } elseif (!$empleado->setCorreo($_POST['correo_em'])) {
                    $result['exception'] = 'Correo incorrecto';
                    //Evaluamos correo que no se repita
                } elseif ($empleado->readD('correo_empleado', $empleado->getCorreo())) {
                    $result['exception'] = 'Este correo ya esta registrado';
                } elseif (!$empleado->setUsuario($_POST['usuario_em'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$empleado->setDui($_POST['dui_em'])) {
                    $result['exception'] = 'Dui incorrecto';
                    //Evaluamos el dui que no se repita
                } elseif ($empleado->readD('dui_empleado', $empleado->getDui())) {
                    $result['exception'] = 'Este Dui ya esta registrado';
                } elseif (!$empleado->setEstado(isset($_POST['estado_em']) ? 1 : 0)) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif (!isset($_POST['id_tipo_em'])) {
                    $result['exception'] = 'Seleccione un tipo de empleado';
                } elseif (!$empleado->setTipo($_POST['id_tipo_em'])) {
                    $result['exception'] = 'Tipo de empleado incorrecto';
                } elseif (!is_uploaded_file($_FILES['img_em']['tmp_name'])) {
                    if ($empleado->updateRow_($data['imagen_perfil_empleado'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Empleado modificado correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$empleado->setImagen($_FILES['img_em'])) {
                    $result['exception'] = $empleado->getFileError();
                } elseif ($empleado->updateRow_($data['imagen_perfil_empleado'])) {
                    $result['status'] = 1;
                    if ($empleado->saveFile($_FILES['img_em'], $empleado->getRut(), $empleado->getImagen())) {
                        $result['message'] = 'Empleado modificado correctamente';
                    } else {
                        $result['message'] = 'Empleado modificado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Eliminar fila
            case 'delete':
                if (!$producto->setId($_POST['id'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif (!$data = $producto->readOne()) {
                    $result['exception'] = 'Producto inexistente';
                } elseif ($producto->deleteRow()) {
                    $result['status'] = 1;
                    if ($producto->deleteFile($producto->getRuta(), $data['imagen_producto'])) {
                        $result['message'] = 'Producto eliminado correctamente';
                    } else {
                        $result['message'] = 'Producto eliminado pero no se borró la imagen';
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

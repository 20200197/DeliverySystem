<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_marca.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administrar_marca = new Marca;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
<<<<<<< Updated upstream
    if (isset($_SESSION['id_marca'])) {
=======
    if (isset($_SESSION['id_admin'])) {
        $result['session'] = 1;
>>>>>>> Stashed changes
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $administrar_marca->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Buscar empleado
            case 'search':
                $_POST = $administrar_marca->validateForm($_POST);
<<<<<<< Updated upstream
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un valor para buscar';
                    // $entrega->readAll();
                } elseif ($result['dataset'] = $administrar_marca->searchRows($_POST['search'])) {
=======
                if ($result['dataset'] = $administrar_marca->searchRows($_POST['data'])) {
>>>>>>> Stashed changes
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
                $_POST = $administrar_marca->validateForm($_POST);
<<<<<<< Updated upstream
                if (!$administrar_marca->setNombreMarca($_POST['nombre_marca'])) {
                    $result['exception'] = 'Marca incorrecta';
=======
                if ($_POST['nombre_marca'] == null) {
                    $result['exception'] = 'Ingresar una marca ';
                } elseif (!$administrar_marca->setNombreMarca($_POST['nombre_marca'])) {
                    $result['exception'] = 'Marca incorrecta';
                    //Evaluamos que no se repita la marca
                } elseif ($administrar_marca->read('nombre_marca', $administrar_marca->getNombreMarca())) {
                    $result['exception'] = 'Esta marca ya esta registrada';
>>>>>>> Stashed changes
                } elseif ($administrar_marca->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Marca registrada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'readOne':
<<<<<<< Updated upstream
                if (!$empleado->setId($_POST['id'])) {
                    $result['exception'] = 'Empleado incorrecto';
                } elseif ($result['dataset'] = $empleado->readOne()) {
=======
                if (!$administrar_marca->setId($_POST['id'])) {
                    $result['exception'] = 'marca incorrecto';
                } elseif ($result['dataset'] = $administrar_marca->readOne()) {
>>>>>>> Stashed changes
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Empleado inexistente';
                }
                break;
<<<<<<< Updated upstream
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
                if (!$administrar_marca->setId($_POST['id_marca'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif (!$data = $administrar_marca->readOne()) {
                    $result['exception'] = 'Producto inexistente';
                } elseif ($administrar_marca->deleteRow()) {
                    $result['status'] = 1;
=======
                //Actualizar estados
            case 'updateStatus':
                if (!$administrar_marca->setId($_POST['idP'])) {
                    $result['exception'] = 'Ha ocurrido un error al ejecutar la acción';
                } elseif (!$administrar_marca->getStatus()) {
                    $result['exception'] = 'Ha ocurrido un error al obtener el estado';
                } elseif ($administrar_marca->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado modificado con éxito';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Ha ocurrido un error inseperado';
                }
                break;
                //Actualizar fila
            case 'update':
                $_POST = $administrar_marca->validateForm($_POST);
                if (!$administrar_marca->setId($_POST['editar_marca'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif (!$administrar_marca->setNombreMarca($_POST['nombre_marca'])) {
                    $result['exception'] = 'nombre incorrecto';
                    //Comprobamos que no haya la misma marca
                } elseif ($administrar_marca->readD('nombre_marca', $administrar_marca->getNombreMarca())) {
                    $result['exception'] = 'Esta marca ya esta registrada';
                } elseif ($administrar_marca->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto modificado correctamente';
>>>>>>> Stashed changes
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

<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/usuarios.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $usuario = new Usuarios;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'exception' => null, 'dataset' => null, 'username' => null, 'email' => null, 'image' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_usuario'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'getUser':
                if (isset($_SESSION['alias_usuario'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['alias_usuario'];
                    $result['email'] = $_SESSION['email_usuario'];
                    $result['image'] = $_SESSION['imagen_usuario'];
                } else {
                    $result['exception'] = 'Usuario de empleado indefinido';
                }
                break;
                //Cerrar sesión
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['exception'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
                //Leer perfil de empleado
            case 'readProfile':
                if ($result['dataset'] = $usuario->readProfile()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Empleado inexistente';
                }
                break;
                //Editar perfil de empleado
            case 'editProfile':
                $_POST = $usuario->validateForm($_POST);
                if (!$data = $usuario->readOnes()) {
                    $result['exception'] = 'Perfil de empleado inexistente';
                } elseif (!$usuario->setNombre_empleado($_POST['nombre_empleado'])) {
                    $result['exception'] = 'Nombre incorrectos';
                } elseif (!$usuario->setApellido_empleado($_POST['apellido_empleado'])) {
                    $result['exception'] = 'Apellido incorrectos';
                } elseif (!$usuario->setUsuario_empleado($_POST['usuario_empleado'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$usuario->setCorreo_empleado($_POST['correo_empleado'])) {
                    $result['exception'] = 'Correo incorrecto';
                } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
                    if ($usuario->editProfile($data['imagen_perfil_empleado'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Perfil modificado corectamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$usuario->setImagen_perfil_empleado($_FILES['archivo'])) {
                    $result['exception'] = $usuario->getFileError();
                } elseif ($usuario->editProfile($data['imagen_perfil_empleado'])) {
                    $result['status'] = 1;
                    if ($usuario->saveFile($_FILES['archivo'], $usuario->getRuta(), $usuario->getImagen_perfil_empleado())) {
                        $result['message'] = 'Perfil modificado correctamente';
                    } else {
                        $result['message'] = 'Perfil modificado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Cambiar contraseña 
            case 'changePassword':
                $_POST = $usuario->validateForm($_POST);
                if (!$usuario->setId($_SESSION['id_usuario'])) {
                    $result['exception'] = 'Usuario de empleado incorrecto';
                } elseif (!$usuario->checkPassword($_POST['actual'])) {
                    $result['exception'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['nueva'] != $_POST['confirmar']) {
                    $result['exception'] = 'Contraseñas nuevas diferentes';
                } elseif (!$usuario->setContrasenia_empleado($_POST['nueva'])) {
                    $result['exception'] = $usuario->getPasswordError();
                } elseif ($usuario->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Leer todos las filas
            case 'readAll':
                if ($result['dataset'] = $usuario->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Leer registro
            case 'readRegistro':
                if (!$usuario->setId($_POST['id'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif ($result['dataset'] = $usuario->readRegistro()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Usuario inexistente';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el administrador no ha iniciado sesión.
        switch ($_GET['action']) {
                //Leer usuarios
            case 'readUsers':
                if ($usuario->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existe al menos un usuario registrado';
                } else {
                    $result['exception'] = 'No existen usuarios registrados';
                }
                break;
                //Registro
            case 'register':
                $_POST = $usuario->validateForm($_POST);
                if (!$usuario->setNombre_empleado($_POST['nombre_empleado'])) {
                    $result['exception'] = 'Nombres incorrectos';
                } elseif (!$usuario->setApellido_empleado($_POST['apellido_empleado'])) {
                    $result['exception'] = 'Apellidos incorrectos';
                } elseif (!$usuario->setCorreo_empleado($_POST['correo_empleado'])) {
                    $result['exception'] = 'Correo incorrecto';
                } elseif (!$usuario->setUsuario_empleado($_POST['usuario_empleado'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$usuario->setDui_empleado($_POST['dui_empleado'])) {
                    $result['exception'] = 'Dui incorrecto';
                } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen';
                } elseif (!$usuario->setImagen_perfil_empleado($_FILES['archivo'])) {
                    $result['exception'] = $usuario->getFileError();
                } elseif (!$usuario->setEstado_empleado($_POST['estado_ep'])) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif (!isset($_POST['id_tipo_empleado'])) {
                    $result['exception'] = 'Seleccione un tipo de empleado';
                } elseif (!$usuario->setId_tipo_empleado(1)) {
                    $result['exception'] = 'Tipo de empleado incorrecto';
                } elseif ($_POST['contrasenia_empleado'] != $_POST['confirmar']) {
                    $result['exception'] = 'Claves diferentes';
                } elseif (!$usuario->setContrasenia_empleado($_POST['contrasenia_empleado'])) {
                    $result['exception'] = $usuario->getPasswordError();
                } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen';
                } elseif (!$usuario->setImagen_perfil_empleado($_FILES['archivo'])) {
                    $result['exception'] = $categoria->getFileError();
                } elseif ($usuario->createUsuario()) {
                    if ($usuario->saveFile($_FILES['archivo'], $usuario->getRuta(), $usuario->getImagen_perfil_empleado())) {
                        $result['status'] = 1;
                        $result['message'] = 'Usuario registrado correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                }
                break;
                //Login
            case 'logIn':
                $_POST = $usuario->validateForm($_POST);
                if (!$usuario->checkUser($_POST['usuario'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif ($usuario->checkPassword($_POST['clave'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                    $_SESSION['id_usuario'] = $usuario->getId();
                    $_SESSION['alias_usuario'] = $usuario->getUsuario_empleado();
                    $_SESSION['email_usuario'] = $usuario->getCorreo_empleado();
                    $_SESSION['imagen_usuario'] = $usuario->getImagen_perfil_empleado();
                } else {
                    $result['exception'] = 'Clave incorrecta';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}

<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../ayudantes/autentificador.php');
require_once('../modelos/administrar_admin.php');
require_once('../modelos/administrar_perfil.php');
require_once('../ayudantes/security_token.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $token = new SecurityToken;
    $admin = new Administrador;
    $autentificador = new Autentificador;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null, 'session' => 0);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_admin']) && $token->getToken('admin') == $_SESSION['admin_token']) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAdmin':
                $result['exception'] = 'Ya está logueado, cierre sesión para acceder al login';
                break;
                //Cerrar sesión
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $token->delToken('admin');
                    $result['message'] = 'Se ha cerrado sesión correctamente';
                } else {
                    $result['exception'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
                //Registrar admin
            case 'registerAdmin':
                $_POST = $admin->validateForm($_POST);
                if (!$admin->setNombre($_POST['name'])) {
                    $result['exception'] = 'Ingrese un nombre válido';
                } elseif (!$admin->setApellido($_POST['lastname'])) {
                    $result['exception'] = 'Ingrese un apellido válido';
                } elseif (!$admin->setDui($_POST['dui'])) {
                    $result['exception'] = 'Ingrese un DUI válido';
                } elseif (!$admin->setTelefono($_POST['phone'])) {
                    $result['exception'] = 'Ingrese un Teléfono válido';
                } elseif (!$admin->setCorreo($_POST['email'])) {
                    $result['exception'] = 'Ingrese un correo válido';
                } elseif (!$admin->setUsuario($_POST['user'])) {
                    $result['exception'] = 'Ingrese un usuario válido';
                } elseif ($_POST['pass1'] != $_POST['pass2']) {
                    $result['exception'] = 'Las contraseñas no coinciden';
                } elseif (!$admin->setClave($_POST['pass1'])) {
                    $result['exception'] = 'Ingrese una contraseña correcta';
                } elseif ($admin->validateExist('usuario_admin', $admin->getUsuario())) {
                    $result['exception'] = 'El usuario ingresado ya está en uso';
                } elseif ($admin->validateExist('dui_admin', $admin->getDui())) {
                    $result['exception'] = 'El DUI ingresado ya está en uso';
                } elseif ($admin->validateExist('correo_admin', $admin->getCorreo())) {
                    $result['exception'] = 'El correo ingresado ya está en uso';
                } elseif ($admin->validateExist('telefono_admin', $admin->getTelefono())) {
                    $result['exception'] = 'El telefono ingresado ya está en uso';
                } elseif ($admin->registerAdmin()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador creado con exito';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $admin->readAdminsAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administradores encontrados';
                } elseif (!$admin->readAdminsAll()) {
                    $result['exception'] = 'Datos no encontrados';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Buscador
            case 'search':
                $_POST = $admin->validateForm($_POST);
                if ($result['dataset'] = $admin->searchAdmins($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Datos encontrados';
                } else {
                    $result['exception'] = 'No se han encontrado datos';
                }
                break;
                //Actualizar estatus
            case 'updateStatus':
                $_POST = $admin->validateForm($_POST);
                if ($admin->changeStatus($_POST['id'], $_POST['estado'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Se ha modificado el estado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Checar status
            case 'checkStatus':
                $_POST = $admin->validateForm($_POST);
                if ($admin->getStatus($_POST['id'])) {
                    $result['status'] = 1;
                } else {
                    $result['status'] = 1;
                }
                break;
            case 'generarCodigo':
                //Se genera el código
                if ($result['dataset'] = $autentificador->generarSecreto()) {
                    $result['status'] = 1;
                    $result['message'] = 'Código generado correctamente';
                } else {
                    $result['exception'] = 'No se logró generar el código';
                }
                break;
            case 'verificarRegistro':
                //Se limpian los campos
                $_POST = $admin->validateForm($_POST);
                //Se verifica el código ingresado
                if ($autentificador->verificarCodigo($_SESSION['identificador'], $_POST['codigo'])) {
                    //Se procede a ingresar la clave
                    //Se trata de inserta
                    if ($admin->colocarLlave($_SESSION['identificador'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Autentificación de dos pasos activada';
                    } elseif (Database::getException()) {
                        $result['exception'] = Database::getException();
                    } else {
                        $result['exception'] = 'No se logró completar el proceso, por favor vuelve a intentarlo';
                    }
                    unset($_SESSION['identificador']);
                } else {
                    $result['exception'] = 'Código incorrecto';
                }
                break;
            case 'ObtenerEstadoVerificacion':
                //Se manda a obtener el estado de la verificación en dos pasos
                if ($admin->obtenerEstadoLlave()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['status'] = 0;
                }
                break;
            case 'eliminarAutentificacion':
                //Se verifica que ya se haya confirmado el cambio
                if (!isset($_SESSION['confirmacionPass'])) {
                    $result['exception'] = 'Debes de verificar tu identidad antes de desactivar la autentificación en dos pasos';
                    //Se procede a eliminar el campo
                } elseif ($admin->eliminarLlave()) {
                    $result['status'] = 1;
                    $result['message'] = 'Se ha desactivado la autentificación en dos pasos';
                    unset($_SESSION['confirmacionPass']);
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No se puedo desactivar la autentificación en dos pasos';
                }
                break;
            case 'verificarPass':
                //Se limpian los campos
                $_POST = $admin->validateForm($_POST);
                //Se coloca el nombre del usuario para buscar
                if (!$admin->setUsuario($_SESSION['nombre_admin'])) {
                    $result['exception'] = 'Ocurrió un problema al verificar la contraseña';
                } elseif ($admin->checkPassChange($_POST['clave'])) {
                    $result['status'] = 1;
                    $_SESSION['confirmacionPass'] = true;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'La contraseña es incorrecta';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible dentro de la sesión';
                break;
        }
    } else {
        switch ($_GET['action']) {
                //Leer admin
            case 'readAdmin':
                if ($admin->readAdmins()) {
                    $result['status'] = 1;
                    $result['message'] = 'Inicie sesión para comenzar';
                } else {
                    $result['exception'] = 'Bienvenido, cree el primer usuario para empezar';
                }
                break;
                //Registrar admin
            case 'registerAdmin':
                $_POST = $admin->validateForm($_POST);
                if (!$admin->setNombre($_POST['name'])) {
                    $result['exception'] = 'Ingrese un nombre válido';
                } elseif (!$admin->setApellido($_POST['lastname'])) {
                    $result['exception'] = 'Ingrese un apellido válido';
                } elseif (!$admin->setDui($_POST['dui'])) {
                    $result['exception'] = 'Ingrese un DUI válido';
                } elseif (!$admin->setTelefono($_POST['phone'])) {
                    $result['exception'] = 'Ingrese un Teléfono válido';
                } elseif (!$admin->setCorreo($_POST['email'])) {
                    $result['exception'] = 'Ingrese un correo válido';
                } elseif (!$admin->setUsuario($_POST['user'])) {
                    $result['exception'] = 'Ingrese un usuario válido';
                } elseif ($_POST['pass1'] != $_POST['pass2']) {
                    $result['exception'] = 'Las contraseñas no coinciden';
                } elseif (!$admin->setClave($_POST['pass1'])) {
                    $result['exception'] = 'Ingrese una contraseña correcta';
                } elseif ($admin->registerAdmin()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador creado con exito';
                    $admin->insertCambio();
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Iniciar sesión en admin
            case 'loginAdmin':
                $_POST = $admin->validateForm($_POST);
                if (!$admin->setUsuario($_POST['user'])) {
                    $result['exception'] = 'Ingrese un usuario válido';
                } elseif (!$admin->checkUser()) {
                    $result['exception'] = 'El usuario es incorrecto';
                } elseif (!$admin->checkStatus()) {
                    $result['exception'] = 'Lo sentimos, usted se encuentra desactivado';
                } elseif (!$admin->verifyUnlockDate()) {
                    $result['exception'] = 'Su cuenta ha sido desactivada durante un día por haber fallado el inicio de sesión 3 veces';
                } elseif ($admin->checkPass($_POST['password']) && $admin->checkStatus()) {
                    //Se verifica si el usuario tiene habilitado el segundo paso de autentificacion
                    $_SESSION['nombre_admin'] = $admin->getUsuario();
                    $_SESSION['id_admin_temporal'] = $admin->getId();
                    //Asiganmos consulta que verifica los datos que han pasado desde su 
                    //ultimo cambio de contraseña al dataset
                    //$result['dataset'] = $admin->checkRango();
                    $rango = $admin->checkRango();
                    //Buscamos si en la consulta se encuentra el dato 91 days
                    //Si han pasado 91 dias se manda una excepcion
                    //if (in_array("91 days", $result['dataset']) == true) {

                    /**
                     * Se verifica únicamente cuando sea igual o mayor a 91 días
                     * 
                     * Se separa para obtener la cantida de días
                     */
                    $fecha = explode(" ", $rango['rango_ch']);
                    if (floatval($fecha[0]) > 90) {
                        $_SESSION['id_admin'] = null;


                        $result['exception'] = 'Lo sentimos, no cambio la contraseña hace 90 dias, debe de recuperarla';
                    } else {

                        $result['status'] = 1;
                        $result['message'] = 'Autenticación correcta';

                        if ($admin->verificarSegundoPaso()) {
                            $result['status'] = 2;
                        } else {
                            $_SESSION['id_admin'] = $_SESSION['id_admin_temporal'];
                            $token->setToken('admin');
                            $result['status'] = 1;
                            unset($_SESSION['id_admin_temporal']);
                        }
                        $admin->resetAttempts();
                    }
                } elseif (!$admin->checkPass($_POST['password'])) {
                    if ($admin->failedAttempt()) {
                        $result['exception'] = 'Ha superado el limite de intentos permitidos, vuelva a intentar mañana';
                    } else {
                        $result['exception'] = 'Contraseña incorrecta';
                    }
                }
                break;
            case 'verificacionSegundoPaso':
                if (isset($_SESSION['id_admin_temporal'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Coloca el pin de autentificación';
                } else {
                    $result['exception'] = 'Debes de verificar la contraseña antes de pasar al segundo paso de verificación';
                }
                break;
            case 'segundoPaso':
                //Se limpian los campos
                $_POST = $admin->validateForm($_POST);
                //Se verifica que se ha colocado la contraseña anteiormente
                if (!isset($_SESSION['id_admin_temporal'])) {
                    $result['exception'] = 'Debes de verificar la contraseña antes de pasar al segundo paso de verificación';
                    //Se obtiene la clave del usuarios
                } elseif ($data = $admin->obtenerLlave()) {
                    //Se procede a revisar si la llave es correcta
                    if ($autentificador->verificarCodigo($data['verificacion'], $_POST['codigo'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Segundo paso de verificación completado';
                        unset($_SESSION['id_admin_temporal']);
                        $_SESSION['id_admin'] = $data['id_admin'];
                        $token->setToken('admin');
                    } else {
                        $result['exception'] = 'El pin ingresado es incorrecto';
                    }
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No se encontró tu usuario';
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

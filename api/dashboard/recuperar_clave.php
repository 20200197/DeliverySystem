<?php
//Se cargan el resto de archivos .php necesarios
require_once '../ayudantes/database.php';
require_once '../ayudantes/validator.php';
require_once '../modelos/recuperacion.php';
//Se instancia la clase a utilizar
$recuperar = new Recuperacion;
//Se inicia la sesión
session_start();
//Se crea un arreglo donde se guardarán los datos a retornar
$result = array('status' => false, 'dataset' => null, 'message' => null, 'exception' => null);
//Se verifica que si haya una acción
if (isset($_GET['action'])) {
    //Se revisa la acción
    switch ($_GET['action']) {
        case 'solicitarCambio':
            //Se sanean los campos enviados
            $_POST = $recuperar->validateForm($_POST);
            //Se verifica si es un usuario real
            if (!$recuperar->setUsuarioAdmin($_POST['usuario'])) {
                $result['exception'] = 'Nombre de usuario incorrecto';
            } elseif ($result['dataset'] = $recuperar->obtenerCorreoAdministrador()) {
                $result['status'] = true;
                $result['message'] = 'Autentificación de usuario completada';
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No existe el nombre de usuario';
            }
            break;
        case 'validarCorreo':
            //Se sanean los datos
            $_POST = $recuperar->validateForm($_POST);
            //Se verifica si es un correo real
            if (!$recuperar->validateEmail($_POST['correo'])) {
                $result['exception'] = 'Correo invalido';
                //Se valida que el correo sea igual
            } elseif ($_SESSION['correo_admin'] != $_POST['correo']) {
                $result['exception'] = 'El código no coincide';
                //Se obtiene los datos y se envia el correo
            } elseif ($result['dataset'] = $recuperar->datosAdministrador()) {
                $result['status'] = true;
                $result['message'] = 'Correo validado correctamente';
                //Se genera una variable de confirmación
                $_SESSION['correoValidado'] = true;
                //Se genera el token y la fecha de expiración
                $result['token'] = $recuperar->generarToken();
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'El correo ingresado no existe';
            }
            break;
        case 'reenvio':
            //Se verifica que ya se ha validado el correo
            if (!isset($_SESSION['correoValidado'])) {
                $result['exception'] = 'El correo no ha sido validado, por favor regresa y validalo';
            } elseif (!$_SESSION['correoValidado']) {
                $result['exception'] = 'Ocurrió un problema durante tu validación';
            } elseif ($result['dataset'] = $recuperar->datosAdministrador()) {
                //Se crea un nuevo código y se reenvia
                $result['status'] = true;
                $result['message'] = 'Correo validado correctamente';
                $_SESSION['correoValidado'] = true;
                $result['token'] = $recuperar->generarToken();
            } else {
                $result['exception'] = 'Ocurrió un problema al generar el código';
            }
            break;
        case 'validarCodigo':
            //Se agrega la zona horaria
            date_default_timezone_set("America/El_Salvador");
            $fecha = new DateTime();
            //Se sanean los datos
            $_POST = $recuperar->validateForm($_POST);
            //Se revisa si ya se ha iniciado el proceso de recuperación
            if (!isset($_SESSION['token']) || !isset($_SESSION['tokenLimit'])) {
                $result['exception'] = 'No has iniciado el proceso de recuperación de contraseña';
            } elseif (empty($_SESSION['token']) || empty($_SESSION['tokenLimit'])) {
                //Se revisa que estén generadas la fecha limite y el token
                $result['exception'] = 'Ocurrió un problema en el proceso, favor reiniciar el procedimiento';
            } elseif ($fecha->format('d-m-Y H:i:s') > $_SESSION['tokenLimit']) {
                //Se revisa si el código todavía es vigente
                $result['exception'] = 'La duración del token ha caducado, favor solicita un código nuevo';
            } elseif ($_POST['codigo'] != $_SESSION['token']) {
                //Se revisa que el código sea el correcto
                $result['exception'] = 'El código ingresado no es correcto';
            } else {
                //Se confirma el código y se continua el cambio
                $result['message'] = 'Código verificado correctamente';
                $result['status'] = true;
                $_SESSION['confirmacion'] = true;
                //Se eliminan las variables de validación de contraseña
                unset($_SESSION['token']);
                unset($_SESSION['tokenLimit']);
                unset($_SESSION['correoValidado']);
            }
            break;
        case 'cambiarPass':
            //Se verifica que ya se confirmó el código de reestablecimiento
            if (!isset($_SESSION['confirmacion'])) {
                $result['exception'] = 'Debes de confirmar el código de reestablecimiento antes de cambiar la constraseña';
                //Se verifica que si se haya confirmado con éxito
            } else if ($_SESSION['confirmacion']) {
                //Se obtienen los datos de la cuenta del usuario para validar
            } elseif ($data = $recuperar->informacionAdministrador()) {
                //Se procede a validar si la contraseña ya ha sido colocada
                if (password_verify($_POST['clave'], $data['clave_admin'])) {
                    $result['exception'] = 'La contraseña colocada no se puede asignar';
                    //Se valida si cumple con los requistos de una contraseña segura
                } elseif (!$recuperar->setPassAdmin(
                    $_POST['clave'],
                    $data['nombre_admin'],
                    $data['apellido_admin'],
                    $data['usuario_admin'],
                    $data['fecha']
                )) {
                    $result['exception'] = $recuperar->getPasswordError();
                    //Se procede a cambiar la contraseña
                } elseif ($recuperar->reestablecerPassAdministrador()) {
                    $result['status'] = true;
                    $result['message'] = 'Contraseña reestablecida correctamente';
                    //Se quitan los datos de validación de $_SESSION
                    unset($_SESSION['id_admin']);
                    unset($_SESSION['confirmacion']);
                    unset($_SESSION['correo_admin']);
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'La contraseña no pudo ser reestablecida';
                }
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No se encontraron los datos de tu cuenta';
            }
            break;
        default:
            $result['exception'] = 'La acción solicitada no está disponible';
            break;
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode('Recurso no disponible'));
}

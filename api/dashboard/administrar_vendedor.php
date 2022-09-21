<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_vendedor.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administrar_vendedor = new AdministrarVendedor;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null, 'session' => 0);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_vendedor']) or isset($_SESSION['id_admin'])) { // Se cambiará por isset($_SESSION['id_usuario'])
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'login':
                $_POST = $administrar_vendedor->validateForm($_POST);
                if (!$administrar_vendedor->setUsuario($_POST['user'])) {
                    $result['exception'] = 'Ingrese un usuario válido';
                } elseif (!$administrar_vendedor->checkUser()) {
                    $result['exception'] = 'El usuario es incorrecto';
                } elseif (!$administrar_vendedor->checkStatus()) {
                    $result['exception'] = 'Lo sentimos, usted se encuentra desactivado';
                } elseif ($administrar_vendedor->checkPass($_POST['password']) && $administrar_vendedor->checkStatus()) {

                    $_SESSION['id_vendedor'] = $administrar_vendedor->getId();
                    $_SESSION['nombre_vendedor'] = $administrar_vendedor->getUsuario();
                    $result['dataset'] = $administrar_vendedor->checkRango();
                    if (in_array("91 days", $result['dataset']) == true) {
                        $_SESSION['id_vendedor'] = null;

                        $result['status'] = 0;
                        $result['exception'] = 'Lo sentimos, no cambio la contraseña hace 90 dias, debe de recuperarla';
                    } else {

                        $result['status'] = 1;
                        $result['message'] = 'Autenticación correcta';
                    }
                } elseif (!$administrar_vendedor->checkPass($_POST['password'])) {
                    $result['exception'] = 'Contraseña incorrecta';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $administrar_vendedor->obtenerVendedores()) {
                    $result['status'] = 1;
                } elseif ($result['exception'] = Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos de momento';
                }
                break;
                //Cerrar sesión
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Se ha cerrado sesión correctamente';
                } else {
                    $result['exception'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'cambiarEstado':
                if (!$administrar_vendedor->setEstado($_POST['estado'])) {
                    $result['exception'] = 'Estado no valido';
                } elseif (!$administrar_vendedor->setIdentificador($_POST['identificador'])) {
                    $result['exception'] = 'Identificador no valido';
                } elseif ($administrar_vendedor->cambiarEstado()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cambio de estado exitoso';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'buscar':
                $_POST = $administrar_vendedor->validateForm($_POST);
                if (!$administrar_vendedor->setBuscador($_POST['buscador'])) {
                    $result['exception'] = 'Entrada de busqueda no valida';
                } elseif ($result['dataset'] = $administrar_vendedor->buscar()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No se encontraron registros con la busqueda solicitada';
                }
                break;
            case 'detalles':
                if (!$administrar_vendedor->setIdentificador($_POST['identificador'])) {
                    $result['exception'] = 'Identificador no valido';
                } elseif ($result['dataset'] = $administrar_vendedor->detalles()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'delete':
                if (!$administrar_vendedor->setIdentificador($_POST['identificador'])) {
                    $result['exception'] = 'Identificador no valido';
                } elseif ($administrar_vendedor->eliminar()) {
                    $result['status'] = 1;
                    $result['message'] = 'Vendedor eliminado correctamente';
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

    } else {
        switch ($_GET['action']) {
            case 'register':
                $_POST = $administrar_vendedor->validateForm($_POST);
                if (!$administrar_vendedor->setNombre($_POST['name'])) {
                    $result['exception'] = 'Nombre inválido';
                } elseif (!$administrar_vendedor->setApellido($_POST['lastname'])) {
                    $result['exception'] = 'Apellido inválido';
                } elseif (!$administrar_vendedor->setDui($_POST['dui'])) {
                    $result['exception'] = 'DUI Invalido';
                } elseif ($administrar_vendedor->validateExist('dui_vendedor', $_POST['dui'])) {
                    $result['exception'] = 'Ese dui ya se encuentra registrado';
                } elseif (!$administrar_vendedor->setCorreo($_POST['email'])) {
                    $result['exception'] = 'Correo inválido';
                } elseif ($administrar_vendedor->validateExist('correo_vendedor', $_POST['email'])) {
                    $result['exception'] = 'Ese correo ya se encuentra registrado';
                } elseif (!$administrar_vendedor->setTelefono($_POST['phone'])) {
                    $result['exception'] = 'Teléfono inválido';
                } elseif ($administrar_vendedor->validateExist('telefono_vendedor', $_POST['phone'])) {
                    $result['exception'] = 'Ese numero de telefono ya se encuentra registrado';
                } elseif (!$administrar_vendedor->setUsuario($_POST['user'])) {
                    $result['exception'] = 'Usuario inválido';
                } elseif ($administrar_vendedor->validateExist('usuario_vendedor', $_POST['user'])) {
                    $result['exception'] = 'Ese usuario ya se encuentra en uso';
                } elseif ($_POST['pass1'] != $_POST['pass2']) {
                    $result['exception'] = 'Las contraseñas no coinciden';
                } elseif (!$administrar_vendedor->setClave($_POST['pass1'])) {
                    $result['exception'] = 'Contraseña inválida';
                } elseif (!is_uploaded_file($_FILES['solvencia-file']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen para la solvencia';
                } elseif (!$administrar_vendedor->setSolvencia($_FILES['solvencia-file'])) {
                    $result['exception'] = $administrar_vendedor->getFileError();
                } elseif (!is_uploaded_file($_FILES['antecedente-file']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen para los antecedentes';
                } elseif (!$administrar_vendedor->setAntecedentes($_FILES['antecedente-file'])) {
                    $result['exception'] = $administrar_vendedor->getFileError();
                } elseif (!$administrar_vendedor->setDireccion($_POST['direction'])) {
                    $result['exception'] = 'Dirección inválida';
                } elseif (!is_uploaded_file($_FILES['profile-file']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una foto';
                } elseif (!$administrar_vendedor->setFoto($_FILES['profile-file'])) {
                    $result['exception'] = $administrar_vendedor->getFileError();
                } elseif (!$administrar_vendedor->setCoordenadas($_POST['cords'])) {
                    $result['exception'] = 'coordenadas invalidas';
                } elseif ($administrar_vendedor->registrar()) {
                    if (!$administrar_vendedor->saveFile($_FILES['solvencia-file'], $administrar_vendedor->getRutaSolvencia(), $administrar_vendedor->getSolvencia())) {
                        $result['status'] = 1;
                        $result['message'] = 'Usuario creado pero no se guardó la solvencia';
                        $administrar_vendedor->insertCambio();
                    } elseif (!$administrar_vendedor->saveFile($_FILES['antecedente-file'], $administrar_vendedor->getRutaAntecedente(), $administrar_vendedor->getAntecedente())) {
                        $result['status'] = 1;
                        $result['message'] = 'Usuario creado pero no se guardó el antecedente';
                        $administrar_vendedor->insertCambio();
                    } elseif (!$administrar_vendedor->saveFile($_FILES['profile-file'], $administrar_vendedor->getRutaFoto(), $administrar_vendedor->getFoto())) {
                        $result['status'] = 1;
                        $result['message'] = 'Usuario creado pero no se guardó la foto personal';
                        $administrar_vendedor->insertCambio();
                    } else {
                        $result['status'] = 1;
                        $result['message'] = 'Usuario creado correctamente';
                        $administrar_vendedor->insertCambio();
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'login':
                $_POST = $administrar_vendedor->validateForm($_POST);
                if (!$administrar_vendedor->setUsuario($_POST['user'])) {
                    $result['exception'] = 'Ingrese un usuario válido';
                } elseif (!$administrar_vendedor->checkUser()) {
                    $result['exception'] = 'El usuario es incorrecto';
                } elseif (!$administrar_vendedor->checkStatus()) {
                    $result['exception'] = 'Lo sentimos, usted se encuentra desactivado';
                } elseif ($administrar_vendedor->checkPass($_POST['password']) && $administrar_vendedor->checkStatus()) {

                    

                    $result['dataset'] = $administrar_vendedor->checkRango();
                    if (in_array("91 days", $result['dataset']) == true) {
                        $result['status'] = 0;
                        $result['exception'] = 'Lo sentimos, no cambio la contraseña hace 90 dias, debe de recuperarla';
                    } else {
                        $_SESSION['id_vendedor'] = $administrar_vendedor->getId();
                        $_SESSION['nombre_vendedor'] = $administrar_vendedor->getUsuario();

                        $result['status'] = 1;
                        $result['message'] = 'Autenticación correcta';
                    }
                } elseif (!$administrar_vendedor->checkPass($_POST['password'])) {
                    $result['exception'] = 'Contraseña incorrecta';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}

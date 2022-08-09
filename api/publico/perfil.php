<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/administrar_vendedor.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $perfil = new AdministrarVendedor;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_vendedor'])) { //isset($_SESSION['id_usuario'])
        //Colocamos la sesion como 1
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
                //Leer perfil de vendedor
            case 'readProfile':
                if ($result['dataset'] = $perfil->readProfile()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Vendedor inexistente';
                }
                break;
                //Actualizamos perfil
            case 'updatePerfil':
                $_POST = $perfil->validateForm($_POST);
                if (!$data = $perfil->readOne()) {
                    $result['exception'] = 'Vendedor inexistente';
                } elseif (!$perfil->setNombre($_POST['nombre_vendedor'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!$perfil->setApellido($_POST['apellido_vendedor'])) {
                    $result['exception'] = 'Apellido incorrecto';
                } elseif (!$perfil->setCorreo($_POST['correo_vendedor'])) {
                    $result['exception'] = 'Correo incorrecto';
                    //Evaluamos correo que no se repita
                } elseif ($perfil->readD('correo_vendedor', $perfil->getCorreo())) {
                    $result['exception'] = 'Este correo ya esta registrado';
                } elseif (!$perfil->setTelefono($_POST['telefono_vendedor'])) {
                    $result['exception'] = 'Teléfono incorrecto';
                    //Evaluamos telefono que no se repita
                } elseif ($perfil->readD('telefono_vendedor', $perfil->getTelefono())) {
                    $result['exception'] = 'Este correo ya esta registrado';
                } elseif (!$perfil->setUsuario($_POST['usuario_vendedor'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$perfil->setDui($_POST['dui_vendedor'])) {
                    $result['exception'] = 'Dui incorrecto';
                    //Evaluamos el dui que no se repita
                } elseif ($perfil->readD('dui_vendedor', $perfil->getDui())) {
                    $result['exception'] = 'Este Dui ya esta registrado';
                // } elseif (!is_uploaded_file($_FILES['solvencia-file']['tmp_name'])) {
                //     if ($perfil->updatePerfil($data['imagen_perfil_empleado'])) {
                //         $result['status'] = 1;
                //         $result['message'] = 'Empleado modificado correctamente';
                //     } else {
                //         $result['exception'] = Database::getException();
                //     }
                // } elseif (!$perfil->setSolvencia($_FILES['img_em'])) {
                //     $result['exception'] = $perfil->getFileError();
                // } elseif ($perfil->updatePerfil($data['imagen_perfil_empleado'])) {
                //     $result['status'] = 1;
                //     if ($perfil->saveFile($_FILES['img_em'], $perfil->getRuta(), $empleado->getImagen())) {
                //         $result['message'] = 'Perfil modificado correctamente';
                //     } else {
                //         $result['message'] = 'Perfil modificado pero no se guardó la imagen';
                //     }
                // }
                } elseif (!is_uploaded_file($_FILES['solvencia-file']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen para la solvencia';
                } elseif (!$perfil->setSolvencia($_FILES['solvencia-file'])) {
                    $result['exception'] = $perfil->getFileError();
                } elseif (!is_uploaded_file($_FILES['antecedente-file']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen para los antecedentes';
                } elseif (!$perfil->setAntecedentes($_FILES['antecedente-file'])) {
                    $result['exception'] = $perfil->getFileError();
                } elseif (!$perfil->setDireccion($_POST['direccion_vendedor'])) {
                    $result['exception'] = 'Dirección inválida';
                } elseif (!is_uploaded_file($_FILES['profile-file']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una foto';
                } elseif (!$perfil->setFoto($_FILES['profile-file'])) {
                    $result['exception'] = $perfil->getFileError();
                } elseif (!$perfil->setCoordenadas($_POST['cords'])) {
                    $result['exception'] = 'coordenadas invalidas';
                } elseif ($perfil->updatePerfil($data['antecedente_penal'],$data['solvencia_pnc'],$data['foto_vendedor'])) {
                    if (!$perfil->saveFile($_FILES['solvencia-file'], $perfil->getRutaSolvencia(), $perfil->getSolvencia())) {
                        $result['status'] = 1;
                        $result['message'] = 'Usuario creado pero no se guardó la solvencia';
                    } elseif (!$perfil->saveFile($_FILES['antecedente-file'], $perfil->getRutaAntecedente(), $perfil->getAntecedente())) {
                        $result['status'] = 1;
                        $result['message'] = 'Usuario creado pero no se guardó el antecedente';
                    } elseif (!$perfil->saveFile($_FILES['profile-file'], $perfil->getRutaFoto(), $perfil->getFoto())) {
                        $result['status'] = 1;
                        $result['message'] = 'Usuario creado pero no se guardó la foto personal';
                    } else {
                        $result['status'] = 1;
                        $result['message'] = 'Usuario creado correctamente';
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

<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/favorito.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $favorito = new Favorito;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    //if (isset($_SESSION['id_admin'])) {
    $result['session'] = 1;
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET['action']) {
            //Leer direcciones del cliente  
        case 'readAll':
            if ($result['dataset'] = $favorito->readAll()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No tiene agregados aún productos favoritos';
            }
            break;
            //Leemos datos de un registro
        case 'readOne':
            if ($result['dataset'] = $favorito->readActive()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'Producto favorito inexistente';
            }
            break;
            //Creamos favo
        case 'create':
            $_POST = $favorito->validateForm($_POST);
            if (!$favorito->setIdProducto($_POST['idP'])) {
                $result['exception'] = 'Producto incorrecto';
            } elseif ($favorito->createFavorito()) {
                $result['status'] = 1;
                $result['message'] = 'Producto añadido a favoritos correctamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
        case 'delete':
            if (!$favorito->setIdProducto($_POST['idP'])) {
                $result['exception'] = 'Producto incorrecto';
            } elseif (!$data = $favorito->readActive()) {
                $result['exception'] = 'Producto inexistente';
            } elseif ($favorito->deleteFavorito()) {
                $result['status'] = 1;
                $result['message'] = 'Favorito eliminado correctamente';
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

// case 'updatePerfil':
//     $_POST = $repartidor->validateForm($_POST);
//     if (!$data = $repartidor->readOne()) {
//         $result['exception'] = 'Repartidor inexistente';
//     } elseif (!$repartidor->setNombre($_POST['nombre_repartidor'])) {
//         $result['exception'] = 'Nombre incorrecto';
//     } elseif (!$repartidor->setApellido($_POST['apellido_repartidor'])) {
//         $result['exception'] = 'Apellido incorrecto';
//     } elseif (!$repartidor->setDireccion($_POST['direccion_repartidor'])) {
//         $result['exception'] = 'Dirección inválida';
//     } elseif (!$repartidor->setPlaca($_POST['placa_repartidor'])) {
//         $result['exception'] = 'Placa inválida';
//     } elseif (!$repartidor->setCorreo($_POST['correo_repartidor'])) {
//         $result['exception'] = 'Correo incorrecto';
//         //Evaluamos correo que no se repita
//     } elseif ($repartidor->readD('correo_repartidor', $repartidor->getCorreo())) {
//         $result['exception'] = 'Este correo ya esta registrado';
//     } elseif (!$repartidor->setUsuario($_POST['usuario_repartidor'])) {
//         $result['exception'] = 'Usuario incorrecto';
//     } elseif ($repartidor->readD('usuario_repartidor', $repartidor->getUsuario())) {
//         $result['exception'] = 'Este usuario ya esta registrado';
//     } elseif (!$repartidor->setTelefono($_POST['telefono_repartidor'])) {
//         $result['exception'] = 'Teléfono incorrecto';
//         //Evaluamos telefono que no se repita
//     } elseif ($repartidor->readD('telefono_repartidor', $repartidor->getTelefono())) {
//         $result['exception'] = 'Este teléfono ya esta registrado';
//         // } elseif (!is_uploaded_file($_FILES['solvencia-file']['tmp_name'])) {
//         //     if ($perfil->updatePerfil($data['imagen_perfil_empleado'])) {
//         //         $result['status'] = 1;
//         //         $result['message'] = 'Empleado modificado correctamente';
//         //     } else {
//         //         $result['exception'] = Database::getException();
//         //     }
//         // } elseif (!$perfil->setSolvencia($_FILES['img_em'])) {
//         //     $result['exception'] = $perfil->getFileError();
//         // } elseif ($perfil->updatePerfil($data['imagen_perfil_empleado'])) {
//         //     $result['status'] = 1;
//         //     if ($perfil->saveFile($_FILES['img_em'], $perfil->getRuta(), $empleado->getImagen())) {
//         //         $result['message'] = 'Perfil modificado correctamente';
//         //     } else {
//         //         $result['message'] = 'Perfil modificado pero no se guardó la imagen';
//         //     }
//         // }
//     } elseif (!is_uploaded_file($_FILES['solvencia_p']['tmp_name'])) {
//         if ($repartidor->updatePerfil($data['foto_repartidor'], $data['solvencia_pnc'], $data['antecedente_penal'], $data['foto_vehiculo'], $data['foto_placa_vehiculo'])) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado correctamente';
//         } else {
//             $result['exception'] = Database::getException();
//         }
//     } elseif (!$repartidor->setSolvencia($_FILES['solvencia_p'])) {
//         $result['exception'] = $repartidor->getFileError();
//     } elseif (!is_uploaded_file($_FILES['antecedente_p']['tmp_name'])) {
//         if ($repartidor->updatePerfil($data['foto_repartidor'], $data['solvencia_pnc'], $data['antecedente_penal'], $data['foto_vehiculo'], $data['foto_placa_vehiculo'])) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado correctamente';
//         } else {
//             $result['exception'] = Database::getException();
//         }
//     } elseif (!$repartidor->setAntecedentes($_FILES['antecedente_p'])) {
//         $result['exception'] = $repartidor->getFileError();
//     } elseif (!is_uploaded_file($_FILES['foto_p']['tmp_name']) || !is_uploaded_file($_FILES['solvencia_p']['tmp_name']) || !is_uploaded_file($_FILES['antecedente_p']['tmp_name']) || !is_uploaded_file($_FILES['vehiculo_p']['tmp_name'])  || !is_uploaded_file($_FILES['placa_p']['tmp_name'])) {
//         if ($repartidor->updatePerfil($data['foto_repartidor'], $data['solvencia_pnc'], $data['antecedente_penal'], $data['foto_vehiculo'], $data['foto_placa_vehiculo'])) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado correctamente';
//         } else {
//             $result['exception'] = Database::getException();
//         }
//     } elseif (!$repartidor->setFotoPlaca($_FILES['placa_p'])) {
//         $result['exception'] = $repartidor->getFileError();
//     } elseif (!is_uploaded_file($_FILES['foto_p']['tmp_name'])) {
//         if ($repartidor->updatePerfil($data['foto_repartidor'], $data['solvencia_pnc'], $data['antecedente_penal'], $data['foto_vehiculo'], $data['foto_placa_vehiculo'])) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado correctamente';
//         } else {
//             $result['exception'] = Database::getException();
//         }
//     } elseif (!$repartidor->setFoto($_FILES['foto_p'])) {
//         $result['exception'] = $repartidor->getFileError();
//     } elseif (!is_uploaded_file($_FILES['vehiculo_p']['tmp_name'])) {
//         if ($repartidor->updatePerfil($data['foto_repartidor'], $data['solvencia_pnc'], $data['antecedente_penal'], $data['foto_vehiculo'], $data['foto_placa_vehiculo'])) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado correctamente';
//         } else {
//             $result['exception'] = Database::getException();
//         }
//     } elseif (!$repartidor->setFotoVehiculo($_FILES['vehiculo_p'])) {
//         $result['exception'] = $repartidor->getFileError();
//     } elseif ($repartidor->updatePerfil($data['foto_repartidor'], $data['solvencia_pnc'], $data['antecedente_penal'], $data['foto_vehiculo'], $data['foto_placa_vehiculo'])) {
//         if (!$repartidor->saveFile($_FILES['foto_p'], $repartidor->getRutaFoto(), $repartidor->getFoto())) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado pero no se guardo la foto';
//         } elseif (!$repartidor->saveFile($_FILES['solvencia_p'], $repartidor->getRutaSolvencia(), $repartidor->getSolvencia())) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado pero no se guardó la solvencia';
//         } elseif (!$repartidor->saveFile($_FILES['antecedente_p'], $repartidor->getRutaAntecedente(), $repartidor->getAntecedente())) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado pero no se guardó el antecedente';
//         } elseif (!$repartidor->saveFile($_FILES['vehiculo_p'], $repartidor->getRutaVehiculo(), $repartidor->getFotoVehiculo())) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado pero no se guardó la placa';
//         } elseif (!$repartidor->saveFile($_FILES['placa_p'], $repartidor->getRutaPlaca(), $repartidor->getFotoPlaca())) {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado pero no se guardó la placa';
//         } else {
//             $result['status'] = 1;
//             $result['message'] = 'Perfil modificado correctamente';
//         }
//     } else {
//         $result['exception'] = Database::getException();
//     }
//     break;

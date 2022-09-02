<?php
//Se incluye la librería para usarla posteriormente
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include_once '../librerias/PHPMailer/src/PHPMailer.php';
include_once '../librerias/PHPMailer/src/Exception.php';
include_once '../librerias/PHPMailer/src/SMTP.php';

//Se crea un objeto de PHPMailer
$Mailer = new PHPMailer(true);
//Se crea una variable donde se guardará el resultado de la ejecución
$mensaje = array('status' => false, 'message' => '');
//Se verifica que dentro existan datos dentro de la llamada
if (!isset($_POST) && empty($_POST)) {
    //Se intenta realizar el proceso del mensaje
    try {
        //Se empieza con la configuración del SMTP
        $Mailer->SMTPDebug = SMTP::DEBUG_SERVER; //Modo de depuración de SMTP
        $Mailer->isSMTP(); //Activación del servicio de SMTP
        $Mailer->Host = "smtp.gmail.com"; //Servidor SMTP al cuál se conectará
        $Mailer->SMTPAuth = true; //Se habilita la autentificación de SMTP
        $Mailer->Username = ''; //Nombre de usuario SMTP
        $Mailer->Password = ''; //Contraseña SMTP
        $Mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; //Mécanismo de encriptación
        $Mailer->Port = 465; //Puerto SMTP
        $Mailer->setFrom('', ''); //Remitente del correo (Correo y nombre)

        //Configuración del destinatario
        $Mailer->addAddress('', ''); //Correo y nombre del destinatario

        //Configuración del cuerpo del correo
        $Mailer->isHTML(true); //Se confirma que se enviará contenido HTML
        $Mailer->Subject = 'DeliverySystem - Recuperación de contraseña'; //Asunto del correo
        $Mailer->Body = ''; //Contenido del correo para los usuarios que si soporten HTML
        $Mailer->AltBody = 'Recuperación de contraseña'; //Contenido del correo para los usuarios que no soporten HTML
        $Mailer->send(); //Se procesa el mensaje y se envía
        $mensaje['status'] = true; //Se cambia el estado a enviado para confirmar que el proceso ha sido éxitoso
        $mensaje['message'] = 'El mensaje de recuperación ha sido enviado'; //Mensaje de confirmación
    
    } catch (exception $exception) {
        $mensaje['message'] = 'El mensaje no se pudo enviar'; //Mensaje con el problema
    }
    print(json_encode($mensaje)); //Se pasa a formato JSON y se retorna
} else {
    $mensaje['message'] = 'Se deben enviar datos para generar el correo'; //Mensaje con el problema
     print(json_encode($mensaje)); //Se pasa a formato JSON y se retorna
}
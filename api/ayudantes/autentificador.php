<?php

//Se incluyen los archivos necesarios para el correcto funcionamiento
require_once "../librerias/google_authenticator/PHPGangsta/GoogleAuthenticator.php";

class Autentificador extends PHPGangsta_GoogleAuthenticator
{


    //Función para generar un secreto
    public function generarSecreto()
    {
        $secreto = $this->createSecret();
        $_SESSION['codigo'] = $secreto;
        return $this->generarQR($secreto);
    }

    //Función para generar un códigoQR
    public function generarQR($clave)
    {
        return $codigoQR = $this->getQRCodeGoogleUrl('DeliverySystem', $clave);
    }

    //Función para validar que el código ingresado sea el correcto
    public function verificarCodigo($valor)
    {
        if ($this->verifyCode($_SESSION['codigo'], $valor)) {
            return true;
        } else {
            return false;
        }
    }
}

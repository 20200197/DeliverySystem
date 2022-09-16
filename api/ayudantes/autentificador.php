<?php

//Se incluyen los archivos necesarios para el correcto funcionamiento
require_once "../librerias/google_authenticator/PHPGangsta/GoogleAuthenticator.php";

class Autentificador extends PHPGangsta_GoogleAuthenticator
{

    //Función para generar un secreto
    public function generarSecreto()
    {
        $secreto = $this->createSecret();
        $_SESSION['identificador'] = $secreto;
        $_SESSION['codigo'] = $this->getCode($secreto);
        return $this->generarQR($secreto);
    }

    //Función para generar un códigoQR
    public function generarQR($clave)
    {
        $contenedor = array();
        array_push($contenedor, $clave);
        $codigoQR = $this->getQRCodeGoogleUrl('DeliverySystem', $clave);
        array_push($contenedor, $codigoQR);
        return $contenedor;
    }

    //Función para validar que el código ingresado sea el correcto
    public function verificarCodigo($usuario, $valor)
    {
        if ($this->verifyCode($usuario, $valor)) { //Llave del usuario
            return true;
        } else {
            return false;
        }
    }
}

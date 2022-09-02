<?php

//Clase para gestionar el proceso de recueperación de contraseña

class Recuperacion extends Validator
{
    /**
     * Se crean las variables globales para guardar y manipular los datos
     */
    private $identificadorAdmin = null;
    private $usuarioAdmin = null;
    private $correoAdmin = null;
    private $passAdmin = null;
    private $tokenAdmin = null;



    /**
     * Función para procesar el correo de un usuario
     */


    /**
     * Funciones para guardar y devolver datos propios de la clase
     */

    public function setIdentificadorAdmin($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->identificadorAdmin = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setUsuarioAdmin($valor)
    {
        if ($this->validateString($valor, 2, 120)) {
            $this->usuarioAdmin = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setPassAdmin($valor, $nombre, $apellido, $usuario, $fecha)
    {
        if ($this->validateSafePassword($valor, $nombre, $apellido, $usuario, $fecha)) {
            $this->passAdmin = password_hash($valor, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Función que genera un token para validar identidad
     * y cambiar la contraseña
     */

    public function generarToken()
    {
        $token = openssl_random_pseudo_bytes(3, $cstrong);
        $this->tokenAdmin = bin2hex($token);
    }

    public function getCorreoAdmin()
    {
        return $this->correoAdmin;
    }

    public function getTokenAdmin()
    {
        return $this->tokenAdmin;
    }

    /**
     * Funciones para operar con la base de datos
     */

    public function obtenerCorreoAdministrador()
    {
        $sql = 'SELECT id_admin, correo_admin FROM administrador
        WHERE usuario_admin = ?';
        $params = array($this->nombreUsuario);
        $data = Database::getRow($sql, $params);
        if (!$data) {
            return false;
        } else {
            $this->correoAdmin = $data['correo_admin'];
            $this->identificadorAdmin = $data['id_admin'];
            return true;
        }
    }

    public function reestablecerPassAdministrador()
    {
        $sql = 'UPDATE administrador SET clave_admin = ? WHERE id_admin = ?';
        $params = array($this->passAdmin, $this->identificadorAdmin);
        return Database::executeRow($sql, $params);
    }
}

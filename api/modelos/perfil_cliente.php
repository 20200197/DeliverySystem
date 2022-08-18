<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class PerfilCliente extends Validator
{
    //Se delacara las variables globales
    private $identificador = null;
    private $nombreCliente = null;
    private $apellidoCliente = null;
    private $correoCliente = null;
    private $telefonoCliente = null;
    private $fotoCliente = null;
    private $passCliente = null;
    private $ruta = '../imagenes/cliente/foto/';

    //Se crean los constructores para colocar los datos
    public function setIdentificador($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->identificador = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombreCliente($value)
    {
        if ($this->validateAlphabetic($value, 2, 30)) {
            $this->nombreCliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setApellidoCliente($value)
    {
        if ($this->validateAlphabetic($value, 2, 30)) {
            $this->apellidoCliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreoCliente($value)
    {
        if ($this->validateEmail($value)) {
            $this->correoCliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setTelefonoCliente($value)
    {
        if ($this->validatePhone($value)) {
            $this->telefonoCliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setPassCliente($value)
    {
        if ($this->validatePassword($value)) {
            $this->passCliente = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setFotoCliente($value)
    {
        if ($this->validateImageFile($value, 2000, 2000)) {
            $this->fotoCliente = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    //Métodos para obtener el valor de las variables

    public function getRuta()
    {
        return $this->ruta;
    }

    public function getFotoCliente()
    {
        return $this->fotoCliente;
    }

    //Funciones para realizar los mantenimientos en la DB

    //Obtener los datos del perfil
    public function datosPerfil()
    {
        $sql = "SELECT nombre_cliente, apellido_cliente, correo_cliente, telefono_cliente, foto_cliente
        FROM cliente WHERE id_cliente = ?";
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Actualizar los datos del perfil
    public function actualizarPerfil($foto)
    {
        
        $sql = 'UPDATE cliente SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, telefono_cliente = ?, foto_cliente = ? ';
        $params = array($this->nombreCliente, $this->apellidoCliente, $this->correoCliente, $this->telefonoCliente, $foto);
        print_r($params);
        return Database::executeRow($sql, $params);
    }
}

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
    private $UserCliente = null;
    private $ruta = '../imagenes/cliente/';

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

    public function setUserCliente($value)
    {
        if ($this->validateString($value, 2, 30)) {
            $this->UserCliente = $value;
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

    public function getUser()
    {
        return $this->UserCliente;
    }

    public function getPass()
    {
        return $this->passCliente;
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

        $sql = 'UPDATE cliente SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, telefono_cliente = ?, foto_cliente = ? WHERE id_cliente = ?';
        $params = array($this->nombreCliente, $this->apellidoCliente, $this->correoCliente, $this->telefonoCliente, $foto, 1);
        //$params = array($this->nombreCliente, $this->apellidoCliente, $this->correoCliente, $this->telefonoCliente, $foto, $_SESSION['id_cliente']);
        return Database::executeRow($sql, $params);
    }

    //Verificar contraseña
    public function verificarPass($pass)
    {
        $sql = 'SELECT clave_cliente FROM cliente WHERE id_cliente = ?';
        $params = array($_SESSION['id_cliente']); //$_SESSION['id_cliente']
        if (!$data = Database::getRow($sql, $params)) {
            return false;
        } elseif (!password_verify($pass, $data['clave_cliente'])) {
            return false;
        } else {
            return true;
        }
    }

    //obtener nombre de usuario
    public function nombreUsuario()
    {
        $sql = 'SELECT usuario_cliente FROM cliente WHERE id_cliente = ?';
        $params = array($_SESSION['id_cliente']); //$_SESSION['id_cliente']
        return Database::getRow($sql, $params);
    }

    //Obtener datos de la cuenta
    public function datosCuenta()
    {
        $sql = 'SELECT clave_cliente FROM cliente WHERE id_cliente = ?';
        $params = array($_SESSION['id_cliente']); //$_SESSION['id_cliente']
        return Database::getRow($sql, $params);
    }
    //Actualizar datos de la cuenta
    public function actualizarCuenta($user, $pass)
    {
        $sql = 'UPDATE cliente SET usuario_cliente = ?, clave_cliente = ? WHERE id_cliente = ?';
        $params = array($user, $pass, $_SESSION['id_cliente']); //$_SESSION['id_cliente']
        return Database::executeRow($sql, $params);
    }

    public function insertCambio()
    {

        $sql = 'INSERT into cambio_contra_cliente (fecha_cambio,id_admin) values(current_date,2);';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->usuario, $this->clave,  $this->telefono);
        return Database::executeRow($sql, $params);
    }

    public function changeCambio()
    {

        $sql = 'UPDATE cambio_contra_cliente set fecha_cambio = current_date , id_cliente=? ';
        $params = array($_SESSION['id_cliente']);
        return Database::executeRow($sql, $params);
    }

    public function checkRango()
    {
        $sql = 'SELECT current_date - fecha_cambio as rango_ch
        from cambio_contra_cliente where id_cliente=?';
        $params = array($_SESSION['id_cliente']);

        return Database::getRow($sql, $params);
    }
}

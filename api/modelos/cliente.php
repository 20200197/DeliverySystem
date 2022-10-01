<?php

use JetBrains\PhpStorm\ArrayShape;

class Cliente extends Validator
{
    private $id = null;
    private $nombre = null;
    private $apellido = null;
    private $dui = null;
    private $correo = null;
    private $telefono = null;
    private $usuario = null;
    private $clave = null;
    private $status = null;
    private $foto = null;
    private $ruta = '../imagenes/cliente/';

    //Metodos set

    public function setId($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->id = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($valor)
    {
        if ($this->validateAlphabetic($valor, 1, 30)) {
            $this->nombre = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setApellido($valor)
    {
        if ($this->validateAlphabetic($valor, 1, 30)) {
            $this->apellido = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setDui($valor)
    {
        if ($this->validateDUI($valor)) {
            $this->dui = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo($valor)
    {
        if ($this->validateEmail($valor)) {
            $this->correo = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setTelefono($valor)
    {
        if ($this->validatePhone($valor)) {
            $this->telefono = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setUsuario($valor)
    {
        if ($this->validateAlphanumeric($valor, 1, 65)) {
            $this->usuario = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setClave($valor)
    {
        if ($this->validatePassword($valor)) {
            $this->clave = password_hash($valor, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setStatus($bool)
    {
        if ($this->validateBoolean($bool)) {
            $this->status = $bool;
            return true;
        } else {
            return false;
        }
    }

    public function setFoto($valor)
    {
        if ($this->validateImageFile($valor, 500, 500)) {
            $this->foto = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    //Metodos get

    public function getRuta()
    {
        return $this->ruta;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getFoto()
    {
        return $this->foto;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getApellido()
    {
        return $this->apellido;
    }

    public function getUsuario()
    {
        return $this->usuario;
    }

    //Metodos sobre la base de datos

    public function createRow()
    {
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');
        $sql = 'INSERT INTO cliente(nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, usuario_cliente, clave_cliente, status_cliente, fecha_registro_cliente, foto_cliente, id_estado_cliente, intentos_fallidos, fecha_desbloqueo)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, CURRENT_DATE - 1)';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->telefono, $this->usuario, $this->clave, true, $date, $this->foto);
        return Database::executeRow($sql, $params);
    }

    //Metodo para obtener el id del usuario que quiere iniciar sesión
    public function checkUser()
    {
        $sql = "SELECT id_cliente, status_cliente, nombre_cliente, apellido_cliente, usuario_cliente, CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_cliente
                FROM cliente 
                WHERE usuario_cliente = ?";
        $params = array($this->usuario);
        if ($data = Database::getRow($sql, $params)) {
            $this->id = $data['id_cliente'];
            $this->status = $data['status_cliente'];
            $this->nombre = $data['nombre_cliente'];
            $this->apellido = $data['apellido_cliente'];
            $this->usuario = $data['nombre_cliente'];
            return true;
        } else {
            return false;
        }
    }

    //Metodo para verificar la contraseña
    public function checkPass($pass)
    {
        $sql = 'SELECT clave_cliente, id_cliente
                FROM cliente
                WHERE id_cliente = ?';
        $params = array($this->id);

        if (!$data = Database::getRow($sql, $params)) {
            return false;
        } elseif (!password_verify($pass, $data['clave_cliente'])) {
            return false;
        } else {
            return true;
        }
    }

    //Metodo para validar campos repetidos
    public function getData($column, $data)
    {
        $sql = "SELECT $column 
                FROM cliente 
                WHERE $column = ?";
        $params = array($data);
        return Database::getRow($sql, $params);
    }

    //Se agrega por primera vez la fecha de cambio de contraseña para cuando loguee
    public function insertCambio()
    {

        $sql = 'INSERT INTO cambio_contra_cliente(fecha_cambio, id_cliente, id_cargo) VALUES(CURRENT_DATE, (SELECT id_cliente FROM cliente ORDER BY id_cliente  DESC LIMIT 1), 4)';
        return Database::executeRow($sql, null);
    }

    //Se cambia fecha de cambio de contraseña de cliente
    public function changeCambio()
    {

        $sql = 'UPDATE cambio_contra_cliente set fecha_cambio = current_date , id_cliente=? ';
        $params = array($_SESSION['id_cliente']);
        return Database::executeRow($sql, $params);
    }

    //Dias en los que ha pasado el ultimo cambio de contraseña
    public function checkRango()
    {
        $sql = 'SELECT current_date - fecha_cambio as rango_ch
        from cambio_contra_cliente where id_cliente=?';
        $params = array($_SESSION['id_cliente']);

        return Database::getRow($sql, $params);
    }
}

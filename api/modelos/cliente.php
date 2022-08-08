<?php

class Cliente extends Validator {
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

    //Metodos sobre la base de datos

    public function createRow()
    {
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');
        $sql = 'INSERT INTO cliente(nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, usuario_cliente, clave_cliente, status_cliente, fecha_registro_cliente, foto_cliente)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->telefono, $this->usuario, $this->clave, true, $date, $this->foto);
        return Database::executeRow($sql, $params);
    }

    public function getData($column, $data)
    {
        $sql = "SELECT $column 
                FROM cliente 
                WHERE $column = ?";
        $params = array($data);
        return Database::getRow($sql, $params);
    }
}

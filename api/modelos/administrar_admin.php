<?php

class Administrador extends Validator{
    //creamos atributos de la clase administrador
    private $id = null;
    private $nombre = null;
    private $apellido = null;
    private $dui = null;
    private $correo = null;
    private $usuario = null;
    private $clave = null;
    private $telefono = null;

    //Creamos metodos set
    public function setId($valor)
    {
        if($this->validateNaturalNumber($valor)) {
            $this->id = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($valor)
    {
        if ($this->validateAlphabetic($valor, 3, 30)) {
            $this->nombre = $valor;
            return true;
        } else {
            return false;
        }
    }
    
    public function setApellido($valor)
    {
        if ($this->validateAlphabetic($valor, 3, 30)) {
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

    public function setUsuario($valor)
    {
        if ($this->validateAlphanumeric($valor, 3, 65)) {
            $this->usuario = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setClave($clave)
    {
        if ($this->validatePassword($clave)) {
            $this->clave = password_hash($clave, PASSWORD_DEFAULT);
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

    //Creamos metodos get
    public function getId()
    {
        return $this->id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getApellido()
    {
        return $this->apellido;
    }

    public function getDui()
    {
        return $this->dui;
    }

    public function getCorreo()
    {
        return $this->correo;
    }

    public function getUsuario()
    {
        return $this->usuario;
    }

    public function getClave()
    {
        return $this->clave;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    //Creamos metodos para administrar los administradores
    public function readAdmins()
    {
        $sql = 'SELECT id_admin
                FROM administrador';
        return Database::getRow($sql, null);
    }

    public function registerAdmin()
    {
        // Se establece la zona horaria local para obtener la fecha del servidor.
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');
        $sql = 'INSERT INTO administrador(nombre_admin, apellido_admin, dui_admin, correo_admin, usuario_admin, clave_admin, fecha_registro_admin, telefono_admin, status_admin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, true)';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->usuario, $this->clave, $date, $this->telefono);
        return Database::executeRow($sql, $params);
    }

    public function checkUser()
    {
        $sql = 'SELECT id_admin FROM administrador WHERE usuario_admin = ?';
        $params = array($this->usuario);

        return Database::getRow($sql, $params);
    }

    public function checkPass($pass)
    {
        $sql = 'SELECT id_admin, clave_admin FROM administrador WHERE usuario_admin = ?';
        $params = array($this->usuario);

        if (!$data = Database::getRow($sql, $params)) {
            return false;
        } elseif (!password_verify($pass, $data['clave_admin'])) {
            return false;
        } else {
            $this->id = $data['id_admin'];
            return true;
        }
    }

    public function readAdminsAll()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, usuario_admin, dui_admin, correo_admin, fecha_registro_admin, telefono_admin, status_admin
                FROM administrador WHERE id_admin != ?
                ORDER BY fecha_registro_admin';
        $params = array($_SESSION['id_admin']);

        return Database::getRows($sql, $params);
    }

    public function validateExist($column, $data)
    {
        $sql = "SELECT * FROM administrador
                WHERE $column = ?";
        $params = array($data);

        return Database::getRow($sql, $params);
    }

    public function searchAdmins($data)
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, usuario_admin, dui_admin, correo_admin, fecha_registro_admin, telefono_admin, status_admin
                FROM administrador WHERE nombre_admin ILIKE ? AND id_admin != ? OR apellido_admin ILIKE ? AND id_admin != ? OR usuario_admin ILIKE ? AND id_admin != ? OR dui_admin ILIKE ? AND id_admin != ? OR correo_admin ILIKE ? AND id_admin != ?
                ORDER BY fecha_registro_admin';
        $params = array("%$data%", $_SESSION['id_admin'], "%$data%", $_SESSION['id_admin'], "%$data%", $_SESSION['id_admin'], "%$data%", $_SESSION['id_admin'], "%$data%", $_SESSION['id_admin']);
        
        return Database::getRows($sql, $params);
    }

    public function getStatus($id)
    {
        $sql = 'SELECT status_admin FROM administrador WHERE id_admin = ?';
        $params = array($id);

        if ($data = Database::getRow($sql, $params)) {
            return $data['status_admin'];
        }
    }

    public function changeStatus($id){
        if ($this->getStatus($id)) {
            $sql = 'UPDATE administrador SET status_admin = false WHERE id_admin = ?';
        } else {
            $sql = 'UPDATE administrador SET status_admin = true WHERE id_admin = ?';
        }
        $params = array($id);

        return Database::executeRow($sql, $params);
    }
}
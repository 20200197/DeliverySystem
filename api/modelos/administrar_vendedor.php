<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class AdministrarVendedor extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = null;
    private $nombre = null;
    private $apellido = null;
    private $dui = null;
    private $correo = null;
    private $telefono = null;
    private $usuario = null;
    private $clave = null;
    private $solvencia = null;
    private $ruta_solvencia = '../imagenes/vendedores/solvencias/';
    private $antecedentes = null;
    private $ruta_antecedente = '../imagenes/vendedores/antecedentes/';
    private $direccion = null;
    private $descripcion = null;
    private $estado = null;
    private $foto = null;
    private $ruta_foto = '../imagenes/vendedores/';
    private $coordenadas = null;
    private $buscador = null;

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

    public function setIdentificador($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->identificador = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 3, 30)) {
            $this->nombre = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setApellido($value)
    {
        if ($this->validateAlphabetic($value, 3, 30)) {
            $this->apellido = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDui($value)
    {
        if ($this->validateDUI(($value))) {
            $this->dui = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setTelefono($value)
    {
        if ($this->validatePhone($value)) {
            $this->telefono = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setUsuario($value)
    {
        if ($this->validateAlphanumeric($value, 1, 65)) {
            $this->usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setClave($value)
    {
        if ($this->validatePassword($value)) {
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setSolvencia($file)
    {
        if ($this->validateImageFile($file, 5000, 5000)) {
            $this->solvencia = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setAntecedentes($file)
    {
        if ($this->validateImageFile($file, 5000, 5000)) {
            $this->antecedentes = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setDireccion($value)
    {
        if ($this->validateDirection($value)) {
            $this->direccion = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDescripcion($value)
    {
        if ($this->validateAlphanumeric($value, 3, 500)) {
            $this->descripcion = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setEstado($value)
    {
        if ($this->validateBoolean($value)) {
            $this->estado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFoto($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->foto = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setCoordenadas($cords)
    {
        if (isset($cords)) {
            $this->coordenadas = $cords;
            return true;
        } else {
            return false;
        }
    }

    public function setBuscador($value)
    {
        if ($this->validateString($value, 0, 50)) {
            $this->buscador = '%' . $value . '%';
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->identificador;
    }

    public function getRutaAntecedente()
    {
        return $this->ruta_antecedente;
    }

    public function getRutaSolvencia()
    {
        return $this->ruta_solvencia;
    }

    public function getRutaFoto()
    {
        return $this->ruta_foto;
    }

    public function getAntecedente()
    {
        return $this->antecedentes;
    }

    public function getSolvencia()
    {
        return $this->solvencia;
    }

    public function getFoto()
    {
        return $this->foto;
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    //Función para obtener todos los datos de los cliente

    public function obtenerVendedores()
    {
        $sql = "SELECT id_vendedor, CONCAT(nombre_vendedor, ' ',apellido_vendedor) as nombre_completo, dui_vendedor, correo_vendedor,
        usuario_vendedor, solvencia_pnc FROM vendedor WHERE status = true";
        $params = null;
        return Database::getRows($sql, $params);
    }

    //función para cambiar el estado de los clientes

    public function cambiarEstado()
    {
        $sql = "UPDATE cliente SET status_cliente = ? WHERE id_cliente = ?";
        $params = array($this->estado, $this->identificador);
        return Database::executeRow($sql, $params);
    }

    //Función para buscar vendedores

    public function buscar()
    {
        $sql = "SELECT id_vendedor, CONCAT(nombre_vendedor, ' ',apellido_vendedor) as nombre_completo, dui_vendedor, correo_vendedor,
        usuario_vendedor, solvencia_pnc FROM vendedor
         WHERE (CONCAT(nombre_vendedor, ' ',apellido_vendedor) ILIKE ? OR correo_vendedor ILIKE ? OR usuario_vendedor ILIKE ?) AND status = true";
        $params = array($this->buscador, $this->buscador, $this->buscador);
        return Database::getRows($sql, $params);
    }

    //Función para obtener todos los datos de un vendedor
    public function detalles()
    {
        $sql = 'SELECT * FROM vendedor WHERE id_vendedor = ?';
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Función para eliminar un vendedor

    public function eliminar()
    {
        $sql = 'UPDATE vendedor SET status = false WHERE id_vendedor = ?';
        $params = array($this->identificador);
        return Database::executeRow($sql, $params);
    }

    public function registrar()
    {
        // Se establece la zona horaria local para obtener la fecha del servidor.
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');
        $sql = 'INSERT INTO vendedor(nombre_vendedor, apellido_vendedor, dui_vendedor, correo_vendedor, telefono_vendedor, usuario_vendedor, clave_vendedor, solvencia_pnc, antecedente_penal, direccion_domicilio_vendedor, status_vendedor, foto_vendedor, fecha_registro_vendedor, coordenadas_vendedor)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->telefono, $this->usuario, $this->clave, $this->solvencia, $this->antecedentes, $this->direccion, $this->foto, $date, $this->coordenadas);

        return Database::executeRow($sql, $params);
    }

    public function validateExist($column, $data)
    {
        $sql = "SELECT * FROM vendedor
                WHERE $column = ?";
        $params = array($data);

        return Database::getRow($sql, $params);
    }

    public function checkUser()
    {
        $sql = 'SELECT id_vendedor FROM vendedor WHERE usuario_vendedor = ?';
        $params = array($this->usuario);

        if ($data = Database::getRow($sql, $params)) {
            $this->identificador = $data['id_vendedor'];
        }

        return $data;
    }

    public function checkPass($pass)
    {
        $sql = 'SELECT id_vendedor, clave_vendedor FROM vendedor WHERE usuario_vendedor = ?';
        $params = array($this->usuario);

        if (!$data = Database::getRow($sql, $params)) {
            return false;
        } elseif (!password_verify($pass, $data['clave_vendedor'])) {
            return false;
        } else {
            return true;
        }
    }

    public function checkStatus(){
        $sql = 'SELECT status_vendedor FROM vendedor WHERE id_vendedor = ? AND status_vendedor = true';
        $params = array($this->identificador);

        return Database::getRow($sql, $params);
    }
}

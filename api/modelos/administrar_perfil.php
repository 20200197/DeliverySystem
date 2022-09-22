<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class AdministrarPerfil extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = nuLL;
    private $nombre = null;
    private $apellido = null;
    private $dui = null;
    private $telefono = null;
    private $correo = null;
    private $usuario = null;
    private $pass = null;



    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

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

    public function setTelefono($valor)
    {
        if ($this->validatePhone($valor)) {
            $this->telefono = $valor;
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
        if ($this->validateString($valor, 4, 100)) {
            $this->usuario = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setPass($clave, $nombre, $apellido, $usuario, $fecha)
    {
        if ($this->validateSafePassword($clave, $nombre, $apellido, $usuario, $fecha)) {
            $this->pass = password_hash($clave, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setLowPass($clave)
    {
        if ($this->pass = $clave) {
            return true;
        } else {
            return false;
        }
    }

    public function setIdentificador($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->identificador = $valor;
            return true;
        } else {
            return false;
        }
    }


    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    //Función que carga los datos del perfil

    public function cargarPerfil()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, dui_admin, correo_admin, telefono_admin, usuario_admin
            FROM administrador WHERE id_admin = ?';
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Función que retorn la contraseña
    public function cargarPass()
    {
        $sql = 'SELECT clave_admin FROM administrador WHERE id_admin = ?';
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Función que obtiene los datos para validad la clave
    public function cargarDatos()
    {
        $sql = 'SELECT nombre_admin, apellido_admin, usuario_admin FROM administrador
        WHERE id_admin = ?';
        $params = array($_SESSION['id_admin']);
        return Database::getRow($sql, $params);
    }

    //Función que carga los datos del usuario
    public function cargarUsuario()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, dui_admin, correo_admin, telefono_admin
            FROM administrador WHERE id_admin = ?';
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Función que carga los datos de la cuenta
    public function cargarCuenta()
    {
        $sql = 'SELECT id_admin, usuario_admin FROM administrador WHERE id_admin = ?';
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Función que actualiza los datos del usuario en el perfil
    public function actualizarUsuario()
    {
        $sql = 'UPDATE administrador SET nombre_admin = ?, apellido_admin = ?, dui_admin = ?, correo_admin = ?, telefono_admin = ?
        WHERE id_admin = ?';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->telefono, $this->identificador);
        return Database::executeRow($sql, $params);
    }

    //Función para actualizar los datos de la cuenta en el perfil
    public function actualizarCuenta()
    {
        $sql = 'UPDATE administrador SET usuario_admin = ?, clave_admin = ? WHERE id_admin = ?';
        $params = array($this->usuario, $this->pass, $this->identificador);
        return Database::executeRow($sql, $params);
    }



    //Se cambia la fecha de cambio de contraseña de administrador
    public function changeCambio()
    {

        $sql = 'UPDATE cambio_contra_administrador set fecha_cambio = current_date , id_admin=? ';
        $params = array($_SESSION['id_admin']);
        return Database::executeRow($sql, $params);
    }

    public function checkPass($passstr)
    {
        $sql = 'SELECT clave_admin FROM administrador WHERE id_admin = ?';
        $params = array($_SESSION['id_admin']);

        $data = Database::getRow($sql, $params);

        if (password_verify($passstr, $data['clave_admin'])) {
            return true;
        } else {
            return false;
        }
    }

    //Función para revisar si la contraseña colocada es correcta
    public function revisarPass($clave)
    {
        $sql = 'SELECT clave_admin FROM administrador WHERE id_admin = ?';
        $params = array($_SESSION['id_admin']);
        $data = Database::getRow($sql, $params);
        //Se revisa si la contraseña es correcta
        if (password_verify($clave, $data['clave_admin'])) {
            return true;
        } else {
            return false;
        }
    }
}

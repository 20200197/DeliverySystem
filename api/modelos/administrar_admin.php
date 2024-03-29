<?php

class Administrador extends Validator
{
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
        if ($this->validateNaturalNumber($valor)) {
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

    public function setClave($clave,$nombre, $apellido, $usuario, $fecha)
    {
        if ($this->validateSafePassword($clave, $nombre, $apellido, $usuario, $fecha)) {
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
        $sql = 'INSERT INTO administrador(nombre_admin, apellido_admin, dui_admin, correo_admin, usuario_admin, clave_admin, fecha_registro_admin, telefono_admin, status_admin, id_estado_administrador, intentos_fallidos, fecha_desbloqueo)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, true, ?, ?, CURRENT_DATE - 1)';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->usuario, $this->clave, $date, $this->telefono, 1, 0);
        return Database::executeRow($sql, $params);
    }

    public function checkUser()
    {
        $sql = 'SELECT id_admin FROM administrador WHERE usuario_admin = ?';
        $params = array($this->usuario);

        if ($data = Database::getRow($sql, $params)) {
            $this->id = $data['id_admin'];
        }
        return $data;
    }

    public function checkPass($pass)
    {
        $sql = "SELECT id_admin, clave_admin, CONCAT(nombre_admin, ' ', apellido_admin) AS nombre_admin FROM administrador WHERE usuario_admin = ?";
        $params = array($this->usuario);
        if (!$data = Database::getRow($sql, $params)) {
            return false;
        } elseif (!password_verify($pass, $data['clave_admin'])) {
            return false;
        } else {
            $this->setUsuario($data['nombre_admin']);
            return true;
        }
    }

    public function resetAttempts()
    {
        $sql = 'UPDATE administrador SET intentos_fallidos = 0 WHERE id_admin = ?';
        $params = array($this->id);

        return Database::executeRow($sql, $params);
    }

    public function getAttempts()
    {
        $sql = 'SELECT intentos_fallidos FROM administrador WHERE id_admin = ?';
        $params = array($this->id);

        $data = Database::getRow($sql, $params);

        return $data['intentos_fallidos'];
    }

    public function lockUser()
    {
        $sql = 'UPDATE administrador SET fecha_desbloqueo = CURRENT_DATE + 1, id_estado_administrador = 3 WHERE id_admin = ?';
        $params = array($this->id);

        return Database::executeRow($sql, $params);
    }

    public function unlockUser()
    {
        $sql = 'UPDATE administrador SET id_estado_administrador = 1, intentos_fallidos = 0 WHERE id_admin = ?';
        $params = array($this->id);

        return Database::executeRow($sql, $params);
    }

    public function failedAttempt()
    {
        $sql = 'UPDATE administrador SET intentos_fallidos = intentos_fallidos + 1 WHERE id_admin = ?';
        $params = array($this->id);

        if (!Database::executeRow($sql, $params)) {
            return false;
        } elseif ($this->getAttempts() >= 3) {
            $this->lockUser();
            return true;
        } else {
            return false;
        }
    }

    public function verifyUnlockDate()
    {
        $sql = 'SELECT CURRENT_TIMESTAMP as fecha_actual, fecha_desbloqueo, id_estado_administrador FROM administrador WHERE id_admin = ?';
        $params = array($this->id);

        if (!$data = Database::getRow($sql, $params)) {
            return false;
        } elseif ($data['fecha_actual'] >= $data['fecha_desbloqueo'] && $data['id_estado_administrador'] == 3) {
            $this->unlockUser();
            return true;
        } elseif ($data['id_estado_administrador'] == 1) {
            return true;
        } else {
            return false;
        }
    }

    public function readAdminsAll()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, usuario_admin, dui_admin, correo_admin, fecha_registro_admin, telefono_admin, status_admin
                FROM administrador WHERE id_admin != ?
                ORDER BY nombre_admin';
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

    public function changeStatus($id, $estado)
    {
        $sql = 'UPDATE administrador SET status_admin = ? WHERE id_admin = ?';
        $params = array($estado, $id);

        return Database::executeRow($sql, $params);
    }

    public function checkStatus()
    {
        $sql = 'SELECT status_admin FROM administrador WHERE id_admin = ? AND status_admin = true';
        $params = array($this->id);

        return Database::getRow($sql, $params);
    }

      //Se agrega por primera vez la fecha de cambio de contraseña para cuando loguee
      public function insertCambio()
      {
  
          $sql = 'INSERT INTO cambio_contra_administrador(fecha_cambio, id_admin, id_cargo) VALUES(current_date, (SELECT id_admin FROM administrador ORDER BY id_admin DESC LIMIT 1), 1)';
          $params =null;
          return Database::executeRow($sql, $params);
      }
  
      //Se cambia la fecha de cambio de contraseña de administrador
      public function changeCambio()
      {
  
          $sql = 'UPDATE cambio_contra_administrador set fecha_cambio = current_date , id_admin=? ';
          $params = array($_SESSION['id_admin']);
          return Database::executeRow($sql, $params);
      }
  
      //Dias que han pasado desde ultimo cambio de contraseña
      public function checkRango()
      {
          $sql = 'SELECT current_date - fecha_cambio as rango_ch
          from cambio_contra_administrador where id_admin=?';
          $params = array($_SESSION['id_admin_temporal']);
  
          return Database::getRow($sql, $params);
      }

      


    //Función para obtener la llave de autentificación del usuario
    public function obtenerEstadoLlave()
    {
        $sql = 'SELECT id_admin, verificacion FROM administrador WHERE id_admin = ?';
        $params = array($_SESSION['id_admin']);
        $data = Database::getRow($sql, $params);
        if ($data['verificacion'] != null) {
            return true;
        } else {
            return false;
        }
    }

    //Función para colocar la llave del autentificador en el usuario 
    public function colocarLlave($llave)
    {
        $sql = 'UPDATE administrador SET verificacion = ? WHERE id_admin = ?';
        $params = array($llave, $_SESSION['id_admin']);
        return Database::executeRow($sql, $params);
    }

    //Función para validar que si este habilitado el segundo paso de autentificacion
    public function verificarSegundoPaso()
    {
        $sql = 'SELECT verificacion FROM administrador WHERE id_admin = ?';
        $params = array($_SESSION['id_admin_temporal']);
        $data = Database::getRow($sql, $params);
        if ($data['verificacion'] != null) {
            return true;
        } else {
            return false;
        }
    }

    //Función para obtener la llave de autentificación del usuario
    public function obtenerLlave()
    {
        $sql = 'SELECT id_admin, verificacion FROM administrador WHERE id_admin = ?';
        $params = array($_SESSION['id_admin_temporal']);
        return Database::getRow($sql, $params);
    }

    //Función para eliminar el campo de autentificación
    public function eliminarLlave()
    {
        $sql = 'UPDATE administrador SET verificacion = NULL WHERE id_admin = ?';
        $params = array($_SESSION['id_admin']);
        return Database::executeRow($sql, $params);
    }

    //Función para validar la contraseña del usuario a base del id
    public function checkPassChange($pass)
    {
        $sql = "SELECT id_admin, clave_admin, CONCAT(nombre_admin, ' ', apellido_admin) AS nombre_admin FROM administrador WHERE id_admin = ?";
        $params = array($_SESSION['id_admin']);
        if (!$data = Database::getRow($sql, $params)) {
            return false;
        } elseif (!password_verify($pass, $data['clave_admin'])) {
            return false;
        } else {
            $this->setUsuario($data['nombre_admin']);
            return true;
        }
    }


}

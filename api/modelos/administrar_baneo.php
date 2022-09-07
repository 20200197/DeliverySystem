<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Baneo extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre_usuario = null;
    private $usuario = null;
    private $correo_usuario = null;
    private $fecha_desbloqueo = null;

    private $ruta = '../imagenes/categoria/';

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre_usuario($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->setNombre_usuario = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->setNombre_usuario = null;
            return true;
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

    public function setCorreo($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFechaDesbloqueo($date)
    {
        if ($this->validateDate($date)) {
            $this->fecha_desbloqueo = $date;
            return true;
        } else {
            return false;
        }
    }

    public function getCorreo_usuario()
    {
        return $this->correo_usuario;
    }

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getId()
    {
        return $this->id;
    }

    public function getNombre_usuario()
    {
        return $this->nombre_usuario;
    }

    public function getUsuario()
    {
        return $this->usuario;
    }

    public function getFechaDesbloqueo()
    {
        return $this->fecha_desbloqueo;
    }

    public function getRuta()
    {
        return $this->ruta;
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

      //Clientes con bloqueo por intentos
    public function readAllCliente()
    {
        $sql = "SELECT id_cliente, CONCAT(nombre_cliente,' ', apellido_cliente) AS nombre_completo,
         dui_cliente, correo_cliente, usuario_cliente, status_cliente, fecha_registro_cliente, telefono_cliente, estado_cliente FROM cliente
         inner join estado_cliente using(id_estado_cliente)
         where id_estado_cliente = 3 or id_estado_cliente = 2
         ORDER BY id_cliente";
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Repartidores con bloqueo por intentos
    public function readAllRepartidor()
    {
        $sql = 'SELECT id_repartidor,nombre_repartidor, apellido_repartidor,dui_repartidor,correo_repartidor,usuario_repartidor,telefono_repartidor,clave_repartidor,solvencia_pnc,antecedente_penal,direccion_domicilio,placa_vehiculo,foto_placa_vehiculo,foto_repartidor,foto_vehiculo,fecha_registro, status_repartidor
                FROM repartidor
                inner join estado_repartidor using(id_estado_repartidor)
                WHERE id_estado_repartidor = 5 or id_estado_repartidor = 6';
        $params = null; 
        return Database::getRows($sql, $params);
    }

    //Vendedores por bloqueo con intentos
    public function readAllVendedor()
    {
        $sql = "SELECT id_vendedor, CONCAT(nombre_vendedor, ' ',apellido_vendedor) as nombre_completo, dui_vendedor, correo_vendedor,
        usuario_vendedor, solvencia_pnc, estado_vendedor  FROM vendedor 
        inner join estado_vendedor using(id_estado_vendedor)
         WHERE id_estado_vendedor = 3 or id_estado_vendedor= 2";
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Administradores por bloque con intentos
    public function readAllAdmin()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, usuario_admin, dui_admin, correo_admin, fecha_registro_admin, telefono_admin, status_admin, estado_administrador
                FROM administrador
                inner join estado_administrador using(id_estado_administrador) where id_estado_administrador = 3 or id_estado_administrador= 2
                ORDER BY fecha_registro_admin';
        $params = null;

        return Database::getRows($sql, $params);
    }

    //Cargos de usuario
    public function readAll()
    {
        $sql = 'SELECT id_cargo, cargo_usuario
                FROM cargo_usuario
                ORDER BY cargo_usuario';
        $params = null;

        return Database::getRows($sql, $params);
    }

    //Banear aministrador
    public function updateBaneoAdministrador()
    {
        $sql = 'UPDATE administrador
        SET id_estado_administrador = 2
        WHERE id_admin = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Desbanear administrador
    public function updateDesbaneoAdministrador()
    {
        $sql = 'UPDATE administrador
        SET id_estado_administrador = 1
        WHERE id_admin = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }


    //Baneo administrador
    public function updateBaneoRepartidor()
    {
        $sql = 'UPDATE repartidor
        SET id_estado_repartidor = 6
        WHERE id_repartidor = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Banear vendedor
    public function updateBaneoVendedor()
    {
        $sql = 'UPDATE vendedor
        SET id_estado_vendedor = 2
        WHERE id_vendedor = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Banear cliente
    public function updateBaneoCliente()
    {
        $sql = 'UPDATE cliente
        SET id_estado_cliente = 2
        WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Desbanear repartidor
    public function updateDesbaneoRepartidor()
    {
        $sql = 'UPDATE repartidor
        SET id_estado_repartidor = 7
        WHERE id_repartidor = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Desbanear vendedor
    public function updateDesbaneoVendedor()
    {
        $sql = 'UPDATE vendedor
        SET id_estado_vendedor = 1
        WHERE id_vendedor = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Desbanear cliente
    public function updateDesbaneoCliente()
    {
        $sql = 'UPDATE cliente
        SET id_estado_cliente = 1
        WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Cambiar fecha desbaneo para administrador
    public function updateHoraDesbaneoAdministrador()
    {
        $sql = 'UPDATE administrador
        SET fecha_desbloqueo = ?
        WHERE id_admin = ?';
        $params = array($this->fecha_desbloqueo,$this->id);
        return Database::executeRow($sql, $params);
    }

    //Cambiar fecha desbaneo de repartidor
    public function updateHoraDesbaneoRepartidor()
    {
        $sql = 'UPDATE repartidor
        SET fecha_desbloqueo = ?
        WHERE id_repartidor = ?';
        $params = array($this->fecha_desbloqueo,$this->id);
        return Database::executeRow($sql, $params);
    }

    //Cambiar fecha desbaneo vendedor
    public function updateHoraDesbaneoVendedor()
    {
        $sql = 'UPDATE vendedor
        SET fecha_desbloqueo = ?
        WHERE id_vendedor = ?';
        $params = array($this->fecha_desbloqueo,$this->id);
        return Database::executeRow($sql, $params);
    }

    //Cambiar fecha desbaneo cliente
    public function updateHoraDesbaneoCliente()
    {
        $sql = 'UPDATE cliente
        SET fecha_desbloqueo = ?
        WHERE id_cliente = ?';
        $params = array($this->fecha_desbloqueo,$this->id);
        return Database::executeRow($sql, $params);
    }




}



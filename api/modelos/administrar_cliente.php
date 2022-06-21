<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class AdministrarCliente extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = null;
    private $estado = null;
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

    public function setEstado($value)
    {
        if ($this->validateBoolean($value)) {
            $this->estado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setBuscador($value)
    {
        if ($this->validateString($value, 0, 50)) {
            $this->buscador = '%'.$value.'%';
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    //Función para obtener todos los datos de los cliente

    public function obtenerClientes()
    {
        $sql = "SELECT id_cliente, CONCAT(nombre_cliente,' ', apellido_cliente) AS nombre_completo,
         dui_cliente, correo_cliente, usuario_cliente, status_cliente, fecha_registro_cliente, telefono_cliente FROM cliente";
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

    public function buscar()
    {
        $sql = "SELECT id_cliente, CONCAT(nombre_cliente,' ', apellido_cliente) AS nombre_completo,
         dui_cliente, correo_cliente, usuario_cliente, status_cliente, fecha_registro_cliente, telefono_cliente FROM cliente
         WHERE CONCAT(nombre_cliente,' ', apellido_cliente) ILIKE ? OR correo_cliente ILIKE ? OR usuario_cliente ILIKE ?";
        $params = array($this->buscador, $this->buscador, $this->buscador);
        return Database::getRows($sql, $params);
    }
}

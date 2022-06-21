<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class AdministrarVendedor extends Validator
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
            $this->buscador = '%' . $value . '%';
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    //Función para obtener todos los datos de los cliente

    public function obtenerVendedores()
    {
        $sql = "SELECT id_vendedor, CONCAT(nombre_vendedor, ' ',apellido_vendedor) as nombre_completo, dui_vendedor, correo_vendedor,
        usuario_vendedor, solvencia_pnc FROM vendedor";
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
        $sql = "SELECT id_vendedor, CONCAT(nombre_vendedor, ' ',apellido_vendedor) as nombre_completo, dui_vendedor, correo_vendedor,
        usuario_vendedor, solvencia_pnc FROM vendedor
         WHERE CONCAT(nombre_vendedor, ' ',apellido_vendedor) ILIKE ? OR correo_vendedor ILIKE ? OR usuario_vendedor ILIKE ?";
        $params = array($this->buscador, $this->buscador, $this->buscador);
        return Database::getRows($sql, $params);
    }
}

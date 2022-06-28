<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class AdministrarCliente extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = null;


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

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    //Función para obtener todos los datos de los cliente

    public function obtenerClientes()
    {
        $sql = "SELECT id_cliente, CONCAT(nombre_cliente,' ', apellido_cliente) AS nombre_completo, dui_cliente, correo_cliente, usuario_cliente, status_cliente, fecha_registro_cliente FROM cliente
        WHERE status_cliente NOT IN (false)";
        $params = null;
        return Database::getRows($sql, $params);

    }
}

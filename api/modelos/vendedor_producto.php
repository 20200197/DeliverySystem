<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class VendedorProducto extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = null;



    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

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


    public function cargarProductos()
    {
        $sql = 'SELECT nombre_producto, descripcion_producto, cantidad_producto, precio_producto, 
        imagen FROM producto WHERE id_vendedor = ?';
        $params = array($this->identificador);
        return Database::getRows($sql, $params);
    }
}

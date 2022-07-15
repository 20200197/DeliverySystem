<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class PaquetesPendientes extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = null;

    /**
     * Se crean los set que colocarán y verificarán los datos
     */

    public function setIdentificador($value)
    {
        if($this->validateNaturalNumber($value)) {
            $this->identificador = $value;
            return true;
        }else{
            return false;
        }
    }


    /**
     * Función para obtener datos de la base
     */


     //Función para cargar las facturas
     public function cargarFacturas()
     {
        $sql = "SELECT CONCAT(c.nombre_cliente, ' ',c.apellido_cliente) as nombre, c.correo_cliente, c.telefono_cliente, d.descripcion_direccion, d.punto_referencia, f.id_factura, f.total, ef.id_status FROM factura f
        INNER JOIN direccion d ON d.id_direccion = f.id_direccion
        INNER JOIN cliente c ON c.id_cliente = d.id_cliente
        INNER JOIN estado_factura ef ON ef.id_status = f.id_status
        WHERE id_repartidor = ? AND f.id_status NOT IN (1) ORDER BY id_factura";
        $params = array($this->identificador);
        return Database::getRows($sql, $params);
     }

     //Función para cambiar el estado a entregado
     public function entregar()
     {
        $sql = 'UPDATE factura set id_status = 3 WHERE id_factura = ?';
        $params = array($this->identificador);
        return Database::executeRow($sql, $params);
     }
}

<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class clienteDetalle extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = null;



    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

    public function setIdentificador ($value) 
    {
        if($this->validateNaturalNumber($value)){
            $this->identificador = $value;
            return true;
        }else{
            return false;
        }
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    public function cargarProductos()
    {
        $sql = 'SELECT df.precio, df.cantidad_pedido, (df.precio * df.cantidad_pedido) AS subtotal, f.fecha_compra::TIMESTAMP::DATE, p.nombre_producto, p.imagen,
        p.status_producto FROM detalle_factura df
        INNER JOIN factura f ON f.id_factura = df.id_factura
        INNER JOIN producto p ON p.id_producto = df.id_producto
        WHERE f.id_factura = ?';
        $params = array($this->identificador);
        return Database::getRows($sql, $params);
    }

    //Función para obtener los datos del repartidor
    public function datosRepartidor()
    {
        $sql = "SELECT CONCAT(r.nombre_repartidor, ' ', r.apellido_repartidor) AS nombre, r.foto_repartidor FROM repartidor r
        INNER JOIN factura f ON f.id_repartidor = r.id_repartidor 
        WHERE f.id_factura = ?";
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }
}

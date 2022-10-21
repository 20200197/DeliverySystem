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
        if ($this->validateNaturalNumber($value)) {
            $this->identificador = $value;
            return true;
        } else {
            return false;
        }
    }


    /**
     * Función para obtener datos de la base
     */


    //Función para cargar las facturas
    public function cargarFacturas()
    {
        $sql = "SELECT c.id_cliente, CONCAT(c.nombre_cliente, ' ',c.apellido_cliente) as nombre, c.correo_cliente, c.telefono_cliente, df.id_detalle, d.descripcion_direccion, d.punto_referencia,
        p.nombre_producto, p.imagen, df.cantidad_pedido, df.precio, df.status, (CAST(split_part(coordenadas,',',1) AS VARCHAR))as latitude,(CAST(split_part(coordenadas,', ',2) AS VARCHAR))as longitud
        FROM cliente c
        INNER JOIN direccion d ON d.id_cliente = c.id_cliente
        INNER JOIN factura f ON f.id_direccion = d.id_direccion
        INNER JOIN detalle_factura df ON df.id_factura = f.id_factura
        INNER JOIN producto p ON p.id_producto = df.id_producto
        WHERE id_repartidor = ? --AND f.id_status NOT IN (1) AND df.status NOT IN (true) 
        ORDER BY df.id_factura";
        $params = array($this->identificador);
        return Database::getRows($sql, $params);
    }

    //Función para cambiar el estado a entregado
    public function entregar()
    {
        $sql = 'UPDATE detalle_factura set STATUS = true WHERE id_detalle = ?';
        $params = array($this->identificador);
        return Database::executeRow($sql, $params);
    }

    //Función para cambiar el estado a cancelado
    public function cancelar()
    {
        $sql = 'UPDATE factura set id_status = 4 WHERE id_factura = ?';
        $params = array($this->identificador);
        return Database::executeRow($sql, $params);
    }

    //Función para cargar los productos de un pedido
    public function cargarProductos()
    {
        $sql = 'SELECT df.precio, df.cantidad_pedido, (df.precio * df.cantidad_pedido) as subtotal, p.nombre_producto, p.imagen FROM detalle_factura df
        INNER JOIN factura f ON df.id_factura = f.id_factura
        INNER JOIN producto p ON df.id_producto = p.id_producto
        WHERE f.id_factura = ? ORDER BY df.id_detalle
        ';
        $params = array($this->identificador);
        return Database::getRows($sql, $params);
    }
}
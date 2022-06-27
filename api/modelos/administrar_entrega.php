<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Entrega extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre_producto = null;
    private $nombre_cliente = null;
    private $nombre_repartidor = null;
    private $fecha_reparto = null;


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

    public function setNombreProducto($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->nombre_producto = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->nombre_producto = null;
            return true;
        }
    }

    public function setNombreCliente($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->nombre_cliente = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->nombre_cliente = null;
            return true;
        }
    }


    public function setNombreRepartidor($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->nombre_repartidor = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->nombre_repartidor = null;
            return true;
        }
    }

    public function setFechaReparto($date){
        if($this->validateDate($date)){
            $this->fecha_reparto = $date;
            return true;
        }else{
            return false;
        }
    }

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getId()
    {
        return $this->id;
    }

    public function getNombreProducto()
    {
        return $this->nombre_producto;
    }

    public function getNombreCliente()
    {
        return $this->nombre_cliente;
    }

    public function getNombreRepartidor()
    {
        return $this->nombre_repartidor;
    }


    public function getFechaReparto()
    {
        return $this->fecha_reparto;
    }



  

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    public function searchRows($value)
    {
        $sql = "SELECT producto.id_producto, nombre_producto, CONCAT(nombre_cliente,' ', apellido_cliente) as nombre_cliente, CONCAT(nombre_repartidor,' ',apellido_repartidor) as nombre_repartidor, detalle_factura.fecha_envio
        from factura factura
        inner join detalle_factura detalle_factura on detalle_factura.id_factura = factura.id_factura 
        inner join producto producto on detalle_factura.id_producto = producto.id_producto
        inner join metodo_pago on factura.id_metodo_pago = metodo_pago.id_metodo_pago
        inner join direccion direccion on factura.id_direccion = direccion.id_direccion
        inner join cliente cliente on direccion.id_cliente = cliente.id_cliente
        inner join repartidor on factura.id_repartidor = repartidor.id_repartidor
        where nombre_producto ILIKE ?  or nombre_cliente ILIKE ? or nombre_repartidor ILIKE ? ";
        $params = array("%$value%","%$value%","%$value%");
        return Database::getRows($sql, $params);
    }


    //Función para leer todos los datos
    public function readAll()
    {
        $sql = "SELECT producto.id_producto, nombre_producto, CONCAT(nombre_cliente,' ', apellido_cliente) as nombre_cliente, CONCAT(nombre_repartidor,' ',apellido_repartidor) as nombre_repartidor, detalle_factura.fecha_envio
        from factura factura
        inner join detalle_factura detalle_factura on detalle_factura.id_factura = factura.id_factura 
        inner join producto producto on detalle_factura.id_producto = producto.id_producto
        inner join metodo_pago on factura.id_metodo_pago = metodo_pago.id_metodo_pago
        inner join direccion direccion on factura.id_direccion = direccion.id_direccion
        inner join cliente cliente on direccion.id_cliente = cliente.id_cliente
        inner join repartidor on factura.id_repartidor = repartidor.id_repartidor";
        $params = null;
        return Database::getRows($sql, $params);
    }

    
}

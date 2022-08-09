<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Mapa extends Validator
{
    // Declaración de atributos (propiedades).
    private $id_cliente = null;
    private $coordenadas_cliente = null;
    private $id_vendedor = null;
    private $coordenadas_vendedor = null;

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setIdCliente($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCoordenadasCliente($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 2000)) {
                $this->coordenadas_cliente = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->nombre_producto = null;
            return true;
        }
    }

    public function setIdVendedor($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_vendedor = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCoordenadasVendedor($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->coordenadas_vendedor = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->nombre_cliente = null;
            return true;
        }
    }
   
    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getIdCliente()
    {
        return $this->id_cliente;
    }

    public function getCoordenadasCliente()
    {
        return $this->coordenadas_cliente;
    }

    public function getIdVendedor()
    {
        return $this->id_vendedor;
    }

    public function getCoordenadasVendedor()
    {
        return $this->coordenadas_vendedor;
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

     //Funcion para leer cliente individual
     public function readOneCliente()
     {
         $sql = 'SELECT id_cliente, coordenadas
         from direccion
         inner join cliente using (id_cliente)
         where id_cliente = ?';
         $params = array($this->id_cliente);
         return Database::getRow($sql, $params);
     }

     //Función que actualiza las coordenadas cuando se inciia sesión
    public function updateCoordenadasCliente()
    {
        $sql = 'UPDATE direccion 
                SET coordenadas = ?
                WHERE id_cliente=?';
        $params = array($this->coordenadas_cliente, $this->id_cliente);//Session id
        return Database::executeRow($sql, $params);
    }
}

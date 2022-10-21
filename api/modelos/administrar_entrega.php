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
    //Repartidor
    private $id_repartidor = null;

    private $id_factura = null;
    private $id_detalle = null;


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

    public function setFechaReparto($date)
    {
        if ($this->validateDate($date)) {
            $this->fecha_reparto = $date;
            return true;
        } else {
            return false;
        }
    }

    public function setIdRepartidor($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_repartidor = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdFactura($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_factura = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdDetalle($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_detalle = $value;
            return true;
        } else {
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

    public function getIdRepartidor()
    {
        return $this->id_repartidor;
    }

    public function getIdFactura()
    {
        return $this->id_factura;
    }

    public function getIdDetalle()
    {
        return $this->id_detalle;
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
        $params = array("%$value%", "%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }


    //Función para leer todos los datos
    public function readAll()
    {
        $sql = "SELECT producto.id_producto, nombre_producto, CONCAT(nombre_cliente,' ', apellido_cliente) as nombre_cliente, CONCAT(nombre_repartidor,' ',apellido_repartidor) as nombre_repartidor, detalle_factura.fecha_envio
        from factura factura
        inner join detalle_factura detalle_factura on detalle_factura.id_factura = factura.id_factura 
        inner join producto producto on detalle_factura.id_producto = producto.id_producto
        inner join direccion direccion on factura.id_direccion = direccion.id_direccion
        inner join cliente cliente on direccion.id_cliente = cliente.id_cliente
        inner join repartidor on factura.id_repartidor = repartidor.id_repartidor";
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readHistorialRepartidor()
    {
        $sql = "SELECT nombre_producto, CONCAT(nombre_vendedor, ' ' , apellido_vendedor ) as nombre_vendedor, CONCAT(nombre_cliente, ' ' , apellido_cliente) as nombre_cliente, descripcion_direccion, fecha_compra, costo_envio
        from detalle_factura
        inner join factura using (id_factura)
        inner join producto using (id_producto)
        inner join repartidor repartidor on factura.id_repartidor = repartidor.id_repartidor
        inner join direccion on factura.id_direccion = direccion.id_direccion
        inner join vendedor on producto.id_vendedor = vendedor.id_vendedor
        inner join cliente on direccion.id_cliente = cliente.id_cliente
        where factura.id_repartidor = ?";
        $params = array($_SESSION['id_repartidor']); //SESSION[id_repartidor]
        return Database::getRows($sql, $params);
    }
 
    //Repartidores
    public function repartidorAvaible()
    {
        $sql = "SELECT  distinct(factura.id_repartidor), CONCAT(nombre_repartidor,' ', apellido_repartidor) as nombre_repartidor, count(id_repartidor) as cant,case 
        when  count (id_repartidor) <30 then 1
        when  count (id_repartidor) >=30 then 0
     end as cantt
        from factura factura 
        full outer join repartidor using(id_repartidor)
        inner join detalle_factura detalle_factura on detalle_factura.id_factura = factura.id_factura
        where  EXTRACT(MONTH FROM fecha_envio) = EXTRACT(MONTH FROM current_date)
		group by factura.id_repartidor, nombre_repartidor, apellido_repartidor";
        $params = null;
        return Database::getRows($sql, $params);
    }

      public function repartidorAvaibleMas()
    {
        $sql = "SELECT   (factura.id_repartidor), CONCAT(nombre_repartidor,' ', apellido_repartidor) as nombre_repartidor, fecha_envio
        from factura factura 
        full outer join repartidor using(id_repartidor)
        full outer join detalle_factura detalle_factura on detalle_factura.id_factura = factura.id_factura
        where  fecha_envio > current_date+20 or fecha_envio < current_date";
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function repartidorAvaibleA()
    {
        $sql = "	SELECT   distinct(factura.id_repartidor), CONCAT(nombre_repartidor,' ', apellido_repartidor) as nombre_repartidor, fecha_envio
        from factura factura 
        inner join repartidor using(id_repartidor)
        left join detalle_factura detalle_factura on detalle_factura.id_factura = factura.id_factura
        where fecha_envio < current_date ";
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function repartidorAvaibleNE()
    {
        $sql = "SELECT (repartidor.id_repartidor), CONCAT(repartidor.nombre_repartidor,' ',repartidor.apellido_repartidor) as nombre_repartidor, count (factura.id_repartidor) as cant, case
        when count (factura.id_repartidor) <30 then 1
        when count (factura.id_repartidor) >=30 then 0
        end as cantt
        from repartidor
        LEFT JOIN factura USING(id_repartidor)
        group by repartidor.id_repartidor";
        $params = null;
        return Database::getRows($sql, $params);
    }



    //Productos de detalle sin asignar, que nio tenga repartidor ni fecha
    public function readProductosEntrega()
    {
        $sql = "SELECT id_detalle, nombre_producto, cantidad_pedido, precio, fecha_envio, repartidor.id_repartidor, id_factura
        from detalle_factura
        full outer join producto producto using(id_producto)
        full outer join factura factura using(id_factura)
        full outer join repartidor repartidor using(id_repartidor)
        where fecha_envio is null and factura.id_repartidor is null and detalle_factura.id_factura = ?";
        $params = array($this->id_factura);
        return Database::getRows($sql, $params);
    }

    //Asignamos repartidor
    public function updatePk()
    {
        $sql = 'UPDATE factura
        SET id_repartidor = ? 
        WHERE id_factura = ?';
        $params = array($this->id_repartidor,$this->id_factura);
        return Database::executeRow($sql, $params);
    }

    //Asignamos fecha de envio
    public function updatePkPk()
    {
        $sql = 'UPDATE detalle_factura
        SET fecha_envio = ? 
        WHERE id_factura = ?';
        $params = array($this->fecha_reparto,$this->id_factura);
        return Database::executeRow($sql, $params);
    }

    //Facturas que no han sido asignadas, osea que repartidor y fecha no este asignada
    public function readFac()
    {
        $sql = "SELECT distinct id_factura
        from detalle_factura
        full outer  join  factura using(id_factura)
        full outer  join repartidor using(id_repartidor)
        where fecha_envio is null and factura.id_repartidor is null
        group by  id_detalle, id_factura
        order by id_factura asc";
        $params = null;
        return Database::getRows($sql, $params);
    }
}

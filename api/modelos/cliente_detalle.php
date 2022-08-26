<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class clienteDetalle extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = null;
    private $identificadorRepartidor = null;
    private $identificadorDetalle = null;
    private $comentario = null;
    private $valoracion = null;



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

    public function setIdentificadorDetalle($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->identificadorDetalle = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setComentario($value)
    {
        if ($this->validateString($value, 2, 300)) {
            $this->comentario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setValoracion($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->valoracion = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdentificadorRepartidor($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->identificadorRepartidor = $value;
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
        $sql = 'SELECT df.id_detalle, df.precio, df.cantidad_pedido, (df.precio * df.cantidad_pedido) AS subtotal, f.fecha_compra::TIMESTAMP::DATE, p.nombre_producto, p.imagen,
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
        $sql = "SELECT r.id_repartidor, CONCAT(r.nombre_repartidor, ' ', r.apellido_repartidor) AS nombre, r.foto_repartidor FROM repartidor r
        INNER JOIN factura f ON f.id_repartidor = r.id_repartidor 
        WHERE f.id_factura = ?";
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Función para guardar la valoración
    public function guardarRepartidor()
    {
        $sql = "INSERT INTO public.comentario_repartidor(
            valoracion, comentario, id_factura)
            VALUES ( ?, ?, ?)";
        $params = array($this->valoracion, $this->comentario, $this->identificadorRepartidor);
        return Database::executeRow($sql, $params);
    }

    //Función para validar que no se repita más de una valoración por factura
    public function validarNoRepeticionesRepartidor()
    {
        $sql = 'SELECT id_factura FROM public.comentario_repartidor WHERE id_factura = ?';
        $params = array($this->identificador);
        $data = Database::getRow($sql, $params);
        //Se revisa si se encontró el mismo id ya registrador en una valoración
        if (isset($data['id_factura'])) {
            return false;
        } else {
            return true;
        }
    }

    //Función para validad que no se pueda valorar el mismo producto en la misma factura
    public function validarNoRepeticionesProducto()
    {
        $sql = 'SELECT id_detalle FROM comentario_producto WHERE id_detalle = ?';
        $params = array($this->identificador);
        $data = Database::getRow($sql, $params);
        //Se revisa si se encontró el mismo id ya registrador en una valoración
        if (isset($data['id_detalle'])) {
            return false;
        } else {
            return true;
        }
    }


    //Función para obtener los datos de los productos en los modales
    public function cargarDatosProductos()
    {
        $sql = 'SELECT df.id_producto, p.nombre_producto, p.imagen FROM producto p
        INNER JOIN detalle_factura df ON df.id_producto = p.id_producto
        WHERE df.id_detalle = ?';
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Función para guardar la valoración del producto
    public function guardarProducto()
    {
        $sql = "INSERT INTO comentario_producto (valoracion, comentario, visible, id_detalle)
        VALUES (?,?,?,?)";
        $params = array($this->valoracion, $this->comentario, true, $this->identificadorDetalle);
        return Database::executeRow($sql, $params);
    }
}

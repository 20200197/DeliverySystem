<?php
/*
*	Clase para manejar la tabla productos de la base de datos.
*   Es clase hija de Validator.
*/
class Pedidos_cliente extends Validator
{
    //Declaración de atributos
    private $id = null;
    private $imagen = null;
    private $total = null;
    private $nombre = null;
    private $apellido = null;
    private $estado = null;

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

    public function setImagen($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setTotal($valor){
        if($this->validateMoney($valor)){
            $this->total = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setApellido($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->apellido = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setEstado($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->estado = $value;
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

    public function getImagen()
    {
        return $this->imagen;
    }

    public function getTotal()
    {
        return $this->total;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getApellido()
    {
        return $this->apellido;
    }

    public function getEstado()
    {
        return $this->estado;
    }

    //Función para leer todos los datos
    public function readAll()
    {
        $sql = 'SELECT imagen, total, nombre_repartidor, apellido_repartidor, estado
                FROM detalle_factura
                inner join factura on detalle_factura.id_factura = factura.id_factura
                inner join producto on detalle_factura.id_producto = producto.id_producto
                inner join repartidor on factura.id_repartidor = repartidor.id_repartidor
                inner join estado_factura on factura.id_status = estado_factura.id_status';
        $params = null;
        return Database::getRows($sql, $params);
    }
}
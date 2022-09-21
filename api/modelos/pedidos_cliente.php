<?php
/*
*	Clase para manejar la tabla productos de la base de datos.
*   Es clase hija de Validator.
*/
class PedidosCliente extends Validator
{
    //Declaración de atributos
    private $id = null;
    private $imagen = null;
    private $total = null;
    private $nombre = null;
    private $apellido = null;
    private $estado = null;

    private $dui = null;
    private $telefono = null;
    private $correo = null;
    private $fecha_factura = null;
    private $direccion = null;

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

    public function setTotal($valor)
    {
        if ($this->validateMoney($valor)) {
            $this->total = $valor;
            return true;
        } else {
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

    public function getDui()
    {
        return $this->dui;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    public function getCorreo()
    {
        return $this->correo;
    }

    public function getFecha()
    {
        return $this->fecha_factura;
    }

    public function getDireccion()
    {
        return $this->direccion;
    }

    //Función para leer todos los datos
    public function readAll()
    {
        $sql = "SELECT id_factura, total, fecha_compra, estado, CONCAT(nombre_cliente, ' ', apellido_cliente) as nombre_cliente
                FROM factura
                INNER JOIN estado_factura USING (id_status)
                INNER JOIN direccion USING (id_direccion)
                INNER JOIN cliente USING (id_cliente)
                WHERE id_status = 2 AND id_cliente = ? OR id_status = 3 AND id_cliente = ?";
        $params = array($_SESSION['id_cliente'], $_SESSION['id_cliente']);
        return Database::getRows($sql, $params);
    }

    public function readDetail()
    {
        $sql = "SELECT id_factura, nombre_producto,TO_CHAR(fecha_compra, 'DD-MM-YYYY HH12:MI:SS') AS fecha_compra, total, SUBSTRING(descripcion_direccion, 1, 20) as descripcion_direccion, cantidad_pedido, precio, nombre_cliente, apellido_cliente, telefono_cliente, usuario_cliente, correo_cliente, dui_cliente, precio * cantidad_pedido as subtotal_detalle
            FROM factura 
            inner join detalle_factura using (id_factura) 
            inner join producto using (id_producto)
            inner join direccion using (id_direccion)
            inner join cliente using (id_cliente)
            WHERE id_factura = ?";
        $params = array($this->id);
        if ($data = Database::getRows($sql, $params)) {
            foreach ($data as $row) {
                $this->dui = $row['dui_cliente'];
                $this->nombre = $row['nombre_cliente'];
                $this->apellido = $row['apellido_cliente'];
                $this->telefono = $row['telefono_cliente'];
                $this->correo = $row['correo_cliente'];
                $this->fecha_factura = $row['fecha_compra'];
                $this->direccion = $row['descripcion_direccion'];
                $this->total = $row['total'];
            }
            return $data;
        } else {
            return false;
        }
    }
}

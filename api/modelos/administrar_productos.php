<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Producto extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre_producto = null;
    private $cantidad_producto = null;
    private $descripcion_producto = null;
    private $precio_producto = null;
    private $imagen_producto = null;
    private $categoria_producto = null;
    private $nombre_vendedor = null;
    private $marca_producto = null;
    private $estado_producto = null;



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

    public function setCantidadProducto($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->cantidad_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDescripcionProducto($valor)
    {
        if ($valor) {
            if ($this->validateString($valor, 1, 250)) {
                $this->descripcion_producto = $valor;
                return true;
            } else {
                return false;
            }
        } else {
            $this->descripcion_producto = null;
            return true;
        }
    }

    public function setPrecioProducto($valor)
    {
        if ($this->validateMoney($valor)) {
            $this->precio_producto = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setImagenProducto($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen_producto = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setCategoriaProducto($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->categoria_producto = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->categoria_producto = null;
            return true;
        }
    }

    public function setNombreVendedor($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->nombre_vendedor = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->nombre_vendedor = null;
            return true;
        }
    }

    public function setMarcaPrducto($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->marca_producto = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->marca_producto = null;
            return true;
        }
    }

    public function setEstadoProducto($value)
    {
        if ($this->validateBoolean($value)) {
            $this->estado_producto = $value;
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

    public function getCantidadProducto()
    {
        return $this->cantidad_producto;
    }

    public function getDescripcionProducto()
    {
        return $this->descripcion_producto;
    }

    public function getPrecioProducto()
    {
        return $this->precio_producto;
    }

    public function getImagenProducto()
    {
        return $this->imagen_producto;
    }

    public function getCategoriaProducto()
    {
        return $this->categoria_producto;
    }

    public function getNombreVendedor()
    {
        return $this->nombre_vendedor;
    }

    public function getMarcaProducto()
    {
        return $this->marca_producto;
    }

    public function getEstadoProducto()
    {
        return $this->estado_producto;
    }


    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    public function searchRows($value)
    {
        $sql = "SELECT id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen, categoria.categoria,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto
		from producto producto
		inner join categoria categoria on producto.id_categoria = categoria.id_categoria_producto
		inner join vendedor using (id_vendedor)
		inner join marca using (id_marca)
        where nombre_producto ILIKE ? or categoria ILIKE ? or nombre_vendedor ILIKE ? or nombre_marca ILIKE ? ";
        $params = array("%$value%","%$value%","%$value%","%$value%");
        return Database::getRows($sql, $params);
    }


    //Función para leer todos los datos
    public function readAll()
    {
        $sql = "SELECT id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen, categoria.categoria,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto
		from producto producto
		inner join categoria categoria on producto.id_categoria = categoria.id_categoria_producto
		inner join vendedor using (id_vendedor)
		inner join marca using (id_marca)
        order by nombre_producto";
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Funcion para leer producto individual
    public function readOne()
    {
        $sql = 'SELECT id_producto, status_producto
                FROM producto
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        
        $sql = 'UPDATE producto
                SET status_producto=?
                WHERE id_producto = ?';
        $params = array($this->estado_producto,$this->id);
        return Database::executeRow($sql, $params);
    }
    
}

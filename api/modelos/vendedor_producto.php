<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class VendedorProducto extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = null;
    private $nombre = null;
    private $cantidad = null;
    private $precio = null;
    private $descripcion = null;
    private $imagen = null;
    private $categoria = null;
    private $marca = null;
    private $usuario = null;
    private $ruta = '../imagenes/productos/';



    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

    public function setNombre($valor)
    {
        if ($this->validateAlphabetic($valor, 5, 60)) {
            $this->nombre = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setCantidad($valor)
    {
        if (is_numeric($valor)) {
            if ($valor >= 0) {
                $this->cantidad = $valor;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function setImagen($valor)
    {
        if ($this->validateImageFile($valor, 1000, 1000)) {
            $this->imagen = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setPrecio($valor)
    {
        if ($this->validateMoney($valor)) {
            $this->precio = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setDescripcion($valor)
    {
        if ($this->validateString($valor, 5, 2000)) {
            $this->descripcion = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setCategoria($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->categoria = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setMarca($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->marca = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setIdentificador($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->identificador = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setUsuario($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->usuario = $valor;
            return true;
        } else {
            return false;
        }
    }

    /*
    * Método para obtener el valor de las variables
    */

    public function getRuta()
    {
        return $this->ruta;
    }

    public function getImagen()
    {
        return $this->imagen;
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    //Función para cargar los productos de un vendedor con su identificador
    public function cargarProductos()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, cantidad_producto, precio_producto, 
        imagen FROM producto WHERE id_vendedor = ?';
        $params = array($this->identificador);
        return Database::getRows($sql, $params);
    }

    //Función para cargar las categorias disponibles
    public function categorias()
    {
        $sql = 'SELECT id_categoria_producto, categoria FROM categoria';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Función para cargar las categorias disponibles
    public function marca()
    {
        $sql = 'SELECT * FROM marca';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Función para guardar los productos
    public function guardarProducto()
    {
        $sql = 'INSERT INTO producto(
        nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen, estado_producto,
         id_categoria, id_vendedor, id_marca) VALUES (?,?,?,?,?,?,?,?,?)';
        $params = array(
            $this->nombre, $this->cantidad, $this->descripcion, $this->precio, $this->imagen,
            true, $this->categoria, $this->usuario, $this->marca
        );
        return Database::executeRow($sql, $params);
    }

    //Función para obtener los datos de un solo producto
    public function productoIndividual()
    {
        $sql = 'SELECT id_producto, cantidad_producto, nombre_producto, descripcion_producto, precio_producto, imagen, 
        id_categoria, id_marca FROM producto WHERE id_producto = ?';
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Función que obtiene la cantidad de producto de uno en especifico
    public function cantidadActual()
    {
        $sql = 'SELECT cantidad_producto FROM producto WHERE id_producto = ?';
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }

    //Función para actualizar un producto
    public function actualizar($accion, $imagen)
    {
        $sql = '';
        if ($accion==1) {
            $sql = 'UPDATE producto SET nombre_producto = ?, 
        cantidad_producto = ((SELECT cantidad_producto FROM producto WHERE id_producto = ?)+?), descripcion_producto = ?,
        precio_producto = ?, imagen = ?, id_categoria = ?, id_marca = ? WHERE id_producto = ?';
        } else {
            $sql = 'UPDATE producto SET nombre_producto = ?, 
        cantidad_producto = ((SELECT cantidad_producto FROM producto WHERE id_producto = ?)-?), descripcion_producto = ?,
        precio_producto = ?, imagen = ?, id_categoria = ?, id_marca = ? WHERE id_producto = ?';
        }
        
        $params = array(
            $this->nombre, $this->identificador, $this->cantidad, $this->descripcion, $this->precio, $imagen,
            $this->categoria, $this->marca, $this->identificador
        );
        return Database::executeRow($sql, $params);
    }
}

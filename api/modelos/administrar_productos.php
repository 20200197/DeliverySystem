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
    //Para cliente
    private $id_detalle_producto = null;
    private $buscadorI = null;
    private $buscadorL = null;
    private $id_categoria = null;

    private $id_departamento = null;
    private $nombre_categoria = null;

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

    public function setIdDetalleProducto($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_detalle_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setBuscadorI($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->buscadorI = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setBuscadorL($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->buscadorL = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdCategoria($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_categoria = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdDepartamento($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_departamento = $value;
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

    public function getIdDetalleProducto()
    {
        return $this->id_detalle_producto;
    }

    public function getIdCategoria()
    {
        return $this->id_categoria;
    }

    public function getIdDepartamento()
    {
        return $this->id_departamento;
    }



    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    public function searchRows($value)
    {
        $sql = "SELECT producto.id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto,avg(comentario_producto.valoracion) as calidad,comentario_producto.id_detalle
        from comentario_producto comentario_producto
        FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
        FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
        FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
        inner join vendedor using (id_vendedor)
        inner join marca using (id_marca)
       where nombre_producto ILIKE ? or categoria ILIKE ? or nombre_vendedor ILIKE ? or nombre_marca ILIKE ?
        group by producto.id_producto,vendedor.nombre_vendedor,vendedor.apellido_vendedor,marca.nombre_marca, comentario_producto.id_detalle;";
        $params = array("%$value%", "%$value%", "%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function searchRowsProductoCategoria($value, $id)
    {
        $sql = "SELECT producto.id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto,avg(comentario_producto.valoracion) as calidad,comentario_producto.id_detalle
        from comentario_producto comentario_producto
        FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
        FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
        FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
        inner join vendedor using (id_vendedor)
        inner join marca using (id_marca)
        where nombre_producto ILIKE ? or categoria ILIKE ? or nombre_vendedor ILIKE ? or nombre_marca ILIKE ? and id_categoria = ?
        group by producto.id_producto,vendedor.nombre_vendedor,vendedor.apellido_vendedor,marca.nombre_marca, comentario_producto.id_detalle;";
        $params = array("%$value%", "%$value%", "%$value%", "%$value%",$id);
        return Database::getRows($sql, $params);
    }


    //Función para leer todos los datos
    public function readAll()
    {
        $sql = "SELECT id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen, categoria.categoria,categoria.imagen_categoria,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto
		from producto producto
		inner join categoria categoria on producto.id_categoria = categoria.id_categoria
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
        $params = array($this->estado_producto, $this->id);
        return Database::executeRow($sql, $params);
    }

    /////////////////Cliente//////////////////////////
    //Leemos productos 
    public function readProductos()
    {
        $sql = "SELECT producto.id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto,avg(comentario_producto.valoracion) as calidad,comentario_producto.id_detalle
        from comentario_producto comentario_producto
        FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
        FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
        FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
        inner join vendedor using (id_vendedor)
        inner join marca using (id_marca)
        where status_producto = true
        group by producto.id_producto,vendedor.nombre_vendedor,vendedor.apellido_vendedor,marca.nombre_marca, comentario_producto.id_detalle";
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Leemos categorias
    public function   readCategoria()
    {
        $sql = "SELECT id_categoria, categoria, imagen_categoria
		from categoria
        where status_categoria = true
        order by categoria";
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Función para leer calidad de los productos(No se ocupa )
    public function readCali()
    {
        $sql = "SELECT avg(valoracion) as calidad, comentario_producto.id_detalle 
        from comentario_producto comentario_producto
		FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
		FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
		FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
		inner join vendedor using (id_vendedor)
		inner join marca using (id_marca)
        where status_producto = true and comentario_producto.id_detalle = ?
        group by comentario_producto.id_detalle";
        $params = array($this->id_detalle_producto);
        return Database::getRows($sql, $params);
    }

    //Leemos comentarios de productos
    public function readComent()
    {
        $sql = "SELECT comentario, cliente.usuario_cliente, valoracion as calidad
        from comentario_producto comentario_producto
		FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
		FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
		FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
		FULL OUTER join factura as factura on detalle_factura.id_factura = factura.id_factura
		INNER JOIN direccion as direccion on factura.id_direccion = direccion.id_direccion
		INNER JOIN cliente as cliente on direccion.id_cliente  = cliente.id_cliente
		inner join vendedor using (id_vendedor)
		inner join marca using (id_marca)
        where status_producto = true and producto.id_producto = ?
        group by comentario, cliente.usuario_cliente, valoracion";
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    //Leemos productos por categoria
    public function readProductosCategoria()
    {
        $sql = "SELECT producto.id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto,avg(comentario_producto.valoracion) as calidad, comentario_producto.id_detalle
		from comentario_producto comentario_producto
		FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
		FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
		FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
		inner join vendedor using (id_vendedor)
		inner join marca using (id_marca)
        where status_producto = true and categoria.id_categoria = ?
        group by producto.id_producto,vendedor.nombre_vendedor,vendedor.apellido_vendedor,marca.nombre_marca, comentario_producto.id_detalle";
        $params = array($this->id_categoria);
        return Database::getRows($sql, $params);
    }

    //Buscador por precio
    public function searchProductoPrecio()
    {
        $sql = "SELECT producto.id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto,avg(comentario_producto.valoracion) as calidad
		from comentario_producto comentario_producto
		FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
		FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
		FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
		inner join vendedor using (id_vendedor)
		inner join marca using (id_marca)
        where status_producto = true and (precio_producto >= ? and precio_producto <= ?)
        group by producto.id_producto,vendedor.nombre_vendedor,vendedor.apellido_vendedor,marca.nombre_marca ";
        $params = array($this->buscadorI, $this->buscadorL);
        return Database::getRows($sql, $params);
    }

    //Buscar por calidad y categoria
    public function searchProductoPrecioCategoria($id_categoria)
    {
        $sql = "SELECT producto.id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto,avg(comentario_producto.valoracion) as calidad,producto.id_categoria
		from comentario_producto comentario_producto
		FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
		FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
		FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
		inner join vendedor using (id_vendedor)
		inner join marca using (id_marca)
        where status_producto = true and (precio_producto >= ? and precio_producto <= ?) and id_categoria = ?
        group by producto.id_producto,vendedor.nombre_vendedor,vendedor.apellido_vendedor,marca.nombre_marca ";
        $params = array($this->buscadorI, $this->buscadorL, $id_categoria);
        return Database::getRows($sql, $params);
    }

    //Buscador por calidad
    public function searchProductoCalidad($valorU, $valorD, $valorT, $valorC, $valorCi)
    {
        $sql = "SELECT producto.id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto,avg(comentario_producto.valoracion) as calidad
		from comentario_producto comentario_producto
		FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
		FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
		FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
		inner join vendedor using (id_vendedor)
		inner join marca using (id_marca)
        where status_producto = true and valoracion = ? or valoracion = ? or valoracion = ? or valoracion = ? or valoracion = ? 
        group by producto.id_producto,vendedor.nombre_vendedor,vendedor.apellido_vendedor,marca.nombre_marca ";
        $params = array($valorU, $valorD, $valorT, $valorC, $valorCi);
        return Database::getRows($sql, $params);
    }

    //Buscar po calidad u categoria
    public function searchProductoCalidadCategoria($valor, $id_categoria)
    {
        $sql = "SELECT producto.id_producto, nombre_producto, cantidad_producto, descripcion_producto, precio_producto, imagen,CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca, status_producto,avg(comentario_producto.valoracion) as calidad, producto.id_categoria
		from comentario_producto comentario_producto
		FULL OUTER join detalle_factura as detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
		FULL OUTER join producto as producto on detalle_factura.id_producto = producto.id_producto
		FULL OUTER join categoria as categoria on producto.id_categoria = categoria.id_categoria
		inner join vendedor using (id_vendedor)
		inner join marca using (id_marca)
        where status_producto = true and (valoracion < ? + 1 and valoracion >= ?) or (valoracion >= ? + 0.5 and valoracion < ? + 1) and id_categoria = ?
        group by producto.id_producto,vendedor.nombre_vendedor,vendedor.apellido_vendedor,marca.nombre_marca ";
        $params = array($valor, $valor, $valor, $valor, $id_categoria);
        return Database::getRows($sql, $params);
    }

    public function readOneProducto()
    {
        $sql = "SELECT id_producto, nombre_producto,cantidad_producto, descripcion_producto,precio_producto, imagen,status_producto, categoria, CONCAT(nombre_vendedor,' ',apellido_vendedor) as nombre_vendedor, nombre_marca
                FROM producto producto
                INNER JOIN vendedor using (id_vendedor)
                INNER JOIN marca using (id_marca)
                INNER JOIN categoria as categoria on producto.id_categoria = categoria.id_categoria
                WHERE id_producto = ?";
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    /** Porcentaje de ventas por categoria de sus productos **/ 
    public function readPorcentajeVentaCategoria()
    {
        $sql = " SELECT categoria, SUM(ROUND((cantidad_pedido * 100.0 / 
        (
            SELECT sum(cantidad_pedido)
            FROM detalle_factura
            INNER JOIN factura USING (id_factura)

        )
        ), 2)) porcentaje_categoria
        FROM detalle_factura
        INNER JOIN factura USING (id_factura)
        INNER JOIN producto USING (id_producto)
        INNER JOIN categoria categoria on producto.id_categoria = categoria.id_categoria
        GROUP BY categoria ";
        $params = null;
        return Database::getRows($sql, $params);
    }

    /** Top 5 productos mas vendidos con sus valoraciones **/
    public function readProductosMasVendidosValorados()
    {
        $sql = "SELECT producto.nombre_producto, sum(detalle_factura.cantidad_pedido) as cantidad_pedido, (sum(detalle_factura.cantidad_pedido) * (detalle_factura.precio + detalle_factura.costo_envio)) as total  
           from producto 
           inner join detalle_factura detalle_factura on detalle_factura.id_producto = producto.id_producto 
           inner join factura factura on factura.id_factura = detalle_factura.id_factura 
           inner join comentario_producto comentario_producto on comentario_producto.id_detalle = detalle_factura.id_detalle 
           group by producto.nombre_producto, detalle_factura.precio, detalle_factura.costo_envio, cantidad_pedido 
           order by cantidad_pedido desc limit 5;";
        $params = null;
        return Database::getRows($sql, $params);
    }

    /** Producto mas vendidos por departamento **/
    public function readProductosMasVendidosDepartamento()
    {
        $sql = "SELECT nombre_producto, nombre_departamento, cantidad_pedido
        from detalle_factura 
        inner join factura using(id_factura)
        inner join producto using(id_producto)
        inner join direccion using(id_direccion)
        inner join municipio using(id_municipio)
        inner join departamento using(id_departamento)
        where id_departamento = ?
        order by cantidad_pedido desc limit 5";
        $params = array($this->id_departamento);
        return Database::getRows($sql, $params);
    }


    /**Reportes**/

    /** Top 5 productos mas vendido y 5 menos vendidos **/
    public function readProductosMasVendidos()
    {
        $sql = "SELECT producto.nombre_producto, sum(detalle_factura.cantidad_pedido) as cantidad_pedido, (sum(detalle_factura.cantidad_pedido) * (detalle_factura.precio + detalle_factura.costo_envio)) as total, categoria.categoria  
        from producto 
        inner join detalle_factura detalle_factura on detalle_factura.id_producto = producto.id_producto 
        inner join factura factura on factura.id_factura = detalle_factura.id_factura 
        inner join comentario_producto comentario_producto on comentario_producto.id_detalle = detalle_factura.id_detalle 
		inner join categoria categoria on producto.id_categoria = categoria.id_categoria
        group by producto.nombre_producto, detalle_factura.precio, detalle_factura.costo_envio, cantidad_pedido, categoria.categoria
        order by cantidad_pedido desc limit 5";
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readProductosMenosVendidos()
    {
        $sql = "SELECT producto.nombre_producto, sum(detalle_factura.cantidad_pedido) as cantidad_pedido,min(detalle_factura.cantidad_pedido) as cantidad_minima, (sum(detalle_factura.cantidad_pedido) * (detalle_factura.precio + detalle_factura.costo_envio)) as total, categoria.categoria  
        from producto 
        inner join detalle_factura detalle_factura on detalle_factura.id_producto = producto.id_producto 
        inner join factura factura on factura.id_factura = detalle_factura.id_factura 
        inner join comentario_producto comentario_producto on comentario_producto.id_detalle = detalle_factura.id_detalle 
		inner join categoria categoria on producto.id_categoria = categoria.id_categoria
        group by producto.nombre_producto, detalle_factura.precio, detalle_factura.costo_envio, cantidad_pedido, categoria.categoria
        order by cantidad_pedido desc limit 5";
        $params = null;
        return Database::getRows($sql, $params);
    }

    /** Top 5 productos mas vendidos por categoria **/
    public function readTop5MasVendidosCategoria($categoria_producto)
    {
        $sql = "SELECT nombre_producto, cantidad_producto,categoria, precio_producto
        from detalle_factura detalle_factura
        inner join producto using (id_producto)
        inner join categoria categoria on producto.id_categoria = categoria.id_categoria
        inner join factura using (id_factura)
        where status_producto = true and categoria = ?
        group by producto.nombre_producto, producto.cantidad_producto, categoria.categoria, precio_producto
        order by nombre_producto desc limit 5";
        $params = array($categoria_producto);
        return Database::getRows($sql, $params);
    }

    /**To 10 clientes que se le ha hecho mas entregas/ */
    public function readTop10ClientesMasEntregas()
    {
        $sql = "SELECT CONCAT(cliente.nombre_cliente,' ',cliente.apellido_cliente) as nombre_cliente,cliente.correo_cliente,cliente.id_cliente, COUNT(detalle_factura.id_factura) as veces_pedido,departamento.nombre_departamento, municipio.nombre_municipio 
                from detalle_factura
                inner join factura using(id_factura)
                INNER JOIN direccion direccion ON direccion.id_direccion = factura.id_direccion
                INNER JOIN cliente cliente ON cliente.id_cliente = direccion.id_cliente
                inner join municipio municipio on direccion.id_municipio = municipio.id_municipio
                inner join departamento departamento on municipio.id_departamento = departamento.id_departamento
                group by cliente.id_cliente, departamento.nombre_departamento,municipio.nombre_municipio
                order by nombre_cliente asc limit 10;";
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readComentarioMejoreSemana()
    {
        $sql = " SELECT nombre_producto, categoria, nombre_marca, valoracion, CONCAT(nombre_vendedor, ' ', apellido_vendedor) as nombre_vendedor, comentario
                 FROM comentario_producto
                 inner join detalle_factura detalle_factura on comentario_producto.id_detalle = detalle_factura.id_detalle
                 inner join producto using (id_producto)
                 inner join marca marca on producto.id_marca = marca.id_marca
                 inner join vendedor vendedor on producto.id_vendedor = vendedor.id_vendedor
                 inner join categoria categoria on producto.id_categoria = categoria.id_categoria
                 inner join factura factura on detalle_factura.id_factura = factura.id_factura
                 where valoracion >= 4 and (factura.fecha_compra >= current_date or factura.fecha_compra >= current_date -7 )
                 order by nombre_producto";
        $params = null;
        return Database::getRows($sql, $params);
    }


}

<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Categoria extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre_categoria = null;
    private $imagen_categoria = null;
    private $estado_categoria = null;

    private $ruta = '../imagenes/categoria/';

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

    public function setNombre_categoria($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->nombre_categoria = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->nombre_categoria = null;
            return true;
        }
    }

    public function setImagen_categoria($file)
    {
        if ($this->validateImageFile($file, 2000, 2000)) {
            $this->imagen_categoria = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setEstado_categoria($value)
    {
        if ($this->validateBoolean($value)) {
            $this->estado_categoria = $value;
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

    public function getNombre_categoria()
    {
        return $this->nombre_categoria;
    }

    public function getImagen_categoria()
    {
        return $this->imagen_categoria;
    }

    public function getEstado_categoria()
    {
        return $this->estado_categoria;
    }

    public function getRuta()
    {
        return $this->ruta;
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    public function searchRows($value)
    {
        $sql = 'SELECT id_categoria_producto, categoria, imagen_categoria, status_categoria
                FROM categoria
                WHERE  categoria ILIKE ? 
                ORDER BY categoria';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Función para crear filas
    public function createRow()
    {
        $sql = 'INSERT INTO categoria(categoria, imagen_categoria, status_categoria)
                VALUES(?, ?, ?)';
        $params = array($this->nombre_categoria, $this->imagen_categoria, true);
        return Database::executeRow($sql, $params);
    }

    //Función para leer todos los datos
    public function readAll()
    {
        $sql = 'SELECT id_categoria_producto, categoria, imagen_categoria, status_categoria
                FROM categoria
                ORDER BY categoria';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Función para leer productos por categoria
    public function readProductosCategoria()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto, nombre_categoria, estado_producto, tipo_auto, nombre_empleado
        from productos
        INNER JOIN categoria USING (id_categoria_producto)
        INNER JOIN estado_producto USING (id_estado_producto)
        INNER JOIN tipo_auto USING (id_tipo_auto)
        INNER JOIN empleado USING (id_empleado)
        WHERE id_categoria_producto = ? AND id_estado_producto = 1
        ORDER BY nombre_producto';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_categoria_producto, categoria, imagen_categoria, status_categoria
                FROM categoria
                WHERE id_categoria_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Función para actualizar fila
    public function updateRow($current_image)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->imagen_categoria) ? $this->deleteFile($this->getRuta(), $current_image) : $this->imagen_categoria = $current_image;

        $sql = 'UPDATE categoria
                SET categoria=  ?, imagen_categoria=?
                WHERE id_categoria_producto=?';
        $params = array($this->nombre_categoria,$this->imagen_categoria, $this->id);
        return Database::executeRow($sql, $params);
    }
    
    //Función para eliminar fila
    public function deleteRow()
    {
        $sql = 'DELETE FROM categoria
                WHERE id_categoria_producto= ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateEstado()
    {
        $sql = 'UPDATE categoria
        SET status_categoria = ?
        WHERE id_categoria_producto = ?';
        $params = array($this->estado_categoria, $this->id);
        return Database::executeRow($sql, $params);
    }

     //Función que valida para que no se repitan datos
    //$column es la columna sql que se validara, dui, telefono, etc
    //$data el dato obtenido por get en Api
    public function read($column, $data)
    {
        $sql = "SELECT * FROM categoria
                WHERE $column = ?";
        $params = array($data);

        return Database::getRow($sql, $params);
    }

    //Función que valida que no se repita el dui en update, donde se evaluan los otros duis menos el seleccionado por si le da aceptar y no cambia nada
    public function readD($column, $data)
    {
        $sql = "SELECT * from categoria where $column=?  except select * from categoria where id_categoria_producto = ?";
        $params = array($data, $this->id);

        return Database::getRow($sql, $params);
    }
}

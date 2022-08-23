<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Favorito extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $id_producto = null;
    private $id_cliente = null;

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

    public function setIdProducto($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdCliente($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

   

    public function getId()
    {
        return $this->id;
    }

    public function getIdProducto()
    {
        return $this->id_producto;
    }

    public function getIdCliente()
    {
        return $this->id_cliente;
    }

   

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    //Función para obtener todos los datos de los cliente

   

    //Leer municipios
    public function readAllFavo()
    {
        $sql = "SELECT id_favorito, nombre_producto, descripcion_producto, precio_producto, imagen, id_producto,status_favorito
         from favorito
         inner join producto using (id_producto)
         order by nombre_producto";
        $params = null;
        return Database::getRows($sql, $params);
    }

    // Insertar direccion
    public function createFavorito()
    {
        $sql = 'INSERT INTO favorito(id_producto,id_cliente,status_favorito) values (?,?,?)';
        $params = array($this->id_producto, 2,true);//SESSION[id_cliente]
        return Database::executeRow($sql, $params);
    }

    //Leemos dato individual
    public function readAll()
    {
        $sql = "SELECT id_favorito, nombre_producto, descripcion_producto, precio_producto, imagen, id_producto,status_favorito
                FROM favorito
                inner join producto using (id_producto)
                WHERE status_favorito=true and id_cliente = ?";
        $params = array(2);//SESSION[id_cliente]
        return Database::getRows($sql, $params);
    }

     //Leemos dato individual, comprobamos que haya productos en favoritos del cliente logueado
     public function readCheckFavoOfClient()
     {
         $sql = "SELECT id_favorito, nombre_producto, descripcion_producto, precio_producto, imagen, id_producto,status_favorito
                 FROM favorito
                 inner join producto using (id_producto)
                 WHERE status_favorito=true and id_producto = ? and id_cliente = ?";
         $params = array($this->id_producto,2);//SESSION[id_cliente]
         return Database::getRows($sql, $params);
     }

     public function readCheckFavoOfClientCategori()
     {
         $sql = "SELECT id_favorito, nombre_producto, descripcion_producto, precio_producto, imagen, id_producto,status_favorito
                 FROM favorito
                 inner join producto using (id_producto)
                 WHERE status_favorito=true and id_producto = ? and id_cliente = ?";
         $params = array($this->id_producto,2);//SESSION[id_cliente]
         return Database::getRows($sql, $params);
     }


     public function readActive()
     {
         $sql = "SELECT id_favorito, nombre_producto, descripcion_producto, precio_producto, imagen, id_producto,status_favorito
                 FROM favorito
                 inner join producto using (id_producto)
                 WHERE id_cliente = ?";
         $params = array(2);//SESSION[id_cliente]
         return Database::getRows($sql, $params);
     }

    //Leemos datos
    public function readActiveCategoria($id_categoria)
    {
        $sql = "SELECT id_favorito, nombre_producto, descripcion_producto, precio_producto, imagen, id_producto,status_favorito,id_categoria
                FROM favorito
                inner join producto using (id_producto)
                WHERE id_categoria = ? and id_cliente = ?";
        $params = array($id_categoria,2);//SESSION[id_cliente]
        return Database::getRows($sql, $params);
    }

    //Actualizamos direccion
    public function updateFavorito()
    {
        $sql = 'UPDATE favorito SET id_producto = ? where id_favorito=?';
        $params = array($this->id_producto, $this->id);
        return Database::executeRow($sql, $params);
    }

    //Eliminamos direccion
    public function deleteFavorito()
    {
        $sql = 'DELETE from favorito  where id_producto = ? and id_cliente = ?';
        $params = array($this->id_producto,2);//SESSION[id_cliente]
        return Database::executeRow($sql, $params);
    }
}

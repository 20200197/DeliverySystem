<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Marca extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre_Marca = null;

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

    public function setNombreMarca($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->nombre_marca = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->nombre_marca = null;
            return true;
        }
    }

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getId()
    {
        return $this->id;
    }

    public function getNombreMarca()
    {
        return $this->nombre_marca;
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
        $sql = 'SELECT id_marca, nombre_marca
                FROM marca 
                WHERE  nombre_marca ILIKE ? 
                ORDER BY nombre_marca';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Función para crear filas
    public function createRow()
    {
        $sql = 'INSERT INTO marca(nombre_marca)
                VALUES(?)';
        $params = array($this->nombre_marca);
        return Database::executeRow($sql, $params);
    }

    //Función para leer todos los datos
    public function readAll()
    {
        $sql = 'SELECT id_marca, nombre_marca
                FROM marca
                ORDER BY nombre_marca';
        $params = null;
        return Database::getRows($sql, $params);
    }


    public function readOne()
    {
        $sql = 'SELECT id_marca,nombre_categoria
                FROM marca
                WHERE id_marca = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Función para actualizar fila
    public function updateRow($current_image)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        $sql = 'UPDATE marca
                SET nombre_marca=  ?
                WHERE id_marca=?';
        $params = array($this->nombre_marca,$this->id);
        return Database::executeRow($sql, $params);
    }
    

    //Función para eliminar fila
    public function deleteRow()
    {
        $sql = 'DELETE FROM nombre_marca
                WHERE id_marca= ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}

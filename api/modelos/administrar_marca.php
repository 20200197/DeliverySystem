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
    private $estado_marca = null;

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

    public function setEstadomarca($value)
    {
        if ($this->validateBoolean($value)) {
            $this->estado_marca = $value;
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

    public function getNombreMarca()
    {
        return $this->nombre_marca;
    }

    public function getRuta()
    {
        return $this->ruta;
    }

    public function getEstado_marca($value)
    {
        
        return $this->estado_marca;
          
    }
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    public function searchRows($value)
    {
        $sql = 'SELECT id_marca, nombre_marca,status_marca
                FROM marca 
                WHERE  nombre_marca ILIKE ? 
                ORDER BY nombre_marca';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Función para crear filas
    public function createRow()
    {
        $sql = 'INSERT INTO marca(nombre_marca,status_marca)
                VALUES(?,?)';
        $params = array($this->nombre_marca,true);
        return Database::executeRow($sql, $params);
    }

    //Función para leer todos los datos
    public function readAll()
    {
        $sql = 'SELECT id_marca, nombre_marca,status_marca
                FROM marca
                ORDER BY nombre_marca';
        $params = null;
        return Database::getRows($sql, $params);
    }


    public function readOne()
    {
        $sql = 'SELECT id_marca,nombre_marca,status_marca
                FROM marca
                WHERE id_marca = ?
                ORDER BY nombre_marca';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Función para actualizar fila
    public function updateRow()
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        $sql = 'UPDATE marca
                SET nombre_marca=  ?
                WHERE id_marca=?';
        $params = array($this->nombre_marca,$this->id);
        return Database::executeRow($sql, $params);
    }

    
    public function getStatus()
    {
        $sql = 'SELECT status_marca FROM marca WHERE id_marca = ?';
        $params = array($this->id);

        if ($data = Database::getRow($sql, $params)) {
            $this->estado_marca = $data['status_marca'];
            return true;
        } else {
            return false;
        }
    }

    public function changeStatus()
    {
        $sql = 'UPDATE marca SET status_marca = ? WHERE id_marca = ?';
        if ($this->estado_marca) {
            $params = array(0, $this->id);
        } else {
            $params = array(1, $this->id);
        }

        return Database::executeRow($sql, $params);
    }


}

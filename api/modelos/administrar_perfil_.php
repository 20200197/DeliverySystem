<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class AdministrarPerfil extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = nuLL;
    private $imagen = null;
    private $ruta = '../imagenes/productos/';



    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

    public function setImagen($valor)
    {
        if ($this->validateImageFile($valor, 1000, 1000)) {
            $this->imagen = $this->getFileName();
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

    //Función que carga los datos del perfil

    public function cargarPerfil()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, dui_admin, correo_admin, telefono_admin 
            FROM administrador WHERE id_admin = ?';
        $params = array($this->identificador);
        return Database::getRow($sql, $params);
    }
}
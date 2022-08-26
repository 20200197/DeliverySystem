<?php

class EstadisticaRepartidor extends Validator
{

    /**
     * Variables globales
     */

    private $departamento = array();
    /**
     * Constructores
     */


    /**
     * Método para validar el arreglo de direcciones
     */
    public function setDepartamento($value)
    {
        //Se divide el string
        $arreglo = explode(",", $value);
        //Se crea una variable de confirmacion
        $respuesta = true;
        //Se recorren todos los datos
        foreach ($arreglo as $valor) {
            if ($this->validateNaturalNumber($valor)) {
                array_push($this->departamento, intval($valor));
            } else {
                $this->departamento = array();
                $respuesta = false;
                return $respuesta;
                break;
            }
        }
        return $respuesta;
    }


    /**
     * Funciones para obtener datos
     */


    //Obtener todos los clientes
    public function topCliente()
    {
        $sql = "(SELECT * FROM calcular_top(?))";
        //Se revisa si está vacío para colocar un valor por defecto
        if (count($this->departamento) == 0) {
            array_push($this->departamento, 0);
        }
        //Se revisa la cantidad de departamentos para unir la sentencia
        for ($i = 1; $i < count($this->departamento); $i++) {
            $sql = $sql . "UNION 
            (SELECT * FROM calcular_top(?))";
        }
        //Se obtienen los datos
        return Database::getRows($sql, $this->departamento);
    }

    //Obtener el nombre del departamento
    public function Departamentos()
    {

        $sql = "SELECT id_departamento, nombre_departamento FROM departamento
        ORDER BY id_departamento";
        return Database::getRows($sql, null);
    }
}

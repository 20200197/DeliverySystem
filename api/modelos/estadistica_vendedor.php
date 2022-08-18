<?php

class EstadisticaVendedor extends Validator
{

    /**
     * Variables globales
     */

    private $fechaInicial = null;
    private $fechaFinal = null;

    /**
     * Constructores
     */

     public function setFechaInicial($value) 
     {
        if ($this->validateDate($value)) {
            $this->fechaInicial = $value;
            return true;
        } else {
            return false;
        }
     }

     public function setFechaFinal($value)
     {
        if ($this->validateDate($value)) {
            $this->fechaFinal = $value;
            return true;
        } else {
            return false;
        }
     }

     /**
      * Funciones para obtener datos
      */


      //Obtenes total de compras y promedios
      public function totalPromedio()
      {
        $sql = 'SELECT SUM(total) AS total, calcular_promedio(fecha_compra::DATE) AS promedio, fecha_compra::DATE  FROM factura
        WHERE fecha_compra::DATE BETWEEN ? AND ?
        GROUP BY fecha_compra::DATE';
        $params = array($this->fechaInicial, $this->fechaFinal);
        return Database::getRows($sql, $params);
      }

}

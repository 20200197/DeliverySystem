<?php

class EstadisticaRepartidor extends Validator
{

    /**
     * Variables globales
     */

    private $departamento = null;
    /**
     * Constructores
     */

    public function setDepartamento($value) {
        if ($this->validateNaturalNumber($value)) {
            $this->departamento = $value;
            return true;
        } else {
            return false;
        }
    }


     /**
      * Funciones para obtener datos
      */


      //Obtener todos los clientes
      public function topCliente()
      {
        $sql = "SELECT SUM(total) AS total, CONCAT(c.nombre_cliente, ' ', c.apellido_cliente) AS cliente, nombre_departamento FROM factura f
		INNER JOIN direccion d ON f.id_direccion = d.id_direccion
		INNER JOIN departamento dp ON dp.id_departamento = d.id_direccion
		INNER JOIN cliente c ON c.id_cliente = d.id_cliente
		WHERE dp.id_departamento = ?
		GROUP BY dp.id_departamento, cliente
		ORDER BY total";
        $params = array($this->departamento);
        return Database::getRows($sql, $params);
      }

      //Obtener el nombre del departamento
      public function nombreDepartamento()
      {
        $sql = "SELECT nombre_departamento, 0 AS total, 'Ninguno' AS cliente FROM departamento WHERE id_departamento = ?";
        $params = array($this->departamento);
        return Database::getRows($sql, $params);
      }

}

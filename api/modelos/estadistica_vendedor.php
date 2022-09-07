<?php

class EstadisticaVendedor extends Validator
{

    /**
     * Variables globales
     */

    private $fechaInicial = null;
    private $fechaFinal = null;
    private $inicial = null;
    private $final = null;
    private $idVendedor = null;

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

    public function setInicial($value)
    {
        if ($this->validateMoney($value)) {
            $this->inicial = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFinal($value)
    {
        if ($this->validateMoney($value)) {
            $this->final = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdVendedor($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->idVendedor = $value;
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

    //Función para obtener datos de facturas de clientes
    public function facturasClientes()
    {
        $sql = "SELECT MIN(df.precio * df.cantidad_pedido) AS minimo, MAX(df.precio * df.cantidad_pedido) AS maximo,
            ROUND(AVG(df.precio * df.cantidad_pedido),2) AS promedio, CONCAT(c.nombre_cliente, ' ',c.apellido_cliente) AS nombre FROM detalle_factura df
            INNER JOIN producto p ON p.id_producto = df.id_producto
            INNER JOIN vendedor v ON p.id_vendedor = v.id_vendedor
            INNER JOIN factura f ON df.id_factura = f.id_factura
            INNER JOIN direccion d ON d.id_direccion = f.id_direccion
            INNER JOIN cliente c ON c.id_cliente = d.id_direccion
            WHERE p.id_vendedor = ? AND
            (SELECT ROUND(AVG(df.precio * df.cantidad_pedido),2) FROM detalle_factura df 
            INNER JOIN factura fa ON df.id_factura = fa.id_factura
            WHERE fa.id_factura = f.id_factura) BETWEEN ? AND ?
            GROUP BY nombre";

        $params = array($this->idVendedor, $this->inicial, $this->final);
        return Database::getRows($sql, $params);
    }
}

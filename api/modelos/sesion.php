<?php

class Sesion extends Validator
{

    public function sesion($id)
    {
        $sql = "SELECT id_admin,CONCAT(nombre_admin, ' ',apellido_admin) as nombre FROM administrador WHERE id_admin = ?";
        $params = array($id);
        return Database::getRow($sql, $params);
    }

    public function sesionV($id)
    {
        $sql = "SELECT CONCAT(nombre_vendedor, ' ',apellido_vendedor) as nombre, foto_vendedor FROM vendedor WHERE id_vendedor = ?";
        $params = array($id);
        return Database::getRow($sql, $params);
    }

    public function sesionC($id)
    {
        $sql = "SELECT CONCAT(nombre_cliente, ' ',apellido_cliente) as nombre, foto_cliente FROM cliente WHERE id_cliente = ?";
        $params = array($id);
        return Database::getRow($sql, $params);
    }


    public function sesionR($id)
    {
        $sql = "SELECT CONCAT(nombre_repartidor, ' ',apellido_repartidor) as nombre, foto_repartidor FROM repartidor WHERE id_repartidor = ?";
        $params = array($id);
        return Database::getRow($sql, $params);
    }
 

}

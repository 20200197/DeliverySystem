<?php

class Sesion extends Validator
{

    public function sesion($id){
        $sql = "SELECT CONCAT(nombre_admin, ' ',apellido_admin) as nombre FROM administrador WHERE id_admin = ?";
        $params = array($id);
        return Database::getRow($sql, $params);
    }

    public function sesionV($id)
    {
        $sql = "SELECT CONCAT(nombre_vendedor, ' ',apellido_vendedor) as nombre FROM vendedor WHERE id_vendedor = ?";
        $params = array($id);
        return Database::getRow($sql, $params);
    }
 
}

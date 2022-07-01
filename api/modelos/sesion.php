<?php

class Sesion extends Validator
{

    public function sesion($id){
        $sql = "SELECT CONCAT(nombre_admin, ' ',apellido_admin) as nombre FROM administrador WHERE id_admin = ?";
        $params = array($id);
        return Database::getRow($sql, $params);
    }
 
}

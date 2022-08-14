<?php

class Factura extends Validator
{
    private $id_detalle = null;
    private $cantidad_producto = null;
    private $precio_unitario = null;
    private $id_producto = null;

    private $id_factura = null;
    private $fecha = null;
    private $total = null;
    private $estado_factura = null;
    private $direccion = null;
    private $id_cliente = null;
    
    //creamos metodos set

    public function setIdDetalle($valor){
        if($this->validateNaturalNumber($valor)){
            $this->id_detalle = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setCantidadPorducto($valor){
        if($this->validateNaturalNumber($valor)){
            $this->cantidad_producto = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setPrecioUnitario($valor){
        if($this->validateMoney($valor)){
            $this->precio_unitario = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setIdProducto($valor){
        if($this->validateNaturalNumber($valor)){
            $this->id_producto = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setIdFactura($valor){
        if($this->validateNaturalNumber($valor)){
            $this->id_factura = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setFecha($date){
        if($this->validateDate($date)){
            $this->fecha = $date;
            return true;
        }else{
            return false;
        }
    }

    public function setTotal($valor){
        if($this->validateMoney($valor)){
            $this->total = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setEstadoFactura($valor){
        if($this->validateAlphabetic($valor, 1, 20)){
            $this->estado_factura = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setDireccion($valor){
        if($this->validateDirection($valor)){
            $this->direccion = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setIdCliente($valor){
        if($this->validateNaturalNumber($valor)){
            $this->id_cliente = $valor;
            return true;
        }else{
            return false;
        }
    }

    //creamos metodos get

    public function getIdDetalle(){
        return $this->id_detalle;
    }

    public function getCantidadProducto(){
        return $this->cantidad_producto;
    }

    public function getPrecioUnitario(){
        return $this->precio_unitario;
    }

    public function getIdProducto(){
        return $this->id_producto;
    }

    public function getIdFactura(){
        return $this->id_factura;
    }

    public function getFecha(){
        return $this->fecha;
    }

    public function getTotal(){
        return $this->total;
    }

    public function getEstadoFactura(){
        return $this->estado_factura;
    }

    public function getDireccion(){
        return $this->direccion;
    }

    public function getIdCliente(){
        return $this->id_cliente;
    }

    //Creamos metodos principales

    public function checkOrder(){
        $this->estado_factura = 1;

        $sql = 'SELECT id_factura
                FROM factura
                INNER JOIN direccion USING (id_direccion)
                INNER JOIN cliente USING (id_cliente)
                WHERE id_status = ? AND id_cliente = ?';
        $params = array($this->estado_factura, $_SESSION['id_cliente']);

        if($data = Database::getRow($sql, $params)){
            $this->id_factura = $data['id_factura'];
            return true;
        }else{
            $sql = 'INSERT INTO factura(id_status, (SELECT id_direccion FROM direccion WHERE id_cliente = ? LIMIT 1))
                    VALUES(?, ?)';
            $params = array($_SESSION['id_cliente'] ,$this->estado_factura, $_SESSION['id_cliente']);

            if($this->id_factura = Database::getLastRow($sql, $params)){
                return true;
            }else{
                return false;
            }
        }
    }

    public function createDetail(){
        $sql = 'INSERT INTO detalle_factura(precio, cantidad_pedido, id_factura, id_producto)
                VALUES((SELECT precio_producto FROM productos WHERE id_producto = ?), ?, ?, ?)';
        $params = array($this->id_producto, $this->cantidad_producto, $this->id_factura, $this->id_producto);
        return Database::executeRow($sql, $params);
    }

    public function readDetail(){
        $sql = 'SELECT id_detalle_factura, id_factura, id_producto, imagen_producto, nombre_producto, precio_unitario, cantidad_producto, precio_unitario * cantidad_producto as "subtotal"
                FROM detalle_factura INNER JOIN factura USING(id_factura) INNER JOIN productos USING(id_producto)
                WHERE id_factura = ? AND estado_factura = ?';
        $params = array($this->id_factura, 'En proceso');
        return Database::getRows($sql, $params);
    }

    public function total(){
        $sql = 'SELECT sum(precio_unitario * cantidad_producto)Suma
                FROM detalle_factura INNER JOIN factura USING(id_factura) INNER JOIN productos USING(id_producto)
                WHERE id_factura = ?';
        $params = array($this->id_factura);
        return Database::getRow($sql, $params);
    }

    public function finishOrder()
    {
        // Se establece la zona horaria local para obtener la fecha del servidor.
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');
        $this->estado_factura = 'Cancelado';
        $sql = 'UPDATE factura
                SET estado_factura = ?, fecha = ?, direccion = ?, total = (SELECT sum(precio_unitario * cantidad_producto)Suma
                FROM detalle_factura INNER JOIN factura USING(id_factura) INNER JOIN productos USING(id_producto)
                WHERE id_factura = ?)
                WHERE id_factura = ?';
        $params = array($this->estado_factura, $date, $this->direccion, $_SESSION['id_factura'], $_SESSION['id_factura']);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow(){
        $sql = 'DELETE FROM detalle_factura WHERE id_producto = ? AND id_factura = ?';
        $params = array($this->id_producto, $_SESSION['id_factura']);
        return Database::executeRow($sql, $params);
    }

    //Chequeamos si existe el producto dentro del carrito
    public function checkProductExist(){
        $sql = 'SELECT id_producto, cantidad_producto FROM detalle_factura
                INNER JOIN factura USING(id_factura)
                WHERE id_producto = ? AND id_factura = ?';
        $params = array($this->id_producto, $this->id_factura);
        return Database::getRow($sql, $params);
    }


    //Añadimos cantidad al producto ya existente en el carrito
    public function addToDetail(){
        $sql = 'UPDATE detalle_factura SET cantidad_producto = ?
                WHERE id_producto = ? AND id_factura = ?';
        $params = array($this->cantidad_producto, $this->id_producto, $_SESSION['id_factura']);

        return Database::executeRow($sql, $params);
    }
}

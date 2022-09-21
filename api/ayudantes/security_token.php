<?php

Class SecurityToken {

    //Funcion para actualizar el campo de token a una cadena aleatoria cuando se loguee
    private function insertToken($token)
    {
        $sql = 'UPDATE administrador SET token = ? WHERE id_admin = ?';
        $params = array($token, $_SESSION['id_admin']);

        return Database::executeRow($sql, $params);
    }

    //Funcion para actualizar el campo de token a null cuando se cierre sesión
    private function delTokenDb()
    {
        $sql = 'UPDATE administrador SET token = null WHERE id_admin = ?';
        $params = array($_SESSION['id_admin']);

        return Database::executeRow($sql, $params);
    }

    //Funcion para obtener el token de la base de datos según el id del admin
    private function getTokenDb()
    {
        $sql = 'SELECT token FROM administrador WHERE id_admin = ?';
        $params = array($_SESSION['id_admin']);

        $data = Database::getRow($sql, $params);

        return $data['token'];
    }

    /*
        Creamos el metodo getToken.
        Funcionamiento: 
        Retornará el valor del token en la base de datos evaluando el tipo de usuario que hace la solicitud
        Parametros solicitados:
        $type, Según el valór enviado desde la API returnara el token respectivo.
        Salida Bool o String:
        False o "8f239b5e2f5c9912dfa2171b5b76d9af779abfd03d1d4128" (ejemplo).
    */
    public function getToken($type)
    {
        switch ($type) {
            case 'admin':
                if (isset($_SESSION['id_admin'])) {
                    return $this->getTokenDb();
                } else {
                    return false;
                }
                break;
            default:
            return false;
                break;
        }
        
    }

    /*
        Creamos el metodo setToken.
        Funcionamiento: 
        Primero crea una cadena random de 24 carácteres aleatorios
        después convierte esa cadena a hexadecimal duplicando el número de carácteres a 48.
        Parametros solicitados:
        $type, Según el valór enviado desde la API se asignara la cadena de 48 carácteres a un token dentro de la clase.
        Salida Bool:
        True ó False.
    */
    public function setToken($type)
    {
        //generamos la cadena de 48 carácteres hexadecimal.
        $random_chain = bin2hex(random_bytes(24));

        //verificamos el tipo de token que deseamos generar.
        switch ($type) {
            //asignamos el valor de la cadena de carácteres hexadecimal a la variable de la clase y a una variable de sesión.
            case 'admin':
                if (isset($_SESSION['id_admin'])) {
                    $_SESSION['admin_token'] = $random_chain;
                    $this->insertToken($random_chain, $_SESSION['id_admin']);
                    return true;
                } else {
                    return false;
                }
                break;
            /*proximamente
            case 'client':
                $_SESSION['client_token'] = $random_chain;
                return true;
                break;
            case 'seller':
                $_SESSION['seller_token'] = $random_chain;
                return true;
                break;
            case 'distributor':
                $_SESSION['distributor_token'] = $random_chain;
                return true;
                break;
                */
            default:
                return false;
                break;
        }
    }

    /*
        Creamos el metodo delToken.
        Funcionamiento: 
        Evalua el tipo de caso solicitado para eliminar el token correspondiente a ese nivel de usuario
        Parametros solicitados:
        $type, Según el valór enviado desde la API se eliminará el token anteriormente creado, se usa en la acción 'logOut' de la API.
        Salida Bool:
        True ó False.
    */
    public function delToken($type)
    {
        //Evaluamos el caso enviado desde la API.
        switch ($type) {
            //Reestablecemos el token guardado dentro de la clase y eliminamos la variable de sesión respectiva al token generado anteriormente.
            case 'admin':
                unset($_SESSION['admin_token']);
                if (isset($_SESSION['id_admin'])) {
                    $this->delTokenDb($_SESSION['id_admin']);
                    return true;
                } else {
                    return false;
                }
                break;
            //Proximamente
            /*case 'client':
                unset($_SESSION['client_token']);
                return true;
                break;
            case 'seller':
                unset($_SESSION['seller_token']);
                return true;
                break;
            case 'distributor':
                unset($_SESSION['distributor_token']);
                return true;
                break;
                */
            default:
                return false;
                break;
        }
    }
}
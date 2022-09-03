<?php

Class SecurityToken {

    //creamos los atributos de la clase token, en este caso se creará un token para cada nivel de usuario dentro de la aplicación web
    private $admin_token = null;
    private $client_token = null;
    private $seller_token = null;
    private $distributor_token = null;

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
                $this->admin_token = $random_chain;
                $GLOBALS['admin_token'] = $this->admin_token;
                $_SESSION['admin_token'] = $this->admin_token;
                return true;
                break;
            case 'client':
                $this->client_token = $random_chain;
                $GLOBALS['client_token'] = $this->client_token;
                $_SESSION['client_token'] = $this->client_token;
                return true;
                break;
            case 'seller':
                $this->seller_token = $random_chain;
                $GLOBALS['seller_token'] = $this->seller_token;
                $_SESSION['seller_token'] = $this->seller_token;
                return true;
                break;
            case 'distributor':
                $this->distributor_token = $random_chain;
                $GLOBALS['distributor_token'] = $this->admin_token;
                $_SESSION['distributor_token'] = $this->distributor_token;
                return true;
                break;
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
                $this->admin_token = null;
                unset($GLOBALS['admin_token']);
                unset($_SESSION['admin_token']);
                return true;
                break;
            case 'client':
                $this->client_token = null;
                unset($GLOBALS['client_token']);
                unset($_SESSION['client_token']);
                return true;
                break;
            case 'seller':
                $this->seller_token = null;
                unset($GLOBALS['seller_token']);
                unset($_SESSION['seller_token']);
                return true;
                break;
            case 'distributor':
                $this->distributor_token = null;
                unset($GLOBALS['distributor_token']);
                unset($_SESSION['distributor_token']);
                return true;
                break;
            default:
                return false;
                break;
        }
    }
}

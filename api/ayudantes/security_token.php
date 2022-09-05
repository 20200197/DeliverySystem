<?php

Class SecurityToken {

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
                $_SESSION['admin_token'] = $random_chain;
                return true;
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
                return true;
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
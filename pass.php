<?php

class Pass {

    private $passwordError = null;
   
    /**
     *  Función para validad la contraseña
     * 
     *  Se validan los siguientes aspectos
     * 
     *  - Longitud de al menos 8 carácteres y máximo de 64 carácteres
     *  - Contener al menos una letra minúscula
     *  - Contener al menos una letra mayúscula
     *  - Contener al menos un número
     *  - Contener al menos un caráctere especial
     *  - Comprobar que no existan más de 4 símbolos o números seguidos
     *  - Verificar que los siguientes datos no sean parte de la contraseña
     *      + Nombre
     *      + Apellido
     *      + Nombre de usuario
     *      + Partes de tu fecha de nacimiento
     * 
     *  Se generará la excepción del problema y un booleano para verificar si es apta o no
     * 
     */

        //Valor de entrada


    public function validateSafePassword($clave) // ,$nombre, $apellido, $usuario, $fecha
    {
        //Se procede a convertir la clave en un arreglo de carácteres diferentes
        $arregloPass = str_split($clave);
        //Se valida que la contraseña esté dentro de la longitud mínima
        if (count($arregloPass) < 8) {
            //Se verifica que la longitud esté dentro de la longitud máxima 
            if (count($arregloPass) > 64) {
                
            } else {
                //Se coloca el problema
                $this->passwordError = 'La clave de contener un máximo de 64 caracteres';
                return false;
            }
        } else {
            //Se coloca el problema
            $this->passwordError = 'La clave de contener al menos 8 caracteres';
            return false;
        }
    }
}
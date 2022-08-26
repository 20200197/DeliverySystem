<?php   
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

    /**
     * Se pueden in_array() para validar si existe algo en especifico
     */

    function validateSafePassword($clave) // ,$nombre, $apellido, $usuario, $fecha
    {
        //Se crea un arreglo donde se colocarán los datos que son parte de los resultados
        //Se procede a convertir la clave en un arreglo de carácteres diferentes
        $arregloPass = str_split($clave);
        //Se valida que la contraseña esté dentro de la longitud mínima
        if (count($arregloPass) >= 8) {
            //Se verifica que la longitud esté dentro de la longitud máxima 
            if (count($arregloPass) <= 64) {
                //Se filtra para saber si hay números dentro de la contraseña
                $numero = array_filter($arregloPass,"numero");
                if (count($numero) > 0) {
                    //Se filtra para saber si hay letras dentro de la contraseña
                    $letra = array_filter($arregloPass, "letra");
                    if (count($letra) > 0) {
                        //Se filtra para saber si hay simbolos dentro de la contraseña
                        $simbolos = array_filter($arregloPass, "simbolo");
                        if (count($simbolos) > 0) {
                            //Se revisa que la contraseña no contenga datos dañinos para el sistema
                            if (!preg_match('[a-bA-Ba-! #$%&()*+,-./:;<=>?@\^_{|}~]', $clave)) {
                                echo "Nice";
                            } else {
                                echo "Hay, hacks";
                            }
                        } else {
                            echo "No hay simbolos dentro de la contraseña";
                        }
                    } else {
                        echo "No hay letras dentro de la contraseña";
                    }
                } else {
                    echo "Lo sentimos, no hay números";
                }

            } else {
                //Se devuelve el problema
                echo  'La clave debe contener un máximo de 64 caracteres';
            }
        } else {
            echo 'La clave debe contener un mínimo de 8 caracteres';   
        }
    }   

    validateSafePassword("1234#'5678s999");

    /**
     * Función para validar que sea un número
     * 
     */

     function numero($valor) {
        //Se revisa si el valor es númerico
            return (is_numeric($valor));

     }

     /*
     * Función para validar que sea una letra
     * 
     */

     function letra($valor) {
        //Se revisa si el valor es númerico
            return (ctype_alpha($valor));

     }

     /**
      * Función para validar que existan simbolos
      */

      function simbolo($valor) {
        //Se revisa si el valor es númerico
            return (ctype_punct($valor));

     }



    /**
     * preg_match_all('/[a-z1-9$]/', $clave, $encuentros,PREG_OFFSET_CAPTURE);
                $arrar = $encuentros[0];
                foreach ($arrar AS $valor) {
                    $conta = true;
                    foreach ($valor AS $fila) {
                        
                        if ($conta) {
                            echo "El valor es: ".$fila."<br>";
                            $conta = false;
                        } else {
                            $conta = true;
                        }
                        
                    }
                    
                    
                }
     */





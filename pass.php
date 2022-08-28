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

function validateSafePassword($clave, $nombre, $apellido, $usuario, $fecha)
{
    //Se procede a convertir la clave en un arreglo de carácteres diferentes
    $arregloPass = str_split($clave);
    //Se valida que la contraseña esté dentro de la longitud mínima
    if (count($arregloPass) >= 8) {
        //Se verifica que la longitud esté dentro de la longitud máxima 
        if (count($arregloPass) <= 64) {
            //Se filtra para saber si hay carácteres peligrosos
            $peligro = array_filter($arregloPass, "prohibido");
            if (count($peligro) == 0) {
                //Se filtra para saber si hay números dentro de la contraseña
                $numero = array_filter($arregloPass, "numero");
                if (count($numero) > 0) {
                    //Se filtra para saber si hay letras dentro de la contraseña
                    $letra = array_filter($arregloPass, "letra");
                    if (count($letra) > 0) {
                        //Se filtra para saber si hay simbolos dentro de la contraseña
                        $simbolos = array_filter($arregloPass, "simbolo");
                        if (count($simbolos) > 0) {
                            //Se revisa que la contraseña no contenga datos dañinos para el sistema
                            echo "Nice";
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
                echo "Hay carácteres no válidos dentro de la contraseña";
            }
        } else {
            //Se devuelve el problema
            echo  'La clave debe contener un máximo de 64 caracteres';
        }
    } else {
        echo 'La clave debe contener un mínimo de 8 caracteres';
    }
}

//validateSafePassword("1234#85678s999", null, null, null, null);

/**
 * Función para validar que sea un número
 * 
 */

function numero($valor)
{
    //Se revisa si el valor es númerico
    return (is_numeric($valor));
}

/*
     * Función para validar que sea una letra
     * 
     */

function letra($valor)
{
    //Se revisa si el valor es númerico
    return (ctype_alpha($valor));
}

/**
 * Función para validar que existan simbolos
 */

function simbolo($valor)
{
    //Se revisa si el valor es númerico
    return (ctype_punct($valor));
}


/**
 * Función para validar que no contenga datos peligrosos para el sistema
 */

function prohibido($valor)
{
    //Sr revisa si contiene valores problematicos
    if (str_contains($valor, "'") || str_contains($valor, '"')) {

        return $valor;
    }
}


/**
 * Función para valiar que un nombre o apellido sean parte de la clave
 */

function validarPalabra($arreglo, $palabra)
{
    //Se verifica si la palabra a buscar se puede dividir por medio de los espacios
    $division = explode(' ', $palabra);
    //Se obtiene la cantidad de palabras en las que se pudo dividir
    $cantidad = count($division);
    //Se realiza la busqueda dependiente de cuántas palabras se logró dividir
    for ($i = 0; $i < $cantidad; $i++) {
        //Se procede a dividir la palabra encontrada en valores individuales
        $palabraDividida = str_split($division[$i]);
        $coincidencias = 0; //Contador de aciertos seguidos
        //Se evaluan las letras para buscar coincidencias
        foreach ($arreglo as $letra) {
            //Se revisa si la letra de la clave es igual a la letra de la palabra
            if ($letra == $palabraDividida[$coincidencias]) {
                echo $letra . " Si es: " . $palabraDividida[$coincidencias] . "<br>";
                $coincidencias++;
                //Se revisa si la cantidad de coincidencias para dar por hecho que está incluida
                if ($coincidencias > round((count($palabraDividida)/2),0, PHP_ROUND_HALF_DOWN)) {
                    echo "Se ha determinado que la palabra se encuentra dentro de la clave";
                    break;
                }
            } else {
                echo $letra . " No es: " . $palabraDividida[$coincidencias] . "<br>";
                $coincidencias = 0;
            }
        }
    }
}

validarPalabra(['o', 'l', 'i', 'v', 'e', 'r'], "oliveo");

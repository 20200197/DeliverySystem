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
                    $minuscula = array_filter($arregloPass, "letraMinuscula");
                    if (count($minuscula) > 0) {
                        $mayuscula = array_filter($arregloPass, "letraMayuscula");
                        if (count($mayuscula) > 0) {
                            //Se filtra para saber si hay simbolos dentro de la contraseña
                            $simbolos = array_filter($arregloPass, "simbolo");
                            if (count($simbolos) > 0) {
                                //Se revisa que la contraseña no contenga el nombre dentro de ella
                                if (!validarPalabra($arregloPass, $nombre)) {
                                    //Se revisa que la contraseña no contenga el apellido dentro de ella
                                    if (!validarPalabra($arregloPass, $apellido)) {
                                        //Se revisa que la contraseña no contenga el nombre de usuario dentro de ella
                                        if (!validarPalabra($arregloPass, $usuario)) {
                                            //Se revisa que la contraseña no contenga la fecha o una referencia de ella
                                            if (!validarFecha($clave, $fecha)) {
                                                echo "Es una contraseña segura";
                                            } else {
                                                echo "La contraseña no puede contener tu fecha o parte de ella";
                                            }
                                        } else {
                                            echo "La contraseña no puede contener tu nombre de usuario o una fracción";
                                        }
                                    } else {
                                        echo "La contraseña no puede contener tu apellido o una fracción";
                                    }
                                } else {
                                    echo "La contraseña no puede contener tu nombre o fracciones";
                                }
                            } else {
                                echo "No hay simbolos dentro de la contraseña";
                            }
                        } else {
                            echo "No hay mayúsculas dentro de la contraseña";
                        }
                    } else {
                        echo "No hay minúsculas dentro de la contraseña";
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

validateSafePassword("1", 'Oliver', 'Erazo', 'Usuario', '01-10-2003');

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
     * Función para validar que sea una letra minuscula
     * 
     */

function letraMinuscula($valor)
{
    //Se revisa si el valor es númerico
    return (ctype_lower($valor));
}

/*
     * Función para validar que sea una letra mayúsucla
     * 
     */

function letraMayuscula($valor)
{
    //Se revisa si el valor es númerico
    return (ctype_upper($valor));
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
                //echo $letra . " Si es: " . $palabraDividida[$coincidencias] . "<br>";
                $coincidencias++;
                //Se revisa si la cantidad de coincidencias para dar por hecho que está incluida
                if ($coincidencias > round((count($palabraDividida) / 3), 0, PHP_ROUND_HALF_DOWN)) {
                    return true;
                    break;
                }
            } else {
                //echo $letra . " No es: " . $palabraDividida[$coincidencias] . "<br>";
                $coincidencias = 0;
            }
        }
    }
    //Si todo está bien retorna un false
    return false;
}


/**
 * 
 * Función para validad que una fecha no esté inmersa dentro de la contraseña
 * 
 */

function validarFecha($clave, $fecha)
{
    //Variable para validar las coincidencias
    $coincidencias = 0;
    //Variable general para revisar la fecha
    $fechaModificada = [];
    //Variable que contendrá la fecha en un solo string
    $fechaTotal = '';
    //Se verifica si la fecha dada contiene guiones como parte del formato
    if (str_contains($fecha, '-')) {
        //Se crea un arreglo separado por los guiones
        $fechaModificada = explode('-', $fecha);
    } else {
        //Se crea un arreglo separado por las plecas
        $fechaModificada = explode('/', $fecha);
    }

    //Se revisa cada caso de la fecha encontrada
    for ($i = 0; $i <= count($fechaModificada); $i++) {
        //Se revisa si ya es el último dato
        if (count($fechaModificada) == $i) {
            //Se revisa la unión de toda la fecha para determinar si está dentro de la fecha
            foreach ($fechaModificada as $trozo) {
                $fechaTotal = $fechaTotal . $trozo;
            }
            //Se revisa si la fecha completa está dentro de la contraseña
            if (str_contains($clave, $fechaTotal)) {
                $coincidencias = $coincidencias + 3;
            }
        } else {
            //Se evalua si una fracción de la fecha está dentro de la contraseña
            if (str_contains($clave, $fechaModificada[$i])) {
                $coincidencias++;
            }
        }

        /**
         * Se revisa la cantidad de coincidencias que se han encontrado
         * Si se han encontrado 2 se da por hecho que al menos una parte 
         * de la fecha está dentro de la fecha
         */

        if ($coincidencias > 1) {
            return true;
            break;
        }
    }
    //Si todo está bien se devuelve false porque no es encontró
    return false;
}
//validarPalabra(['o', 'l', 'i', 'v', 'e', 'r'], "oliveo");

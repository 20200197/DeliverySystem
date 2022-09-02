<?php
/*
*	Clase para validar todos los datos de entrada del lado del servidor.
*   Es clase padre de los modelos porque los datos se validan al momento de asignar valores a las propiedades.
*/
class Validator
{
    // Propiedades para manejar algunas validaciones.
    private $passwordError = null;
    private $fileError = null;
    private $fileName = null;

    /*
    *   Método para obtener el error al validar una contraseña.
    */
    public function getPasswordError()
    {
        return $this->passwordError;
    }

    /*
    *   Método para obtener el nombre del archivo validado previamente.
    */
    public function getFileName()
    {
        return $this->fileName;
    }

    /*
    *   Método para obtener el error al validar un archivo.
    */
    public function getFileError()
    {
        return $this->fileError;
    }

    /*
    *   Método para sanear todos los campos de un formulario (quitar los espacios en blanco al principio y al final).
    *
    *   Parámetros: $fields (arreglo con los campos del formulario).
    *   
    *   Retorno: arreglo con los campos saneados del formulario.
    */
    public function validateForm($fields)
    {
        foreach ($fields as $index => $value) {
            $value = trim($value);
            $fields[$index] = $value;
        }
        return $fields;
    }

    /*
    *   Método para validar un número natural como por ejemplo llave primaria, llave foránea, entre otros.
    *
    *   Parámetros: $value (dato a validar).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validateNaturalNumber($value)
    {
        // Se verifica que el valor sea un número entero mayor o igual a uno.
        if (filter_var($value, FILTER_VALIDATE_INT, array('min_range' => 1))) {
            return true;
        } else {
            return false;
        }
    }

    public function validateDirection($direction)
    {
        if (preg_match('/^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚ#,.\s]{' . 5 . ',' . 250 . '}$/', $direction)) {
            return true;
        } else {
            return false;
        }
    }
    /*
    *   Método para validar un archivo de imagen.
    *
    *   Parámetros: $file (archivo de un formulario), $maxWidth (ancho máximo para la imagen) y $maxHeigth (alto máximo para la imagen).
    *   
    *   Retorno: booleano (true si el archivo es correcto o false en caso contrario).
    */
    public function validateImageFile($file, $maxWidth, $maxHeigth)
    {
        // Se verifica si el archivo existe, de lo contrario se establece el mensaje de error correspondiente.
        if ($file) {
            // Se comprueba si el archivo tiene un tamaño menor o igual a 2MB, de lo contrario se establece el mensaje de error correspondiente.
            if ($file['size'] <= 2097152) {
                // Se obtienen las dimensiones de la imagen y su tipo.
                list($width, $height, $type) = getimagesize($file['tmp_name']);
                // Se verifica si la imagen cumple con las dimensiones máximas, de lo contrario se establece el mensaje de error correspondiente.
                if ($width <= $maxWidth && $height <= $maxHeigth) {
                    // Se comprueba si el tipo de imagen es permitido (2 - JPG y 3 - PNG), de lo contrario se establece el mensaje de error correspondiente.
                    if ($type == 2 || $type == 3) {
                        // Se obtiene la extensión del archivo y se convierte a minúsculas.
                        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                        // Se establece un nombre único para el archivo.
                        $this->fileName = uniqid() . '.' . $extension;
                        return true;
                    } else {
                        $this->fileError = 'El tipo de imagen debe ser jpg o png';
                        return false;
                    }
                } else {
                    $this->fileError = 'La dimensión de la imagen es incorrecta';
                    return false;
                }
            } else {
                $this->fileError = 'El tamaño de la imagen debe ser menor a 2MB';
                return false;
            }
        } else {
            $this->fileError = 'El archivo de la imagen no existe';
            return false;
        }
    }


    /*
    *   Método para validar un correo electrónico.
    *
    *   Parámetros: $value (dato a validar).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validateEmail($value)
    {
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Método para validar un dato booleano.
    *
    *   Parámetros: $value (dato a validar).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validateBoolean($value)
    {
        if ($value == 1 || $value == 0 || $value == true || $value == false) {
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Método para validar una cadena de texto (letras, digitos, espacios en blanco y signos de puntuación).
    *
    *   Parámetros: $value (dato a validar), $minimum (longitud mínima) y $maximum (longitud máxima).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validateString($value, $minimum, $maximum)
    {
        // Se verifica el contenido y la longitud de acuerdo con la base de datos.
        if (preg_match('/^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚ\s\,\;\.\-\/]{' . $minimum . ',' . $maximum . '}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Método para validar un dato alfabético (letras y espacios en blanco).
    *
    *   Parámetros: $value (dato a validar), $minimum (longitud mínima) y $maximum (longitud máxima).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validateAlphabetic($value, $minimum, $maximum)
    {
        // Se verifica el contenido y la longitud de acuerdo con la base de datos.
        if (preg_match('/^[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]{' . $minimum . ',' . $maximum . '}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Método para validar un dato alfanumérico (letras, dígitos y espacios en blanco).
    *
    *   Parámetros: $value (dato a validar), $minimum (longitud mínima) y $maximum (longitud máxima).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validateAlphanumeric($value, $minimum, $maximum)
    {
        // Se verifica el contenido y la longitud de acuerdo con la base de datos.
        if (preg_match('/^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚ\s]{' . $minimum . ',' . $maximum . '}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Método para validar un dato monetario.
    *
    *   Parámetros: $value (dato a validar).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validateMoney($value)
    {
        // Se verifica que el número tenga una parte entera y como máximo dos cifras decimales.
        if (preg_match('/^[0-9]+(?:\.[0-9]{1,2})?$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Método para validar una contraseña.
    *
    *   Parámetros: $value (dato a validar).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validatePassword($value)
    {
        // Se verifica la longitud mínima.
        if (strlen($value) >= 6) {
            // Se verifica la longitud máxima.
            if (strlen($value) <= 72) {
                return true;
            } else {
                $this->passwordError = 'Clave mayor a 72 caracteres';
                return false;
            }
        } else {
            $this->passwordError = 'Clave menor a 6 caracteres';
            return false;
        }
    }

    /*
    *   Método para validar el formato del DUI (Documento Único de Identidad).
    *
    *   Parámetros: $value (dato a validar).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validateDUI($value)
    {
        // Se verifica que el número tenga el formato 00000000-0.
        if (preg_match('/^[0-9]{8}[-][0-9]{1}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    public function validateTypeDui($value)
    {
        // Se verifica que el número tenga el formato 00000000-0.
        if (preg_match('/^[0-9]{8}[-][0-9]{1}$/', $value)) {
            if ('' + '' + '' + '' + '' + '' + '' + '' + '-' + '') {
            }
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Método para validar un número telefónico.
    *
    *   Parámetros: $value (dato a validar).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validatePhone($value)
    {
        // Se verifica que el número tenga el formato 0000-0000 y que inicie con 2, 6 o 7.
        if (preg_match('/^[2,6,7]{1}[0-9]{3}[-][0-9]{4}$/', $value)) {
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Método para validar una fecha.
    *
    *   Parámetros: $value (dato a validar).
    *   
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public function validateDate($value)
    {
        // Se dividen las partes de la fecha y se guardan en un arreglo en el siguiene orden: año, mes y día.
        $date = explode('-', $value);
        if (checkdate($date[1], $date[2], $date[0])) {
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Método para validar la ubicación de un archivo antes de subirlo al servidor.
    *
    *   Parámetros: $file (archivo), $path (ruta del archivo) y $name (nombre del archivo).
    *   
    *   Retorno: booleano (true si el archivo fue subido al servidor o false en caso contrario).
    */
    public function saveFile($file, $path, $name)
    {
        // Se comprueba que la ruta en el servidor exista.
        if (file_exists($path)) {
            // Se verifica que el archivo sea movido al servidor.
            if (move_uploaded_file($file['tmp_name'], $path . $name)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /*
    *   Método para validar la ubicación de un archivo antes de borrarlo del servidor.
    *
    *   Parámetros: $path (ruta del archivo) y $name (nombre del archivo).
    *   
    *   Retorno: booleano (true si el archivo fue borrado del servidor o false en caso contrario).
    */
    public function deleteFile($path, $name)
    {
        // Se verifica que la ruta exista.
        if (file_exists($path)) {
            // Se comprueba que el archivo sea borrado del servidor.
            if (@unlink($path . $name)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /*
    *   Método para validar un archivo PDF.
    *
    *   Parámetros: $file (archivo de un formulario).
    *   
    *   Retorno: booleano (true si el archivo es correcto o false en caso contrario).
    */
    public function validatePDFFile($file)
    {
        // Se verifica si el archivo existe, de lo contrario se establece el mensaje de error correspondiente.
        if ($file) {
            // Se comprueba si el archivo tiene un tamaño menor o igual a 2MB, de lo contrario se establece un número de error.
            if ($file['size'] <= 2097152) {
                // Se verifica el tipo de archivo.
                if (mime_content_type($file['tmp_name']) == 'application/pdf') {
                    // Se obtiene la extensión del archivo y se convierte a minúsculas.
                    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                    // Se establece un nombre único para el archivo.
                    $this->fileName = uniqid() . '.' . $extension;
                    return true;
                } else {
                    $this->fileError = 'El tipo de archivo debe ser PDF';
                    return false;
                }
            } else {
                $this->fileError = 'El tamaño del archivo debe ser menor a 2MB';
                return false;
            }
        } else {
            $this->fileError = 'El archivo no existe';
            return false;
        }
    }

    /**
     * Función para validar que sea un número
     * 
     */

    public function numero($valor)
    {
        //Se revisa si el valor es númerico
        return (is_numeric($valor));
    }

    /*
     * Función para validar que sea una letra minuscula
     * 
     */

    public function letraMinuscula($valor)
    {
        //Se revisa si el valor es númerico
        return (ctype_lower($valor));
    }

    /*
     * Función para validar que sea una letra mayúsucla
     * 
     */

    public function letraMayuscula($valor)
    {
        //Se revisa si el valor es númerico
        return (ctype_upper($valor));
    }

    /**
     * Función para validar que existan simbolos
     */

    public function simbolo($valor)
    {
        //Se revisa si el valor es númerico
        return (ctype_punct($valor));
    }


    /**
     * Función para validar que no contenga datos peligrosos para el sistema
     */

    public function prohibido($valor)
    {
        //Sr revisa si contiene valores problematicos
        if (str_contains($valor, "'") || str_contains($valor, '"')) {

            return $valor;
        }
    }


    /**
     * Función para valiar que un nombre o apellido sean parte de la clave
     */

    public function validarPalabra($arreglo, $palabra)
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

    public function validarFecha($clave, $fecha)
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

    public function validateSafePassword(
        $clave,
        $nombre,
        $apellido,
        $usuario,
        $fecha
    ) {
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
                                    if (!$this->validarPalabra($arregloPass, $nombre)) {
                                        //Se revisa que la contraseña no contenga el apellido dentro de ella
                                        if (!$this->validarPalabra($arregloPass, $apellido)) {
                                            //Se revisa que la contraseña no contenga el nombre de usuario dentro de ella
                                            if (!$this->validarPalabra($arregloPass, $usuario)) {
                                                //Se revisa que la contraseña no contenga la fecha o una referencia de ella
                                                if (!$this->validarFecha($clave, $fecha)) {
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

}

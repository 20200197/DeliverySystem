/**
 * Archivo para las validaciones en FRONTEND
 */

/**
 * Función que admite solo números (Dinero y cantidades)
 *
 *  Esto incluye:
 *  - Números
 *  - punto
 *  - Eliminar
 *
 */
function validarcantidad(event, id) {
    //Se obtiene el codigo ASCII de la tecla
    key = event.keyCode;
    //se obtiene el compoente
    ingresar = document.getElementById(id);
    //Se almacena
    teclado = String.fromCharCode(key);
    // Valores permitidos
    valores = "0123456789";
    //Se sanea el campo
    ingresar.value = ingresar.value.replace(/^(0+)/g, "");
    //Se revisa si las tecla escrita se puede escribir
    if (valores.indexOf(teclado) == -1) {
        return false;
    } 
    
}

/**
 * Función que permite validad porcentajes
 */

function validadPorcentajes(event, id) {
    //Se obtiene el codigo ASCII de la tecla
    key = event.keyCode;
    //Se almacena
    teclado = String.fromCharCode(key);
    //Se obtiene toda la cadena de texto
    ingresar = document.getElementById(id);
    // Valores permitidos
    valores = "0123456789.";
    //Se revisa si las tecla escrita se puede escribir
    if (ingresar.value.length == 0 && teclado == ".") {
        return false;
    } else if (ingresar.value.length > 1 && teclado != ".") {
        if (ingresar.value.includes(".") && teclado == ".") {
            return false;
        } else if (ingresar.value.includes(".")) {
            if (ingresar.value.indexOf(".") + 2 < ingresar.value.length) {
                return false;
            }
        }
    } else if (valores.indexOf(teclado) == -1) {
        return false;
    } else if (ingresar.value.length > 5) {
        return false;
    }
}

/**
 * Función que admite solo números y algunos caracteres
 *
 *  Esto incluye:
 *  - Números
 *  - punto
 *  - guión
 *  - Eliminar
 *
 */
function soloNumerosC(event) {
    //Se obtiene el codigo ASCII de la tecla
    key = event.keyCode;
    //Se almacena
    teclado = String.fromCharCode(key);
    // Valores permitidos
    valores = "0123456789.-";
    //Se revisa si las tecla escrita se puede escribir
    if (valores.indexOf(teclado) == -1) {
        return false;
    }
}

/**
 * Función que admite para el DUI
 *
 *  Esto incluye:
 *  - Números
 *  - guión
 *  - Eliminar
 *
 */
function verificarDUI(event, id) {
    //Se obtiene el codigo ASCII de la tecla
    key = event.keyCode;
    //Se almacena
    teclado = String.fromCharCode(key);
    //Se obtiene toda la cadena de texto
    ingresar = document.getElementById(id);
    // Valores permitidos
    valores = "0123456789";
    //Se revisa si las tecla escrita se puede escribir
    if (ingresar.value.includes("-") && teclado == "-") {
        return false;
    } else if (ingresar.value.length < 8 && teclado == "-") {
        return false;
    } else if (ingresar.value.length == 8) {
        ingresar.value = ingresar.value + "-";
    } else if (valores.indexOf(teclado) == -1) {
        return false;
    } else if (ingresar.value.length > 9) {
        return false;
    }
}

/**
 *
 */

/**
 * Función para validar cantidades de dinero
 *
 * Esto incluye
 * - Números naturales
 * - Únicamente un punto (No obligatorio)
 */

function verificarDinero(event, id) {
    //Se obtiene el codigo ASCII de la tecla
    key = event.keyCode;
    //Se almacena
    teclado = String.fromCharCode(key);
    //Se obtiene toda la cadena de texto
    ingresar = document.getElementById(id);
    // Valores permitidos
    valores = "0123456789.";
    //Se revisa si las tecla escrita se puede escribir
    if (ingresar.value.length == 0 && teclado == ".") {
        return false;
    } else if (ingresar.value.includes(".") && teclado == ".") {
        return false;
    } else if (ingresar.value.includes(".")) {
        if (ingresar.value.indexOf(".") + 2 < ingresar.value.length) {
            return false;
        }
    } else if (valores.indexOf(teclado) == -1) {
        return false;
    } else if (ingresar.value.length > 8) {
        return false;
    }
}

/**
 * Función que admite solo letras
 *
 *  Esto incluye:
 *  - Mayúsculas
 *  - Minúsculas
 *  - Eliminar
 *  - Espacio en blanco
 *
 */
function soloLetras(event) {
    //Se obtiene el codigo ASCII de la tecla
    key = event.keyCode;
    //Se almacena
    teclado = String.fromCharCode(key);
    // Valores permitidos
    valores = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ,.¡!¿? ";
    // Si se permiten o no las teclas de control
    //Se revisa si las tecla escrita se puede escribir
    if (valores.indexOf(teclado) == -1) {
        return false;
    }
}

/**
 * Función que admite solo letras, número y ciertos carácteres
 *
 *  Esto incluye:
 *  - Mayúsculas
 *  - Minúsculas
 *  - números
 *  - guión
 *  - punto
 *  - Eliminar
 *  - Espacio en blanco
 *
 */
function letras_numeros(event) {
    //Se obtiene el codigo ASCII de la tecla
    key = event.keyCode;
    //Se almacena
    teclado = String.fromCharCode(key);
    // Valores permitidos
    valores = "1234567890abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ-_.áéíóúÁÉÍÓÚ, ¡!¿?";
    // Teclas de control en codigo ASCII
    especiales = "8-32-44-45-46";
    //Se revisa si las tecla escrita se puede escribir
    if (valores.indexOf(teclado) == -1) {
        return false;
    }
}

/**
 * Función que admite solo caracteres para usos multiples
 *
 *  Esto incluye:
 * - Números enteros
 * - Mayúsculas
 * - Minúsculas
 * - Eliminar
 * - coma "," y punto "."
 * - Signo de grado "°"
 * - Numeral "#"
 * - guión y guión bajo
 * - Espacios
 */
function revisarTexto(event) {
    //Se obtiene el codigo ASCII de la tecla
    key = event.keyCode;
    //Se almacena
    teclado = String.fromCharCode(key);
    // Valores permitidos
    valores =
        '1234567890abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ áéíóúÁÉÍÓÚ,./-_.,;:@';
    // Teclas de control en codigo ASCII (Sin funcionar)
    especiales = "8-32-44-45-46-35-248-95";
    // Si se permiten o no las teclas de control
    permitido = false;
    //Se revisa si la tecla es parte de las especiales
    for (var i in especiales) {
        if (key == especiales[i]) {
            permitido = true;
        }
    }
    //Se revisa si las tecla escrita se puede escribir
    if (valores.indexOf(teclado) == -1 && !permitido) {
        return false;
    }
}

/**
 * Función para validar número de teléfono
 *
 *  Se permitirán:
 *  - Digitos
 *  - guión
 *
 */
function verificarTel(event, id) {
    //Se obtiene el codigo ASCII de la tecla
    key = event.keyCode;
    //Se almacena
    teclado = String.fromCharCode(key);
    //Se obtiene toda la cadena de texto
    ingresar = document.getElementById(id);
    // Valores permitidos
    valores = "0123456789";
    //Se revisa si las tecla escrita se puede escribir
    if (ingresar.value.length == 4) {
        ingresar.value = ingresar.value + "-";
    } else if (ingresar.value.length > 8) {
        return false;
    } else if (valores.indexOf(teclado) == -1) {
        return false;
    }
}

/**
 * Función para validar un correo eléctronico
 *
 * Se tratará de devolver si está correcto o no
 */

function verificarEmail(id) {
    //Se obtiene el componente a evaluar
     campo = document.getElementById(id);
    //Parametros
     emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
     //Se muestra un texto a modo de ejemplo, luego va a ser un icono
     if (emailRegex.test(campo.value)) {
         return true;
     } else {
         return false;
     }
}

//Se crea la constante de la ruta de la API
const API_RECUPERACION = SERVER + "dashboard/recuperar_clave.php?action=";

//Método que se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
    //Se procede a esconder los trozos de vista
    document.getElementById("usuarioRecuperacion").style.display = "";
    document.getElementById("correoRecuperacion").style.display = "none";
    document.getElementById("codigoRecuperacion").style.display = "none";
    document.getElementById("claveRecuperacion").style.display = "none";

});

//Se crea el método para enviar la petición de de petición de correo
document.getElementById("formularioUsuario").addEventListener("submit", function (event) {
    //Se evita la recarga de la página
    event.preventDefault();
    //Se realiza la petición para validar el usuario
    fetch(API_RECUPERACION + "solicitarCambio", {
        method: "post",
        body: new FormData(document.getElementById("formularioUsuario")),
    }).then(function (request) {
        //Se revisa el estado de la ejecución
        if (request.ok) {
            //Se pasa a JSON
            request.json().then(function (response) {
                //Se revisa el estado devuelto por la API
                if (response.status) {
                    //Se cambia de menú
                    document.getElementById("usuarioRecuperacion").style.display = "none";
                    document.getElementById("correoRecuperacion").style.display = "";
                    document.getElementById("codigoRecuperacion").style.display = "none";
                    document.getElementById("claveRecuperacion").style.display = "none";
                    document.getElementById("mensajeCorreo").innerHTML = "Completa el correo mostrado a continuación enlazado a tu cuenta <br> " +
                        response.dataset;
                    sweetAlert(1, response.message, null);
                } else {
                    //Se notifica del error
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            //Se imprime el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
});


//Método para validar que el correo proporcionado sea el correcto
document.getElementById("formularioCorreo").addEventListener('submit', function (event) {
    //Se previene la recarga de la página
    event.preventDefault();
    //Se verifica que el correo ingresado sea un correo valido
    if (verificarEmail('correo')) {
        //Se realiza la petición para validar el correo y si es correcto enviar el correo de recuperación
        fetch(API_RECUPERACION + "validarCorreo", {
            method: "post",
            body: new FormData(document.getElementById("formularioCorreo")),
        }).then(function (request) {
            //Se verifica el estado de la ejecución
            if (request.ok) {
                //Se pasa a JSON
                request.json().then(function (response) {
                    //Se verifica el estado devuelto por la API
                    if (response.status) {
                        //Se muestran y escoden los formularios
                        document.getElementById("usuarioRecuperacion").style.display = "none";
                        document.getElementById("correoRecuperacion").style.display = "none";
                        document.getElementById("codigoRecuperacion").style.display = "";
                        document.getElementById("claveRecuperacion").style.display = "none";

                        //Se enviar el correo
                        recuperar(response.dataset.correo_admin, response.dataset.nombre_admin, response.token);
                    } else {
                        //Se muestra el problema
                        sweetAlert(2, response.exception, null);
                    }
                })
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });
    } else {
        sweetAlert(3, 'El correo ingresado no es valido', null);
    }

});

//Función para reenviar el código
function reenviar() {
    //Se realiza la petición a la API
    fetch(API_RECUPERACION + 'reenvio', {
        method: 'get',
    }).then(function (request) {
        //Se verifica el resultado de la ejecución
        if (request.ok) {
            //Se pasa a JSON
            request.json().then(function (response) {
                //Se verifica el estado devuelto por la API
                if (response.status) {
                    //Se enviar el correo
                    recuperar(response.dataset.correo_admin, response.dataset.nombre_admin, response.token);
                } else {
                    //Se muestra el error
                    sweetAlert(2, response.exception, null);
                }
            })
        } else {
            //Se imprime el problema en la consola
            console.log(request.status + ' ' + request.statusText);
        }
    })
}

//Método para verificar que el código es correcto
document.getElementById('formularioCodigo').addEventListener('submit', function (event) {
    //Se previene la recarga automática de la página
    event.preventDefault();
    //Se realiza la petición para verificar el código
    fetch(API_RECUPERACION + 'validarCodigo', {
        method: 'post',
        body: new FormData(document.getElementById('formularioCodigo')),
    }).then(function (request) {
        //Se revisa el estado de la ejecución
        if (request.ok) {
            //Se procede a pasar la respuesta a json
            request.json().then(function (response) {
                //Se verifica el estado devuelto por la API
                if (response.status) {
                    sweetAlert(1, response.message, null);
                    document.getElementById("usuarioRecuperacion").style.display = "none";
                    document.getElementById("correoRecuperacion").style.display = "none";
                    document.getElementById("codigoRecuperacion").style.display = "none";
                    document.getElementById("claveRecuperacion").style.display = "";
                } else {
                    //Se muestra el error al usuario
                    sweetAlert(2, response.exception, null);
                }
            })
        } else {
            //Se muestar el problema en la consola
            console.log(request.status + ' ' + request.statusText);
        }
    })
})

//Método para reestablecer la contraseña
document.getElementById('formularioClave').addEventListener('submit', function (event) {
    //Se previene la recarga por defecto
    event.preventDefault();
    //Se realiza una verificación sencilla de la contraseña antes de cambiarla
    if (checkPass(document.getElementById('clave').value, document.getElementById('clave1').value)) {
        //Se realiza la petición para verificar los datos y el cambio de contraseña
        fetch(API_RECUPERACION + 'cambiarPass', {
            method: 'post',
            body: new FormData(document.getElementById('formularioClave')),
        }).then(function (request) {
            //Se verifica el estado de la ejecución
            if (request.ok) {
                //Se pasa a formato JSON
                request.json().then(function (response) {
                    //Se verifica el estado devuelto por la API
                    if (response.status) {
                        //Se muestra la confirmación y se redirecciona al login
                        sweetAlert(1, response.message, 'index.html');
                    } else {
                        //Se muestra el problema
                        sweetAlert(2, response.exception, null);
                    }
                })
            } else {
                //Se imprime el error en la consola
                console.log(request.status + ' ' + request.statusText);
            }
        })
    }
})

//Función para regresar de correo a usuarios
function correoUsuarios() {
    //Se escoden y muestran los formularios según sea necesario
    document.getElementById("usuarioRecuperacion").style.display = "";
    document.getElementById("correoRecuperacion").style.display = "none";
    document.getElementById("codigoRecuperacion").style.display = "none";
    document.getElementById("claveRecuperacion").style.display = "none";
    //Se limpian los formularios
    resetForm();
}

//Función para regresar de código a correo
function codigoCorreo() {
    //Se escoden y muestran los formularios según sea necesario
    document.getElementById("usuarioRecuperacion").style.display = "none";
    document.getElementById("correoRecuperacion").style.display = "";
    document.getElementById("codigoRecuperacion").style.display = "none";
    document.getElementById("claveRecuperacion").style.display = "none";
    //Se limpian los formularios
    resetForm();
}

//Función para regresar de clave a código

function claveCodigo() {
    //Se escoden y muestran los formularios según sea necesario
    document.getElementById("usuarioRecuperacion").style.display = "none";
    document.getElementById("correoRecuperacion").style.display = "none";
    document.getElementById("codigoRecuperacion").style.display = "";
    document.getElementById("claveRecuperacion").style.display = "none";
    //Se limpian los formularios
    resetForm();
}

//Función para reestablecer todos los formularios
function resetForm() {
    document.getElementById('formularioUsuario').reset();
    document.getElementById('formularioCorreo').reset();
    document.getElementById('formularioCodigo').reset();
    document.getElementById('formularioClave').reset();
}

//Función para verificar la clave
function checkPass(clave, claveConfirmacion) {
    //Expresión regular para validar la contraseña
    var myregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    //Se revisa que ambas contraseñas sean iguales
    if (clave != claveConfirmacion) {
        sweetAlert(3, 'Las contraseñas no son iguales', null);
        return false;
    } else if (myregex.test(clave)) {
        return true;
    } else {
        sweetAlert(3, 'La contraseña debe contener números, carácteres alfanúmericos, símbolos y ser mayor a 7 carácteres', null);
        return false;
    }
}

/**
 * Función para cambiar la visibilidad de los inputs
 * 
 * idComponente = identificador del input
 * idIcono = identificador de la etiqueta i del icono
 */
function mostrarPass(idComponente, idIcono) {
    //Se obtiene los componentes
    let componente = document.getElementById(idComponente);
    let icono = document.getElementById(idIcono);

    //Se revisa el tipo de campo
    if (componente.type == "password") {
        //Se cambia a texto para ver la clave
        componente.type = "text";
        icono.innerHTML = 'visibility';

    } else {
        //Se cambia a password para que no sea visible
        componente.type = "password";
        icono.innerHTML = 'visibility_off';
    }
}
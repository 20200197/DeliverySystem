//Se crea la constante de la ruta de la API
const API_RECUPERACION = SERVER + "dashboard/recuperar_clave.php?action=";

//Método que se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
    //Se procede a esconder los trozos de vista
    document.getElementById("usuario").style.display = "";
    document.getElementById("correo").style.display = "none";
    document.getElementById("codigo").style.display = "none";
    document.getElementById("clave").style.display = "none";
    
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
                    document.getElementById("usuario").style.display = "none";
                    document.getElementById("correo").style.display = "";
                    document.getElementById("codigo").style.display = "none";
                    document.getElementById("clave").style.display = "none";
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
                    document.getElementById("usuario").style.display = "none";
                    document.getElementById("correo").style.display = "none";
                    document.getElementById("codigo").style.display = "";
                    document.getElementById("clave").style.display = "none";

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
});

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
                    document.getElementById("usuario").style.display = "none";
                    document.getElementById("correo").style.display = "none";
                    document.getElementById("codigo").style.display = "none";
                    document.getElementById("clave").style.display = "";
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
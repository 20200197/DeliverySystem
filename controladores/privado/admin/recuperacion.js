//Se crea la constante de la ruta de la API
const API_RECUPERACION = SERVER + 'dashboard/recuperar_clave.php?action=';

//Método que se ejecuta cuando se carga la página
document.addEventListener('DOMContentLoaded', function () { 
    //Se procede a esconder los trozos de vista
    document.getElementById("usuario");
})


//Se crea el método para enviar la petición de de petición de correo
document.getElementById("formularioUsuario").addEventListener('submit', function (event) { 
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

                } else { 
                    //Se notifica del error
                    sweetAlert(2, response.exception, null);
                }
            })
        } else { 
            //Se imprime el error en la consola
            console.log(request.status + ' ' + request.statusText);
        }
    });
});
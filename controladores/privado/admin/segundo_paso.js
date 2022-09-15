//Se crea una constante de la API
const API_ADMIN = SERVER + "dashboard/administrar_admin.php?action=";

//Método que se ejecutá cuando carga la página
document.addEventListener('DOMContentLoaded', function () { 
    //Se realiza la consulta para verificar si se puede realizar o no
    fetch(API_ADMIN + "verificacionSegundoPaso", {
        method: 'get',
    }).then(function (request) { 
        //Se verifica el estado de la ejecución
        if (request.ok) {
            //Se pasa a JSON
            request.json().then(function (response) { 
                //Se verifica el estado devuelto por la API
                if (response.status) {
                    sweetAlert(3, response.message, null);
                } else {
                    //Se muestra el mensaje de error
                    sweetAlert(2, response.exception, "index.html");
                }
            })
        } else { 
            //Se muestra el problema en la consola
            console.log(request.status + ' ' + request.statusText);
        }
    });
})

//Método para validar que el código ingresado es valido
document.getElementById("formularioAutentificacion").addEventListener('submit', function (event) { 
    //Se previene la recarga de la página
    event.preventDefault();
    //Se procede a realizar la petición
    fetch(API_ADMIN + "segundoPaso", {
        method: "post",
        body: new FormData(document.getElementById("formularioAutentificacion")),
    }).then(function (request) {
        //Se verifica el estado de la ejecución
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function (response) {
                //Se revisa el estado devuelto por la API
                if (response.status) {
                    sweetAlert(1, response.message, "estadistica.html");
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            //Se escribe en consola
            console.log(request.status + " " + request.statusText);
        }
    });
});
//Se crea la ruta de la API
const API_AUTENTIFICADOR = SERVER + 'dashboard/administrar_admin.php?action=';

//Se crea un método cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    //Se realiza la peticion
    fetch(API_AUTENTIFICADOR + 'generarCodigo', {
        method: 'get',
    }).then(function (request) {
        //Se revisa el estado de la ejecución
        if (request.ok) {
            //Se pasa a json
            request.json().then(function (response) {
                //Se revisa el estado devuelto por la api
                if (response.status) {
                    //Se coloca el código qr
                    document.getElementById('qr').src = response.dataset;
                    //Se muestra el mensaje
                    sweetAlert(1, response.message, null);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            })
        } else {
            console.log(request.status + ' ' + request.statusText)
        }
    })
});

//método para revisar el código ingresado
document.getElementById('autentificacion').addEventListener('submit', function (event) { 
    //Se previene la autorecarga
    event.preventDefault();
    //Se realiza la peticion
    fetch(API_AUTENTIFICADOR + 'verificarCodigo', {
        method: 'post',
        body: new FormData(document.getElementById('autentificacion'))
    }).then(function (request) {
        //Se revisa el estado de la ejecución
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function (response) {
                //Se verifica el estado devuelto por la api
                if (response.status) {
                    //Se muestra el mensaje
                    sweetAlert(1, response.message, null);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            })
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}) 

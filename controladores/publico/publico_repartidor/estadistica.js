//Se crea la ruta a la API
const API_ESTADISTICA = SERVER + 'publico/estadistica_repartidor.php?action=';

//Método que se ejecutará cuando se cargue la página
document.addEventListener('DOMContentLoaded', function () {
    datos = new FormData();
    datos.append("departamentos", [1, 5, 3]);
    fetch(API_ESTADISTICA + "TopClientes", {
        method: "post",
        body: datos,
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) { 
                if (response.status) { 
                    
                }
            })
        } else { 
            console.log(request.status + ' ' + request.statusText);
        }
    });
})
// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_MAPA = SERVER + 'dashboard/administrar_mapa.php?action=';


//Obtenemos el id donde ira el mapa
var x = document.getElementById("mapa");


//Función para obtener la localización 
function getLocation() {
    if (navigator.geolocation) {
        //Obtenemos posición actual y la mostramos con la función showposition
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocalización no está permitido en este navegador.";
    }
}




//Función para obtener la posición en latitud y longitud
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

}

//Se asigna donde ira el mapa en una variable
var map = L.map('mapa').
    setView([13.6992804, -89.105744],
        14);

//Se crea una instancia de objetos de capa de teselas dada una plantilla de url 
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);

//Creamos una escala de control
L.control.scale().addTo(map);

//Obtenemos la posición actual
navigator.geolocation.getCurrentPosition(function (position) {
    //Guardamos la latitud y longitud en variables
    var la = position.coords.latitude;
    var lo = position.coords.longitude;
    //Colocamos marcador según la longitud y latitud obtenida
    marcador = L.marker([la, lo], { draggable: false }).addTo(map);
    //Colocamos marcador en la segunda posición
    L.marker([13.6992804, -89.105744], { draggable: false }).addTo(map);
    //Establecemos la vista en escala 14
    map.setView([la, lo], 14)

    //Guardamos la ruta de las dos posiciones
    var ruta = L.Routing.control({
        waypoints: [
            L.latLng(la, lo),
            L.latLng(13.6992804, -89.105744)
        ],
        //Instrucciones en español
        language: 'es',
        //No se pueden crear nuevos puntos
        addWaypoints: false,
        //No se pueden arrastrar los puntos
        draggableWaypoints: false
        //Se agrega al mapa
    }).addTo(map);

    //Obtenemos datos de la ruta
    ruta.on('routesfound', function (e) {
        var routes = e.routes;
        var summary = routes[0].summary;
        // alert tiempo y distancia en km y minutos
        alert('Distancia total ' + summary.totalDistance / 1000 + ' km y tiempo ' + Math.round(summary.totalTime % 3600 / 60) + ' minutos');
    });





    var lat1 = la;
    var long1 = lo;
    var lat2 = 13.6992804;
    var long2 = -89.105744;
    function Dist(lat1, long1, lat2, long2) {
        rad = function (x) {
            return x * Math.PI / 180;
        }

        var R = 6378.137;//Radio de la tierra en km
        var dLat = rad(lat2 - lat1);
        var dLong = rad(long2 - long1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d.toFixed(3);//Retorna tres decimales
    }
    Distancia = Dist(lat1, long2, lat2, long1);//Retorna numero en Km
    alert(Distancia);

    // Método manejador de eventos que se ejecuta cuando el documento ha cargado.
    document.addEventListener('DOMContentLoaded', function () {
        updateCoordenadasCliente();

    });

    function updateCoordenadasCliente() {
        // Se define un objeto con los datos del registro seleccionado.
        const data = new FormData();
        //Asignamos las coordenadas la y lo en la llave coordenadas
        data.append('coordenadasCliente', la + ',' + ' ' + lo);
        console.log('Coordenads' +la + ',' + ' ' + lo);

        fetch(API_MAPA + 'updateCoordenadasCliente', {
            method: 'post',
            body: data
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        sweetAlert(1, response.message, null);
                    } else {
                        sweetAlert(2, response.exception, null);
                    }
                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });
    }
});



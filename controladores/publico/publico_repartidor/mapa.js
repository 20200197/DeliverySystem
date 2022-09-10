//Se crea la constante de la api
const API_PAQUETES = SERVER + "publico/paquetes_pendientes.php?action=";

document.addEventListener("DOMContentLoaded", function () {



    getLocation();


});

// Se busca en la URL las variables (parámetros) disponibles.
let params = new URLSearchParams(location.search);
// Se obtienen los datos localizados por medio de las variables.
const LATITUDE = params.get("latitude");
const LONGITUD = params.get("longitud");

//Función para obtener la localización 
function getLocation() {
    if (navigator.geolocation) {
        //Obtenemos posición actual y la mostramos con la función showposition
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocalización no está permitido en este navegador.";
    }
}

const onErrorDeUbicacion = err => {
    console.log("Error obteniendo ubicación: ", err);
}

const opcionesDeSolicitud = {
    enableHighAccuracy: true, // Alta precisión
    //maximumAge: 0, // No queremos caché
    timeout: 5000 // Esperar solo 5 segundos
};


function showPosition(position) {
    var latitudeAc = position.coords.latitude;
    var longitudeAc = position.coords.longitude;

    var mapa = new ol.Map({
        target: 'mapa',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([LONGITUD, LATITUDE]),
            zoom: 8
        })
    });

    //Marcador de reparto
    let marcador = new ol.Feature({
        geometry: new ol.geom.Point(//lo y la
            ol.proj.fromLonLat([LONGITUD, LATITUDE])// En dónde se va a ubicar
        ),
    });

    marcador.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            src: "../../../recursos/img/cajaki.png",

        })
    }));




    // marcadores debe ser un arreglo
    const marcadores = []; // Arreglo para que se puedan agregar otros más tarde

    marcadores.push(marcador);// Agregamos el marcador al arreglo





    //Marcador de repartidor
    let marcadorAc = new ol.Feature({
        geometry: new ol.geom.Point(//lo y la
            ol.proj.fromLonLat([longitudeAc, latitudeAc])// En dónde se va a ubicar
        ),
    });

    marcadorAc.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            src: "../../../recursos/img/posi.png",

        })
    }));

    marcadores.push(marcadorAc);

    console.log(longitudeAc, latitudeAc);

    let capa = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: marcadores, // A la capa le ponemos los marcadores
        }),
    });


    // Y agregamos la capa al mapa
    mapa.addLayer(capa);

    //Poup up de repartidor
    var popupRe = new ol.Overlay.Popup();
    mapa.addOverlay(popupRe);

     //Pop up de reparto
     var popup = new ol.Overlay.Popup();
     mapa.addOverlay(popup);

    mapa.on('singleclick', function (evt) {

        var coordenadaRe = ol.proj.fromLonLat([longitudeAc, latitudeAc]);
        popupRe.show(coordenadaRe, 'Usted esta aqui');
        var coordenada = ol.proj.fromLonLat([LONGITUD, LATITUDE]);
        popup.show(coordenada, 'Su destino');
    });

   

    
}
function mapa(latitude, longitud) {


}





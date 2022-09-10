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

    var vectorSource = new ol.source.Vector(),
        url_osrm_nearest = '//router.project-osrm.org/nearest/v1/driving/',
        url_osrm_route = '//router.project-osrm.org/route/v1/driving/',
        icon_url = '//cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png',
        vectorLayer = new ol.layer.Vector({
            source: vectorSource
        }),
        styles = {
            route: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 6, color: [6, 60, 200, 0.8]
                })
            }),
            icon: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: '../../../recursos/img/cajaki.png'
                })
            })
        };


    var mapa = new ol.Map({
        target: 'mapa',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([LONGITUD, LATITUDE]),
            zoom: 8
        })
    });



    //Marcador de reparto
    /**let marcador = new ol.Feature({
        geometry: new ol.geom.Point(//lo y la
            ol.proj.fromLonLat([LONGITUD, LATITUDE])// En dónde se va a ubicar
        ),
    });**/



    /**  marcador.setStyle(new ol.style.Style({
         image: new ol.style.Icon({
             src: "../../../recursos/img/cajaki.png",
 
         })
     }));
 **/



    // marcadores debe ser un arreglo
    const marcadores = []; // Arreglo para que se puedan agregar otros más tarde

    /**  marcadores.push(marcador);// Agregamos el marcador al arreglo*/





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
    var coordenadaInicio = ol.proj.fromLonLat([longitudeAc, latitudeAc]);
    var coordenadaFinal = ol.proj.fromLonLat([LONGITUD, LATITUDE]);



    var utils = {
        getNearest: function (coord) {

            var coord4326 = utils.to4326(coord);
            return new Promise(function (resolve, reject) {
                //Comprobar que este en el mapa
                fetch('//router.project-osrm.org/nearest/v1/driving/' + coord4326.join()).then(function (response) {
                    // Formato Json
                    return response.json();
                }).then(function (json) {
                    if (json.code === 'Ok') resolve(json.waypoints[0].location);
                    else reject();
                });
            });
        },
        createFeature: function (coord) {
            var feature = new ol.Feature({
                type: 'place',
                geometry: new ol.geom.Point(ol.proj.fromLonLat(coord))
            });
            feature.setStyle(styles.icon);
            vectorSource.addFeature(feature);
        },
        createRoute: function (polyline) {

            var route = new ol.format.Polyline({
                factor: 1e5
            }).readGeometry(polyline, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            var feature = new ol.Feature({
                type: 'route',
                geometry: route
            });
            feature.setStyle(styles.route);
            vectorSource.addFeature(feature);
        }, to4326: function (coord) {
            return ol.proj.transform([
                parseFloat(coord[0]), parseFloat(coord[1])
            ], 'EPSG:3857', 'EPSG:4326');
        }

    };




    function locate() {
        const coordinates = [longitudeAc, latitudeAc];

        var my_lati = latitudeAc;
        var my_longi = longitudeAc;
        var lati = LATITUDE;
        var longi = LONGITUD;

        utils.getNearest([my_longi, my_lati]);
        utils.getNearest([longi, lati]);
        utils.createFeature([longi, lati]);
        var point1 = [my_longi, my_lati];
        var point2 = [longi, lati];
        fetch(url_osrm_route + point1 + ';' + point2).then(function (r) {
            return r.json();
        }).then(function (json) {
            if (json.code !== 'Ok') {
                return;
            }
            utils.createRoute(json.routes[0].geometry);
        });

    }
   locate();
    var lat1 = latitudeAc;
    var long1 = longitudeAc;
    var lat2 = LATITUDE;
    var long2 = LONGITUD;
    //Distancia aproximanda en km
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
        d  = d + 30;//Solo para llegar mas exacto
        return d.toFixed(3);//Retorna tres decimales
    }
    Distancia = Dist(lat1, long2, lat2, long1);//Retorna numero en Km
    document.getElementById("con").innerHTML = Distancia+'km';
}
function mapa(latitude, longitud) {


}





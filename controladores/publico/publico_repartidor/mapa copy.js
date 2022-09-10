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
            }),
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
   
    var points = [],
        msg_el = document.getElementById('msg'),
        url_osrm_nearest = '//router.project-osrm.org/nearest/v1/driving/',
        url_osrm_route = '//router.project-osrm.org/route/v1/driving/',
        icon_url = '//cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png',
        vectorSource = new ol.source.Vector(),
        vectorLayer = new ol.layer.Vector({
            source: vectorSource
        }),

        styles = {
            route: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 6, color: [40, 40, 40, 0.8]
                })
            }),
            icon: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: '../../../recursos/img/posi.png'
                })
            })
        };

    mapa.on('click', function (evt) {
        utils.getNearest(evt.coordinate).then(function (coord_street) {
            var last_point = points[points.length - 1];
            var points_length = points.push(coord_street);

            utils.createFeature(coord_street);

            if (points_length < 2) {
                msg_el.innerHTML = 'Click to add another point';
                return;
            }

            //get the route
            var point1 = last_point.join();
            var point2 = coord_street.join();

            fetch(url_osrm_route + point1 + ';' + point2).then(function (r) {
                return r.json();
            }).then(function (json) {
                if (json.code !== 'Ok') {
                    msg_el.innerHTML = 'No route found.';
                    return;
                }
                msg_el.innerHTML = 'Route added';
                //points.length = 0;
                utils.createRoute(json.routes[0].geometry);
            });
        });
    });

    var utils = {
        getNearest: function (coord) {
            var coord4326 = utils.to4326(coord);
            return new Promise(function (resolve, reject) {
                //make sure the coord is on street
                fetch('//router.project-osrm.org/nearest/v1/driving/' + coord4326.join()).then(function (response) {
                    // Convert to JSON
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
            // route is ol.geom.LineString
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
        },
        to4326: function (coord) {
            return ol.proj.transform([
                parseFloat(coord[0]), parseFloat(coord[1])
            ], 'EPSG:3857', 'EPSG:4326');
        }
    };

}
function mapa(latitude, longitud) {


}





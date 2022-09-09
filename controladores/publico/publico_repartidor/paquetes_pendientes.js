//Se crea la constante de la api
const API_PAQUETES = SERVER + "publico/paquetes_pendientes.php?action=";

//Método que carga los datos cuando se inicia la página
document.addEventListener("DOMContentLoaded", function () {
    //Se cargan los datos en la vista
    readRows(API_PAQUETES);
});

function fillTable(dataset) {
    let content = [];
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
        <tr>
            <td data-target="Nombre del cliente:">
            ${row.nombre}
            </td>
            <td data-target="Contacto: ">
                <div class="row">
                <div class="col s12">
                    <i class="material-icons blue-text text-accent-2">local_phone</i>
                    <span>${row.telefono_cliente}</span>
                </div>
                 <div class="col s12">
                    <i class="material-icons blue-text text-accent-2">email</i>
                    <span>${row.correo_cliente}</span>
                  </div>
                </div>
            </td>
            
            <td data-target="Dirección y punto de referencia: ">
            <div class="row ">
            <div class="col s12 offset-s1">
            <i class="material-icons blue-text text-accent-2 tooltipped" data-position="right" data-tooltip="Dirección">location_on</i>
            <span>${row.descripcion_direccion}</span>
            </div>
        <div class="col s12 offset-s1">
            <i class="material-icons blue-text text-accent-2 tooltipped" data-position="right" data-tooltip="Punto de referencia">map</i>
            <span>${row.punto_referencia}</span>
        </div>
        </div>
            </td>
            <td data-target="Productos: "> <a href="#modal_info" class="waves-effect waves-light modal-trigger" onClick="cargar_productos(${row.id_factura})"><i class="material-icons blue-text text-accent-2 center-align">remove_red_eye</i></a></td>
            <td data-target="Total: ">$${row.total}</td>

            <td data-target="Opciones: ">
           <a class="btn blue accent-2" onclick="openMapa(${row.id_cliente})"><i class="material-icons">map</i></a>
                <a class="btn ${row.id_status == 3 ? 'green accent-4' : row.id_status == 4 ? 'grey lighten-1' : ' blue accent-2'} tooltipped" data-position="right" data-tooltip="Entregar" onClick="entregar(${row.id_factura},${row.id_status})"><i class="material-icons">assignment_turned_in</i></a>
                <a class="btn ${row.id_status == 3 ? 'grey lighten-1' : row.id_status == 4 ? 'red darken-2' : ' blue accent-2'} tooltipped" data-position="right" data-tooltip="Cancelar" onClick="cancelar(${row.id_factura},${row.id_status})"><i class="material-icons">assignment_returned</i></a>

            </td>
           
        </tr>
        <thead>
            <tr class="row">
            <th></th>
            <th></th>
                <th> <ul class="collapsible" onclick="openMap(${row.id_cliente})">
                <li>
                  <div class="collapsible-header "><i class="material-icons">map</i>Ver mapa</div>
                  <div class="collapsible-body"><div id="mapa${row.id_cliente}"></div></div>
                </li>
             
              </ul></th>
              
            </tr>
        </thead> 
        `
            ;



    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById("contenido").innerHTML = content;

    //Se reactiva los tooltiped
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
}


//Función para cambiar el estado de los productos a entregado

function entregar(id, estado) {
    //Se verifica el estado del pedido y se notifica si es posible la acción o no
    if (estado == 3) {
        sweetAlert(3, 'Ya se ha entregado.', null);
    } else if (estado == 4) {
        sweetAlert(3, 'El pedido ha sido cancelado, no se puede entregar.', null);
    } else {
        //Se crear una variable de tipo form
        let datos = new FormData();
        datos.append('identificador', id);
        //Se realiza la confirmación antes de proceder
        Swal.fire({
            title: "Advertencia",
            text: "¿Desea marcar como entregado el pedido?",
            icon: "warning",
            confirmButtonText: "Aceptar",
            denyButtonText: "Cancelar",
            showDenyButton: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
        }).then((result) => {
            // Se comprueba la elección del usuarios
            if (result.isConfirmed) {
                //Se crea la petición
                fetch(API_PAQUETES + 'entregar', {
                    method: 'post',
                    body: datos,
                }).then(function (request) {
                    //Se verifica si se logró llegar a la api
                    if (request) {
                        //Se convierte a JSON
                        request.json().then(function (response) {
                            //Se verifica el estado de la ejecución
                            if (response.status) {
                                //Se cargan los datos en la vista
                                readRows(API_PAQUETES);
                                //Se confirma el proceso completado
                                sweetAlert(1, response.message, null);
                            } else {
                                //Se le indica el error
                                sweetAlert(2, response.exception, null);
                            }
                        })
                    } else {
                        //Se notifica por medio de la consola
                        console.log(request.status + " " + request.statusText);
                    }
                })
            }
        })
    }
}

function cancelar(id, estado) {
    //Se verifica el estado del pedido y se notifica si es posible la acción o no
    if (estado == 3) {
        sweetAlert(3, 'El pedido ha sido entregado, no se puede cancelar.', null);
    } else if (estado == 4) {
        sweetAlert(3, 'Ya se ha cancelado.', null);
    } else {
        //Se crear una variable de tipo form
        let datos = new FormData();
        datos.append('identificador', id);
        //Se realiza la confirmación antes de proceder
        Swal.fire({
            title: "Advertencia",
            text: "¿Desea cancelar el pedido?",
            icon: "warning",
            confirmButtonText: "Aceptar",
            denyButtonText: "Cancelar",
            showDenyButton: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
        }).then((result) => {
            // Se comprueba la elección del usuarios
            if (result.isConfirmed) {
                //Se crea la petición
                fetch(API_PAQUETES + 'cancelar', {
                    method: 'post',
                    body: datos,
                }).then(function (request) {
                    //Se verifica si se logró llegar a la api
                    if (request) {
                        //Se convierte a JSON
                        request.json().then(function (response) {
                            //Se verifica el estado de la ejecución
                            if (response.status) {
                                //Se cargan los datos en la vista
                                readRows(API_PAQUETES);
                                //Se confirma el proceso completado
                                sweetAlert(1, response.message, null);
                            } else {
                                //Se le indica el error
                                sweetAlert(2, response.exception, null);
                            }
                        })
                    } else {
                        //Se notifica por medio de la consola
                        console.log(request.status + " " + request.statusText);
                    }
                })
            }
        })

    }
}


//Función para cargar el detalle de productos
function cargar_productos(id) {
    //Se crea la variable de tipo form
    let datos = new FormData();
    datos.append('identificador', id);
    //Se crea la petición
    fetch(API_PAQUETES + 'cargarProductos',
        {
            method: 'post',
            body: datos,
        }).then(function (request) {
            //Se revisa si la ejecución 
            if (request.ok) {
                //Se crea el JSON
                request.json().then(function (response) {
                    //Se revisa el estado que devolvió la respuesta
                    if (response.status) {
                        //Se crea una tupla donde se guardará el html a inyectar
                        let contenido = [];
                        //Se crea un map del resultado
                        response.dataset.map(function (row) {
                            contenido += `

                            <tr>
                                    <td class="center" ata-target="Producto: ">
                                        <img src="../../../api/imagenes/productos/${row.imagen}" class="responsive-img" alt="">
                                        <span>${row.nombre_producto}</span>
                                    </td>
                                    <td data-target="Precio: ">$${row.precio}</td>
                                    <td data-target="Cantidad: ">${row.cantidad_pedido}</td>
                                    <td ata-target="Subtotal: ">$${row.subtotal}</td>
                                </tr>
                            `


                                ;

                        });
                        //Se inyecta el html en el modal
                        document.getElementById("contenido_modal").innerHTML = contenido;

                    } else {
                        //Se le muestra el problema
                        sweetAlert(2, response.exception, null);
                    }
                })
            } else {
                //Se imprime la consola
                console.log(request.status + ' ' + request.statusText);
            }
        })

}




//Obtenemos el id donde ira el mapa
var x = document.getElementById("map");


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

//Se inicializa el mapa con la vista y nivel de zoom
var map = L.map('map').setView([13.710045, -89.1372527], 8);

//se añaden agrega el mapa
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

    
//Creamos una escala de control
L.control.scale().addTo(map);

//Obtenemos la posición actual
navigator.geolocation.getCurrentPosition(function (position) {
    //Guardamos la latitud y longitud en variables
    var la = position.coords.latitude;
    var lo = position.coords.longitude;
    console.log(la,lo);
    //Colocamos marcador según la longitud y latitud obtenida
    marcador = L.marker([la, lo], { draggable: false }).addTo(map);
    //Colocamos marcador en la segunda posición
    L.marker([13.710045, -89.1372527], { draggable: false }).addTo(map);
    //Establecemos la vista en escala 14
    map.setView([la, lo], 8)

    //Guardamos la ruta de las dos posiciones
    var ruta = L.Routing.control({
        waypoints: [
            L.latLng(la, lo),
            L.latLng(13.710045, -89.1372527)
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


});





//Función para abrir mapa
function openMapa(id) {
    M.Modal.getInstance(document.getElementById("mapa-modal")).open();
    map.invalidateSize();
}

function openMap(id) {
    Swal.fire({
        title: 'Selecciona la categoria',
        html: '<div class="col s12 m12 l12" id="map"></div>',
        showCancelButton: true,
      }).then(function () {
        //Obtenemos la opcion seleccinada
        var selectedOption = document.getElementById("opciones_categoriaa").options[document.getElementById("opciones_categoriaa").selectedIndex];
        console.log(selectedOption.text);
        openReport(selectedOption.text);
      });

}
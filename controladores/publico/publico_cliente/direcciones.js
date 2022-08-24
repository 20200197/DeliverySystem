// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_DIRECCIONES = SERVER + 'publico/direcciones.php?action=';
const ENDPOINT_MUNICIPIO = SERVER + "publico/municipios.php?action=readAll";
const ENDPOINT_DEPARTAMENTO = SERVER + "publico/departamentos.php?action=readAll";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false
    }
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));
    readDirecciones();
});

// Función para llenar con los datos de los registros.
function readDirecciones() {
    fetch(API_DIRECCIONES + 'readAll', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                let data = [];
                // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    data = response.dataset;
                } else {
                    sweetAlert(4, response.exception, null);
                }
                // Se envían los datos a la función para llenar la tabla en la vista.
                fillTable(data);
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });

}



function fillTable(dataset) {
    //Declaramos variables
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        content += `
            <tr>
                <td data-target="">
                    <div class="img-simulada"></div>
                </td>
                <td data-target="Municipio:">${row.nombre_municipio}</td>
                <td class="wrap2" data-target="Descripción">
                    ${row.descripcion_direccion}
                </td>
                <td data-target="Punto referencia:">${row.punto_referencia}</td>
                <td data-target="Opciones:">
                    <div class="col s6 m6 l6">
                        <a class="waves-effect waves-light red darken-4 white-text btn-large col s12 m12 l12 modal-trigger"
                            onclick="openDelete(${row.id_direccion})"><i class="material-icons">delete</i></a>
                    </div>
                    <div class="col s6 m6 l6">
                        <a class="waves-effect waves-light blue lighten-2 black-text btn-large col s12 m12 l12 modal-trigger center-align"
                            onclick="openUpdate(${row.id_direccion})"><i class="material-icons black-text hide-on-large-only">edit</i>
                            <i class="material-icons  black-text hide-on-med-and-down">edit</i>
                            <div class="hide-on-med-and-down ">Editar</div>
                        </a>
                    </div>
                </td>
            </tr> 
        `;

    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-direcciones').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));


}

function openCreate() {
    M.Modal.getInstance(document.getElementById("modal-add")).open();
    fillSelect(ENDPOINT_MUNICIPIO, "municipio", null);
    // fillSelect(ENDPOINT_DEPARTAMENTO, "select_departamento", null);
}


//Se inicializa el mapa con la vista y nivel de zoom
var map = L.map('mapa').setView([13.683767546575941, -88.93569946289064], 8);

//se añaden agrega el mapa
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Variables para manejar las coordenadas seleccionadas en el mapa
Layer = null;
let cords = null;
//Campo id

//función que se ejecuta cuando se clickea en el mapa
function onMapClick(e) {

    //Comprobamos si layer es null para crear un marcador nuevo que captura la latitud y longitud
    if (Layer == null) {
        Layer = L.marker(e.latlng);
        //Se concatena la latitud con la longitud separados por coma para usar guardarlo en una variable
        cords = Layer.getLatLng().lat + ', ' + Layer.getLatLng().lng;
    } else {//<-- si ya existe un marcador se remueve el que ya existe para poner uno nuevo
        Layer.remove();
        Layer = L.marker(e.latlng);
        //Se concatena la latitud con la longitud separados por coma para usar guardarlo en una variable
        cords = Layer.getLatLng().lat + ', ' + Layer.getLatLng().lng;
    }

    console.log(cords);
    document.getElementById("coordenadas").value = cords;
    Layer.addTo(map);
}

//Se crea el evento click y se llama a la función ya creada
map.on('click', onMapClick);

/////////////////////Mapa de actualizar////////////////////////////

//Se inicializa el mapa con la vista y nivel de zoom
var mapa = L.map('mapa_').setView([13.683767546575941, -88.93569946289064], 8);

//se añaden agrega el mapa
var tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);
L.control.scale().addTo(mapa);
//Variables para manejar las coordenadas seleccionadas en el mapa
Layers = null;
let coords = null;
//Campo id

//función que se ejecuta cuando se clickea en el mapa
function onMapClickD(e) {

    //Comprobamos si layer es null para crear un marcador nuevo que captura la latitud y longitud
    if (Layers == null) {
        Layers = L.marker(e.latlng);
        //Se concatena la latitud con la longitud separados por coma para usar guardarlo en una variable
        coords = Layers.getLatLng().lat + ', ' + Layers.getLatLng().lng;
    } else {//<-- si ya existe un marcador se remueve el que ya existe para poner uno nuevo
        Layers.remove();
        Layers = L.marker(e.latlng);
        //Se concatena la latitud con la longitud separados por coma para usar guardarlo en una variable
        coords = Layers.getLatLng().lat + ', ' + Layers.getLatLng().lng;
    }

    console.log(coords);
    document.getElementById("coordenadas_direccion").value = coords;
    Layers.addTo(mapa);
}

//Se crea el evento click y se llama a la función ya creada
mapa.on('click', onMapClickD);

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById("add-form").addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    let action = "";
    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(API_DIRECCIONES, "create", "add-form", "modal-add");
});



function openUpdate(id) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById("modal-update")).open();
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append("id", id);
    // Petición para obtener los datos del registro solicitado.
    fetch(API_DIRECCIONES + "readOne", {
        method: "post",
        body: data,
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    document.getElementById("id_direccion").value = response.dataset.id_direccion;
                    document.getElementById("descripcion_direccion").value = response.dataset.descripcion_direccion;
                    document.getElementById("punto_referencia").value = response.dataset.punto_referencia;
                    // document.getElementById('stock_producto').value = response.dataset.cant_producto;
                    document.getElementById("coordenadas_direccion").value = response.dataset.coordenadas;
                    fillSelect(ENDPOINT_MUNICIPIO, "municipio_editar", response.dataset.id_municipio);
                    var latitude = response.dataset.latitude;
                    var longitud = response.dataset.longitud;
                    var coordenadas = response.dataset.coordenadas;
                    Layers = L.marker([latitude,longitud], { draggable: false }).addTo(mapa);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

document.getElementById("update-form").addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    // Se comprueba si el campo oculto del formulario esta seteado para actualizar, de lo contrario será para crear.
    saveRow(API_DIRECCIONES, "update", "update-form", "modal-update");
});

// Función para establecer el registro a eliminar y abrir una caja de diálogo de confirmación.
function openDelete(id) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id', id);
    // Se llama a la función que elimina un registro. Se encuentra en el archivo components.js
    confirmDelete(API_DIRECCIONES, data);
}
 
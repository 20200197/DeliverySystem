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
                <td>
                    <div class="img-simulada"></div>
                </td>
                <td>${row.nombre_municipio}</td>
                <td class="wrap2">
                    ${row.descripcion_direccion}
                </td>
                <td>${row.punto_referencia}</td>
                <td class="row">
                    <div class="col s6 m6 l4">
                        <a class="waves-effect waves-light red darken-4 white-text btn-large col s12 m12 l12 modal-trigger"
                            onclick="openDelete(${row.id_direccion})"><i class="material-icons">delete</i></a>
                    </div>
                    <div class="col s6 m6 l8">
                        <a class="waves-effect waves-light blue lighten-2 black-text btn-large col s12 m12 l12 modal-trigger"
                            onclick="openUpdate(${row.id_direccion})"><i class="material-icons black-text hide-on-large-only">edit</i>
                            <i class="material-icons left black-text hide-on-med-and-down">edit</i>
                            <div class="hide-on-med-and-down">Editar</div>
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

function readCali() {
    fetch(API_PRODUCTOS + 'readCali', {
        method: 'get'
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status) {
                    //Definimos variables
                    let content_estrellas = '';
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        //Compramos la calidad para colocarle las estrellas
                        if (row.calidad <= 1 && row.calidad > 0) {
                            //Para 0.5
                            if (row.calidad < 1) {
                                content_estrellas += `
                                  <i class="material-icons">star_half</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                //Para 1
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>  `;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                            //Para 1.5
                        } else if (row.calidad <= 2 && row.calidad > 1) {
                            if (row.calidad < 2 && row.calidad > 1) {
                                content_estrellas += `                            
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star_half</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>  `;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                //Para 2
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                        } else if (row.calidad <= 3 && row.calidad > 2) {
                            //Para 2.5
                            if (row.calidad < 3 && row.calidad > 2) {
                                content_estrellas += `
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star_half</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                //Para 3
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star_border</i>
                                   <i class="material-icons">star_border</i> `;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                        } else if (row.calidad <= 4 && row.calidad > 3) {
                            //Para 3.5
                            if (row.calidad < 4 && row.calidad > 3) {
                                content_estrellas += `
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star_half</i>
                                      <i class="material-icons">star_border</i> `;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                //Para 4
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                content_estrellas.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                        } else if (row.calidad <= 5 && row.calidad > 4) {
                            //Para 4.5
                            if (row.calidad < 5 && row.calidad > 4) {
                                content_estrellas += `
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star_half</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                        } else if (row.calidad == null) {
                            content_estrellas += `
                                  <p>No hay calificación para este producto</p> `;
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                        } else {
                            content_estrellas += `
                                  <p>No hay calificación para este producto</p>`;
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                        }
                    });
                    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                    document.getElementById('contenedor_cali').innerHTML = content_estrellas;
                    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
                } else {
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById(
                        "title"
                    ).innerHTML = `<i class="material-icons small">cloud_off</i><span class="red-text">${response.exception}</span>`;
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

// Método para search por precio
function searchProductosPrecio() {
    let parameter = new FormData();
    //Evaluamos la opcion del checkbox que se selecciono
    if (document.getElementById("group1").checked) {
        //Mandamos los dos parametros para buscar
        parameter.append('data1', 1)
        parameter.append('data2', 50)
        //Desmarcmos los demás 

        document.getElementById("group2").checked = false;
        document.getElementById("group3").checked = false;
        document.getElementById("group4").checked = false;

        //Deshabilitamos inputs 
        document.getElementById("precio-inicio").disabled = true;
        document.getElementById("precio-limite").disabled = true;
    } else if (document.getElementById("group2").checked) {
        //Mandamos los dos parametros para buscar
        parameter.append('data1', 51)
        parameter.append('data2', 150)
        //Desmarcamos los demás

        document.getElementById("group1").checked = false;
        document.getElementById("group3").checked = false;
        document.getElementById("group4").checked = false;

        //Deshabilitamos inputs 
        document.getElementById("precio-inicio").disabled = true;
        document.getElementById("precio-limite").disabled = true;
    } else if (document.getElementById("group3").checked) {
        //Mandamos los dos parametros para buscar
        parameter.append('data1', 151)
        parameter.append('data2', 300)
        //Desmarcamos los demás

        document.getElementById("group1").checked = false;
        document.getElementById("group2").checked = false;
        document.getElementById("group4").checked = false;

        //Deshabilitamos inputs 
        document.getElementById("precio-inicio").disabled = true;
        document.getElementById("precio-limite").disabled = true;
    } else {
        if (document.getElementById("group4").checked) {
            document.getElementById("precio-inicio").disabled = false;
            document.getElementById("precio-limite").disabled = false;
        }
        //Desmarcamos los demás
        document.getElementById("group1").checked = false;
        document.getElementById("group2").checked = false;
        document.getElementById("group3").checked = false;
        document.getElementById("group4").checked = true;
    }

    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PRODUCTOS + 'searchProductoPrecio', {
        method: 'post',
        body: parameter
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    //Se llena la tabla de productos
                    fillTable(response.dataset);
                    // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                    M.updateTextFields();
                    //Si no hay coincidencias se carga la tabla sin datos
                } else if (response.exception == 'No hay coincidencias') {
                    fillTable(response.dataset);
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">${response.exception}</span><p><i class="material-icons medium black-text">home</i></p>`;
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readProductos();
                    readCategoria();
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

//Función par buscar custom
function searchCustom() {
    let parameter = new FormData();
    //Evaluamos si mientras se escribe el input esta vacio
    if (document.getElementById("precio-inicio").value == null || document.getElementById("precio-limite") == null) {
        //Valores iniciales
        document.getElementById("precio-inicio").value = 0;
        document.getElementById("precio-limite").value = 0;
        //Mandamos los dos parametros para buscar
        parameter.append('data1', 0)
        parameter.append('data2', 0)
    } else {
        //Obtenemos valores Custom
        var precio_inicio = document.getElementById("precio-inicio").value;
        var precio_limite = document.getElementById("precio-limite").value;
        //Mandamos los dos parametros para buscar
        parameter.append('data1', precio_inicio)
        parameter.append('data2', precio_limite)
    }

    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PRODUCTOS + 'searchProductoPrecio', {
        method: 'post',
        body: parameter
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    //Se llena la tabla de productos
                    fillTable(response.dataset);
                    // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                    M.updateTextFields();
                    //Si no hay coincidencias se carga la tabla sin datos
                } else if (response.exception == 'No hay coincidencias') {
                    fillTable(response.dataset);
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">${response.exception}</span><p><i class="material-icons medium black-text">home</i></p>`;
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readProductos();
                    readCategoria();
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

//Función para search por calidad
function searchProductosCalidad() {
    var parameter = new FormData();
    //Evaluamos la opcion del checkbox que se selecciono
    if (document.getElementById("cali_uno").checked == true) {
        //Mandamos los dos parametros para buscar
        parameter.append('dataU', 1)
        parameter.append('dataD', 0)
        parameter.append('dataT', 0)
        parameter.append('dataC', 0)
        parameter.append('dataCi', 0)

        //Deshabilitamos
        document.getElementById("cali_uno").checked = true;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cuatro").checked = false;
        document.getElementById("cali_cinco").checked = false;

    } else if (document.getElementById("cali_dos").checked == true) {

        //Mandamos los dos parametros para buscar
        parameter.append('dataU', 0)
        parameter.append('dataD', 2)
        parameter.append('dataT', 0)
        parameter.append('dataC', 0)
        parameter.append('dataCi', 0)

        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cuatro").checked = false;
        document.getElementById("cali_cinco").checked = false;

    } else if (document.getElementById("cali_tres").checked == true) {

        //Mandamos los dos parametros para buscar
        parameter.append('dataU', 0)
        parameter.append('dataD', 0)
        parameter.append('dataT', 3)
        parameter.append('dataC', 0)
        parameter.append('dataCi', 0)
        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_cuatro").checked = false;
        document.getElementById("cali_cinco").checked = false;

    } else if (document.getElementById("cali_cuatro").checked == true) {
        parameter.append('dataU', 0)
        parameter.append('dataD', 0)
        parameter.append('dataT', 0)
        parameter.append('dataC', 4)
        parameter.append('dataCi', 0)
        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cinco").checked = false;

    } else {
        parameter.append('dataU', 0)
        parameter.append('dataD', 0)
        parameter.append('dataT', 0)
        parameter.append('dataC', 0)
        parameter.append('dataCi', 5)
        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cuatro").checked = false;

    }

    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PRODUCTOS + 'searchProductoCalidad', {
        method: 'post',
        body: parameter
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    //Se llena la tabla de productos
                    fillTable(response.dataset);
                    // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                    M.updateTextFields();
                    //Si no hay coincidencias se carga la tabla sin datos
                } else if (response.exception == 'No hay coincidencias') {
                    fillTable(response.dataset);
                    //sweetAlert(4, response.exception, null)
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">${response.exception}</span><p><i class="material-icons medium black-text">home</i></p>`;
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readProductos();
                    readCategoria();
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}


function updateEstado(id) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('idP', id);

    //Obtenemos valor de switch
    if (document.getElementById('switch_estado' + id).checked) {
        data.append('estadoP', true);
    } else {
        data.append('estadoP', false)
    }
    fetch(API_PRODUCTOS + 'update', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se cargan nuevamente las filas en la tabla de la vista después de guardar un registro y se muestra un mensaje de éxito.
                    readRows(API_PRODUCTOS);
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



// Constantes para establecer las rutas y parámetros de comunicación con la API.
const API_DISTRIBUIDOR = SERVER + 'dashboard/administrar_distribuidor.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_DISTRIBUIDOR);
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false

    }
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
});

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
            <tr>
            <td data-target="Nombre repartidor: ">${row.nombre_repartidor}</td>
            <td data-target="Apellido repartidor: ">${row.apellido_repartidor}</td>
            <td data-target="Dui repartidor: ">${row.dui_repartidor}</td>
            <td data-target="Correo repartidor: ">${row.correo_repartidor}</td>
            <td data-target="Usuario repartidor: ">${row.usuario_repartidor}</td>
            <td data-target="Telefono repartidor: "><img src="${SERVER}imagenes/distribuidor/${row.solvencia_pnc}"></td>
            <td data-target="Ver más: "><button class=" btn-flat modal-trigger"
                                                onClick="openInfo(${row.id_repartidor})"><i class="material-icons">remove_red_eye</i></button></td>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-rows').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
/**document.getElementById('save-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    saveRow(API_DISTRIBUIDOR, 'create', 'save-form', 'save-modal');
});**/

// Función para preparar el formulario al momento de insertar un registro.
function openCreate() {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('save-modal')).open();
}

// Función para abrir el reporte de productos.
function openReport() {
    // Se establece la ruta del reporte en el servidor.
    let url = SERVER + 'reports/dashboard/productos.php';
    // Se abre el reporte en una nueva pestaña del navegador web.
    window.open(url);
}

function openInfo(id) {
    console.log(id);
    M.Modal.getInstance(document.getElementById('modal_info')).open();
    fillData(id);
}

function fillData(id) {
    let parameter = new FormData();
    parameter.append('id', id);
    let content = '';

    fetch(API_DISTRIBUIDOR + 'readOne', {
        method: 'post',
        body: parameter
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status) {
                    if (response.dataset.status_repartidor) {
                        estado_re = 'checked';
                    } else {
                        estado_re = '';
                    }
                    content += `<tr>
                    <th>Nombre:</th>
                    <td>${response.dataset.nombre_repartidor}</td>
                </tr>
                <tr>
                    <th>Apellido:</th>
                    <td>${response.dataset.apellido_repartidor}</td>
                </tr>
                <tr>
                    <th>Dui:</th>
                    <td>${response.dataset.dui_repartidor}</td>
                </tr>
                <tr>
                    <th>Correo:</th>
                    <td>${response.dataset.correo_repartidor}</td>
                </tr>
                <tr>
                    <th>Usuario:</th>
                    <td>${response.dataset.usuario_repartidor}</td>
                </tr>
                <tr>
                    <th>Solvencia pnc:</th>
                    <td><img src="${SERVER}dasboard/imagenes/distribuidor/${response.dataset.solvencia_pnc}"
                            class="materialboxed imagen_standar"></td>
                </tr>
                <tr>
                    <th>Antecedente pnc:</th>
                    <td><img src="${SERVER}dasboard/imagenes/distribuidor/${response.dataset.antecedente_pnc}"
                            class="materialboxed imagen_standar"></td>
                </tr>
                <tr>
                    <th>Dirección domicilio:</th>
                    <td>${response.dataset.direccion_domicilio}</td>
                </tr>
                <tr>
                    <th>Placa vehiculo:</th>
                    <td>${response.dataset.placa_vehiculo}</td>
                </tr>
                <tr>
                    <th>Foto placa:</th>
                    <td><img src="${SERVER}dasboard/imagenes/distribuidor/${response.dataset.foto_placa_vehiculo}"
                            class="materialboxed imagen_standar"></td>
                </tr>
                <tr>
                    <th>Foto repartidor:</th>
                    <td><img src="${SERVER}dasboard/imagenes/distribuidor/${response.dataset.foto_repartidor}"
                            class="materialboxed imagen_standar"></td>
                </tr>
                <tr>
                    <th>Foto vehiculo:</th>
                    <td><img src="${SERVER}dasboard/imagenes/distribuidor/${response.dataset.foto_vehiculo}"
                            class="materialboxed imagen_standar"></td>
                </tr>
                <tr>
                    <th>Fecha registro:</th>
                    <td>${response.dataset.fecha_registro}</td>
                </tr>
                <tr>
                    <th>Estado:</th>
                    <td>
                        <div class="switch">
                            <label>
                            <input type="checkbox" id="switch_estado${response.dataset.id_repartidor}" onclick="updateEstado(${response.dataset.id_repartidor})" ${estado_re}>
                            <span class="lever"></span>
                            </label>
                        </div>
                    </td>
                </tr>
                `;
                }
                document.getElementById('tdbody-info').innerHTML = content;
                // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                M.Materialbox.init(document.querySelectorAll(".materialboxed"));
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
    fetch(API_DISTRIBUIDOR + 'updateStatus', {
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
                    readRows(API_DISTRIBUIDOR);
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

// Función para preparar el formulario al momento de modificar un registro.
function openUpdate(id) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('save-modal')).open();
    // Se asigna el título para la caja de diálogo (modal).
    document.getElementById('modal-title').textContent = 'Actualizar producto';
    // Se establece el campo de archivo como opcional.
    document.getElementById('archivo').required = false;
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    fetch(API_DISTRIBUIDOR + 'readOne', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se inicializan los campos del formulario con los datos del registro seleccionado.
                    document.getElementById('id').value = response.dataset.id_marca;
                    document.getElementById('nombre_marca').value = response.dataset.nombre_marca;


                    // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                    M.updateTextFields();
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById('search').addEventListener('keyup', function (event) {
    let parameter = new FormData();
    parameter.append('data', document.getElementById('search').value)
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_DISTRIBUIDOR + 'search', {
        method: 'post',
        body: parameter
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    //Se llena la tabla
                    fillTable(response.dataset);
                    // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                    M.updateTextFields();
                    //Si no hay coincidencias se carga la tabla sin datos
                } else if (response.exception == 'No hay coincidencias') {
                    fillTable(response.dataset);
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readRows(API_DISTRIBUIDOR);
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});


// Función para establecer el registro a eliminar y abrir una caja de diálogo de confirmación.
function openDelete(id) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id', id);
    // Se llama a la función que elimina un registro. Se encuentra en el archivo components.js
    confirmDelete(API_DISTRIBUIDOR, data);
}
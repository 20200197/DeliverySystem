// Constantes para establecer las rutas y parámetros de comunicación con la API.
const API_DISTRIBUIDOR = SERVER + 'dashboard/administrar_marca.php?action=';

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
                <td data-target="Nombre marca:">${row.nombre_marca}</td>
                <td data-target="Editar">
                    <a onclick="openUpdate(${row.id_marca})" class="btn-floating waves-effect blue tooltipped" data-tooltip="Actualizar">
                        <i class="material-icons">mode_edit</i>
                    </a>
                    </td>
                    <td data-target="Eliminar">
                    <a onclick="openDelete(${row.id_marca})" class="btn-floating waves-effect red tooltipped" data-tooltip="Eliminar">
                        <i class="material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-rows').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('save-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    saveRow(API_MARCAS,'create', 'save-form','save-modal');
});

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
    fetch(API_MARCAS + 'readOne', {
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
document.getElementById('search-form').addEventListener('keyup', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_MARCAS + 'search', {
        method: 'post',
        body: new FormData(document.getElementById('search-form'))
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
                    readRows(API_MARCAS);
                }else{
                    
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
    confirmDelete(API_MARCAS, data);
}
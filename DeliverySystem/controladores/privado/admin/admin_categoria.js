// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_CATEGORIA = SERVER + 'dashboard/administrar_categoria.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_CATEGORIA);
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false
    }
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search-form').addEventListener('keyup', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_CATEGORIA + 'search', {
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
                    readRows(API_PRODUCTOS);
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

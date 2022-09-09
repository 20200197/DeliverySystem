// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_COMENTARIOS = SERVER + 'publico/repartidor.php?action=';

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
    fetch(API_COMENTARIOS + 'readComentario', {
        method: "get",
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
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
                fillTable(data);
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
});

function fillTable(dataset) {
    //Declaramos variables
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        content += `
        <tr>
            <td data-target="Comentario:">${row.comentario}</td>
            <td data-target="Nombre Cliente:"><br> ${row.nombre_cliente}</td>
         </tr>
        `;

    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-coment').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}
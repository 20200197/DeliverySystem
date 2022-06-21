//Se crea la constante de la api
const API_CLIENTE = SERVER + "dashboard/administrar_cliente.php?action=";

// Método que ejecuta la carga de de las tablas y la activación de componentes
document.addEventListener("DOMContentLoaded", function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_CLIENTE);
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false,
    };
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), options);
    //se inicializan los tooltp
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
});

//Función que llena la tabla
function fillTable(data) {
    //Se crea una variable donde se guardará el HTML a inyectar
    let contenido = [];
    //Se obtiene el contenido y se revisa fila por fila en el map
    data.map(function (row) {
        contenido += `
            <tr>
                <td data-target="Apellido cliente: ">${row.nombre_completo}</td>
                <td data-target="Dui cliente: ">${row.dui_cliente}</td>
                <td data-target="Correo cliente: ">${row.correo_cliente}</td>
                <td data-target="Usuario cliente: ">${row.usuario_cliente}</td>
                <td data-target="Fecha registro: ">${row.fecha_registro_cliente}</td>
                <td data-target="Telefono cliente: ">${row.telefono_cliente}</td>
                <td data-target="Imagen cliente: ">
                    <div class="switch">
                        <label>
                        Inactivo
                        <input type="checkbox" id="estado${row.id_cliente}" onclick="estado(${row.id_cliente})"
                        ${row.status_cliente == true ? 'checked' : ''}>
                        <span class="lever"></span>
                        Activo
                        </label>
                    </div>
                </td>
            </tr>
        `;
    });
    //Se Inyecta el HTML en la página
    document.getElementById("contenido").innerHTML = contenido;
}

//Función que cambia el estado del cliente
function estado(id) {
    //Se crea la variable de tipo formulario
    datos = new FormData();
    //Se verifica el estado al que se cambiará mediante el switch
    document.getElementById("estado" + id).checked
        ? datos.append("estado", true)
        : datos.append("estado", false);
    //Se guarda el identificador
    datos.append("identificador", id);
    //Se procese a realizar la promesa
    fetch(API_CLIENTE + 'cambiarEstado', {
        method: "post",
        body: datos,
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se cargan nuevamente las filas en la tabla de la vista después de guardar un registro y se muestra un mensaje de éxito.
                    readRows(API_CLIENTE);
                    sweetAlert(1, response.message, null);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

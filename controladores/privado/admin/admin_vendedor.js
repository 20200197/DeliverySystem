//Se crea la constante de la api
const API_VENDEDOR = SERVER + "dashboard/administrar_vendedor.php?action=";

// Método que ejecuta la carga de de las tablas y la activación de componentes
document.addEventListener("DOMContentLoaded", function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_VENDEDOR);
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
                    <td data-target="Nombre vendedor: ">${row.nombre_completo}</td>
                    <td data-target="Dui vendedor: ">${row.dui_vendedor}</td>
                    <td data-target="Correo vendedor: ">${row.correo_vendedor}</td>
                    <td data-target="Usuario vendedor: ">${row.usuario_vendedor}</td>
                    <td data-target="Solvencia pnc: ">
                        <img src="../../../api/imagenes/privado/admin/modals/${row.solvencia_pnc}" 
                        class="materialboxed imagen_standar">
                    </td>
                    <td data-target="Ver más: ">
                        <a class=" btn-flat modal-trigger"
                        href="#modal_info"><i class="material-icons">remove_red_eye</i></a>
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
    fetch(API_VENDEDOR + "cambiarEstado", {
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
                    readRows(API_VENDEDOR);
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

//Función que realiza busquedas en los clientes

function buscar() {
    //Se crea el dato de tipo form
    let datos = new FormData();
    //Se llena con el valor de la busqueda
    datos.append("buscador", document.getElementById("search").value);
    //Se realiza la promesa
    fetch(API_VENDEDOR + "buscar", {
        method: "post",
        body: datos,
    }).then(function (request) {
        //Se verifica si se logró ejecutar la función
        if (request.ok) {
            //Se procede a pasarlo a JSON
            request.json().then(function (response) {
                //Se verifica el estado de la respuesta
                if (response.status) {
                    //Se cargan los datos obtenidos
                    fillTable(response.dataset);
                } else {
                    sweetAlert(1, response.exception, null);
                }
            });
        }
    });
}

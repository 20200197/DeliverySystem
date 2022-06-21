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
                <td data-target="Nombre cliente: ">${row.nombre_completo}</td>
                <td data-target="Apellido cliente: ">${row.nombre_completo}</td>
                <td data-target="Dui cliente: ">${row.dui_cliente}</td>
                <td data-target="Correo cliente: ">${row.correo_cliente}</td>
                <td data-target="Usuario cliente: ">${row.usuario_cliente}</td>
                <td data-target="Status cliente: ">Cliente 1</td>
                <td data-target="Fecha registro: ">${row.fecha_registro_cliente}</td>
                <td data-target="Telefono cliente: ">${row.telefono_cliente}</td>
                <td data-target="Imagen cliente: ">
                <a class="btn-flat boton_eliminar_tabl modal-trigger"
                    href="#modal_eliminar_cliente"><i
                    class=" material-icons small ">delete</i></a>
                </td>
            </tr>
        `;
    });
    //Se Inyecta el HTML en la página
    document.getElementById("contenido").innerHTML = contenido;
}

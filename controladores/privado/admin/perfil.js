//Se crea la constante de la api
const API_PERFIL = SERVER + "dashboard/administrar_perfil.php?action=";

// Método que ejecuta la carga de de las tablas y la activación de componentes
document.addEventListener("DOMContentLoaded", function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_PERFIL);
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), {dismissible: false});
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
                        <input type="checkbox" id="estado${row.id_cliente}" onclick="estado(${
            row.id_cliente
        })"
                        ${row.status_cliente == true ? "checked" : ""}>
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

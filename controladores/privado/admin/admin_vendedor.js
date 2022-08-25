//Se crea la constante de la api
const API_VENDEDOR = SERVER + "dashboard/administrar_vendedor.php?action=";

// Método que ejecuta la carga de de las tablas y la activación de componentes
document.addEventListener("DOMContentLoaded", function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_VENDEDOR);
    // Se define una variable para establecer las opciones del componente Modal.
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
                        class="responsive-img">
                    </td>
                    <td data-target="Ver más: ">
                        <a class="btn-flat modal-trigger"
                        href="#modal_info" onclick="cargarInfo(${row.id_vendedor})"><i class="material-icons">remove_red_eye</i></a>
                    </td>
                </tr>
        `;
    });
    //Se Inyecta el HTML en la página
    document.getElementById("contenido").innerHTML = contenido;
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
}

//Función para obtener los datos del modal de la información extra
function cargarInfo(id) {
    //Se guarda el identificador en una variable de tipo form
    let datos = new FormData();
    datos.append("identificador", id);
    //Se realiza la promesa
    fetch(API_VENDEDOR + "detalles", {
        method: "post",
        body: datos,
    }).then(function (request) {
        //Se revisa si la petición fue ejecutada
        request.ok
            ? //Se obtiene en Json
              request.json().then(function (response) {
                  //Se revisa el estado de la respuesta
                  response.status
                      ? //Se envía al método que cargará los datos
                        cargarModal(response.dataset)
                      : //Se imprime el problema
                        sweetAlert(3, response.exception, null);
              })
            : console.log(); //Se imprime el error en la consola
    });
}

//Función para cargar los datos en el modal de información
function cargarModal(data) {
    //Se le signa la inyección a la tabla
    document.getElementById("contenidoInfoModal").innerHTML = `
        <tr>
            <th>Nombre:</th>
            <td>${data.nombre_vendedor}</td>
        </tr>
        <tr>
            <th>Apellido:</th>
            <td>${data.apellido_vendedor}</td>
        </tr>
        <tr>
            <th>Dui:</th>
            <td>${data.dui_vendedor}</td>
        </tr>
        <tr>
            <th>Correo:</th>
            <td>${data.correo_vendedor}</td>
        </tr>
        <tr>
            <th>Usuario:</th>
            <td>${data.usuario_vendedor}</td>
        </tr>
        <tr>
            <th>Solvencia pnc:</th>
            <td>
                <img src="../../../api/imagenes/vendedor/solvencia/${data.antecedente_penal}"
                class="responsive-img">
            </td>
        </tr>
        <tr>
            <th>Antecedente pnc:</th>
            <td>
                <img src="../../../api/imagenes/vendedor/antecedentes/${data.antecedente_penal}"
                class="responsive-img">
            </td>
        </tr>
        <tr>
            <th>Dirección domicilio:</th>
            <td>${data.direccion_domicilio_vendedor}</td>
        </tr>
        <tr>
            <th>Descripción vendedor:</th>
            <td>${data.descripcion_vendedor} </td>
        </tr>
        <tr>
            <th>Status:</th>
            <td>${data.status ? "Activo" : "Inactivo"}</td>
        </tr>
        <tr>
            <th>Foto:</th>
            <td>
                <img src="../../../api/imagenes/vendedor/foto/${data.foto_vendedor}"
                class="responsive-img">
            </td>
        </tr>
        <tr>
            <th>Fecha registro:</th>
            <td>${data.fecha_registro_vendedor}</td>
        </tr>
        <tr>
            <th>Coordenadas:</th>
            <td>${data.coordenadas_vendedor}</td>
        </tr>
        <tr>
            <th></th>
            <td>
                <a class="btn-flat boton_eliminar_tabl modal-trigger"
                 href="#modal_eliminar_vendedor" onclick="eliminar(${data.id_vendedor})">
                    <i class=" material-icons small ">delete</i>
                </a>
            </td>
        </tr>
    `;

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
                    document.getElementById('notificacion').innerHTML = '';
                } else {
                     //Se cargan los datos obtenidos
                     fillTable(response.dataset);
                     document.getElementById('notificacion').innerHTML = 'No se encontraron datos según la busqueda solicitada';
                }
            });
        } else {
            //Se imprime el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}

//función para eliminar un producto
function eliminar(id) {
    //Se crea el dato de tipo form
    let datos = new FormData();
    //Se llena con el valor de la busqueda
    datos.append("identificador", id);
    //Se realiza la promesa
    confirmDelete(API_VENDEDOR, datos);

}

// Función para abrir el reporte de productos.
function openReportVendedoresMasVentas() {
    // Se establece la ruta del reporte en el servidor.
    let url = SERVER + 'reportes/dashboard/vendedores_mas_ventas.php';
    // Se abre el reporte en una nueva pestaña del navegador web.
    window.open(url);
}
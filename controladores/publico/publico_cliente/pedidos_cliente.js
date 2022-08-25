// Constantes para establecer las rutas y parámetros de comunicación con la API.
const API_PEDIDOS_CLIENTE = SERVER + "publico/pedidos_cliente.php?action=";

document.addEventListener("DOMContentLoaded", function () {
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
    M.Slider.init(document.querySelectorAll(".slider"));
    M.Carousel.init(document.querySelectorAll(".carousel"));
});

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_PEDIDOS_CLIENTE);
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
      dismissible: false,
    };
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), options);
});

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
      // Se crean y concatenan las filas de la tabla con los datos de cada registro.
      content += `
      <tr>
        <td><img src="${SERVER}imagenes/productos/${row.imagen}" class="materialboxed" height="100" width="100"></td>
        <td>${row.total}</td>
        <td>${row.nombre_repartidor}</td>
        <td>${row.apellido_repartidor}</td>
        <td>${row.estado}</td>
        <td>
            <a class="waves-effect waves-light blue lighten-2 black-text btn-large col s12 l10" href="detalle_pedido_cliente.html" >
                <i class="material-icons left black-text">folder_open</i>Ver más
            </a>
        </td>
    </tr>
      `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById("tbody-pedidos-cliente").innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
  }
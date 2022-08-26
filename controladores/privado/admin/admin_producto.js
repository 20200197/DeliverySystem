// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_PRODUCTOS = SERVER + 'dashboard/administrar_producto.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_PRODUCTOS);
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false
    }
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));

});

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = '';
    //Variable de estado
    let estado_produc = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        //Colocamos el swicth checked o no checked dependiendo de el estado
        if (row.status_producto == true) {
            estado_produc = `checked`;
        } else if (row.status_producto == false) {
            estado_produc = ` `;
        }
        //Establecemos texto para el estado
        var estado_producto;
        (row.status_producto) ? estado_producto = 'Activo' : estado_producto = 'Inactivo';
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
        content += `
        <tr>
          <td data-target="Nombre producto: ">${row.nombre_producto}</td>
          <td data-target="Cantidad: ">${row.cantidad_producto}</td>
          <td data-target="Descripción: ">${row.descripcion_producto}</td>
          <td data-target="Precio: ">${row.precio_producto}</td>
          <td data-target="Imagen: "><img src="${SERVER}imagenes/administrar_producto/${row.imagen}" class="materialboxed" height="100" width="100"></td>
          <td data-target="Estado: ">${estado_producto}</td>
          <td data-target="Categoria: ">${row.categoria}</td>
          <td data-target="Nombre vendedor: ">${row.nombre_vendedor}</td>
          <td data-target="Marca: ">${row.nombre_marca}</td>
          <td data-target="Dar de baja: "><div class="switch">
          <label>
              <input type="checkbox" id="switch_estado${row.id_producto}" name="switch_estado" onclick="updateEstado(${row.id_producto})"   ${estado_produc} >
              <span class="lever"></span>
          </label>
            </div>
          </td>
        </tr>
      `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-productos').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}


// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search-form').addEventListener('keyup', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PRODUCTOS + 'search', {
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
    fetch(API_PRODUCTOS + 'update', {
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
                    readRows(API_PRODUCTOS);
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

/** Top 5 productos mas vendidos y menos vendidos**/
function openReportProductosMasMenosVendidos() {
    // Se establece la ruta del reporte en el servidor.
    let url = SERVER + `reportes/dashboard/productos_mas_menos_vendidos.php`;
    // Se abre el reporte en una nueva pestaña del navegador web.
    window.open(url);
}


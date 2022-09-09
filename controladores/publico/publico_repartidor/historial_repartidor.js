// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_HISTORIAL_REPARTIDOR = SERVER + 'publico/historial_repartidor.php?action=';

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
    readHistorialRepartidor();
});

// Función para llenar con los datos de los registros.
function readHistorialRepartidor() {
    fetch(API_HISTORIAL_REPARTIDOR + 'readAll', {
        method: 'get'
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
                // Se envían los datos a la función para llenar la tabla en la vista.
                fillTable(data);
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });

}



function fillTable(dataset) {
    //Declaramos variables
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        content += `
        <tr>
            <td data-target="Producto:">${row.nombre_producto}</td>
            <td data-target="Vendedor:"><br> ${row.nombre_vendedor}
            </td>
            <td data-target="Cliente:"><br> ${row.nombre_cliente}</td>
            <td data-target="Dirección:"><div class="row"><div class="col s12 offset-s1">${row.descripcion_direccion}</div></div></td>
            <td data-target="Fecha:">${row.fecha_compra}</td>
            <td data-target="Costo de envío:">$${row.costo_envio}</td>
         </tr>
        `;

    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-hist').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));


}

/** Top 10 clientes que se le haya hecho mas entregas**/
function openReport() {
    // Se establece la ruta del reporte en el servidor.
    let url = SERVER + `reportes/publico/clientes_mas_entregas.php`;
    // Se abre el reporte en una nueva pestaña del navegador web.
    window.open(url);
    
}


/** Top 10 clientes que se le haya hecho mas entregas**/
function openReportComent() {
    // Se establece la ruta del reporte en el servidor.
    let url = SERVER + `reportes/publico/coment_mejores.php`;
    // Se abre el reporte en una nueva pestaña del navegador web.
    window.open(url);
}



cordova.plugins.SitewaertsDocumentViewer.canViewDocument(
    SERVER + `reportes/publico/clientes_mas_entregas.php`, '', options, onPossible, onMissingApp, onImpossible, onError);
    var options = {
        title: STRING,
        documentView : {
            closeLabel : STRING
        },
        navigationView : {
            closeLabel : STRING
        },
        email : {
            enabled : BOOLEAN
        },
        print : {
            enabled : BOOLEAN
        },
        openWith : {
            enabled : BOOLEAN
        },
        bookmarks : {
            enabled : BOOLEAN
        },
        search : {
            enabled : BOOLEAN
        },
        autoClose: {
            onPause : BOOLEAN
        }
    }
    function onPossible(){
        window.console.log('document can be shown');
        //e.g. track document usage
      }

      function onMissingApp(appId, installer)
{
    if(confirm("Do you want to install the free PDF Viewer App "
            + appId + " for Android?"))
    {
        installer();
    }
}

function onImpossible(){
    window.console.log('document cannot be shown');
    //e.g. track document usage
  }

  function onError(error){
    window.console.log(error);
    alert("Sorry! Cannot show document.");
  }

  cordova.plugins.SitewaertsDocumentViewer.viewDocument(
    SERVER + `reportes/publico/clientes_mas_entregas.php`, mimeType, options, onShow, onClose, onMissingApp, onError, linkHandlers);

    function onShow(){
        window.console.log('document shown');
        //e.g. track document usage
      }

      function onClose(){
  window.console.log('document closed');
  //e.g. remove temp files
}


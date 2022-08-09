// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_CATEGORIA = SERVER + 'dashboard/administrar_categoria.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_CATEGORIA);
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
      dismissible: false,
      onOpenStart: function () {
        // Se restauran los elementos del formulario.
        document.getElementById("save-form").reset();
        document.getElementById("nombre_imagen").value = null;
      },
    };
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search').addEventListener('keyup', function (event) {
    const parameter = new FormData();
    parameter.append('search', document.getElementById('search').value); 
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_CATEGORIA + 'search', {
        method: 'post',
        body: parameter
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

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
      // Se establece un estado para el estado de la categoria.
      var estadoo;
      row.status_categoria ? (estadoo = "checked") : (estadoo = " ");
      // Se crean y concatenan las filas de la tabla con los datos de cada registro.
      content += `
        <tr>
            <td>${row.categoria}</td>
            <td><img src="${SERVER}imagenes/categoria/${row.imagen_categoria}"clas="materialboxed" height="100" width="100"></td>
            <td>
                <div class="switch">
                    <label>
                        <input type="checkbox" id="switch_estado${row.id_categoria_producto}" name="switch_estado" ${estadoo} onclick="update_status(${row.id_categoria_producto})">
                        <span class="lever"></span>
                    </label>
                </div>
            </td>
            <td data-target="Editar: "><a class="btn-flat boton_editar_tabl modal-trigger" href="#modal_editar_categ_o" onclick="openUpdate(${row.id_categoria_producto})"><i class=" material-icons small">edit</i></td>
        </tr>
      `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById("tbody-catego").innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
  }

  // Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document
.getElementById("save-form")
.addEventListener("submit", function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se define una variable para establecer la acción a realizar en la API.
  let action = "";
  // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
  saveRow(API_CATEGORIA, "create", "save-form", "modal_anadir_categ_oo");
});

// Función para preparar el formulario al momento de modificar un registro.
function openUpdate(id) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById("modal_editar_categ_o")).open();
    // Se establece el campo de archivo como opcional.
    document.getElementById("archivo_cate").required = false;
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append("id", id);
    // Petición para obtener los datos del registro solicitado.
    fetch(API_CATEGORIA + "readOne", {
      method: "post",
      body: data,
    }).then(function (request) {
      // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
      if (request.ok) {
        // Se obtiene la respuesta en formato JSON.
        request.json().then(function (response) {
          // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
          if (response.status) {
            // Se inicializan los campos del formulario con los datos del registro seleccionado.
            document.getElementById("id").value = response.dataset.id_categoria_producto;
            document.getElementById("nombre_cate").value = response.dataset.categoria;
            document.getElementById("categoria-picA").setAttribute('src', SERVER + 'imagenes/categoria/' +  response.dataset.imagen_categoria);

           
            // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
            M.updateTextFields();
          } else {
            sweetAlert(2, response.exception, null);
          }
        });
      } else {
        console.log(request.status + " " + request.statusText);
      }
    });
}
  
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document
  .getElementById("update-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    saveRow(API_CATEGORIA, "updateCa", "update-form", "modal_editar_categ_o");
    // }
  });

function update_status(id) {
    var estado_cate = false;
    if(document.getElementById('switch_estado' + id).checked == true){
        estado_cate = true;
    }
    var data = new FormData();
    data.append("id", id);
    data.append("estado", estado_cate);
    fetch(API_CATEGORIA + 'updateEstado', {
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
                    readRows(API_CATEGORIA);
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

//Función para previsualizar un producto (se ocupo solo para actualizar)
function leerImg(input, img_destino)
{
    //Se obtiene los archivos del input
    let archivos = input.files;
    //Se verifica si está vacío
    if (!archivos || !archivos.length) { 
        img_destino.src = "../../recursos/img/publico/sin.png";
        return;
    }
    //
    const visualizar = archivos[0];
    const url = URL.createObjectURL(visualizar);
    img_destino.src = url;
}

//Función para previsualizar un producto (se ocupo solo para agregar)
function leerImgCreate(input, img_destino)
{
    //Se obtiene los archivos del input
    let archivos = input.files;
    //Se verifica si está vacío
    if (!archivos || !archivos.length) { 
        img_destino.src = "../../recursos/img/publico/sin.png";
        return;
    }
    //
    const visualizar = archivos[0];
    const url = URL.createObjectURL(visualizar);
    img_destino.src = url;
}
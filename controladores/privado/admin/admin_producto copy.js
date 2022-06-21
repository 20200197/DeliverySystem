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
});


// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        //Establecemos texto para el estado
        var estado_producto;
        (row.estado_producto) ? estado_producto = 'Activo' : estado_producto = 'Inactivo';
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
          <td data-target="Dar de baja: "><button class="btn-flat boton_eliminar_tabl modal-trigger" onclick="openUpdate(${row.id_producto})" ><i
          class="material-icons small">delete</i></button></td>
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

//Función para abrir modal de actualizar
function openUpdate(id) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('update-modal')).open();
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PRODUCTOS + 'readOne', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    document.getElementById('id').value = response.dataset.id_producto;
                    if (response.dataset.estado_producto == true) {
                        document.getElementById('estado_producto').checked = true;
                        document.getElementById('imagen_E').setAttribute('src', '../../../recursos/img/privado/admin/modals/Check Circle_80px.png');
                        document.getElementById('titulo_E').textContent = 'Activar'
                        document.getElementById('texto_E').textContent = '¿Está seguro de activar este producto?'
                    } else {
                        document.getElementById('estado_producto').checked = false;
                        document.getElementById('imagen_E').setAttribute('src', '../../../recursos/img/privado/admin/modals/alvertencia.png');
                        document.getElementById('titulo_E').textContent = 'Advertencia'
                        document.getElementById('texto_E').textContent = '¿Está seguro de dar de baja este producto?'
                    }
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });

}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById('update-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    //Evaluamos si se quiere activar o dar de baja
    if (document.getElementById('estado_producto').checked == true) {
        document.getElementById('estado_producto').checked = false;
    } else {
        document.getElementById('estado_producto').checked = true;
    }

    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(API_PRODUCTOS, 'update', 'update-form', 'update-modal');
});


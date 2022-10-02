// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_ENTREGA = SERVER + 'dashboard/administrar_entrega.php?action=';
const API_ENTREGAFAC = SERVER + 'dashboard/administrar_entrega.php?action=readFac';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    //Se ejecuta el método de inactividad
    actividad();
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_ENTREGA);
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false
    }

    let opciones = {
        format: 'yyyy' + '-' + 'mm' + '-' + 'dd'
    }
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Datepicker.init(document.querySelectorAll('.datepicker'), opciones);
});


// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se establece un estado para el estado del producto.
        var estadoo;
        (row.estado_empleado) ? estadoo = 'Activo' : estadoo = 'Inactivo';

        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
        content += `
        <tr>
          <td data-target="Nombre producto: ">${row.nombre_producto}</td>
          <td data-target="Nombre cliente: ">${row.nombre_cliente}</td>
          <td data-target="Nombre repartidor: ">${row.nombre_repartidor}</td>
          <td data-target="Fecha envío: ">${row.fecha_envio == null ? 'Sin asignar' : row.fecha_envio}</td>
        </tr>
      `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-entrega').innerHTML = content;
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
    fetch(API_ENTREGA + 'search', {
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
                    readRows(API_ENTREGA);
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

function openRepartidoresAvaible() {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById("asignarentrega-modal")).open();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_ENTREGA + "readRepartidorAvaible", {
        method: "get",
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {

                    let content = '';
                    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        if (row.id_repartidor != null) {


                            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                            //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
                            content += `
                            <tr>
                            <td data-target="Nombre repartidor: ">${row.nombre_repartidor}</td>
                            <td data-target="Asignar entrega: "><a class="btn flat blue" onclick="openOpciones(${row.id_repartidor})"><i class="material-icons">assignment_turned_in</a></td>
                            </tr>
                        `;
                        }
                    });
                    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                    document.getElementById('tbody-asignarentrega').innerHTML = content;
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



function openPickOp(id_repartidor, id_factura, id_detalle) {
    console.log(id_repartidor);
    var date = new Date();
    var month = pad2(date.getMonth() + 1);//months (0-11)
    var day = pad2(date.getDate());//day (1-31)
    var year = date.getFullYear();

    var formattedDate = year + "-" + month + "-" + day;
    Swal.fire({
        title: 'Selecciona la fecha de reparto',
        html: '<input type="text" class="datepicker" id="pk" >',
        showCancelButton: true,
        didOpen: function () {
            let opciones = {
                format: 'yyyy' + '-' + 'mm' + '-' + 'dd',
                minDate: new Date()
            }
            M.Datepicker.init(document.querySelectorAll('.datepicker'), opciones);
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(formatDate(document.getElementById("pk").value));
            chngPk(id_repartidor, id_detalle, id_factura, formatDate(document.getElementById("pk").value));
        }
    });
}
function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}
var date = new Date();
var month = pad2(date.getMonth() + 1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year = date.getFullYear();

var formattedDate = year + "-" + month + "-" + day;





function formatDate(date) {
    var dat = date;
    month = dat.substr(5, 2),
        day = dat.substr(8, 2),
        year = dat.substr(0, 4);


    return [year, month, day].join('-');
}

function chngPk(id_repartidor, id_detalle, id_factura, fecha_reparto) {
    const data = new FormData();
    data.append("id_repartidor", id_repartidor);
    data.append("id_detalle", id_detalle);
    data.append("id_factura", id_factura);
    data.append("fecha_reparto", fecha_reparto);
    fetch(API_ENTREGA + 'updatePk', {
        method: "post",
        body: data,
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {

                    sweetAlert(1, response.message, null);
                    M.Modal.getInstance(document.getElementById("productosentrega-modal")).close();
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}


function openOpciones(id_repartidor) {
    // M.Modal.getInstance(document.getElementById("parametro-modal")).open();
    //Cargamos el select
    fetch(API_ENTREGA + "readFac", {
        method: "get",
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                let content = "";
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Si no existe un valor para seleccionar, se muestra una opción para indicarlo.
                    if (!null) {
                        content += "<option disabled selected>Seleccione una opción</option>";
                    }
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        if (row.id_factura != null) {

                            // Se obtiene el dato del primer campo de la sentencia SQL (valor para cada opción).
                            value = Object.values(row)[0];
                            // Se obtiene el dato del segundo campo de la sentencia SQL (texto para cada opción).
                            text = Object.values(row)[1];
                            // Se verifica si el valor de la API es diferente al valor seleccionado para enlistar una opción, de lo contrario se establece la opción como seleccionada.
                            if (value != null) {
                                content += `<option value="${value}">${value}</option>`;
                            } else {
                                content += `<option value="${value}" selected>${value}</option>`;
                            }
                        }

                    });
                } else {
                    content += "<option>No hay opciones disponibles</option>";
                }
                // Se agregan las opciones a la etiqueta select mediante su id.
                document.getElementById("fac").innerHTML = content;
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
    openFac(id_repartidor);
}

function openFac(id_repartidor) {


    Swal.fire({
        title: "Selecciona la factura que desea entregar",
        html: '<div class="input-field"><select class="browser-default" id="fac" name="fac" required> </select></div>',
        showCancelButton: true,
    }).then(function (value) {
        if (value.isDismissed) {

        } else if (value == 'Seleccione una opción') {
            sweetAlert(2, 'Seleccione una opción', null);
        } else {
            //Obtenemos la opcion seleccinada
            var selectedOption = document.getElementById("fac").options[document.getElementById("fac").selectedIndex].value;
            console.log(selectedOption);
            openFacT(selectedOption, id_repartidor);
        }
    });

}

function openFacT(id, id_repartidor) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById("productosentrega-modal")).open();
    M.Modal.getInstance(document.getElementById("asignarentrega-modal")).close();
    const data = new FormData();
    data.append("id_tt", id);
    // Petición para obtener los datos del registro solicitado.
    fetch(API_ENTREGA + "readProductosEntrega", {
        method: "post",
        body: data,
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {

                    let content = '';
                    let contenido = '';
                    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                        //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
                        var fecha_envio;
                        if (row.fecha_envio == null) {
                            fecha_envio = 'Sin asignar'
                        } else {
                            fecha_envio = row.fecha_envio;
                        }
                        
                        content += `
                        <tr>
                        <td data-target="Nombre producto: ">${row.nombre_producto}</td>
                        <td data-target="Cantidad pedido: ">${row.cantidad_pedido}</td>
                        <td data-target="Precio: ">${row.precio}</td>
                        <td data-target="Fecha envío: ">${fecha_envio}</td>
                     
                        </tr>
                    `;

                   

                    });
 
                    console.log(id+'adkj');
                    contenido += `
                   
                <a class="btn flat blue right-align" onclick="openPickOp(${id_repartidor},${id},${response.dataset.id_detalle})" id="botonAB${id}"><i class="material-icons">av_timer</a>
               
                `;
                    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                    document.getElementById('tbody-productosentrega').innerHTML = content;
                    document.getElementById('boton').innerHTML = contenido;
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
//Se crea la constante de la api
const API_PAQUETES = SERVER + "publico/paquetes_pendientes.php?action=";

//Método que carga los datos cuando se inicia la página
document.addEventListener("DOMContentLoaded", function () {
    //Se cargan los datos en la vista
    readRows(API_PAQUETES);
});

function fillTable(dataset) {
    let content = [];
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
        <tr>
            <td data-target="Nombre del cliente:">
            ${row.nombre}
            </td>
            <td data-target="Contacto: ">
                <div class="input-field  col l12 m6 s12 valign-wrapper">
                    <i class="material-icons blue-text text-accent-2">local_phone</i>
                    <span>${row.telefono_cliente}</span>
                </div>
                <div class="input-field col l12 m6 s12 valign-wrapper">
                    <i class="material-icons blue-text text-accent-2">email</i>
                    <span>${row.correo_cliente}</span>
                </div>
            </td>
            <td data-target="Dirección y punto de referencia: ">
            <div class="input-field col l12 m6 s6 valign-wrapper ">
            <i class="material-icons blue-text text-accent-2 tooltipped" data-position="right" data-tooltip="Dirección">location_on</i>
            <span>${row.descripcion_direccion}</span>
        </div>
        <div class="input-field col l12 m6 s6 valign-wrapper ">
            <i class="material-icons blue-text text-accent-2 tooltipped" data-position="right" data-tooltip="Punto de referencia">map</i>
            <span>${row.punto_referencia}</span>
        </div>
            </td>
            <td data-target="Productos: "> <a href="#modal_info" class="waves-effect waves-light modal-trigger" onClick="cargar_productos(${row.id_factura})"><i class="material-icons blue-text text-accent-2 center-align">remove_red_eye</i></a></td>
            <td data-target="Total: ">$${row.total}</td>
            <td data-target="Opciones: ">
                <a class="btn ${row.id_status == 3 ? 'green accent-4' : row.id_status == 4 ? 'grey lighten-1' : ' blue accent-2'} tooltipped" data-position="right" data-tooltip="Entregar" onClick="entregar(${row.id_factura},${row.id_status})"><i class="material-icons">assignment_turned_in</i></a>
                <a class="btn ${row.id_status == 3 ? 'grey lighten-1' : row.id_status == 4 ? 'red darken-2' : ' blue accent-2'} tooltipped" data-position="right" data-tooltip="Cancelar" onClick="cancelar(${row.id_factura},${row.id_status})"><i class="material-icons">assignment_returned</i></a>
            </td>
        </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById("contenido").innerHTML = content;
    //Se reactiva los tooltiped
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}


//Función para cambiar el estado de los productos a entregado

function entregar(id, estado) {
    //Se verifica el estado del pedido y se notifica si es posible la acción o no
    if (estado == 3) {
        sweetAlert(3, 'Ya se ha entregado.', null);
    } else if (estado == 4) {
        sweetAlert(3, 'El pedido ha sido cancelado, no se puede entregar.', null);
    } else {
        //Se crear una variable de tipo form
        let datos = new FormData();
        datos.append('identificador', id);
                //Se realiza la confirmación antes de proceder
                Swal.fire({
                    title: "Advertencia",
                    text: "¿Desea marcar como entregado el pedido?",
                    icon: "warning",
                    confirmButtonText: "Aceptar",
                    denyButtonText: "Cancelar",
                    showDenyButton: true,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                }).then((result) => {
                    // Se comprueba la elección del usuarios
                    if (result.isConfirmed) {
                        //Se crea la petición
                        fetch(API_PAQUETES + 'entregar', {
                            method: 'post',
                            body: datos,
                        }).then(function (request) {
                            //Se verifica si se logró llegar a la api
                            if (request) {
                                //Se convierte a JSON
                                request.json().then(function (response) {
                                    //Se verifica el estado de la ejecución
                                    if (response.status) {
                                        //Se cargan los datos en la vista
                                        readRows(API_PAQUETES);
                                        //Se confirma el proceso completado
                                        sweetAlert(1, response.message, null);
                                    } else {
                                        //Se le indica el error
                                        sweetAlert(2, response.exception, null);
                                    }
                                })
                            } else {
                                //Se notifica por medio de la consola
                                console.log(request.status + " " + request.statusText);
                            }
                        })
                    }
                })
    }
}

function cancelar(id, estado) {
    //Se verifica el estado del pedido y se notifica si es posible la acción o no
    if (estado == 3) {
        sweetAlert(3, 'El pedido ha sido entregado, no se puede cancelar.', null);
    } else if (estado == 4) {
        sweetAlert(3, 'Ya se ha cancelado.', null);
    } else {
        //Se crear una variable de tipo form
        let datos = new FormData();
        datos.append('identificador', id);
        //Se realiza la confirmación antes de proceder
        Swal.fire({
            title: "Advertencia",
            text: "¿Desea cancelar el pedido?",
            icon: "warning",
            confirmButtonText: "Aceptar",
            denyButtonText: "Cancelar",
            showDenyButton: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
        }).then((result) => {
            // Se comprueba la elección del usuarios
            if (result.isConfirmed) {
                //Se crea la petición
                fetch(API_PAQUETES + 'cancelar', {
                    method: 'post',
                    body: datos,
                }).then(function (request) {
                    //Se verifica si se logró llegar a la api
                    if (request) {
                        //Se convierte a JSON
                        request.json().then(function (response) {
                            //Se verifica el estado de la ejecución
                            if (response.status) {
                                //Se cargan los datos en la vista
                                readRows(API_PAQUETES);
                                //Se confirma el proceso completado
                                sweetAlert(1, response.message, null);
                            } else {
                                //Se le indica el error
                                sweetAlert(2, response.exception, null);
                            }
                        })
                    } else {
                        //Se notifica por medio de la consola
                        console.log(request.status + " " + request.statusText);
                    }
                })
            }
        })
        
    }
}


//Función para cargar el detalle de productos
function cargar_productos(id) {

}

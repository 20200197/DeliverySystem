//Se crea la constante de la api
const API_DETALLE = SERVER + "publico/cliente_detalle.php?action=";

//Método que carga los datos cuando se inicia la página
document.addEventListener("DOMContentLoaded", function () {
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = 1; //params.get("id");
    //Se crea y llena una variable de tipo formulario
    let datos = new FormData();
    datos.append("identificador", ID); //datos.append("identificador", ID);
    //Se cargan los datos en la vista
    fetch(API_DETALLE + "cargarDetalle", {
        method: "post",
        body: datos,
    }).then(function (request) {
        //Se verifica si se logró ejecutar la sentencia
        if (request.ok) {
            //Se convierte en formato JSON
            request.json().then(function (response) {
                //Se revisa el estado de la respuesta
                if (response.status) {
                    //Se extrae el dataset y se envia a llenar
                    fillTable(response.dataset);
                    //Se carga la opción para valorar al repartidor
                    document.getElementById("contenedorValoracionRepartidor").innerHTML = `
                    <a class="btn-floating btn-large red" id="valorar_repartidor"
                    onclick="cargarRepartidor(${ID})">
                        <i class="large material-icons">mode_edit</i>
                    </a>
                    `;
                } else {
                    //Se le notifica al usuario del problema
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            //Se imprime en la consola el problema
        }
    });
});

function fillTable(dataset) {
    let content = [];
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
            <tr class="row valign-wrapper">
                <td class="col l2 sin-margen">
                    <img class="responsive-img" src="../../../api/imagenes/productos/${row.imagen}" alt="">
                </td>
                <td data-target="Nombre producto: " class="col l3 sin-margen">${row.nombre_producto}</td>
                <td data-target="Precio: " class="col l1 sin-margen">$${row.precio}</td>
                <td data-target="Cantidad: " class="col l1 sin-margen">${row.cantidad_pedido}</td>
                <td data-target="Subtotal: " class="col l1 sin-margen">$${row.subtotal}</td>
                <td data-target="Estado: " class="col l1 sin-margen">${row.status_producto ? "Disponible" : "No disponible"
            }</td>
                <td data-target="Fecha: " class="col l1 sin-margen">${row.fecha_compra}</td>
                <td data-target="Valoración: " class="col l2 sin-margen">
                    <a class="waves-effect waves-light btn white-text" onclick="cargarProducto(${row.id_detalle
            })"><i class="material-icons left">stars</i>Valorar</a>
                    <a class="waves-effect waves-light btn white-text" onclick="pedir(${row.id_detalle})"><i class="material-icons left">stars</i>Pedir</a>
                </td>
            </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById("contenido").innerHTML = content;
}

//Función para cargar los datos del repartidor
function cargarRepartidor(id) {
    //Se crea una variable de tipo de form
    let datos = new FormData();
    datos.append("identificador", id);
    //Se realiza la petición
    fetch(API_DETALLE + "cargarRepartidor", {
        method: "post",
        body: datos,
    }).then(function (request) {
        //Se verifica si la ejecución fue existosa
        if (request.ok) {
            //Se pasa a JSON
            request.json().then(function (response) {
                //Se verifica el estado obtenido por la api
                if (response.status == 3) {
                    //Se le muestra la advertencia
                    sweetAlert(3, response.exception, null);
                } else if (response.status) {
                    //Se colocan los datos en el modal
                    document.getElementById("nombreRepartidor").innerHTML = response.dataset.nombre;
                    document.getElementById("fotoRepartidor").src =
                        "../../../api/imagenes/repartidor/foto_repartidor/" + response.dataset.foto_repartidor;
                    document.getElementById("identificadorRepartidor").value = response.dataset.id_repartidor;
                    //Se agrega las opciones de valoración por estrellas
                    document.getElementById("estrellas_repartidor").innerHTML = ` 
                    <input id="star1" name="estrellas" type="radio" value="5" />
                                    <label for="star1"><i class="material-icons estrella">star</i></label>
                                    <input id="star2" name="estrellas" type="radio" value="4" />
                                    <label for="star2"><i class="material-icons estrella">star</i></label>
                                    <input id="star3" name="estrellas" type="radio" value="3" />
                                    <label for="star3"><i class="material-icons estrella">star</i></label>
                                    <input id="star4" name="estrellas" type="radio" value="2" />
                                    <label for="star4"><i class="material-icons estrella">star</i></label>
                                    <input id="star5" name="estrellas" type="radio" value="1" />
                                    <label for="star5"><i class="material-icons estrella">star</i></label>
                                    <input id="star0" name="estrellas" type="radio" value="0" class="hide"
                                        checked />`;
                    //Se abre el formulario con los datos ya cargados
                    M.Modal.getInstance(document.getElementById("repartidor")).open();
                } else {
                    //Se le muestra el error
                    sweetAlert(2, response.exception, null);
                    //Se cierra el modal
                    M.Modal.getInstance(document.getElementById("repartidor")).close();
                }
            });
        } else {
            //Se imprime el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}

//método para valorar al vendedor
document.getElementById("formularioRepartidor").addEventListener("submit", function (event) {
    //Se detiene la recarga de la página
    event.preventDefault();
    //Se revisa que los datos requeridos estén llenos
    if (
        document.querySelector(`input[name=estrellas]:checked`).value != 0 &&
        document.getElementById(`valoracionRepartidor`).value.trim().length != 0
    ) {
        //Se realiza la petición
        fetch(API_DETALLE + "valorarRepartidor", {
            method: "post",
            body: new FormData(document.getElementById("formularioRepartidor")),
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        // Se cierra la caja de dialogo (modal) del formulario.
                        M.Modal.getInstance(document.getElementById("repartidor")).close();
                        // Se cargan nuevamente las filas en la tabla de la vista después de guardar un registro y se muestra un mensaje de éxito.
                        sweetAlert(1, response.message, null);
                        //Se elimina la opción para valorar
                        document.getElementById("valoracionProducto").innerHTML = "";
                    } else {
                        sweetAlert(2, response.exception, null);
                    }
                });
            } else {
                console.log(request.status + " " + request.statusText);
            }
        });
    } else {
        //Se le notifica al usuario que debe llenar los campos
        sweetAlert(3, "Debes llenar todos los campos", null);
    }
});

//método para valorar al producto
document.getElementById("formularioProducto").addEventListener("submit", function (event) {
    //Se detiene la recarga de la página
    event.preventDefault();
    //Se revisa que los datos requeridos estén llenos
    if (
        document.querySelector('input[name=estrellas]:checked').value != 0 &&
        document.getElementById('valoracionProducto').value.trim().length != 0
    ) {
        //Se realiza la petición
        fetch(API_DETALLE + "valorarProducto", {
            method: "post",
            body: new FormData(document.getElementById("formularioProducto")),
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        // Se cierra la caja de dialogo (modal) del formulario.
                        M.Modal.getInstance(document.getElementById("producto")).close();
                        // Se cargan nuevamente las filas en la tabla de la vista después de guardar un registro y se muestra un mensaje de éxito.
                        sweetAlert(1, response.message, null);
                    } else {
                        sweetAlert(2, response.exception, null);
                    }
                });
            } else {
                console.log(request.status + " " + request.statusText);
            }
        });
    } else {
        //Se le notifica al usuario que debe llenar los campos
        sweetAlert(3, "Debes llenar todos los campos", null);
    }
});

//Función para cargar los datos del producto a valorar

function cargarProducto(id) {
    //Se crea una variable para guardar el id
    let datos = new FormData();
    datos.append("identificador", id);
    //Se realiza la petición
    fetch(API_DETALLE + "cargarDatosProducto", {
        method: "post",
        body: datos,
    }).then(function (request) {
        //Se revisa el estado de la ejecución
        if (request.ok) {
            //Se pasa a json
            request.json().then(function (response) {
                //Se revisa el estado devuelto por la api
                if (response.status == 3) {
                    //Se le muestra al usuario la advertencia
                    sweetAlert(3, response.exception, null);
                } else if (response.status) {
                    //Se empiezan a cargar los datos en el modal
                    document.getElementById("nombreProducto").innerHTML = response.dataset.nombre_producto;
                    document.getElementById("fotoProducto").src =
                        "../../../api/imagenes/productos/" + response.dataset.imagen;
                    document.getElementById("identificadorDetalle").value = id;
                    //Se agrega las opciones de valoración por estrellas
                    document.getElementById("estrellas_producto").innerHTML = ` 
                    <input id="star1" name="estrellas" type="radio" value="5" />
                                    <label for="star1"><i class="material-icons estrella">star</i></label>
                                    <input id="star2" name="estrellas" type="radio" value="4" />
                                    <label for="star2"><i class="material-icons estrella">star</i></label>
                                    <input id="star3" name="estrellas" type="radio" value="3" />
                                    <label for="star3"><i class="material-icons estrella">star</i></label>
                                    <input id="star4" name="estrellas" type="radio" value="2" />
                                    <label for="star4"><i class="material-icons estrella">star</i></label>
                                    <input id="star5" name="estrellas" type="radio" value="1" />
                                    <label for="star5"><i class="material-icons estrella">star</i></label>
                                    <input id="star0" name="estrellas" type="radio" value="0" class="hide"
                                        checked />`;
                    //Se abre el formulario con los datos ya cargados
                    M.Modal.getInstance(document.getElementById("producto")).open();
                } else {
                    //Se muestra el error
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            //Se imprime el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Función para cargar los datos del producto para volver a pedir
function pedir(id) {
    //Se crea una variable para guardar el id del producto
    let datos = new FormData();
    datos.append("identificador", id);
    //Se realiza la petición para obtener los datos
    fetch(API_DETALLE + "cargarDatosProductoPedir", {
        method: 'post',
        body: datos,
    }).then(function (request) {
        //Se revisa la ejecución 
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function (response) {
                //Se revisa el estado devuelto por la API
                if (response.status) {
                    //Se cargan los datos en el modal
                    document.getElementById("identificadorPedir").value = response.dataset.id_producto;
                    document.getElementById("nombreProductoPedir").innerHTML = response.dataset.nombre_producto;
                    document.getElementById("fotoProductoPedir").src =
                        "../../../api/imagenes/productos/" + response.dataset.imagen;
                    //Se abre el formulario con los datos ya cargados
                    M.Modal.getInstance(document.getElementById("pedir")).open();
                } else {
                    //Se muestra el error
                    sweetAlert(2, response.exception, null);
                }
            })
        } else {
            //Se imprime el error en la consola
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

//Método para pedir productos
document.getElementById("formularioProductoPedir").addEventListener('submit', function (event) {
    //Se previene la recarga de la página
    event.preventDefault();
    //Se verifica que la cantidad sea mayor a 0
    if (document.getElementById("cantidadPeticion").value <= 0) {
        //Se notifica del problema
        sweetAlert(3, 'La cantidad debe ser mayor a 0', null);
    } else {
        //Se realiza la petición
        fetch(API_DETALLE + "addCart", {
            method: "post",
            body: new FormData(document.getElementById("formularioProductoPedir")),
        }).then(function (request) {
            //Se revisa el estado de la ejecución
            if (request.ok) {
                //Se pasa a JSON
                request.json().then(function (response) {
                    //Se verifica el estado devuelto de la API
                    if (response.status) {
                        //Se muestra la confirmación
                        sweetAlert(1, response.message, null);
                        //Se cierra el modal
                        M.Modal.getInstance(document.getElementById("pedir")).close();
                    } else {
                        //Se muestra el error
                        sweetAlert(2, response.exception, null);
                    }
                });
            } else {
                //Se imprime el error en la consola
                console.log(request.status + " " + request.statusText);
            }
        });
    }

});

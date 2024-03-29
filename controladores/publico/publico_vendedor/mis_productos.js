//Se crea la constante de la api
const API_PRODUCTOS = SERVER + "publico/mis_productos.php?action=";
const API_CATEGORIA = SERVER + 'publico/categoria.php?action=';

//Método que carga los datos cuando se inicia la página

document.addEventListener("DOMContentLoaded", function () {
    fetch(API_PRODUCTOS + "readAll", {
        method: "get",
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
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
                fillTable(data);
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
});

function fillTable(dataset) {
    let content = [];
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se establece un estado para el estado del producto.
        var estadoo;
        row.estado_empleado ? (estadoo = "Activo") : (estadoo = "Inactivo");
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
        content += `
        <div class="col s12 m12 l12">
        <div class="card  ">
            <div class="card-content ">
                <div class="row sin-margen">
                    <div class="col s12 m12 l4 center">
                        <img src="../../../api/imagenes/productos/${row.imagen}"
                            class="responsive-img">
                    </div>
                    <div class="col l8 m12 s12">
                        <div class="col s12 m12 l12 center-align">
                            <h5>${row.nombre_producto}</h5>
                        </div>
                        <div class="col s12 m12 l12 center-align">
                            <p>${row.descripcion_producto}.</p>
                        </div>
                        <div class="col s6 m6 l6 center-align">
                            <h6>Cantidad:</h6>
                            <p>${row.cantidad_producto}</p>
                        </div>
                        <div class="col s6 m6 l6 center-align">
                            <h6>Precio:</h6>
                            <p>$${row.precio_producto}</p>
                        </div>
                        <div class="col s12 m6 l6 center-align input-field">
                            <a onclick="eliminar(${row.id_producto})" class="btn-small modal-trigger red darken-4 white-text"
                            href="#modal_eliminar_produ"><i
                            class="material-icons left white-text">delete</i>Eliminar</a>
                        </div>
                        <div class="col s12 m6 l6 center-align input-field">
                            <a class="btn-small blue accent-2 modal-trigger white-text"
                            href="#modal_editar_producto"  onclick="cargar_editar(${row.id_producto})"><i
                            class="material-icons left white-text">edit</i>Editar</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
      `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById("contenido").innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
}

//Método que preparará los datos para agregar los productos
document.getElementById("boton_agregar_producto").addEventListener("click", function () {
    //Se cargan los datos en los select
    fillSelect(API_PRODUCTOS + "categoria", "categoriaA", null);
    fillSelect(API_PRODUCTOS + "marca", "marcaA", null);
});

//Método que ejecutará el guardado de productos
document.getElementById("guardarProducto").addEventListener("submit", function (event) {
    //Se previene la recarga de la página
    event.preventDefault();
    //Se revisa que los select y la imagen hayan sido cargados
    if (
        document.getElementById("categoriaA").value == "Seleccione una opción" ||
        document.getElementById("marcaA").value == "Seleccione una opción"
    ) {
        sweetAlert(3, "Existen campos desplegables sin seleccionar");
    } else {
        //Se procede a ejecutar el método que creará el nuevo registro
        saveRow(API_PRODUCTOS, "guardar", "guardarProducto", "modal_agregar_producto");
        //Se limpian los campos del formulario
        document.getElementById("guardarProducto").reset();
    }
});

//Función que cargar los datos en el modal de editar
function cargar_editar(id) {
    //Se crea una variable de tipo formulario
    let datos = new FormData();
    datos.append("identificador", id);
    //Se realiza la petición para cargar los datos
    fetch(API_PRODUCTOS + "individual", {
        method: "post",
        body: datos,
    }).then(function (request) {
        //Se revisa si se ejecutó la sentencia
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function (response) {
                //Se verifica el estado de la respuesta
                if (response.status) {
                    //Se llenan los campos del modal para editar
                    document.getElementById("identificador").value = response.dataset.id_producto;
                    document.getElementById("nombre_productoM").value = response.dataset.nombre_producto;
                    document.getElementById("cantidad_productoM").value = "0";
                    document.getElementById("precio_productoM").value = response.dataset.precio_producto;
                    document.getElementById("descripcion_productoM").value = response.dataset.descripcion_producto;
                    document.getElementById("cantidad_actual").innerHTML =
                        "Cantidad: Actual (" + response.dataset.cantidad_producto + ")";
                    document.getElementById("imagenM").src =
                        "../../../api/imagenes/productos/" + response.dataset.imagen;
                    //Se llenan los select
                    fillSelect(API_PRODUCTOS + "categoria", "categoriaM", response.dataset.id_categoria);
                    fillSelect(API_PRODUCTOS + "marca", "marcaM", response.dataset.id_marca);
                } else {
                    //Se le notifica el usuario del problema
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            //Se devuelve el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Método que ejecutará la edición de producto de productos
document.getElementById("editarProducto").addEventListener("submit", function (event) {
    //Se previene la recarga de la página
    event.preventDefault();
    //Se crea una variable de tipo formulario
    let datos = new FormData();
    //Se verifica si se está sumando o restando
    if (document.querySelector("input[name=opciones]:checked").value == "2") {
        //Se agrega el id del producto
        datos.append("identificador", document.getElementById("identificador").value);
        //Se realiza la petición para saber la cantidad actual
        fetch(API_PRODUCTOS + "cantidadActual", {
            method: "post",
            body: datos,
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    let data = [];
                    // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        //Se compara si lo obtenido es posible restarlo
                        if (
                            response.dataset.cantidad_producto - document.getElementById("cantidad_productoM").value >=
                            0
                        ) {
                            //Se procede a ejecutar el método que actualizará el registro
                            saveRow(API_PRODUCTOS, "actualizarProducto", "editarProducto", "modal_editar_producto");
                            //Se limpian los campos del formulario
                            document.getElementById("guardarProducto").reset();
                        } else {
                            sweetAlert(3, "La cantidad a disminuir debe ser inferior", null);
                        }
                    } else {
                        sweetAlert(2, response.exception, null);
                        return "problema";
                    }
                });
            } else {
                console.log(request.status + " " + request.statusText);
            }
        });
    } else {
        //Se procede a ejecutar el método que actualizará el registro
        saveRow(API_PRODUCTOS, "actualizarProducto", "editarProducto", "modal_editar_producto");
        //Se limpian los campos del formulario
        document.getElementById("guardarProducto").reset();
    }
});

//Función que elimina los productos
function eliminar(id) {
    //Se crea una variable de tipo formulario
    let datos = new FormData();
    datos.append("identificador", id);
    //Se ejecuta el método para eliminar, está en componentes.js
    confirmDelete(API_PRODUCTOS, datos);
}

//Función para previsualizar un producto
function leerImg(input, img_destino) {
    //Se obtiene los archivos del input
    let archivos = input.files;
    //Se verifica si está vacío
    if (!archivos || !archivos.length) {
        img_destino.src = "../../recursos/img/publico/sin.png";
        return;
    }
    //Carga la imagen
    const visualizar = archivos[0];
    const url = URL.createObjectURL(visualizar);
    img_destino.src = url;
}

//Cargmo opciones de las categorias en el select para los reportes
function openOpciones() {
    // M.Modal.getInstance(document.getElementById("parametro-modal")).open();
    //Cargamos el select
    fetch(API_CATEGORIA + "readAll", {
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
                        // Se obtiene el dato del primer campo de la sentencia SQL (valor para cada opción).
                        value = Object.values(row)[0];
                        // Se obtiene el dato del segundo campo de la sentencia SQL (texto para cada opción).
                        text = Object.values(row)[1];
                        // Se verifica si el valor de la API es diferente al valor seleccionado para enlistar una opción, de lo contrario se establece la opción como seleccionada.
                        if (value != null) {
                            content += `<option value="${value}">${text}</option>`;
                        } else {
                            content += `<option value="${value}" selected>${text}</option>`;
                        }
                    });
                } else {
                    content += "<option>No hay opciones disponibles</option>";
                }
                // Se agregan las opciones a la etiqueta select mediante su id.
                document.getElementById("opciones_categoriaa").innerHTML = content;
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
    openParametro();
}

//Función para abriri parametro para reporte
function openParametro() {
    Swal.fire({
        title: "Selecciona la categoria",
        html: '<div class="input-field"><select class="browser-default" id="opciones_categoriaa" name="opciones_categoriaa" required> </select></div>',
        showCancelButton: true,
    }).then(function (value) {
        if (value.isDismissed) {

        } else if (value == 'Seleccione una opción') {

        } else {
            //Obtenemos la opcion seleccinada
            var selectedOption =
                document.getElementById("opciones_categoriaa").options[
                document.getElementById("opciones_categoriaa").selectedIndex
                ];
            console.log(selectedOption.text);
            openReport(selectedOption.text);
        }
    });

}

// Función para abrir reporte de gastos por cliente
function openReport(categoria) {
    // Se establece la ruta del reporte en el servidor.
    let url = SERVER + `reportes/publico/productos_categoria.php?categoria=${categoria}`;
    // Se abre el reporte en una nueva pestaña del navegador web.
    window.open(url);
    // Se define un objeto con los datos del registro seleccionado.
    // const data = new FormData();
    // data.append("categoriaN", categoria);
    // request.send(data);
}

function cargarEstrellas() {
    document.getElementById("estrellas_producto1").innerHTML = ` 
                    <input id="star1-1" name="estrellas" type="radio" value="5" />
                                    <label onclick="asignValue(5)" for="star1-1"><i class="material-icons medium estrella">star</i></label>
                                    <input id="star2-1" name="estrellas" type="radio" value="4" />
                                    <label onclick="asignValue(4)" for="star2-1"><i class="material-icons medium estrella">star</i></label>
                                    <input id="star3-1" name="estrellas" type="radio" value="3" />
                                    <label onclick="asignValue(3)" for="star3-1"><i class="material-icons medium estrella">star</i></label>
                                    <input id="star4-1" name="estrellas" type="radio" value="2" />
                                    <label onclick="asignValue(2)" for="star4-1"><i class="material-icons medium estrella">star</i></label>
                                    <input id="star5-1" name="estrellas" type="radio" value="1" />
                                    <label onclick="asignValue(1)" for="star5-1"><i class="material-icons medium estrella">star</i></label>
                                    <input id="star0-1" name="estrellas" type="radio" value="0" class="hide"
                                        checked />`;
}

var valueStar = 0;
function asignValue(value) {
    valueStar = value;
}

function openReportStar() {
    let url = SERVER + `reportes/publico/top_valoracion.php?stars=${valueStar}`;

    window.open(url);
}
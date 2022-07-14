//Se crea la constante de la api
const API_PRODUCTOS = SERVER + "publico/mis_productos.php?action=";

//Método que carga los datos cuando se inicia la página

document.addEventListener("DOMContentLoaded", function () {
    readRows(API_PRODUCTOS);
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
                            <a onclick="eliminar(${row.id_producto})" class="btn-small modal-trigger white black-text"
                            href="#modal_eliminar_produ"><i
                            class="material-icons left black-text">delete</i>Eliminar</a>
                        </div>
                        <div class="col s12 m6 l6 center-align input-field">
                            <a class="btn-small modal-trigger white black-text"
                            href="#modal_editar_producto"  onclick="cargar_editar(${row.id_producto})"><i
                            class="material-icons left black-text">edit</i>Editar</a>
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
                    document.getElementById("nombre_productoM").value =
                        response.dataset.nombre_producto;
                    document.getElementById("cantidad_productoM").value = "0";
                    document.getElementById("precio_productoM").value =
                        response.dataset.precio_producto;
                    document.getElementById("descripcion_productoM").value =
                        response.dataset.descripcion_producto;
                    document.getElementById("cantidad_actual").innerHTML =
                        "Cantidad: Actual (" + response.dataset.cantidad_producto + ")";
                    document.getElementById("imagenM").src =
                        "../../../api/imagenes/productos/" + response.dataset.imagen;
                    //Se llenan los select
                    fillSelect(
                        API_PRODUCTOS + "categoria",
                        "categoriaM",
                        response.dataset.id_categoria
                    );
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
                            response.dataset.cantidad_producto -
                                document.getElementById("cantidad_productoM").value >=
                            0
                        ) {
                            //Se procede a ejecutar el método que actualizará el registro
                            saveRow(
                                API_PRODUCTOS,
                                "actualizarProducto",
                                "editarProducto",
                                "modal_editar_producto"
                            );
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

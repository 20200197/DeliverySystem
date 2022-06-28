//Se crea la constante de la api
const API_PRODUCTOS = SERVER + 'publico/mis_productos.php?action=';

//Método que carga los datos cuando se inicia la página

document.addEventListener('DOMContentLoaded', function () {
    readRows(API_PRODUCTOS);
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
     M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
});


function fillTable(dataset) {
    let content = "";
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
                                    <div class="row">
                                        <div class="col s12 m12 l2">
                                            <img src="../../../recursos/img/publico/clientes/modals/images (5).jpg"
                                                id="imagen_producto_vende">
                                        </div>
                                        <div class="col s12 m12 l6">
                                            <p>${row.descripcion_producto}.</p>
                                        </div>
                                        <div class="col s12 m12 l4">
                                            <div class="row">
                                                <div class="col s12 m12 l12 ">
                                                    <a class="btn-large right modal-trigger" id="boton_elimi_pro"
                                                        href="#modal_eliminar_produ"><i
                                                            class="material-icons left">delete</i>Eliminar</a>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col s12 m12 l12">
                                                    <a class="btn-large right modal-trigger" id="boton_edita_pro"
                                                        href="#modal_editar"><i
                                                            class="material-icons left">edit</i>Editar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
      `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById("tbody-entrega").innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
}
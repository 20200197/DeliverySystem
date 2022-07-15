//Se crea la constante de la api
const API_PAQUETES = SERVER + "publico/paquetes_pendientes.php?action=";

//Método que carga los datos cuando se inicia la página

document.addEventListener("DOMContentLoaded", function () {
    readRows(API_PAQUETES);
});

function fillTable(dataset) {
    let content = [];
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
        <div class="row card hoverable valign-wrapper">
                    <div class="col l2">
                        <div class=" valign-wrapper container ">
                            <i class="material-icons blue-text text-accent-2 ">account_box</i>
                            <span>${row.nombre}</span>
                        </div>
                    </div>
                    <div class="col l2">
                        <div class="input-field l12 m12 s12 valign-wrapper container ">
                            <i class="material-icons blue-text text-accent-2">local_phone</i>
                            <span>${row.telefono_cliente}</span>
                        </div>
                        <div class="input-field l12 m12 s12 valign-wrapper container ">
                            <i class="material-icons blue-text text-accent-2">email</i>
                            <span>${row.correo_cliente}</span>
                        </div>
                    </div>
                    <div class="col l4  ">
                        <div class="input-field l12 m12 s12 valign-wrapper ">
                            <i class="material-icons blue-text text-accent-2">location_on</i>
                            <span>${row.descripcion_direccion}</span>
                        </div>
                        <div class="input-field l12 m12 s12 valign-wrapper ">
                            <i class="material-icons blue-text text-accent-2">map</i>
                            <span>${row.punto_referencia}</span>
                        </div>
                    </div>
                    <div class="col l1">
                        <a href=""><i class="material-icons blue-text text-accent-2">remove_red_eye</i></a>
                    </div>
                    <div class="col l1 ">
                        <span>$${row.total}</span>
                    </div>
                    <div class="col l1 ">
                        <a href="" class="btn ${row.id_status == 3 ? 'green accent-4' : row.id_status == 4 ? 'grey lighten-1' : ' blue accent-2'}" ${row.id_status > 2 ? `onclick="entregar(${row.id_})"` : ''}><i class="material-icons">assignment_turned_in</i></a>
                    </div>
                    <div class="col l1 ">
                        <a href="" class="btn blue accent-2" ${row.id_status > 2 ? 'disabled' : ''}><i class="material-icons">assignment_returned</i></a>
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


//Se crea la constante de la api
const API_DETALLE = SERVER + "publico/cliente_detalle.php?action=";

//Método que carga los datos cuando se inicia la página
document.addEventListener("DOMContentLoaded", function () {
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = params.get("id");
    //Se crea y llena una variable de tipo formulario
    let datos = new FormData();
    datos.append("identificador", 1); //datos.append("identificador", ID);
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
                    <img class="responsive-img" src="../../../api/imagenes/productos/${
                        row.imagen
                    }" alt="">
                </td>
                <td data-target="Nombre producto: " class="col l3 sin-margen">${
                    row.nombre_producto
                }</td>
                <td data-target="Precio: " class="col l1 sin-margen">$${row.precio}</td>
                <td data-target="Cantidad: " class="col l1 sin-margen">${row.cantidad_pedido}</td>
                <td data-target="Subtotal: " class="col l1 sin-margen">$${row.subtotal}</td>
                <td data-target="Estado: " class="col l1 sin-margen">${
                    row.status_producto ? "Disponible" : "No disponible"
                }</td>
                <td data-target="Fecha: " class="col l1 sin-margen">${row.fecha_compra}</td>
                <td data-target="Valoración: " class="col l2 sin-margen">
                    <a class="waves-effect waves-light btn white-text"><i class="material-icons left">stars</i>Valorar</a>
                    <a class="waves-effect waves-light btn white-text"><i class="material-icons left">stars</i>Pedir</a>
                </td>
            </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById("contenido").innerHTML = content;
}

//método para valorar al vendedor
document.getElementById("valorar_vendedor").addEventListener("click", function () {
    //Se importa async
    (async () => { 
        const { value: datos } = await Swal.fire({
            showCancelButton: true,
            confirmButtonColor: "#699AF6",
            cancelButtonColor: "#9A1635",
            closeOnClickOutside: false,
            closeOnEsc: false,
            width: "50%",
            confirmButtonText: "Enviar valoración",
            html: `
         
        <div class="row contorno-modal contorno">
           <h5>Valoración de repartidor</h5>
           <div class="valign-wrapper">
                <div class="center col l4">
                        <img src="../../../api/imagenes/repartidor/foto_repartidor/repartidor.png" class="responsive-img">
                        <span>Nombre del repartidor</span>
                    </div>
                    <div class="col l8 ">
                        <div class="col l12 left-align">
                            <div class="valign-wrapper">
                                <!--Valoración-->
                                <h6>Calificación: </h6>
                                <div class="estrellas_contenedor">
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
                                    <input id="star0" name="estrellas" type="radio" value="0" class="hide" checked  /> 
                                </div>
                                                                            
                            </div>
                        </div>
                    <div class="input-field col l12">
                            <textarea id="valoracion" class="materialize-textarea" required ></textarea>
                            <label for="valoracion">Tu valoración</label>
                        </div>
            </div>
           </div>
            
        </div>
        
        `,
            inputValidator: (Swal.getHtmlContainer().getElementById('valoracion'), Swal.getHtmlContainer().querySelector(`input[name=estrellas]:checked`)),
            preConfirm: (value) => {
                return [
                    document.getElementById("valoracion").value,
                    document.querySelector(`input[name=estrellas]:checked`).value,
                ];
            },
        });
        //Se revisa lo obtenido
        if (datos) { 
            Swal.fire(JSON.stringify(datos));
        }
    })()
    
});

/**
 * 
 *            ' ' +
            ''+
           ' '+,
 */

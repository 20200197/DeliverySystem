// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_PRODUCTO = SERVER + "publico/productos.php?action=";
const API_FAVORITO = SERVER + "publico/favorito.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", function () {
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = params.get("id_categoria");
    const NAME = params.get("nombre");
    // Se llama a la función que muestra los productos de la categoría seleccionada previamente.
    readProductosCategoria(ID, NAME);
    //Cargamos categorias
    readCategoria();
    showOp(ID);

});

// Función para llenar con los datos de los registros.
function readProductosCategoriaSearch() {
    fetch(API_PRODUCTO + 'readProductosCategoria', {
        method: 'get'
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
                // Se envían los datos a la función para llenar la tabla en la vista.
                fillTableProductosCategoria(data);
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });

}


function fillTableProductosCategoria(dataset) {
    //Declaramos variables
    let content_estrellas = '';
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = params.get("id_categoria");
    var idC = ID;
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {

        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
        //Productos
        //Compramos la calidad para colocarle las estrellas
        if (row.calidad <= 1 && row.calidad > 0) {
            //Para 0.5
            if (row.calidad < 1) {
                content_estrellas += `
                <!--Catalogo-->
             <div class="col s12 m12 l12">
                  <div class="col s12 m3 l3">
                     <img src="${SERVER}imagenes/productos/${row.imagen}"
                     class="responsive-img" alt="" height="550" width="550">
                </div>
                <div class="col s12 m5 l5">
                    <h5>${row.nombre_producto}</h5>
                    <h4>${row.descripcion_producto}</h4>
                    <p>Marca: ${row.nombre_marca}</p>
                    <div class="row" id="contenedor_cali">
                    <i class="material-icons">star_half</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                    </div>
                    <p>Precio: $${row.precio_producto}</p>
                    </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>

                  `
                readCheckFavoOfClient(row.id_producto);
                ;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;


            } else {
                //Para 1
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                <!--Catalogo-->
                 <div class="col s12 m12 l12">
                   <div class="col s12 m3 l3">
                      <img src="${SERVER}imagenes/productos/${row.imagen}"
                    class="responsive-img" alt="" height="550" width="550">
                  </div>
                <div class="col s12 m5 l5">
                    <h5>${row.nombre_producto}</h5>
                    <h4>${row.descripcion_producto}</h4>
                    <p>Marca: ${row.nombre_marca}</p>
                    <div class="row" id="contenedor_cali">
                    <i class="material-icons">star</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i>
                    <i class="material-icons">star_border</i> 
                    </div>
                    <p>Precio: $${row.precio_producto}</p>
                </div>
                <div class="col s12 m3 l3 valign-wrapper" >
                <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                    <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                        href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                            class="material-icons left black-text">remove_red_eye</i>Ver</a>
                </div>
                </div>
                <div class="col s12 m9 l9">
                    <br>
                    <div class="divider"></div>
                    <br>
                </div>

                 `
                readCheckFavoOfClient(row.id_producto);
                ;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;


            }
            //Para 1.5
        } else if (row.calidad <= 2 && row.calidad > 1) {
            if (row.calidad < 2 && row.calidad > 1) {
                content_estrellas += `    
                <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                 </div>
            <div class="col s12 m5 l5">
                <h5>${row.nombre_producto}</h5>
                <h4>${row.descripcion_producto}</h4>
                <p>Marca: ${row.nombre_marca}</p>
                <div class="row" id="contenedor_cali">
                <i class="material-icons">star</i>
                  <i class="material-icons">star_half</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i>
                  <i class="material-icons">star_border</i> 
                </div>
                <p>Precio: $${row.precio_producto}</p>
            </div>
            <div class="col s12 m3 l3 valign-wrapper" >
            <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                    href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                        class="material-icons left black-text">remove_red_eye</i>Ver</a>
            </div>
                </div>
                <div class="col s12 m9 l9">
                    <br>
                    <div class="divider"></div>
                    <br>
                </div>

                  `
                readCheckFavoOfClient(row.id_producto);
                ;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;


            } else {
                //Para 2
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        </div>
                        <p>Precio: $${row.precio_producto}</p>
                        </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>

                 `
                readCheckFavoOfClient(row.id_producto);
                ;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;


            }
        } else if (row.calidad <= 3 && row.calidad > 2) {
            //Para 2.5
            if (row.calidad < 3 && row.calidad > 2) {
                content_estrellas += `
                <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_half</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        </div>
                        <p>Precio: $${row.precio_producto}</p>
                    </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                    </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>

                `
                readCheckFavoOfClient(row.id_producto);
                ;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;


            } else {
                //Para 3
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i> 
                        </div>
                        <p>Precio: $${row.precio_producto}</p>
                    </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                    </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>

                `
                readCheckFavoOfClient(row.id_producto);
                ;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;


            }
        } else if (row.calidad <= 4 && row.calidad > 3) {
            //Para 3.5
            if (row.calidad < 4 && row.calidad > 3) {
                content_estrellas += `
                <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star_half</i>
                            <i class="material-icons">star_border</i> 
                        </div>
                        <p>Precio: $${row.precio_producto}</p>
                    </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                    </div>
                </div>
                <div class="col s12 m9 l9">
                    <br>
                    <div class="divider"></div>
                    <br>
                </div>

                     `

                readCheckFavoOfClient(row.id_producto);
                ;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;

            } else {
                //Para 4
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_border</i>
                        </div>
                        <p>Precio: $${row.precio_producto}</p>
                     </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                    </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>

                  `

                readCheckFavoOfClient(row.id_producto);
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;

                //showFavo(idC);
            }

        } else if (row.calidad <= 5 && row.calidad > 4) {
            //Para 4.5
            if (row.calidad < 5 && row.calidad > 4) {
                content_estrellas += `
                <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star_half</i>
                        </div>
                     <p>Precio: $${row.precio_producto}</p>
                     </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                    </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>

                     `
                readCheckFavoOfClient(row.id_producto);
                ;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                //showFavo(idC);

            } else {

                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        </div>
                        <p>Precio: $${row.precio_producto}</p>
                    </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                        <label id="label${row.id_producto}" >
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                    </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>
                    
                    `
                readCheckFavoOfClient(row.id_producto);
                ;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;

                //showFavo(idC);

            }
        } else if (row.calidad == null) {
            content_estrellas += `
            <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <p>No hay calificación para este producto</p>
                        </div>
                        <p>Precio: $${row.precio_producto}</p>
                    </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever" name="lever${row.id_producto}" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                    </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div> `
            readCheckFavoOfClient(row.id_producto);
            ;
            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
            document.getElementById("contenedor_productos").innerHTML = content_estrellas;


        } else {
            content_estrellas += `
            <!--Catalogo-->
                <div class="col s12 m12 l12">
                    <div class="col s12 m3 l3">
                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                            class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star</i>
                        <p>No hay calificación para este producto</p>
                        </div>
                     <p>Precio: $${row.precio_producto}</p>
                     </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                        <label id="label${row.id_producto}">
                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                            <span class="lever"  name="lever${row.id_producto}" id="lever${row.id_producto}"></span>
                            <span>★</span>
                        </label>
                    </div>  
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                    </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>`
            readCheckFavoOfClient(row.id_producto);
            ;
            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
            document.getElementById("contenedor_productos").innerHTML = content_estrellas;


        }



    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('contenedor_productos').innerHTML = content_estrellas;


    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));


}


// Función para obtener y mostrar los productos de acuerdo a la categoría seleccionada.
function readProductosCategoria(id, categoria) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append("id_categoria_producto", id);
    var idC = id;
    // Petición para solicitar los productos de la categoría seleccionada.
    fetch(API_PRODUCTO + "readProductosCategoria", {
        method: "post",
        body: data,
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    let content_estrellas = "";
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                        //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
                        //Productos
                        //Compramos la calidad para colocarle las estrellas
                        if (row.calidad <= 1 && row.calidad > 0) {
                            //Para 0.5
                            if (row.calidad < 1) {
                                content_estrellas += `
                    <!--Catalogo-->
                 <div class="col s12 m12 l12">
                      <div class="col s12 m3 l3">
                         <img src="${SERVER}imagenes/productos/${row.imagen}"
                         class="responsive-img" alt="" height="550" width="550">
                    </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star_half</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        </div>
                        <p>Precio: $${row.precio_producto}</p>
                        </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                        class="material-icons left black-text">remove_red_eye</i>Ver</a>
                            </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div>
    
                      `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                //showFavo(idC);

                            } else {
                                //Para 1
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                    <!--Catalogo-->
                     <div class="col s12 m12 l12">
                       <div class="col s12 m3 l3">
                          <img src="${SERVER}imagenes/productos/${row.imagen}"
                        class="responsive-img" alt="" height="550" width="550">
                      </div>
                    <div class="col s12 m5 l5">
                        <h5>${row.nombre_producto}</h5>
                        <h4>${row.descripcion_producto}</h4>
                        <p>Marca: ${row.nombre_marca}</p>
                        <div class="row" id="contenedor_cali">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i> 
                        </div>
                        <p>Precio: $${row.precio_producto}</p>
                    </div>
                    <div class="col s12 m3 l3 valign-wrapper" >
                    <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                    </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>
    
                     `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                //showFavo(idC);

                            }
                            //Para 1.5
                        } else if (row.calidad <= 2 && row.calidad > 1) {
                            if (row.calidad < 2 && row.calidad > 1) {
                                content_estrellas += `    
                    <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                     </div>
                <div class="col s12 m5 l5">
                    <h5>${row.nombre_producto}</h5>
                    <h4>${row.descripcion_producto}</h4>
                    <p>Marca: ${row.nombre_marca}</p>
                    <div class="row" id="contenedor_cali">
                    <i class="material-icons">star</i>
                      <i class="material-icons">star_half</i>
                      <i class="material-icons">star_border</i>
                      <i class="material-icons">star_border</i>
                      <i class="material-icons">star_border</i> 
                    </div>
                    <p>Precio: $${row.precio_producto}</p>
                </div>
                <div class="col s12 m3 l3 valign-wrapper" >
                <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                    <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                        href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                            class="material-icons left black-text">remove_red_eye</i>Ver</a>
                </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>
    
                      `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                //showFavo(idC);

                            } else {
                                //Para 2
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                    <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                        </div>
                        <div class="col s12 m5 l5">
                            <h5>${row.nombre_producto}</h5>
                            <h4>${row.descripcion_producto}</h4>
                            <p>Marca: ${row.nombre_marca}</p>
                            <div class="row" id="contenedor_cali">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star_border</i>
                            <i class="material-icons">star_border</i>
                            <i class="material-icons">star_border</i>
                            </div>
                            <p>Precio: $${row.precio_producto}</p>
                            </div>
                            <div class="col s12 m3 l3 valign-wrapper" >
                            <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                                <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                    href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                        class="material-icons left black-text">remove_red_eye</i>Ver</a>
                            </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div>
    
                     `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                // showFavo(idC);

                            }
                        } else if (row.calidad <= 3 && row.calidad > 2) {
                            //Para 2.5
                            if (row.calidad < 3 && row.calidad > 2) {
                                content_estrellas += `
                    <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                        </div>
                        <div class="col s12 m5 l5">
                            <h5>${row.nombre_producto}</h5>
                            <h4>${row.descripcion_producto}</h4>
                            <p>Marca: ${row.nombre_marca}</p>
                            <div class="row" id="contenedor_cali">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star_half</i>
                            <i class="material-icons">star_border</i>
                            <i class="material-icons">star_border</i>
                            </div>
                            <p>Precio: $${row.precio_producto}</p>
                        </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div>
    
                    `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                //showFavo(idC);

                            } else {
                                //Para 3
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                    <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                        </div>
                        <div class="col s12 m5 l5">
                            <h5>${row.nombre_producto}</h5>
                            <h4>${row.descripcion_producto}</h4>
                            <p>Marca: ${row.nombre_marca}</p>
                            <div class="row" id="contenedor_cali">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star_border</i>
                            <i class="material-icons">star_border</i> 
                            </div>
                            <p>Precio: $${row.precio_producto}</p>
                        </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div>
    
                    `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                //showFavo(idC);

                            }
                        } else if (row.calidad <= 4 && row.calidad > 3) {
                            //Para 3.5
                            if (row.calidad < 4 && row.calidad > 3) {
                                content_estrellas += `
                    <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                        </div>
                        <div class="col s12 m5 l5">
                            <h5>${row.nombre_producto}</h5>
                            <h4>${row.descripcion_producto}</h4>
                            <p>Marca: ${row.nombre_marca}</p>
                            <div class="row" id="contenedor_cali">
                            <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_half</i>
                                <i class="material-icons">star_border</i> 
                            </div>
                            <p>Precio: $${row.precio_producto}</p>
                        </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                    </div>
                    <div class="col s12 m9 l9">
                        <br>
                        <div class="divider"></div>
                        <br>
                    </div>
    
                         `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                //showFavo(idC);

                            } else {
                                //Para 4
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                    <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                        </div>
                        <div class="col s12 m5 l5">
                            <h5>${row.nombre_producto}</h5>
                            <h4>${row.descripcion_producto}</h4>
                            <p>Marca: ${row.nombre_marca}</p>
                            <div class="row" id="contenedor_cali">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star_border</i>
                            </div>
                            <p>Precio: $${row.precio_producto}</p>
                         </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div>
    
                      `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                //showFavo(idC);

                            }
                        } else if (row.calidad <= 5 && row.calidad > 4) {
                            //Para 4.5
                            if (row.calidad < 5 && row.calidad > 4) {
                                content_estrellas += `
                    <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                        </div>
                        <div class="col s12 m5 l5">
                            <h5>${row.nombre_producto}</h5>
                            <h4>${row.descripcion_producto}</h4>
                            <p>Marca: ${row.nombre_marca}</p>
                            <div class="row" id="contenedor_cali">
                            <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_half</i>
                            </div>
                         <p>Precio: $${row.precio_producto}</p>
                         </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div>
    
                         `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                // showFavo(idC);

                            } else {

                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                    <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                        </div>
                        <div class="col s12 m5 l5">
                            <h5>${row.nombre_producto}</h5>
                            <h4>${row.descripcion_producto}</h4>
                            <p>Marca: ${row.nombre_marca}</p>
                            <div class="row" id="contenedor_cali">
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            <i class="material-icons">star</i>
                            </div>
                            <p>Precio: $${row.precio_producto}</p>
                        </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                            <label id="label${row.id_producto}" >
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div>
                        
                        `
                                readCheckFavoOfClient(row.id_producto);
                                ;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_productos").innerHTML = content_estrellas;



                            }
                        } else if (row.calidad == null) {
                            content_estrellas += `
                <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                        </div>
                        <div class="col s12 m5 l5">
                            <h5>${row.nombre_producto}</h5>
                            <h4>${row.descripcion_producto}</h4>
                            <p>Marca: ${row.nombre_marca}</p>
                            <div class="row" id="contenedor_cali">
                            <p>No hay calificación para este producto</p>
                            </div>
                            <p>Precio: $${row.precio_producto}</p>
                        </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever" name="lever${row.id_producto}" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div> `
                        readCheckFavoOfClient(row.id_producto);
                        ;
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                            //showFavo(idC);

                        } else {
                            content_estrellas += `
                <!--Catalogo-->
                    <div class="col s12 m12 l12">
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                class="responsive-img" alt="" height="550" width="550">
                        </div>
                        <div class="col s12 m5 l5">
                            <h5>${row.nombre_producto}</h5>
                            <h4>${row.descripcion_producto}</h4>
                            <p>Marca: ${row.nombre_marca}</p>
                            <div class="row" id="contenedor_cali">
                            <i class="material-icons">star</i>
                            <p>No hay calificación para este producto</p>
                            </div>
                         <p>Precio: $${row.precio_producto}</p>
                         </div>
                        <div class="col s12 m3 l3 valign-wrapper" >
                        <div class="switch">
                            <label id="label${row.id_producto}">
                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                <span class="lever"  name="lever${row.id_producto}" id="lever${row.id_producto}"></span>
                                <span>★</span>
                            </label>
                        </div>  
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div>`
                        
                        readCheckFavoOfClient(row.id_producto);
                        ;
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                            //showFavo(idC);

                        }

                    });

                    // Se asigna como título la categoría de los productos.
                    document.getElementById("title").textContent =
                        "Categoría: " + categoria;

                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
                    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
                } else {
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById(
                        "title"
                    ).innerHTML = `<i class="material-icons small">cloud_off</i><span class="red-text">${response.exception}</span>`;
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Función para leer categoria
function readCategoria() {
    fetch(API_PRODUCTO + 'readCategoria', {
        method: 'get'
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
                // Se envían los datos a la función para llenar la tabla en la vista.
                fillTableC(data);
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });

}

//Función para llenar los datos
function fillTableC(dataset) {
    //Declaramos variables
    let content = '';
    let url = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se define una dirección con los datos de cada categoría para mostrar sus productos en otra página web.
        url = `producto_categoria.html?id_categoria=${row.id_categoria_producto}&nombre=${row.categoria}`;
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
        //Categoria
        content += `
      <div class="col s6 m4 l1">
      ${row.categoria}
      <a href="${url}"><img src="${SERVER}imagenes/categoria/${row.imagen_categoria}"
              class="imagen-categoria hoverable" alt="" width="100"></a>
       </div>`;



    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('contenedor_categoria').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}

//Mostrar los favoritos activos, las estrellas cuando esten agregados
function showFavo(id_categoria) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append("id_cate", id_categoria);

    fetch(API_FAVORITO + 'readOneCategoria', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        if (row.estado_favorito == true) {
                            //Comprobamos que alguno de los productos este agregado a favorito
                            //readCheckFavoOfClient();
                            document.getElementById("cali_favo" + row.id_producto).checked = true;
                            document.getElementById("label" + row.id_producto).style.color = "orange";
                            document.getElementById("lever" + row.id_producto).style.display = "none";
                        }

                    });
                } else {
                    console.log(response.exception);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

//Mostrar el swicth de opcion para favo
function showOp(id) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append("id_categoria_producto", id);
    fetch(API_PRODUCTO + 'readProductosCategoria', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        //Si el estado de producto es true que no se muestre el objeto
                        if (row.status_producto == true) {

                            document.getElementById("lever" + row.id_producto).style.display = "none";
                        }
                    });
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

//Cambiamos color de label si se agrega a favo 
function changeColorActive(label, camb) {
    if (document.getElementById(camb).checked) {
        document.getElementById(label).style.color = "orange";

    } else {
        document.getElementById(label).style.color = "";
    }
}

//Agregar productos a favorito
function createFavo(id) {

    //Comprobamos si el radio esta chequeado
    if (document.getElementById("cali_favo" + id).checked) {
        console.log("no");
        // Se define un objeto con los datos del registro seleccionado.
        const data = new FormData();
        data.append('idP', id);
        fetch(API_FAVORITO + 'create', {
            method: 'post',
            body: data
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        sweetAlert(1, response.message, null);
                    } else {
                        sweetAlert(2, response.exception, null);
                    }
                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });


    } else {
        console.log("act");
        // Se define un objeto con los datos del registro seleccionado.
        const data = new FormData();
        data.append('idP', id);

        fetch(API_FAVORITO + 'delete', {
            method: 'post',
            body: data
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
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

}


//Mostrar los favoritos activos, las estrellas cuando esten agregados
function readCheckFavoOfClient(id) {
    console.log('readcg');
    const data = new FormData();
    data.append('idP', id);
    fetch(API_FAVORITO + 'readCheckFavoOfClient', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {

                        document.getElementById("cali_favo" + row.id_producto).checked = true;
                        document.getElementById("label" + row.id_producto).style.color = "orange";
                        document.getElementById("lever" + row.id_producto).style.display = "none";

                    });
                } else {
                    document.getElementById("lever" + id).style.display = "none";
                    console.log(response.exception);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}



// Método para search por precio
function searchProductosPrecio() {
    document.getElementById("title").textContent = '';
    //readCheckFavoOfClient();
    let parameter = new FormData();
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = params.get("id_categoria");
    const NAME = params.get("nombre");
    parameter.append('idC', ID)
    //Evaluamos la opcion del checkbox que se selecciono
    if (document.getElementById("group1").checked) {
        //Mandamos los dos parametros para buscar
        parameter.append('data1', 1)
        parameter.append('data2', 50)
        //Desmarcmos los demás 

        document.getElementById("group2").checked = false;
        document.getElementById("group3").checked = false;
        document.getElementById("group4").checked = false;

        //Deshabilitamos inputs 
        document.getElementById("precio-inicio").disabled = true;
        document.getElementById("precio-limite").disabled = true;
    } else if (document.getElementById("group2").checked) {
        //Mandamos los dos parametros para buscar
        parameter.append('data1', 51)
        parameter.append('data2', 150)
        //Desmarcamos los demás

        document.getElementById("group1").checked = false;
        document.getElementById("group3").checked = false;
        document.getElementById("group4").checked = false;

        //Deshabilitamos inputs 
        document.getElementById("precio-inicio").disabled = true;
        document.getElementById("precio-limite").disabled = true;
    } else if (document.getElementById("group3").checked) {
        //Mandamos los dos parametros para buscar
        parameter.append('data1', 151)
        parameter.append('data2', 300)
        //Desmarcamos los demás

        document.getElementById("group1").checked = false;
        document.getElementById("group2").checked = false;
        document.getElementById("group4").checked = false;

        //Deshabilitamos inputs 
        document.getElementById("precio-inicio").disabled = true;
        document.getElementById("precio-limite").disabled = true;
    } else {
        if (document.getElementById("group4").checked) {
            document.getElementById("precio-inicio").disabled = false;
            document.getElementById("precio-limite").disabled = false;
        }
        //Desmarcamos los demás
        document.getElementById("group1").checked = false;
        document.getElementById("group2").checked = false;
        document.getElementById("group3").checked = false;
        document.getElementById("group4").checked = true;
    }

    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PRODUCTO + 'searchProductoPrecioCategoria', {
        method: 'post',
        body: parameter
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                console.log(response.status);
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    //Se llena la tabla de productos
                    fillTableProductosCategoria(response.dataset);
                    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        if (row.status_producto == true) {
                            document.getElementById("lever" + row.id_producto).style.display = "none";
                        }



                    });
                    // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                    M.updateTextFields();
                    //Si no hay coincidencias se carga la tabla sin datos
                } else if (response.exception == 'No hay coincidencias') {
                    fillTableProductosCategoria(response.dataset);
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById("title").innerHTML = `<a href="index.html"><i class="material-icons small black-text">cloud_off</i><span class="red-text">${response.exception}</span><p><i class="material-icons medium black-text">home</i></p></a>`;
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readProductosCategoria(ID, NAME);
                    readCategoria();
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });

}

//Función par buscar custom
function searchCustom() {
    document.getElementById("title").textContent = '';
    let parameter = new FormData();
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = params.get("id_categoria");
    const NAME = params.get("nombre");
    parameter.append('idC', ID)
    //Evaluamos si mientras se escribe el input esta vacio
    if (document.getElementById("precio-inicio").value == null || document.getElementById("precio-limite") == null) {
        //Valores iniciales
        document.getElementById("precio-inicio").value = 0;
        document.getElementById("precio-limite").value = 0;
        //Mandamos los dos parametros para buscar
        parameter.append('data1', 0)
        parameter.append('data2', 0)
    } else {
        //Obtenemos valores Custom
        var precio_inicio = document.getElementById("precio-inicio").value;
        var precio_limite = document.getElementById("precio-limite").value;
        //Mandamos los dos parametros para buscar
        parameter.append('data1', precio_inicio)
        parameter.append('data2', precio_limite)
    }

    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PRODUCTO + 'searchProductoPrecioCategoria', {
        method: 'post',
        body: parameter
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    //Se llena la tabla de productos
                    fillTableProductosCategoria(response.dataset);
                    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        if (row.status_producto == true) {
                            document.getElementById("lever" + row.id_producto).style.display = "none";
                        }

                    });
                    // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                    M.updateTextFields();
                    //Si no hay coincidencias se carga la tabla sin datos
                } else if (response.exception == 'No hay coincidencias') {
                    fillTableProductosCategoria(response.dataset);
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById("title").innerHTML = `<a href="index.html"><i class="material-icons small black-text">cloud_off</i><span class="red-text">${response.exception}</span><p><i class="material-icons medium black-text">home</i></p></a>`;
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readProductosCategoria(ID, NAME);
                    readCategoria();
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

//Función para search por calidad
function searchProductosCalidad() {
    document.getElementById("title").textContent = '';
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = params.get("id_categoria");
    const NAME = params.get("nombre");
    //Evaluamos la opcion del checkbox que se selecciono
    if (document.getElementById("cali_uno").checked == true) {
        // Se define un objeto con los datos del registro seleccionado.
        const data = new FormData();
        data.append("id_categoria_producto", ID);
        //Deshabilitamos
        document.getElementById("cali_uno").checked = true;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cuatro").checked = false;
        document.getElementById("cali_cinco").checked = false;
        fetch(API_PRODUCTO + 'readProductosCategoria', {
            method: 'post',
            body: data
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    //Declaramos variables
                    let content_estrellas = '';
                    // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                        response.dataset.map(function (row) {
                            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                            //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
                            //Productos
                            //Compramos la calidad para colocarle las estrellas
                            if (row.calidad <= 1 && row.calidad > 0) {
                                //Para 0.5
                                if (row.calidad < 1) {
                                    content_estrellas += `
                                    <!--Catalogo-->
                                <div class="col s12 m12 l12">
                                    <div class="col s12 m3 l3">
                                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                                        class="responsive-img" alt="" height="550" width="550">
                                    </div>
                                    <div class="col s12 m5 l5">
                                        <h5>${row.nombre_producto}</h5>
                                        <h4>${row.descripcion_producto}</h4>
                                        <p>Marca: ${row.nombre_marca}</p>
                                        <div class="row" id="contenedor_cali">
                                        <i class="material-icons">star_half</i>
                                        <i class="material-icons">star_border</i>
                                        <i class="material-icons">star_border</i>
                                        <i class="material-icons">star_border</i>
                                        <i class="material-icons">star_border</i>
                                        </div>
                                        <p>Precio: $${row.precio_producto}</p>
                                        </div>
                                        <div class="col s12 m3 l3 valign-wrapper" >
                                        <div class="switch">
                                            <label id="label${row.id_producto}">
                                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                                <span class="lever" id="lever${row.id_producto}"></span>
                                                <span>★</span>
                                            </label>
                                        </div>
                                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                                        class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                            </div>
                                        </div>
                                    <div class="col s12 m9 l9">
                                            <br>
                                    <div class="divider"></div>
                                            <br>
                                </div>

                            `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;

                                    //showOp();
                                } else {
                                    //Para 1
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content_estrellas += `
                                <!--Catalogo-->
                                <div class="col s12 m12 l12">
                                <div class="col s12 m3 l3">
                                    <img src="${SERVER}imagenes/productos/${row.imagen}"
                                    class="responsive-img" alt="" height="550" width="550">
                                </div>
                                <div class="col s12 m5 l5">
                                    <h5>${row.nombre_producto}</h5>
                                    <h4>${row.descripcion_producto}</h4>
                                    <p>Marca: ${row.nombre_marca}</p>
                                    <div class="row" id="contenedor_cali">
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star_border</i>
                                    <i class="material-icons">star_border</i>
                                    <i class="material-icons">star_border</i>
                                    <i class="material-icons">star_border</i> 
                                    </div>
                                    <p>Precio: $${row.precio_producto}</p>
                                </div>
                                <div class="col s12 m3 l3 valign-wrapper" >
                                <div class="switch">
                                        <label id="label${row.id_producto}">
                                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                            <span class="lever" id="lever${row.id_producto}"></span>
                                            <span>★</span>
                                        </label>
                                    </div>
                                    <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                        href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                            class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                </div>
                                </div>
                                <div class="col s12 m9 l9">
                                    <br>
                                    <div class="divider"></div>
                                    <br>
                                </div>

                                `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                    //showOp();
                                }
                                //Para 1.5
                            } else if (row.calidad <= 2 && row.calidad > 1) {
                                if (row.calidad < 2 && row.calidad > 1) {
                                    content_estrellas += `    
                                    <!--Catalogo-->
                                    <div class="col s12 m12 l12">
                                        <div class="col s12 m3 l3">
                                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                                class="responsive-img" alt="" height="550" width="550">
                                    </div>
                                <div class="col s12 m5 l5">
                                    <h5>${row.nombre_producto}</h5>
                                    <h4>${row.descripcion_producto}</h4>
                                    <p>Marca: ${row.nombre_marca}</p>
                                    <div class="row" id="contenedor_cali">
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star_half</i>
                                    <i class="material-icons">star_border</i>
                                    <i class="material-icons">star_border</i>
                                    <i class="material-icons">star_border</i> 
                                    </div>
                                    <p>Precio: $${row.precio_producto}</p>
                                </div>
                                <div class="col s12 m3 l3 valign-wrapper" >
                                <div class="switch">
                                            <label id="label${row.id_producto}">
                                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                                <span class="lever" id="lever${row.id_producto}"></span>
                                                <span>★</span>
                                            </label>
                                        </div>
                                    <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                        href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                            class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                    </div>
                                    <div class="col s12 m9 l9">
                                        <br>
                                        <div class="divider"></div>
                                        <br>
                                    </div>

                                `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                    //showOp();
                                }
                            } else {
                                // Se presenta un mensaje de error cuando no existen datos para mostrar.
                                document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;
                            }
                        });
                        // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        //showFavo();
                        //showOp();
                        // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                        // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                        M.Tooltip.init(document.querySelectorAll('.tooltipped'));
                    } else {
                        sweetAlert(4, response.exception, null);
                    }
                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });

    } else if (document.getElementById("cali_dos").checked == true) {
        // Se define un objeto con los datos del registro seleccionado.
        const data = new FormData();
        data.append("id_categoria_producto", ID);
        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cuatro").checked = false;
        document.getElementById("cali_cinco").checked = false;
        fetch(API_PRODUCTO + 'readProductosCategoria', {
            method: 'post',
            body: data
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    //Declaramos variables
                    let content_estrellas = '';
                    // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                        response.dataset.map(function (row) {
                            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                            //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
                            //Productos
                            //Compramos la calidad para colocarle las estrellas
                            if (row.calidad <= 2 && row.calidad > 1) {
                                if (row.calidad < 2 && row.calidad > 1) {

                                } else {
                                    //Para 2
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content_estrellas += `
                                <!--Catalogo-->
                                <div class="col s12 m12 l12">
                                    <div class="col s12 m3 l3">
                                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                                            class="responsive-img" alt="" height="550" width="550">
                                    </div>
                                    <div class="col s12 m5 l5">
                                        <h5>${row.nombre_producto}</h5>
                                        <h4>${row.descripcion_producto}</h4>
                                        <p>Marca: ${row.nombre_marca}</p>
                                        <div class="row" id="contenedor_cali">
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star_border</i>
                                        <i class="material-icons">star_border</i>
                                        <i class="material-icons">star_border</i>
                                        </div>
                                        <p>Precio: $${row.precio_producto}</p>
                                        </div>
                                        <div class="col s12 m3 l3 valign-wrapper" >
                                        <div class="switch">
                                        <label id="label${row.id_producto}">
                                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                            <span class="lever" id="lever${row.id_producto}"></span>
                                            <span>★</span>
                                        </label>
                                    </div>
                                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                        </div>
                                    </div>
                                    <div class="col s12 m9 l9">
                                        <br>
                                        <div class="divider"></div>
                                        <br>
                                    </div>
                
                                 `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                    // showOp();
                                }
                            } else if (row.calidad <= 3 && row.calidad > 2) {
                                //Para 2.5
                                if (row.calidad < 3 && row.calidad > 2) {
                                    content_estrellas += `
                                <!--Catalogo-->
                                <div class="col s12 m12 l12">
                                    <div class="col s12 m3 l3">
                                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                                            class="responsive-img" alt="" height="550" width="550">
                                    </div>
                                    <div class="col s12 m5 l5">
                                        <h5>${row.nombre_producto}</h5>
                                        <h4>${row.descripcion_producto}</h4>
                                        <p>Marca: ${row.nombre_marca}</p>
                                        <div class="row" id="contenedor_cali">
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star_half</i>
                                        <i class="material-icons">star_border</i>
                                        <i class="material-icons">star_border</i>
                                        </div>
                                        <p>Precio: $${row.precio_producto}</p>
                                    </div>
                                    <div class="col s12 m3 l3 valign-wrapper" >
                                    <div class="switch">
                                        <label id="label${row.id_producto}">
                                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                            <span class="lever" id="lever${row.id_producto}"></span>
                                            <span>★</span>
                                        </label>
                                    </div>
                                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                    </div>
                                    <div class="col s12 m9 l9">
                                        <br>
                                        <div class="divider"></div>
                                        <br>
                                    </div>
                
                                `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                    //showOp();
                                } else {
                                    //Para 3

                                }
                            } else {
                                // Se presenta un mensaje de error cuando no existen datos para mostrar.
                                document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;
                            }

                        });
                        // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        //showFavo();
                        //showOp();
                        // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                        // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                        M.Tooltip.init(document.querySelectorAll('.tooltipped'));
                    } else {
                        sweetAlert(4, response.exception, null);
                    }


                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });

    } else if (document.getElementById("cali_tres").checked == true) {
        // Se define un objeto con los datos del registro seleccionado.
        const data = new FormData();
        data.append("id_categoria_producto", ID);
        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_cuatro").checked = false;
        document.getElementById("cali_cinco").checked = false;

        fetch(API_PRODUCTO + 'readProductosCategoria', {
            method: 'post',
            body: data
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    //Declaramos variables
                    let content_estrellas = '';
                    // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                        response.dataset.map(function (row) {
                            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                            //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
                            //Productos
                            //Compramos la calidad para colocarle las estrellas
                            if (row.calidad <= 3 && row.calidad > 2) {
                                //Para 2.5
                                if (row.calidad < 3 && row.calidad > 2) {

                                } else {
                                    //Para 3
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content_estrellas += `
                                <!--Catalogo-->
                                <div class="col s12 m12 l12">
                                    <div class="col s12 m3 l3">
                                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                                            class="responsive-img" alt="" height="550" width="550">
                                    </div>
                                    <div class="col s12 m5 l5">
                                        <h5>${row.nombre_producto}</h5>
                                        <h4>${row.descripcion_producto}</h4>
                                        <p>Marca: ${row.nombre_marca}</p>
                                        <div class="row" id="contenedor_cali">
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star_border</i>
                                        <i class="material-icons">star_border</i> 
                                        </div>
                                        <p>Precio: $${row.precio_producto}</p>
                                    </div>
                                    <div class="col s12 m3 l3 valign-wrapper" >
                                    <div class="switch">
                                        <label id="label${row.id_producto}">
                                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                            <span class="lever" id="lever${row.id_producto}"></span>
                                            <span>★</span>
                                        </label>
                                    </div>
                                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                    </div>
                                    <div class="col s12 m9 l9">
                                        <br>
                                        <div class="divider"></div>
                                        <br>
                                    </div>

                                `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                    //showOp();
                                }
                            } else if (row.calidad <= 4 && row.calidad > 3) {
                                //Para 3.5
                                if (row.calidad < 4 && row.calidad > 3) {
                                    content_estrellas += `
                            <!--Catalogo-->
                            <div class="col s12 m12 l12">
                                <div class="col s12 m3 l3">
                                    <img src="${SERVER}imagenes/productos/${row.imagen}"
                                        class="responsive-img" alt="" height="550" width="550">
                                </div>
                                <div class="col s12 m5 l5">
                                    <h5>${row.nombre_producto}</h5>
                                    <h4>${row.descripcion_producto}</h4>
                                    <p>Marca: ${row.nombre_marca}</p>
                                    <div class="row" id="contenedor_cali">
                                    <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star_half</i>
                                        <i class="material-icons">star_border</i> 
                                    </div>
                                    <p>Precio: $${row.precio_producto}</p>
                                </div>
                                <div class="col s12 m3 l3 valign-wrapper" >
                                <div class="switch">
                                    <label id="label${row.id_producto}">
                                        <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                        <span class="lever" id="lever${row.id_producto}"></span>
                                        <span>★</span>
                                    </label>
                                </div>
                                    <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                        href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                            class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                </div>
                            </div>
                            <div class="col s12 m9 l9">
                                <br>
                                <div class="divider"></div>
                                <br>
                            </div>

                                `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                    //showOp();
                                } else {
                                    //Para 4

                                }
                            } else {
                                // Se presenta un mensaje de error cuando no existen datos para mostrar.
                                document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;
                            }
                        });
                        // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        //showFavo();
                        //showOp();
                        // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                        // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                        M.Tooltip.init(document.querySelectorAll('.tooltipped'));
                    } else {
                        sweetAlert(4, response.exception, null);
                    }


                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });


    } else if (document.getElementById("cali_cuatro").checked == true) {
        // Se define un objeto con los datos del registro seleccionado.
        const data = new FormData();
        data.append("id_categoria_producto", ID);
        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cinco").checked = false;

        fetch(API_PRODUCTO + 'readProductosCategoria', {
            method: 'post',
            body: data
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    //Declaramos variables
                    let content_estrellas = '';
                    // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                        response.dataset.map(function (row) {
                            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                            //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
                            //Productos
                            //Compramos la calidad para colocarle las estrellas
                            if (row.calidad <= 4 && row.calidad > 3) {
                                //Para 3.5
                                if (row.calidad < 4 && row.calidad > 3) {

                                } else {
                                    //Para 4
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content_estrellas += `
                                    <!--Catalogo-->
                                    <div class="col s12 m12 l12">
                                        <div class="col s12 m3 l3">
                                            <img src="${SERVER}imagenes/productos/${row.imagen}"
                                                class="responsive-img" alt="" height="550" width="550">
                                        </div>
                                        <div class="col s12 m5 l5">
                                            <h5>${row.nombre_producto}</h5>
                                            <h4>${row.descripcion_producto}</h4>
                                            <p>Marca: ${row.nombre_marca}</p>
                                            <div class="row" id="contenedor_cali">
                                            <i class="material-icons">star</i>
                                            <i class="material-icons">star</i>
                                            <i class="material-icons">star</i>
                                            <i class="material-icons">star</i>
                                            <i class="material-icons">star_border</i>
                                            </div>
                                            <p>Precio: $${row.precio_producto}</p>
                                        </div>
                                        <div class="col s12 m3 l3 valign-wrapper" >
                                        <div class="switch">
                                            <label id="label${row.id_producto}">
                                                <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                                <span class="lever" id="lever${row.id_producto}"></span>
                                                <span>★</span>
                                            </label>
                                        </div>
                                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                        </div>
                                        </div>
                                        <div class="col s12 m9 l9">
                                            <br>
                                            <div class="divider"></div>
                                            <br>
                                        </div>

                                    `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                    // showFavo();
                                    // showOp();
                                }
                            } else if (row.calidad <= 5 && row.calidad > 4) {
                                //Para 4.5
                                if (row.calidad < 5 && row.calidad > 4) {
                                    content_estrellas += `
                                <!--Catalogo-->
                                <div class="col s12 m12 l12">
                                    <div class="col s12 m3 l3">
                                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                                            class="responsive-img" alt="" height="550" width="550">
                                    </div>
                                    <div class="col s12 m5 l5">
                                        <h5>${row.nombre_producto}</h5>
                                        <h4>${row.descripcion_producto}</h4>
                                        <p>Marca: ${row.nombre_marca}</p>
                                        <div class="row" id="contenedor_cali">
                                        <i class="material-icons">star</i>
                                            <i class="material-icons">star</i>
                                            <i class="material-icons">star</i>
                                            <i class="material-icons">star</i>
                                            <i class="material-icons">star_half</i>
                                        </div>
                                    <p>Precio: $${row.precio_producto}</p>
                                    </div>
                                    <div class="col s12 m3 l3 valign-wrapper" >
                                    <div class="switch">
                                        <label id="label${row.id_producto}">
                                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                            <span class="lever" id="lever${row.id_producto}"></span>
                                            <span>★</span>
                                        </label>
                                    </div>
                                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                    </div>
                                    <div class="col s12 m9 l9">
                                        <br>
                                        <div class="divider"></div>
                                        <br>
                                    </div>

                                    `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                    // showOp();
                                } else {


                                }
                            } else {
                                // Se presenta un mensaje de error cuando no existen datos para mostrar.
                                document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;
                            }
                        });
                        //readCheckFavoOfClient(row.id_producto);
                        //showOp();
                        // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                        // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                        M.Tooltip.init(document.querySelectorAll('.tooltipped'));
                    } else {
                        sweetAlert(4, response.exception, null);
                    }


                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });

    } else {
        // Se define un objeto con los datos del registro seleccionado.
        const data = new FormData();
        data.append("id_categoria_producto", ID);
        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cuatro").checked = false;

        fetch(API_PRODUCTO + 'readProductosCategoria', {
            method: 'post',
            body: data
        }).then(function (request) {
            // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
            if (request.ok) {
                // Se obtiene la respuesta en formato JSON.
                request.json().then(function (response) {
                    //Declaramos variables
                    let content_estrellas = '';
                    // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                    if (response.status) {
                        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                        response.dataset.map(function (row) {
                            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                            //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
                            //Productos
                            //Compramos la calidad para colocarle las estrellas
                            if (row.calidad <= 5 && row.calidad > 4) {
                                //Para 4.5
                                if (row.calidad < 5 && row.calidad > 4) {

                                } else {
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content_estrellas += `
                                <!--Catalogo-->
                                <div class="col s12 m12 l12">
                                    <div class="col s12 m3 l3">
                                        <img src="${SERVER}imagenes/productos/${row.imagen}"
                                            class="responsive-img" alt="" height="550" width="550">
                                    </div>
                                    <div class="col s12 m5 l5">
                                        <h5>${row.nombre_producto}</h5>
                                        <h4>${row.descripcion_producto}</h4>
                                        <p>Marca: ${row.nombre_marca}</p>
                                        <div class="row" id="contenedor_cali">
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        <i class="material-icons">star</i>
                                        </div>
                                        <p>Precio: $${row.precio_producto}</p>
                                    </div>
                                    <div class="col s12 m3 l3 valign-wrapper" >
                                    <div class="switch">
                                        <label id="label${row.id_producto}" >
                                            <input type="checkbox" id="cali_favo${row.id_producto}" name="cali_favo" onchange="createFavo(${row.id_producto})" onclick="changeColorActive('label${row.id_producto}','cali_favo${row.id_producto}')">
                                            <span class="lever" id="lever${row.id_producto}"></span>
                                            <span>★</span>
                                        </label>
                                    </div>
                                        <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                            href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                    </div>
                                    <div class="col s12 m9 l9">
                                        <br>
                                        <div class="divider"></div>
                                        <br>
                                    </div>
                                    
                                    `
                                    readCheckFavoOfClient(row.id_producto);
                                    ;
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
                                    //showOp();

                                }
                            } else {
                                // Se presenta un mensaje de error cuando no existen datos para mostrar.
                                document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;
                            }
                        });
                        // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        //showFavo();
                        //showOp();
                        // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                        // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                        M.Tooltip.init(document.querySelectorAll('.tooltipped'));
                    } else {
                        sweetAlert(4, response.exception, null);
                    }


                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });
    }

    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();


}

// Función para obtener y mostrar la calidad de los productos.
function readCaliProducto(id, categoria) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append("id_categoria_producto", id);
    // Petición para solicitar la calidad de la categoría seleccionada.
    fetch(API_CATEGORIA + "readProductosCategoria", {
        method: "post",
        body: data,
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    let content = "";
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        if (row.id_producto == 19) {
                            // Se crean y concatenan las tarjetas con los datos de cada producto.
                            content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="prod_individual.html?id=${row.id_producto}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                            </div>
                        </div>
                    </a>
                </div>
            
                            

                    `;
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById("producto_categoria").innerHTML = content;
                        } else {
                            content += `
                            <div class="col s12 m6 l6" id="col">
                           <a href="prod_individual.html?id=${row.id_producto}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                            </div>
                        </div>
                    </a>
                </div>
            
                            
                            

                    `;
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById("producto_categoria").innerHTML = content;
                        }
                    });
                    // Se asigna como título la categoría de los productos.
                    document.getElementById("title").textContent =
                        "Categoría: " + categoria;
                    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                    document.getElementById("ku").textContent = "ku";
                    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
                    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
                } else {
                    sweetAlert(2, request.status + " " + request.statusText, null);
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById(
                        "ku"
                    ).innerHTML = `<i class="material-icons small">cloud_off</i><span class="red-text">${response.exception}</span>`;
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}
//Función para leer info
function readInfo() {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    fetch(API + "fillInputs", {
        method: "get",
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se revisa si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
                if (response.session) {
                    // Se comprueba si la respuesta es satisfactoria, de lo contrario se direcciona a la página web principal.
                    if (response.status) {
                        const header = `
                      <!--Colocamos encabezado-->
                      <nav class="nav-extended" id="encabezado">
                          <div class="col s12 m12">
                              <div class="row">
                                  <div class="col s12 m3">
                                      <div class="nav-wrapper">
                                          <!--Insertamos logo de GAAB Store-->
                                          <a href="../../sitio_publico/index.html" class="brand-logo"><img
                                                  src="${SERVER}imagenes/logo_gaab_white_png.png" height="50"></a>
                                          <!--Insertamos navegador lateral-->
                                          <a href="#" data-target="slide-out" class="sidenav-trigger hide-on-med-and-up"><img
                                                  src="../../recursos/img/icono/menu_25px.png"></a>
                                      </div>
                                  </div>
                                  <div class="col  m1"></div>
                                  <div class="col s12 m4"></div>
                                  <div class="col s4 m4">
                                      <ul id="nav-mobile" class="right hide-on-med-and-down">
                                          <li><a class="waves-effect waves-red btn-danger" id="boton1"
                                                  href="carrito.html">$${response.total}<img
                                                      src="../../recursos/img/icono/shopping_cart_25px.png"></a></li>
      
                                          <li>
                                              <a class="waves-effect waves-red btn-danger dropdown-trigger"
                                                  data-target="dropdown"><img src="../../recursos/img/icono/user_35px.png"></a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div class=" hide-on-med-and-down" id="menus">
                              <!--Insertamos un navegador de contenido con los menus visibles para publico-->
                              <div class="nav-content">
                                  <ul class="tabs tabs-transparent">
                                      <li class="tab" id="tabla"><a href="../publico/index.html">Inicio</a></li>
                                      <li class="tab" id="tabla"><a href="../publico/productos.html">Productos</a></li>
                                      <li class="tab" id="tabla"><a href="categorias.html" class="waves-effect waves-red btn-danger">Catergorías</a>
                                      </li>
                                      <li class="tab" id="tabla"><a href="../publico/soporte.html">Soporte</a></li>
                                      <li class="tab" id="tabla"><a href="../publico/quienes_somos.html">¿Quiénes somos?</a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </nav>
                      <!--Insertamos las opciones del navegador lateral-->
                      <ul id="slide-out" class="sidenav">
                          <li>
                              <div class="user-view">
                                  <div class="background">
                                      <img src="../../recursos/img/imagenes/fondo.png">
                                  </div>
                                  <a><img class="circle" src="${SERVER}imagenes/clientes/${response.dataset.imagen_perfil_cliente}"></a>
                                  <a><span class="white-text name">${response.dataset.usuario_cliente}</span></a>
                                  <a><span class="white-text email">${response.dataset.correo_cliente}</span></a>
                              </div>
                          </li>
                          <li><a class="waves-effect waves-red btn-danger" id="boton1" href="carrito.html">$${response.total}<img
                                      src="../../recursos/img/icono/shopping_cart_25px.png"></a></li>
                          <li><a href="productos.html" class="waves-effect waves-red btn-danger">Productos</a>
                          </li>
                          <li><a href="categorias.html" class="waves-effect waves-red btn-danger">Catergorías</a>
                          </li>
                          <li><a href="soporte.html" class="waves-effect waves-red btn-danger">Soporte</a></li>
                          <li><a href="quienes_somos.html" class="waves-effect waves-red btn-danger">¿Quiénes
                                  somos?</a></li>
                          <div class="divider"></div>
                          </li>
                          <li><a href="../publico/mis_pedidos.html">Mis pedidos</a></li>
                          <li><a onClick="logOut()" class="waves-effect waves-red btn-danger">Log out</a></li>
                      </ul>
                      </div>
                      <!--Opciones de menú desplegable-->
                      <ul id='dropdown' class='dropdown-content'>
                          <li><a href="../publico/perfil.html">Editar perfil</a></li>
                          <li><a href="../publico/mis_pedidos.html">Mis pedidos</a></li>
                          <li><a onClick="logOut()">Cerrar Sesión</a></li>
                      </ul>
                      `;

                        document.querySelector("header").innerHTML = header;
                        //Opciones del dropdwon-trigger
                        let options = {
                            alignment: "right",
                        };
                        // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
                        M.Dropdown.init(
                            document.querySelectorAll(".dropdown-trigger"),
                            options
                        );
                        // Se inicializa el componente Sidenav para que funcione la navegación lateral.
                        M.Sidenav.init(document.querySelectorAll(".sidenav"));
                    } else {
                        sweetAlert(3, response.exception, "index.html");
                    }
                } else {
                    readInfoSinLogueado();
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Función de si no se ha logueado
function readInfoSinLogueado() {
    const header = `
                      <!--Colocamos encabezado-->
                      <nav class="nav-extended" id="encabezado">
                          <div class="col s12 m12">
                              <div class="row">
                                  <div class="col s12 m3">
                                      <div class="nav-wrapper">
                                          <!--Insertamos logo de GAAB Store-->
                                          <a href="../../sitio_publico/index.html" class="brand-logo"><img
                                                  src="${SERVER}imagenes/logo_gaab_white_png.png" height="50"></a>
                                          <!--Insertamos navegador lateral-->
                                          <a href="#" data-target="slide-out" class="sidenav-trigger hide-on-med-and-up"><img
                                                  src="../../recursos/img/icono/menu_25px.png"></a>
                                      </div>
                                  </div>
                                  <div class="col  m1"></div>
                                  <div class="col s12 m4"></div>
                                  <div class="col s4 m4">
                                  <ul id="nav-mobile" class="right hide-on-med-and-down">
                                  <li><a class="waves-effect waves-red btn-danger " id="boton2"
                                          href="../publico/login.html">LOG IN</a></li>
                                  </ul>
                                  </div>
                              </div>
                          </div>
                          <div class=" hide-on-med-and-down" id="menus">
                              <!--Insertamos un navegador de contenido con los menus visibles para publico-->
                              <div class="nav-content">
                                  <ul class="tabs tabs-transparent">
                                      <li class="tab" id="tabla"><a href="../publico/index.html">Inicio</a></li>
                                      <li class="tab" id="tabla"><a href="../publico/productos.html">Productos</a></li>
                                      <li class="tab" id="tabla"><a href="categorias.html" class="waves-effect waves-red btn-danger">Catergorías</a>
                                      </li>
                                      <li class="tab" id="tabla"><a href="../publico/soporte.html">Soporte</a></li>
                                      <li class="tab" id="tabla"><a href="../publico/quienes_somos.html">¿Quiénes somos?</a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </nav>
                      <!--Insertamos las opciones del navegador lateral-->
                      <ul id="slide-out" class="sidenav">
                          <li>
                              <div class="user-view">
                                  <div class="background">
                                      <img src="../../recursos/img/imagenes/fondo.png">
                                  </div>
                                  <a href="../publico/login.html"><span class="white-text">Log in</span></a>
                              </div>
                          </li>
                          <li><a href="productos.html" class="waves-effect waves-red btn-danger">Productos</a>
                          </li>
                          <li><a href="categorias.html" class="waves-effect waves-red btn-danger">Catergorías</a>
                          </li>
                          <li><a href="soporte.html" class="waves-effect waves-red btn-danger">Soporte</a></li>
                          <li><a href="quienes_somos.html" class="waves-effect waves-red btn-danger">¿Quiénes
                                  somos?</a></li>
                          <div class="divider"></div>
                          </li>
                          <li><a href="../publico/login.html" class="waves-effect waves-red btn-danger">Log in</a></li>
                      </ul>
                      </div>
                      `;
    document.querySelector("header").innerHTML = header;
    //Opciones del dropdwon-trigger
    let options = {
        alignment: "right",
    };
    // Se inicializa el componente Sidenav para que funcione la navegación lateral.
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
}


// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search-form').addEventListener('keyup', function (event) {
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = params.get("id_categoria");
    const NAME = params.get("nombre");
    let parameter = new FormData(document.getElementById('search-form'));
    parameter.append('id_categoria', ID);
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PRODUCTO + 'searchProductoCategoria', {
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
                    fillTableProductosCategoria(response.dataset);
                    // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                    M.updateTextFields();
                    //Si no hay coincidencias se carga la tabla sin datos
                } else if (response.exception == 'No hay coincidencias') {
                    fillTableProductosCategoria(response.dataset);
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readProductosCategoria(ID, NAME);
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});
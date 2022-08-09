// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_PRODUCTO = SERVER + "publico/productos.php?action=";

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
});


// Función para obtener y mostrar los productos de acuerdo a la categoría seleccionada.
function readProductosCategoria(id, categoria) {
  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append("id_categoria_producto", id);
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
    
                      `;
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
    
                     `;
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
    
                      `;
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
    
                     `;
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
    
                    `;
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
    
                    `;
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
    
                         `;
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
    
                      `;
                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
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
    
                         `;
                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                    document.getElementById("contenedor_productos").innerHTML = content_estrellas;
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
                        
                        `;
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
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div> `;
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
                            <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s12 l8"
                                href="producto_individual.html?id_producto=${row.id_producto}&id_detalle=${row.id_detalle}" id="boton_datos"><i
                                    class="material-icons left black-text">remove_red_eye</i>Ver</a>
                        </div>
                        </div>
                        <div class="col s12 m9 l9">
                            <br>
                            <div class="divider"></div>
                            <br>
                        </div>`;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_productos").innerHTML = content_estrellas;
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
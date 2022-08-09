// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_PRODUCTOS = SERVER + "publico/productos.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", function () {
  // Se busca en la URL las variables (parámetros) disponibles.
  let params = new URLSearchParams(location.search);
  // Se obtienen los datos localizados por medio de las variables.
  const ID = params.get("id_producto");
  const IDDETALLE = params.get("id_detalle");
  // Se llama a la función que muestra el detalle del producto seleccionado previamente.
  readOneProducto(ID);
  readComent(ID);
  readCali(IDDETALLE);
  // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
  M.Tooltip.init(document.querySelectorAll(".tooltipped"));
});

// Función para obtener y mostrar los datos del producto seleccionado.
function readOneProducto(id) {
  // Se define un objeto con los datos del producto seleccionado.
  const data = new FormData();
  data.append("id_producto", id);
  // Petición para obtener los datos del producto solicitado.
  fetch(API_PRODUCTOS + "readOneProducto", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          // Se colocan los datos en la tarjeta de acuerdo al producto seleccionado previamente.
          document.getElementById("imagen_producto").setAttribute("src", SERVER + "imagenes/productos/" + response.dataset.imagen);
          document.getElementById("nombre_producto").textContent = response.dataset.nombre_producto;
          document.getElementById("marca_producto").textContent = "Marca: " + response.dataset.nombre_marca;
          document.getElementById("nombre_vendedor").textContent = response.dataset.nombre_vendedor;
          document.getElementById("descripcion_producto").textContent = response.dataset.descripcion_producto;
          document.getElementById("precio_producto").textContent = "Precio: $" + response.dataset.precio_producto;
          // Se asigna el valor del id del producto al campo oculto del formulario.
          document.getElementById("id_producto").value = response.dataset.id_producto;
        } else {
          // Se presenta un mensaje de error cuando no existen datos para mostrar.
          document.getElementById("title").innerHTML = `<i class="material-icons small">cloud_off</i><span class="red-text">${response.exception}</span>`;
          // Se limpia el contenido cuando no hay datos para mostrar.
          document.getElementById("descripcion_producto").innerHTML = "";
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

//Leemos calidad de producto individual
function readCali(id_detalle) {
  // Se define un objeto con los datos del producto seleccionado.
  const data = new FormData();
  data.append("id_detalle", id_detalle);
  fetch(API_PRODUCTOS + 'readCali', {
    method: "post",
    body: data,
  }).then(function (request) {
    if (request.ok) {
      request.json().then(function (response) {
        if (response.status) {
          //Definimos variables
          let content_estrellas = '';
          // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
          response.dataset.map(function (row) {
            //Compramos la calidad para colocarle las estrellas
            if (row.calidad <= 1 && row.calidad > 0) {
              //Para 0.5
              if (row.calidad < 1) {
                content_estrellas += `
                                <i class="material-icons yellow-text">star_half</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>`;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              } else {
                //Para 1
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                                <i class="material-icons yellow-text">star</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>  `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              }
              //Para 1.5
            } else if (row.calidad <= 2 && row.calidad > 1) {
              if (row.calidad < 2 && row.calidad > 1) {
                content_estrellas += `                            
                                <i class="material-icons yellow-text">star</i>
                                <i class="material-icons yellow-text">star_half</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>  `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              } else {
                //Para 2
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                                <i class="material-icons yellow-text">star</i>
                                <i class="material-icons yellow-text">star</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>`;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              }
            } else if (row.calidad <= 3 && row.calidad > 2) {
              //Para 2.5
              if (row.calidad < 3 && row.calidad > 2) {
                content_estrellas += `
                                <i class="material-icons yellow-text">star</i>
                                <i class="material-icons yellow-text">star</i>
                                <i class="material-icons yellow-text">star_half</i>
                                <i class="material-icons yellow-text">star_border</i>
                                <i class="material-icons yellow-text">star_border</i>`;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              } else {
                //Para 3
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                                 <i class="material-icons yellow-text">star</i>
                                 <i class="material-icons yellow-text">star</i>
                                 <i class="material-icons yellow-text">star</i>
                                 <i class="material-icons yellow-text">star_border</i>
                                 <i class="material-icons yellow-text">star_border</i> `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              }
            } else if (row.calidad <= 4 && row.calidad > 3) {
              //Para 3.5
              if (row.calidad < 4 && row.calidad > 3) {
                content_estrellas += `
                                    <i class="material-icons yellow-text">star</i>
                                    <i class="material-icons yellow-text">star</i>
                                    <i class="material-icons yellow-text">star</i>
                                    <i class="material-icons yellow-text">star_half</i>
                                    <i class="material-icons yellow-text">star_border</i> `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              } else {
                //Para 4
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                                 <i class="material-icons yellow-text">star</i>
                                 <i class="material-icons yellow-text">star</i>
                                 <i class="material-icons yellow-text">star</i>
                                 <i class="material-icons yellow-text">star</i>
                                 <i class="material-icons yellow-text">star_border</i>`;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                content_estrellas.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              }
            } else if (row.calidad <= 5 && row.calidad > 4) {
              //Para 4.5
              if (row.calidad < 5 && row.calidad > 4) {
                content_estrellas += `
                                    <i class="material-icons yellow-text">star</i>
                                    <i class="material-icons yellow-text">star</i>
                                    <i class="material-icons yellow-text">star</i>
                                    <i class="material-icons yellow-text">star</i>
                                    <i class="material-icons yellow-text">star_half</i>`;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              } else {
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content_estrellas += `
                                  <i class="material-icons yellow-text">star</i>
                                  <i class="material-icons yellow-text">star</i>
                                  <i class="material-icons yellow-text">star</i>
                                  <i class="material-icons yellow-text">star</i>
                                  <i class="material-icons yellow-text">star</i>`;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
              }
            } else if (row.calidad == null ) {
              content_estrellas += `
                                <p class"black-text">No hay calificación para este producto</p> `;
              // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
              document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
            } else {
              content_estrellas += `
                                <p class="black-text">No hay calificación para este producto</p>`;
              // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
              document.getElementById("contenedor_calidad").innerHTML = content_estrellas;
            }
          });
          // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
          document.getElementById('contenedor_calidad').innerHTML = content_estrellas;
          // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
          M.Materialbox.init(document.querySelectorAll(".materialboxed"));
        } else {
          // Se presenta un mensaje de error cuando no existen datos para mostrar.
          document.getElementById(
            "contenedor_calidad"
          ).innerHTML = `<p class"black-text">No hay calificación para este producto</p>`;
        }
      });
    } else {
      console.log(request.status + ' ' + request.statusText);
    }
  });
}

// Función para obtener y mostrar los datos del producto seleccionado.
function readComent(id) {
  // Se define un objeto con los datos del producto seleccionado.
  const data = new FormData();
  data.append("id_producto", id);
  // Petición para obtener los datos del producto solicitado.
  fetch(API_PRODUCTOS + "readComent", {
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
            //Compramos la calidad para colocarle las estrellas
            if (row.calidad <= 1 && row.calidad > 0) {
              //Para 0.5
              if (row.calidad < 1) {
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p> 
                    <i class="material-icons yellow-text">star_half</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>
                            `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              } else {
                //Para 1
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p>  
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>

                            `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              }
              //Para 1.5
            } else if (row.calidad <= 2 && row.calidad > 1) {
              if (row.calidad < 2 && row.calidad > 1) {
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star_half</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>

                            `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              } else {
                //Para 2
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>

                            `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              }
            } else if (row.calidad <= 3 && row.calidad > 2) {
              //Para 2.5
              if (row.calidad < 3 && row.calidad > 2) {
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p>
                    <i class="material-icons yellow-text">star_half</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>

                            `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              } else {
                //Para 3
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p>  
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star_border</i>
                    <i class="material-icons yellow-text">star_border</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>

                            `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              }
            } else if (row.calidad <= 4 && row.calidad > 3) {
              //Para 3.5
              if (row.calidad < 4 && row.calidad > 3) {
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star_half</i>
                    <i class="material-icons yellow-text">star_border</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>
                            `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              } else {
                //Para 4
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star_border</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>

                            `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              }
            } else if (row.calidad <= 5 && row.calidad > 4) {
              //Para 4.5
              if (row.calidad < 5 && row.calidad > 4) {
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star_half</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>

                              `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              } else {
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                content += `
                <div>
                <div class="row valign-wrapper">
                <div class="col s2 m1 l1 offset-l1 offset-m1">
                    <img class="responsive-img circle"
                        src="${SERVER}imagenes/clientes/${row.imagen_perfil_cliente}" />
                </div>
                <div class="col s10 m10 l10">
                    <p>${row.usuario_cliente}</p>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                    <i class="material-icons yellow-text">star</i>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 m8 l8 offset-l1 offset-m1">
                        <p>
                            ${row.comentario}
                        </p>
                    </div>
                </div>
                </div>

                    `;
                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                document.getElementById("coment_texto").innerHTML = content;
              }
            } else if (row.calidad == null) {
              // Se crean y concatenan las tarjetas con los datos de cada producto.
              content += `
              <div class="col s12 m8 l8 offset-l1 offset-m1">
              <p class"black-text">No hay comentarios para este producto</p>
              </div>
                    `;
              // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
              document.getElementById("coment_texto").innerHTML = content;
            } else {
              // Se crean y concatenan las tarjetas con los datos de cada producto.
              content += `
              <div class="col s12 m8 l8 offset-l1 offset-m1">
              <p class"black-text">No hay comentarios para este producto</p>
              </div>
                            `;
              // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
              document.getElementById("coment_texto").innerHTML = content;
            }
          });
          // Se colocan los datos en la tarjeta de acuerdo al producto seleccionado previamente.
          document.getElementById("coment_texto").innerHTML = content;
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

// Método manejador de eventos que se ejecuta cuando se envía el formulario de agregar un producto al carrito.
document.getElementById("shopping-form").addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para agregar un producto al pedido.
    fetch(API_PEDIDOS + "createDetail", {
      method: "post",
      body: new FormData(document.getElementById("shopping-form")),
    }).then(function (request) {
      // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
      if (request.ok) {
        // Se obtiene la respuesta en formato JSON.
        request.json().then(function (response) {
          // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
          if (response.status) {
            sweetAlert(1, response.message, "carrito.html");
          } else {
            // Se verifica si el cliente ha iniciado sesión para mostrar la excepción, de lo contrario se direcciona para que se autentique.
            if (response.session) {
              sweetAlert(2, response.exception, null);
            } else {
              sweetAlert(3, response.exception, "login.html");
            }
          }
        });
      } else {
        console.log(request.status + " " + request.statusText);
      }
    });
  });

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

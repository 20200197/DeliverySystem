// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_PRODUCTOS = SERVER + 'publico/productos.php?action=';
const API_FAVORITO = SERVER + "publico/favorito.php?action=";
const API_CLIENTE = SERVER + 'publico/cliente.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    //Llenamos con los datos
    readProductos();
    readCategoria();
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false
    }
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));


    //document.getElementById("leve").style.visibility="hidden";
    //showFavo();
checkRango();
});

function validateFilterPrice() {
    document.getElementById('cali_cinco').checked = false;
    document.getElementById('cali_cuatro').checked = false;
    document.getElementById('cali_tres').checked = false;
    document.getElementById('cali_dos').checked = false;
    document.getElementById('cali_uno').checked = false;
}

function validateFilterCali() {
    document.getElementById('group1').checked = false;
    document.getElementById('group2').checked = false;
    document.getElementById('group3').checked = false;
    document.getElementById('group4').checked = false;
}

// Función para llenar con los datos de los registros.
function readProductos() {
    fetch(API_PRODUCTOS + 'readProductos', {
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
                fillTable(data);
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });

}

//Función para leer categoria
function readCategoria() {
    fetch(API_PRODUCTOS + 'readCategoria', {
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

function fillTable(dataset) {
    //Declaramos variables
    let content_estrellas = '';

    dataset.map(function (row) {
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
                                    ${getEstrellas(row.calidad)}
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
                                            href="producto_individual.html?id_producto=${row.id_producto}&calidad=${row.calidad}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                </div>
                                <div class="col s12 m9 l9">
                                    <br>
                                    <div class="divider"></div>
                                    <br>
                                </div>
            
                            `;
            readCheckFavoOfClient(row.id_producto);
    });

    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('contenedor_productos').innerHTML = content_estrellas;
    //showFavo();
    //yshowOp();
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}

//Función para llenar los datos
function fillTableC(dataset) {
    //Declaramos variables
    let content = '';
    let url = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se define una dirección con los datos de cada categoría para mostrar sus productos en otra página web.
        url = `producto_categoria.html?id_categoria=${row.id_categoria}&nombre=${row.categoria}`;
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

function readCali() {
    fetch(API_PRODUCTOS + 'readCali', {
        method: 'get'
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
                                  <i class="material-icons">star_half</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                //Para 1
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>  `;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                            //Para 1.5
                        } else if (row.calidad <= 2 && row.calidad > 1) {
                            if (row.calidad < 2 && row.calidad > 1) {
                                content_estrellas += `                            
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star_half</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>  `;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                //Para 2
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                        } else if (row.calidad <= 3 && row.calidad > 2) {
                            //Para 2.5
                            if (row.calidad < 3 && row.calidad > 2) {
                                content_estrellas += `
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star_half</i>
                                  <i class="material-icons">star_border</i>
                                  <i class="material-icons">star_border</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                //Para 3
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star_border</i>
                                   <i class="material-icons">star_border</i> `;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                        } else if (row.calidad <= 4 && row.calidad > 3) {
                            //Para 3.5
                            if (row.calidad < 4 && row.calidad > 3) {
                                content_estrellas += `
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star_half</i>
                                      <i class="material-icons">star_border</i> `;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                //Para 4
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>
                                   <i class="material-icons">star</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                content_estrellas.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                        } else if (row.calidad <= 5 && row.calidad > 4) {
                            //Para 4.5
                            if (row.calidad < 5 && row.calidad > 4) {
                                content_estrellas += `
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star</i>
                                      <i class="material-icons">star_half</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            } else {
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content_estrellas += `
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>`;
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                            }
                        } else if (row.calidad == null) {
                            content_estrellas += `
                                  <p>No hay calificación para este producto</p> `;
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                        } else {
                            content_estrellas += `
                                  <p>No hay calificación para este producto</p>`;
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById("contenedor_cali").innerHTML = content_estrellas;
                        }
                    });
                    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                    document.getElementById('contenedor_cali').innerHTML = content_estrellas;
                    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
                } else {
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById(
                        "title"
                    ).innerHTML = `<i class="material-icons small">cloud_off</i><span class="red-text">${response.exception}</span>`;
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

// Método para search por precio
function searchProductosPrecio() {
    //readCheckFavoOfClient();
    let parameter = new FormData();
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
    fetch(API_PRODUCTOS + 'searchProductoPrecio', {
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
                    fillTable(response.dataset);
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
                    fillTable(response.dataset);
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">${response.exception}</span><p><i class="material-icons medium black-text">home</i></p>`;
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readProductos();
                    readCategoria();
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
    document.getElementById("title").textContent = '';
}

//Función par buscar custom
function searchCustom() {
    let parameter = new FormData();
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
    fetch(API_PRODUCTOS + 'searchProductoPrecio', {
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
                    fillTable(response.dataset);
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
                    fillTable(response.dataset);
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById("title").innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">${response.exception}</span><p><i class="material-icons medium black-text">home</i></p>`;
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readProductos();
                    readCategoria();
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
    document.getElementById("title").textContent = '';
}

function getEstrellas(calidad) {
    let estrellas = null;
    if (calidad == null) {
        estrellas = `<p>No hay calificación para este producto</p>`;
    } else if (calidad < 1) {
        estrellas = `<i class="material-icons">star_half</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>`;
    } else if (calidad == 1) {
        estrellas = `<i class="material-icons">star</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>`;
    } else if (calidad > 1 && calidad < 2) {
        estrellas = `<i class="material-icons">star</i>
                        <i class="material-icons">star_half</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>`;
    } else if (calidad == 2) {
        estrellas = `<i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>`;
    } else if (calidad > 2 && calidad < 3) {
        estrellas = `<i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_half</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>`;
    } else if (calidad == 3) {
        estrellas = `<i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_border</i>
                        <i class="material-icons">star_border</i>`;
    } else if (calidad > 3 && calidad < 4) {
        estrellas = `<i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_half</i>
                        <i class="material-icons">star_border</i>`;
    } else if (calidad == 4) {
        estrellas = `<i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_border</i>`;
    } else if (calidad > 4 && calidad < 5) {
        estrellas = `<i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star_half</i>`;
    } else if (calidad == 5) {
        estrellas = `<i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>`;
    } 

    return estrellas;
}

//Función para search por calidad
function searchProductosCalidad() {
    //Evaluamos la opcion del checkbox que se selecciono
    if (document.getElementById("cali_uno").checked == true) {
        //Deshabilitamos
        document.getElementById("cali_uno").checked = true;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cuatro").checked = false;
        document.getElementById("cali_cinco").checked = false;
        fetch(API_PRODUCTOS + 'readProductosCalidad&calidad=1.00', {
            method: 'get'
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
                                    ${getEstrellas(row.calidad)}
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
                                            href="producto_individual.html?id_producto=${row.id_producto}&calidad=${row.calidad}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                </div>
                                <div class="col s12 m9 l9">
                                    <br>
                                    <div class="divider"></div>
                                    <br>
                                </div>
            
                             `;
                             readCheckFavoOfClient(row.id_producto);
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
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        document.getElementById('title').innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;;
                    }
                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });

    } else if (document.getElementById("cali_dos").checked == true) {
        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cuatro").checked = false;
        document.getElementById("cali_cinco").checked = false;
        fetch(API_PRODUCTOS + 'readProductosCalidad&calidad=2.00', {
            method: 'get'
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
                                    ${getEstrellas(row.calidad)}
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
                                            href="producto_individual.html?id_producto=${row.id_producto}&calidad=${row.calidad}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                </div>
                                <div class="col s12 m9 l9">
                                    <br>
                                    <div class="divider"></div>
                                    <br>
                                </div>
            
                             `;
                             readCheckFavoOfClient(row.id_producto);
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
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        document.getElementById('title').innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;;
                    }
                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });

    } else if (document.getElementById("cali_tres").checked == true) {

        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_cuatro").checked = false;
        document.getElementById("cali_cinco").checked = false;

        fetch(API_PRODUCTOS + 'readProductosCalidad&calidad=3.00', {
            method: 'get'
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
                                    ${getEstrellas(row.calidad)}
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
                                            href="producto_individual.html?id_producto=${row.id_producto}&calidad=${row.calidad}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                </div>
                                <div class="col s12 m9 l9">
                                    <br>
                                    <div class="divider"></div>
                                    <br>
                                </div>
            
                             `;
                             readCheckFavoOfClient(row.id_producto);
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
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        document.getElementById('title').innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;;
                    }
                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });


    } else if (document.getElementById("cali_cuatro").checked == true) {

        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cinco").checked = false;

        fetch(API_PRODUCTOS + 'readProductosCalidad&calidad=4.00', {
            method: 'get'
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
                                    ${getEstrellas(row.calidad)}
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
                                            href="producto_individual.html?id_producto=${row.id_producto}&calidad=${row.calidad}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                </div>
                                <div class="col s12 m9 l9">
                                    <br>
                                    <div class="divider"></div>
                                    <br>
                                </div>
            
                             `;
                             readCheckFavoOfClient(row.id_producto);
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
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        document.getElementById('title').innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;;
                    }


                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });

    } else {

        //Deshabilitamos
        document.getElementById("cali_uno").checked = false;
        document.getElementById("cali_dos").checked = false;
        document.getElementById("cali_tres").checked = false;
        document.getElementById("cali_cuatro").checked = false;

        fetch(API_PRODUCTOS + 'readProductosCalidad&calidad=5.00', {
            method: 'get'
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
                                    ${getEstrellas(row.calidad)}
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
                                            href="producto_individual.html?id_producto=${row.id_producto}&calidad=${row.calidad}" id="boton_datos"><i
                                                class="material-icons left black-text">remove_red_eye</i>Ver</a>
                                    </div>
                                </div>
                                <div class="col s12 m9 l9">
                                    <br>
                                    <div class="divider"></div>
                                    <br>
                                </div>
            
                             `;
                             readCheckFavoOfClient(row.id_producto);
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
                        document.getElementById('contenedor_productos').innerHTML = content_estrellas;
                        document.getElementById('title').innerHTML = `<i class="material-icons small black-text">cloud_off</i><span class="red-text">No hay coincidencias</span><p><i class="material-icons medium black-text">home</i></p>`;;
                    }


                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });
    }

    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    document.getElementById("title").textContent = '';

}

//Agregar productos a favorito
function createFavo(id) {

    //Comprobamos si el radio esta chequeado
    fetch(API_PRODUCTOS + 'session', {
        method: 'get'
    }).then(function (request) {
        if(request.ok){
            request.json().then(function (response) {
                if(response.status) {
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
                } else {
                    sweetAlert(4, 'Inicie sesión para agregar a favoritos', null);
                }
            });
        }else{
            console.log(request.status + ' ' + request.statusText);
        }
    });

    

}

//Mostrar los favoritos activos, las estrellas cuando esten agregados
function showFavo() {

    fetch(API_FAVORITO + 'readOne', {
        method: 'get'
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
function showOp() {

    fetch(API_PRODUCTOS + 'readProductos', {
        method: 'get'
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

function changeColorActive(label, camb) {
    if (document.getElementById(camb).checked) {
        document.getElementById(label).style.color = "orange";

    } else {
        document.getElementById(label).style.color = "";
    }
}


//Mostrar los favoritos activos, las estrellas cuando esten agregados
function readCheckFavoOfClient(id) {
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

function updateEstado(id) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('idP', id);

    //Obtenemos valor de switch
    if (document.getElementById('switch_estado' + id).checked) {
        data.append('estadoP', true);
    } else {
        data.append('estadoP', false)
    }
    fetch(API_PRODUCTOS + 'update', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se cargan nuevamente las filas en la tabla de la vista después de guardar un registro y se muestra un mensaje de éxito.
                    readRows(API_PRODUCTOS);
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



// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search-form').addEventListener('keyup', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PRODUCTOS + 'search', {
        method: 'post',
        body: new FormData(document.getElementById('search-form'))
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    //Se llena la tabla
                    fillTable(response.dataset);
                    // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                    M.updateTextFields();
                    //Si no hay coincidencias se carga la tabla sin datos
                } else if (response.exception == 'No hay coincidencias') {
                    fillTable(response.dataset);
                    //Si no se busca nada se carga la tabla
                } else if (response.exception == 'Ingrese un valor para buscar') {
                    readProductos(API_PRODUCTOS);
                } else {

                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

function checkRango() {
    // Petición para obtener los datos del gráfico.
    fetch(API_CLIENTE + 'checkRango', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
                if (response.status) {
                  if(response.dataset.rango_ch == '90 days'){
                    Swal.fire({
                        title: 'Han pasado 90 días desde su último cambio de contraseña, por favor cambiela en este momento.',
                        icon:'info',
                        width: 600,
                        padding: '3em',
                        color: '#716add',
                        background: '#fff',
                   
                }).then(function () {  
                    location.href = 'perfil.html';
                });
                  }
                } else {
                    document.getElementById('porcentajeProductos');
                    console.log(response.exception);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}
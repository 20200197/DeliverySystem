const API_VENDEDOR = SERVER + 'publico/vendedor.php?action='

document.addEventListener("DOMContentLoaded", function () {
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
    readbarrasProductosMasVendidosValorados();
    readDonaPorcentajeVentaCategoria();

});

//cambios Bonilla1 24-08-2022
function opcionesCategoria() {
    fetch(API_VENDEDOR + "readAllCategoria", {
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
                document.getElementById("opciones_departamento").innerHTML = content;
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
        title: "Selecciona una categoria",
        html: '<div class="input-field"><select class="browser-default" id="opciones_departamento" name="opciones_departamento" required> </select></div>',
        showCancelButton: true,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isDismissed) { } else {
            //Obtenemos la opcion seleccinada
            var selectedOption =
                document.getElementById("opciones_departamento").options[
                document.getElementById("opciones_departamento").selectedIndex
                ];
            readLineaVentas(selectedOption.text);
        }
    });
}

function readLineaVentas(categoria) {
    let parameter = new FormData();
    parameter.append('nombre_categoria', categoria);

    fetch(API_VENDEDOR + 'readSellCategory', {
        method: 'post',
        body: parameter
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                let cabeceras = [];
                let general = [];
                if (response.status) {
                    let datos = [];
                    response.dataset.map(function (row) {
                        cabeceras.push(row.fecha);
                        datos.push({
                            meta: '($)',
                            value: row.total
                        });
                    });

                    general.push(datos);
                    lineaI('.recaudado_categoria_linea', cabeceras, general);
                } else {
                    sweetAlert(2, response.exception, null);
                    lineaI('.recaudado_categoria_linea', null, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

//Función que cargar las graficas de barra donde se mueestra top 5 productos mas vendidos con sus valoraciones
function readbarrasProductosMasVendidosValorados() {

    //Se realiza la petición para cargar los datos
    fetch(API_VENDEDOR + "readProductosMasVendidosValorados", {
        method: "get"
    }).then(function (request) {
        //Se revisa si se ejecutó la sentencia
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function (response) {
                //Se verifica el estado de la respuesta
                if (response.status) {
                    /** Se crean los vectores generales donde se guardarán los datos*/
                    let cabeceras = []; //Vector donde se guardarán los titulos de la gráfica
                    let general = []; //Vector donde se guardarán los datos por toda la gráfica (Es un contenedor nada más)
                    /*
                     * Se se desean agregar más lineas de la gráfica se deben de crear un vector más
                     */
                    let fila = []; //Vector donde se guardarán los datos por cada titulo de la gráfica (1 Línea)
                    // let fila2 = []; //Vector donde se guardarán los datos por el mismo titulo de la gráfica (1 Línea)
                    //let fila3 = []; //Vector donde se guardarán los datos por el mismo titulo de la gráfica (1 Línea)

                    //Se explorar fila por fila
                    response.dataset.map(function (row) {
                        //Se llenan los datos en los vectores generales
                        cabeceras.push(row.nombre_producto); //Se agrega un titulo
                        fila.push(row.cantidad_pedido); //Se agrega un dato para el titulo
                        //fila2.push(row.cantidad); //Si se desea agregar más de un datos por titulo se agregan aquí
                        //fila3.push(row.cantidad); //Si se desea agregar más de un datos por titulo se agregan aquí



                    });
                    //Se cargan los datos dentro del contenedor
                    general.push(fila);
                    //Si hay más lineas se agregan aquí también
                    //general.push(fila2);
                    //general.push(fila3);
                    //Se manda a llamar la función para generar una gráfica
                    barras(".barras_productos_valoracion", cabeceras, general);
                } else {
                    //Se le notifica el usuario del problema
                    //sweetAlert(2, response.exception, null);
                    //Se manda a llamar la función para generar una gráfica sin datos, sino hay
                    barras(".barras_productos_valoracion", null, null);
                }
            });
        } else {
            //Se devuelve el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Función que cargar las graficas de dona donde se mueestra el porcentaje de ventas por categoria
function readDonaPorcentajeVentaCategoria() {

    //Se realiza la petición para cargar los datos
    fetch(API_VENDEDOR + "readPorcentajeVentaCategoria", {
        method: "get"
    }).then(function (request) {
        //Se revisa si se ejecutó la sentencia
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function (response) {
                //Se verifica el estado de la respuesta
                if (response.status) {
                    /*Se crean los vectores generales donde se guardarán los datos*/
                    let cabeceras = []; //Vector donde se guardarán los titulos de la gráfica
                    /*
                     * La gráfica de pastel solo admite una línea, por lo que solo se permite una arreglo, 
                     * el general no se utiliza en este caso
                     */
                    let fila = []; //Vector donde se guardarán los datos por cada titulo de la gráfica (1 Línea)
                    //Se explorar fila por fila
                    response.dataset.map(function (row) {
                        //Se llenan los datos en los vectores generales
                        cabeceras.push(row.producto); //Se agrega un titulo
                        //Se agregan variables para guardar el nombre y el valor de la llave
                        let llave = row.categoria;
                        let valor = row.porcentaje_categoria;
                        //Se crea la llave que se mostrará en el tooltip
                        fila.push({
                            meta: llave,
                            value: valor
                        });
                    });

                    //Se manda a llamar la función para generar una gráfica
                    semiPastel(".dona_porcentaje_producto_categoria", cabeceras, fila);
                } else {
                    //Se le notifica el usuario del problema
                    //sweetAlert(2, response.exception, null);

                    //Se manda a llamar la función para generar una gráfica sin datos, sino los hay
                    semiPastel(".dona_porcentaje_producto_categoria", null, null);
                }
            });
        } else {
            //Se devuelve el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}
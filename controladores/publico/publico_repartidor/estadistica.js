const API_REPARTIDOR = SERVER + 'publico/repartidor.php?action='

document.addEventListener("DOMContentLoaded", function () {
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
    readBarraProductosMasVendidosDepartamento();
});


//Función que cargar las graficas de barra donde se mueestra producto mas vendido por departamento
function readBarraProductosMasVendidosDepartamento(nombre_departamento) {
    let data = new FormData();
    data.append('nombre_departamento', nombre_departamento);
    //Se realiza la petición para cargar los datos
    //Se realiza la petición para cargar los datos
    fetch(API_REPARTIDOR + "readProductosMasVendidosDepartamento", {
        method: "post",
        body: data
    }).then(function (request) {
        //Se revisa si se ejecutó la sentencia
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function (response) {
                //Se verifica el estado de la respuesta
                /** Se crean los vectores generales donde se guardarán los datos*/
                let cabeceras = []; //Vector donde se guardarán los titulos de la gráfica
                let general = []; //Vector donde se guardarán los datos por toda la gráfica (Es un contenedor nada más)
                if (response.status) {
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
                    barras(".barra_producto_vendido_categoria", cabeceras, general);
                } else {
                    //Se le notifica el usuario del problema
                    //sweetAlert(2, response.exception, null);
                    //Se manda a llamar la función para generar una gráfica sin datos, sino hay
                    barras(".barra_producto_vendido_categoria", null, null);
                }
            });
        } else {
            //Se devuelve el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Cargmo opciones de las categorias en el select para los reportes
function openOpciones() {
    // M.Modal.getInstance(document.getElementById("parametro-modal")).open();
    //Cargamos el select
    fetch(API_REPARTIDOR + 'readAllDepartamento', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                let content = '';
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Si no existe un valor para seleccionar, se muestra una opción para indicarlo.
                    if (!null) {
                        content += '<option disabled selected>Seleccione una opción</option>';
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
                    content += '<option>No hay opciones disponibles</option>';
                }
                // Se agregan las opciones a la etiqueta select mediante su id.
                document.getElementById("opciones_departamento").innerHTML = content;
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
    openParametro();
}

//Función para abriri parametro para reporte
function openParametro() {
    Swal.fire({
        title: 'Selecciona el departamento',
        html: '<div class="input-field"><select class="browser-default" id="opciones_departamento" name="opciones_departamento" required> </select></div>',
        showCancelButton: true,
        allowOutsideClick: false, 
    }).then((result) => {
        if (result.isDismissed) {

        } else {
            //Obtenemos la opcion seleccinada
            var selectedOption = document.getElementById("opciones_departamento").options[document.getElementById("opciones_departamento").selectedIndex];
            console.log(selectedOption.text);
            readBarraProductosMasVendidosDepartamento(selectedOption.text);
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
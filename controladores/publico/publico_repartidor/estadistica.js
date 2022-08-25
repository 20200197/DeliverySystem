const API_REPARTIDOR = SERVER + "publico/repartidor.php?action=";
//Se crea la ruta a la API
const API_ESTADISTICA = SERVER + "publico/estadistica_repartidor.php?action=";

const API_VENDEDOR = SERVER + "publico/vendedor.php?action=";
//Se crea un arreglo donde se guardarán los id de los departamentos seleccionados
var identificadores = [];
document.addEventListener("DOMContentLoaded", function() {
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
    readBarraProductosMasVendidosDepartamento();
    departamentos();
    generar([]);
});

//Función que cargar las graficas de barra donde se mueestra producto mas vendido por departamento
function readBarraProductosMasVendidosDepartamento(nombre_departamento) {
    let data = new FormData();
    data.append("nombre_departamento", nombre_departamento);
    //Se realiza la petición para cargar los datos
    //Se realiza la petición para cargar los datos
    fetch(API_REPARTIDOR + "readProductosMasVendidosDepartamento", {
        method: "post",
        body: data,
    }).then(function(request) {
        //Se revisa si se ejecutó la sentencia
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function(response) {
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
                    response.dataset.map(function(row) {
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
    fetch(API_REPARTIDOR + "readAllDepartamento", {
        method: "get",
    }).then(function(request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function(response) {
                let content = "";
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Si no existe un valor para seleccionar, se muestra una opción para indicarlo.
                    if (!null) {
                        content += "<option disabled selected>Seleccione una opción</option>";
                    }
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function(row) {
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
        title: "Selecciona el departamento",
        html: '<div class="input-field"><select class="browser-default" id="opciones_departamento" name="opciones_departamento" required> </select></div>',
        showCancelButton: true,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isDismissed) {} else {
            //Obtenemos la opcion seleccinada
            var selectedOption =
                document.getElementById("opciones_departamento").options[
                    document.getElementById("opciones_departamento").selectedIndex
                ];
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

//Función para cargar los departamentos
function departamentos() {
    //Se realiza la petición
    fetch(API_ESTADISTICA + "Departamento", {
        method: "get",
    }).then(function(request) {
        //Se verifica el resultado de la API
        if (request.ok) {
            //Se pasa a JSON
            request.json().then(function(response) {
                //Se verifica el estado devuelto de la API
                if (response.status) {
                    //Se crea una variable donde se colocará el HTML
                    let contenido = [];
                    //Se obtienen los datos desde el map
                    response.dataset.map(function(row) {
                        //Se llenar el vector con el HTML
                        contenido += `
                            <tr>
                                <td>
                                    <span>${row.nombre_departamento}</span>
                                </td>
                                <td>
                                    <p>
                                        <label>
                                            <input type="checkbox" id="departamento${row.id_departamento}" onclick="comprobar(${row.id_departamento})" />
                                            <span id="span${row.id_departamento}">No visible</span>
                                        </label>
                                    </p>
                                </td>
                            </tr>
                        `;
                        //Se llenar el vector con los identificadores
                        identificadores.push(row.id_departamento);
                    });
                    //Se cargan los departamentos
                    document.getElementById("departamentos").innerHTML = contenido;
                } else {
                    //Opciones para esconder los resultados
                    document.getElementById("graficaTop").style.display = "none";
                    //Se muestra el error
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            //Se imprime el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}



//Función para generar la gráfica
function comprobar(iden) {
    //Se declará el array donde se guardarán los id que si usarán
    let id = [];
    //Se revisa todos los id obtenidos para guardar los que están seleccionados
    for (let index = 0; index < identificadores.length; index++) {
        //Se revisa si el checkbox está seleccionado
        if (document.getElementById("departamento" + identificadores[index]).checked) {
            //Se guarda el id en los colocados
            id.push(identificadores[index]);
        }
    }

    //Se revisa si la cantidad de departamentos ya seleccionados
    if (id.length > 8 && document.getElementById("departamento" + iden).checked == true) {
        //Si ya existen 8 se deselecciona el que se acaba de seleccionar y no se ejecuta la gráfica
        document.getElementById("departamento" + iden).checked = false;
        //Se notifica del problema
        sweetAlert(3, "Solo se permiten 8 departamentos seleccionados a la vez", null);
        //Cambiamos el span
        document.getElementById("span" + iden).innerHTML = "No visible";
    } else {
        if (document.getElementById("departamento" + iden).checked == true) {
            //Cambiamos el span
            document.getElementById("span" + iden).innerHTML = "Visible";
        } else {
            //Cambiamos el span
            document.getElementById("span" + iden).innerHTML = "No visible";
        }
        generar(id);
    }
}

//Función para generar la gráfica a partir de los id a mostrar
function generar(arreglo) {
    //Se revisa la cantidad de id para determinar si no hay seleccionados
    if (arreglo.length == 0) {
        arreglo.push(0);
    }
    /**
     * Si hay menos de la cantidad máxima se procederá a ejecutar la función para generar la nueva gráfica
     */
    //Se crea una variable de tipo Form Data para guardar los id
    datos = new FormData();
    datos.append("departamentos", arreglo);
    //Se realiza la petición para guardar los datos
    fetch(API_ESTADISTICA + "TopClientes", {
        method: "post",
        body: datos,
    }).then(function(request) {
        //Se revisa el estado
        if (request.ok) {
            //Se pasa a JSON
            request.json().then(function(response) {
                //Se revisa el estado devuelto por la API
                //verificación para saber si no se han seleccionados departamentos
                if (response.status == 2) {
                    //Se recrea la gráfica
                    //Se ejecuta el método que generará la gráfica, está en componentes.js
                    barras(".TotalPromedio", [response.message], [
                        [0]
                    ]);
                } else if (response.status == 1) {
                    //Se limpia el mensaje
                    document.getElementById("ComentariograficaTop").innerHTML = "";
                    //Se crean los vectores donde se guardarán los datos para generar la gráfica
                    let titulos = []; //Titulos para la gráfica
                    let general = [
                        []
                    ]; //Contenedor de todos los datos
                    let controlador = {}; //Verificador para crear o posicionar datos según la cantidad de ID que provengan
                    response.dataset.map(function(departamento) {
                        //Se guardan los datos para cargarlos a un meta
                        let llave = departamento.cliente;
                        let valor = departamento.total;
                        //Se obtiene el valor del id del departamento
                        let id = departamento.id_depar;
                        /**
                         * Se verifica el id del departamento proveniente de la API
                         * Se revisa si ya existe un arreglo dentro de controlador que ya contenga ese valor
                         * Si existe se obtiene el arreglo en esa posición de general
                         * Si no existe se crea uno nuevo
                         */
                        //Si no existe el valor
                        if (!_.has(controlador, id)) {
                            //Se registra ese id dentro del controlador
                            controlador[departamento.id_depar] = 0;
                            //Se agrega los datos en el último arreglo que contiene general
                            general[0].push({
                                meta: llave + " ($)",
                                value: valor,
                            });
                            //Se agrega un nuevo titulo
                            titulos.push(departamento.departamento);
                        } else {
                            controlador[id] = controlador[id] + 1;
                            //Se obtiene la posición donde se encuentra ese id
                            let posicion = controlador[id];
                            //Se revisa la cantidad de filas disponibles
                            if (general.length <= posicion) {
                                //Se crea un nuevo vector para guardar los datos y se agregar
                                general.push([]);
                            }
                            //Se agregar los datos en el vector donde está esa posición
                            general[posicion].push({
                                meta: llave + " ($)",
                                value: valor,
                            });
                        }
                    });
                    //Se ejecuta el método que generará la gráfica, está en componentes.js
                    barras(".TotalPromedio", titulos, completar(general, titulos));
                } else {
                    //Se muestra el error
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            //Se imprime el error en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Función para completar los espacios vacíos
function completar(diccionario, titulos) {
    //Recorre la rama principal de vectores
    for (let index = 0; index < diccionario.length; index++) {
        //Se revisa si le faltan datos para llegar a 5
        if (diccionario[index].length < 5) {
            //Si le falta se rellena recorriendo el espacio
            for (let contador = diccionario[index].length; contador < titulos.length; contador++) {
                diccionario[index].push({
                    meta: "Ninguno",
                    value: 0,
                });
            }
        }
    }
    return diccionario;
}

//Función para completar los espacios vacíos
function completar(diccionario, titulos) {
    //Recorre la rama principal de vectores
    for (let index = 0; index < diccionario.length; index++) {
        //Se revisa si le faltan datos para llegar a 5
        if (diccionario[index].length < 5) {
            //Si le falta se rellena recorriendo el espacio
            for (let contador = diccionario[index].length; contador < titulos.length; contador++) {
                diccionario[index].push({
                    meta: "Ninguno",
                    value: 0,
                });
            }
        }
    }
    return diccionario;
}
/*
 *   CONTROLADOR DE USO GENERAL EN TODAS LAS PÁGINAS WEB.
 */

/*
 *   Constante para establecer la ruta del servidor.
 */
const SERVER = "http://192.168.1.2/DeliverySystem/api/";
const API_TOKEN = SERVER + "dashboard/token.php?action=getToken";

function addToken(form) {
    fetch(API_TOKEN, {
        method: 'get'
    }).then(function (request) {
        if(request.ok){
            request.json().then(function (response) {
                try{
                    document.getElementById(response.token).remove();
                }catch(exception){
                }
                form.innerHTML += `<input id='${response.token}' class='hide' name='token' value='${response.token}'>`;
            });
        }else{
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

/*
 *   Función para obtener todos los registros disponibles en los mantenimientos de tablas (operación read).
 *
 *   Parámetros: api (ruta del servidor para obtener los datos).
 *
 *   Retorno: ninguno.
 */
function readRows(api) {
    fetch(api + "readAll", {
        method: "get",
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
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
                fillTable(data);
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Función para leer mis pedidos
function readRowsMisPedidos(api) {
    fetch(api + "readAll", {
        method: "get",
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
                    sweetAlert(4, response.exception, "index.html");
                }
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
                fillTable(data);
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Para leer imagen
function readRow(api) {
    fetch(api + "readRegistro", {
        method: "get",
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
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
                fillTablee(data);
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

/*
 *   Función para obtener los resultados de una búsqueda en los mantenimientos de tablas (operación search).
 *
 *   Parámetros: api (ruta del servidor para obtener los datos) y form (identificador del formulario de búsqueda).
 *
 *   Retorno: ninguno.
 */
function searchRows(api, form) {
    fetch(api + "search", {
        method: "post",
        body: new FormData(document.getElementById(form)),
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se envían los datos a la función del controlador para que llene la tabla en la vista y se muestra un mensaje de éxito.
                    fillTable(response.dataset);
                    // sweetAlert(1, response.message, null);
                } else {
                    //   sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Función para leer productos de buscador
function searchRowsProductos(api, form) {
    fetch(api + "search", {
        method: "post",
        body: new FormData(document.getElementById(form)),
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se envían los datos a la función del controlador para que llene la tabla en la vista y se muestra un mensaje de éxito.
                    readProductosBuscador(response.dataset);
                    sweetAlert(1, response.message, null);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

/*
 *   Función para crear o actualizar un registro en los mantenimientos de tablas (operación create y update).
 *
 *   Parámetros: api (ruta del servidor para enviar los datos), form (identificador del formulario) y modal (identificador de la caja de dialogo).
 *
 *   Retorno: ninguno.
 */
function saveRow(api, action, form, modal) {
    fetch(api + action, {
        method: "post",
        body: new FormData(document.getElementById(form)),
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se cierra la caja de dialogo (modal) del formulario.
                    M.Modal.getInstance(document.getElementById(modal)).close();
                    // Se cargan nuevamente las filas en la tabla de la vista después de guardar un registro y se muestra un mensaje de éxito.
                    readRows(api);
                    sweetAlert(1, response.message, null);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

function saveRowS(api, action, form) {
    fetch(api + action, {
        method: "post",
        body: new FormData(document.getElementById(form)),
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se cargan nuevamente las filas en la tabla de la vista después de guardar un registro y se muestra un mensaje de éxito.
                    readRows(api);
                    sweetAlert(1, response.message, null);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

/*
 *   Función para eliminar un registro seleccionado en los mantenimientos de tablas (operación delete). Requiere el archivo sweetalert.min.js para funcionar.
 *
 *   Parámetros: api (ruta del servidor para enviar los datos) y data (objeto con los datos del registro a eliminar).
 *
 *   Retorno: ninguno.
 */
function confirmDelete(api, data) {
    Swal.fire({
        title: "Advertencia",
        text: "¿Desea eliminar el registro?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        denyButtonText: "Cancelar",
        showDenyButton: true,
        closeOnClickOutside: false,
        closeOnEsc: false,
    }).then((result) => {
        // Se comprueba si fue cliqueado el botón Sí para hacer la petición de borrado, de lo contrario no se hace nada.
        if (result.isConfirmed) {
            fetch(api + "delete", {
                method: "post",
                body: data,
            }).then(function (request) {
                // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
                if (request.ok) {
                    // Se obtiene la respuesta en formato JSON.
                    request.json().then(function (response) {
                        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                        if (response.status) {
                            // Se cargan nuevamente las filas en la tabla de la vista después de borrar un registro y se muestra un mensaje de éxito.
                            readRows(api);
                            sweetAlert(1, response.message, null);
                        } else {
                            sweetAlert(2, response.exception, null);
                        }
                    });
                } else {
                    console.log(request.status + " " + request.statusText);
                }
            });
        }
    });
}

/*
 *   Función para manejar los mensajes de notificación al usuario. Requiere el archivo sweetalert.min.js para funcionar.
 *
 *   Parámetros: type (tipo de mensaje), text (texto a mostrar) y url (ubicación para enviar al cerrar el mensaje).
 *
 *   Retorno: ninguno.
 */

function sweetAlert(type, text, url) {
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = "Éxito";
            icon = "success";
            break;
        case 2:
            title = "Error";
            icon = "error";
            break;
        case 3:
            title = "Advertencia";
            icon = "warning";
            break;
        case 4:
            title = "Aviso";
            icon = "info";
    }
    // Si existe una ruta definida, se muestra el mensaje y se direcciona a dicha ubicación, de lo contrario solo se muestra el mensaje.
    if (url) {
        Swal.fire({
            toast: true,
            position: "top-end",
            title: title,
            text: text,
            icon: icon,
            button: "Aceptar",
            timer: 2000,
            closeOnClickOutside: false,
            showConfirmButton: false,
            closeOnEsc: false,
        }).then(function () {
            location.href = url;
        });
    } else {
        Swal.fire({
            toast: true,
            position: "top-end",
            title: title,
            text: text,
            icon: icon,
            button: "Aceptar",
            closeOnClickOutside: false,
            showConfirmButton: false,
            timer: 2000,
            closeOnEsc: false,
        });
    }
}

/*
 *   Función para cargar las opciones en un select de formulario.
 *
 *   Parámetros: endpoint (ruta específica del servidor para obtener los datos), select (identificador del select en el formulario) y selected (valor seleccionado).
 *
 *   Retorno: ninguno.
 */
function fillSelect(endpoint, select, selected) {
    fetch(endpoint, {
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
                    if (!selected) {
                        content += "<option disabled selected>Seleccione una opción</option>";
                    }
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        // Se obtiene el dato del primer campo de la sentencia SQL (valor para cada opción).
                        value = Object.values(row)[0];
                        // Se obtiene el dato del segundo campo de la sentencia SQL (texto para cada opción).
                        text = Object.values(row)[1];
                        // Se verifica si el valor de la API es diferente al valor seleccionado para enlistar una opción, de lo contrario se establece la opción como seleccionada.
                        if (value != selected) {
                            content += `<option value="${value}">${text}</option>`;
                        } else {
                            content += `<option value="${value}" selected>${text}</option>`;
                        }
                    });
                } else {
                    content += "<option>No hay opciones disponibles</option>";
                }
                // Se agregan las opciones a la etiqueta select mediante su id.
                document.getElementById(select).innerHTML = content;
                // Se inicializa el componente Select del formulario para que muestre las opciones.
                M.FormSelect.init(document.querySelectorAll("select"));
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

function fillSelectDirection(endpoint, select, selected) {
    fetch(endpoint, {
        method: "get",
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                let content = "";
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        // Se obtiene el dato del primer campo de la sentencia SQL (valor para cada opción).
                        value = Object.values(row)[0];
                        // Se obtiene el dato del segundo campo de la sentencia SQL (texto para cada opción).
                        text = Object.values(row)[1];
                        // Se verifica si el valor de la API es diferente al valor seleccionado para enlistar una opción, de lo contrario se establece la opción como seleccionada.
                        if (value != selected) {
                            content += `<option value="${value}">${text}...</option>`;
                        } else {
                            content += `<option value="${value}" selected>${text}</option>`;
                        }
                    });
                } else {
                    content += "<option>No hay opciones disponibles</option>";
                }
                // Se agregan las opciones a la etiqueta select mediante su id.
                document.getElementById(select).innerHTML = content;
                // Se inicializa el componente Select del formulario para que muestre las opciones.
                M.FormSelect.init(document.querySelectorAll("select"));
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

/**
 *  Función para generar gráficas de tipo: barras
 *  Los parámetros de la función son:
 *
 *  - CLASS: Nombre de la clase donde se colocará la función, debe ser ".NombreClase"
 *
 *  - cabeceras: Vector con los titulos de la gráfica, debe ir ['Nombre 1', 'Nombre 2', 'Nombre 3',...]
 *
 *  - datos: Vector con los datos por cada titulo de la gráfica
 *
 *      -Para una gráfica con un solo dato por titulo
 *      [[Dato, Dato, Dato, Datos,...]]
 *
 *      -Para una gráfica con multiples datos por titulo
 *      [[Dato, Dato, Dato,...], [Dato, Dato, Dato,...], [Dato, Dato, Dato,..],...]
 *
 *  Las librerías extras a usar son
 */

function barras(CLASS, cabeceras, datos) {
    //Se crea el gráfico
    new Chartist.Bar(
        CLASS,
        {
            labels: cabeceras,
            series: datos,
        },
        {
            height: 250,
            low: 0,
            showArea: true,
            plugins: [Chartist.plugins.tooltip()],

            axisX: {
                // On the x-axis start means top and end means bottom
                position: "end",
            },
            axisY: {
                // On the y-axis start means left and end means right
                showGrid: true,
                showLabel: true,
                offset: 20,
            },
        }
    );
}

/**
 *  Función para generar gráficas de tipo: Dona
 *  Los parámetros de la función son:
 *
 *  - CLASS: Nombre de la clase donde se colocará la función, debe ser ".NombreClase"
 *
 *  - cabeceras: Vector con los titulos de la gráfica, debe ir ['Nombre 1', 'Nombre 2', 'Nombre 3',...]
 *
 *  - datos: Vector con los datos por cada titulo de la gráfica
 *
 *      -Solo admite una linea, por lo que está es la única opción
 *      [{
 *          meta: "Nombre",
 *          Valor: dato
 *      }, {
 *          meta: "Nombre",
 *          Valor: dato
 *      }, {
 *          meta: "Nombre",
 *          Valor: dato
 *      }]
 *      + meta: Titulo del dato, se debería de colocar un String.
 *      + Valor: Cantidad númerica que representa el meta (titulo), debe ser INT
 *
 *
 *  Para que funcione se deben agregar Chartist.js y Chartist-tooltip.min.js en Script
 *
 *  CDN en css
 *  < rel = "stylesheet" href = "//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" >
 *
 */
function semiPastel(CLASS, titulos, datos) {
    var chart = new Chartist.Pie(
        CLASS,
        {
            series: datos,
            labels: titulos,
        },
        {
            donut: true,
            showLabel: false,
            plugins: [Chartist.plugins.tooltip()],
            height: 300,
        }
    );

    chart.on("draw", function (data) {
        if (data.type === "slice") {
            // Se obtiene el total de elementos
            var pathLength = data.element._node.getTotalLength();

            // Se utiliza para calcular con el porcentaje de cada dato
            data.element.attr({
                "stroke-dasharray": pathLength + "px " + pathLength + "px",
            });

            //Se crean los datos para crear la animación
            var animationDefinition = {
                "stroke-dashoffset": {
                    id: "anim" + data.index,
                    dur: 700,
                    from: -pathLength + "px",
                    to: "0px",
                    easing: Chartist.Svg.Easing.easeOutQuint,
                    // Es para parar durante un tiempo antes que se reanime
                    fill: "freeze",
                },
            };

            //Se utiliza para llevar la secuencia entre cada parte de la gráfica
            if (data.index !== 0) {
                animationDefinition["stroke-dashoffset"].begin = "anim" + (data.index - 1) + ".end";
            }

            data.element.attr({
                "stroke-dashoffset": -pathLength + "px",
            });

            data.element.animate(animationDefinition, false);
        }
    });

    // Tiempo en que se tardará en animarse por completo
    chart.on("created", function () {
        if (window.__anim21278907124) {
            clearTimeout(window.__anim21278907124);
            window.__anim21278907124 = null;
        }
        window.__anim21278907124 = setTimeout(chart.update.bind(chart), 20000);
    });
}

/**
 *  Función para generar gráficas de tipo: Linea
 *  Los parámetros de la función son:
 *
 *  - CLASS: Nombre de la clase donde se colocará la función, debe ser ".NombreClase"
 *
 *  - cabeceras: Vector con los titulos de la gráfica, debe ir ['Nombre 1', 'Nombre 2', 'Nombre 3',...]
 *
 *  - datos: Vector con los datos por cada titulo de la gráfica
 *
 *      -Para una gráfica con un solo dato por titulo
 *      [[Dato, Dato, Dato, Datos,...]]
 *
 *      -Para una gráfica con multiples datos por titulo
 *      [[Dato, Dato, Dato,...], [Dato, Dato, Dato,...], [Dato, Dato, Dato,..],...]
 *
 *  Para que funcione se deben agregar Chartist.js y Chartist-tooltip.min.js en Script
 *
 *  CDN en css
 *  < rel = "stylesheet" href = "//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" >
 *
 */

function lineaI(CLASS, cabeceras, datos) {
    //Se crea la gráfica a base de la clase y los datos
    var chart = new Chartist.Line(
        CLASS,
        {
            labels: cabeceras,
            series: datos,
        },
        {
            height: 250,
            fullWidth: true,
            chartPadding: {
                right: 40,
            },
            plugins: [Chartist.plugins.tooltip()],
        }
    );
    /* --Código para que se encuentre animado---- */
    var seq = 0,
        delays = 100,
        durations = 500;

    //Se reinicia la animación
    chart.on("created", function () {
        seq = 0;
    });

    //Se dibuja los elementos usando la API de Chartist
    chart.on("draw", function (data) {
        seq++;

        if (data.type === "line") {
            //Se especifican la opacidad y las animacion de las lineas usando ccs3
            data.element.animate({
                opacity: {
                    //Se especifica el delay antes de seguir o cambiar de fase
                    begin: seq * delays + 500,
                    //Duración de la animación
                    dur: durations,
                    //El valor donde se iniciará la animación
                    from: 0,
                    //El valor donde finalizará la animación
                    to: 1,
                },
            });
        } else if (data.type === "label" && data.axis === "x") {
            data.element.animate({
                y: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.y + 100,
                    to: data.y,
                    easing: "easeOutQuart",
                },
            });
        } else if (data.type === "label" && data.axis === "y") {
            data.element.animate({
                x: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 100,
                    to: data.x,
                    easing: "easeOutQuart",
                },
            });
        } else if (data.type === "point") {
            data.element.animate({
                x1: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: "easeOutQuart",
                },
                x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: "easeOutQuart",
                },
                opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: "easeOutQuart",
                },
            });
        } else if (data.type === "grid") {
            //Animaciones para las líneas
            var pos1Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + "1"] - 30,
                to: data[data.axis.units.pos + "1"],
                easing: "easeOutQuart",
            };

            var pos2Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + "2"] - 100,
                to: data[data.axis.units.pos + "2"],
                easing: "easeOutQuart",
            };

            var animations = {};
            animations[data.axis.units.pos + "1"] = pos1Animation;
            animations[data.axis.units.pos + "2"] = pos2Animation;
            animations["opacity"] = {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: "easeOutQuart",
            };

            data.element.animate(animations);
        }
    });

    //Reanimación de la gráfica
    chart.on("created", function () {
        if (window.__exampleAnimateTimeout) {
            clearTimeout(window.__exampleAnimateTimeout);
            window.__exampleAnimateTimeout = null;
        }
        window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 18000);
    });
}

// Función para mostrar un mensaje de confirmación al momento de cerrar sesión.
function logOut(type) {
    Swal.fire({
        title: "¿Éstas seguro de cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cerrar sesión",
        allowOutsideClick: false,
        allowEscapeKey: false,
    }).then(function (value) {
        // Se verifica si fue cliqueado el botón Sí para hacer la petición de cerrar sesión, de lo contrario se muestra un mensaje.
        if (value.isConfirmed) {
            switch (type) {
                case "Admin":
                    API = SERVER + "dashboard/administrar_admin.php?action=logOut";
                    break;
                case "Vendedor":
                    API = SERVER + "dashboard/administrar_vendedor.php?action=logOut";
                    break;
                case "Cliente":
                    API = SERVER + "publico/cliente.php?action=logOut";
                    break;
                case "Repartidor":
                    API = SERVER + "publico/repartidor.php?action=logOut";
                    break;
            }
            fetch(API, {
                method: "get",
            }).then(function (request) {
                // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
                if (request.ok) {
                    // Se obtiene la respuesta en formato JSON.
                    request.json().then(function (response) {
                        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                        if (response.status) {
                            sweetAlert(1, response.message, "index.html");
                        } else {
                            sweetAlert(2, response.exception, null);
                        }
                    });
                } else {
                    console.log(request.status + " " + request.statusText);
                }
            });
        } else {
            sweetAlert(4, "Puede continuar con la sesión", null);
        }
    });
}

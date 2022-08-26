//Se crea la constante de la api
const API_ESTADISTICA = SERVER + "dashboard/administrar_cliente.php?action=";
const API_ESTADISTICA2 = SERVER + "dashboard/administrar_producto.php?action=";

// Método que ejecuta la carga de de las tablas y la activación de componentes
document.addEventListener("DOMContentLoaded", function () {
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false,
    };
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), options);
    //se inicializan los tooltp
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));

    // Se llaman a la funciones que generan los gráficos en la página web.
    graficoTopClientesDestacados();
    graficoPorcentajeProductos();
});

// Función para mostrar la cantidad de productos por categoría en un gráfico de barras.
function graficoTopClientesDestacados() {
    // Petición para obtener los datos del gráfico.
    fetch(API_ESTADISTICA + 'topClientesDestacados', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
                if (response.status) {
                    let nombre = []; //Vector donde se guardarán los titulos de la gráfica
                    let total = []; //Vector donde se guardarán los datos por toda la gráfica (Es un contenedor nada más)
                    /*
                     * Se se desean agregar más lineas de la gráfica se deben de crear un vector más
                     */
                    let dato = []; //Vector donde se guardarán los datos por cada titulo de la gráfica (1 Línea)
                    //Se explorar fila por fila
                    response.dataset.map(function (row) {
                        //Se llenan los datos en los vectores generales
                        nombre.push(row.nombre_clientes); //Se agrega un titulo
                        //Se agregan variables para guardar el nombre y el valor de la llave
                        let llave = 'Total ($)';
                        let valor = row.total;
                        //Se crea la llave que se mostrará en el tooltip
                        dato.push({
                            meta: llave,
                            value: valor
                        });
                    });
                    //Se cargan los datos dentro del contenedor
                    total.push(dato);
                    //Se manda a llamar la función para generar una gráfica
                    barras(".topClientesDestacados", nombre, total);
                } else {
                    document.getElementById('topClientesDestacados');
                    console.log(response.exception);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

// Función para mostrar la cantidad de productos por categoría en un gráfico de barras.
function graficoPorcentajeProductos() {
    // Petición para obtener los datos del gráfico.
    fetch(API_ESTADISTICA2 + 'porcentajeProductos', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
                if (response.status) {
                    //Pasos anteriores del fetch
                    /*Se crean los vectores generales donde se guardarán los datos*/
                    let categoria = []; //Vector donde se guardarán los titulos de la gráfica
                    /*
                     * La gráfica de pastel solo admite una línea, por lo que solo se permite una arreglo, 
                     * el general no se utiliza en este caso
                     */
                    let porcentaje = []; //Vector donde se guardarán los datos por cada titulo de la gráfica (1 Línea)
                    //Se explorar fila por fila
                    response.dataset.map(function (row) {
                        //Se llenan los datos en los vectores generales
                        categoria.push(row.producto); //Se agrega un titulo
                        //Se agregan variables para guardar el nombre y el valor de la llave
                        let llave = row.categoria;
                        let valor = row.porcentaje;
                        //Se crea la llave que se mostrará en el tooltip
                        porcentaje.push({
                            meta: llave,
                            value: valor
                        });
                    });

                    //Se manda a llamar la función para generar una gráfica
                    semiPastel(".porcentajeProductos", categoria, porcentaje);
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
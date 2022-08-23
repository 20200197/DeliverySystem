const API_VENDEDOR = SERVER + 'publico/vendedor.php?action='

document.addEventListener("DOMContentLoaded", function () {
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
    readbarrasProductosMasVendidosValorados();
    readDonaPorcentajeVentaCategoria();
});

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
function readDonaPorcentajeVentaCategoria () {

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

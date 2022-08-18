document.addEventListener('DOMContentLoaded', function() {
    //Ejemplos de datos obtenidos desde la API
    datos = {
        "status": 1,
        "message": null,
        "exception": null,
        "dataset": [{
            "producto": "Producto 1",
            "cantidad": 500,
        }, {
            "producto": "Producto 2",
            "cantidad": 300,
        }, {
            "producto": "Producto 3",
            "cantidad": 450,
        }, {
            "producto": "Producto 4",
            "cantidad": 600,
        }, {
            "producto": "Producto 5",
            "cantidad": 200,
        }]
    };
    generarBarra(datos);
    generarLinea(datos);
});


/**
 * Función para generar gráfica
 * 
 * Se usará una función del componentes.js Se recomiendo leearla
 * 
 * Se simulará una respuesta de la API, pero no se usará fetch
 * 
 * datos = Datos obtenidos desde la API
 */

function generarBarra(dataset) {
    //Pasos anteriores del fetch
    //Se crean los vectores generales donde se guardarán los datos
    let cabeceras = []; //Vector donde se guardarán los titulos de la gráfica
    let general = []; //Vector donde se guardarán los datos por toda la gráfica (Es un contenedor nada más)
    //Se se desean agregar más lineas de la gráfica se deben de crear un vector más
    let fila = []; //Vector donde se guardarán los datos por cada titulo de la gráfica (1 Línea)
    let fila2 = []; //Vector donde se guardarán los datos por el mismo titulo de la gráfica (1 Línea)
    let fila3 = []; //Vector donde se guardarán los datos por el mismo titulo de la gráfica (1 Línea)

    //Se explorar fila por fila
    dataset.dataset.map(function(row) {
        //Se llenan los datos en los vectores generales
        cabeceras.push(row.producto); //Se agrega un titulo
        fila.push(row.cantidad); //Se agrega un dato para el titulo
        //fila2.push(row.cantidad); //Si se desea agregar más de un datos por titulo se agregan aquí
        //fila3.push(row.cantidad); //Si se desea agregar más de un datos por titulo se agregan aquí

    });
    //Se cargan los datos dentro del contenedor
    general.push(fila);
    //Si hay más lineas se agregan aquí también
    //general.push(fila2);
    //general.push(fila3);
    //Se manda a llamar la función para generar una gráfica
    barras(".barras", cabeceras, general);
}

function generarLinea(dataset) {
    //Pasos anteriores del fetch
    //Se crean los vectores generales donde se guardarán los datos
    let cabeceras = []; //Vector donde se guardarán los titulos de la gráfica
    let general = []; //Vector donde se guardarán los datos por toda la gráfica (Es un contenedor nada más)
    //Se se desean agregar más lineas de la gráfica se deben de crear un vector más
    let fila = []; //Vector donde se guardarán los datos por cada titulo de la gráfica (1 Línea)
    //let fila2 = []; //Vector donde se guardarán los datos por el mismo titulo de la gráfica (1 Línea)
    //let fila3 = []; //Vector donde se guardarán los datos por el mismo titulo de la gráfica (1 Línea)

    //Se explorar fila por fila
    dataset.dataset.map(function(row) {
        //Se llenan los datos en los vectores generales
        cabeceras.push(row.producto); //Se agrega un titulo
        fila.push(row.cantidad); //Se agrega un dato para el titulo
        //fila2.push(row.cantidad); //Si se desea agregar más de un datos por titulo se agregan aquí
        //fila3.push(row.cantidad); //Si se desea agregar más de un datos por titulo se agregan aquí

    });
    //Se cargan los datos dentro del contenedor
    general.push(fila);
    //Si hay más lineas se agregan aquí también
    //general.push(fila2);
    //general.push(fila3);
    //Se manda a llamar la función para generar una gráfica
    lineaI(".linea", cabeceras, general);
}


function generarPastel(dataset) {
    //Pasos anteriores del fetch
    //Se crean los vectores generales donde se guardarán los datos
    let cabeceras = []; //Vector donde se guardarán los titulos de la gráfica
    let general = []; //Vector donde se guardarán los datos por toda la gráfica (Es un contenedor nada más)
    //Se se desean agregar más lineas de la gráfica se deben de crear un vector más
    let fila = []; //Vector donde se guardarán los datos por cada titulo de la gráfica (1 Línea)
    //let fila2 = []; //Vector donde se guardarán los datos por el mismo titulo de la gráfica (1 Línea)
    //let fila3 = []; //Vector donde se guardarán los datos por el mismo titulo de la gráfica (1 Línea)

    //Se explorar fila por fila
    dataset.dataset.map(function(row) {
        //Se llenan los datos en los vectores generales
        cabeceras.push(row.producto); //Se agrega un titulo
        fila.push(row.cantidad); //Se agrega un dato para el titulo
        //fila2.push(row.cantidad); //Si se desea agregar más de un datos por titulo se agregan aquí
        //fila3.push(row.cantidad); //Si se desea agregar más de un datos por titulo se agregan aquí

    });
    //Se cargan los datos dentro del contenedor
    general.push(fila);
    //Si hay más lineas se agregan aquí también
    //general.push(fila2);
    //general.push(fila3);
    //Se manda a llamar la función para generar una gráfica
    lineaI(".linea", cabeceras, general);
}
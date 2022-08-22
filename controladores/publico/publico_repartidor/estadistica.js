//Se crea la ruta a la API
const API_ESTADISTICA = SERVER + "publico/estadistica_repartidor.php?action=";
//Se crea un arreglo donde se guardarán los id de los departamentos seleccionados
var identificadores = [];
//Método que se ejecutará cuando se cargue la página
document.addEventListener("DOMContentLoaded", function () {
    departamentos();
    generar();
});

//Función para cargar los departamentos
function departamentos() {
    //Se realiza la petición
    fetch(API_ESTADISTICA + "Departamento", {
        method: "get",
    }).then(function (request) {
        //Se verifica el resultado de la API
        if (request.ok) {
            //Se pasa a JSON
            request.json().then(function (response) {
                //Se verifica el estado devuelto de la API
                if (response.status) {
                    //Se crea una variable donde se colocará el HTML
                    let contenido = [];
                    //Se obtienen los datos desde el map
                    response.dataset.map(function (row) {
                        //Se llenar el vector con el HTML
                        contenido += `
                            <tr>
                                <td>
                                    <span>${row.nombre_departamento}</span>
                                </td>
                                <td>
                                    <p>
                                        <label>
                                            <input type="checkbox" id="departamento${row.id_departamento}" onclick="generar(${row.id_departamento})" />
                                            <span>Mostrado</span>
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
function generar(iden) {
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
        sweetAlert(3, 'Solo se permiten 8 departamentos seleccionados a la vez', null);
    } else {
        /**
         * Si hay menos de la cantidad máxima se procederá a ejecutar la función para generar la nueva gráfica
         */
        //Se crea una variable de tipo Form Data para guardar los id
        datos = new FormData();
        datos.append("departamentos", id);
        //Se realiza la petición para guardar los datos
        fetch(API_ESTADISTICA + "TopClientes", {
            method: "post",
            body: datos,
        }).then(function (request) {
            //Se revisa el estado
            if (request.ok) {
                //Se pasa a JSON
                request.json().then(function (response) {
                    //Se revisa el estado devuelto por la API
                    //verificación para saber si no se han seleccionados departamentos
                    if (response.status == 2) { 
                        //Se imprime el problema
                        document.getElementById("ComentariograficaTop").innerHTML = response.message;
                    } else if (response.status == 1) {
                        //Se limpia el mensaje
                        document.getElementById("ComentariograficaTop").innerHTML = "";
                        //Se crean los vectores donde se guardarán los datos para generar la gráfica
                        let titulos = []; //Titulos para la gráfica
                        let general = [[]]; //Contenedor de todos los datos
                        let controlador = {}; //Verificador para crear o posicionar datos según la cantidad de ID que provengan
                        response.dataset.map(function (departamento) {
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
                                    meta: llave,
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

[
    { total: "12.34", cliente: "Diego Portillo", departamento: "Sonsonate", id_depar: 1 },
    { total: "195.25", cliente: "Alfonzo Alfaro", departamento: "Santa Ana", id_depar: 3 },
    { total: "21.20", cliente: "Nombre 1 Apellido 2", departamento: "San Salvador", id_depar: 5 },
    { total: "12.20", cliente: "Carlos Escamilla", departamento: "Sonsonate", id_depar: 1 },
    { total: "35.23", cliente: "Diego Portillo", departamento: "Santa Ana", id_depar: 3 },
    { total: "121.37", cliente: "Diego Portillo", departamento: "San Salvador", id_depar: 5 },
    { total: "46.50", cliente: "Alfonzo Alfaro", departamento: "San Salvador", id_depar: 5 },
    { total: "94.04", cliente: "Dora Ramos", departamento: "San Salvador", id_depar: 5 },
    { total: "125.88", cliente: "Karla Mosterroza", departamento: "Sonsonate", id_depar: 1 },
    { total: "41.85", cliente: "Karla Mosterroza", departamento: "Santa Ana", id_depar: 3 },
    { total: "289.26", cliente: "Carlos Escamilla", departamento: "San Salvador", id_depar: 5 },
];

[
    { total: "195.25", cliente: "Alfonzo Alfaro", departamento: "Santa Ana", id_depar: 3 },
    { total: "21.20", cliente: "Nombre 1 Apellido 2", departamento: "San Salvador", id_depar: 5 },
    { total: "35.23", cliente: "Diego Portillo", departamento: "Santa Ana", id_depar: 3 },
    { total: "74.10", cliente: "Karla Mosterroza", departamento: "San Vicente", id_depar: 7 },
    { total: "121.37", cliente: "Diego Portillo", departamento: "San Salvador", id_depar: 5 },
    { total: "46.50", cliente: "Alfonzo Alfaro", departamento: "San Salvador", id_depar: 5 },
    { total: "94.04", cliente: "Dora Ramos", departamento: "San Salvador", id_depar: 5 },
    { total: "75.26", cliente: "Dora Ramos", departamento: "San Vicente", id_depar: 7 },
    { total: "15.12", cliente: "Nombre 1 Apellido 2", departamento: "San Vicente", id_depar: 7 },
    { total: "41.85", cliente: "Karla Mosterroza", departamento: "Santa Ana", id_depar: 3 },
    { total: "23.25", cliente: "Alfonzo Alfaro", departamento: "San Vicente", id_depar: 7 },
    { total: "289.26", cliente: "Carlos Escamilla", departamento: "San Salvador", id_depar: 5 },
];

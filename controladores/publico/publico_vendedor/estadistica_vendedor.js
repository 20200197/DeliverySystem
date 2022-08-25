//Se crea la constante donde se guardará la ruta de la API
const API_ESTADISTICA = SERVER + 'publico/estadistica_vendedor.php?action=';

//Método que se ejecutará cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    //Se carga la internacionalización de day.js
    dayjs.locale("es");

    //Obtiene el componente donde se cargará el slider
    var slider = document.getElementById('sliderTotalPromedio');
    var sliderRango = document.getElementById('sliderRango');

    //Se crea la función para obtener la fecha a colocar
    function timestamp(str) {
        return new Date(str).getTime();
    }

    //Se crea el slider y su configuración
    noUiSlider.create(slider, {
        //Se define el rango de fechas
        range: {
            min: timestamp(dayjs().subtract(3, 'month').format('YYYY-MM-DD')),
            max: timestamp(dayjs().format('YYYY-MM-DD'))
        },
        connect: true, //Habilitación de la línea entre las manijas (Estilo)

        // Velocidad y opciones que dispondrá el slider
        step: 24 * 60 * 60 * 1000,

        // Posiciones iniciales las manijas
        start: [timestamp(dayjs().subtract(7, 'day').format('YYYY-MM-DD')), timestamp(dayjs().format('YYYY-MM-DD'))],

        // Permite o no los decimales, en este caso solo fechas completas
        format: wNumb({
            decimals: 0
        })
    });

    //Se crea el slider y su configuración
    noUiSlider.create(sliderRango, {
        //Se define el rango de fechas
        range: {
            min: 0,
            max: 5000
        },
        connect: true, //Habilitación de la línea entre las manijas (Estilo)

        // Velocidad y opciones que dispondrá el slider
        step: 1,

        // Posiciones iniciales las manijas
        start: [300, 500],

        // Permite o no los decimales, en este caso solo fechas completas
        format: wNumb({
            decimals: 0
        })
    });

    //Componentes que cargarán las fechas seleccionadas para mostrar al usuario
    var dateValues = [
        document.getElementById('fechaInicial'),
        document.getElementById('fechaFinal')
    ];

    //Componentes que cargarán los rangos seleccionados para mostrar al usuario
    var dateValuesRango = [
        document.getElementById('RangoInicial'),
        document.getElementById('RangoFinal')
    ];

    //Componentes que cargarán las fechas seleccionadas para enviar como parámetros
    var dateValuesDato = [
        document.getElementById('fechaInicialDato'),
        document.getElementById('fechaFinalDato')
    ];

    //Componentes que cargarán las fechas seleccionadas para enviar como parámetros
    var dateValuesRangoDato = [
        document.getElementById('RangoInicialDato'),
        document.getElementById('RangoFinalDato')
    ];


    //Actualización de los componentes cuando se mueven las manijas
    slider.noUiSlider.on('update', function(values, handle) {
        //Se colocan las fechas en los componentes para el usuario (Visible)
        dateValues[handle].innerHTML = dayjs(new Date(+values[handle])).format('DD, MMMM, YYYY');
        //Se colocan las fechas en los componetes para la consulta (Ocultos)
        dateValuesDato[handle].innerHTML = dayjs(new Date(+values[handle])).format('YYYY-MM-DD');

    });

    //Se ejecuta la recarga de la gráfica cuando pare de moverse las manijas
    slider.noUiSlider.on('end', function() {
        //Se ejecuta nuevamente la función para generar la gráfica
        totalPromedio();
    })

    //Actualización de los componentes cuando se mueven las manijas
    sliderRango.noUiSlider.on('update', function(values, handle) {
        //Se colocan las fechas en los componentes para el usuario (Visible)
        dateValuesRango[handle].innerHTML = "$" + +values[handle];
        //Se colocan las cantidades en los componentes para enviar como parámetros
        dateValuesRangoDato[handle].innerHTML = +values[handle];
    });

    //Se ejecuta la función para generar la gráfica
    totalPromedio();
});


//Función para cargar la gráfica de total y promedios de ventas
function totalPromedio() {
    //Crea una variable de tipo Form donde se guardarán los datos
    let datos = new FormData();
    datos.append('fechaInicial', document.getElementById('fechaInicialDato').innerHTML);
    datos.append('fechaFinal', document.getElementById('fechaFinalDato').innerHTML);
    //Se procede a realizar la petición para obtener los datos
    fetch(API_ESTADISTICA + 'promedioTotal', {
        method: 'post',
        body: datos,
    }).then(function(request) {
        //Se verifica el estado de la ejecución
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function(response) {
                //Se verifica el estado devuelto por la API
                if (response.status) {
                    //Se limpia el problema
                    document.getElementById('comentarioTotalPromedio').innerHTML = "";
                    //Se crear arreglos para guardar los datos
                    let general = []; //Contenedor de los datos de la gráfica
                    let titulos = []; //Contenedor de los titulos de la gráfica
                    let promedio = []; //Contenedor de los datos por 
                    let total = []; //Contenedor de los datos por titulo
                    //Se buscan los datos fila por fila
                    response.dataset.map(function(row) {
                        //Se llena la fila y los titulos
                        titulos.push(row.fecha_compra);
                        //Variables para almacenar los datos
                        let prom = row.promedio;
                        let totalidad = row.total;
                        promedio.push({
                            meta: 'Promedio de ventas ($)',
                            value: prom
                        });
                        total.push({
                            meta: 'Total de ventas ($)',
                            value: totalidad
                        });
                    });
                    //Se pasan los datos al contenedor principal
                    general.push(promedio);
                    general.push(total);
                    //Se llama la función para generar la gráfica
                    lineaI(".TotalPromedio", titulos, general);
                } else if (request.status == 2) {
                    //Se muestra el error
                    sweetAlert(2, response.exception, null);
                    //Se quita la gráfica de la vista
                    document.getElementById('graficaTotalPromedio').style.display = "none";
                    //Se cambiar el titulo por el error
                    document.getElementById('tituloGraficaTotalPromedio').innerHTML = "No se puede mostrar datos para esta gráfica";
                } else {
                    //Se escribe el problema
                    document.getElementById('comentarioTotalPromedio').innerHTML = response.exception;
                    //Se crear arreglos para guardar los datos por defecto
                    let general = [
                        [0]
                    ]; //Contenedor de los datos de la gráfica
                    let titulos = ['No hay datos']; //Contenedor de los titulos de la gráfica
                    //Se llama la función para generar la gráfica
                    lineaI(".TotalPromedio", titulos, general);

                }
            })
        } else {
            //Se imprime el error en la consola
            console.log(request.status + ' ' + request.statusText);
        }
    })

}

//Se crea la función para crear el reporte
function crearReporte() {
    let arreglo = document.getElementById('RangoInicialDato').innerHTML + ',' + document.getElementById('RangoFinalDato').innerHTML;
    // Se establece la ruta del reporte en el servidor.
    let url = SERVER + `reportes/vendedor/facturas_clientes.php?rangos=${arreglo}`;
    // Se abre el reporte en una nueva pestaña del navegador web.
    window.open(url);
}
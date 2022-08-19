//Se crea la constante donde se guardará la ruta de la API
const API_ESTADISTICA = SERVER + 'public/estadistica_vendedor.php?=actio';

//Método que se ejecutará cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
    //Se carga la internacionalización de day.js
    dayjs.locale("es");

    //Obtiene el componente donde se cargará el slider
    var slider = document.getElementById('sliderTotalPromedio');

    //Se crea la función para obtener la fecha a colocar
    function timestamp(str) {
        return new Date(str).getTime();
    }

    //Se crea el slider y su configuración
    noUiSlider.create(slider, {
        //Se define el rango de fechas
        range: {
            min: timestamp(dayjs().subtract(2, 'month').format('YYYY-MM-DD')),
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

    //Componentes que cargarán las fechas seleccionadas
    var dateValues = [
        document.getElementById('fechaInicial'),
        document.getElementById('fechaFinal')
    ];

    //Actualización de los componentes cuando se mueven las manijas
    slider.noUiSlider.on('update', function (values, handle) {
        dateValues[handle].innerHTML = dayjs(new Date(+values[handle])).format('DD, MMMM, YYYY');
    });
});


//Función para cargar la gráfica de total y promedios de ventas
function totalPromedio() { 
    //Crea una variable de tipo Form donde se guardarán los datos
    let datos = 

}
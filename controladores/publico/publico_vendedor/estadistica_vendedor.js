//Se crea la constante donde se guardará la ruta de la API
const API_ESTADISTICA = SERVER + 'public/estadistica_vendedor.php?=actio';

//Método que se ejecutará cuando se carga la página
document.addEventListener("DOMContentLoaded", function () { 
    //Se carga el slider en la página
    var slider = document.getElementById('sliderTotalPromedio');

    noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        }
    });
})
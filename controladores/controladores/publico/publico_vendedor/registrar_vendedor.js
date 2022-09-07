const API_VENDEDOR = SERVER + 'dashboard/administrar_vendedor.php?action=';

/*Functiones que sirven para reemplazar las imagenes por defecto del formulario por las seleccionadas*/
document.getElementById('profile-file').onchange = function (e) {
    document.getElementById('profile-pic').remove();
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
        let preview = document.getElementById('preview-profile');
        imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.id = 'profile-pic';
        imagen.width = 200;
        imagen.height = 200;
        preview.append(imagen);
    }
}

document.getElementById('antecedente-file').onchange = function (e) {
    document.getElementById('antecedente-pic').remove();
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
        let preview = document.getElementById('preview-antecedente');
        imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.id = 'antecedente-pic';
        imagen.width = 100;
        imagen.height = 100;
        preview.append(imagen);
    }
}

document.getElementById('solvencia-file').onchange = function (e) {
    document.getElementById('solvencia-pic').remove();
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
        let preview = document.getElementById('preview-solvencia');
        imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.id = 'solvencia-pic';
        imagen.width = 100;
        imagen.height = 100;
        preview.append(imagen);
    }
}


//Se inicializa el mapa con la vista y nivel de zoom
var map = L.map('mapa').setView([13.683767546575941, -88.93569946289064], 8);

//se añaden agrega el mapa
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Variables para manejar las coordenadas seleccionadas en el mapa
Layer = null;
let cords = null;

//función que se ejecuta cuando se clickea en el mapa
function onMapClick(e) {

    //Comprobamos si layer es null para crear un marcador nuevo que captura la latitud y longitud
    if (Layer == null) {
        Layer = L.marker(e.latlng);
        //Se concatena la latitud con la longitud separados por coma para usar guardarlo en una variable
        cords = Layer.getLatLng().lat + ', ' + Layer.getLatLng().lng;
    } else {//<-- si ya existe un marcador se remueve el que ya existe para poner uno nuevo
        Layer.remove();
        Layer = L.marker(e.latlng);
        //Se concatena la latitud con la longitud separados por coma para usar guardarlo en una variable
        cords = Layer.getLatLng().lat + ', ' + Layer.getLatLng().lng;
    }

    console.log(cords);
    Layer.addTo(map);
}

//Se crea el evento click y se llama a la función ya creada
map.on('click', onMapClick);

//funcionamiento del formulario de registro
document.getElementById('save-form').addEventListener('submit', function () {
    event.preventDefault();
    if (cords == null) {
        sweetAlert(3, 'Selecciona una dirección en el mapa', null)
    } else {
        const data = new FormData(document.getElementById('save-form'));
        data.append('cords', cords);
        fetch(API_VENDEDOR + 'register', {
            method: 'post',
            body: data
        }).then(function (request) {
            if (request.ok) {
                request.json().then(function (response) {
                    if (response.status) {
                        sweetAlert(1, response.message, 'index.html');
                    } else {
                        sweetAlert(2, response.exception, null);
                    }
                });
            } else {
                console.log(request.status + ' ' + request.statusText);
            }
        });
    }
});

//Validaciones
document.getElementById("dui").addEventListener("input", function (evt) {
    let value = this.value.replace("-", "");
    //comienzo de linea  Digito numerico   Final de linea
    if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, "$1$2$3-$4");
    }
    this.value = value;
});

document.getElementById("phone").addEventListener("keyup", function (evt) {
    var telefono = document.getElementById("phone").value.length;
    var valor = document.getElementById("phone").value;
    if (telefono == 4) {
        document.getElementById("phone").value = valor + "-";
    }

});
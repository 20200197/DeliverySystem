const API_PERFIL = SERVER + 'publico/perfil.php?action=';

/*Funciones que sirven para reemplazar las imagenes por defecto del formulario por las seleccionadas*/
function leerImg(input, img_destino) {
    //Se obtiene los archivos del input
    let archivos = input.files;
    //Se verifica si está vacío
    if (!archivos || !archivos.length) {
        img_destino.src = "../../recursos/img/publico/sin.png";
        return;
    }
    //
    const visualizar = archivos[0];
    const url = URL.createObjectURL(visualizar);
    img_destino.src = url;
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
//Campo id

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


// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    fetch(API_PERFIL + 'readProfile', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se revisa si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
                if (response.session) {
                    // Se comprueba si la respuesta es satisfactoria, de lo contrario se direcciona a la página web principal.
                    if (response.status) {
                        // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
                        // document.getElementById('id').value = response.dataset.id_vendedor;
                        document.getElementById('nombre_vendedor').value = response.dataset.nombre_vendedor;
                        document.getElementById('apellido_vendedor').value = response.dataset.apellido_vendedor;
                        document.getElementById('dui_vendedor').value = response.dataset.dui_vendedor;
                        document.getElementById('correo_vendedor').value = response.dataset.correo_vendedor;
                        document.getElementById('telefono_vendedor').value = response.dataset.telefono_vendedor;
                        document.getElementById('usuario_vendedor').value = response.dataset.usuario_vendedor;
                        document.getElementById('solvencia-pic').setAttribute('src', SERVER + 'imagenes/vendedores/solvencias/' + response.dataset.solvencia_pnc);
                        document.getElementById('antecedente-pic').setAttribute('src', SERVER + 'imagenes/vendedores/antecedentes/' + response.dataset.antecedente_penal);
                        document.getElementById('direccion_vendedor').value = response.dataset.direccion_domicilio_vendedor;
                        document.getElementById('profile-pic').setAttribute('src', SERVER + 'imagenes/vendedores/' + response.dataset.foto_vendedor);
                        Layer = L.marker([response.dataset.latitud_vendedor, response.dataset.longitud_vendedor]).addTo(map);
                        // Se inicializa el componente Sidenav para que funcione la navegación lateral.
                        M.Sidenav.init(document.querySelectorAll('.sidenav'));
                        M.updateTextFields();
                    } else {
                        sweetAlert(3, response.exception, 'index.html');
                    }
                } else {
                    location.href = 'index.html';
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
        
    });
    M.updateTextFields();
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false
    }
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
});


//funcionamiento del formulario de actualizar
document.getElementById('update-form').addEventListener('submit', function () {
    event.preventDefault();

    const data = new FormData(document.getElementById('update-form'));
    data.append('cords', cords);
    fetch(API_PERFIL + 'updatePerfil', {
        method: 'post',
        body: data
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status) {
                    sweetAlert(1, response.message, 'estadistica.html');
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });

});

document.getElementById('confirmar-form').addEventListener('submit', function () {
    event.preventDefault();
    fetch(API_PERFIL + 'checkPass', {
        method: 'post',
        body: new FormData(document.getElementById('confirmar-form'))
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if(response.status){
                    sweetAlert(1, response.message, null);
                    M.Modal.getInstance(document.getElementById('modal-confirmar-contrasenia')).close();
                    M.Modal.getInstance(document.getElementById('modal-cambiar-contrasenia')).open();
                }else{
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

document.getElementById('cambiar-contra-form').addEventListener('submit', function () {
    event.preventDefault();
    fetch(API_PERFIL + 'changePass', {
        method: 'post',
        body: new FormData(document.getElementById('cambiar-contra-form'))
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if(response.status){
                    sweetAlert(1, response.message, null);
                    M.Modal.getInstance(document.getElementById('modal-cambiar-contrasenia')).close();
                }else{
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
})

function openCheckPass() {
    M.Modal.getInstance(document.getElementById('modal-confirmar-contrasenia')).open();
}

//Validaciones
document.getElementById("dui_vendedor").addEventListener("input", function (evt) {
    let value = this.value.replace("-", "");
    //comienzo de linea  Digito numerico   Final de linea
    if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, "$1$2$3-$4");
    }
    this.value = value;
});

document.getElementById("telefono_vendedor").addEventListener("keyup", function (evt) {
    var telefono = document.getElementById("telefono_vendedor").value.length;
    var valor = document.getElementById("telefono_vendedor").value;
    if (telefono == 4) {
        document.getElementById("telefono_vendedor").value = valor + "-";
    }

});
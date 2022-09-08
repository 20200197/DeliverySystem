// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_PERFIL = SERVER + 'publico/repartidor.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false
    }
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));
    openUpdate();
    document.getElementById("foto-file").style.visibility = "hidden";
    document.getElementById("solvencia-file").style.visibility = "hidden";
    document.getElementById("antecedente-file").style.visibility = "hidden";
    document.getElementById("vehiculo-file").style.visibility = "hidden";
    document.getElementById("placa-file").style.visibility = "hidden";
});


function openUpdate() {
    // Petición para obtener los datos del registro solicitado.
    fetch(API_PERFIL + "readProfile", {
        method: "get"
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    document.getElementById("nombre_repartidor").value = response.dataset.nombre_repartidor;
                    document.getElementById("apellido_repartidor").value = response.dataset.apellido_repartidor;
                    document.getElementById("dui_repartidor").value = response.dataset.dui_repartidor;
                    document.getElementById("correo_repartidor").value = response.dataset.correo_repartidor;
                    document.getElementById("usuario_repartidor").value = response.dataset.usuario_repartidor;
                    document.getElementById("telefono_repartidor").value = response.dataset.telefono_repartidor;
                    document.getElementById('solvencia-pic').setAttribute('src', SERVER + 'imagenes/repartidor/foto_solvencia/' + response.dataset.solvencia_pnc);
                    document.getElementById('antecedente-pic').setAttribute('src', SERVER + 'imagenes/repartidor/foto_antecedente/' + response.dataset.antecedente_penal);
                    document.getElementById("direccion_repartidor").value = response.dataset.direccion_domicilio;
                    document.getElementById("placa_repartidor").value = response.dataset.placa_vehiculo;
                    document.getElementById('placa-pic').setAttribute('src', SERVER + 'imagenes/repartidor/foto_placa/' + response.dataset.foto_placa_vehiculo);
                    document.getElementById('foto-pic').setAttribute('src', SERVER + 'imagenes/repartidor/foto_repartidor/' + response.dataset.foto_repartidor);
                    document.getElementById('vehiculo-pic').setAttribute('src', SERVER + 'imagenes/repartidor/foto_vehiculo/' + response.dataset.foto_vehiculo);
                    M.updateTextFields();
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

/*Functiones que sirven para reemplazar las imagenes por defecto del formulario por las seleccionadas*/
function leerImg(input, img_destino) {
    //Se obtiene los archivos del input
    let archivos = input.files;
    //Se verifica si está vacío
    if (!archivos || !archivos.length) {
        img_destino.src = "../../../recursos/img/publico/default-img.jpg";
        return;
    }
    //
    const visualizar = archivos[0];
    const url = URL.createObjectURL(visualizar);
    img_destino.src = url;
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de editar perfil.
document.getElementById('update-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para actualizar los datos personales del usuario.
    fetch(API_PERFIL + 'updatePerfil', {
        method: 'post',
        body: new FormData(document.getElementById('update-form'))
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    sweetAlert(1, response.message, null);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

// Función para preparar el formulario al momento de modificar un registro.
function passUpdate() {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('pass-modal')).open();
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de cambiar contraseña.
document.getElementById('pass-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para actualizar la contraseña.
    fetch(API_PERFIL + 'changePassword', {
        method: 'post',
        body: new FormData(document.getElementById('pass-form'))
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se muestra un mensaje de éxito.
                    sweetAlert(1, response.message, 'historial.html');
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

const API_ADMIN = SERVER + 'dashboard/administrar_admin.php?action=';

document.addEventListener('DOMContentLoaded', function () {
    fetch(API_ADMIN + 'readAdmin', {
        method: 'get'
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status || response.session) {
                    sweetAlert(2, 'Acceso denegado', 'index.html');
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

document.getElementById('register-form').addEventListener('submit', function () {

    event.preventDefault();

    fetch(API_ADMIN + 'registerAdmin', {
        method: 'post',
        body: new FormData(document.getElementById('register-form'))
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status) {
                    sweetAlert(1, response.message, 'index.html');
                } else {
                    sweetAlert(2, response.exception, null)
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

document.getElementById("dui").addEventListener("input", function (evt) {
    let value = this.value.replace("-", "");
    //comienzo de linea  Digito numerico   Final de linea
    if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, "$1$2$3-$4");
    }
    this.value = value;
});

//Se coloca guión al digitar teléfono
document.getElementById("phone").addEventListener("keyup", function (evt) {
    var telefono = document.getElementById("phone").value.length;
    var valor = document.getElementById("phone").value;
    if (telefono == 4) {
        document.getElementById("phone").value = valor + "-";
    }
});
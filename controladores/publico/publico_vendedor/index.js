const API_VENDEDOR = SERVER + 'dashboard/administrar_vendedor.php?action=';
const API_SESSION = SERVER + 'publico/perfil.php?action=session';

document.getElementById('login-form').addEventListener('submit', function () {
    event.preventDefault();
    fetch(API_VENDEDOR + 'login', {
        method: 'post',
        body: new FormData(document.getElementById('login-form'))
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

document.addEventListener('DOMContentLoaded', function () {
    fetch(API_SESSION + 'session', {
        method: 'get'
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.session) {
                    sweetAlert(3, 'Ya hay una sesión abierta', 'estadistica.html');
                }
            })
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    })
})
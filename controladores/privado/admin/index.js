const API_ADMIN = SERVER + 'dashboard/administrar_admin.php?action=';

document.addEventListener('DOMContentLoaded', function () {
    fetch(API_ADMIN + 'readAdmin', {
        method: 'get'
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status) {
                    sweetAlert(3, response.message, null);
                } else if (response.session) {
                    sweetAlert(4, response.exception, 'estadistica.html');
                } else {
                    sweetAlert(4, response.exception, 'registrar_admin.html');
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

document.getElementById('login-form').addEventListener('submit', function () {
    event.preventDefault();
    fetch(API_ADMIN + 'loginAdmin', {
        method: 'post',
        body: new FormData(document.getElementById('login-form'))
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status == 2) {
                    sweetAlert(1, response.message, "verificacion.html");
                } else if (response.status == 1) {
                    sweetAlert(1, response.message, "estadistica.html");
                } else { 
                     sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});
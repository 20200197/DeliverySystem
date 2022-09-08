//Cambios Bonilla1
API_REPARTIDOR = SERVER + 'publico/repartidor.php?action='

document.getElementById('login-form').addEventListener('submit', function () {
    event.preventDefault();
    fetch(API_REPARTIDOR + 'login', {
        method: 'post',
        body: new FormData(document.getElementById('login-form'))
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status) {
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

/*document.addEventListener('DOMContentLoaded', function () {
    fetch(API_REPARTIDOR + 'session', {
        method: 'get'
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.session) {
                    sweetAlert(1, response.message, 'historial.html');
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});*/
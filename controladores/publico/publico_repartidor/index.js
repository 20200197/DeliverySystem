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
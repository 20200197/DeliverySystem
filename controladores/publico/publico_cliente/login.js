const API_CLIENTE = SERVER + 'publico/cliente.php?action=';

document.addEventListener('DOMContentLoaded', function() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
});

document.getElementById('login-form').addEventListener('submit', function() {
    event.preventDefault();
    fetch(API_CLIENTE + 'login', {
        method: 'post',
        body: new FormData(document.getElementById('login-form'))
    }).then(function (request) {
        if(request.ok){
            request.json().then(function (response) {
                if(response.status){
                    sweetAlert(1, response.message, 'index.html');
                }else{
                    sweetAlert(2, response.exception, null);
                }
            });
        }else{
            console.log(request.status + ' ' + request.statusText);
        }
    });
});
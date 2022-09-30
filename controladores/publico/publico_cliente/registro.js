const API_CLIENTE = SERVER + 'publico/cliente.php?action=';

document.addEventListener('DOMContentLoaded', function () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
});

document.getElementById('save-form').addEventListener('submit', function () {
    event.preventDefault();

    fetch(API_CLIENTE + 'register', {
        method: 'post',
        body: new FormData(document.getElementById('save-form'))
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
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
//Cambios Bonilla1
API_REPARTIDOR = SERVER + 'publico/repartidor.php?action=';

function leerImg(input, img_destino)
{
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

document.getElementById('save-form').addEventListener('submit', function () {
    event.preventDefault();

    fetch(API_REPARTIDOR + 'request', {
        method: 'post',
        body: new FormData(document.getElementById('save-form')),
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
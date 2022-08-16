const API_FACTURA = SERVER + 'publico/factura.php?action=';
const ENDPOINT_METODO = SERVER + 'publico/factura.php?action=cargarMetodos';
const ENDPOINT_DIRECCION = SERVER + 'publico/factura.php?action=cargarDireccion';

document.addEventListener('DOMContentLoaded', function() {
    M.FormSelect.init(document.querySelectorAll('select'));

    fetch(API_FACTURA + 'cargarDatos', {
        method: 'get',
    }).then(function (request){
        if(request.ok){
            request.json().then(function (response) {
                if(response.status){
                    document.getElementById('nombre-cliente').innerHTML = response.dataset.nombre_cliente + response.dataset.apellido_cliente;
                    document.getElementById('correo-cliente').innerHTML = response.dataset.correo_cliente;
                    document.getElementById('telefono-cliente').innerHTML = response.dataset.telefono_cliente;
                    document.getElementById('total').innerHTML = 'Total a pagar: $' + response.total.suma;
                }else{
                    console.log(response.exception);
                }
            });
        }else{
            console.log(request.status + ' ' + request.statusText);
        }
    });

    fillSelect(ENDPOINT_METODO, 'metodo-select', null);
    fillSelect(ENDPOINT_DIRECCION, 'direccion-select', null);
});

function fillData(value){
    let content = '';

    if(value != 1){
        content += `<h6>Datos de tarjeta</h6>
        <div class="input-field col s6">
            <input id="nombre-titular" type="text" class="validate">
            <label for="nombre-titular">Nombre del titular</label>
        </div>
        <div class="input-field col s6">
            <input id="ccv" type="number" class="validate">
            <label for="ccv">CCV</label>
        </div>
        <div class="input-field col s6">
            <input id="Ntarjeta" type="number" class="validate">
            <label for="Ntarjeta">Numero de tarjeta</label>
        </div>
        <div class="input-field col s6">
            <input id="exp" type="text" class="validate">
            <label for="exp">Fecha</label>
        </div>`;
    }

    document.getElementById('contenedor-inputs').innerHTML = content;
}
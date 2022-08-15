const API_FACTURA = SERVER + "publico/factura.php?action=";

function actualizarDatos(id){
    let parameter = new FormData();
    parameter.append('id', id);

    fetch(API_FACTURA + 'actualizarDatos', {
        method: 'post',
        body: parameter,
    }).then(function (request) {
        if(request.ok){
            request.json().then(function (response) {
                if(response.status){
                    document.getElementById('subtotal' + response.subtotal.id_producto).innerHTML = response.subtotal.subtotal;
                    document.getElementById('total').innerHTML = '$' + response.total.suma;
                }
            });
        }else{
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

function restarCant(id){
    let parameter = new FormData();
    if(document.getElementById('cantidad' + id).value != 1){
        parameter.append('cantidad', Math.floor(document.getElementById('cantidad' + id).value) - 1);
        parameter.append('id', id);
        fetch(API_FACTURA + 'restarCant',{
            method: 'post',
            body: parameter
        }).then(function (request) {
            if(request.ok){
                request.json().then(function (response){
                    if(response.status){
                        document.getElementById('cantidad' + id).value = Math.floor(document.getElementById('cantidad' + id).value) - 1;
                        actualizarDatos(id);
                    }else{
                        sweetAlert(3, response.exception, null)
                    }
                });
            }else{
                console.log(request.status + ' ' + request.statusText);
            }
        });
    }
}

function sumarCant(id){
    let parameter = new FormData();
    parameter.append('cantidad', Math.floor(document.getElementById('cantidad' + id).value) + 1);
    parameter.append('id', id)

    fetch(API_FACTURA + 'sumarCant',{
        method: 'post',
        body: parameter
    }).then(function (request) {
        if(request.ok){
            request.json().then(function (response){
                if(response.status){
                    document.getElementById('cantidad' + id).value = Math.floor(document.getElementById('cantidad' + id).value) + 1;
                    actualizarDatos(id);
                }else{
                    sweetAlert(3, response.exception, null)
                }
            });
        }else{
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

function deleteCartRow(id){
    let parameter = new FormData();
    parameter.append('id', id);

    Swal.fire({
        title: '¿Éstas seguro de eliminar este producto del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(function (value) {
        if(value.isConfirmed){
            fetch(API_FACTURA + 'deleteRow', {
                method: 'post',
                body: parameter,
            }).then(function (request) {
                if(request.ok){
                    request.json().then(function (response) {
                        if(response.status){
                            cargarCarrito();
                            sweetAlert(1, response.message, null);
                        }else{
                            sweetAlert(2, response.exception, null)
                        }
                    });
                }else{
                    console.log(request.status + ' ' + request.statusText);
                }
            });
        } else {
            sweetAlert(4, 'Accion cancelada', null);
        }
    });
}

document.addEventListener('DOMContentLoaded', function(){
    cargarCarrito();
});

function cargarCarrito() {
    fetch(API_FACTURA + 'loadCart', {
        method: 'get',
    }).then(function (request) {
        if(request.ok){
            request.json().then(function(response) {
                let content = '';

                response.dataset.map(function(row){
                    content += `<div class="card panel black-text">
                    <div class="row">
                        <!--Imagen del producto-->
                        <div class="col s12 m3 l3">
                            <img src="${SERVER}imagenes/productos/${row.imagen}" class="responsive-img margin-low-left" alt="">
                        </div>
                        <!--Información del producto-->
                        <div class="col s12 m9 l9">
                            <!--Titulo y boton de eliminar-->
                            <div class="col s12 m12 l12 valign-wrapper">
                                <div class="col s10 m9 l11">
                                    <h5>${row.nombre_producto}</h5>
                                </div>
                                <div class="col s2 m3 l1 left-align">
                                    <a onclick="deleteCartRow(${row.id_producto})" class="click-hand">Eliminar</a>
                                </div>
                            </div>
                            <!--Cantidad ordenada-->
                            <div class="col s12 m4 l4 center-align">
                                <br>
                                <Span>Cantidad</Span>
                                <div class="validate contador_cantidad_carrito valign-wrapper">
                                    <a onclick="restarCant(${row.id_producto})" class="click-hand"><i class="small material-icons">remove_circle_outline</i></a>
                                    <input disabled id="cantidad${row.id_producto}" type="number" value="${row.cantidad_pedido}" pattern="[1-9]{1}" class="validate sin-boton">
                                    <a onclick="sumarCant(${row.id_producto})" class="click-hand"><i class="small material-icons">add_circle_outline</i></a>
                                </div>
                            </div>
                            <!--Precio del producto-->
                            <div class="col s12 m4 l4 center-align">
                                <br>
                                <h6>Precio</h6>
                                <span>${row.precio}</span>
                            </div>
                            <!--Subtotal-->
                            <div class="col s12 m4 l4 center-align">
                                <br>
                                <h6>Subtotal</h6>
                                <span id="subtotal${row.id_producto}">${row.subtotal}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
                });

                document.getElementById('productosN').innerHTML = response.NProd.n_productos
                document.getElementById('total').innerHTML = '$' + response.total.suma;
                document.getElementById('productos-contenedor').innerHTML = content;
            });
        }else{
            console.log(request.status + ' ' + request.statusText);
        }
    });
}
const API_ADMIN = SERVER + 'dashboard/administrar_admin.php?action=';

document.addEventListener('DOMContentLoaded', function() {
    let options = {
        dismissible: false
    }
    M.Modal.init(document.querySelectorAll(".modal"), options);
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));

    fetch(API_ADMIN + 'readAdminsAll', {
        method: 'get'
    }).then(function (request) {
        if(request.ok){
            request.json().then(function (response) {
                if (response.status) {
                    sweetAlert(1, response.message, null);
                    fillTable(response.dataset);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

function fillTable(dataset){
    let content = '';

    dataset.map(function (row) {
        if (row.status_admin) {
            estado = 'Activo';
        } else {
            estado = 'Inactivo';
        }

        content += `
        <tr>
            <td>${row.nombre_admin}</td>
            <td>${row.apellido_admin}</td>
            <td>${row.usuario_admin}</td>
            <td>${row.dui_admin}</td>
            <td>${row.correo_admin}</td>
            <td>${row.fecha_registro_admin}</td>
            <td>${row.telefono_admin}</td>
            <td class='${estado}'>${estado}</td>
            <td>
                <button class="btn-floating waves-effect red tooltipped" data-tooltip="Dar de baja" onClick="update(${row.id_admin})">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        </tr>`;
    });

    document.getElementById('tbody-admins').innerHTML = content;
}

function openSave(){
    M.Modal.getInstance(document.getElementById("save-modal")).open();
}

document.getElementById('save-form').addEventListener('submit', function() {
    event.preventDefault();

    fetch(API_ADMIN + 'registerAdmin', {
        method: 'post',
        body: new FormData(document.getElementById('save-form'))
    }).then(function (request) {
        if(request.ok){
            request.json().then(function (response) {
                if(response.status){
                    sweetAlert(1, response.message, 'admin_admin.html');
                } else {
                    sweetAlert(2, response.exception, null);
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

  document.getElementById('search-form').addEventListener('submit', function(){
    event.preventDefault();
    fetch(API_ADMIN + 'search', {
        method: 'post',
        body: new FormData(document.getElementById('search-form'))
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status) {
                    sweetAlert(1, response.message, null);
                    fillTable(response.dataset);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
  });

  function update(id){
    event.preventDefault();
    const data = new FormData();
    data.append('id', id)


    fetch(API_ADMIN + 'checkStatus', {
        method: 'post',
        body: data
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status) {
                    Swal.fire({
                        title: '¿Quieres dar de baja este administrador?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Confirmar',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then(function (value) {
                        // Se verifica si fue cliqueado el botón Sí para hacer la petición de cerrar sesión, de lo contrario se muestra un mensaje.
                        if (value.isConfirmed) {
                            fetch(API_ADMIN + 'updateStatus', {
                                method: 'post',
                                body: data
                            }).then(function (request) {
                                if (request.ok) {
                                    request.json().then(function (response) {
                                        if (response.status) {
                                            sweetAlert(1, response.message, 'admin_admin.html');
                                        } else {
                                            sweetAlert(2, response.exception, null);
                                        }
                                    });
                                } else {
                                    console.log(request.status + ' ' + request.statusText);
                                }
                            });
                        } else {
                            sweetAlert(4, 'Acción cancelada', null);
                        }
                    });
                } else {
                    Swal.fire({
                        title: '¿Quieres activar este administrador?',
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Confirmar',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then(function (value) {
                        // Se verifica si fue cliqueado el botón Sí para hacer la petición de cerrar sesión, de lo contrario se muestra un mensaje.
                        if (value.isConfirmed) {
                            fetch(API_ADMIN + 'updateStatus', {
                                method: 'post',
                                body: data
                            }).then(function (request) {
                                if (request.ok) {
                                    request.json().then(function (response) {
                                        if (response.status) {
                                            sweetAlert(1, response.message, 'admin_admin.html');
                                        } else {
                                            sweetAlert(2, response.exception, null);
                                        }
                                    });
                                } else {
                                    console.log(request.status + ' ' + request.statusText);
                                }
                            });
                        } else {
                            sweetAlert(4, 'Acción cancelada', null);
                        }
                    });
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText)
        }
    });

    
  }
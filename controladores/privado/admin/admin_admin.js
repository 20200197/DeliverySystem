const API_ADMIN = SERVER + 'dashboard/administrar_admin.php?action=';

document.addEventListener('DOMContentLoaded', function () {
    let options = {
        dismissible: false
    }
    M.Modal.init(document.querySelectorAll(".modal"), options);
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));

    fetch(API_ADMIN + 'readAll', {
        method: 'get'
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

function fillTable(dataset) {
    let content = '';
    let estado = '';

    dataset.map(function (row) {
        if (row.status_admin) {
            estado = `checked`;
        } else {
            estado = ` `;
        }
        //Establecemos texto para el estado
        var estado_admin;
        (row.status_admin) ? estado_admin = 'Activo' : estado_admin = 'Inactivo';
        content += `
        <tr>
            <td>${row.nombre_admin}</td>
            <td>${row.apellido_admin}</td>
            <td>${row.usuario_admin}</td>
            <td>${row.dui_admin}</td>
            <td>${row.correo_admin}</td>
            <td>${row.fecha_registro_admin}</td>
            <td>${row.telefono_admin}</td>
            <td>${estado_admin}</td>
            <td>
                <div class="switch">
                    <label>
                    <input type="checkbox" name="switch_estado" onclick="update(${row.id_admin})" ${estado}>
                    <span class="lever"></span>
                    </label>
                </div>
            </td>
        </tr>`;
    });

    document.getElementById('tbody-admins').innerHTML = content;
}

function openSave() {
    M.Modal.getInstance(document.getElementById("save-modal")).open();
}

document.getElementById('save-form').addEventListener('submit', function () {
    event.preventDefault();

    fetch(API_ADMIN + 'registerAdmin', {
        method: 'post',
        body: new FormData(document.getElementById('save-form'))
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

document.getElementById('search').addEventListener('keyup', function () {
    const parameter = new FormData();
    parameter.append('search', document.getElementById('search').value);

    event.preventDefault();
    fetch(API_ADMIN + 'search', {
        method: 'post',
        body: parameter
    }).then(function (request) {
        if (request.ok) {
            request.json().then(function (response) {
                if (response.status) {
                    fillTable(response.dataset);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

function update(id) {
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
                    fetch(API_ADMIN + 'updateStatus', {
                        method: 'post',
                        body: data
                    }).then(function (request) {
                        if (request.ok) {
                            request.json().then(function (response) {
                                if (response.status) {
                                    readRows(API_ADMIN);
                                    sweetAlert(1, response.message, null);
                                } else {
                                    sweetAlert(2, response.exception, null);
                                }
                            });
                        } else {
                            console.log(request.status + ' ' + request.statusText);
                        }
                    });
                }
            });
        }
    });
}
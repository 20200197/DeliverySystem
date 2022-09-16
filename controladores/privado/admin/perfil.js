//Se crea la constante de la api
const API_PERFIL = SERVER + "dashboard/administrar_perfil.php?action=";
const API_AUTENTIFICADOR = SERVER + "dashboard/administrar_admin.php?action=";

// Método que ejecuta la carga de de las tablas y la activación de componentes
document.addEventListener("DOMContentLoaded", function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_PERFIL);
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
    //se inicializan los tooltp
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
    //Cargar los datos de la autentificación
    datosAutentificacion();
});

//Función para verificar los datos de autentificación
function datosAutentificacion() {
    //Se realiza la petición
    fetch(API_AUTENTIFICADOR + "ObtenerEstadoVerificacion", {
        method: "get",
    }).then(function (request) {
        //Se verifica el estado devuelto por la ejecución
        if (request.ok) {
            //Se pasa a JSON
            request.json().then(function (response) {
                //Se verifica el estado devuelto por la API
                if (response.status) {
                    //Se cambian los botones a activado
                    document.getElementById("estadoAutentificación").innerHTML = "¡Activada!";
                    document.getElementById("activar").style.display = "none";
                    document.getElementById("desactivar").style.display = "";
                } else {
                    document.getElementById("estadoAutentificación").innerHTML = "Desactivada";
                    document.getElementById("activar").style.display = "";
                    document.getElementById("desactivar").style.display = "none";
                }
            });
        } else {
            //Se imprime el problema en la consola
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Función que llena la tabla
function fillTable(data) {
    //Se crea una variable donde se guardará el HTML a inyectar
    let contenido = [];
    //Se obtiene el contenido y se revisa fila por fila en el map
    contenido += `
                    <div class="col l7 m12 s12 datos_usuario_perfil_cliente center-align">
                        <h6>Tus datos personales</h6>
                        <div class="datos_perfil_cliente">
                            <form method="post" id="datos-usuario">
                                <div class="input-field col s6 m12 l12">
                                    <input placeholder="Nombre" id="name" type="text" class="validate" value="${data.nombre_admin}" disabled/>
                                    <label class='active' for="name">Nombre</label>
                                </div>
                                <div class="input-field col s6 m12 l12">
                                    <input placeholder="Apellido" id="lastname" type="text" class="validate" value="${data.apellido_admin}"disabled />
                                    <label class='active' for="lastname">Apellido</label>
                                </div>
                                <div class="input-field col s6 m12 l12">
                                    <input placeholder="Número de DUI" id="dui" type="text" class="validate" value="${data.dui_admin}" disabled/>
                                    <label class='active' for="dui">DUI</label>
                                </div>
                                <div class="input-field col s6 m12 l12">
                                    <input placeholder="Correo" id="email" type="email" class="validate" value="${data.correo_admin}" disabled/>
                                    <label class='active' for="email">Correo</label>
                                </div>
                                <div class="input-field col s6 m12 l12">
                                    <input placeholder="Teléfono" id="telefono" type="tel" class="validate" value="${data.telefono_admin}" disabled/>
                                    <label class='active' for="telefono">Teléfono</label>
                                </div>
                                    <a class="btn waves-effect waves-light btn modal-trigger boton_cambiar_foto_cliente" href="#modal_info"  onclick="cargarUsuario(${data.id_admin})"><i
                                    class="material-icons">edit</i></a>
                            </form>
                        </div>
                    </div>
                    <div class="col l5 m12 s12 center-align">
                        <h6>Datos de tu cuenta</h6>
                        <div class="contenedor_datos_usuario_perfil_cliente">
                            <div class="input-field col s6 m12 l12">
                                <input disabled id="usuario" type="text" name="usuario" class="validate" value="${data.usuario_admin}" disabled/>
                                <label class='active' for="usuario">Usuario</label>
                            </div>
                            <div class="input-field col s6 m12 l12">
                                <input disabled id="pass" type="password" name="pass" class="validate" value="123456"/>
                                <label class='active' for="pass">Contraseña</label>
                            </div>
                            <div class="contenedor_boton_modificar_datos_cliente">
                                <a href="#datos-cuenta" class="btn modal-trigger boton_cambiar_foto_cliente" onclick="cargarCuenta(${data.id_admin})"><i
                                        class="material-icons">edit</i></a>
                            </div>
                        </div>
                    </div>
        `;
    //Se Inyecta el HTML en la página
    document.getElementById("contenedor").innerHTML = contenido;
}

//Función que carga los datos del usuario
function cargarUsuario(id) {
    //Se crea un dato de tipo formulario
    let datos = new FormData();
    //Se carga con el id
    datos.append("id", id);
    //Se empieza con la petición
    fetch(API_PERFIL + "cargarUsuario", {
        method: "post",
        body: datos,
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    document.getElementById("nombre").value = response.dataset.nombre_admin;
                    document.getElementById("Apellido").value = response.dataset.apellido_admin;
                    document.getElementById("duiM").value = response.dataset.dui_admin;
                    document.getElementById("telefonoM").value = response.dataset.telefono_admin;
                    document.getElementById("correo").value = response.dataset.correo_admin;
                    document.getElementById("idU").value = response.dataset.id_admin;
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Función que carga los datos de la cuenta
function cargarCuenta(id) {
    //Se crea un dato de tipo formulario
    let datos = new FormData();
    //Se carga con el id
    datos.append("id", id);
    //Se empieza con la petición
    fetch(API_PERFIL + "cargarCuenta", {
        method: "post",
        body: datos,
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    document.getElementById("idC").value = response.dataset.id_admin;
                    document.getElementById("usuarioM").value = response.dataset.usuario_admin;
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

//Método que actualiza los datos del usuario
document.getElementById("usuarioF").addEventListener("submit", function (event) {
    //Se previene la recarga automatica
    event.preventDefault();
    if (verificarEmail("correo")) {
        //Se ejecuatan los cambios
        saveRow(API_PERFIL, "actualizarUsuario", "usuarioF", "modal_info");
    } else {
        sweetAlert(3, "Formato de correo incorrecto", null);
    }
});

//Método que actualiza los datos de la cuenta
document.getElementById("cuentaF").addEventListener("submit", function (event) {
    //Se previene la recarga automatica
    event.preventDefault();
    //Se verifican si son iguales
    if (document.getElementById("passC").value == document.getElementById("pass2C").value) {
        //se mide la longitug
        if (document.getElementById("passC").value.length < 8) {
            sweetAlert(3, "Las contraseñas debe tener al menos 8 caracteres", null);
        } else {
            //Se ejecuatan los cambios
            saveRow(API_PERFIL, "actualizarCuenta", "cuentaF", "datos-cuenta");
        }
    } else {
        sweetAlert(3, "Las contraseñas no son iguales", null);
    }
});

//Función para generar el proceso de autentificación en dos pasos
//Se crea un método cuando se carga la página
function cargarQR() {
    //Se realiza la peticion
    fetch(API_AUTENTIFICADOR + "generarCodigo", {
        method: "get",
    }).then(function (request) {
        //Se revisa el estado de la ejecución
        if (request.ok) {
            //Se pasa a json
            request.json().then(function (response) {
                //Se revisa el estado devuelto por la api
                if (response.status) {
                    //Se coloca el código qr
                    document.getElementById("codigoQR").src = response.dataset[1];
                    document.getElementById("secreto").innerHTML = response.dataset[0];
                    //Se muestra el mensaje
                    sweetAlert(1, response.message, null);
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
}

//método para revisar el código ingresado
document.getElementById("autentificacion").addEventListener("submit", function (event) {
    //Se previene la autorecarga
    event.preventDefault();
    //Se realiza la peticion
    fetch(API_AUTENTIFICADOR + "verificarRegistro", {
        method: "post",
        body: new FormData(document.getElementById("autentificacion")),
    }).then(function (request) {
        //Se revisa el estado de la ejecución
        if (request.ok) {
            //Se pasa a formato JSON
            request.json().then(function (response) {
                //Se verifica el estado devuelto por la api
                if (response.status) {
                    //Se muestra el mensaje
                    sweetAlert(1, response.message, null);
                    //Se cierra el modal
                    M.Modal.getInstance(document.getElementById("modal-autentificar")).close();
                    //Se reestablece el formulario
                    document.getElementById("autentificacion").reset();
                    //Se refrescan las opciones de autentificación en dos pasos
                    datosAutentificacion();
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + " " + request.statusText);
        }
    });
});

//Función para desactivar la autentificación en dos pasos
function desactivar() {
    (async function () {
        //Se solicita que se digite la contraseña antes de desactivarla
        const { value: pass } = await Swal.fire({
            title: "Confirmación de identidad",
            text: "Antes de proceder, es necesario que digites tu contraseña antes de desactivar la autentificación en dos pasos",
            showCancelButton: true,
            input: "text",
            with: "40em",
            inputPlaceholder: "Escribe tu contraseña",
            padding: 50,
            inputAttributes: {
                maxlength: 10,
            },
        });
        //Se crea una constante para enviar la contraseña
        let data = new FormData();
        data.append("clave", pass);
        //Se realiza la petición para verificar la existencia el usuario
        fetch(API_AUTENTIFICADOR + "verificarPass", {
            method: "post",
            body: data,
        }).then(function (request) {
            //Se revisa el estado de la ejecución
            if (request.ok) {
                //Se pasa a JSON
                request.json().then(function (response) {
                    //Se revisa el estado devuelto por la API
                    if (response.status) {
                        //Se le solicita la confirmación antes de desactivarla
                        swal.fire({
                            title: "Desactivar autentificación en dos pasos",
                            text: "Si desactivas la autentificación en dos pasos, tu cuenta estará más vulnerable a ataques y robos de ella, ¿Estás seguro?",
                            showCancelButton: true,
                            cancelButtonColor: "#1e88e5",
                            confirmButtonColor: "#c62828 ",
                            confirmButtonText: "Desactivar",
                            cancelButtonText: "Cancelar",
                        }).then(function (result) {
                            //Se revisa la elección del usuario
                            if (result.isConfirmed) {
                                //Se procede a eliminar el factor de dos pasos
                                fetch(API_AUTENTIFICADOR + "eliminarAutentificacion", {
                                    method: "get",
                                }).then(function (request) {
                                    //Se revisa el estado devuelto por la ejecución
                                    if (request.ok) {
                                        //Se pasa a formato JSON
                                        request.json().then(function (response) {
                                            //Se verifica el estado devuelto por la API
                                            if (request.status) {
                                                //Se confirma la desactivación
                                                sweetAlert(1, response.message, null);
                                                //Se refrescan las opciones de verificación en dos pasos
                                                datosAutentificacion();
                                            } else {
                                                //Se muestra el problema
                                                sweetAlert(2, response.exception, null);
                                            }
                                        });
                                    } else {
                                        //Se mueyts el problema en la conosla
                                        console.log(request.status + " " + request.statusText);
                                    }
                                });
                            }
                        });
                    } else {
                        //Se muestra el problema
                        sweetAlert(2, response.exception, null);
                    }
                });
            } else {
                //Se imprime el problema en la consola
                console.log(request.status + " " + request.statusText);
            }
        });
    });
}

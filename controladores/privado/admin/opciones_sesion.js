// Constantes para establecer rutas de archivos esenciales y parametros de la API
const API_perfil = SERVER + "dashboard/sesion.php?action=";

const API_DISTRIBUIDO = SERVER + 'dashboard/administrar_distribuidor.php?action=';


//Método que se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    //Se busca si se ha iniciado sesión o no
    fetch(API_perfil + "obtenerSesion", {
        method: "get",
    }).then(function(request) {
        //Se verifica que la sentencia se haya ejecutado
        if (request.ok) {
            //Se convierte la petición en formato JSON
            request.json().then(function(response) {
                //Se crea la variable donde se guardarán los datos
                let data = [];
                //se crea la variable donde se guardará el HTML a inyectar
                let contenido = [],
                    contenido2 = [];
                // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    data = response.dataset;
                    //Si hay sesión se reeemplazan las opciones
                    contenido = `
                    <div class="col l11 m10 s9 right-align">
                       
                        <span class="black-text">${data.nombre}</span>
                    </div>
                    <div class="col l1 m2 s3 right valign-wrapper">
                        <a href="perfil.html">
                         <i class=" icono-sesion material-icons  black-text">account_circle</i></a>
                    </div>`;
                    contenido2 = `
                    <a href="perfil.html">
                         <i class=" icono-sesion material-icons  white-text">account_circle</i>
                    <span class="white-text hide-on-large-only ">${data.nombre}</span></a>

                   `;
                    //se incrustan en el html
                    document.getElementById("opciones_navbar").innerHTML = contenido;
                    document.getElementById("sesion_navbar").innerHTML = contenido2;

                    fetch(API_DISTRIBUIDO + "getRequest", {
                        method: "get",
                    }).then(function(request) {
                        //Se verifica que la sentencia se haya ejecutado
                        if (request.ok) {
                            //Se convierte la petición en formato JSON
                            request.json().then(function(response) {

                                //se crea la variable donde se guardará el HTML a inyectar
                                let contenido = [];
                                let title = [];
                                // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                                if (response.status) {

                                    document.getElementById("campa" + data.id_admin).innerHTML = 'notifications';

                                } else {
                                    //si no hay sesión se coloca la opción para iniciar sesión
                                    document.getElementById("campa" + data.id_admin).innerHTML = 'notifications_none';
                                }
                                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
                            });
                        } else {
                            //Se imprime el problema al ejecutar la sentencia
                            console.log(request.status + " " + request.statusText);
                        }
                    });
                } else {
                    //si no hay sesión se coloca la opción para iniciar sesión
                    contenido = `
                   
                    <div class="col l4 m6 s12 right-align">
                        <a href="index.html" class="waves-effect waves-light btn blue accent-2 boton_iniciar_sesion">Iniciar sesion</a>
                    </div>
                    `



                    ;



                }
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
            });
        } else {
            //Se imprime el problema al ejecutar la sentencia
            console.log(request.status + " " + request.statusText);
        }
    });



});

function openCampa() {
    let contenido = '';
    let title = '';
    fetch(API_DISTRIBUIDO + "getRequest", {
        method: "get",
    }).then(function(request) {
        //Se verifica que la sentencia se haya ejecutado
        if (request.ok) {
            //Se convierte la petición en formato JSON
            request.json().then(function(response) {
                //Se crea la variable donde se guardarán los datos
                let data = [];
                //se crea la variable donde se guardará el HTML a inyectar

                // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    response.dataset.map(function(row) {


                        //Si hay sesión se reeemplazan las opciones
                        contenido += `<a href="admin_distribuidor.html">${row.nombre_repartidor} ha enviado solicitud para ser repartidor</a><br>`;
                        title = `Tiene algunas notificaciones que ver`;
                    });
                } else {
                    //si no hay sesión se coloca la opción para iniciar sesión
                    title = `No tiene notificaciones `;
                }
                Swal.fire({
                    title: title,
                    html: contenido,
                    showCancelButton: true,
                }).then(function() {

                });
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
            });
        } else {
            //Se imprime el problema al ejecutar la sentencia
            console.log(request.status + " " + request.statusText);
        }
    });


}
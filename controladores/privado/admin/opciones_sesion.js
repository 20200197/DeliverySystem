// Constantes para establecer rutas de archivos esenciales y parametros de la API
const API_perfil = SERVER + "dashboard/sesion.php?action=";

//Método que se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
    //Se busca si se ha iniciado sesión o no
    fetch(API_perfil + "obtenerSesion", {
        method: "get",
    }).then(function (request) {
        //Se verifica que la sentencia se haya ejecutado
        if (request.ok) {
            //Se convierte la petición en formato JSON
            request.json().then(function (response) {
                //Se crea la variable donde se guardarán los datos
                let data = [];
                //se crea la variable donde se guardará el HTML a inyectar
                let contenido = [];
                // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    data = response.dataset;
                    //Si hay sesión se reeemplazan las opciones
                    contenido = `
                    <div class="col l11 m8 s12 right-align">
                        <div class="col l8 m8 s8">
                            <!--Switch de cambiar color-->
                            <div class="switch switch_colorr hide-on-small-and-down right-align">
                                <label>
                                    🌕
                                    <input type="checkbox" id="switch_color" onclick="modoOscuro()">
                                    <span class="lever"></span>
                                    🌙
                                </label>
                            </div>
                        </div>
                        <span class="black-text">${data.nombre}</span>
                    </div>
                    <div class="col l1 m4 s12 left">
                        <a href="perfil.html"><i
                                class="icono-sesion material-icons black-text">account_circle</i></a>
                    </div>`;
                    //se incrustan en el html
                    document.getElementById("opciones_navbar").innerHTML = contenido;
                } else {
                    //si no hay sesión se coloca la opción para iniciar sesión
                    contenido = `
                    <div class="col l8 m6 s12">
                            <!--Switch de cambiar color-->
                            <div class="switch switch_colorr hide-on-small-and-down right-align">
                                <label>
                                    🌕
                                    <input type="checkbox" id="switch_color" onclick="modoOscuro()">
                                    <span class="lever"></span>
                                    🌙
                                </label>
                            </div>
                        </div>
                    <div class="col l4 m6 s12 right-align">
                        <a href="index.html" class="waves-effect waves-light btn blue accent-2 boton_iniciar_sesion">Iniciar sesion</a>
                    </div>
                    `;
                    //se incrustan en el html
                    document.getElementById("opciones_navbar").innerHTML = contenido;
                }
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
            });
        } else {
            //Se imprime el problema al ejecutar la sentencia
            console.log(request.status + " " + request.statusText);
        }
    });
});

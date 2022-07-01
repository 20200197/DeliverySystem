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
                    contenido = `<h6>${data.nombre}</h6>`;
                    //se incrustan en el html
                    document.getElementById("opciones_navbar").innerHTML = contenido;
                } else {
                    //si no hay sesión se coloca la opción para iniciar sesión
                    contenido = `
                    <a href="index.html" class="waves-effect waves-light btn boton_iniciar_sesion">Log In</a>
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

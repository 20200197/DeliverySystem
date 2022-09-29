API_PERFIL = SERVER + "publico/sesion.php?action=";

document.addEventListener('DOMContentLoaded', function () {
    fetch(API_PERFIL + "obtenerSesionC", {
        method: "get",
    }).then(function (request) {
        //Se verifica que la sentencia se haya ejecutado
        if (request.ok) {
            //Se convierte la petición en formato JSON
            request.json().then(function (response) {
                //Se crea la variable donde se guardarán los datos
                let contenido = '';
                // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    contenido += `<!--Imagen de perfil-->
                        <div class="col s9 m2 l1 offset-s3 offset-m1 offset-l1">
                            <img class="responsive-img circle" id=""
                                src="${SERVER}imagenes/cliente/${response.dataset.foto_cliente}">
                        </div>
                        <!--Bienvenida-->
                        <div class="col s9 m8 l9 offset-s3 valign-wrapper">
                            <p class="flow-text" id="saludo">¡Hola, ${response.dataset.nombre}!</p>
                        </div>`;

                    document.getElementById('datos-insert').innerHTML = contenido;
                } else {
                    //si no hay sesión se coloca la opción para iniciar sesión
                    contenido += `<!--Imagen de perfil-->
                    <div class="row center">
                        <div>
                            <img class="responsive-img center-align"
                                src="../../../recursos/img/publico/warning.jpg">
                        </div>
                        <!--Bienvenida-->
                        <div>
                            <h1 class="red-text">Acceso denegado</h1>
                        </div>
                    </div>`;
                    //se incrustan en el html
                    document.getElementById('main').innerHTML = contenido;
                }
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
            });
        } else {
            //Se imprime el problema al ejecutar la sentencia
            console.log(request.status + " " + request.statusText);
        }
    });
});
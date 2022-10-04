document.addEventListener('DOMContentLoaded', function () {
    fetch(API_PERFIL + "obtenerSesionC", {
        method: "get",
    }).then(function (request) {
        //Se verifica que la sentencia se haya ejecutado
        if (request.ok) {
            //Se convierte la petición en formato JSON
            request.json().then(function (response) {
                //Se crea la variable donde se guardarán los datos
                let sidenav = '';
                let contenido = '';
                // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    sidenav += `<ul id="slide-out" class="sidenav sidenav-fixed blue accent-2">
                    <div class="opciones-sidenav">
                        <li class="collection-item"><a href="index.html" class="tooltipped" data-position="right"
                                data-tooltip="Hogar"><i class="material-icons  white-text">home</i><span
                                    class="white-text hide-on-large-only">Inicio</span></a>
                        </li>
                        <li><a href="perfil_cliente.html" class="tooltipped Hide-on-large-only " data-position="right"
                                data-tooltip="Perfil"><i class="material-icons  white-text">account_circle</i><span
                                    class="white-text hide-on-large-only">Perfil</span></a></li>
                        <li><a href="carrito.html" class="tooltipped" data-position="right" data-tooltip="Carrito de compras"><i
                                    class="material-icons  white-text">shopping_basket</i><span
                                    class="white-text hide-on-large-only">Compras</span></a></li>
                        <li class="hide-on-large-only"><button onclick="logOut('Cliente')"
                                class="tooltipped transparent logout valign-wrapper" data-position="right"
                                data-tooltip="Cerrar sesión"><i class="material-icons  white-text">arrow_back</i><span
                                    class="white-text hide-on-large-only">Cerrar
                                    sesión</span></button></li>
                    </div>
                    <div class="cerrar-navbar hide-on-med-and-down">
                        <li>
                            <button onclick="logOut('Cliente')" class="tooltipped white-text transparent logout valign-wrapper"
                                data-position="right" data-tooltip="Cerrar sesión"><i
                                    class="material-icons ">arrow_back</i><span class="white-text hide-on-large-only">Cerrar
                                    sesión</span></button>
                        </li>
                    </div>
        
        
                </ul>`;
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
                    sidenav += `<ul id="slide-out" class="sidenav sidenav-fixed blue accent-2">
                        <div class="opciones-sidenav">
                            <li class="collection-item"><a href="index.html" class="tooltipped" data-position="right"
                                    data-tooltip="Hogar"><i class="material-icons  white-text">home</i><span
                                        class="white-text hide-on-large-only">Inicio</span></a>
                            </li>
                        </div>
                    </ul>`;
                    //se incrustan en el html
                    document.getElementById('main').innerHTML = contenido;
                }
                document.getElementById('sidenav-content').innerHTML = sidenav;
                M.Sidenav.init(document.querySelectorAll('.sidenav'));
                M.Tooltip.init(document.querySelectorAll('.tooltipped'));
                M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
                M.Materialbox.init(document.querySelectorAll(".materialboxed"));
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
            });
        } else {
            //Se imprime el problema al ejecutar la sentencia
            console.log(request.status + " " + request.statusText);
        }
    });
});
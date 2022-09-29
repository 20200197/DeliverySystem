const API_PERFIL = SERVER + "publico/sesion.php?action=";

document.addEventListener('DOMContentLoaded', function() {
    fetch(API_perfil + "obtenerSesionC", {
        method: "get",
    }).then(function (request) {
        //Se verifica que la sentencia se haya ejecutado
        if (request.ok) {
            //Se convierte la petición en formato JSON
            request.json().then(function (response) {
                //Se crea la variable donde se guardarán los datos
                let sidenav = '';
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
                } else {
                    //si no hay sesión se coloca la opción para iniciar sesión
                    sidenav += `<ul id="slide-out" class="sidenav sidenav-fixed blue accent-2">
                        <div class="opciones-sidenav">
                            <li class="collection-item"><a href="index.html" class="tooltipped" data-position="right"
                                    data-tooltip="Hogar"><i class="material-icons  white-text">home</i><span
                                        class="white-text hide-on-large-only">Inicio</span></a>
                            </li>
                        </div>
                    </ul>`;
                }
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
                document.getElementById('sidenav-content').innerHTML = sidenav;
            });
        } else {
            //Se imprime el problema al ejecutar la sentencia
            console.log(request.status + " " + request.statusText);
        }
    });
});
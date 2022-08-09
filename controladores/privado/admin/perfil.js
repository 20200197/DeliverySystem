//Se crea la constante de la api
const API_PERFIL = SERVER + "dashboard/administrar_perfil.php?action=";

// Método que ejecuta la carga de de las tablas y la activación de componentes
document.addEventListener("DOMContentLoaded", function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_PERFIL);
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll(".modal"), {dismissible: false});
    //se inicializan los tooltp
    M.Tooltip.init(document.querySelectorAll(".tooltipped"));
});

//Función que llena la tabla
function fillTable(data) {
    //Se crea una variable donde se guardará el HTML a inyectar
    let contenido = [];
    //Se obtiene el contenido y se revisa fila por fila en el map
    data.map(function (row) {
        contenido += `
<<<<<<< Updated upstream
            <tr>
                <td data-target="Apellido cliente: ">${row.nombre_completo}</td>
                <td data-target="Dui cliente: ">${row.dui_cliente}</td>
                <td data-target="Correo cliente: ">${row.correo_cliente}</td>
                <td data-target="Usuario cliente: ">${row.usuario_cliente}</td>
                <td data-target="Fecha registro: ">${row.fecha_registro_cliente}</td>
                <td data-target="Telefono cliente: ">${row.telefono_cliente}</td>
                <td data-target="Imagen cliente: ">
                    <div class="switch">
                        <label>
                        Inactivo
                        <input type="checkbox" id="estado${row.id_cliente}" onclick="estado(${
            row.id_cliente
        })"
                        ${row.status_cliente == true ? "checked" : ""}>
                        <span class="lever"></span>
                        Activo
                        </label>
=======
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
>>>>>>> Stashed changes
                    </div>
                </td>
            </tr>
        `;
    });
    //Se Inyecta el HTML en la página
    document.getElementById("contenido").innerHTML = contenido;
}

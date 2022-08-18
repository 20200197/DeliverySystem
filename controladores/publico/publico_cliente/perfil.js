//Se crea la constante para la API
const API_PERFIL = SERVER + 'publico/perfil_cliente.php?action=';

//Se crea el método que se ejecutará cuando se ejecuta la página
document.addEventListener('DOMContentLoaded', function() {
    //Se esconden los botones de modificación
    document.getElementById('guardar').style.display = "none";
    document.getElementById('cancelar').style.display = "none";
    document.getElementById('botonFoto').setAttribute('disabled', true);
    //Se cargan los datos
    readRows(API_PERFIL);
});

//Se crea una función para cargar los datos en la página
function fillTable(datos) {
    //Se empiezan a cargar los datos obtenidos de la API
    document.getElementById('nombre').value = datos.nombre_cliente;
    document.getElementById('apellido').value = datos.apellido_cliente;
    document.getElementById('correo').value = datos.correo_cliente;
    document.getElementById('telefono').value = datos.telefono_cliente;
    document.getElementById('fotoPerfil').src = SERVER + '/imagenes/cliente/foto/' + datos.foto_cliente;
}

//Se crea el método que verificará la autentidad del usuario
document.getElementById('confirmacionAutenticidad').addEventListener("submit", function(event) {
    //Se previene la recarga de la página
    event.preventDefault();
    //Comprueba la contraseña
    //Se cierra el formulario
    M.Modal.getInstance(document.getElementById("autenticidad")).close();
    //Se reinicia el contenido del formulario
    document.getElementById('confirmacionAutenticidad').reset();
    //Se abre el formulario
    M.Modal.getInstance(document.getElementById("datos-cuenta")).open();
});


//Función para previsualizar la foto de perfil
function leerImg(input, img_destino) {
    //Se obtiene los archivos del input
    let archivos = input.files;
    //Se verifica si está vacío
    if (!archivos || !archivos.length) {
        img_destino.src = "../../recursos/img/publico/sin.png";
        return;
    }
    //Carga la imagen
    const visualizar = archivos[0];
    const url = URL.createObjectURL(visualizar);
    img_destino.src = url;
}

//Función para activar el cambio de datos
function activar() {
    if (document.getElementById('activar').style.display == "none") {
        //Se escoden los botones
        document.getElementById('guardar').style.display = "none";
        document.getElementById('cancelar').style.display = "none";
        //Se muestra el botón
        document.getElementById('activar').style.display = "";
        //Se desactivan los campos de modificación
        document.getElementById('nombre').disabled = true;
        document.getElementById('apellido').disabled = true;
        document.getElementById('correo').disabled = true;
        document.getElementById('telefono').disabled = true;
        //Se agregan los estilos
        document.getElementById('nombre').style = 'border-bottom: 1px dotted rgba(0, 0, 0, 0.42); box-shadow: none;';
        document.getElementById('apellido').style = 'border-bottom: 1px dotted rgba(0, 0, 0, 0.42); box-shadow: none;';
        document.getElementById('correo').style = 'border-bottom: 1px dotted rgba(0, 0, 0, 0.42); box-shadow: none;';
        document.getElementById('telefono').style = 'border-bottom: 1px dotted rgba(0, 0, 0, 0.42); box-shadow: none;';
        //Sw
        document.getElementById('botonFoto').setAttribute('disabled', true);
        //Se rellenan los campos con los datos actuales
        readRows(API_PERFIL);
    } else {
        //Se muestran los botones
        document.getElementById('guardar').style.display = "";
        document.getElementById('cancelar').style.display = "";
        //Se esconde el botón
        document.getElementById('activar').style.display = "none";
        //Se activan los campos de modificación
        document.getElementById('nombre').disabled = false;
        document.getElementById('apellido').disabled = false;
        document.getElementById('correo').disabled = false;
        document.getElementById('telefono').disabled = false;
        //Se agregan los estilos
        document.getElementById('nombre').style = '';
        document.getElementById('apellido').style = '';
        document.getElementById('correo').style = '';
        document.getElementById('telefono').style = '';
        document.getElementById('botonFoto').removeAttribute('disabled');


    }

}

//Función para guardar los cambios del usuario
function guardarDatos() {
    //Se realiza una petición para validar que si se han realizado cambios a guardar
    fetch(API_PERFIL + 'readAll', {
        method: 'get',
    }).then(function(request) {
        //Se verifica si se ha ejecutado la petición
        if (request.ok) {
            //Se pasa a formato JSOn
            request.json().then(function(response) {
                //Se revisa el estado devuelto por la API
                if (response.status) {
                    //Se revisan los datos para validar si han sido modificados
                    imagen = document.getElementById('fotoPerfil').src.split('/');
                    if (
                        imagen[imagen.length - 1] == response.dataset.foto_cliente &&
                        document.getElementById('nombre').value == response.dataset.nombre_cliente &&
                        document.getElementById('apellido').value == response.dataset.apellido_cliente &&
                        document.getElementById('correo').value == response.dataset.correo_cliente &&
                        document.getElementById('telefono').value == response.dataset.telefono_cliente
                    ) {
                        //Se notifica el problema
                        sweetAlert(3, 'Debes modificar datos para poder actualizar', null);
                    } else {
                        //Se procede a actualizar el registro
                        fetch(API_PERFIL + "ActualizarPerfil", {
                            method: "post",
                            body: new FormData(document.getElementById("datosGenerales")),
                        }).then(function (request) { 
                            //Se verifica el estado de la ejecución
                            if (request.ok) {
                                //Se convierte a formato JSON
                                request.json().then(function (response) { 
                                    //Se verifica el estado devuelto por la API
                                    if (response.status) {
                                        sweetAlert(1, response.message, null);
                                    } else { 
                                        //Se notifica el problema
                                        sweetAlert(2, response.exception, null);
                                    }
                                })
                            } else { 
                                //Se imprime el error en la consola
                                console.log(request.status + ' ' + request.statusText);
                            }
                        });
                    }


                } else {
                    //Se notifica el problema
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}
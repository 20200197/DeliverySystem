//Se crea la constante para la API
const API_PERFIL = SERVER + 'publico/perfil_cliente.php?action=';

//Se crea el método que se ejecutará cuando se ejecuta la página
document.addEventListener('DOMContentLoaded', function() {
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
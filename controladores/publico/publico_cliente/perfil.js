//Se crea la constante para la API
const API_PERFIL = SERVER + 'publico/perfil.php?action=';

//Se crea el método que se ejecutará cuando se ejecuta la página
document.addEventListener('DOMContentLoaded', function () {
    //Se cargan los datos
});

//Se crea el método que verificará la autentidad del usuario
document.getElementById('confirmacionAutenticidad').addEventListener("submit", function (event) { 
    //Se previene la recarga de la página
    event.preventDefault();
    //Comprueba la contraseña
    //Se cierra el formulario
    M.Modal.getInstance(document.getElementById("autenticidad")).close();
    //Se reinicia el contenido del formulario
    document.getElementById('confirmacionAutenticidad').reset();
    //Se abre el formulario
    M.Modal.getInstance(document.getElementById("datos-cuenta")).open();
})

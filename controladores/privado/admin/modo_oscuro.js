
// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    modo_oscuro();
});

//Variable que guardara si esta el modo oscuro o no
var data ;

//Función para poner el modo oscuro o no
function modo_oscuro() {
    //Obtenemos item de la sesion
    data = sessionStorage.getItem('oc');
    if (data == 1  ) {
        var element = document.body;
        document.getElementById('switch_color').checked = true;
        element.classList.toggle("modo_oscuro");
        element.classList.toggle("footer_oscuro");
        element.classList.toggle("sidenav_oscuro");
        element.classList.toggle("titulo_pegaa");
        element.classList.toggle("inputs");
        element.classList.toggle("encabezado_oscuro");
        element.classList.toggle("th_oscuro");
        element.classList.toggle("i_oscuro");
        element.classList.toggle("boton_oscuro");
        element.classList.toggle("mapa_oscuro");
        element.classList.toggle("login_oscuro");
        element.classList.toggle("inputs_password");
        element.classList.toggle("labels");
        element.classList.toggle("inputs_email");
        element.classList.toggle("inputs_tel");
        element.classList.toggle("modal_oscuro");
        element.classList.toggle("modal_tabla");
        element.classList.toggle("header_oscuro");
        element.classList.toggle("opciones_navbar_oscuro");
        
        //Guardamnos item en la sesion
        data = sessionStorage.setItem('oc', '1');
    } else {
        //Guardamos item en la sesion
        data = sessionStorage.setItem('oc', '0');
    }
}

//Función par activar el switch en modo oscuro
function modoOscuro() {
     if(document.getElementById('switch_color').checked==true){
        var element = document.body;
        
        element.classList.toggle("modo_oscuro");
        element.classList.toggle("footer_oscuro");
        element.classList.toggle("sidenav_oscuro");
        element.classList.toggle("titulo_pegaa");
        element.classList.toggle("inputs");
        element.classList.toggle("encabezado_oscuro");
        element.classList.toggle("th_oscuro");
        element.classList.toggle("i_oscuro");
        element.classList.toggle("boton_oscuro");
        element.classList.toggle("mapa_oscuro");
        element.classList.toggle("login_oscuro");
        element.classList.toggle("inputs_password");
        element.classList.toggle("labels");
        element.classList.toggle("inputs_email");
        element.classList.toggle("inputs_tel");
        element.classList.toggle("modal_oscuro");
        element.classList.toggle("modal_tabla");
        element.classList.toggle("header_oscuro");
        element.classList.toggle("opciones_navbar_oscuro");
        //Guardamos item en la sesion
        data = sessionStorage.setItem('oc', '1');
     }else{
         //Se devuelve los colores principales
        var element = document.body;
        element.className = "body";
        data = sessionStorage.setItem('oc', '0');
     }
}


// function darkMode() {

//     var element = document.body;

//     element.classList.toggle("modo_oscuro");
//     element.classList.toggle("footer_oscuro")
//     element.classList.toggle("sidenav_oscuro")
//     element.classList.toggle("titulo_pegaa")
   
//     data = localStorage.setItem('oc', '1');
//     data = localStorage.getItem('oc');
//     console.log(''+data);


// }

// function modo_oscuro() {
//     if (darkMode()) {
//         data = localStorage.setItem('oc', '1');
//     } else {
//         data = localStorage.setItem('oc', '0');
//     }
// }

// function modoOscuro() {
//      data = localStorage.getItem('oc');
//      console.log(data);
//     if (data == '1') {
//         darkMode();
//         console.log('dA'+data);
//     } else {
//         data=localStorage.setItem('oc', '0');
//     }
// }
/**
 * Controlador encargado de detectar la actividad del mouse, y si en dado caso
 * se cumple el tiempo establecido, se cerrará la sesión y lo redirigirá
 * hacia el index (login) para que vuelva a iniciar sesión
 * 
 * El tiempo máximo será de 5 minutos de inactividad
 */

//Se crea una variable que llevará el conteo del tiempo respecto

var inactividad, advertencia;



//Se crea una función que se encargará de detectar la interacción del usuario
function actividad() {
    this.addEventListener("mousemove", reiniciarAtividad, false);
    this.addEventListener("mousedown", reiniciarAtividad, false);
    this.addEventListener("keypress", reiniciarAtividad, false);
    this.addEventListener("DOMMouseScroll", reiniciarAtividad, false);
    this.addEventListener("mousewheel", reiniciarAtividad, false);
    this.addEventListener("touchmove", reiniciarAtividad, false);
    this.addEventListener("MSPointerMove", reiniciarAtividad, false);

    //Se inicia el conteo inicial
    iniciarInactividad();
}

//Función que se encarga de reiniciar el tiempo máximo que puede pasar en inactividad
function iniciarInactividad() {
    advertencia = window.setTimeout(mensaje, 1350000); //Se mostrará el mensaje a los 2 minutos y 25 segundos
    //Mensaje final antes de que se cierre la sesión
    inactividad = window.setTimeout(cerrarSesion, 240000); //Se mostrará el mensaje a los 4 minutos
    /**
     * 
     * Esto se realiza porque la alerta durará 5 segundos
     * 
     * 5 segundos + 2 minutos y 25 segundos = 2 minutos y 30 segundos
     * 
     * El resto de los 5 minutos será para la confirmación final
     * 
     * Explicación del tiempo
     * 1 segundo = 1000 milisegundos
     * 1 minuto = 1000 * 6 = 60,000 milisegundos
     * 2.25 minutos = 1000 * (6 * 2.25)  = 135,000 milisegundos
     * 
     */
}


//Función que mostrará un mensaje de advertencia
function mensaje() {
    //Se despliega el mensaje de advertencia de movimiento
    let timerInterval;
    Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Advertencia de inactividad',
        text: 'Debes de interactuar con la página para que no se cierre tu sesión',
        icon: 'warning',
        timer: 5000,
        showConfirmButton: false,
        timerProgressBar: true,
        willClose: () => {
            if (cerrar) {
                Swal.close();
            }
            clearInterval(timerInterval)
        }
    });
}


//Función que cambia cierra la sesión
function cerrarSesion() {
    //Se cierra la sesion
    let timerInterval;
    //Se establece el tiempo que se mostrará
    cantidad = 59;
    Swal.fire({
        imageUrl: '/DeliverySystem/recursos/img/logo_delivery_system.png', //Logo
        title: 'La sesión está a punto de cerrarse', //Titulo
        html: 'La sesión se cerrará <b>60</b> segundos.', //Explicación
        timer: 60000, //Tiempo de duración
        timerProgressBar: true,
        confirmButtonText: 'Continuar con la sesión',
        backdrop: `
            rgba(30, 136, 229, 0.4)
        `,
        didOpen: () => {
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                b.textContent = cantidad;
                cantidad--;
            }, 1000);
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) { 
              //Se procede a cerrar la sesión
        }  
                 
    })
}

//Función para rieniciar el conteo
function reiniciarAtividad(e) {
    //Se reinicia la variable de inactividad
    window.clearTimeout(advertencia);
    window.clearTimeout(inactividad);
    //Se reejecuta la función
    activar();
}


//Función de activiación
function activar() {
    iniciarInactividad(); //Se reinicia el tiempo
}
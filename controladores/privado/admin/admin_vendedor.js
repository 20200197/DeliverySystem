//Se crea la constante para la ruta del vendedor
const API_vendedor = 'dashboard/admin_vendedor.php?action=';

//Se crea el método para leer los datos cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    //Se leen los datos de los vendedores, la función se encuentra en componetes.js
    readRows(API_vendedor);
})

//Se crea la función para cargar los datos en la tabla

function fillTable(data) {
    //Se crea la variable para guardar el HTML a inyectar
    let contenido = [];
    //Se revisa la data para colocar los datos línea por línea
    data.map(function (row) {
        //se va llenando el contenido con los datos obtenidos
        contenido += `
            <td data-target="Nombre vendedor: ">Nombre 1</td>
            <td data-target="Apellido vendedor: ">Apellido 1</td>
            <td data-target="Dui vendedor: ">Dui 1</td>
            <td data-target="Correo vendedor: ">Correo 1</td>
            <td data-target="Usuario vendedor: ">Usuario 1</td>
            <td data-target="Solvencia pnc: ">
            <img src="../../../recursos/img/privado/admin/modals/descarga (2).png"
            class="materialboxed imagen_standar"></td>
            <td data-target="Ver más: "><a class=" btn-flat modal-trigger"
            href="#modal_info"><i class="material-icons">remove_red_eye</i></a></td>
        `
    })

    //Se realiza la inyección de HTML a la tabla
    document.getElementById('contenido').innerHTML = contenid
}
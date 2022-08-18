<?php
require('../../ayudantes/dashboard_report.php');
require('../../modelos/administrar_cliente.php');


// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Gastos por cliente');

// Se instancia el módelo Clientes para obtener los datos.
$administrar_cliente = new Clientes;
// Se verifica si existen registros (clientes) para mostrar, de lo contrario se imprime un mensaje.
if ($dataClientes = $administrar_cliente->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(175);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(20, 10, utf8_decode('Gasto'), 1, 0, 'C', 1);
    $pdf->cell(80, 10, utf8_decode('Nombre cliente'), 1, 0, 'C', 1);
    $pdf->cell(80, 10, utf8_decode('Apellido cliente'), 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(225);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);

         
            // Se verifica si existen registros (gastos) para mostrar, de lo contrario se imprime un mensaje.
            if ($dataClientes = $administrar_cliente->gastosCliente()) {
                // Se recorren los registros ($dataClientes) fila por fila ($rowCliente).
                foreach ($dataClientes as $rowCliente) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(20, 10, utf8_decode($rowCliente['gastos_cliente']), 1, 0);
                    $pdf->cell(80, 10, utf8_decode($rowCliente['nombre_cliente']), 1, 0);
                    $pdf->cell(80, 10, utf8_decode($rowCliente['apellido_cliente']), 1, 1);
   
                }
            } else {
                $pdf->cell(0, 10, utf8_decode('No hay gastos para este cliente'), 1, 1);
            }
    
    
} else {
    $pdf->cell(0, 10, utf8_decode('No hay clientes para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'gastos_cliente.pdf');

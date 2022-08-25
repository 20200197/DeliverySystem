<?php
require('../../ayudantes/dashboard_report.php');
require('../../modelos/administrar_vendedor.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
//Se reinicia la sesión 
session_start();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Top 5 vendedores con más ventas',$_SESSION['nombre_admin']);

$administrar_vendedor = new AdministrarVendedor;
// Se verifica si existen registros (categorías) para mostrar, de lo contrario se imprime un mensaje.
if ($dataVendedor = $administrar_vendedor->obtenerVendedores()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(175);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(60, 10, utf8_decode('Nombre'), 1, 0, 'C', 1);
    $pdf->cell(20, 10, utf8_decode('Total(US$)'), 1, 0, 'C', 1);
    $pdf->cell(40, 10, utf8_decode('Correo'), 1, 0, 'C', 1);
    $pdf->cell(25, 10, utf8_decode('DUI'), 1, 0, 'C', 1);
    $pdf->cell(20, 10, utf8_decode('Estado'), 1, 0, 'C', 1);
    $pdf->cell(21, 10, utf8_decode('Cnt.vendida'), 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(225);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);

    // Se verifica si existen registros (vendedor) para mostrar, de lo contrario se imprime un mensaje.
    if ($dataVendedor = $administrar_vendedor->readVendedoresVentas()) {
        // Se recorren los registros ($dataVendedor) fila por fila ($rowVendedor).
        foreach ($dataVendedor as $rowVendedor) {
            ($rowVendedor['status_vendedor']) ? $estado = 'Activo' : $estado = 'Inactivo';
            // Se imprimen las celdas con los datos de los productos.
            $pdf->cell(60, 10, utf8_decode($rowVendedor['nombre_vendedor']), 1, 0);
            $pdf->cell(20, 10, utf8_decode('$'.$rowVendedor['total']), 1, 0);
            $pdf->cell(40, 10, utf8_decode($rowVendedor['correo_vendedor']), 1, 0);
            $pdf->cell(25, 10, $rowVendedor['dui_vendedor'], 1, 0);
            $pdf->cell(20, 10, $estado, 1, 0);
            $pdf->cell(21, 10, $rowVendedor['cantidad_total_vendida'], 1, 1);
        }
    } else {
        $pdf->cell(0, 10, utf8_decode('No hay ventas para este vendedor'), 1, 1);
    }
} else {
    $pdf->cell(0, 10, utf8_decode('No hay vendedores para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'vendedores_mas_ventas.pdf');
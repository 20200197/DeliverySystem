<?php
require('../../ayudantes/dashboard_report.php');
require('../../modelos/administrar_productos.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se instancia el módelo Productos para procesar los datos.
$producto = new Producto;
//Obtenemos parametro de url
$_GET = $producto->validateForm($_GET);

//Se inicia la sesión
session_start();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Top 5 productos de' . ' ' . $_GET['categoria'], $_SESSION['nombre_vendedor']);

// Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
if ($dataProductos = $producto->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->SetFillColor(44, 134, 218);
    //Color de texto
    $pdf->SetTextColor(255, 255, 255);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    //Color de texto
    $pdf->SetTextColor(255, 255, 255);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(63, 10, utf8_decode('Nombre producto'), 1, 0, 'C', 1);
    $pdf->cell(40, 10, utf8_decode('Cantidad producto'), 1, 0, 'C', 1);
    $pdf->cell(43, 10, utf8_decode('Categoria'), 1, 0, 'C', 1);
    $pdf->cell(40, 10, utf8_decode('Precio'), 1, 1, 'C', 1);
    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(0, 188, 163);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);
    //Color de texto
    $pdf->SetTextColor(0, 0, 0);
    // Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
    if ($dataProductos = $producto->readTop5MasVendidosCategoria($_GET['categoria'])) {
        // Se recorren los registros ($dataProductos) fila por fila ($rowProducto).
        foreach ($dataProductos as $rowProducto) {
            $pdf->setFillColor(0, 188, 163);
            // Se imprimen las celdas con los datos de los productos.
            $pdf->cell(63, 10, utf8_decode($rowProducto['nombre_producto']), 1, 0, 'C');
            $pdf->cell(40, 10, $rowProducto['cantidad_producto'], 1, 0, 'C');
            $pdf->cell(43, 10, $rowProducto['categoria'], 1, 0, 'C');
            $pdf->cell(40, 10, $rowProducto['precio_producto'], 1, 1, 'C');
        }
    } else {
        $pdf->cell(0, 10, utf8_decode('No hay productos para esta categoría'), 1, 1);
    }
} else {
    $pdf->cell(0, 10, utf8_decode('No hay clientes para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'productos.pdf');

<?php
require('../../ayudantes/dashboard_report.php');
require('../../modelos/administrar_productos.php');


// Se instancia la clase para crear el reporte.
$pdf = new Report;
//Se inicia la sesión
session_start();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Top 5 productos más vendidos y menos vendidos', $_SESSION['nombre_admin']);

// Se instancia el módelo Producto para obtener los datos.
$producto = new Producto;
// Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
if ($dataProductos = $producto->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(44, 134, 218);
    //Color de texto
    $pdf->setTextColor(255, 255, 255);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(90, 10, utf8_decode('Nombre producto'), 1, 0, 'C', 1);
    $pdf->cell(32, 10, utf8_decode('Cantidad pedido'), 1, 0, 'C', 1);
    $pdf->cell(30, 10, utf8_decode('Total'), 1, 0, 'C', 1);
    $pdf->cell(32, 10, utf8_decode('Categoría'), 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(225);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);
    //Color de letras de datos
    $pdf->setTextColor(0, 0, 0);
    $pdf->cell(184, 10, utf8_decode('Más vendidos: '), 1, 1, 'C', 1);
    // Se instancia el módelo Productos para procesar los datos.
    $producto = new Producto;
    // Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
    if ($dataProductos = $producto->readProductosMasVendidos()) {
        // Se recorren los registros ($dataProductos) fila por fila ($rowProducto).
        foreach ($dataProductos as $rowProducto) {;
            // Se imprimen las celdas con los datos de los productos.
            $pdf->cell(90, 10, utf8_decode($rowProducto['nombre_producto']), 1, 0);
            $pdf->cell(32, 10, $rowProducto['cantidad_pedido'], 1, 0);
            $pdf->cell(30, 10, $rowProducto['total'], 1, 0);
            $pdf->cell(32, 10, utf8_decode($rowProducto['categoria']), 1, 1);
        }
    } else {
        $pdf->cell(0, 10, utf8_decode('No hay productos'), 1, 1);
    }
    //Productos menos vendidos
    $pdf->cell(184, 10, utf8_decode('Menos vendidos: '), 1, 1, 'C', 1);
    // Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
    if ($dataProductos = $producto->readProductosMenosVendidos()) {
        // Se recorren los registros ($dataProductos) fila por fila ($rowProducto).
        foreach ($dataProductos as $rowProducto) {;
            // Se imprimen las celdas con los datos de los productos.
            $pdf->cell(90, 10, utf8_decode($rowProducto['nombre_producto']), 1, 0);
            $pdf->cell(32, 10, $rowProducto['cantidad_pedido'], 1, 0);
            $pdf->cell(30, 10, $rowProducto['total'], 1, 0);
            $pdf->cell(32, 10, utf8_decode($rowProducto['categoria']), 1, 1);
        }
    } else {
        $pdf->cell(0, 10, utf8_decode('No hay productos'), 1, 1);
    }
} else {
    $pdf->cell(0, 10, utf8_decode('No hay productos para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'productos_mas_menos_vendidos.pdf');

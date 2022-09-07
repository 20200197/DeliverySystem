<?php
require_once('../../ayudantes/dashboard_report.php');
require_once('../../modelos/administrar_productos.php');

$pdf = new Report;
$producto = new Producto;

//se inician las variables de sesion
session_start();

//se establece la fuente a utilizar
$pdf->setFont('Times', 'B', 11);

//se verifica que exista una sesion abierta para el vendedor
if (isset($_SESSION['nombre_vendedor'])) {
    //se empieza el reporte con el titulo y nombre del que lo generó
    $pdf->startReport('Top 10 productos segun valoración', $_SESSION['nombre_vendedor']);
    //se establece el color de relleno de las celdas
    $pdf->setFillColor(52, 152, 247);

    //Se verifica que exista una cantidad de estrellas ya seleccionada y que no este vacío
    if (isset($_GET['stars']) and !empty($_GET['stars'])) {

        //encabezados de reporte
        $pdf->setTextColor(255);
        $pdf->cell(20, 10, utf8_decode('N°'), 1, 0, 'C', 1);
        $pdf->cell(135, 10, utf8_decode('Nombre del producto'), 1, 0, '', 1);
        $pdf->cell(30, 10, utf8_decode('Valoración'), 1, 1, 'C', 1);

        $pdf->setTextColor(0);
        $pdf->setFont('Times', '', 11);

        //Verificamos que haya datos para imprimir
        if ($data = $producto->getValoration($_GET['stars'])) {
            //llenamos las celdas con los campos de la base
            foreach ($data as $row) {
                $pdf->cell(20, 10, utf8_decode($row['numero']), 1, 0, '', 0);
                $pdf->cell(135, 10, utf8_decode($row['nombre_producto']), 1, 0, '', 0);
                $pdf->cell(30, 10, utf8_decode($row['valoracion']), 1, 1, '', 0);
            }
        } else {
            $pdf->cell(185, 10, utf8_decode('No hay productos que se muestren con esa valoración'), 1, 1, 'C', 0);
        }
    } else {
        $pdf->cell(185, 10, utf8_decode('Ocurrió un error al obtener las valoraciones'), 0, 1, 'C', 0);
    }
} else {
    header('location: ../../../vista/publico/publico_vendedor/index.html');
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'top_productos_valoracion.pdf');

<?php
require('../../ayudantes/dashboard_report.php');
require('../../modelos/repartidor.php');


// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Sus mejores comentarios por semana','usuario');

// Se instancia el módelo Producto para obtener los datos.
$repartidor = new Repartidor;

// Se verifica si existen registros (comentarios de reoartidor) para mostrar, de lo contrario se imprime un mensaje.
if ($dataRepartidor = $repartidor->readAllComentRepartidor()) {
   
    // Se establece un color de relleno para los encabezados.
    $pdf->SetFillColor(44, 134, 218);
    $pdf->SetTextColor(255, 255, 255);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(110, 10, utf8_decode('Comentario'), 1, 0, 'C', 1);
    $pdf->cell(20, 10, utf8_decode('Calidad'), 1, 0, 'C', 1);
    $pdf->cell(55, 10, utf8_decode('Departamento/Municipio'), 1, 1, 'C', 1);


    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(225);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);
    //Color de letra de datos
    $pdf->SetTextColor(0, 0, 0);
    // Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
    if ($dataRepartidor = $repartidor->readComentarioRepartidorMejoreSemana()) {
        // Se recorren los registros ($dataProductos) fila por fila ($rowProducto).
        foreach ($dataRepartidor as $rowRepartidor) {;
             $x = $pdf->GetX(); /** Obteiene eje x del documento**/
             $y = $pdf->GetY(); /**Obtiene eje y de documento**/

          
            // Se imprimen las celdas con los datos de los productos.
            //$pdf->SetXY($x ,$y); /** Eje y en el que comenzara esta cell**/
            $pdf->multicell(110, 10, utf8_decode($rowRepartidor['comentario']), 1, 0);
            $pdf->SetXY($x + 110,$y); /** Eje y y x en el que comenzara esta cell**/
            $pdf->multicell(20  , 10, $rowRepartidor['valoracion'], 1, 0);
            $pdf->SetXY($x + 130,$y); /** Eje y y xen el que comenzara esta cell**/
            $pdf->multicell(55, 10, utf8_decode($rowRepartidor['nombre_departamento'].', '.$rowRepartidor['nombre_municipio']), 1, 1);
        }
    } else {
        $pdf->cell(0, 10, utf8_decode('No hay comentarios'), 1, 1);
    }

} else {
    $pdf->cell(0, 10, utf8_decode('No hay comentarios para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'productos_mas_menos_vendidos.pdf');

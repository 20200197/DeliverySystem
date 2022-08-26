<?php
require('../../ayudantes/dashboard_report.php');
require('../../modelos/administrar_productos.php');
require('../../modelos/administrar_cliente.php');


// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Top 10 clientes que se le han hecho más entregas','usuario');

// Se instancia el módelo Producto para obtener los datos.
$producto = new Producto;
$cliente = new AdministrarCliente;
// Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
if ($dataProductos = $producto->readAll()) {
    //Comprobamos si tambien hay clientes
    if ($dataClientes = $cliente->obtenerClientes()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(44, 134, 218);
    //Color de texto
    $pdf->setTextColor(255, 255, 255);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(55, 10, utf8_decode('Nombre'), 1, 0, 'C', 1);
    $pdf->cell(55, 10, utf8_decode('Correo'), 1, 0, 'C', 1);
    $pdf->cell(55, 10, utf8_decode('Departamento/Municipio'), 1, 0, 'C', 1);
    $pdf->cell(20, 10, utf8_decode('N entregas'), 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar lo datos.
    $pdf->setFillColor(225);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);
    //Color de letras de datos
    $pdf->SetTextColor(0, 0, 0);
    // Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
    if ($dataProductos = $producto->readTop10ClientesMasEntregas()) {
        // Se recorren los registros ($dataProductos) fila por fila ($rowProducto).
        foreach ($dataProductos as $rowProducto) {;
             $x = $pdf->getX(); /** Obteiene eje x del documento**/
             $y = $pdf->getY(); /**Obtiene eje y de documento**/

          
            // Se imprimen las celdas con los datos de los productos.
            //$pdf->SetXY($x ,$y); /** Eje y en el que comenzara esta cell**/
            $pdf->multicell(55, 10, utf8_decode($rowProducto['nombre_cliente']), 1, 0);
            $pdf->setXY($x + 55,$y); /** Eje y y x en el que comenzara esta cell**/
            $pdf->multicell(55  , 10, $rowProducto['correo_cliente'], 1, 0);
            $pdf->setXY($x + 110,$y); /** Eje y y xen el que comenzara esta cell**/
            $pdf->multicell(55, 10, utf8_decode($rowProducto['nombre_departamento'].', '.$rowProducto['nombre_municipio']), 1, 0);
            $pdf->setXY($x + 165,$y); /** Eje y y x en el que comenzara esta cell**/
            $pdf->multicell(20, 10, ($rowProducto['veces_pedido']), 1, 1);
        }
    } else {
        $pdf->cell(0, 10, utf8_decode('No hay productos'), 1, 1);
    }
 }else {
    $pdf->cell(0, 10, utf8_decode('No hay clientes para mostrar'), 1, 1);
}
} else {
    $pdf->cell(0, 10, utf8_decode('No hay productos para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'productos_mas_menos_vendidos.pdf');

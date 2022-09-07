<?php
require_once('../../ayudantes/dashboard_report.php');
require_once('../../modelos/pedidos_cliente.php');

$pdf = new Report;

$factura = new PedidosCliente;

//Iniciamos variables de sesion
session_start();

$pdf->setFillColor(52, 152, 247);
// Se establece la fuente para los encabezados.
$pdf->setFont('Arial', 'B', 11);
//se verificar que exista un id y que no esté vacío
if (isset($_GET['id']) and !empty($_GET['id'])) {
    $pdf->startReport('Factura #' . $_GET['id'], $_SESSION['usuario_cliente']);
    $pdf->setTitle('Factura');

    if (isset($_SESSION['id_cliente'])) {
        //se pone setea el id de la url
        if ($factura->setId($_GET['id'])) {
            //Se establece el color de relleno y la fuente
            $pdf->setFillColor(52, 152, 247);
            $pdf->setFont('Arial', '', 11);
            $pdf->setTextColor(255);
            $pdf->cell(28, 10, utf8_decode("DUI"), 1, 0, 'C', 1);
            $pdf->cell(52, 10, utf8_decode("NOMBRE"), 1, 0, 'C', 1);
            $pdf->cell(46, 10, utf8_decode("TELÉFONO"), 1, 0, 'C', 1);
            $pdf->cell(59, 10, utf8_decode("CORREO"), 1, 1, 'C', 1);

            //Encabezados de factura
            $pdf->SetTextColor(0);

            //Se verifica que haya una sesion abierta

            //se leen los datos de la factura y se guardan en una variable
            if ($data = $factura->readDetail()) {
                //se imprimen los datos personales y de contacto en las celdas
                $pdf->cell(28, 10, utf8_decode($factura->getDui()), 1, 0);
                $pdf->cell(52, 10, utf8_decode($factura->getNombre() . ' ' . $factura->getApellido()), 1, 0);
                $pdf->cell(46, 10, utf8_decode($factura->getTelefono()), 1, 0);
                $pdf->cell(59, 10, utf8_decode($factura->getCorreo()), 1, 1);

                //Salto de linea
                $pdf->ln(10);
                //Encabezado para listar datos de direccion
                $pdf->setFillColor(52, 152, 247);
                $pdf->setFont('Arial', 'B', 11);
                $pdf->setTextColor(255);
                $pdf->cell(143, 10, utf8_decode('DIRECCIÓN'), 1, 0, 'C', 1);
                $pdf->cell(42, 10, utf8_decode('FECHA DE COMPRA'), 1, 1, 'C', 1);

                //se imprimen los datos de direccion y fecha
                $pdf->setFont('Arial', '', 11);
                $pdf->setTextColor(0);
                $pdf->cell(143, 10, utf8_decode($factura->getDireccion()), 1, 0);
                $pdf->cell(42, 10, utf8_decode($factura->getFecha()), 1, 1);

                //Encabezado para el detalle
                $pdf->ln(10);
                $pdf->setFillColor(52, 152, 247);
                $pdf->setFont('Arial', 'B', 11);
                $pdf->setTextColor(255);
                $pdf->cell(15, 10, utf8_decode('CANT'), 1, 0, 'C', 1);
                $pdf->cell(128, 10, utf8_decode('PRODUCTO'), 1, 0, 'C', 1);
                $pdf->cell(16, 10, utf8_decode('P/U'), 1, 0, 'C', 1);
                $pdf->cell(26, 10, utf8_decode('SUBTOTAL'), 1, 1, 'C', 1);

                //Se recorre el detalle fila por fila y se llena con los datos obtenidos
                foreach ($data as $row) {
                    $pdf->setFont('Arial', '', 11);
                    $pdf->setTextColor(0);
                    $pdf->cell(15, 10, utf8_decode($row['cantidad_pedido']), 1, 0, 'C');
                    $pdf->cell(128, 10, utf8_decode($row['nombre_producto']), 1, 0, '');
                    $pdf->cell(16, 10, utf8_decode('$' . $row['precio']), 1, 0, 'C');
                    $pdf->cell(26, 10, utf8_decode('$' . $row['subtotal_detalle']), 1, 1, 'C');
                }
                $pdf->setFont('Arial', '', 11);
                $pdf->cell(143, 10, utf8_decode('TOTAL'), 1, 0, 'R');
                $pdf->cell(42, 10, utf8_decode('$' . $factura->getTotal()), 1, 1, 'C');
            } else {
                $pdf->cell(185, 10, utf8_decode("Error: No se encuentra la factura"), 1, 0, 'C', 0);
            }
        } else {
            $pdf->cell(185, 10, utf8_decode("Recurso no disponible"), 1, 0, 'C', 0);
        }
    } else {
        header('location: ../../../vista/publico/publico_cliente/index.html');
    }
    $pdf->output('I', 'Factura #' . $_GET['id'] . '.pdf');
} else {
    header('location: ../../../vista/publico/publico_cliente/pedidos_cliente.html');
}

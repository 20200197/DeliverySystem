<?php
require('../../ayudantes/dashboard_report.php');
require('../../modelos/estadistica_vendedor.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

//Se obtienen y sanean los datos obtenidos
$_GET = $estadistica->validateForm($_GET);

$arreglo = explode(",", $_GET['rangos']);

// Se instancia el módelo de estadística para obtener los datos.
$estadistica = new EstadisticaVendedor;

//Se reinicia la sesion
session_start();

//Se revisa si hay una sesión 
if (isset($_SESSION['id_vendedor'])) {

    // Se inicia el reporte con el encabezado del documento.
    $pdf->startReport('Compras por cliente', $_SESSION['nombre_vendedor']);

    if (!$estadistica->setInicial($arreglo[0])) {
        $pdf->cell(0, 10, utf8_decode('La cantidad inicial es incorrecta'), 1, 1);
    } elseif (!$estadistica->setFinal($arreglo[1])) {

        $pdf->cell(0, 10, utf8_decode('La cantidad final es incorrecta'), 1, 1);
    } elseif (!$estadistica->setIdVendedor(2)) {

        $pdf->cell(0, 10, utf8_decode('No se ha encontrado la sesión de tu cuenta'), 1, 1);
    } elseif ($datos = $estadistica->facturasClientes()) {
        /*------Programación del documento PDF------*/

        //Estilos para los encabezados

        // Se establece un color de relleno para los encabezados.
        $pdf->SetFillColor(44, 134, 218);
        //Color de texto
        $pdf->SetTextColor(255, 255, 255);
        // Se establece la fuente para los encabezados.
        $pdf->setFont('Times', 'B', 11);
        // Se imprimen las celdas con los encabezados.
        /**
         * El orden de los datos son los siguientes
         *  1- Ancho de la celda
         *  2- Alto de la celda
         *  3- Titulo que se le colocará en el code UTF-8
         *  4- Si contendrá borde o no (1 o 0)
         *  5- Posición de la celda, es decir en donde se colocará
         *      0- Colocar a la derecha de la que tiene antes de ella
         *      1- Salto de línea
         *      2- Debajo de la anterior
         *  6- Alineación del texto
         *      L- Alineación a la izquiera (Defecto)
         *      C- Centrado
         *      R- Alinación a la derecha
         *  7- Verifica si el color de la celda se pintará o no (true o false)
         */
        $pdf->cell(81, 10, utf8_decode('Cliente'), 1, 0, 'C', 1);
        $pdf->cell(35, 10, utf8_decode('Mínimo ($)'), 1, 0, 'C', 1);
        $pdf->cell(35, 10, utf8_decode('Máximo ($)'), 1, 0, 'C', 1);
        $pdf->cell(35, 10, utf8_decode('Promedio ($)'), 1, 1, 'C', 1);

        //Se establecen los estilos para los datos

        // Se establece la fuente para los datos de los productos.
        $pdf->setFont('Times', '', 11);
        //Color de letras de datos
        $pdf->SetTextColor(0, 0, 0);
        //Se recorren los registros que se obtuvieron fila por fila para llenar las filas
        foreach ($datos as $fila) {
            // Se imprimen las celdas con los datos de los productos.
            $pdf->cell(81, 10, utf8_decode($fila['nombre']), 1, 0);
            $pdf->cell(35, 10, utf8_decode('$' . $fila['minimo']), 1, 0);
            $pdf->cell(35, 10, utf8_decode('$' . $fila['maximo']), 1, 0);
            $pdf->cell(35, 10, utf8_decode('$' . $fila['promedio']), 1, 1);
        }
    } elseif (Database::getException()) {
        $pdf->cell(0, 10, utf8_decode('Error en la base de datos: ' + Database::getException()), 1, 1);
    } else {
        $pdf->cell(0, 10, utf8_decode('No se encontraron clientes con compras entre los rangos especificados'), 1, 1);
    }

    // Se envía el documento al navegador y se llama al método footer()
    $pdf->output('I', 'Compras_cliente.pdf');

} else {
    echo utf8_decode("No se puede mostrar el reporte sin haber iniciado sesión");
}


/*
// Se verifica si existen registros (categorías) para mostrar, de lo contrario se imprime un mensaje.
if ($dataCategorias = $categoria->readAll()) {
    

    

    // Se recorren los registros ($dataCategorias) fila por fila ($rowCategoria).
    foreach ($dataCategorias as $rowCategoria) {
        // Se imprime una celda con el nombre de la categoría.
        $pdf->cell(0, 10, utf8_decode('Categoría: ' . $rowCategoria['nombre_categoria']), 1, 1, 'C', 1);
        // Se instancia el módelo Productos para procesar los datos.
        $producto = new Productos;
        // Se establece la categoría para obtener sus productos, de lo contrario se imprime un mensaje de error.
        if ($producto->setCategoria($rowCategoria['id_categoria'])) {
            // Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->productosCategoria()) {
                // Se recorren los registros ($dataProductos) fila por fila ($rowProducto).
                foreach ($dataProductos as $rowProducto) {
                    ($rowProducto['estado_producto']) ? $estado = 'Activo' : $estado = 'Inactivo';
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(126, 10, utf8_decode($rowProducto['nombre_producto']), 1, 0);
                    $pdf->cell(30, 10, $rowProducto['precio_producto'], 1, 0);
                    $pdf->cell(30, 10, $estado, 1, 1);
                }
            } else {
                $pdf->cell(0, 10, utf8_decode('No hay productos para esta categoría'), 1, 1);
            }
        } else {
            $pdf->cell(0, 10, utf8_decode('Categoría incorrecta o inexistente'), 1, 1);
        }
    }
} else {
    $pdf->cell(0, 10, utf8_decode('No hay categorías para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'productos.pdf');

*/
<?php
require('../../ayudantes/database.php');
require('../../ayudantes/validator.php');
require('../../librerias/fpdf182/fpdf.php');

/**
 *   Clase para definir las plantillas de los reportes del sitio privado. Para más información http://www.fpdf.org/
 */
class Report extends FPDF
{
    // Propiedad para guardar el título del reporte.
    private $title = null;

    /*
    *   Método para iniciar el reporte con el encabezado del documento.
    *
    *   Parámetros: $title (título del reporte).
    *
    *   Retorno: ninguno.
    */
    public function startReport($title,$usuario)
    {
        // Se establece la zona horaria a utilizar durante la ejecución del reporte.
        ini_set('date.timezone', 'America/El_Salvador');
        // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en los reportes.
        // session_start();
        // Se verifica si un administrador ha iniciado sesión para generar el documento, de lo contrario se direcciona a main.php
        // if (isset($_SESSION['id_usuario'])) {
        // Se asigna el título del documento a la propiedad de la clase.
        $this->title = $title;
        // Se asigna el usuario que genero el reporte a la propiedad de la clase.
        $this->usuario = $usuario;
        // Se establece el título del documento (true = utf-8).
        $this->setTitle('Dashboard - Reporte', true);
        // Se establecen los margenes del documento (izquierdo, superior y derecho).
        $this->setMargins(15, 15, 15);
        // Se añade una nueva página al documento (orientación vertical y formato carta) y se llama al método header()
        $this->addPage('p', 'letter');
        // Se define un alias para el número total de páginas que se muestra en el pie del documento.
        $this->aliasNbPages();
        //    } else {
        //      header('location: ../../../views/dashboard/index.php');
        // }
    }

    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del encabezado de los reportes.
    *   Se llama automáticamente en el método addPage()
    */
    public function header()
    {
        // Se establece el logo.
        $this->image('../../imagenes/logo_delivery_system.png', 75, 15, 70);
        //Salto de linea para poner titulo
        $this->ln(12);
        // Se ubica el título.
        //$this->cell(166, 10, utf8_decode($this->title), 0, 1, 'C',1);
        $this->SetFillColor(52, 152, 247);
        $this->SetTextColor(255, 255, 255);
        $this->setFont('Arial', 'B', 15);
        $this->cell(185, 10, utf8_decode($this->title), 0, 1, 'C', 1);
        // Se ubica la fecha y hora del servidor.
        //$this->cell(20);
        $this->setFont('Arial', '', 10);
        $this->SetFillColor(44, 134, 218);
        $this->cell(185, 10, 'Fecha/Hora: ' . date('d-m-Y H:i:s'), 0, 1, 'C', 1);
        //Color de texto de la siguientes cell
        $this->SetTextColor(0, 0, 0);
        //Salto de linea
        $this->ln(2);
        //Agregamos el usuario
        $this->cell(185, 10, 'Fue solicitado por: ' . ($this->usuario), 1, 1, 'C', 0);
        // Se agrega un salto de línea para mostrar el contenido principal del documento.
        $this->ln(10);
    }

    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del pie de los reportes.
    *   Se llama automáticamente en el método output()
    */
    public function footer()
    {
        // Se establece la posición para el número de página (a 15 milimetros del final).
        $this->setY(-15);
        // Se establece la fuente para el número de página.
        $this->setFont('Arial', 'I', 8);
        // Se imprime una celda con el número de página.
        $this->cell(0, 10, utf8_decode('Página ') . $this->pageNo() . '/{nb}', 0, 0, 'C');
    }
}

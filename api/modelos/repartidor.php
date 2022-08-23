<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Repartidor extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre = null;
    private $apellido = null;
    private $dui = null;
    private $correo = null;
    private $telefono = null;
    private $usuario = null;
    private $clave = null;
    private $solvencia = null;
    private $ruta_solvencia = '../imagenes/repartidor/foto_solvencia/';
    private $antecedentes = null;
    private $ruta_antecedente = '../imagenes/repartidor/foto_antecedente/';
    private $direccion = null;
    private $placa = null;
    private $descripcion = null;
    private $foto_placa = null;
    private $foto_vehiculo = null;
    private $fecha_registro = null;
    private $estado = null;
    private $foto = null;
    private $ruta_placa = '../imagenes/repartidor/foto_placa/';
    private $ruta_vehiculo = '../imagenes/repartidor/foto_vehiculo/';
    private $ruta_foto = '../imagenes/repartidor/foto_repartidor/';
    private $buscador = null;

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

    public function setIdentificador($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 3, 30)) {
            $this->nombre = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setApellido($value)
    {
        if ($this->validateAlphabetic($value, 3, 30)) {
            $this->apellido = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDui($value)
    {
        if ($this->validateDUI(($value))) {
            $this->dui = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setTelefono($value)
    {
        if ($this->validatePhone($value)) {
            $this->telefono = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setUsuario($value)
    {
        if ($this->validateAlphanumeric($value, 1, 65)) {
            $this->usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setClave($value)
    {
        if ($this->validatePassword($value)) {
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setSolvencia($file)
    {
        if ($this->validateImageFile($file, 8000, 8000)) {
            $this->solvencia = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setAntecedentes($file)
    {
        if ($this->validateImageFile($file, 5000, 5000)) {
            $this->antecedentes = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setDireccion($value)
    {
        if ($this->validateDirection($value)) {
            $this->direccion = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setDescripcion($value)
    {
        if ($this->validateAlphanumeric($value, 3, 500)) {
            $this->descripcion = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setEstado($value)
    {
        if ($this->validateBoolean($value)) {
            $this->estado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setPlaca($value)
    {
        if ($this->validateAlphanumeric($value, 7, 7)) {
            $this->placa = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFotoPlaca($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->foto_placa = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setFotoVehiculo($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->foto_vehiculo = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setFechaRegistro($date)
    {
        if ($this->validateDate($date)) {
            $this->fecha_registro = $date;
            return true;
        } else {
            return false;
        }
    }

    public function setFoto($file)
    {
        if ($this->validateImageFile($file, 8000, 8000)) {
            $this->foto = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setCoordenadas($cords)
    {
        if (isset($cords)) {
            $this->coordenadas = $cords;
            return true;
        } else {
            return false;
        }
    }

    public function setBuscador($value)
    {
        if ($this->validateString($value, 0, 50)) {
            $this->buscador = '%' . $value . '%';
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->id;
    }

    public function getRutaAntecedente()
    {
        return $this->ruta_antecedente;
    }

    public function getRutaSolvencia()
    {
        return $this->ruta_solvencia;
    }

    public function getRutaFoto()
    {
        return $this->ruta_foto;
    }

    public function getAntecedente()
    {
        return $this->antecedentes;
    }

    public function getSolvencia()
    {
        return $this->solvencia;
    }

    public function getFoto()
    {
        return $this->foto;
    }

    public function getPlaca()
    {
        return $this->placa;
    }

    public function getDescripcion()
    {
        return $this->descripcion;
    }

    public function getFotoPlaca()
    {
        return $this->foto_placa;
    }

    public function getFotoVehiculo()
    {
        return $this->foto_vehiculo;
    }

    public function getFechaRegistro()
    {
        return $this->fecha_registro;
    }

    public function getRutaPlaca()
    {
        return $this->ruta_placa;
    }

    public function getRutaVehiculo()
    {
        return $this->ruta_vehiculo;
    }

    public function getCorreo()
    {
        return $this->correo;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    public function getClave()
    {
        return $this->clave;
    }


    public function getUsuario()
    {
        return $this->usuario;
    }

    public function getDui()
    {
        return $this->dui;
    }

    //Cambios Bonilla1
    public function getEstado()
    {
        return $this->estado;
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    //Función para confirmar contraseña en el login
    public function checkPassword($password)
    {
        $sql = 'SELECT clave_repartidor FROM repartidor WHERE id_repartidor = ?';
        $params = array(2); //creo que es SESION[id_reprtidor] sino le dejo this id
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_repartidor'])) {
            return true;
        } else {
            return false;
        }
    }
    //Función para obtener el perfil del repartidor

    public function getProfile()
    {
        $sql = "SELECT id_repartidor,nombre_repartidor, apellido_repartidor,dui_repartidor,correo_repartidor,usuario_repartidor,telefono_repartidor,clave_repartidor,solvencia_pnc,antecedente_penal,direccion_domicilio,placa_vehiculo,foto_placa_vehiculo,foto_repartidor,foto_vehiculo,status_repartidor,fecha_registro
        from repartidor
        where id_repartidor = ?";
        $params = array(2); //SESSION[id_repartidor]
        return Database::getRow($sql, $params);
    }



    public function updatePerfil($foto, $solvencia, $antecedente, $vehiculo, $placa)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->foto) ? $this->deleteFile($this->getRutaFoto(), $foto) : $this->foto = $foto;
        ($this->solvencia) ? $this->deleteFile($this->getRutaSolvencia(), $solvencia) : $this->solvencia = $solvencia;
        ($this->antecedentes) ? $this->deleteFile($this->getRutaAntecedente(), $antecedente) : $this->antecedentes = $antecedente;
        ($this->foto_vehiculo) ? $this->deleteFile($this->getRutaVehiculo(), $vehiculo) : $this->foto_vehiculo = $vehiculo;
        ($this->foto_placa) ? $this->deleteFile($this->getRutaPlaca(), $placa) : $this->foto_placa = $placa;


        $sql = 'UPDATE repartidor 
        SET nombre_repartidor = ?, apellido_repartidor = ?,correo_repartidor = ?,usuario_repartidor = ?,telefono_repartidor = ?,solvencia_pnc = ?,antecedente_penal = ?,direccion_domicilio = ?,placa_vehiculo = ?,foto_placa_vehiculo = ?,foto_repartidor = ?,foto_vehiculo = ?
        WHERE id_repartidor=?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->usuario, $this->telefono, $this->solvencia, $this->antecedentes, $this->direccion, $this->placa, $this->foto_placa, $this->foto, $this->foto_vehiculo, 2); //SESSION[id_repartidor]
        return Database::executeRow($sql, $params);
    }

    public function updatePerfilFoto($foto)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->foto) ? $this->deleteFile($this->getRutaFoto(), $foto) : $this->foto = $foto;


        $sql = 'UPDATE repartidor 
        SET nombre_repartidor = ?, apellido_repartidor = ?,correo_repartidor = ?,usuario_repartidor = ?,telefono_repartidor = ?,direccion_domicilio = ?,placa_vehiculo = ?,foto_repartidor = ?
        WHERE id_repartidor=?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->usuario, $this->telefono, $this->direccion, $this->placa, $this->foto, 2); //SESSION[id_repartidor]
        return Database::executeRow($sql, $params);
    }

    public function updatePerfilSolvencia($solvencia)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.

        ($this->solvencia) ? $this->deleteFile($this->getRutaSolvencia(), $solvencia) : $this->solvencia = $solvencia;

        $sql = 'UPDATE repartidor 
        SET nombre_repartidor = ?, apellido_repartidor = ?,correo_repartidor = ?,usuario_repartidor = ?,telefono_repartidor = ?,solvencia_pnc = ?,direccion_domicilio = ?,placa_vehiculo = ?
        WHERE id_repartidor=?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->usuario, $this->telefono, $this->solvencia, $this->direccion, $this->placa, 2); //SESSION[id_repartidor]
        return Database::executeRow($sql, $params);
    }

    public function updatePerfilAntecedente($antecedente)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.

        ($this->antecedentes) ? $this->deleteFile($this->getRutaAntecedente(), $antecedente) : $this->antecedentes = $antecedente;

        $sql = 'UPDATE repartidor 
        SET nombre_repartidor = ?, apellido_repartidor = ?,correo_repartidor = ?,usuario_repartidor = ?,telefono_repartidor = ?,antecedente_penal = ?,direccion_domicilio = ?,placa_vehiculo = ?
        WHERE id_repartidor=?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->usuario, $this->telefono, $this->antecedentes, $this->direccion, $this->placa, 2); //SESSION[id_repartidor]
        return Database::executeRow($sql, $params);
    }

    public function updatePerfilVehiculo($vehiculo)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.

        ($this->foto_vehiculo) ? $this->deleteFile($this->getRutaVehiculo(), $vehiculo) : $this->foto_vehiculo = $vehiculo;

        $sql = 'UPDATE repartidor 
        SET nombre_repartidor = ?, apellido_repartidor = ?,correo_repartidor = ?,usuario_repartidor = ?,telefono_repartidor = ?,direccion_domicilio = ?,placa_vehiculo = ?,foto_vehiculo = ?
        WHERE id_repartidor=?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->usuario, $this->telefono,  $this->direccion, $this->placa, $this->foto_vehiculo, 2); //SESSION[id_repartidor]
        return Database::executeRow($sql, $params);
    }

    public function updatePerfilPlaca($placa)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->foto_placa) ? $this->deleteFile($this->getRutaPlaca(), $placa) : $this->foto_placa = $placa;


        $sql = 'UPDATE repartidor 
        SET nombre_repartidor = ?, apellido_repartidor = ?,correo_repartidor = ?,usuario_repartidor = ?,telefono_repartidor = ?,direccion_domicilio = ?,placa_vehiculo = ?,foto_placa_vehiculo = ?
        WHERE id_repartidor=?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->usuario, $this->telefono, $this->direccion, $this->placa, $this->foto_placa, 2); //SESSION[id_repartidor]
        return Database::executeRow($sql, $params);
    }
    //Función para cambiar contraseña
    public function changePassword()
    {
        $sql = 'UPDATE repartidor SET clave_repartidor = ? WHERE id_repartidor = ?';
        $params = array($this->clave, 2); //SESSION[id_repartidor]
        return Database::executeRow($sql, $params);
    }

    //Función que valida para que no se repitan datos
    //$column es la columna sql que se validara, dui, telefono, etc
    //$data el dato obtenido por get en Api
    //Función que valida que no se repita el campo en update, donde se evaluan los otros duis menos el seleccionado por si le da aceptar y no cambia nada
    public function readD($column, $data)
    {
        $sql = "SELECT * from repartidor where $column=?  except select * from repartidor where id_repartidor = ?";
        $params = array($data, 2); //SESSION[id_repartidor]

        return Database::getRow($sql, $params);
    }

    //Función para leer un registro
    public function readOne()
    {
        $sql = 'SELECT id_repartidor,nombre_repartidor, apellido_repartidor,dui_repartidor,correo_repartidor,usuario_repartidor,telefono_repartidor,clave_repartidor,solvencia_pnc,antecedente_penal,direccion_domicilio,placa_vehiculo,foto_placa_vehiculo,foto_repartidor,foto_vehiculo,status_repartidor,fecha_registro
                FROM repartidor
                WHERE id_repartidor = ?';
        $params = array(2); //SESSION[id_repartidor]
        return Database::getRow($sql, $params);
    }

    //Cambios Bonilla1
    public function checkUser()
    {
        $sql = 'SELECT id_repartidor, id_status_repartidor, nombre_repartidor, apellido_repartidor, usuario_repartidor
                FROM repartidor
                WHERE usuario_repartidor = ?';
        $params = array($this->usuario);
        if ($data = Database::getRow($sql, $params)) {
            $this->id = $data['id_repartidor'];
            $this->estado = $data['id_status_repartidor'];
            $this->nombre = $data['nombre_repartidor'];
            $this->apellido = $data['apellido_repartidor'];
            $this->usuario = $data['usuario_repartidor'];
            return true;
        } else {
            return false;
        }
    }

    //Bonilla1 modificaciones
    public function requestRep()
    {
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');

        $this->estado = 1;
        $sql = 'INSERT INTO repartidor(nombre_repartidor, apellido_repartidor, dui_repartidor, correo_repartidor, usuario_repartidor, telefono_repartidor, clave_repartidor, solvencia_pnc, antecedente_penal, direccion_domicilio, placa_vehiculo, foto_placa_vehiculo, foto_repartidor, foto_vehiculo, id_status_repartidor, fecha_registro)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->usuario, $this->telefono, $this->clave, $this->solvencia, $this->antecedentes, $this->direccion, $this->placa, $this->foto_placa, $this->foto, $this->foto_vehiculo, $this->estado, $date);

        return Database::executeRow($sql, $params);
    }
    
    //Cambios Bonilla1
    //Metodo para verificar la contraseña
    public function checkPass($pass)
    {
        $sql = 'SELECT clave_repartidor, id_repartidor
                FROM repartidor
                WHERE id_repartidor = ?';
        $params = array($this->id);

        if (!$data = Database::getRow($sql, $params)) {
            return false;
        } elseif (!password_verify($pass, $data['clave_repartidor'])) {
            return false;
        } else {
            return true;
        }
    }
    /**Reportes */
    public function readComentarioRepartidorMejoreSemana()
    {
        $sql = "  SELECT comentario, valoracion,departamento.nombre_departamento, municipio.nombre_municipio
                  FROM comentario_repartidor
                  inner join factura factura using(id_factura)
                  INNER JOIN direccion direccion ON direccion.id_direccion = factura.id_direccion
                  inner join municipio municipio on direccion.id_municipio = municipio.id_municipio
                  inner join departamento departamento on municipio.id_departamento = departamento.id_departamento
                  where valoracion >= 4 and (factura.fecha_compra >= current_date or factura.fecha_compra >= current_date -7 ) and id_repartidor = ?
                  order by valoracion";
        $params = array(2); //$SESSION[id_repartidor]
        return Database::getRows($sql, $params);
    }

    //Función para leer todos los datos
    public function readAllComentRepartidor()
    {
        $sql = "SELECT id_comentario_repartidor, valoracion, comentario
		from comentario_repartidor comentario_repartidor
        order by valoracion";
        $params = null;
        return Database::getRows($sql, $params);
    }

    /** Producto mas vendidos por departamento **/
    public function readProductosMasVendidosDepartamento($nombre_departamento)
    {
        $sql = "SELECT nombre_producto, nombre_departamento, cantidad_pedido
            from detalle_factura 
            inner join factura using(id_factura)
            inner join producto using(id_producto)
            inner join direccion using(id_direccion)
            inner join municipio using(id_municipio)
            inner join departamento using(id_departamento)
            where nombre_departamento = ?
            order by cantidad_pedido desc limit 5";
        $params = array($nombre_departamento);
        return Database::getRows($sql, $params);
    }


    public function readAllDepartamento()
    {
        $sql = " SELECT id_departamento, nombre_departamento
        from departamento
        order by nombre_departamento";
        $params = null;
        return Database::getRows($sql, $params);
    }
}

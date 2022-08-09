<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Distribuidor extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre_repartidor = null;
    private $apellido_repartidor = null;
    private $dui_repartidor = null;
    private $correo_repartidor = null;
    private $usuario_repartidor = null;
    private $telefono_repartidor = null;
    private $clave_repatidor = null;
    private $solvencia_pnc = null;
    private $antecedente_penal = null;
    private $direccion_domicilio = null;
    private $placa_vehiculo = null;
    private $foto_placa_vehiculo = null;
    private $foto_repartidor = null;
    private $foto_vehiculo = null;
    private $status_repartidor = null;
    private $fecha_registro = null;
    private $id_admin = null;

    private $ruta = '../imagenes/distribuidor/';

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombreRepartidor($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->nombre_repartidor = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->nombre_repartidor = null;
            return true;
        }
    }

    public function setApellidoRepartidor($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->apellido_repartidor = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->apellido_repartidor  = null;
            return true;
        }
    }

    public function setDuiRepartidor($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->dui_repartidor = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreoRepartidor($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->correo_repartidor = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->correo_repartidor  = null;
            return true;
        }
    }

    public function setUsuarioRepartidor($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->usuario_repartidor = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->usuario_repartidor  = null;
            return true;
        }
    }

    public function setTelefonoRepartidor($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->telefono_repartidor = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setClaveRepatidor($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->clave_repatidor  = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->clave_repatidor  = null;
            return true;
        }
    }

    public function setSolvenciaPnc($value)
    {
        if ($this->validateImageFile($value, 500, 500)) {
            $this->solvencia_pnc = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }
    public function setAntecedentePenal($value)
    {
        if ($this->validateImageFile($value, 500, 500)) {
            $this->antecedente_penal = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setDireccionDomicilio($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->direccion_domicilio = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->direccion_domicilio = null;
            return true;
        }
    }

    public function setPlacaVehiculo($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->placa_vehiculo = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setFotoPlacaVehiculo($value)
    {
        if ($this->validateImageFile($value, 500, 500)) {
            $this->foto_placa_vehiculo = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setFotoRepartidor($value)
    {
        if ($this->validateImageFile($value, 500, 500)) {
            $this->foto_repartidor = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setFotoVehiculo($value)
    {
        if ($this->validateImageFile($value, 500, 500)) {
            $this->foto_vehiculo = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setStatusRepartidor($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 50)) {
                $this->status_repartidor = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->status_repartidor = null;
            return true;
        }
    }

    public function setFechaRegistro($date)
    {
        if($this->validateDate($date)){
            $this->fecha_registro = $date;
            return true;
        }else{
            return false;
        }
    }


    public function setIdAdmin($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_admin = $value;
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getId($value)
    {
        return $this-> id;
    }

    public function getNombreRepartidor($value)
    {

        return $this->nombre_repartidor;

    }

    public function getApellidoRepartidor($value)
    {
       
        return $this->apellido_repartidor;

    }

    public function getDuiRepartidor($value)
    {
        
        return $this->dui_repartidor;
        
    }

    public function getCorreoRepartidor($value)
    {
    
        return  $this->correo_repartidor;
    
    }

    public function getUsuarioRepartidor($value)
    {
    
        return $this->usuario_repartidor;
    
    }

    public function getTelefonoRepartidor($value)
    {
        
        return $this->telefono_repartidorlse;
    
    }

    public function getClaveRepatidor($value)
    {
        
        return $this->clave_repatidor;
        
    }

    public function getSolvenciaPnc($value)
    {
        
        return $this->solvencia_pnc;
        
    }
    public function getAntecedentePenal($value)
    {
        
        return $this->antecedente_penal;
        
    }

    public function getDireccionDomicilio($value)
    {
        
        return $this->direccion_domicilio;
        
    }

    public function getPlacaVehiculo($value)
    {
        
        return $this->placa_vehiculo;
        
    }

    public function getFotoPlacaVehiculo($value)
    {
        
        return $this->foto_placa_vehiculo;
    
    }

    public function getFotoRepartidor($value)
    {
        
        return $this->foto_repartidor;
        
    }

    public function getFotoVehiculo($value)
    {
       
        return $this->foto_vehiculo;
        
    }

    public function getStatusRepartidor($value)
    {
        
        return $this->status_repartidor;
          
    }

    public function getFechaRegistro($value)
    {
       
        return  $this->fecha_registro;
        
    }


    public function getIdAdmin($value)
    {
       
        return $this->id_admin;
        
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    public function searchRows($value)
    {
        $sql = 'SELECT id_repartidor, nombre_repartidor,apellido_repartidor,dui_repartidor,correo_repartidor,usuario_repartidor,telefono_repartidor,clave_repartidor,solvencia_pnc,antecedente_penal,direccion_domicilio,placa_vehiculo,foto_placa_vehiculo,foto_repartidor,foto_vehiculo,status_repartidor,fecha_registro,id_admin
                FROM repartidor
                WHERE  nombre_repartidor ILIKE ? OR apellido_repartidor ILIKE ? OR dui_repartidor ILIKE ? OR correo_repartidor ILIKE ? OR usuario_repartidor ILIKE ?
                ORDER BY nombre_repartidor';
        $params = array("%$value%", "%$value%", "%$value%", "%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    //Función para crear filas
    public function createRow()
    {
        $sql = 'INSERT INTO marca(nombre_marca)
                VALUES(?)';
        $params = array($this->nombre_marca);
        return Database::executeRow($sql, $params);
    }

    //Función para leer todos los datos
    public function readAll()
    {
        $sql = 'SELECT id_repartidor, nombre_repartidor,apellido_repartidor,dui_repartidor,correo_repartidor,usuario_repartidor,telefono_repartidor,clave_repartidor,solvencia_pnc,antecedente_penal,direccion_domicilio,placa_vehiculo,foto_placa_vehiculo,foto_repartidor,foto_vehiculo,status_repartidor,fecha_registro,id_admin
                FROM repartidor
                ORDER BY nombre_repartidor';
        return Database::getRows($sql, null);
    }


    public function readOne()
    {
        $sql = 'SELECT id_repartidor, nombre_repartidor,apellido_repartidor,dui_repartidor,correo_repartidor,usuario_repartidor,telefono_repartidor,clave_repartidor,solvencia_pnc,antecedente_penal,direccion_domicilio,placa_vehiculo,foto_placa_vehiculo,foto_repartidor,foto_vehiculo,status_repartidor,fecha_registro,id_admin
                FROM repartidor
                WHERE id_repartidor = ?
                ORDER BY nombre_repartidor';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Función para actualizar fila
   


    //Función para eliminar fila
    public function deleteRow()
    {
        $sql = 'DELETE FROM nombre_marca
                WHERE id_marca= ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function getStatus()
    {
        $sql = 'SELECT status_repartidor FROM repartidor WHERE id_repartidor = ?';
        $params = array($this->id);

        if ($data = Database::getRow($sql, $params)) {
            $this->status_repartidor = $data['status_repartidor'];
            return true;
        } else {
            return false;
        }
    }

    public function changeStatus()
    {
        $sql = 'UPDATE repartidor SET status_repartidor = ? WHERE id_repartidor = ?';

        if ($this->status_repartidor) {
            $params = array(0, $this->id);
        } else {
            $params = array(1, $this->id);
        }

        return Database::executeRow($sql, $params);
    }
}

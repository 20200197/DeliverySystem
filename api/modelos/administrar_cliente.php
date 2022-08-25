<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class AdministrarCliente extends Validator
{
    // Declaración de atributos (propiedades).
    private $identificador = null;
    private $estado = null;
    private $buscador = null;
    //Direcciones
    private $id_direccion = null;
    private $descripcion_direccion = null;
    private $punto_referencia = null;
    private $coordenadas = null;
    private $id_municipio = null;

    //Grafico
    private $total = null;
    private $nombre = null;
    private $apellido = null;
    private $correo = null;
    private $dui = null;



    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

    public function setIdentificador($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->identificador = $value;
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

    public function setBuscador($value)
    {
        if ($this->validateString($value, 0, 50)) {
            $this->buscador = '%' . $value . '%';
            return true;
        } else {
            return false;
        }
    }

    public function setDescripcionDireccion($valor)
    {
        if ($valor) {
            if ($this->validateString($valor, 1, 250)) {
                $this->descripcion_direccion = $valor;
                return true;
            } else {
                return false;
            }
        } else {
            $this->descripcion_direccion = null;
            return true;
        }
    }

    public function setPuntoReferencia($valor)
    {
        if ($valor) {
            if ($this->validateString($valor, 1, 50)) {
                $this->punto_referencia = $valor;
                return true;
            } else {
                return false;
            }
        } else {
            $this->punto_referencia = null;
            return true;
        }
    }

    public function setCoordenadas($valor)
    {
        if ($valor) {
            if ($this->validateString($valor, 1, 250)) {
                $this->coordenadas = $valor;
                return true;
            } else {
                return false;
            }
        } else {
            $this->coordenadas = null;
            return true;
        }
    }

    public function setIdMunicipio($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_municipio = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setIdDireccion($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_direccion = $value;
            return true;
        } else {
            return false;
        }
    }


    public function setTotal($value)
    {
        if ($this->validateMoney($value)) {
            $this->total = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->nombre = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setApellido($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->apellido = $value;
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

    public function setDUI($value)
    {
        if ($this->validateDUI($value)) {
            $this->dui = $value;
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getIdentificador()
    {
        return $this->identificador;
    }

    public function getEstado()
    {
        return $this->estado;
    }

    public function getDescripcionDireccion()
    {
        return $this->descripcion_direccion;
    }

    public function getPuntoReferencia()
    {
        return $this->punto_referencia;
    }

    public function getCoordenadas()
    {
        return $this->coordenadas;
    }

    public function getIdMunicipio()
    {
        return $this->id_municipio;
    }

    public function getIdDireccion()
    {
        return $this->id_direccion;
    }


    public function getTotal()
    {
        return $this->total;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getApellido()
    {
        return $this->apellido;
    }

    public function getCorreo()
    {
        return $this->correo;
    }

    public function getDUI()
    {
        return $this->dui;
    }


    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    //Función para obtener todos los datos de los cliente

    public function obtenerClientes()
    {
        $sql = "SELECT id_cliente, CONCAT(nombre_cliente,' ', apellido_cliente) AS nombre_completo,
         dui_cliente, correo_cliente, usuario_cliente, status_cliente, fecha_registro_cliente, telefono_cliente FROM cliente
         ORDER BY id_cliente";
        $params = null;
        return Database::getRows($sql, $params);
    }

    //función para cambiar el estado de los clientes

    public function cambiarEstado()
    {
        $sql = "UPDATE cliente SET status_cliente = ? WHERE id_cliente = ?";
        $params = array($this->estado, $this->identificador);
        return Database::executeRow($sql, $params);
    }

    public function buscar()
    {
        $sql = "SELECT id_cliente, CONCAT(nombre_cliente,' ', apellido_cliente) AS nombre_completo,
         dui_cliente, correo_cliente, usuario_cliente, status_cliente, fecha_registro_cliente, telefono_cliente FROM cliente
         WHERE CONCAT(nombre_cliente,' ', apellido_cliente) ILIKE ? OR correo_cliente ILIKE ? OR usuario_cliente ILIKE ?
         ORDER BY id_cliente";
        $params = array($this->buscador, $this->buscador, $this->buscador);
        return Database::getRows($sql, $params);
    }

    //Para las direcciones de cliente//

    //Leer direcciones de cliente logueado
    public function readDirecciones()
    {
        $sql = "SELECT  id_direccion, descripcion_direccion, punto_referencia,nombre_municipio
		from direccion
		inner join cliente using (id_cliente)
		inner join municipio using (id_municipio)
		where id_cliente = ?";
        $params = array(2);/*SESSION[id_cliente]*/
        return Database::getRows($sql, $params);
    }

    //Leer municipios
    public function readMunicipios()
    {
        $sql = "SELECT id_municipio, nombre_municipio, id_departamento
         from municipio
         order by nombre_municipio";
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Leer departamentos
    public function readDepartamentos()
    {
        $sql = "SELECT id_departamento, nombre_departamento
         from departamento";
        $params = null;
        return Database::getRows($sql, $params);
    }

    // Insertar direccion
    public function createDireccion()
    {
        $sql = 'INSERT INTO direccion(descripcion_direccion,punto_referencia,coordenadas,id_cliente,id_municipio) values (?,?,?,?,?)';
        $params = array($this->descripcion_direccion, $this->punto_referencia, $this->coordenadas, 2, $this->id_municipio);
        return Database::executeRow($sql, $params);
    }

    //Leemos dato individual
    public function readOneDireccion()
    {
        $sql = "SELECT id_direccion,descripcion_direccion,punto_referencia,coordenadas, (CAST(split_part(coordenadas,',',1) AS VARCHAR))as latitude,(CAST(split_part(coordenadas,', ',2) AS VARCHAR))as longitud,id_cliente,id_municipio
                FROM direccion 
                WHERE id_direccion = ?";
        $params = array($this->id_direccion);
        return Database::getRow($sql, $params);
    }

    //Actualizamos direccion
    public function updateDireccion()
    {
        $sql = 'UPDATE direccion SET descripcion_direccion=?,punto_referencia=?,coordenadas=?,id_municipio=? where id_direccion=?';
        $params = array($this->descripcion_direccion, $this->punto_referencia, $this->coordenadas, $this->id_municipio, $this->id_direccion);
        return Database::executeRow($sql, $params);
    }

    //Eliminamos direccion
    public function deleteDireccion()
    {
        $sql = 'DELETE from direccion  where id_direccion = ?';
        $params = array($this->id_direccion);
        return Database::executeRow($sql, $params);
    }

    //Grafico Top 5 clientes mas destacados, valor ventas en dinero
    public function topClientesDestacados()
    {
        $sql = "SELECT total, CONCAT(nombre_cliente,' ', apellido_cliente) as nombre_cliente
        FROM factura
        INNER JOIN direccion ON factura.id_direccion = direccion.id_direccion
        INNER JOIN cliente ON direccion.id_cliente = cliente.id_cliente
        ORDER BY total desc limit 5";
        $params = null;/*SESSION[id_cliente]*/
        return Database::getRows($sql, $params);
    }
}

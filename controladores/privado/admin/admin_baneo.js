// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_BANEO = SERVER + 'dashboard/administrar_baneos.php?action=';
const API_CARGO = SERVER + 'dashboard/administrar_baneos.php?action=readAll';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  readRows(API_BANEO);
  // Se define una variable para establecer las opciones del componente Modal.
  let options = {
    dismissible: false,
    onOpenStart: function () {
      // Se restauran los elementos del formulario.
      document.getElementById("save-form").reset();
      document.getElementById("nombre_imagen").value = null;
    },
  };
  // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
  M.Modal.init(document.querySelectorAll('.modal'), options);
  M.Tooltip.init(document.querySelectorAll(".tooltipped"));
  openCargo();
});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search').addEventListener('keyup', function (event) {
  const parameter = new FormData();
  parameter.append('search', document.getElementById('search').value);
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Petición para obtener los datos del registro solicitado.
  fetch(API_BANEO + 'search', {
    method: 'post',
    body: parameter
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          //Se llena la tabla
          fillTable(response.dataset);
          // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
          M.updateTextFields();
          //Si no hay coincidencias se carga la tabla sin datos
        } else if (response.exception == 'No hay coincidencias') {
          fillTable(response.dataset);
          //Si no se busca nada se carga la tabla
        } else if (response.exception == 'Ingrese un valor para buscar') {
          readRows(API_PRODUCTOS);
        } else {

        }
      });
    } else {
      console.log(request.status + ' ' + request.statusText);
    }
  });
});


// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document
  .getElementById("save-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    let action = "";
    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(API_CATEGORIA, "create", "save-form", "modal_anadir_categ_oo");
  });



// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document
  .getElementById("update-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    saveRow(API_CATEGORIA, "updateCa", "update-form", "modal_editar_categ_o");
    // }
  });



function openCargo() {
  //Se realiza la petición para cargar los datos
  fetch(API_BANEO + "readAll", {
    method: "get",
  }).then(function (request) {
    //Se revisa si se ejecutó la sentencia
    if (request.ok) {
      //Se pasa a formato JSON
      request.json().then(function (response) {
        //Se verifica el estado de la respuesta
        if (response.status) {
          fillSelect(API_CARGO, "cargo", response.dataset.id_cargo);
        } else {
          //Se le notifica el usuario del problema
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      //Se devuelve el error en la consola
      console.log(request.status + " " + request.statusText);
    }
  });
}


function openBan() {
  let content = "";
  if (document.getElementById("cargo").options[document.getElementById("cargo").selectedIndex].value == 1) {
    fetch(API_BANEO + "readAllAdmin", {
      method: "get",
    }).then(function (request) {
      //Se revisa si se ejecutó la sentencia
      if (request.ok) {
        //Se pasa a formato JSON
        request.json().then(function (response) {
          //Se verifica el estado de la respuesta
          if (response.status) {
            response.dataset.map(function (row) {
              // Se crean y concatenan las filas de la tabla con los datos de cada registro.
              var estado;
              if (row.estado_administrador == 'Bloqueo por intentos') {
                estado = 'Bloqueo';
              } else {
                estado = row.estado_administrador;
              }
              content += `
                      <tr>
                          <td>${row.nombre_admin}</td>
                          <td>${row.usuario_admin}</td>
                          <td>${row.correo_admin}</td>
                          <td class="${estado}">${row.estado_administrador}</td>
                          <td data-target="Opciones: "><a class="waves-effect waves-light red darken-4 white-text btn-large col s3 m3 l3"
                          onclick="updateBaneoAdministrador(${row.id_admin})" id="botonA${row.id_admin}"><i class="material-icons">lock_outline</i></a>
                          <a class="waves-effect waves-light blue lighten-2 black-text btn-large col s3 m3 l3  center-align"
                          onclick="updateDesbaneoAdministrador(${row.id_admin})" id="botonB${row.id_admin}"><i class="material-icons black-text">lock_open</i>
                         
                      </a>
                      <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s3 m3 l3  center-align"
                      onclick="updateHoraDesbaneoAdministrador(${row.id_admin})" id="botonB${row.id_admin}"><i class="material-icons black-text">av_timer</i>
                      </a></td>
                      </tr>
                    `;
            });
            // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
            document.getElementById("tbody-baneo").innerHTML = content;
          } else {
            //Se le notifica el usuario del problema
            sweetAlert(2, response.exception, null);
            response.dataset.map(function (row) {
              // Se crean y concatenan las filas de la tabla con los datos de cada registro.
              content += `
                    <tr>
                        <td>${row.nombre_admin}</td>
                        <td>${row.usuario_admin}</td>
                        <td>${row.correo_admin}</td>
                        <td>${row.estado_administrador}</td>
                        <td data-target="Editar: "><a class="btn-flat boton_editar_tabl modal-trigger" href="#modal_editar_categ_o" onclick="openUpdate(${row.id_categoria})"><i class=" material-icons small">edit</i></td>
                    </tr>
                  `;
            });
            // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
            document.getElementById("tbody-baneo").innerHTML = content;
          }
        });
      } else {
        //Se devuelve el error en la consola
        console.log(request.status + " " + request.statusText);
      }
    });
  } else if (document.getElementById("cargo").options[document.getElementById("cargo").selectedIndex].value == 2) {
    fetch(API_BANEO + "readAllRepartidor", {
      method: "get",
    }).then(function (request) {
      //Se revisa si se ejecutó la sentencia
      if (request.ok) {
        //Se pasa a formato JSON
        request.json().then(function (response) {
          //Se verifica el estado de la respuesta
          if (response.status) {
            response.dataset.map(function (row) {
              // Se crean y concatenan las filas de la tabla con los datos de cada registro.
              var estado;
              if (row.status_repartidor == 'Bloqueo por intentos') {
                estado = 'Bloqueo';
              } else {
                estado = row.status_repartidor;
              }
              content += `
                      <tr>
                          <td>${row.nombre_repartidor}</td>
                          <td>${row.usuario_repartidor}</td>
                          <td>${row.correo_repartidor}</td>
                          <td class="${estado}">${row.status_repartidor}</td>
                          <td data-target="Opciones: "><a class="waves-effect waves-light red darken-4 white-text btn-large col s3 m3 l3 "
                          onclick="updateBaneoRepartidor(${row.id_repartidor})" id="botonA${row.id_repartidor}"><i class="material-icons">lock_outline</i></a>  <a class="waves-effect waves-light blue lighten-2 black-text btn-large col s3 m3 l3  center-align"
                          onclick="updateDesbaneoRepartidor(${row.id_repartidor})" id="botonB${row.id_repartidor}"><i class="material-icons black-text">lock_open</i>
                          <div class="hide-on-med-and-down ">Editar</div>
                      </a>
                      <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s3 m3 l3  center-align"
                          onclick="updateHoraDesbaneoRepartidor(${row.id_repartidor})" id="botonB${row.id_repartidor}"><i class="material-icons black-text">av_timer</i>
                      </a></td>
                      </tr>
                    `;
            });
            // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
            document.getElementById("tbody-baneo").innerHTML = content;
          } else {
            //Se le notifica el usuario del problema
            sweetAlert(2, response.exception, null);
            response.dataset.map(function (row) {
              // Se crean y concatenan las filas de la tabla con los datos de cada registro.
              content += `
                      <tr>
                          <td>${row.nombre_repartidor}</td>
                          <td>${row.usuario_repartidor}</td>
                          <td>${row.correo_repartidor}</td>
                          <td>${row.estado_repartidor}</td>
                          <td data-target="Editar: "><a class="btn-flat boton_editar_tabl modal-trigger" href="#modal_editar_categ_o" onclick="openUpdate(${row.id_categoria})"><i class=" material-icons small">edit</i></td>
                      </tr>
                    `;
            });
            // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
            document.getElementById("tbody-baneo").innerHTML = content;
          }
        });
      } else {
        //Se devuelve el error en la consola
        console.log(request.status + " " + request.statusText);
      }
    });
  } else if (document.getElementById("cargo").options[document.getElementById("cargo").selectedIndex].value == 3) {
    fetch(API_BANEO + "readAllVendedor", {
      method: "get",
    }).then(function (request) {
      //Se revisa si se ejecutó la sentencia
      if (request.ok) {
        //Se pasa a formato JSON
        request.json().then(function (response) {
          //Se verifica el estado de la respuesta
          if (response.status) {
            response.dataset.map(function (row) {
              // Se crean y concatenan las filas de la tabla con los datos de cada registro.

              var estado;
              if (row.estado_vendedor == 'Bloqueo por intentos') {
                estado = 'Bloqueo';
              } else {
                estado = row.estado_vendedor;
              }
              content += `
                      <tr>
                          <td>${row.nombre_completo}</td>
                          <td>${row.usuario_vendedor}</td>
                          <td>${row.correo_vendedor}</td>
                          <td class="${estado}">${row.estado_vendedor}</td>
                          <td data-target="Opciones: "><a class="waves-effect waves-light red darken-4 white-text btn-large col s3 m3 l3 "
                          onclick="updateBaneoVendedor(${row.id_vendedor})" id="botonA${row.id_vendedor}"><i class="material-icons">lock_outline</i></a> <a class="waves-effect waves-light blue lighten-2 black-text btn-large col s3 m3 l3 center-align"
                          onclick="updateDesbaneoVendedor(${row.id_vendedor})" id="botonB${row.id_vendedor}"><i class="material-icons black-text">lock_open</i>
                          <div class="hide-on-med-and-down ">Editar</div>
                      </a>
                      <a class="waves-effect waves-light blue lighten-3 black-text btn-large col s3 m3 l3 center-align"
                          onclick="updateHoraDesbaneoVendedor(${row.id_vendedor})" id="botonB${row.id_vendedor}"><i class="material-icons black-text">av_timer</i>
                      </a>
                      </td>
                      </tr>
                    `;
            });
            // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
            document.getElementById("tbody-baneo").innerHTML = content;
          } else {
            //Se le notifica el usuario del problema
            sweetAlert(2, response.exception, null);

            response.dataset.map(function (row) {
              // Se crean y concatenan las filas de la tabla con los datos de cada registro.
              content += `
                        <tr>
                            <td>${row.nombre_vendedor}</td>
                            <td>${row.usuario_vendedor}</td>
                            <td>${row.correo_vendedor}</td>
                            <td>${row.estado_vendedor}</td>
                            <td data-target="Editar: "><a class="btn-flat boton_editar_tabl modal-trigger" href="#modal_editar_categ_o" onclick="openUpdate(${row.id_categoria})"><i class=" material-icons small">edit</i></td>
                        </tr>
                      `;
            });
            // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
            document.getElementById("tbody-baneo").innerHTML = content;

          }


        });
      } else {
        //Se devuelve el error en la consola
        console.log(request.status + " " + request.statusText);
      }
    });
  } else if (document.getElementById("cargo").options[document.getElementById("cargo").selectedIndex].value == 4) {
    fetch(API_BANEO + "readAllCliente", {
      method: "get",
    }).then(function (request) {
      //Se revisa si se ejecutó la sentencia
      if (request.ok) {
        //Se pasa a formato JSON
        request.json().then(function (response) {
          //Se verifica el estado de la respuesta
          if (response.status) {
            response.dataset.map(function (row) {
              // Se crean y concatenan las filas de la tabla con los datos de cada registro.

              var estado;
              if (row.estado_cliente == 'Bloqueo por intentos') {
                estado = 'Bloqueo';
              } else {
                estado = row.estado_cliente;
              }

              content += `
                      <tr>
                          <td>${row.nombre_completo}</td>
                          <td>${row.usuario_cliente}</td>
                          <td>${row.correo_cliente}</td>
                          <td class="${estado}">${row.estado_cliente}</td>
                          <td data-target="Opciones: "><a class="waves-effect waves-light red darken-4 white-text btn-large col s3 m3 l3 "
                          onclick="updateBaneoCliente(${row.id_cliente})" id="botonA${row.id_cliente}"><i class="material-icons">lock_outline</i></a><a class="waves-effect waves-light blue lighten-2 black-text btn-large col s3 m3 l3  center-align"
                          onclick="updateDesbaneoCliente(${row.id_cliente})" id="botonB${row.id_cliente}"><i class="material-icons black-text">lock_open</i>
                          <div class="hide-on-med-and-down ">Editar</div>
                      </a><a class="waves-effect waves-light blue lighten-3 black-text btn-large col s3 m3 l3  center-align"
                      onclick="updateHoraDesbaneoCliente(${row.id_cliente})" id="botonB${row.id_cliente}"><i class="material-icons black-text">av_timer</i>
                      <div class="hide-on-med-and-down ">Editar</div>
                  </a>  </td>
                      </tr>
                    `;
            });
            // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
            document.getElementById("tbody-baneo").innerHTML = content;
          } else {
            //Se le notifica el usuario del problema
            sweetAlert(2, response.exception, null);
            response.dataset.map(function (row) {
              // Se crean y concatenan las filas de la tabla con los datos de cada registro.
              content += `
                      <tr>
                          <td>${row.nombre_completo}</td>
                          <td>${row.usuario_cliente}</td>
                          <td>${row.correo_cliente}</td>
                          <td>${row.estado_cliente}</td>
                          <td data-target="Editar: "><a class="btn-flat boton_editar_tabl modal-trigger" href="#modal_editar_categ_o" onclick="openUpdate(${row.id_categoria})"><i class=" material-icons small">edit</i></td>
                      </tr>
                    `;
            });
            // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
            document.getElementById("tbody-baneo").innerHTML = content;
          }
        });
      } else {
        //Se devuelve el error en la consola
        console.log(request.status + " " + request.statusText);
      }
    });
  }
  document.getElementById("cargo").options[document.getElementById("cargo").selectedIndex].value;
  console.log(document.getElementById("cargo").options[document.getElementById("cargo").selectedIndex].value);
}





function updateBaneoAdministrador(id) {
  const data = new FormData();
  data.append('id_aa', id);

  fetch(API_BANEO + "updateBaneoAdministrador", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          sweetAlert(1, response.message, null);
          openBan();


        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

function updateDesbaneoAdministrador(id) {
  const data = new FormData();
  data.append('id_aa', id);

  fetch(API_BANEO + "updateDesbaneoAdministrador", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          sweetAlert(1, response.message, null);
          openBan();
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

function updateBaneoRepartidor(id) {
  const data = new FormData();
  data.append('id_aa', id);

  fetch(API_BANEO + "updateBaneoRepartidor", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          sweetAlert(1, response.message, null);
          openBan();
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

function updateBaneoVendedor(id) {
  const data = new FormData();
  data.append('id_aa', id);

  fetch(API_BANEO + "updateBaneoVendedor", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          sweetAlert(1, response.message, null);
          openBan();
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

function updateBaneoCliente(id) {
  const data = new FormData();
  data.append('id_aa', id);

  fetch(API_BANEO + "updateBaneoCliente", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          sweetAlert(1, response.message, null);
          openBan();
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}


function updateDesbaneoRepartidor(id) {
  const data = new FormData();
  data.append('id_aa', id);

  fetch(API_BANEO + "updateDesbaneoRepartidor", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          sweetAlert(1, response.message, null);
          openBan();
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

function updateDesbaneoVendedor(id) {
  const data = new FormData();
  data.append('id_aa', id);

  fetch(API_BANEO + "updateDesbaneoVendedor", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          sweetAlert(1, response.message, null);
          openBan();
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

function updateDesbaneoCliente(id) {
  const data = new FormData();
  data.append('id_aa', id);

  fetch(API_BANEO + "updateDesbaneoCliente", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          sweetAlert(1, response.message, null);
          openBan();
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

function updateHoraDesbaneoAdministrador(id) {

  const data = new FormData();
  data.append('id_aa', id);

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}
var date = new Date();
var month = pad2(date.getMonth() + 1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year = date.getFullYear();
 
 fecha =  year+'-'+month+'-'+day;
  Swal.fire({
    title: 'Selecciona la fecha de desbloqueo',
    html: '<input type="date" class="datepicker" id="pk" min="'+fecha+'">',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(formatDate(document.getElementById("pk").value));
      data.append('hora_desbloqueo', formatDate(document.getElementById("pk").value));
      fetch(API_BANEO + "updateHoraDesbaneoAdministrador", {
        method: "post",
        body: data,
      }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
          // Se obtiene la respuesta en formato JSON.
          request.json().then(function (response) {
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (response.status) {
              sweetAlert(1, response.message, null);
              openBan();
            } else {
              sweetAlert(2, response.exception, null);
            }
          });
        } else {
          console.log(request.status + " " + request.statusText);
        }
      });
    }
  });
}

function updateHoraDesbaneoRepartidor(id) {

  const data = new FormData();
  data.append('id_aa', id);
  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}
var date = new Date();
var month = pad2(date.getMonth() + 1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year = date.getFullYear();
 
 fecha =  year+'-'+month+'-'+day;
  Swal.fire({
    title: 'Selecciona la fecha de desbloqueo',
    html: '<input type="date" class="datepicker" id="pk" min="'+fecha+'">',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(formatDate(document.getElementById("pk").value));
      data.append('hora_desbloqueo', formatDate(document.getElementById("pk").value));
      fetch(API_BANEO + "updateHoraDesbaneoRepartidor", {
        method: "post",
        body: data,
      }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
          // Se obtiene la respuesta en formato JSON.
          request.json().then(function (response) {
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (response.status) {
              sweetAlert(1, response.message, null);
              openBan();
            } else {
              sweetAlert(2, response.exception, null);
            }
          });
        } else {
          console.log(request.status + " " + request.statusText);
        }
      });
    }
  });
}

function updateHoraDesbaneoVendedor(id) {

  const data = new FormData();
  data.append('id_aa', id);
  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}
var date = new Date();
var month = pad2(date.getMonth() + 1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year = date.getFullYear();
 
 fecha =  year+'-'+month+'-'+day;

  Swal.fire({
    title: 'Selecciona la fecha de desbloqueo',
    html: '<input type="date" class="datepicker" id="pk" min="'+fecha+'">',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(formatDate(document.getElementById("pk").value));
      data.append('hora_desbloqueo', formatDate(document.getElementById("pk").value));
      fetch(API_BANEO + "updateHoraDesbaneoVendedor", {
        method: "post",
        body: data,
      }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
          // Se obtiene la respuesta en formato JSON.
          request.json().then(function (response) {
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (response.status) {
              sweetAlert(1, response.message, null);
              openBan();
            } else {
              sweetAlert(2, response.exception, null);
            }
          });
        } else {
          console.log(request.status + " " + request.statusText);
        }
      });
    }
  });
}


function updateHoraDesbaneoCliente(id) {

  const data = new FormData();
  data.append('id_aa', id);
  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}
var date = new Date();
var month = pad2(date.getMonth() + 1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year = date.getFullYear();
 
 fecha =  year+'-'+month+'-'+day;
console.log(fecha);

  Swal.fire({
    title: 'Selecciona la fecha de desbloqueo',
    html: '<input type="date" class="datepicker" id="pk" min="'+fecha+'">',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(formatDate(document.getElementById("pk").value));
      data.append('hora_desbloqueo', formatDate(document.getElementById("pk").value));
      fetch(API_BANEO + "updateHoraDesbaneoCliente", {
        method: "post",
        body: data,
      }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
          // Se obtiene la respuesta en formato JSON.
          request.json().then(function (response) {
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (response.status) {
              sweetAlert(1, response.message, null);
              openBan();
            } else {
              sweetAlert(2, response.exception, null);
            }
          });
        } else {
          console.log(request.status + " " + request.statusText);
        }
      });
    }
  });
}

function formatDate(date) {
  var dat = date;
  month = dat.substr(5, 2),
    day = dat.substr(8, 2),
    year = dat.substr(0, 4);


  return [year, month, day].join('-');
}
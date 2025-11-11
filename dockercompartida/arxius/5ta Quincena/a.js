let cochesG = [];
let clientesG = [];
var horaEntrada = new Date();


async function obtenerDni() {
  const usuario = "admin";
  const contrasena = "admin";
  const credenciales = btoa(`${usuario}:${contrasena}`); //base64
  let clientes = [];
  const listaDnis = document.getElementById("sclient");

  try {
    const respuestaClientes = await fetch(
      "http://localhost:5984/parking/parking_clientes",
      {
        headers: {
          Authorization: `Basic ${credenciales}`,
        },
      }
    );

    if (!respuestaClientes.ok) {
      throw new Error(
        `Error al obtener el documento: ${respuestaClientes.status}`
      );
    }
    const datos = await respuestaClientes.json();
    console.log(datos);
    if (datos && datos.clientes) {
      console.log("datos");
      clientes = datos.clientes;
      clientesG = clientes;
      console.log("mis clientes", clientes);
      listaDnis.innerHTML = '<option value="-1"> selecciona una opcio</option>';

      clientes.forEach((cliente) => {
        const opcion = document.createElement("option");
        opcion.value = cliente.dni;
        opcion.textContent = `${cliente.dni}`;
        listaDnis.appendChild(opcion);
      });
    } else {
      throw new Error('El documento no cuenta con la propiedad "clientes".');
    }
  } catch (error) {
    document.getElementById("mensaje").textContent = "Error: " + error.message;
  }
}

async function obtenerMatriculas() {
  const usuario = "admin";
  const contrasena = "admin";
  const credenciales = btoa(`${usuario}:${contrasena}`); //base64
  let coches = [];
  const listaCoches = document.getElementById("smatricula");

  try {
    const respuestaCoches = await fetch(
      "http://localhost:5984/parking/parking_coches",
      {
        headers: {
          Authorization: `Basic ${credenciales}`,
        },
      }
    );

    if (!respuestaCoches.ok) {
      throw new Error(
        `Error al obtener el documento: ${respuestaCoches.status}`
      );
    }
    const datos = await respuestaCoches.json();
    console.log(datos);
    if (datos && datos.cotxes) {
      console.log("datos");
      coches = datos.cotxes;
        cochesG = coches;
      console.log("mis coches", coches);
      listaCoches.innerHTML =
        '<option value="-1"> selecciona una opcio</option>';

      coches.forEach((coche) => {
        const opcion = document.createElement("option");
        opcion.value = coche.matricula;
        opcion.textContent = `${coche.matricula}`;
        listaCoches.appendChild(opcion);
      });
    } else {
      throw new Error('El documento no cuenta con la propiedad "coches".');
    }
  } catch (error) {
    document.getElementById("mensaje").textContent = "Error: " + error.message;
  }
}

window.onload = function () {
  obtenerDni();
  obtenerMatriculas();


  // con en este evento actualizo las matriculos aque aparecen en el select de abajo
  document
    .getElementById("sclient")
    .addEventListener("change", actualizarMatriculasPorDni);


    //Cuando he seleccionado una maricula con este evento muestro los deatalles del coche que he seleccionado
  document
    .getElementById("smatricula")
    .addEventListener("change", mostrarDetallesCoche); 


};

function actualizarMatriculasPorDni() {

    const dniElegido = document.getElementById("sclient").value;

    if (dniElegido === "-1") {
        obtenerMatriculas();
        limpiarDetallesCoche();
        return;
    }

    const cochesFiltro = cochesG.filter(coche => coche.idclient === dniElegido);

    const listaCoches = document.getElementById("smatricula");
    listaCoches.innerHTML = '<option value="-1"> selecciona una opcio</option>';

    cochesFiltro.forEach(coche => {
        const opcion = document.createElement("option");
        opcion.value = coche.matricula;
        opcion.textContent = `${coche.matricula}`;
        listaCoches.appendChild(opcion);
    });
    limpiarDetallesCoche();
}

function mostrarDetallesCoche() {
    const matriculaElegida = document.getElementById("smatricula").value;
    if (matriculaElegida === "-1") {
        limpiarDetallesCoche();
        return;
    }

    const cocheSeleccionado = cochesG.find(coche => coche.matricula === matriculaElegida);
    const clienteDuenyo = clientesG.find(cliente => cliente.dni === cocheSeleccionado.idclient);

    if (cocheSeleccionado && clienteDuenyo) {
        document.getElementById("data").value = horaEntrada.toLocaleString();
        document.getElementById("matricula").value = cocheSeleccionado.matricula;
        document.getElementById("marca").value = cocheSeleccionado.marca;
        document.getElementById("model").value = cocheSeleccionado.modelo;
        document.getElementById("color").value = cocheSeleccionado.color;

        document.getElementById("dni").value = clienteDuenyo.dni;
        document.getElementById("nom").value = clienteDuenyo.nombre;
        document.getElementById("direccio").value = clienteDuenyo.via;
        document.getElementById("poblacio").value = clienteDuenyo.ciudad;
        document.getElementById("sexe").value = clienteDuenyo.sexo;
    }else {
        limpiarDetallesCoche();
    }

}

function limpiarDetallesCoche() {
    document.getElementById("data").value = "";
    document.getElementById("matricula").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("model").value = "";
    document.getElementById("color").value = "";

    document.getElementById("dni").value = "";
    document.getElementById("nom").value = "";
    document.getElementById("direccio").value = "";
    document.getElementById("poblacio").value = "";
    document.getElementById("sexe").value = "";
}
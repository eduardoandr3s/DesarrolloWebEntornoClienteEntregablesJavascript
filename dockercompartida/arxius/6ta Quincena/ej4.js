const usuario = "admin";
const contrasena = "admin";
const credenciales = btoa(`${usuario}:${contrasena}`); //base64

window.onload = async function obtenerOrigen() {
  try {
    const respuestaBBDD = await fetch(
      `http://localhost:5984/rodalies/_all_docs?include_docs=true`,
      {
        headers: {
          Authorization: `Basic ${credenciales}`,
        },
      }
    );

    if (!respuestaBBDD.ok)
      throw new Error(`Error en la consulta: ${respuestaBBDD.status}`);

    const resultado = await respuestaBBDD.json();

    console.log(resultado.rows);
    const origenes = resultado.rows.map((element) => element.doc.origen);
    console.log(origenes);
    const setOrigenes = new Set(origenes);
    const origenesUnicos = [...setOrigenes];
    console.log(origenesUnicos);
    let selectOrigen = "<option value='-1'>Selecciona un origen</option>";
    selectOrigen += origenesUnicos
      .map((orig) => `<option value=${orig}>${orig}</option>`)
      .join("");

    document.getElementById("s-origen").innerHTML = selectOrigen;
    document
      .getElementById("s-origen")
      .addEventListener("change", llenarSelectDestino);
  } catch (error) {
    document.getElementById("resultado").textContent =
      "Error: " + error.message;
  }
};

async function llenarSelectDestino() {
  const origenSeleccionado = document.getElementById("s-origen").value;

  if (origenSeleccionado == "-1") {
    document.getElementById("s-deti").innerHTML =
      "<option value='-1'>Selecciona un destino</option>";
    document.getElementById("table").innerHTML = "";
    return;
  }

  const consulta = {
    selector: {
      origen: origenSeleccionado,
    },
  };

  try {
    const respuestaBBDD = await fetch(`http://localhost:5984/rodalies/_find`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credenciales}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consulta),
    });

    if (!respuestaBBDD.ok)
      throw new Error(`Error en la consulta: ${respuestaBBDD.status}`);

    const resultado = await respuestaBBDD.json();

    const destinos = resultado.docs.map((doc) => doc.desti);
    const setDestinos = new Set(destinos);
    const destinosUnicos = [...setDestinos];

    console.log(`destinos unicos array: ${destinosUnicos}`);

    let htmlDestinos = "<option value='-1'>Selecciona un destino</option>";
    htmlDestinos += destinosUnicos
      .map((desti) => `<option value=${desti}>${desti}</option>`)
      .join("");

    document.getElementById("s-desti").innerHTML = htmlDestinos;

    document
      .getElementById("s-desti")
      .addEventListener("change", mostrarTablaHorarios);
  } catch (error) {
    document.getElementById("resultado").textContent =
      "Error: " + error.message;
  }
}

async function mostrarTablaHorarios() {
  const origenSeleccionado = document.getElementById("s-origen").value;
  const destinoSeleccionado = document.getElementById("s-desti").value;

  if (destinoSeleccionado == "-1") {
    document.getElementById("table").innerHTML = "";
    return;
  }

  const consulta = {
    selector: {
      origen: origenSeleccionado,
      desti: destinoSeleccionado,
    },
  };


try {
    
const respuestaBBDD = await fetch(`http://localhost:5984/rodalies/_find`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credenciales}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consulta),
    });

    if (!respuestaBBDD.ok)
      throw new Error(`Error en la consulta: ${respuestaBBDD.status}`);

    const resultado = await respuestaBBDD.json();


    let tabla = document.getElementById('table');

          tabla.innerHTML +=
        "<tr><th>id</th><th>origen</th><th>desti</th><th>horaEixida</th><th>horaArribada</th></tr>";

      resultado.docs.forEach((roda) => {
        tabla.innerHTML += `<tr onmouseover="cargarFormulario('${roda._id}')"><td>${roda._id}</td><td>${roda.origen}</td><td>${roda.desti}</td><td>${roda.horaEixida}</td><td>${roda.horaArribada}</td></tr>`;
      });




} catch (error) {
        document.getElementById("resultado").textContent =
      "Error: " + error.message;
}


}

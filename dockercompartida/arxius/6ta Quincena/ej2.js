

  let rodaliesRows = [];
  const usuario = "admin";
  const contrasena = "admin";
  const credenciales = btoa(`${usuario}:${contrasena}`); //base64


window.onload = async function obtenerRodalies() {

  const tabla = document.getElementById("table");



        // const query = {
        //     selector: {
        //         data:
        //     }
        // }


  try {
    const respuestaBBDD = await fetch(
      "http://localhost:5984/rodalies/_all_docs?include_docs=true",
      {
        headers: {
          Authorization: `Basic ${credenciales}`,
        },
      }
    );
    if (!respuestaBBDD.ok)
      throw new Error(
        `Error al obtener el documento de la BBDD ${respuestaBBDD.status}`
      );
    const datos = await respuestaBBDD.json();
    console.log("datos: " + typeof datos);
    console.log("datos.rodalies: " + datos.rows[5].doc._id);

    if (datos) {
      rodaliesRows = datos.rows;
      console.log(rodaliesRows);

    //   rodaliesRows.forEach(row => {
    //     rodaliesId.push(row.id);
    //   });
      tabla.innerHTML =
        "<tr><th>id</th><th>origen</th><th>desti</th><th>horaEixida</th><th>horaArribada</th></tr>";

      rodaliesRows.forEach((roda) => {
        tabla.innerHTML += `<tr onmouseover="cargarFormulario('${roda.doc._id}')"><td>${roda.doc._id}</td><td>${roda.doc.origen}</td><td>${roda.doc.desti}</td><td>${roda.doc.horaEixida}</td><td>${roda.doc.horaArribada}</td></tr>`;
      });

    }
  } catch (error) {


  }
};
    function cargarFormulario(tablaId){
        if(rodaliesRows){
            rodaliesRows.forEach(roda =>{
                if(tablaId == roda.doc._id){
                document.getElementById('id').value = roda.doc._id;
                document.getElementById('origen').value = roda.doc.origen;
                document.getElementById('desti').value = roda.doc.desti;
                document.getElementById('horaEixida').value = roda.doc.horaEixida;
                document.getElementById('horaArribada').value = roda.doc.horaArribada;
                }
            });
        }
    }

    async function actualizarRodalies() {

        let actualizaRodali;

            let id =document.getElementById('id').value;
        
        rodaliesRows.forEach(roda=>{
                
                    console.log("_rev"+roda.doc._rev)
                    if(roda.doc._id == id){

                               actualizaRodali = {
                _id: document.getElementById('id').value,
                _rev: roda.doc._rev,
                origen: document.getElementById('origen').value,
                desti: document.getElementById('desti').value,
                horaEixida: document.getElementById('horaEixida').value,
                horaArribada: document.getElementById('horaArribada').value,
                data: null
                    }
                    }
             
                
        });

try {
    
            const respuestaBBDD = await fetch(
      `http://localhost:5984/rodalies/${id}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${credenciales}`,
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify(actualizaRodali)
    });
    if (!respuestaBBDD.ok)
      throw new Error(
        `Error al actualizar el documento de la BBDD ${respuestaBBDD.status}`
      );
    const resultado = await respuestaBBDD.json();
   document.getElementById('resultado').innerHTML = `<p>Rodali actualizado correctamente ID: ${resultado.id} --- Rev: ${resultado.rev}</p>`;


} catch (error) {
            document.getElementById('resultado').textContent = 'Error: '+ error.message;

}



        
    }
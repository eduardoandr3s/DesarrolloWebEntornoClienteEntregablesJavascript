let rodalieEliminar;
const usuario = "admin";
const contrasena = "admin";
const credenciales = btoa(`${usuario}:${contrasena}`); //base64
const idEliminar = document.getElementById('id');

async function obtenerRodalies() {
  try {
    
    const respuestaBBDD = await fetch(
     `http://localhost:5984/rodalies/${idEliminar}`,
      {
        headers: {
          'Authorization': `Basic ${credenciales}`,
        }
      });

    if (!respuestaBBDD.ok)
      throw new Error(
        `Error al obtener el documento de la BBDD ${respuestaBBDD.status}`
      );
    const datos = await respuestaBBDD.json();
      if(datos){

        document.getElementById('rev').value = datos._rev;
        eliminarRodalie(datos._id, datos._rev);

           document.getElementById('resultado').innerHTML = `<p>Rodali eliminado correctamente ID: ${resultado.id} --- Rev: ${resultado.rev}</p>`;

      }

  } catch (error) {
        document.getElementById("resultado").textContent = "Error: " + error.message;

  }
};




async function eliminarRodalie(id, rev) {

    try {
        const aEliminar = await fetch(`http://localhost:5984/rodalies/${id}?rev=${rev}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Basic ${credenciales}`
            }
        });

        if(!aEliminar.ok) throw new Error(`Error al eliminar el documento: ${aEliminar.status}`);
            const resultado= await aEliminar.json();

            document.getElementById('resultado').innerHTML = 
            `Documento eliminado correctamente ID: ${resultado.id}, REV: ${resultado.rev}`

    } catch (error) {
                document.getElementById("resultado").textContent = "Error: " + error.message;

    }

        
}

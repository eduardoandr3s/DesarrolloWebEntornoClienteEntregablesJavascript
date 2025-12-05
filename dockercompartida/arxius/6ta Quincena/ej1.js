async function obtenerRodalies() {
    const usuario = "admin";
    const contrasena = "admin";
    const credenciales = btoa(`${usuario}:${contrasena}`); //base64
    
    const nuevoRodali = {
        _id: document.getElementById('id').value,
        origen: document.getElementById('origen').value,
        desti: document.getElementById('desti').value,
        horaEixida: document.getElementById('horaEixida').value,
        horaArribada: document.getElementById('horaArribada').value,
        data: null
    }

    try {
      /*  const respuestaBBDD = await fetch(
            "http://localhost:5984/rodalies",
            {
                headers: {
                    'Authorization': `Basic ${credenciales}`,
                },
            }
        );
        if(!respuestaBBDD.ok) throw new Error(`Error al obtener el documento de la BBDD ${respuestaBBDD.status}`);
        const datos = respuestaBBDD.json();
        console.log(datos);
        datos.rodalies.push(nuevoRodali);*/
    

    const respuestaBBDD = await fetch(
            "http://localhost:5984/rodalies",
            {
                method: 'POST',
             headers: {
                    'Authorization': `Basic ${credenciales}`,
                    'Content-Type': 'application/json'      
                      },
                      body: JSON.stringify(nuevoRodali)
            });
            if(respuestaBBDD.status == 409) throw new Error(`Id ya existente, debes escoger otra error: ${respuestaBBDD.status}`);
            if(respuestaBBDD.status == 400) throw new Error(`Datos incompletos error: ${respuestaBBDD.status}`);
            if(!respuestaBBDD.ok) throw new Error(`Error al crear el nuevo documento ${respuestaBBDD.status}`);

            const resultado = await respuestaBBDD.json();
            document.getElementById('resultado').innerHTML = `<p>Rodali insertado correctamente ID: ${resultado.id} --- Rev: ${resultado.rev}</p>`;
     

        
    
    } catch (error) {
        document.getElementById('resultado').textContent = 'Error: '+ error.message;
    }

}
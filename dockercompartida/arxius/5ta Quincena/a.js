        async function obtenerDni() {
            const usuario = 'admin';
            const contrasena = 'admin';
            const credenciales = btoa(`${usuario}:${contrasena}`); //base64
            let clientes = [];
            const listaDnis = document.getElementById('sclient');

            try {
                const respuestaClientes = await fetch('http://localhost:5984/parking/parking_clientes', {
                    headers: {
                        'Authorization': `Basic ${credenciales}`
                    }
                });

                if (!respuestaClientes.ok) {
                    throw new Error(`Error al obtener el documento: ${respuestaClientes.status}`);
                }
                const datos = await respuestaClientes.json();
                console.log(datos);
                if (datos && datos.clientes) {
                    console.log("datos");
                    clientes = datos.clientes;
                    console.log("mis clientes", clientes);
                    listaDnis.innerHTML = '<option value="-1"> selecciona una opcio</option>';
                
                    clientes.forEach(cliente => {
                        const opcion = document.createElement('option');
                        opcion.value = cliente.dni;
                        opcion.textContent = `${cliente.dni}`;
                        listaDnis.appendChild(opcion);
                    });
                } else {
                    throw new Error('El documento no cuenta con la propiedad "clientes".');
                }

            } catch (error) {
                document.getElementById('mensaje').textContent = 'Error: ' +
                    error.message;
            }

            
        }

                async function obtenerMatriculas() {
            const usuario = 'admin';
            const contrasena = 'admin';
            const credenciales = btoa(`${usuario}:${contrasena}`); //base64
            let coches = [];
            const listaCoches = document.getElementById('smatricula');

            try {
                const respuestaCoches = await fetch('http://localhost:5984/parking/parking_coches', {
                    headers: {
                        'Authorization': `Basic ${credenciales}`
                    }
                });

                if (!respuestaCoches.ok) {
                    throw new Error(`Error al obtener el documento: ${respuestaCoches.status}`);
                }
                const datos = await respuestaCoches.json();
                console.log(datos);
                if (datos && datos.cotxes) {
                    console.log("datos");
                    coches = datos.cotxes;
                    console.log("mis coches", coches);
                    listaCoches.innerHTML = '<option value="-1"> selecciona una opcio</option>';

                    coches.forEach(coche => {
                        const opcion = document.createElement('option');
                        opcion.value = coche.matricula;
                        opcion.textContent = `${coche.matricula}`;
                        listaCoches.appendChild(opcion);
                    });
                } else {
                    throw new Error('El documento no cuenta con la propiedad "coches".');
                }

            } catch (error) {
                document.getElementById('mensaje').textContent = 'Error: ' +
                    error.message;
            }

            
        }

        window.onload = function() {
            obtenerDni();
            obtenerMatriculas();
        };
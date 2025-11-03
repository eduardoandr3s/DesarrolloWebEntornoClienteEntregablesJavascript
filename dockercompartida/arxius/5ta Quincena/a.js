        async function obtenerDni() {
            const usuario = 'admin';
            const contrasena = 'admin';
            const credenciales = btoa(`${usuario}:${contrasena}`); //base64
            const clientes = [];
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
                var html = "";
                if (datos && datos.clientes) {
                
                    clientes.push(...datos.clientes.dni);
                    document.getElementById('resultado').innerHTML = html;
                    return clientes;
                } else {
                    throw new Error('El documento no cuenta con la propiedad "clientes".');
                }

            } catch (error) {
                document.getElementById('resultado').textContent = 'Error: ' +
                    error.message;
            }
        }
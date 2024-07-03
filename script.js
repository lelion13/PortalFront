document.addEventListener('DOMContentLoaded', () => {
    // Función para obtener los parámetros de la URL
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const paramPairs = queryString.split("&");
        paramPairs.forEach(pair => {
            const [key, value] = pair.split("=");
            params[key] = decodeURIComponent(value);
        });
        return params;
    }

    const params = getQueryParams();
    const paciente_dni = params.dni; // Obtén el DNI de los parámetros de la URL
    const paciente_fecha_nacimiento = params.fecha_nacimiento; // Obtén la fecha de nacimiento de los parámetros de la URL
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlwYWNpZW50ZSIsInVzZXJfaWQiOjF9.J_c_EG1KIAB_BZa0Wv-b-yAW12yUSXpYubb-nDB2LKQ';  // Reemplaza esto con tu token

    //const paciente_dni = 29090084
    //const paciente_fecha_nacimiento = "1981-09-08"
    
    fetch(`https://apipaciente.clinicamg.com.ar:8000/paciente/is?fecha_nacimiento=${paciente_fecha_nacimiento}&dni=${paciente_dni}`, {

        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        //document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        const paciente = data.paciente[0];

        document.querySelector('input[name="id"]').value = paciente.id || '';
        document.querySelector('input[name="nombre"]').value = paciente.nombre || '';
        document.querySelector('input[name="apellido"]').value = paciente.apellido || '';
        document.querySelector('input[name="dni"]').value = paciente.numero_documento || '';
        document.querySelector('input[name="telefono"]').value = paciente.telefono_celular || '';
        document.querySelector('input[name="email"]').value = paciente.email || '';

        // Actualizar el avatar y los datos del paciente en el nav
        const userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = `
            <img src="https://static.vecteezy.com/system/resources/previews/013/019/904/non_2x/a-man-drinking-water-healty-and-sport-concept-vector.jpg" alt="Avatar">
            <span class="user-name">${paciente.nombre} ${paciente.apellido}</span>`;
    })
    .catch(error => {
        console.error('Error:', error);
        console.log('Detalles del error:', error);
        document.getElementById('error').innerText = `Error: ${error.message}`;
    });
});


//turno
document.getElementById('fetchButton').addEventListener('click', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlwYWNpZW50ZSIsInVzZXJfaWQiOjF9.J_c_EG1KIAB_BZa0Wv-b-yAW12yUSXpYubb-nDB2LKQ';  // Reemplaza esto con tu token
    const contacto_variable = '3'
    const specialtySelect = document.getElementById('especialidad');
    const specialtyCode = specialtySelect.value;
    fetch(`https://apipaciente.clinicamg.com.ar:8000/turnos/primer?especialidad_id=${specialtyCode}`, {

        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';  // Limpiar el contenedor

        const turnos = data.turnos;

        if (turnos.length === 0) {
        resultDiv.innerHTML = '<p>No hay turnos disponibles para esta especialidad.</p>';
    } else {
        turnos.forEach(turno => {
            const turnoDiv = document.createElement('div');
            turnoDiv.classList.add('turno-item');  // Agregar una clase para cada turno
            turnoDiv.innerHTML = `
                <h3>${turno.nombre}</h3>
                <p><strong>Fecha:</strong> ${turno.fecha}</p>
                <p><strong>Hora:</strong> ${turno.hora}</p>
                <p><strong>Profesional:</strong> ${turno.profesional}</p>
                <p><strong>Especialidad:</strong> ${turno.especialidad}</p>
                <p><strong>Establecimiento:</strong> ${turno.establecimiento}</p>
                <button class="select-turno-btn" data-id="${turno.id_horario}">Seleccionar Turno</button>  // Agregar un botón para seleccionar el turno
                <hr>
            `;
            resultDiv.appendChild(turnoDiv);
        });

        // Añadir evento click para los botones de selección de turno
        document.querySelectorAll('.select-turno-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const turnoId = btn.getAttribute('data-id');
                alert(`Has seleccionado el turno con ID: ${turnoId}`);
                // Aquí podrías realizar más acciones como mostrar detalles adicionales o reservar el turno
            });
        });
    }
})
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error').innerText = `Error: ${error.message}`;
    });
});
// otro js
document.getElementById('busqueda_paciente_is').addEventListener('click', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlwYWNpZW50ZSIsInVzZXJfaWQiOjF9.J_c_EG1KIAB_BZa0Wv-b-yAW12yUSXpYubb-nDB2LKQ';  // Reemplaza esto con tu token

    const paciente_dni = 29090084
    const paciente_fecha_nacimiento = "1981-09-08"
    
    fetch(`https://apipaciente.clinicamg.com.ar:8000/paciente/is?fecha_nacimiento=${paciente_fecha_nacimiento}&dni=${paciente_dni}`, {

        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        const paciente = data.paciente[0];
        document.querySelector('input[name="id"]').value = paciente.id || '';
        document.querySelector('input[name="nombre"]').value = paciente.nombre || '';
        document.querySelector('input[name="apellido"]').value = paciente.apellido || '';
        document.querySelector('input[name="dni"]').value = paciente.numero_documento || '';
        document.querySelector('input[name="telefono"]').value = paciente.telefono_celular || '';
        document.querySelector('input[name="email"]').value = paciente.email || '';
    })
    .catch(error => {
        console.error('Error:', error);
        console.log('Detalles del error:', error);
        document.getElementById('error').innerText = `Error: ${error.message}`;
    });
});

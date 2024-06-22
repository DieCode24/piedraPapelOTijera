/* --------------------------------------------------
● Fecha y Hora de publicación: [21/06/2024]
● Versión de su código: [0.1]
● Autores: Diego Alejandro Giraldo Ascencio, Rodrigo García
● Nombre del lenguaje utilizado: [JavaScript]
● Versión del lenguaje utilizado: [ECMAScript 6]
● Universidad Tecnológica de Pereira
● Programa de Ingeniería de Sistemas y Computación
● Cuarta (IV) cohorte Coding BootCamp FullStack
-------------------------------------------------- */

/* --------------------------------------------------
● Descripción del programa:
Este programa es un Juego Interactivo "Piedra, Papel o Tijera" con el uso de las tecnologias HTML, CSS y JS (Vanilla)

● Salvedades:
1. Se asegura el funcionamiento del programa ejecutandolo con un servidor local pero en algun navegador.
-------------------------------------------------- */

// Variables globales que manejan el estado del juego
let intentosRestantes = 0; // Número de intentos restantes
let modoDeJuego = 'maquina'; // Modo de juego: 'maquina' o 'jugador'
let puntajeJugador1 = 0; // Puntaje del Jugador 1
let puntajeJugador2 = 0; // Puntaje del Jugador 2 o de la Máquina
let turnoJugador1 = true; // Indica de quién es el turno en el modo de 2 jugadores
let seleccionJugador1 = ''; // Opción seleccionada por el Jugador 1 en el modo de 2 jugadores
const opciones = ['piedra', 'papel', 'tijera']; // Opciones del juego

// Asignación de eventos a los botones de la interfaz
document.getElementById('iniciarJuego').addEventListener('click', iniciarJuego);
document.getElementById('modoMaquina').addEventListener('click', () => elegirModo('maquina'));
document.getElementById('modoJugador').addEventListener('click', () => elegirModo('jugador'));
document.getElementById('reiniciarJuego').addEventListener('click', reiniciarJuego);

// Función para iniciar el juego
function iniciarJuego() {
    intentosRestantes = parseInt(document.getElementById('numIntentos').value); // Obtiene el número de intentos del input
    // Oculta las secciones de configuración y selección de modo de juego, y muestra el área de juego
    document.querySelector('.configuracion').style.display = 'none';
    document.querySelector('.modo-juego').style.display = 'none';
    document.getElementById('areaJuego').style.display = 'block';
    document.querySelector('.puntajes').style.display = 'block';
    reiniciarPuntajes(); // Reinicia los puntajes a cero
    actualizarInterfazTurno(); // Actualiza la interfaz según el turno actual
    asignarEventosOpciones(); // Asigna eventos a los botones de opciones (piedra, papel, tijera)
}

// Función para elegir el modo de juego
function elegirModo(modo) {
    modoDeJuego = modo; // Establece el modo de juego seleccionado
    if (modo === 'jugador') {
        // Cambia los títulos de la interfaz para el modo de 2 jugadores
        document.getElementById('tituloJugador2').textContent = 'Jugador 2';
        document.getElementById('tituloPuntajeJugador2').textContent = 'Jugador 2:';
    } else {
        // Cambia los títulos de la interfaz para el modo contra la máquina
        document.getElementById('tituloJugador2').textContent = 'Máquina';
        document.getElementById('tituloPuntajeJugador2').textContent = 'Máquina:';
    }
}

// Función para asignar eventos a los botones de opciones
function asignarEventosOpciones() {
    document.querySelectorAll('.opcion').forEach(boton => {
        boton.addEventListener('click', seleccionarOpcion); // Asigna la función seleccionarOpcion a cada botón
    });
}

// Función que maneja la selección de una opción (piedra, papel, tijera)
function seleccionarOpcion(event) {
    if (intentosRestantes <= 0) {
        alert('El juego ha terminado. Reinicie para jugar de nuevo.'); // Muestra alerta si el juego ha terminado
        return;
    }

    const opcionSeleccionada = event.currentTarget.dataset.opcion; // Obtiene la opción seleccionada del atributo data-opcion

    if (modoDeJuego === 'maquina') {
        const opcionMaquina = opciones[Math.floor(Math.random() * opciones.length)]; // Selección aleatoria de la máquina
        procesarJugada(opcionSeleccionada, opcionMaquina); // Procesa la jugada con las opciones del jugador y la máquina
    } else if (modoDeJuego === 'jugador') {
        if (turnoJugador1) {
            seleccionJugador1 = opcionSeleccionada; // Guarda la selección del Jugador 1
            turnoJugador1 = false; // Cambia el turno al Jugador 2
            document.getElementById('textoResultado').textContent = `Jugador 1 eligió. Turno del Jugador 2.`; // Actualiza la interfaz
        } else {
            procesarJugada(seleccionJugador1, opcionSeleccionada); // Procesa la jugada con las opciones de ambos jugadores
            turnoJugador1 = true; // Cambia el turno al Jugador 1
        }
    }

    actualizarInterfazTurno(); // Actualiza la interfaz según el turno actual
}

// Función que procesa una jugada
function procesarJugada(opcion1, opcion2) {
    intentosRestantes--; // Decrementa el número de intentos restantes
    const resultado = determinarResultado(opcion1, opcion2); // Determina el resultado de la jugada
    mostrarResultado(opcion1, opcion2, resultado); // Muestra el resultado de la jugada
    actualizarPuntaje(resultado); // Actualiza los puntajes según el resultado

    if (intentosRestantes <= 0) {
        // Usamos setTimeout para asegurar que la interfaz se actualice antes de mostrar el alert
        setTimeout(() => {
            determinarGanador(); // Determina y muestra el ganador del juego
        }, 100);
    }
}

// Función que muestra el resultado de una jugada
function mostrarResultado(opcion1, opcion2, resultado) {
    document.getElementById('textoResultado').innerHTML = `Intentos restantes => ${intentosRestantes}<br><br>Jugador 1: ${opcion1}, ${modoDeJuego === 'jugador' ? 'Jugador 2' : 'Máquina'}: ${opcion2}.<br><br>${resultado}`;
    // Muestra las opciones seleccionadas y el resultado
}

// Función que determina el resultado de una jugada
function determinarResultado(opcion1, opcion2) {
    if (opcion1 === opcion2) {
        return 'Empate'; // Retorna 'Empate' si las opciones son iguales
    } else if (
        (opcion1 === 'piedra' && opcion2 === 'tijera') || 
        (opcion1 === 'papel' && opcion2 === 'piedra') || 
        (opcion1 === 'tijera' && opcion2 === 'papel')) {
        return 'Jugador 1 Gana'; // Retorna 'Jugador 1 Gana' si el Jugador 1 gana
    } else {
        return modoDeJuego === 'jugador' ? 'Jugador 2 Gana' : 'Máquina Gana'; // Retorna el ganador adecuado según el modo de juego
    }
}

// Función que actualiza los puntajes según el resultado de una jugada
function actualizarPuntaje(resultado) {
    if (resultado === 'Jugador 1 Gana') {
        puntajeJugador1++; // Incrementa el puntaje del Jugador 1
    } else if (resultado === 'Jugador 2 Gana' || resultado === 'Máquina Gana') {
        puntajeJugador2++; // Incrementa el puntaje del Jugador 2 o la Máquina
    }
    // Actualiza los puntajes en la interfaz
    document.getElementById('puntajeJugador1').textContent = puntajeJugador1;
    document.getElementById('puntajeJugador2').textContent = puntajeJugador2;
}

// Función que determina y muestra el ganador del juego
function determinarGanador() {
    let mensaje = '';
    if (puntajeJugador1 > puntajeJugador2) {
        mensaje = 'Jugador 1 es el ganador!'; // Mensaje si el Jugador 1 gana
    } else if (puntajeJugador1 < puntajeJugador2) {
        mensaje = modoDeJuego === 'jugador' ? 'Jugador 2 es el ganador!' : 'La Máquina es el ganador!'; // Mensaje si el Jugador 2 o la Máquina gana
    } else {
        mensaje = 'Es un empate!'; // Mensaje si hay empate
    }
    alert(mensaje); // Muestra el mensaje del ganador
}

// Función que reinicia el juego recargando la página
function reiniciarJuego() {
    location.reload(); // Recarga la página para reiniciar el juego
}

// Función que reinicia los puntajes a cero
function reiniciarPuntajes() {
    puntajeJugador1 = 0;
    puntajeJugador2 = 0;
    // Actualiza los puntajes en la interfaz
    document.getElementById('puntajeJugador1').textContent = puntajeJugador1;
    document.getElementById('puntajeJugador2').textContent = puntajeJugador2;
}

// Función que actualiza la interfaz según el turno actual y el modo de juego
function actualizarInterfazTurno() {
    const botonesJugador1 = document.querySelectorAll('#jugador1 .opcion');
    const botonesJugador2 = document.querySelectorAll('#jugador2 .opcion');

    if (modoDeJuego === 'jugador') {
        // Modo de juego de 2 jugadores
        document.getElementById('jugador1').style.opacity = turnoJugador1 ? '1' : '0.5';
        document.getElementById('jugador2').style.opacity = turnoJugador1 ? '0.5' : '1';

        // Habilita o deshabilita los botones según el turno
        botonesJugador1.forEach(boton => {
            boton.disabled = !turnoJugador1;
            boton.style.pointerEvents = turnoJugador1 ? 'auto' : 'none';
        });

        botonesJugador2.forEach(boton => {
            boton.disabled = turnoJugador1;
            boton.style.pointerEvents = turnoJugador1 ? 'none' : 'auto';
        });
    } else {
        // Modo de juego contra la máquina
        document.getElementById('jugador1').style.opacity = '1';
        document.getElementById('jugador2').style.opacity = '1';

        // Habilita los botones del Jugador 1 y deshabilita los del Jugador 2
        botonesJugador1.forEach(boton => {
            boton.disabled = false;
            boton.style.pointerEvents = 'auto';
        });

        botonesJugador2.forEach(boton => {
            boton.disabled = true;
            boton.style.pointerEvents = 'none';
        });
    }
}


// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene una referencia al elemento de entrada por su ID
    var numIntentosInput = document.getElementById('numIntentos');

    // Agrega un evento de escucha para el evento 'input'
    // Este evento se dispara cada vez que el valor del input cambia
    numIntentosInput.addEventListener('input', function() {
        // Obtiene el valor actual del input
        var value = this.value;
        
        // Utiliza una expresión regular para eliminar cualquier carácter que no sea un número
        // El patrón /[^0-9]/g coincide con cualquier carácter que no sea un dígito
        // La 'g' al final hace que la sustitución sea global (en toda la cadena)
        value = value.replace(/[^0-9]/g, '');
        
        // Convierte la cadena resultante a un número entero
        // Si la cadena está vacía, parseInt() devolverá NaN
        value = parseInt(value);
        
        // Verifica si el valor está dentro del rango permitido
        if (isNaN(value) || value < 1) {
            // Si el valor no es un número o es menor que 1, lo establece en 1
            value = 1;
        } else if (value > 10) {
            // Si el valor es mayor que 10, lo establece en 10
            value = 10;
        }
        
        // Actualiza el valor del input con el número válido
        this.value = value;
    });

    // Previene el uso de la rueda del ratón para cambiar el valor
    // Algunos navegadores permiten cambiar el valor de inputs numéricos con la rueda del ratón
    numIntentosInput.addEventListener('wheel', function(e) {
        // Previene el comportamiento por defecto del evento
        e.preventDefault();
    });
});
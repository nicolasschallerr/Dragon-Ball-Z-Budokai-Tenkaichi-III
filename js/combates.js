import {
  personajesSeleccionados,
  cargarPersonajesSeleccionados,
  renderizarPersonajes,
} from "./personajes.js";

// Elementos del DOM
const movimientosContenedor = document.createElement("div");
movimientosContenedor.id = "movimientos-combate";
document.body.appendChild(movimientosContenedor);
const contenedorHistorial = document.getElementById("historial-combates");
const contenedorMovimientos = document.getElementById("movimientos");

// Funciones principales del combate
function atacar(atacante, defensor) {
  const daño = Math.max(atacante.ataque - defensor.defensa, 1);
  defensor.defensa = Math.max(defensor.defensa - daño, 0);
  return {
    atacante: atacante.nombre,
    defensor: defensor.nombre,
    daño,
    defensaRestante: defensor.defensa,
  };
}

function combate(personaje1, personaje2) {
  const turnos = [];
  let contadorTurnos = 0;

  while (
    personaje1.defensa > 0 &&
    personaje2.defensa > 0 &&
    contadorTurnos < 10
  ) {
    turnos.push(atacar(personaje1, personaje2));
    contadorTurnos++;
    if (personaje2.defensa <= 0) return { ganador: personaje1.nombre, turnos };

    turnos.push(atacar(personaje2, personaje1));
    contadorTurnos++;
    if (personaje1.defensa <= 0) return { ganador: personaje2.nombre, turnos };
  }

  return {
    ganador: personaje1.defensa > 0 ? personaje1.nombre : personaje2.nombre,
    turnos,
  };
}

export function realizarCombate(personaje1, personaje2) {
  const resultado = combate(personaje1, personaje2);
  if (resultado && resultado.turnos && resultado.ganador) {
    guardarResultadosCombate([{ ronda: 1, ...resultado }]);
    mostrarPrimerosMovimientos(resultado.turnos);
  }
  return resultado;
}

function guardarResultadosCombate(combates) {
  const historial = JSON.parse(localStorage.getItem("historialCombates")) || [];
  historial.push(...combates);
  localStorage.setItem("historialCombates", JSON.stringify(historial));
}

// Funciones para mostrar información
function mostrarHistorialCombates() {
  const historial = JSON.parse(localStorage.getItem("historialCombates")) || [];
  contenedorHistorial.innerHTML = "<h3>Historial de Combates</h3>";

  historial.forEach((combate, index) => {
    const rondaDiv = document.createElement("div");
    rondaDiv.innerHTML = `<h4>Combate ${index + 1}: Ganador - ${
      combate.ganador
    }</h4>`;
    combate.turnos.forEach((turno, tIndex) => {
      const turnoP = document.createElement("p");
      turnoP.textContent = `Turno ${tIndex + 1}: ${turno.atacante} atacó a ${
        turno.defensor
      } y causó ${turno.daño} de daño. Defensa restante de ${turno.defensor}: ${
        turno.defensaRestante
      }`;
      rondaDiv.appendChild(turnoP);
    });
    contenedorHistorial.appendChild(rondaDiv);
  });
}

function mostrarPrimerosMovimientos(turnos) {
  contenedorMovimientos.innerHTML = "<h3>Primeros 10 Movimientos</h3>";
  turnos.forEach((turno, index) => {
    const turnoDiv = document.createElement("div");
    turnoDiv.innerHTML = `<p>Turno ${index + 1}: ${turno.atacante} atacó a ${
      turno.defensor
    } y causó ${turno.daño} de daño. Defensa restante de ${turno.defensor}: ${
      turno.defensaRestante
    }</p>`;
    contenedorMovimientos.appendChild(turnoDiv);
  });
}

function limpiarSeleccion() {
  personajesSeleccionados.length = 0;
  sessionStorage.removeItem("personajesSeleccionados");

  const botonIniciarCombate = document.getElementById("iniciar-combate");
  botonIniciarCombate.disabled = true;
  renderizarPersonajes();
}

function reiniciarHistorial() {
  localStorage.removeItem("historialCombates");
  mostrarHistorialCombates();
}

// Función para iniciar el combate
function iniciarCombate() {
  if (personajesSeleccionados.length !== 2) {
    Swal.fire("Selecciona dos personajes para iniciar el combate.");
    return;
  }

  const [personaje1, personaje2] = personajesSeleccionados;
  realizarCombate(personaje1, personaje2);
}

// Manejo de eventos
document.addEventListener("DOMContentLoaded", () => {
  renderizarPersonajes();
  personajesSeleccionados.push(...cargarPersonajesSeleccionados());

  if (typeof mostrarHistorialCombates === "function") {
    mostrarHistorialCombates();
  } else {
    console.warn("mostrarHistorialCombates no está definida.");
  }

  // Botones de para inicar combate, volver a elegir personajes y borrar combate
  document
    .getElementById("iniciar-combate")
    .addEventListener("click", iniciarCombate);
  document
    .getElementById("limpiar-seleccion")
    .addEventListener("click", limpiarSeleccion);
  document
    .getElementById("reiniciar-historial")
    .addEventListener("click", reiniciarHistorial);
});

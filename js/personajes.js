export class Personaje {
  static id = 0;
  constructor(nombre, ataque, defensa, imagen = null) {
    this.id = ++Personaje.id;
    this.nombre = nombre;
    this.ataque = ataque;
    this.defensa = defensa;
    this.defensaInicial = defensa;
    this.imagen = imagen;
    this.activarPoderEspecial();
  }

  activarPoderEspecial() {
    setTimeout(() => {
      this.ataque *= 1.5;
      console.log(
        `${this.nombre} ha activado su poder especial! Su ataque ha aumentado a ${this.ataque}.`
      );
    }, 30000);
  }

  recuperar() {
    this.defensa += 10;
  }

  esquivar() {
    return Math.random() > 0.5;
  }

  mostrarDetalles() {
    return `${this.nombre}: Ataque = ${this.ataque}, Defensa = ${this.defensa}`;
  }
}

export let personajesInstanciados = [];

export async function cargarPersonajes() {
  try {
    const respuesta = await fetch("db/personajes.json");
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON");

    const personajesArray = await respuesta.json();
    personajesInstanciados = personajesArray.map(
      (personaje) =>
        new Personaje(
          personaje.nombre,
          personaje.ataque,
          personaje.defensa,
          personaje.imagen
        )
    );

    renderizarPersonajes();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al cargar los personajes",
    });
  }
}

export function renderizarPersonajes() {
  const contenedor = document.querySelector("#personajes-section .row");
  contenedor.innerHTML = "";

  personajesInstanciados.forEach((personaje) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
      <div class="card text-bg-dark h-100">
        ${
          personaje.imagen
            ? `<img src="${personaje.imagen}" class="card-img-top" alt="${personaje.nombre}">`
            : ""
        }
        <div class="card-body">
          <h5 class="card-title">${personaje.nombre}</h5>
          <p class="card-text">Ataque: ${personaje.ataque} | Defensa: ${
      personaje.defensa
    }</p>
          <button class="btn btn-primary seleccionar-btn" data-id="${
            personaje.id
          }">Seleccionar</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  document.querySelectorAll(".seleccionar-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = parseInt(event.target.dataset.id, 10);
      seleccionarPersonaje(id);
    });
  });
}

export const personajesSeleccionados = [];

export function seleccionarPersonaje(id) {
  const personaje = personajesInstanciados.find((p) => p.id === id);

  if (personaje && personajesSeleccionados.length < 2) {
    personajesSeleccionados.push(personaje);
    Swal.fire(`${personaje.nombre} ha sido seleccionado!`);
    guardarPersonajesSeleccionados();
  } else if (personajesSeleccionados.length >= 2) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ya has seleccionado el máximo de personajes.",
    });
  }
}

export function guardarPersonajesSeleccionados() {
  sessionStorage.setItem(
    "personajesSeleccionados",
    JSON.stringify(personajesSeleccionados)
  );
}

export function cargarPersonajesSeleccionados() {
  const data = sessionStorage.getItem("personajesSeleccionados");
  return data ? JSON.parse(data) : [];
}

cargarPersonajes();

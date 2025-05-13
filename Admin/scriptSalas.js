let editIndex = null;

// Mostrar salas al cargar
document.addEventListener("DOMContentLoaded", () => {
  renderSalas();
  cargarPeliculas(); // carga las opciones de películas al inicio
});

function obtenerSalas() {
  return JSON.parse(localStorage.getItem("salas")) || [];
}

function guardarSalas(salas) {
  localStorage.setItem("salas", JSON.stringify(salas));
}

function obtenerPeliculas() {
  return JSON.parse(localStorage.getItem("peliculas")) || [];
}

function cargarPeliculas() {
  const select = document.getElementById("peliculaSala");
  select.innerHTML = '<option value="">-- Sin película asignada --</option>';
  
  const peliculas = obtenerPeliculas();
  peliculas.forEach((pelicula, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = pelicula.titulo;
    select.appendChild(option);
  });
}

function renderSalas() {
  const contenedor = document.getElementById("listaSalas");
  const salas = obtenerSalas();
  const peliculas = obtenerPeliculas();
  
  contenedor.innerHTML = "";

  salas.forEach((sala, index) => {
    const card = document.createElement("div");
    card.classList.add("sala");

    const peliculaNombre = sala.peliculaId !== null && peliculas[sala.peliculaId]
      ? peliculas[sala.peliculaId].titulo
      : "Ninguna";

    card.innerHTML = `
      <h3>${sala.nombre}</h3>
      <p><strong>Capacidad:</strong> ${sala.capacidad}</p>
      <p><strong>Tipo:</strong> ${sala.tipo}</p>
      <p><strong>Ubicación:</strong> ${sala.ubicacion}</p>
      <p><strong>Estado:</strong> ${sala.estado}</p>
      <p><strong>Película:</strong> ${peliculaNombre}</p>
      <button onclick="editarSala(${index})">Editar</button>
      <button onclick="eliminarSala(${index})">Eliminar</button>
    `;

    contenedor.appendChild(card);
  });
}

function eliminarSala(index) {
  const salas = obtenerSalas();
  salas.splice(index, 1);
  guardarSalas(salas);
  renderSalas();
}

function editarSala(index) {
  const salas = obtenerSalas();
  const sala = salas[index];

  document.getElementById("nombreSala").value = sala.nombre;
  document.getElementById("capacidad").value = sala.capacidad;
  document.getElementById("tipoSala").value = sala.tipo;
  document.getElementById("ubicacion").value = sala.ubicacion;
  document.getElementById("estado").value = sala.estado;
  document.getElementById("peliculaSala").value = sala.peliculaId !== null ? sala.peliculaId : "";

  editIndex = index;
}

// Al cambiar el estado, si es inactiva, limpiamos el select de película
document.getElementById("estado").addEventListener("change", function () {
  const estado = this.value;
  if (estado === "inactiva") {
    document.getElementById("peliculaSala").value = "";
  }
});

document.getElementById("formSala").addEventListener("submit", e => {
  e.preventDefault();

  const estadoSala = document.getElementById("estado").value;
  const peliculaSeleccionada = document.getElementById("peliculaSala").value;

  const nuevaSala = {
    nombre: document.getElementById("nombreSala").value,
    capacidad: document.getElementById("capacidad").value,
    tipo: document.getElementById("tipoSala").value,
    ubicacion: document.getElementById("ubicacion").value,
    estado: estadoSala,
    peliculaId: estadoSala === "activa" && peliculaSeleccionada !== "" ? parseInt(peliculaSeleccionada) : null
  };

  let salas = obtenerSalas();

  if (editIndex !== null) {
    salas[editIndex] = nuevaSala;
    editIndex = null;
  } else {
    salas.push(nuevaSala);
  }

  guardarSalas(salas);
  e.target.reset();
  renderSalas();
});

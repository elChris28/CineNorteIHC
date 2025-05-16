let editIndex = null;
let horariosTemp = [];

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
    // 🧩 Aquí va la línea que aplicará clases de Bootstrap a la tarjeta
    card.classList.add("card", "p-3", "mb-4", "shadow-sm", "text-center");

    const peliculaNombre = sala.peliculaId !== null && peliculas[sala.peliculaId]
      ? peliculas[sala.peliculaId].titulo
      : "Ninguna";

    card.innerHTML = `
      <h4 class="mb-2">${sala.nombre}</h4>
      <p><strong>Capacidad:</strong> ${sala.capacidad}</p>
      <p><strong>Tipo:</strong> ${sala.tipo}</p>
      <p><strong>Ubicación:</strong> ${sala.ubicacion}</p>
      <p><strong>Estado:</strong> ${sala.estado}</p>
      <p><strong>Película:</strong> ${peliculaNombre}</p>
      <p><strong>Horarios:</strong> ${sala.horarios?.join(", ") || "Sin horarios"}</p>
      <div class="mt-2">
        <button class="btn btn-sm btn-primary me-2" onclick="editarSala(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarSala(${index})">Eliminar</button>
      </div>
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
  horariosTemp = sala.horarios || [];
  renderHorariosTemp();

  document.getElementById("nombreSala").value = sala.nombre;
  document.getElementById("capacidad").value = sala.capacidad;
  document.getElementById("tipoSala").value = sala.tipo;
  document.getElementById("ubicacion").value = sala.ubicacion;
  document.getElementById("estado").value = sala.estado;
  document.getElementById("peliculaSala").value = sala.peliculaId !== null ? sala.peliculaId : "";

  editIndex = index;
}

function agregarHorario() {
  const input = document.getElementById("inputHorario");
  const valor = input.value;

  if (valor && !horariosTemp.includes(valor)) {
    horariosTemp.push(valor);
    renderHorariosTemp();
    input.value = "";
  }
}

function renderHorariosTemp() {
  const contenedor = document.getElementById("listaHorarios");
  contenedor.innerHTML = "";

  horariosTemp.forEach((hora, index) => {
    const span = document.createElement("span");
    span.className = "badge bg-dark d-flex align-items-center";
    span.style.padding = "0.5rem 0.75rem";
    span.style.marginRight = "0.5rem";
    span.innerHTML = `${hora} <button class="btn-close btn-close-white ms-2" onclick="eliminarHorario(${index})"></button>`;
    contenedor.appendChild(span);
  });
}

function eliminarHorario(index) {
  horariosTemp.splice(index, 1);
  renderHorariosTemp();
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
    peliculaId: estadoSala === "activa" && peliculaSeleccionada !== "" ? parseInt(peliculaSeleccionada) : null,
    horarios: horariosTemp // <- ESTA es la válida
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
  horariosTemp = [];
  renderHorariosTemp();
  renderSalas();
});

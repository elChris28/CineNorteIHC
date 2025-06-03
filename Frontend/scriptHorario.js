window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

  const navLoginRegistro = document.getElementById('navLoginRegistro');
  const navUsuarioActivo = document.getElementById('navUsuarioActivo');
  const nombreUsuario = document.getElementById('nombreUsuario');
  const cerrarSesionBtn = document.getElementById('cerrarSesion');

  if (usuarioActivo) {
    navLoginRegistro.style.display = 'none';
    navUsuarioActivo.style.display = 'flex';
    nombreUsuario.textContent = `${usuarioActivo.nombre || usuarioActivo.correo}`;
  } else {
    navLoginRegistro.style.display = 'flex';
    navUsuarioActivo.style.display = 'none';
  }

  cerrarSesionBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioActivo');
    window.location.href = '/index.html';
  });

  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  const salas = JSON.parse(localStorage.getItem("salas")) || [];

  const contenedor = document.getElementById("contenedorHorarios");
  const template = document.getElementById("templatePelicula");

  contenedor.innerHTML = "";

  peliculas.forEach((pelicula, index) => {
    const salasAsociadas = salas.filter(s => s.peliculaId === index);
    if (salasAsociadas.length === 0) return;

    // Clonar el template
    const clone = template.content.cloneNode(true);
    clone.querySelector(".poster").src = pelicula.poster;
    clone.querySelector(".titulo").textContent = pelicula.titulo;
    clone.querySelector(".sinopsis").textContent = pelicula.sinopsis || "-";
    clone.querySelector(".idioma").textContent = pelicula.idioma || "-";
    clone.querySelector(".disponibilidad").textContent = (pelicula.disponibilidad || []).join(", ") || "-";

    const horariosContainer = clone.querySelector(".horarios-container");

    salasAsociadas.forEach(sala => {
      const bloqueSala = document.createElement("div");
      bloqueSala.className = "mb-2";
      bloqueSala.innerHTML = `<strong>${sala.nombre} (${sala.tipo})</strong><br/>`;

      (sala.horarios || []).forEach(h => {
        const btn = document.createElement("button");
        btn.className = "btn btn-sm btn-outline-primary me-2 mb-2";
        btn.textContent = h;

btn.addEventListener("click", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuarioActivo) {
    alert("Debes iniciar sesión para reservar un asiento.");
    return;
  }

  const reserva = {
    sala: { nombre: sala.nombre },
    peliculaId: sala.peliculaId,
    horario: h
  };
  localStorage.setItem("reservaSeleccionada", JSON.stringify(reserva));
  window.location.href = "ReservarAsiento.html";
});

        bloqueSala.appendChild(btn);
      });

      horariosContainer.appendChild(bloqueSala);
    });

    contenedor.appendChild(clone);
  });
});
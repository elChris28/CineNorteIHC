window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const reserva = JSON.parse(localStorage.getItem("reservaSeleccionada"));
  const salas = JSON.parse(localStorage.getItem("salas")) || [];
  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

  if (!reserva) {
    alert("No se encontró la reserva.");
    window.location.href = "horarios.html";
    return;
  }

  const sala = salas.find(
    s => s.peliculaId === reserva.peliculaId && s.nombre.toLowerCase() === reserva.sala.nombre.toLowerCase()
  );

  if (!sala) {
    alert("Sala no encontrada.");
    return;
  }

  const pelicula = peliculas[reserva.peliculaId];

  // 🧩 Rellenar los datos en el HTML existente
  document.getElementById("poster").src = pelicula.poster;
  document.getElementById("poster").alt = pelicula.titulo;
  document.getElementById("titulo").textContent = pelicula.titulo;
  document.getElementById("idioma").textContent = `${pelicula.idioma}, ${sala.tipo.toUpperCase()}`;
  document.getElementById("fecha").textContent = new Date().toLocaleDateString("es-PE", {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  document.getElementById("hora").textContent = reserva.horario;
  document.getElementById("sala").textContent = sala.nombre;
  document.getElementById("interfazAsientos").innerHTML = sala.interfaz;

  // 🎯 Lógica para manejar selección de asientos
  const asientos = sala.asientos || [];
  const divsAsientos = document.querySelectorAll("#interfazAsientos .asiento");
  const seleccionados = new Set();
  const btnConfirmar = document.getElementById("confirmarReserva");

  divsAsientos.forEach((div, i) => {
    if (asientos[i]?.tipo === "ocupado") {
      div.classList.add("ocupada");
      div.style.pointerEvents = "none";
    } else if (asientos[i]?.tipo === "discapacitado") {
      div.classList.add("silla");
      div.style.pointerEvents = "none";
    } else {
      div.classList.add("disponible");
      div.addEventListener("click", () => {
        if (seleccionados.has(i)) {
          seleccionados.delete(i);
          div.classList.remove("seleccionada");
        } else {
          seleccionados.add(i);
          div.classList.add("seleccionada");
        }
        btnConfirmar.disabled = seleccionados.size === 0;
      });
    }
  });

  // Confirmar reserva
  btnConfirmar.addEventListener("click", () => {
    if (seleccionados.size === 0) {
      alert("Debes seleccionar al menos un asiento.");
      return;
    }

    // Marcar los asientos como ocupados
    seleccionados.forEach(i => {
      asientos[i].tipo = "ocupado";
    });

    sala.asientos = asientos;
    sala.interfaz = generarHTMLInterfaz(asientos);

    const indexSala = salas.findIndex(
      s => s.nombre.toLowerCase() === sala.nombre.toLowerCase() && s.peliculaId === reserva.peliculaId
    );
    salas[indexSala] = sala;

    localStorage.setItem("salas", JSON.stringify(salas));

    alert("¡Reserva confirmada!");
    window.location.href = "Inicio.html";
  });
});

function generarHTMLInterfaz(asientos) {
  const filas = 10;
  const columnas = Math.ceil(asientos.length / filas);
  let html = `<div class="grid" style="display: grid; grid-template-columns: repeat(${columnas}, 26px); gap: 4px;">`;

  asientos.forEach((a, i) => {
    html += `<div class="asiento ${a.tipo}" title="Asiento ${i + 1}"></div>`;
  });

  html += `</div>`;
  return html;
}

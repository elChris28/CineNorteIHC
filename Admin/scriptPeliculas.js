let editIndex = null;
let imagenTemporal = null;


// Mostrar películas al cargar
document.addEventListener("DOMContentLoaded", renderPeliculas);

function obtenerPeliculas() {
  return JSON.parse(localStorage.getItem("peliculas")) || [];
}

function guardarPeliculas(peliculas) {
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
}

function renderPeliculas() {
  const contenedor = document.getElementById("listaPeliculas");
  const peliculas = obtenerPeliculas();

  contenedor.innerHTML = "";

  peliculas.forEach((pelicula, index) => {
    const card = document.createElement("div");

    // 🧩 Aquí va la línea que aplicará clases de Bootstrap a la tarjeta
    card.classList.add("card", "p-3", "mb-4", "shadow-sm", "text-center");

    card.innerHTML = `
      <img src="${pelicula.poster}" alt="${pelicula.titulo}" style="width: 100%; max-height: 250px; object-fit: cover;" />
      <h3>${pelicula.titulo}</h3>
      <p><strong>Género:</strong> ${pelicula.genero}</p>
      <p><strong>Duración:</strong> ${pelicula.duracion}</p>
      <p><strong>Clasificación:</strong> ${pelicula.clasificacion}</p>
      <p><strong>Idioma:</strong> ${pelicula.idioma || 'No definido'}</p>
      <p><strong>Disponibilidad:</strong> ${(pelicula.disponibilidad || []).join(", ") || 'Sin especificar'}</p>
      <p><strong>Sinopsis:</strong><br>${pelicula.sinopsis || 'Sin sinopsis'}</p>
      <div class="mt-2">
        ${pelicula.trailer ? `<a href="${pelicula.trailer}" target="_blank" class="btn btn-sm btn-secondary me-2">Ver Tráiler</a>` : ""}
        <button class="btn btn-sm btn-primary me-2" onclick="editarPelicula(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarPelicula(${index})">Eliminar</button>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

function eliminarPelicula(index) {
  const peliculas = obtenerPeliculas();
  peliculas.splice(index, 1);
  guardarPeliculas(peliculas);
  renderPeliculas();
}

function editarPelicula(index) {
  const peliculas = obtenerPeliculas();
  const p = peliculas[index];

  document.getElementById("titulo").value = p.titulo;
  document.getElementById("genero").value = p.genero;
  document.getElementById("duracion").value = p.duracion;
  document.getElementById("clasificacion").value = p.clasificacion;
  document.getElementById("idioma").value = p.idioma || "";
  document.getElementById("sinopsis").value = p.sinopsis || "";

  document.getElementById("2d").checked = p.disponibilidad?.includes("2D");
  document.getElementById("3d").checked = p.disponibilidad?.includes("3D");
  document.getElementById("vip").checked = p.disponibilidad?.includes("VIP");
  document.getElementById("imax").checked = p.disponibilidad?.includes("IMAX");
  document.getElementById("trailer").value = p.trailer || "";
  const preview = document.getElementById("previewPoster");
  preview.src = p.poster;
  preview.style.display = "block";

  imagenTemporal = p.poster;
  editIndex = index;
}

document.getElementById("formPelicula").addEventListener("submit", e => {
  e.preventDefault();

  const file = document.getElementById("poster").files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const posterData = file ? reader.result : imagenTemporal;

    const disponibilidad = [];
    if (document.getElementById("2d").checked) disponibilidad.push("2D");
    if (document.getElementById("3d").checked) disponibilidad.push("3D");
    if (document.getElementById("vip").checked) disponibilidad.push("VIP");
    if (document.getElementById("imax").checked) disponibilidad.push("IMAX");

    const nuevaPelicula = {
      titulo: document.getElementById("titulo").value,
      genero: document.getElementById("genero").value,
      duracion: document.getElementById("duracion").value,
      clasificacion: document.getElementById("clasificacion").value,
      idioma: document.getElementById("idioma").value,
      sinopsis: document.getElementById("sinopsis").value,
      trailer: document.getElementById("trailer").value,
      disponibilidad,
      poster: posterData
    };

    let peliculas = obtenerPeliculas();
    if (editIndex !== null) {
      peliculas[editIndex] = nuevaPelicula;
      editIndex = null;
      imagenTemporal = null;
    } else {
      peliculas.push(nuevaPelicula);
    }

    guardarPeliculas(peliculas);
    e.target.reset();
    document.getElementById("previewPoster").style.display = "none";
    renderPeliculas();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onload();
  }
});


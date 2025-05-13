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
    card.classList.add("pelicula");

    card.innerHTML = `
      <img src="${pelicula.poster}" alt="${pelicula.titulo}" />
      <h3>${pelicula.titulo}</h3>
      <p>${pelicula.genero} | ${pelicula.duracion} | ${pelicula.clasificacion}</p>
      <button onclick="editarPelicula(${index})">Editar</button>
      <button onclick="eliminarPelicula(${index})">Eliminar</button>
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
  const pelicula = peliculas[index];

  document.getElementById("titulo").value = pelicula.titulo;
  document.getElementById("genero").value = pelicula.genero;
  document.getElementById("duracion").value = pelicula.duracion;
  document.getElementById("clasificacion").value = pelicula.clasificacion;

  // Mostrar vista previa de la imagen actual
  const preview = document.getElementById("previewPoster");
  preview.src = pelicula.poster;
  preview.style.display = "block";

  imagenTemporal = pelicula.poster;
  editIndex = index;
}

document.getElementById("formPelicula").addEventListener("submit", e => {
  e.preventDefault();

  const fileInput = document.getElementById("poster");
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const posterData = file ? reader.result : imagenTemporal;

    const nuevaPelicula = {
      titulo: document.getElementById("titulo").value,
      genero: document.getElementById("genero").value,
      duracion: document.getElementById("duracion").value,
      clasificacion: document.getElementById("clasificacion").value,
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


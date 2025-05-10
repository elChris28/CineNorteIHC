document.addEventListener("DOMContentLoaded", () => {
  const listaPeliculas = document.getElementById("listaPeliculas");
  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

  peliculas.forEach(pelicula => {
    const peliculaDiv = document.createElement("div");
    peliculaDiv.classList.add("pelicula");

    peliculaDiv.innerHTML = `
      <img src="${pelicula.poster}" alt="${pelicula.titulo}">
      <div class="info">
        <h3>${pelicula.titulo}</h3>
        <p>${pelicula.genero} | ${pelicula.duracion}</p>
        <p>Clasificación: ${pelicula.clasificacion}</p>
      </div>
    `;

    listaPeliculas.appendChild(peliculaDiv);
  });
});

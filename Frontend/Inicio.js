document.addEventListener("DOMContentLoaded", () => {
  fetch("data/peliculas.json")
    .then(res => res.json())
    .then(data => {
      const contenedor = document.querySelector(".peliculas");
      contenedor.innerHTML = "";

      data.forEach(pelicula => {
        contenedor.innerHTML += `
          <div class="pelicula">
            <img src="${pelicula.poster}" alt="${pelicula.titulo}" />
            <h3>${pelicula.titulo}</h3>
            <p>${pelicula.genero} | ${pelicula.duracion} | ${pelicula.clasificacion}</p>
          </div>
        `;
      });
    });
});

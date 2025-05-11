document.addEventListener("DOMContentLoaded", () => {
  const listaPeliculas = document.getElementById("listaPeliculas");
  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

  peliculas.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

    col.innerHTML = `
    <div class="card h-100 bg-secondary text-white border-0 pelicula">
      <img src="${p.poster}" class="card-img-top" alt="${p.titulo}" style="height: 300px; object-fit: cover;">
      <div class="card-body text-center">
        <h5 class="card-title">${p.titulo}</h5>
        <p class="card-text">${p.genero} | ${p.duracion}</p>
        <p class="card-text"><small>Clasificación: ${p.clasificacion}</small></p>
      </div>
    </div>
  `;

    listaPeliculas.appendChild(col);
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});



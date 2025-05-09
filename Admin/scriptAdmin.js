document.getElementById("formPelicula").addEventListener("submit", async e => {
  e.preventDefault();

  const nuevaPelicula = {
    titulo: document.getElementById("titulo").value,
    genero: document.getElementById("genero").value,
    duracion: document.getElementById("duracion").value,
    clasificacion: document.getElementById("clasificacion").value,
    poster: document.getElementById("poster").value
  };

  // Simulación de escritura (esto necesita un backend real para funcionar)
  const peliculas = await fetch("../data/peliculas.json").then(res => res.json());
  peliculas.push(nuevaPelicula);

  await fetch("../data/peliculas.json", {
    method: "PUT", // no funcionará directamente desde el navegador, necesitas un backend
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(peliculas)
  });

  alert("Película agregada (simulado)");
});

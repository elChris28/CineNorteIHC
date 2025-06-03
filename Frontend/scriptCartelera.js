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


  const listaPeliculas = document.getElementById("listaPeliculas");
  const peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

  peliculas.forEach((p, index) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

    col.innerHTML = `
      <div class="card h-100 bg-secondary text-white border-0 pelicula position-relative overflow-hidden">
        <img src="${p.poster}" class="card-img-top" alt="${p.titulo}" style="height: 300px; object-fit: cover;">
        <div class="card-body text-center">
          <h5 class="card-title">${p.titulo}</h5>
          <p class="card-text">${p.genero} | ${p.duracion}</p>
          <p class="card-text"><small>Clasificación: ${p.clasificacion}</small></p>
        </div>
        <div class="botones-overlay position-absolute top-50 start-50 translate-middle text-center" style="display: none;">
          <a href="#" class="btn btn-danger btn-sm me-2 btn-comprar" data-index="${index}">Comprar</a>
          <a href="#" class="btn btn-light btn-sm text-dark btn-detalles" data-index="${index}">Más detalles</a>
        </div>
      </div>
    `;

    listaPeliculas.appendChild(col);
  });

  const tarjetas = document.querySelectorAll('.pelicula');
  tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('mouseenter', () => {
      const botones = tarjeta.querySelector('.botones-overlay');
      botones.style.display = 'block';
    });
    tarjeta.addEventListener('mouseleave', () => {
      const botones = tarjeta.querySelector('.botones-overlay');
      botones.style.display = 'none';
    });
  });
  
  document.querySelectorAll('.btn-detalles').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const index = btn.getAttribute('data-index');
      const peliculaSeleccionada = peliculas[index];
      localStorage.setItem("peliculaSeleccionada", JSON.stringify(peliculaSeleccionada));
      window.location.href = "detalles.html";
    });
  });

  document.querySelectorAll('.btn-comprar').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const index = btn.getAttribute('data-index');

    if (!usuarioActivo) {
      alert('Debes iniciar sesión para comprar entradas.');
    } else {
      window.location.href = `horarios.html?id=${index}`;
    }
  });
});
});
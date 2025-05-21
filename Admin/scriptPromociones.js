document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formPromocion');
  const contenedor = document.getElementById('contenedorPromociones');
  let promociones = JSON.parse(localStorage.getItem('promociones')) || [];

  let editando = false;
  let indiceEditar = null;

  function renderizarPromociones() {
    contenedor.innerHTML = '';
    promociones.forEach((promo, index) => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${promo.imagen}" class="card-img-top" alt="Imagen de la promoción">
          <div class="card-body">
            <h5 class="card-title">${promo.nombre}</h5>
            <p class="card-text">${promo.descripcion}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-primary btn-sm" onclick="editarPromocion(${index})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarPromocion(${index})">Eliminar</button>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(col);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagenInput = document.getElementById('imagen');
    const pdfInput = document.getElementById('pdf');

    function guardarPromocion(imagenBase64, pdfBase64) {
      const promocion = {
        nombre,
        descripcion,
        imagen: imagenBase64 || promociones[indiceEditar]?.imagen,
        pdf: pdfBase64 || promociones[indiceEditar]?.pdf
      };

      if (editando) {
        promociones[indiceEditar] = promocion;
        editando = false;
        indiceEditar = null;
        form.querySelector('button[type="submit"]').textContent = "Guardar Promoción";
      } else {
        promociones.push(promocion);
      }

      localStorage.setItem('promociones', JSON.stringify(promociones));
      renderizarPromociones();
      form.reset();
    }

    if (imagenInput.files.length > 0) {
      const readerImagen = new FileReader();
      readerImagen.onload = function () {
        const imagenBase64 = readerImagen.result;

        if (pdfInput.files.length > 0) {
          const readerPDF = new FileReader();
          readerPDF.onload = function () {
            const pdfBase64 = readerPDF.result;
            guardarPromocion(imagenBase64, pdfBase64);
          };
          readerPDF.readAsDataURL(pdfInput.files[0]);
        } else {
          guardarPromocion(imagenBase64, null);
        }
      };
      readerImagen.readAsDataURL(imagenInput.files[0]);
    } else if (pdfInput.files.length > 0) {
      const readerPDF = new FileReader();
      readerPDF.onload = function () {
        const pdfBase64 = readerPDF.result;
        guardarPromocion(null, pdfBase64);
      };
      readerPDF.readAsDataURL(pdfInput.files[0]);
    } else {
      guardarPromocion(null, null);
    }
  });

  window.eliminarPromocion = function (index) {
    if (confirm('¿Deseas eliminar esta promoción?')) {
      promociones.splice(index, 1);
      localStorage.setItem('promociones', JSON.stringify(promociones));
      renderizarPromociones();
    }
  };

  window.editarPromocion = function (index) {
    const promo = promociones[index];
    document.getElementById('nombre').value = promo.nombre;
    document.getElementById('descripcion').value = promo.descripcion;

    // No se pueden cargar archivos al input por seguridad
    editando = true;
    indiceEditar = index;

    form.querySelector('button[type="submit"]').textContent = "Actualizar Promoción";
  };

  renderizarPromociones();
});
let editIndex = null;
let imagenTemporal = null;

function obtenerDulces() {
    return JSON.parse(localStorage.getItem("dulceria")) || [];
}

function guardarDulces(data) {
    localStorage.setItem("dulceria", JSON.stringify(data));
}

function renderDulces() {
    const contenedor = document.getElementById("productosPorCategoria");
    const dulces = obtenerDulces();

    const categorias = ['Combos', 'Snacks', 'Bebidas', 'Otros'];
    contenedor.innerHTML = '';

    categorias.forEach(cat => {
        const items = dulces.filter(d => d.categoria === cat);
        if (items.length > 0) {
        const section = document.createElement("div");
        section.className = "mb-5";
        section.innerHTML = `<h3 class="text-danger mb-3">${cat}</h3>`;

        const row = document.createElement("div");
        row.className = "row";

        items.forEach((producto, index) => {
            const col = document.createElement("div");
            col.className = "col-md-4 col-lg-3 mb-4";

            col.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text fw-bold">S/. ${producto.precio.toFixed(2)}</p>
                <p class="card-text"><span class="badge bg-secondary">${producto.categoria}</span></p>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-sm btn-primary" onclick="editarDulce(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarDulce(${index})">Eliminar</button>
                </div>
                </div>
            </div>
            `;

            row.appendChild(col);
        });

        section.appendChild(row);
        contenedor.appendChild(section);
        }
    });
}

function eliminarDulce(index) {
    const dulces = obtenerDulces();
    dulces.splice(index, 1);
    guardarDulces(dulces);
    renderDulces();
}

function editarDulce(index) {
    const dulce = obtenerDulces()[index];
    document.getElementById("nombre").value = dulce.nombre;
    document.getElementById("descripcion").value = dulce.descripcion;
    document.getElementById("precio").value = dulce.precio;
    document.getElementById("categoria").value = dulce.categoria;

    // Vista previa de imagen
    document.getElementById("previewPoster")?.remove();
    const preview = document.createElement("img");
    preview.src = dulce.imagen;
    preview.id = "previewPoster";
    preview.style.maxWidth = "200px";
    preview.style.marginTop = "10px";
    preview.style.display = "block";
    document.getElementById("formDulce").appendChild(preview);

    imagenTemporal = dulce.imagen;
    editIndex = index;
}

document.getElementById("formDulce").addEventListener("submit", e => {
    e.preventDefault();

    const file = document.getElementById("imagen").files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const imagenFinal = file ? reader.result : imagenTemporal;

        const nuevoDulce = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: parseFloat(document.getElementById("precio").value),
        categoria: document.getElementById("categoria").value,
        imagen: imagenFinal
        };

        let dulces = obtenerDulces();

        if (editIndex !== null) {
        dulces[editIndex] = nuevoDulce;
        editIndex = null;
        imagenTemporal = null;
        } else {
        dulces.push(nuevoDulce);
        }

        guardarDulces(dulces);
        e.target.reset();
        document.getElementById("previewPoster")?.remove();
        renderDulces();
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        reader.onload(); // usa imagen existente si no se sube una nueva
    }
});

document.addEventListener("DOMContentLoaded", renderDulces);

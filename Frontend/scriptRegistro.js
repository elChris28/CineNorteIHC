document.getElementById('formRegistro').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  if (!nombre || !correo || !contrasena) {
    alert("Por favor completa todos los campos.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (usuarios.some(u => u.correo === correo)) {
    alert("Ya existe un usuario con ese correo.");
    return;
  }

  const nuevoUsuario = {
    nombre,
    correo,
    contrasena,
    rol: "cliente"
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  window.location.href = "../index.html";
});

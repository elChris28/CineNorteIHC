document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('error-message');

  // Usuarios base para pruebas
  const usuariosBase = [
    { correo: 'user@gmail.com', contrasena: 'user1', rol: 'cliente' },
    { correo: 'admin@gmail.com', contrasena: 'admin1', rol: 'admin' }
  ];

  // Cargar usuarios desde localStorage o crear el array si no existe
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Insertar usuarios base si no están aún
  usuariosBase.forEach(base => {
    const yaExiste = usuarios.some(u => u.correo === base.correo);
    if (!yaExiste) usuarios.push(base);
  });

  // Actualizar localStorage con los usuarios (si hubo cambios)
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  };

  const clearError = () => {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  };

  const redirectUser = (usuario) => {
    if (usuario.rol === 'admin') {
      window.location.href = 'Admin/admin.html';
    } else {
      window.location.href = 'Frontend/Inicio.html';
    }
  };

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    clearError();

    if (!username || !password) {
      showError('Por favor, complete todos los campos.');
      return;
    }

    const usuario = usuarios.find(
      u => u.correo === username && u.contrasena === password
    );

    if (usuario) {
      localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
      redirectUser(usuario);
    } else {
      showError('Usuario o contraseña incorrectos');
    }
  });
});
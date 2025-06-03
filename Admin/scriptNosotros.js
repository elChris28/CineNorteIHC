        const form = document.getElementById('form-nosotros');
        const editarBtn = document.getElementById('editarBtn');
        const guardarBtn = document.getElementById('guardarBtn');
        const inputs = form.querySelectorAll('input, textarea');

        // Cargar datos existentes desde localStorage
        const savedData = localStorage.getItem('nosotrosData');
        if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('descripcion').value = data.descripcion || '';
        document.getElementById('horarios').value = data.horarios || '';
        document.getElementById('mapa').value = data.mapa || '';
        document.getElementById('facebook').value = data.facebook || '';
        document.getElementById('instagram').value = data.instagram || '';
        document.getElementById('tiktok').value = data.tiktok || '';
        }

        // Habilitar edición
        editarBtn.addEventListener('click', () => {
        inputs.forEach(input => input.disabled = false);
        editarBtn.classList.add('d-none');
        guardarBtn.classList.remove('d-none');
        });

        // Guardar cambios
        form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = {
            descripcion: document.getElementById('descripcion').value,
            horarios: document.getElementById('horarios').value,
            mapa: document.getElementById('mapa').value,
            facebook: document.getElementById('facebook').value,
            instagram: document.getElementById('instagram').value,
            tiktok: document.getElementById('tiktok').value,
        };

        localStorage.setItem("nosotrosData", JSON.stringify(data));

        inputs.forEach(input => input.disabled = true);
        editarBtn.classList.remove('d-none');
        guardarBtn.classList.add('d-none');

        alert("Información actualizada correctamente");
        });
    window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
    });


    document.addEventListener("DOMContentLoaded", function () {
    const dataJSON = localStorage.getItem("nosotrosData");
    if (!dataJSON) return;

    const data = JSON.parse(dataJSON);

    document.getElementById("descripcion").innerText = data.descripcion || "Descripción no disponible";
    document.getElementById("horarios").innerText = data.horarios || "Horarios no disponibles";

    const mapaIframe = document.getElementById("mapaIframe");
    if (data.mapa && mapaIframe) {
        // Asegura que el enlace sea un embed válido
        let embedUrl = data.mapa;

        // Si es un enlace compartido normal, lo convertimos a embed
        if (!embedUrl.includes("/embed")) {
        const match = embedUrl.match(/!3d([\d.-]+)!4d([\d.-]+)/); // Coordenadas del link largo
        if (match) {
            const [_, lat, lng] = match;
            embedUrl = `https://www.google.com/maps/embed/v1/view?key=TU_API_KEY&center=${lat},${lng}&zoom=16`;
        } else {
            // Usa embed genérico si no puede convertir
            embedUrl = embedUrl.replace("/maps/", "/maps/embed?");
        }
        }

        mapaIframe.src = embedUrl;
    }

    document.getElementById("facebookLink").href = data.facebook || "#";
    document.getElementById("instagramLink").href = data.instagram || "#";
    document.getElementById("tiktokLink").href = data.tiktok || "#";
    });

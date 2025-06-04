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
        let embedUrl = data.mapa;

        if (!embedUrl.includes("/embed")) {
        const match = embedUrl.match(/!3d([\d.-]+)!4d([\d.-]+)/);
        if (match) {
            const [_, lat, lng] = match;
            embedUrl = `https://www.google.com/maps/embed/v1/view?key=TU_API_KEY&center=${lat},${lng}&zoom=16`;
        } else {
            embedUrl = embedUrl.replace("/maps/", "/maps/embed?");
        }
        }

        mapaIframe.src = embedUrl;
    }

    // Botones centrales
    const facebookLink = document.getElementById("facebookLink");
    if (facebookLink && data.facebook) facebookLink.href = data.facebook;

    const instagramLink = document.getElementById("instagramLink");
    if (instagramLink && data.instagram) instagramLink.href = data.instagram;

    const tiktokLink = document.getElementById("tiktokLink");
    if (tiktokLink && data.tiktok) tiktokLink.href = data.tiktok;

    // Íconos del footer
    const linkFacebook = document.getElementById("linkFacebook");
    if (linkFacebook && data.facebook) linkFacebook.href = data.facebook;

    const linkInstagram = document.getElementById("linkInstagram");
    if (linkInstagram && data.instagram) linkInstagram.href = data.instagram;

    const linkTikTok = document.getElementById("linkTikTok");
    if (linkTikTok && data.tiktok) linkTikTok.href = data.tiktok;
    });

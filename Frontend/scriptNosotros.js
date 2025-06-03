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
    document.getElementById("mapaLink").href = data.mapa || "#";

    document.getElementById("facebookLink").href = data.facebook || "#";
    document.getElementById("instagramLink").href = data.instagram || "#";
    document.getElementById("tiktokLink").href = data.tiktok || "#";
    });
const nav = document.querySelector("#nav");
const cerrar = document.querySelector("#cerrar");
const abrir = document.querySelector("#abrir");
const overlay = document.querySelector("#overlay"); // Selecciona la superposición
const body = document.body;

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
    overlay.classList.add("visible"); // Muestra la superposición
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
    overlay.classList.remove("visible"); // Oculta la superposición
});

// Cierra el menú si se hace clic en la superposición
overlay.addEventListener("click", () => {
    nav.classList.remove("visible");
    overlay.classList.remove("visible");
});

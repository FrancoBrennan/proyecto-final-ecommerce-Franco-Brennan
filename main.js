const nav = document.querySelector("#nav");
const cerrar = document.querySelector("#cerrar");
const abrir = document.querySelector("#abrir");
const buscador = document.querySelector("#buscador");
const body = document.body;

abrir.addEventListener("click", () =>{
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () =>{
    nav.classList.remove("visible");
})

buscador.addEventListener("click", () =>{
    buscador.classList.add("invisible");
})





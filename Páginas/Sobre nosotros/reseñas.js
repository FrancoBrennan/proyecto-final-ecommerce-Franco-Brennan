document.addEventListener("DOMContentLoaded", () => {
    const reseñasContenedor = document.querySelector(".reseñas-contenedor");
    let reseñas = [];

    // Función para cargar reseñas desde un archivo JSON simulado
    const cargarReseñas = async () => {
        try {
            const respuesta = await fetch("./reseñas.json"); // Ruta al archivo JSON
            const datos = await respuesta.json();
            reseñas = datos.reseñas;

            reseñas.forEach((reseña) => {
                const reseñaHTML = `
                    <div class="item-reseñas-container">
                        <div class="producto-imagen">                    
                            <img src="${reseña.imagen}" alt="${reseña.titulo}">
                        </div>
                        <div class="producto-titulo">
                            <h5>${reseña.titulo}</h5>
                        </div>
                        <div class="producto-estrellas">
                            <p class="estrellas">${reseña.estrellas}</p>
                        </div>
                        <div class="reseña-texto"> 
                            <p><strong>${reseña.autor}</strong>: ${reseña.texto}</p>
                        </div>
                    </div>`;
                reseñasContenedor.innerHTML += reseñaHTML;
            });
        } catch (error) {
            console.error("Error cargando reseñas:", error);
        }
    };

    cargarReseñas();
});

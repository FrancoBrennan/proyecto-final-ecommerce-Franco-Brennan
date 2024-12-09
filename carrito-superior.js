document.addEventListener("DOMContentLoaded", () => {
    const carritoSuperior = document.querySelector(".carrito-compras span"); 

    const actualizarContadores = () => {

        const carrito = JSON.parse(localStorage.getItem("carrito")) || {};
    
        const totalProductos = Object.values(carrito).reduce((acc, curr) => acc + curr, 0);
    
        
        if (totalProductos != 0) {
            carritoSuperior.style.display = '';
        }
        else{
            carritoSuperior.style.display = "none"
        }
    
        
        carritoSuperior.textContent = totalProductos;
    
        
        document.querySelectorAll(".contador-card").forEach((contador) => {
            const id = contador.getAttribute("data-id");
            contador.textContent = carrito[id] || "";
        });
    };

    
    actualizarContadores();

    
});
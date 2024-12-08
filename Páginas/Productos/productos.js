document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.querySelector(".productos-container");
    const carritoSuperior = document.querySelector(".carrito-compras span"); 

    
    const cargarProductos = async () => {
        try {
            const respuesta = await fetch("./productos.json");
            const productos = await respuesta.json();

            productos.forEach((producto) => {
                const productoHTML = `
                    <article class="card-container">
                        <div class="card">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <div class="card-content">
                                <h4>${producto.nombre}</h4>
                                <div class="bottom-card">
                                    <div class="card-precio">
                                        <b>$${producto.precio.toLocaleString()}</b>
                                    </div>
                                    <div>
                                        <button class="boton-agregar-carrito" data-id="${producto.id}">
                                            <i class="bi bi-cart3"></i>
                                            <span class="contador-card" data-id="${producto.id}"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>`;
                productosContainer.innerHTML += productoHTML;
            });

            // Cargar el carrito desde localStorage al iniciar y actualizar los contadores
            const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || {};
            actualizarContadores(carritoGuardado);

        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    
    const agregarAlCarrito = (id) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

        
        if (carrito[id]) {
            carrito[id]++;
        } else {
            carrito[id] = 1;
        }

        
        localStorage.setItem("carrito", JSON.stringify(carrito));

        
        actualizarContadores(carrito);
    };

    const actualizarContadores = (carrito) => {
    
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

    
    document.addEventListener("click", (event) => {
        if (event.target.closest(".boton-agregar-carrito")) {
            const productoId = event.target.closest(".boton-agregar-carrito").getAttribute("data-id");
            agregarAlCarrito(productoId);
        }
    });

    
    cargarProductos();

    
});

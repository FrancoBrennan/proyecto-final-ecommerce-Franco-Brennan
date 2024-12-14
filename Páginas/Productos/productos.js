document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.querySelector(".productos-container");
    const carritoSuperior = document.querySelector(".carrito-compras span"); 
    let productos = [];

    const obtenerCarrito = () => JSON.parse(localStorage.getItem("carrito")) || [];

    
    const cargarProductos = async () => {
        try {
            const respuesta = await fetch("./productos.json");
            productos = await respuesta.json();

            productos.forEach((producto) => {
                const productoHTML = `
                    <article class="card-container">
                        <div class="card">
                            <div class="card-img">
                                <img src="${producto.imagen}" alt="${producto.nombre}">
                            </div>
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
            
            actualizarContadores(obtenerCarrito());

        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    
    const agregarAlCarrito = (id) => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        console.log(carrito)

        const index = carrito.findIndex((item) => item.id == id);

        if (index == -1) {
            
            const elemento = productos.find((producto) => producto.id == id);
            console.log(elemento);
      
            const producto = {
              id: elemento.id,
              nombre: elemento.nombre,
              precio: elemento.precio,
              imagen: elemento.imagen,
              cantidad: 1,
            };
      
            carrito.push(producto);

        } 
        else {
            carrito[index].cantidad++;
        }

        
        localStorage.setItem("carrito", JSON.stringify(carrito));

        
        actualizarContadores(carrito);
    };

    const actualizarContadores = (carrito) => {
    
        const totalProductos = Object.values(carrito).reduce((acc, curr) => acc + curr.cantidad, 0);
    
        
        if (totalProductos != 0) {
            carritoSuperior.style.display = '';
        }
        else{
            carritoSuperior.style.display = "none"
        }
    
        
        carritoSuperior.textContent = totalProductos;
    
        
        document.querySelectorAll(".contador-card").forEach((contador) => {
            
            const id = contador.getAttribute("data-id");

            const producto = carrito.find((item) => item.id == id);

            contador.textContent = producto ? producto.cantidad : "";

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

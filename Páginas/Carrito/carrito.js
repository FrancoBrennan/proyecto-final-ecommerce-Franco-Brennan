document.addEventListener("DOMContentLoaded", () => {
    const carritoItemsContainer = document.querySelector(".container-productos"); // Donde se listarán los productos del carrito
    const carritoTotal = document.querySelector(".carrito-total"); // Total del carrito
    const carritoSuperior = document.querySelector(".carrito-compras span");
    const quantityProduct = document.querySelector(".product-quantity input")
    const totalPriceElement = document.getElementById('total-price');
    

    const obtenerCarrito = () => JSON.parse(localStorage.getItem("carrito")) || {};
    const guardarCarrito = (carrito) => localStorage.setItem("carrito", JSON.stringify(carrito));

    const renderCarrito = async () => {
        const carrito = obtenerCarrito();
        carritoItemsContainer.innerHTML = "";
        let total = 0;

        carritoItemsContainer.innerHTML = `<div class="titulo"><h2>Productos</h2></div>`;

        try {
            const respuesta = await fetch("../Productos/productos.json");
            const productos = await respuesta.json();

            for (const id in carrito) {
                const producto = productos.find((prod) => prod.id === parseInt(id));

                if (producto) {
                    const subtotal = producto.precio * carrito[id];
                    total += subtotal;

                    const itemHTML = `
                        <div class="product" data-id="${producto.id}">
                            <div class="product-img">
                                <img src="${producto.imagen}" alt="Placa de Video">
                             </div>
                            <div class="product-details">
                                <p>${producto.nombre}</p>
                            </div>
                            <div class="product-quantity">
                                <button class="btn-decrement">−</button>
                                <span class="quantity">${carrito[id]}</span>
                                <button class="btn-increment">+</button>
                            </div>
                            <div class="product-precio">
                                <p class="price">$ ${producto.precio}</p>
                            </div>
                            <div class="product-delete">
                                <button class="btn-delete"><i class="bi bi-trash3-fill"></i></button>
                            </div>
                        </div>`;
                    carritoItemsContainer.innerHTML += itemHTML;
                }
            }
        } catch (error) {
            console.error("Error cargando productos para el carrito:", error);
            carritoItemsContainer.innerHTML = "<p>Error al cargar los productos del carrito.</p>";
        }
    };

    // Función para actualizar el precio total
    function updateTotal() {
        const productElements = document.querySelectorAll(".product");
        let total = 0;

        productElements.forEach((product) => {
            const priceElement = product.querySelector('.price');
            const quantityInput = product.querySelector('.quantity');
        
            const price = parseFloat(priceElement.textContent.replace('$', '').replace('.', ''));
            const quantity = parseInt(quantityInput.textContent);

            total += price * quantity;
        });

         // Actualizar el precio total en la interfaz
        totalPriceElement.textContent = `$ ${total.toLocaleString()}`;
    }

    const eliminarDelCarrito = (id) => {
        const carrito = obtenerCarrito();

        if (carrito[id]) {
            delete carrito[id];
            guardarCarrito(carrito);
            const itemElement = document.querySelector(`.product[data-id="${id}"]`);
            itemElement?.remove();  // Eliminar solo el producto específico
            actualizarContadores(carrito);  // Actualizar contador
            updateTotal();
        }
    };

    const actualizarContadores = (carrito) => {
        if (!carritoSuperior) {
            console.error("No se encontró el elemento carritoSuperior");
            return;
        }
        const totalProductos = Object.values(carrito).reduce((acc, curr) => acc + curr, 0);
        carritoSuperior.style.display = totalProductos ? "" : "none";
        carritoSuperior.textContent = totalProductos;
    };

    const incrementarCantidad = (id) => {
        const carrito = obtenerCarrito();
        if (carrito[id]) {
            carrito[id]++;
            guardarCarrito(carrito);

            // Asegurarse de que el span correcto se actualice
            const productoElemento = document.querySelector(`.product[data-id="${id}"]`);
            const cantidadSpan = productoElemento ? productoElemento.querySelector(".quantity") : null;

            if (cantidadSpan) {
                cantidadSpan.textContent = carrito[id];  // Actualizamos solo la cantidad
            }
            
            actualizarContadores(carrito);
            updateTotal();
        }
    };

    const decrementarCantidad = (id) => {
        const carrito = obtenerCarrito();
        if (carrito[id] > 1) {  // No permitir que la cantidad sea menor a 1
            carrito[id]--;
            guardarCarrito(carrito);

            // Asegurarse de que el span correcto se actualice
            const productoElemento = document.querySelector(`.product[data-id="${id}"]`);
            const cantidadSpan = productoElemento ? productoElemento.querySelector(".quantity") : null;

            if (cantidadSpan) {
                cantidadSpan.textContent = carrito[id];  // Actualizamos solo la cantidad
            }

            actualizarContadores(carrito);
            updateTotal();
        }
    };

    carritoItemsContainer.addEventListener("click", (event) => {

        const productoId = event.target.closest(".product").dataset.id;

        if (event.target.closest(".product-delete") && event.target.closest(".product-delete").querySelector(".btn-delete")) {
            eliminarDelCarrito(productoId);
        }
        else if (event.target.classList.contains("btn-increment")) {
            incrementarCantidad(productoId);
        }
        else if (event.target.classList.contains("btn-decrement")) {
            decrementarCantidad(productoId);
        }
    
    });

    renderCarrito().then(() => {
        actualizarContadores(obtenerCarrito());
        updateTotal();
    });
});

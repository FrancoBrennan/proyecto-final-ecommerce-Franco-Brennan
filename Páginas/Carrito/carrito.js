document.addEventListener("DOMContentLoaded", () => {
    const carritoItemsContainer = document.querySelector(".container-productos");
    const carritoSuperior = document.querySelector(".carrito-compras span");
    const totalPriceElement = document.getElementById('total-price');
    

    const obtenerCarrito = () => JSON.parse(localStorage.getItem("carrito")) || [];
    const guardarCarrito = (carrito) => localStorage.setItem("carrito", JSON.stringify(carrito));

    const devolverObjetosCarrito = (carrito) => Object.values(carrito);
    const devolverIndiceCarrito = (carrito, productoId) => carrito.findIndex((item) => item.id == productoId);

    const renderCarrito = () => {
        const carrito = obtenerCarrito();
        carritoItemsContainer.innerHTML = "";
        let total = 0;

        carritoItemsContainer.innerHTML = `<div class="titulo"><h2>Productos</h2></div>`;

        // Aquí ya no haces el fetch, sino que directamente usas el carrito desde localStorage
        const productos = devolverObjetosCarrito(carrito) // Suponiendo que carrito es un objeto de productos

        productos.forEach((producto) => {
            const subtotal = producto.precio * producto.cantidad;
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
                        <span class="quantity">${producto.cantidad}</span>
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
        });

        totalPriceElement.textContent = `$ ${total.toLocaleString()}`;
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

        const eliminar = devolverIndiceCarrito(carrito,id);

        carrito.splice(eliminar, 1);  // Usa splice en lugar de delete

        guardarCarrito(carrito);

        const itemElement = document.querySelector(`.product[data-id="${id}"]`);
        itemElement?.remove();  // Eliminar solo el producto específico

        actualizarContadores(carrito);
        updateTotal();

        if(carrito.length === 0){
            localStorage.removeItem("carrito");
        }

    };

    const actualizarContadores = (carrito) => {
        const totalProductos = carrito.reduce((acc, curr) => acc + curr.cantidad, 0);
    
        
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

    const incrementarCantidad = (id) => {
        const carrito = obtenerCarrito();

        const index = devolverIndiceCarrito(carrito, id);

        carrito[index].cantidad++;
        guardarCarrito(carrito);

        const productoElemento = document.querySelector(`.product[data-id="${id}"]`);
        const cantidadSpan = productoElemento ? productoElemento.querySelector(".quantity") : null;

        if (cantidadSpan) {
            cantidadSpan.textContent = carrito[index].cantidad;
        }

        actualizarContadores(carrito);
        updateTotal();
    };

    const decrementarCantidad = (id) => {
        const carrito = obtenerCarrito();

        const index = devolverIndiceCarrito(carrito, id);

        if(carrito[index].cantidad > 1){
            
            carrito[index].cantidad--;
            guardarCarrito(carrito);

            const productoElemento = document.querySelector(`.product[data-id="${id}"]`);
             const cantidadSpan = productoElemento ? productoElemento.querySelector(".quantity") : null;

            if (cantidadSpan) {
                cantidadSpan.textContent = carrito[index].cantidad;
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

    renderCarrito();
    actualizarContadores(obtenerCarrito());
    updateTotal();

});

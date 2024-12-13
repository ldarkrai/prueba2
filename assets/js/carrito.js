// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Cargar carrito desde localStorage
const carritoBtn = document.querySelector('.comprab');
const cartCount = document.querySelector('.cart-count');

// Función para actualizar el contador del carrito
function actualizarCarrito() {
    const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    cartCount.textContent = totalItems; // Actualiza el contador en el botón del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en localStorage
}

// Función para añadir productos al carrito
function añadirAlCarrito(producto) {
    const index = carrito.findIndex(item => item.nombre === producto.nombre);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    actualizarCarrito(); // Actualiza el carrito después de añadir un producto
}

// Función para quitar productos del carrito
function quitarDelCarrito(producto) {
    const index = carrito.findIndex(item => item.nombre === producto.nombre);
    if (index !== -1) {
        carrito[index].cantidad -= 1;
        if (carrito[index].cantidad === 0) {
            carrito.splice(index, 1);
        }
    }
    actualizarCarrito(); // Actualiza el carrito después de quitar un producto
}

// Función para simular la compra
function simularCompra() {
    if (carrito.length === 0) {
        alert('No hay productos en el carrito.');
        return;
    }

    let total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    let productosEnCarrito = carrito.map(producto => `${producto.nombre} x${producto.cantidad}`).join(', ');
    let confirmacion = confirm(`Compra exitosa: ${productosEnCarrito}\nTotal: $${total}\n¿Desea finalizar la compra?`);

    if (confirmacion) {
        carrito = []; // Vaciamos el carrito después de la compra
        actualizarCarrito(); // Actualiza el carrito

        // Reiniciar los spans de cantidad a 0
        document.querySelectorAll('.quantity').forEach(span => {
            span.textContent = '0';
        });
    }
}

// Event listener para los botones "Más"
document.querySelectorAll('.mas').forEach((btn) => {
    btn.addEventListener('click', () => {
        const producto = {
            nombre: btn.getAttribute('data-producto'),
            precio: parseFloat(btn.getAttribute('data-precio'))
        };
        añadirAlCarrito(producto);
        document.querySelector(`.quantity[data-producto="${producto.nombre}"]`).textContent = carrito.find(item => item.nombre === producto.nombre).cantidad;
    });
});

// Event listener para los botones "Menos"
document.querySelectorAll('.menos').forEach((btn) => {
    btn.addEventListener('click', () => {
        const producto = {
            nombre: btn.getAttribute('data-producto'),
            precio: parseFloat(btn.getAttribute('data-precio'))
        };
        quitarDelCarrito(producto);
        const cantidad = carrito.find(item => item.nombre === producto.nombre)?.cantidad || 0;
        document.querySelector(`.quantity[data-producto="${producto.nombre}"]`).textContent = cantidad;
    });
});

// Event listener para el botón de compra
carritoBtn.addEventListener('click', simularCompra);

// Inicializa el contador del carrito al cargar la página
actualizarCarrito();
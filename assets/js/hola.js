// Actualizar contador de carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Seleccionar el botón "Añadir al carrito"
const addToCartButton = document.querySelector('.add-to-cart-btn');
addToCartButton.addEventListener('click', () => {
    addToCart();
});

// Función para añadir productos al carrito
function addToCart() {
    // Obtener la cantidad actual del carrito desde localStorage
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    // Aumentar la cantidad de productos en 1
    cartCount += 1;
    // Guardar el nuevo valor en localStorage
    localStorage.setItem('cartCount', cartCount);
    // Actualizar la visualización del contador
    updateCartCount();
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const cartCount = localStorage.getItem('cartCount') || 0;
    cartCountElement.textContent = cartCount;
}

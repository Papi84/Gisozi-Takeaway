// Select elements from the DOM
const topBar = document.querySelector('.top-bar');
const menuItems = document.querySelectorAll('.item');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const $root = document.documentElement;
const $progressbar = document.getElementById("progress");

// Initialize cart
let cart = [];

// Function to update cart display
function updateCart() {
    if (!cartItems || !cartTotal) return; // Error handling
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity} x Frw ${item.price.toFixed(2)} = Frw ${(item.quantity * item.price).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.quantity * item.price;
    });
    cartTotal.textContent = total.toFixed(2);
}

// Scroll event listener for header color change
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.backgroundColor = "#1E90FF"; // Change color on scroll
    } else {
        header.style.backgroundColor = "#007BFF"; // Revert to original color
    }
});

// Dark mode toggle
const toggleButton = document.getElementById("toggle-dark-mode");
const header = document.querySelector("header");

toggleButton.addEventListener("click", function () {
    header.classList.toggle("dark-mode");
});

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        const itemName = this.parentElement.querySelector('h2').textContent;
        const itemPrice = parseFloat(this.parentElement.querySelector('.price').textContent.replace('Frw', '').replace(',', ''));

        // Find or create item in cart
        let cartItem = cart.find(item => item.name === itemName);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({
                name: itemName,
                price: itemPrice,
                quantity: 1
            });
        }

        updateCart();
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    updateCart();
});


// Select elements from the DOM
const menuItems = document.querySelectorAll('.item');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Sample menu items - replace with real data from your backend
const menu = [
    { id: 1, name: "Pizza", price: 12.99, quantity: 0 },
    { id: 2, name: "Sushi", price: 15.99, quantity: 0 },
    { id: 3, name: "Burger", price: 8.99, quantity: 0 }
];

// Initialize cart
let cart = [];

// Function to update cart display
function updateCart() {
    if (!cartItems || !cartTotal) return; // Error handling
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.quantity * item.price;
    });
    cartTotal.textContent = total.toFixed(2);
}

// Event listener for showing item details
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        console.log('Item clicked:', this.querySelector('h2').textContent);
    });
});

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const itemName = this.parentElement.querySelector('h2').textContent;
        const itemPrice = parseFloat(this.parentElement.querySelector('.price').textContent.replace('$', ''));
        
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
document.addEventListener('DOMContentLoaded', function() {
    menu.forEach((item, index) => {
        menuItems[index].querySelector('h2').textContent = item.name;
        menuItems[index].querySelector('.price').textContent = `$${item.price.toFixed(2)}`;
    });
    updateCart();
});
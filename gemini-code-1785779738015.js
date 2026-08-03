// Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('auraCart')) || [];

// Update Cart Count on Load
document.addEventListener('DOMContentLoaded', updateCartCount);

function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    
    localStorage.setItem('auraCart', JSON.stringify(cart));
    updateCartCount();
    
    // Aesthetic feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Added to Cart ✓";
    btn.style.backgroundColor = "#22c55e"; // Green flash
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "#000";
    }, 1500);
}

function updateCartCount() {
    const cartLink = document.getElementById('cart-link');
    if(cartLink) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartLink.innerText = `Cart (${totalItems})`;
    }
}

function renderCheckoutCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    
    if(!cartContainer) return;
    
    cartContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color: #666;">Your cart is empty.</p>';
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <span class="item-name">${item.quantity}x ${item.name}</span>
                <span class="item-price">Rs. ${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `;
    });

    totalContainer.innerText = `Rs. ${total.toLocaleString()}`;
}

function processCheckout(event) {
    event.preventDefault(); // Stop form from refreshing the page immediately
    
    if (cart.length === 0) {
        alert("Your cart is empty! Please add a bag before checking out.");
        return;
    }

    // Form validation is handled natively by HTML5 required/pattern attributes.
    // If JS reaches here, the form is valid.

    // Empty the cart
    localStorage.removeItem('auraCart');
    cart = [];
    
    // Redirect to success page
    window.location.href = 'success.html';
}
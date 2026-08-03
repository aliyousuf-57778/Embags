function processCheckout(event) {
    event.preventDefault(); 
    
    if (cart.length === 0) {
        alert("Your cart is empty! Please add a bag before checking out.");
        return;
    }

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;

    // 1. Gather all the typed form data
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);

    // 2. Format the cart items so you know what they ordered
    let cartDetails = cart.map(item => `${item.quantity}x ${item.name} (Rs. ${item.price * item.quantity})`).join('\n');
    formData.append("Ordered_Items", cartDetails);
    
    const cartTotal = document.getElementById('cart-total').innerText;
    formData.append("Total_Amount", cartTotal);

    // 3. Send securely to your email via Formspree
    // REPLACE the URL below with your actual Formspree endpoint
    fetch("https://formspree.io/f/xeeyywqo", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Clear cart and go to success page
            localStorage.removeItem('auraCart');
            cart = [];
            window.location.href = 'success.html';
        } else {
            alert("Oops! There was a problem submitting your order. Please try again.");
            submitBtn.innerText = "Place Order";
            submitBtn.disabled = false;
        }
    }).catch(error => {
        alert("Network error. Please check your internet connection.");
        submitBtn.innerText = "Place Order";
        submitBtn.disabled = false;
    });
}
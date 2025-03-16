// Gabrielle Dawkins (ID#: 2405551)
// Web Programming Tues. 11am (UE1)

// Login functionality
const correctUsername = 'user123';
const correctPassword = 'P@ssw0rd2025!';
let attempts = 0;

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    const errorMessage = document.getElementById('errorMessage');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const username = usernameField.value;
        const password = passwordField.value;
        errorMessage.textContent = '';

        if (!username || !password) {
            errorMessage.textContent = 'Please fill in both fields.';
            return;
        }

        if (password.length < 8) {
            errorMessage.textContent = 'Password must be at least 8 characters long.';
            return;
        }

        if (username === correctUsername && password === correctPassword) {
            alert('Login Successful!');
            window.location.href = 'product page.html';
        } else {
            attempts++;
            errorMessage.textContent = `Invalid login. Attempts left: ${3 - attempts}`;
            if (attempts >= 3) {
                window.location.href = 'error.html';
            }
        }
    });
}

// Cart handling
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const updateCartCount = () => {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        const itemCount = cart.reduce((total, item) => total + item.qty, 0);
        cartCount.textContent = `(${itemCount} item${itemCount !== 1 ? 's' : ''})`;
    }
};

document.querySelectorAll(".product").forEach((product) => {
    const button = product.querySelector("button");
    button.addEventListener("click", () => {
        const name = product.querySelector("p").textContent.split(" - ")[1];
        const price = parseFloat(product.querySelectorAll("p")[1].textContent.replace("$", ""));
        const model = product.querySelector(".phone-model").value;

        if (!model) {
            alert("Please select a phone model!");
            return;
        }

        const existingItem = cart.find(item => item.name === name && item.model === model);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ name, price, model, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Added to cart!");
    });
});

// Checkout button functionality
const checkoutBtn = document.getElementById("checkout");
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Add items to the cart first.");
        } else {
            window.location.href = "invoice.html";
        }
    });
}

// Cancel button functionality
const cancelBtn = document.getElementById("cancel");
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        updateCartCount();
        alert("Your cart has been cleared.");
    });
}

// Invoice generation
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("invoice.html")) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const tableBody = document.getElementById("invoice-items");
        let subtotal = 0;

        if (tableBody) {
            cart.forEach(item => {
                subtotal += item.price * item.qty;
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.name} (${item.model})</td>
                    <td>${item.qty}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${(item.price * item.qty).toFixed(2)}</td>
                `;
                tableBody.appendChild(row);
            });

            const tax = subtotal * 0.05;
            const total = subtotal + tax;

            document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
            document.getElementById("total").textContent = `$${total.toFixed(2)}`;
        }
    }
});

// About Us - Back to Products & Exit buttons
const goToProducts = () => {
    window.location.href = "product page.html";
};

const exitPage = () => {
    window.close();
};

const backToProductsBtn = document.getElementById("back-to-products");
const exitBtn = document.getElementById("exit");

if (backToProductsBtn) {
    backToProductsBtn.addEventListener("click", goToProducts);
}

if (exitBtn) {
    exitBtn.addEventListener("click", exitPage);
}

// Update cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

document.addEventListener('DOMContentLoaded', () => {
    initMenuFilters();
    initCartButtons();
    initLoginForm();
    initPaymentForm();
});

function initMenuFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    if (!filterButtons.length || !menuCards.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((button) => button.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;

            menuCards.forEach((card) => {
                const cardCategory = card.dataset.category;
                card.style.display = category === 'all' || cardCategory === category ? 'flex' : 'none';
            });
        });
    });
}

function initCartButtons() {
    const cartCount = document.getElementById('cart-count');
    const addButtons = document.querySelectorAll('.add-cart');
    if (!cartCount || !addButtons.length) return;

    let count = 0;
    addButtons.forEach((button) => {
        button.addEventListener('click', () => {
            count += 1;
            cartCount.textContent = count;
            const originalText = button.textContent;
            button.textContent = 'Added';
            button.disabled = true;
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1000);
        });
    });
}

function initLoginForm() {
    const form = document.querySelector('.login-form');
    if (!form) return;

    const message = form.querySelector('.message');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        if (email.toLowerCase() === 'user@example.com' && password === 'welcome123') {
            showMessage(message, 'Login successful! Redirecting to the menu…', 'success');
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1300);
        } else {
            showMessage(message, 'Invalid email or password. Try user@example.com / welcome123', 'error');
        }
    });
}

function initPaymentForm() {
    const form = document.querySelector('.payment-form');
    if (!form) return;

    const message = document.getElementById('payment-message');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const cardNumber = form.cardNumber.value.replace(/\s+/g, '');
        const expiry = form.expiry.value.trim();
        const cvv = form.cvv.value.trim();

        if (!isValidCardNumber(cardNumber)) {
            showMessage(message, 'Please enter a valid 16-digit card number.', 'error');
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            showMessage(message, 'Please enter expiry in MM/YY format.', 'error');
            return;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            showMessage(message, 'CVV must be 3 or 4 digits.', 'error');
            return;
        }

        showMessage(message, 'Payment successful! Thank you for your order.', 'success');
        form.reset();
    });
}

function showMessage(element, text, type) {
    if (!element) return;
    element.textContent = text;
    element.classList.remove('success', 'error');
    element.classList.add(type);
}

function isValidCardNumber(value) {
    return /^\d{16}$/.test(value);
}

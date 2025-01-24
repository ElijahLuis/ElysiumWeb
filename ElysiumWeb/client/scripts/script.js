// Authentication logic
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Login API call
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store JWT token in localStorage
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                window.location.href = '/pages/home.html'; // Redirect to user home
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('Login failed.');
        }
    });
}

const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Signup API call
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful!');
                window.location.href = '/login.html'; // Redirect to login
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Signup Error:', error);
            alert('Signup failed.');
        }
    });
}

function updateNavbar() {
    const navLinks = document.getElementById("nav-links");

    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === "" || currentPage === "index.html") {
        currentPage = "index.html";
    }

    const isAuthenticated = localStorage.getItem('token') !== null;

    navLinks.innerHTML = "";

    if (isAuthenticated) {
        // Logged-in navbar links
        navLinks.innerHTML = `
            <li><a href="../pages/home.html" ${currentPage === "home.html" ? 'class="active"' : ''}>Home</a></li>
            <li><a href="../pages/avatar.html" ${currentPage === "avatar.html" ? 'class="active"' : ''}>Avatar</a></li>
            <li><a href="../pages/items.html" ${currentPage === "items.html" ? 'class="active"' : ''}>Items</a></li>
            <li><a href="../pages/about.html" ${currentPage === "about.html" ? 'class="active"' : ''}>About</a></li>
            <li><a href="../pages/contact.html" ${currentPage === "contact.html" ? 'class="active"' : ''}>Support</a></li>
            <li><a href="../pages/settings.html" ${currentPage === "settings.html" ? 'class="active"' : ''}>Settings</a></li>
            <li><a href="../pages/logout.html" ${currentPage === "logout.html" ? 'class="active"' : ''}>Logout</a></li>
        `;
    } else {
        // Logged-out navbar links
        navLinks.innerHTML = `
            <li><a href="../index.html" ${currentPage === "index.html" ? 'class="active"' : ''}>Welcome</a></li>
            <li><a href="../pages/about.html" ${currentPage === "about.html" ? 'class="active"' : ''}>About Us</a></li>
            <li><a href="../pages/contact.html" ${currentPage === "contact.html" ? 'class="active"' : ''}>Contact</a></li>
            <li><a href="../pages/login.html" ${currentPage === "login.html" ? 'class="active"' : ''}>Login</a></li>
            <li><a href="../pages/signup.html" ${currentPage === "signup.html" ? 'class="active"' : ''}>Sign Up</a></li>
        `;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateNavbar();

    // Logout functionality
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '../index.html'; // Redirect to welcome page
        });
    }
});

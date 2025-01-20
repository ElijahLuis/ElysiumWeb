// Back-end API data fetch
fetch('/api')
    .then(response => response.json())
    .then(data => {
        // Update DOM with message from server
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

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
                window.location.href = '/home.html';  // Redirect to home page
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
                window.location.href = '/login.html';  // Redirect to login page
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Signup Error:', error);
            alert('Signup failed.');
        }
    });
}

// Change navbar upon login status
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.getElementById("nav-links");
    let isAuthenticated = localStorage.getItem('token') !== null;

    function updateNavbar() {
        navLinks.innerHTML = "";

        if (isAuthenticated) {
            navLinks.innerHTML = `
                <li><a href="home.html">Home</a></li>
                <li><a href="avatar.html">Avatar</a></li>
                <li><a href="items.html">Items</a></li>
                <li><a href="settings.html">Settings</a></li>
                <li><a href="#" id="logout-btn">Logout</a></li>
            `;
        } else {
            navLinks.innerHTML = `
                <li><a href="login.html">Login</a></li>
                <li><a href="signup.html">Sign Up</a></li>
            `;
        }
    }

    updateNavbar();

    // Logout functionality
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        });
    }
});

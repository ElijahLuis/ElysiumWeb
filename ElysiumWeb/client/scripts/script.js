// Back-end API data fetch
fetch('/api')
    .then(response => response.json())
    .then(data => {
        // update DOM with message from server
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = data.message;
        }
        ;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Authentication logic
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        alert(`Login attempt with email: ${email}`);
    });
}

const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        alert(`Signup attempt with name: ${name}, email: ${email}`);
    });
}

//  Test: Change navbar upon login
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.getElementById("nav-links");
    let isAuthenticated = false; // To test auth status

    function updateNavbar() {
        navLinks.innerHTML = ""; // Clear existing links

        if (isAuthenticated) {
            // logged in navlinks
            navLinks.innerHTML = `
                <li><a href="home.html">Home</a></li>
                <li><a href="avatar.html">Avatar</a></li>
                <li><a href="items.html">Items</a></li>
                <li><a href="options.html">Options</a></li>
            `;
            // tabs to be added: quests, community, explore, notifications.
        } else {
            // logged out navlinks
            navLinks.innerHTML = `
                <li><a href="#about">About</a></li>
                <li><a href="#learn">Learn</a></li>
                <li><a href="#contact">Contact Us</a></li>
            `;
        }
    }
    updateNavbar();
});


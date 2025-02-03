document.addEventListener("DOMContentLoaded", () => {
    setupAuthForms();
    updateNavbar();
    setupLogoutButton();
    setupEmotionSelection();
});

// ===== AUTHENTICATION HANDLING =====
function setupAuthForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => handleAuth(e, '/api/login', 'login'));
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => handleAuth(e, '/api/signup', 'signup'));
    }
}

async function handleAuth(event, endpoint, type) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Input sanitization
    for (let key in data) {
        data[key] = sanitizeInput(data[key]);
    }

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            sessionStorage.setItem("token", result.token);
            const redirectURL = type === "login" ? "/pages/home.html" : "/login.html";
            window.location.href = redirectURL;
        } else {
            showError(result.message);
        }
    } catch (error) {
        console.error(`${type} Error:`, error);
        showError("Something went wrong. Please try again.");
    }
}

// Sanitize input fields to prevent basic XSS
function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Show error messages in the UI instead of using `alert`
function showError(message) {
    const errorBox = document.getElementById("error-message");
    if (errorBox) {
        errorBox.textContent = message;
        errorBox.style.display = "block";
    } else {
        alert(message); // Fallback
    }
}

// ===== NAVBAR HANDLING =====
function updateNavbar() {
    const navLinks = document.getElementById("nav-links");
    if (!navLinks) return;

    const currentPage = window.location.pathname.split('/').pop() || "index.html";
    const isAuthenticated = sessionStorage.getItem("token") !== null;

    const links = isAuthenticated
        ? [
            { href: "../pages/home.html", label: "Home" },
            { href: "../pages/avatar.html", label: "Avatar" },
            { href: "../pages/items.html", label: "Items" },
            { href: "../pages/about.html", label: "About" },
            { href: "../pages/contact.html", label: "Support" },
            { href: "../pages/settings.html", label: "Settings" },
            { href: "../pages/logout.html", label: "Logout" },
        ]
        : [
            { href: "../index.html", label: "Welcome" },
            { href: "../pages/about.html", label: "About Us" },
            { href: "../pages/contact.html", label: "Contact" },
            { href: "../pages/login.html", label: "Login" },
            { href: "../pages/signup.html", label: "Sign Up" },
        ];

    navLinks.innerHTML = links
        .map(
            (link) =>
                `<li><a href="${link.href}" ${currentPage === link.href.split('/').pop() ? 'class="active"' : ''}>${link.label}</a></li>`
        )
        .join("");
}

// ===== LOGOUT HANDLING =====
function setupLogoutButton() {
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            sessionStorage.removeItem("token");
            window.location.href = "../index.html";
        });
    }
}

// ===== EMOTION SELECTION HANDLING =====
function setupEmotionSelection() {
    const primaryEmotions = document.querySelectorAll(".emotion-bubble");
    const subgroupContainer = document.getElementById("subgroup-emotions");

    if (!primaryEmotions.length || !subgroupContainer) return;

    const emotionSubgroups = {
        joy: ["Excitement", "Proud", "Playful", "Content", "Optimistic", "Grateful"],
        grief: ["Heartbroken", "Hopeless", "Lonely", "Mournful", "Despair", "Depressed"],
        love: ["Affectionate", "Passionate", "Sentimental", "Romantic", "Hot"],
        fear: ["Anxious", "Panicked", "Helpless", "Threatened", "Terrified", "Paranoid"],
        anger: ["Frustrated", "Irritated", "Hostile", "Resentful", "Enraged", "Hateful"],
        curiosity: ["Interested", "Intrigued", "Inquisitive", "Eager", "Adventurous", "Creative"],
        boredom: ["Apathetic", "Indifferent", "Weary", "Disinterested", "Unmotivated"],
        surprise: ["Amazed", "Startled", "Stunned", "Awestruck", "Shocked", "Rattled"],
    };

    primaryEmotions.forEach((bubble) => {
        bubble.addEventListener("click", () => {
            const emotion = bubble.dataset.emotion;
            subgroupContainer.innerHTML = "";
            subgroupContainer.style.display = "flex";

            emotionSubgroups[emotion]?.forEach((sub) => {
                const subBubble = document.createElement("div");
                subBubble.classList.add("subgroup-bubble");
                subBubble.textContent = sub;
                subgroupContainer.appendChild(subBubble);
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupAuthForms();
    updateNavbar();
    setupLogoutButton();
    setupFeelings();
});

document.addEventListener("mousemove", (event) => {
    let maxShift = 15; // Maximum allowed shift in pixels

    // normalize and set vars
    let x = ((event.clientX / window.innerWidth) * 30 - 15);
    let y = ((event.clientY / window.innerHeight) * 30 - 15);
    x = Math.max(-maxShift, Math.min(maxShift, x));
    y = Math.max(-maxShift, Math.min(maxShift, y));
    document.documentElement.style.setProperty("--bg-x", `${x}px`);
    document.documentElement.style.setProperty("--bg-y", `${y}px`);
});


// DOM elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const navLinks = document.getElementById('nav-links');
const logoutButton = document.getElementById('logout-btn');

// message boxes
function showMessage(message, isError = false) {
    let messageBox = document.getElementById("message-box")

    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "message-box";
        messageBox.className = "message-box";
        document.body.appendChild(messageBox);
    }
    messageBox.textContent = message;
    messageBox.classList.toggle("error", isError);
    messageBox.classList.toggle("success", !isError);
    messageBox.style.display = "block";
}

// Authentication Handling
function setupAuthForms() {
    ["login", "signup"].forEach(type => {
        const form = document.getElementById(`${type}-form`);
        if (form) {
            form.addEventListener("submit", (e) => handleAuth(e, `/api/${type}`, type));
        }
    });
}

async function handleAuth(event, endpoint, type) {
    event.preventDefault();

    const form = event.target;
    const email = document.getElementById(`${type}-email`).value;
    const password = document.getElementById(`${type}-password`).value;
    const name = type === "signup" ? document.getElementById('signup-name').value : null;

    const requestBody = JSON.stringify({ email, password, ...(name && { name }) });


    /* debug logging */
    console.log("📤 Sending request to:", endpoint);
    console.log("📦 Request Body:", requestBody);

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
        });

        const result = await response.json();

        if (response.ok) {
            sessionStorage.setItem("token", result.token);
            showMessage("Login successful!", false);
            setTimeout(() => window.location.href = type === "login" ? "/pages/home.html" : "/pages/login.html", 1000);
        } else {
            showMessage(result.message, true);
        }
    } catch (error) {
        console.error("❌ Signup Error:", error);
        showMessage("Something went wrong. Please try again.", true);
    }
}

// Show error messages in UI
function showError(message) {
    const errorBox = document.getElementById("error-message");
    if (errorBox) {
        errorBox.textContent = message;
        errorBox.style.display = "block";
    } else {
        alert(message);
    }
}

async function fetchEmotions() {
    try {
        const response = await fetch("../data/emotion-data.json");
        return await response.json();
    } catch (error) {
        console.error("Error loading emotion data:", error);
        return {};
    }
}

async function setupFeelings() {
    const primaryEmotions = document.querySelectorAll(".emotion-bubble");
    const subgroupContainer = document.getElementById("subgroup-emotions");
    const emotionSubgroups = await fetchEmotions();

    let selectedEmotions = [];

    primaryEmotions.forEach((bubble) => {
        bubble.addEventListener("click", () => {
            const emotion = bubble.dataset.emotion;
            primaryEmotions.forEach((b) => b.classList.remove("selected"));
            bubble.classList.add("selected");

            // clear previous selections
            selectedEmotions = [];
            subgroupContainer.innerHTML = "";
            subgroupContainer.style.display = "flex";

            // populate subgroups
            (emotionSubgroups[emotion] || []).forEach((sub) => {
                const subBubble = document.createElement("div");
                subBubble.classList.add("subgroup-bubble");
                subBubble.textContent = sub;

                subBubble.addEventListener("click", () => handleSubgroupSelection(subBubble, sub, selectedEmotions));

                subgroupContainer.appendChild(subBubble);
            });
        });
    });
}

function handleSubgroupSelection(subBubble, sub, selectedEmotions) {
    const index = selectedEmotions.indexOf(sub);
    if (index === -1) {
        if (selectedEmotions.length < 5) {
            selectedEmotions.push(sub);
            subBubble.classList.add("selected");
        } else {
            alert("You can only select up to 5 emotions.");
        }
    } else {
        selectedEmotions.splice(index, 1);
        subBubble.classList.remove("selected");
    }
}


// Navbar Handling
function updateNavbar() {
    if (!navLinks) return;
    const isAuthenticated = sessionStorage.getItem("token") !== null;
    const pages = isAuthenticated

        ? [ // logged in links
            ["/pages/home.html", "Home"],
            ["/pages/avatar.html", "Avatar"],
            ["/pages/about.html", "About"],
            ["/pages/contact.html", "Support"],
            ["/pages/settings.html", "Settings"],
            ["/pages/logout.html", "Logout"]]
        : [ // logged out links
            ["/index.html", "Welcome"],
            ["/pages/about.html", "About"],
            ["/pages/login.html", "Login"],
            ["/pages/signup.html", "Sign Up"]];

    if (!Array.isArray(pages)) {
        console.error("❌ Navbar Error: 'pages' is not an array:", pages);
        return;
    }

    navLinks.innerHTML = pages
        .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
        .join("");

}

// Logout Handling
function setupLogoutButton() {
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            sessionStorage.removeItem("token");
            window.location.href = "/index.html";
        });
    }
}

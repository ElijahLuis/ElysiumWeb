document.addEventListener("DOMContentLoaded", () => {
    setupAuthForms();
    updateNavbar();
    setupLogoutButton();
    setupFeelings();
});

// DOM elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const navLinks = document.getElementById('nav-links');
const logoutButton = document.getElementById('logout-btn');

// message boxes
function showMessage(message, isError = false) {
    const messageBox = document.getElementById("message-box") || createMessageBox();
    messageBox.textContent = message;
    messageBox.style.color = isError ? "red" : "green";
    messageBox.style.display = "block";
}

function createMessageBox() {
    const box = document.createElement("div");
    box.id = "message-box";
    box.style.position = "fixed";
    box.style.top = "10px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.backgroundColor = "white";
    box.style.border = "1px solid black";
    box.style.padding = "10px";
    box.style.borderRadius = "5px";
    box.style.display = "none";
    document.body.appendChild(box);
    return box;
}

// Authentication Handling
function setupAuthForms() {
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

function setupFeelings() {
    const primaryEmotions = document.querySelectorAll(".emotion-bubble");
    const subgroupContainer = document.getElementById("subgroup-emotions");

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

    let selectedEmotions = [];

    // Handle primary emotion selection
    primaryEmotions.forEach((bubble) => {
        bubble.addEventListener("click", () => {
            const emotion = bubble.dataset.emotion;

            // Highlight the selected bubble
            primaryEmotions.forEach((b) => b.classList.remove("selected"));
            bubble.classList.add("selected");

            // Clear previous selections and subgroups
            selectedEmotions = [];
            subgroupContainer.style.display = "flex";
            subgroupContainer.innerHTML = ""; // Clear previous subgroups

            // Populate subgroups dynamically
            emotionSubgroups[emotion].forEach((sub) => {
                const subBubble = document.createElement("div");
                subBubble.classList.add("subgroup-bubble");
                subBubble.textContent = sub;

                // Subgroup selection logic
                subBubble.addEventListener("click", () => {
                    if (selectedEmotions.length < 5 && !selectedEmotions.includes(sub)) {
                        selectedEmotions.push(sub);
                        subBubble.classList.add("selected");
                    } else if (selectedEmotions.includes(sub)) {
                        const index = selectedEmotions.indexOf(sub);
                        selectedEmotions.splice(index, 1);
                        subBubble.classList.remove("selected");
                    } else {
                        alert("You can only select up to 5 emotions.");
                    }

                    // Disable bubbles if limit is reached
                    if (selectedEmotions.length === 5) {
                        document
                            .querySelectorAll(".subgroup-bubble:not(.selected)")
                            .forEach((b) => {
                                b.style.pointerEvents = "none";
                                b.style.opacity = "0.5";
                            });
                    } else {
                        // Re-enable bubbles if below limit
                        document
                            .querySelectorAll(".subgroup-bubble")
                            .forEach((b) => {
                                b.style.pointerEvents = "auto";
                                b.style.opacity = "1";
                            });
                    }
                });

                subgroupContainer.appendChild(subBubble);
            });
        });
    });
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

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

/* Event Listener for DOMContentLoaded */
document.addEventListener("DOMContentLoaded", function () {
    updateNavbar();

    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '../index.html'; // Redirect to welcome page
        });
    }

    // Emotion selection functionality
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
    primaryEmotions.forEach(bubble => {
        bubble.addEventListener("click", () => {
            const emotion = bubble.dataset.emotion;

            // Highlight selected bubble
            primaryEmotions.forEach(b => b.classList.remove("selected"));
            bubble.classList.add("selected");

            // Clear previous selections and subgroups
            selectedEmotions = [];
            subgroupContainer.style.display = "flex";
            subgroupContainer.innerHTML = "";

            // Populate subgroups with js
            emotionSubgroups[emotion].forEach(sub => {
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
                        document.querySelectorAll(".subgroup-bubble:not(.selected)").forEach(b => {
                            b.style.pointerEvents = "none";
                            b.style.opacity = "0.5";
                        });
                    } else {
                        // Re-enable bubbles if below limit
                        document.querySelectorAll(".subgroup-bubble").forEach(b => {
                            b.style.pointerEvents = "auto";
                            b.style.opacity = "1";
                        });
                    }
                });
                subgroupContainer.appendChild(subBubble);
            });
        });
    });
    /*
    // Daily emotional check-in functionality
    const checkInForm = document.getElementById("emotional-check-in");
    const tailoredContent = document.getElementById("tailored-content");

    if (checkInForm) {
        checkInForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload on form submission

            const selectedEmotion = checkInForm.querySelector('input[name="emotion"]:checked');

            if (selectedEmotion) {
                const emotion = selectedEmotion.value;
                let message;

                // Tailor the feedback based on the emotion
                switch (emotion) {
                    case "happy":
                        message = "That's great to hear! Here's some content to keep your positive energy flowing.";
                        break;
                    case "anxious":
                        message = "Take a deep breath. Here are some grounding techniques that might help.";
                        break;
                    case "sad":
                        message = "It's okay to feel sad. Here's something uplifting to brighten your day.";
                        break;
                    case "curious":
                        message = "Curiosity is the key to growth! Check out these insights to feed your mind.";
                        break;
                    case "frustrated":
                        message = "Frustration can be tough. Here's some advice to help ease your stress.";
                        break;
                    default:
                        message = "Thank you for sharing how you feel. Here's some tailored content for you.";
                        break;
                }

                // Display the message dynamically in the tailored-content section
                tailoredContent.querySelector("p").textContent = message;
            } else {
                alert("Please select an emotion before submitting.");
            }
        }); 
    }*/

});

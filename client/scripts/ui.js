// Front page UI
(() => {
    document.addEventListener("DOMContentLoaded", () => {
    const enterButton = document.getElementById("enterButton");
    const welcomeText = document.querySelector("header h1");
    const authModal = document.getElementById("auth-modal");
    const loginButton = document.querySelector("#login-form .submit-btn");
    const tabsContainer = document.querySelector('.tabs');
    const stars = document.getElementById("stars");

    function fadeOutElement(element, duration = 500) {
        if (!element) return;
        element.style.animation = 'none';
        element.style.setProperty('--fade-duration', `${duration}ms`);
        element.classList.remove('fade-in');
        element.classList.add('fade-transition');
        requestAnimationFrame(() => {
            element.classList.add('fade-out');
        });
        const hide = () => {
            element.style.display = 'none';
            element.removeEventListener('transitionend', hide);
        };
        element.addEventListener('transitionend', hide);
    }

    function fadeInElement(element, duration = 500) {
        if (element) {
            element.style.display = 'block';
            element.style.setProperty('--fade-duration', `${duration}ms`);
            element.classList.add('fade-transition');
            // ensure starting opacity 0 before fading in
            element.classList.remove('fade-out');
            requestAnimationFrame(() => {
                element.classList.add('fade-in');
            });
        }
    }

    if (enterButton) {
        enterButton.addEventListener("click", () => {
            fadeOutElement(welcomeText);
            fadeOutElement(enterButton);
            const showModal = () => {
                fadeInElement(authModal);
                authModal.classList.add("active");
                enterButton.removeEventListener("transitionend", showModal);
            };
            enterButton.addEventListener("transitionend", showModal);
        });
    } else {
        console.warn("Enter button not found in DOM.");
    }

    if (tabsContainer) {
        tabsContainer.addEventListener("click", (event) => {
            const tab = event.target.closest(".tab");
            if (!tab) return;
            const activeTab = tabsContainer.querySelector(".tab.active");
            if (activeTab) activeTab.classList.remove("active");
            tab.classList.add("active");

            const forms = authModal.querySelectorAll(".form");
            forms.forEach((f) => f.classList.add("hidden"));
            const targetForm = document.getElementById(tab.dataset.target);
            if (targetForm) targetForm.classList.remove("hidden");
        });
    }

    if (loginButton) {
        loginButton.addEventListener("click", (event) => {
            event.preventDefault();

            const overlay = document.createElement("div");
            overlay.classList.add("login-overlay", "fade-transition");
            overlay.style.setProperty("--fade-duration", "1500ms");
            document.body.appendChild(overlay);

            const redirect = () => {
                window.location.href = "../pages/home.html";
            };

            overlay.addEventListener("transitionend", redirect, { once: true });

            const startOverlay = () => {
                requestAnimationFrame(() => {
                    overlay.classList.add("fade-in");
                });
                authModal.removeEventListener("transitionend", startOverlay);
                // fallback
                setTimeout(redirect, 1600);
            };

            authModal.addEventListener("transitionend", startOverlay);
            // fade auth modal first so it visibly disappears
            fadeOutElement(authModal, 800);
        });
    } else {
        console.warn("Login button not found in DOM.");
    }
    });
})();

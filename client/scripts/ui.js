// Front page UI
(() => {
    document.addEventListener("DOMContentLoaded", () => {
    const enterButton = document.getElementById("enterButton");
    const welcomeText = document.querySelector("header h1");
    const authModal = document.getElementById("auth-modal");
    const loginButton = document.querySelector("#login-form .submit-btn");
    const tabsContainer = document.querySelector('.tabs');

    function fadeOutElement(element, duration = 800) {
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

    function fadeInElement(element, duration = 800) {
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

    let loginLocked = false;
    if (loginButton) {
        loginButton.addEventListener("click", (event) => {
            if (loginLocked) return;
            loginLocked = true;
            loginButton.disabled = true;
            setTimeout(() => {
                loginButton.disabled = false;
                loginLocked = false;
            }, 1700);

            event.preventDefault();

            const startOverlay = () => {
                authModal.removeEventListener("transitionend", startOverlay);

                const overlay = document.createElement("div");
                overlay.classList.add("login-overlay", "fade-transition");
                overlay.style.setProperty("--fade-duration", "2000ms");
                document.body.appendChild(overlay);

                overlay.addEventListener(
                    "transitionend",
                    () => {
                        overlay.classList.add("overlay-pulse");
                        window.location.href = "../pages/home.html";
                    },
                    { once: true }
                );

                requestAnimationFrame(() => {
                    overlay.classList.add("fade-in");
                });
                setTimeout(() => {
                    window.location.href = "../pages/home.html";
                }, 2100);
            };

            authModal.addEventListener("transitionend", startOverlay);
            // fade auth modal first so it visibly disappears
            fadeOutElement(authModal, 1000);
        });
    } else {
        console.warn("Login button not found in DOM.");
    }
    });
})();

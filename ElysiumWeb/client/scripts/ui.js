document.addEventListener("DOMContentLoaded", () => {
    const enterButton = document.getElementById("enterButton");
    const welcomeText = document.querySelector("header h1");
    const authModal = document.getElementById("auth-modal");
    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    function fadeOutElement(element, duration = 500) {
        element.style.transition = `opacity ${duration}ms ease-out`;
        element.style.opacity = "0";
        setTimeout(() => {
            element.style.display = "none";
        }, duration);
    }

    function fadeInElement(element, duration = 500) {
        element.style.display = "block";
        setTimeout(() => {
            element.style.transition = `opacity ${duration}ms ease-in`;
            element.style.opacity = "1";
        }, 50);
    }

    // When Enter is clicked, transition to login/signup
    enterButton.addEventListener("click", () => {
        fadeOutElement(welcomeText);
        fadeOutElement(enterButton);
        setTimeout(() => {
            fadeInElement(authModal);
            authModal.classList.add("active");
        }, 500);
    });

    function switchTab(activeTab, inactiveTab, activeForm, inactiveForm) {
        activeTab.classList.add("active");
        inactiveTab.classList.remove("active");
        activeForm.classList.remove("hidden");
        inactiveForm.classList.add("hidden");
    }

    loginTab.addEventListener("click", () => switchTab(loginTab, signupTab, loginForm, signupForm));
    signupTab.addEventListener("click", () => switchTab(signupTab, loginTab, signupForm, loginForm));
});

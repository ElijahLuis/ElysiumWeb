// Optimized background script for starfield and parallax
// Combines previous handlers into a single DOMContentLoaded event

document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById("stars");

    // ----------------------
    // Star generation
    // ----------------------
    function generateStars() {
        starsContainer.innerHTML = "";
        const numStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        const frag = document.createDocumentFragment();
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.left = `${Math.random() * window.innerWidth}px`;
            star.style.top = `${Math.random() * window.innerHeight}px`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.opacity = Math.random();
            frag.appendChild(star);
        }
        starsContainer.appendChild(frag);
    }

    generateStars();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(generateStars, 200);
    });

    // ----------------------
    // Gradient colors
    // ----------------------
    const gradients = [
        ["#000000", "#020c1b", "#0a1f44", "#273a7f"], // Deep blue night
        ["#020c1b", "#0a1f44", "#273a7f", "#3b3f80"], // Twilight indigo
        ["#0a1f44", "#273a7f", "#3b3f80", "#484c91"], // Celestial purple
        ["#273a7f", "#3b3f80", "#484c91", "#2a2e5a"], // Cosmic dusk
    ];

    let currentGradientIndex = 0;
    function updateGradients() {
        const nextGradientIndex = (currentGradientIndex + 1) % gradients.length;
        const currentColors = gradients[currentGradientIndex];
        const nextColors = gradients[nextGradientIndex];

        document.body.style.setProperty(
            "--gradient-current",
            `linear-gradient(to bottom, ${currentColors[0]}, ${currentColors[1]}, ${currentColors[2]}, ${currentColors[3]})`
        );
        document.body.style.setProperty(
            "--gradient-next",
            `linear-gradient(to bottom, ${nextColors[0]}, ${nextColors[1]}, ${nextColors[2]}, ${nextColors[3]})`
        );

        currentGradientIndex = nextGradientIndex;
        setTimeout(updateGradients, 60000);
    }
    updateGradients();

    // ----------------------
    // Parallax effect
    // ----------------------
    let targetX = 0,
        targetY = 0,
        currentX = 0,
        currentY = 0;
    const easeFactor = 0.1;

    document.addEventListener("mousemove", (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        targetX = (e.clientX - centerX) / centerX;
        targetY = (e.clientY - centerY) / centerY;
    });

    function animateParallax() {
        currentX += (targetX - currentX) * easeFactor;
        currentY += (targetY - currentY) * easeFactor;
        starsContainer.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`;
        requestAnimationFrame(animateParallax);
    }
    animateParallax();
});

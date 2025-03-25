document.addEventListener("DOMContentLoaded", () => {
    const starContainer = document.getElementById("stars");
    const numberOfStars = 15;

    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 1.5 + 1.5;

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.animationDelay = `${Math.random() * 5}s`;

        starsContainer.appendChild(star);
    }

    for (let i = 0; i < numberOfStars; i++) {
        createStar();
    }
});

// gradient colors
document.addEventListener("DOMContentLoaded", () => {
    const bodyBefore = document.querySelector("body::before");
    const bodyAfter = document.querySelector("body::after");

    const gradients = [
        ["#000000", "#020c1b", "#0a1f44", "#273a7f"], // Deep blue night
        ["#020c1b", "#0a1f44", "#273a7f", "#3b3f80"], // Twilight indigo
        ["#0a1f44", "#273a7f", "#3b3f80", "#484c91"], // Celestial purple
        ["#273a7f", "#3b3f80", "#484c91", "#2a2e5a"], // Cosmic dusk
    ];

    let currentGradientIndex = 0;

    function updateGradients() {
        let nextGradientIndex = (currentGradientIndex + 1) % gradients.length;
        
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
    }

    setInterval(updateGradients, 60000);
    updateGradients(); 
});

// parallax
document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById("stars");

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
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

    function generateStars() {
        starsContainer.innerHTML = ""; 
        const numStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.left = `${Math.random() * window.innerWidth}px`;
            star.style.top = `${Math.random() * window.innerHeight}px`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.opacity = Math.random();
            starsContainer.appendChild(star);
        }
    }

    generateStars(); // Initial star generation

    window.addEventListener("resize", () => {
        generateStars();
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById("stars");
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

    // Parallax variables
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const easeFactor = 0.2;
    const parallaxStrength = 25;

    document.addEventListener("mousemove", (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        targetX = (e.clientX - centerX) / centerX;
        targetY = (e.clientY - centerY) / centerY;
    });

    function animateParallax() {
        currentX += (targetX - currentX) * easeFactor;
        currentY += (targetY - currentY) * easeFactor;
        starsContainer.style.transform = `translate(${currentX * parallaxStrength}px, ${currentY * parallaxStrength}px)`;
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

    requestAnimationFrame(() => {
        generateStars();
    });
    

    window.addEventListener("resize", () => {
        generateStars();
    });
});

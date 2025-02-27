document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;

    const numberOfStars = 100;

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

    function generateStars() {
        starsContainer.innerHTML = "";
        const numStars = Math.floor((window.innerWidth * window.innerHeight) / 8000);

        for (let i = 0; i < numStars; i++) {
            createStar();
        }
    }

    generateStars();
    window.addEventListener("resize", generateStars);

    // Parallax Effect
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
});

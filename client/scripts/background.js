document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;

    // Star generation
    function generateStars() {
        starsContainer.innerHTML = "";
        const count = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        const frag = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.left = `${Math.random() * window.innerWidth}px`;
            star.style.top = `${Math.random() * window.innerHeight}px`;
            const twinkleDur = (Math.random() * 2 + 1.5).toFixed(2);
            const driftDur = (Math.random() * 8 + 6).toFixed(2);
            const twinkleDelay = (Math.random() * 2).toFixed(2);
            star.style.animation = `twinkle ${twinkleDur}s infinite alternate ease-in-out ${twinkleDelay}s, ` +
                `starDrift ${driftDur}s infinite ease-in-out`;
            star.style.opacity = Math.random().toFixed(2);
            star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
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


    // Parallax effect
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
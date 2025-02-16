const starContainer = document.getElementById("stars");
const maxInitialStars = 200; // Stars that appear instantly
const starSpawnRate = 300; // Time (ms) between each new star
let lastTimestamp = Date.now();

function createStar(initial = false) {
    const star = document.createElement("div");
    star.classList.add("star");

    // If it's an initial star, generate anywhere; otherwise, start off-screen right
    const x = initial ? Math.random() * window.innerWidth : window.innerWidth + Math.random() * 50;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 2 + 0.5;
    const twinkleDelay = Math.random() * 5; // Random delay between 0-5s

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${twinkleDelay}s`; // Applies a unique delay per star

    starContainer.appendChild(star);

    // Remove when fully off-screen
    setTimeout(() => {
        star.remove();
    }, 60000); // Matches driftLeft animation duration
}

function generateInitialStars(count) {
    for (let i = 0; i < count; i++) {
        createStar(true);
    }
}

function generateContinuousStars() {
    createStar(false);
}

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        const now = Date.now();
        const timeElapsed = now - lastTimestamp;
        const missedStars = Math.floor(timeElapsed / starSpawnRate);

        for (let i = 0; i < missedStars; i++) {
            createStar(false);
        }

        lastTimestamp = now;
    }
});

generateInitialStars(maxInitialStars);
setInterval(() => {
    lastTimestamp = Date.now();
    generateContinuousStars();
}, starSpawnRate);

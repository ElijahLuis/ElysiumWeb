const starContainer = document.getElementById("stars");
const maxInitialStars = 200; // Stars that appear instantly
const starSpawnRate = 300; // Time (ms) between each new star
let lastTimestamp = Date.now();

function createStar(initial = false) {
    const star = document.createElement("div");
    star.classList.add("star");
    const x = initial ? Math.random() * window.innerWidth : window.innerWidth + Math.random() * 50;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 2 + 0.5;
    const twinkleDelay = Math.random() * 5;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${twinkleDelay}s`;

    starContainer.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 60000); // Matches the driftLeft animation duration
}

// **Generate initial stars instantly**
function generateInitialStars(count) {
    for (let i = 0; i < count; i++) {
        createStar(true);
    }
}

// **Continuously spawn new stars**
setInterval(() => {
    lastTimestamp = Date.now();
    generateContinuousStars();
}, starSpawnRate);

function generateContinuousStars() {
    createStar(false);
}

// **Fix: Prevent Gaps When Switching Tabs**
document.addEventListener("visibilitychange", () => {
    const stars = document.querySelectorAll(".star");

    if (document.hidden) {
        stars.forEach(star => {
            const computedStyle = window.getComputedStyle(star);
            const matrix = computedStyle.transform;

            // Save the current position
            star.dataset.transform = matrix;
            star.style.animation = "none"; // Stop movement
            star.style.transform = matrix; // Keep the last position
        });
    } else {
        stars.forEach(star => {
            star.style.animation = "";
            star.style.transform = "";
        });

        // **Compensate for missed stars while inactive**
        const now = Date.now();
        const timeElapsed = now - lastTimestamp;
        const missedStars = Math.floor(timeElapsed / starSpawnRate);

        for (let i = 0; i < missedStars; i++) {
            createStar(false);
        }

        lastTimestamp = now; // Reset timestamp to prevent double compensation
    }
});

generateInitialStars(maxInitialStars);

// stars
document.addEventListener("DOMContentLoaded", () => {
    const starContainer = document.getElementById("stars");
    const numberOfStars = 200;

    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 2 + 0.5; // 0.5px - 2px
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // random twinkle delay
        const twinkleDelay = Math.random() * 3;
        star.style.animation = `twinkle 3s infinite alternate ease-in-out`;
        star.style.animationDelay = `${twinkleDelay}s`;

        // random hue shift
        star.style.setProperty('--hue-shift', Math.random() * 5 - 2.5);
        starContainer.appendChild(star);
    }

    for (let i = 0; i < numberOfStars; i++) {
        createStar();
    }
});
 
// floating nebulas
document.addEventListener("DOMContentLoaded", () => {
    const nebula1 = document.getElementById("nebula1");
    const nebula2 = document.getElementById("nebula2");

    function randomNebulaColor() {
        const colors = [
            "rgba(72, 61, 139, 0.3)", // Deep purple
            "rgba(75, 0, 130, 0.3)",  // Indigo
            "rgba(139, 0, 139, 0.3)", // Dark magenta
            "rgba(0, 0, 128, 0.3)",   // Midnight blue
            "rgba(30, 144, 255, 0.3)" // Deep sky blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function changeNebulaColor() {
        nebula1.style.background = `radial-gradient(circle, ${randomNebulaColor()}, transparent 70%)`;
        nebula2.style.background = `radial-gradient(circle, ${randomNebulaColor()}, transparent 70%)`;
    }

    setInterval(changeNebulaColor, 30000);
    changeNebulaColor();
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

    setInterval(updateGradients, 120000);
    updateGradients(); 
});

// parallax
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.getElementById("stars");
    const nebula1 = document.getElementById("nebula1");
    const nebula2 = document.getElementById("nebula2");

    document.addEventListener("mousemove", (e) => {
        const { clientX: x, clientY: y } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (x - centerX) / centerX;
        const moveY = (y - centerY) / centerY;

        stars.style.transform = `translate(${moveX * 10}px, ${moveY * 10}px)`;
        nebula1.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px) scale(1.05)`;
        nebula2.style.transform = `translate(${moveX * 30}px, ${moveY * 30}px) scale(1.1)`;
    });
});

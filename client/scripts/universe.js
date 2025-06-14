document.addEventListener('DOMContentLoaded', () => {
  const ring = document.getElementById('space');
  if (!ring) return;

  const planets = ring.querySelectorAll('.planet');
  const leftArrow = document.getElementById('arrow-left');
  const rightArrow = document.getElementById('arrow-right');

  const totalPlanets = planets.length;
  const slice = 360 / totalPlanets;
  // Increase radius for larger planets
  const radius = 380;
  let currentIndex = 0;
  let angle = 0;

  function placePlanets() {
    planets.forEach((planet, i) => {
      const anglePos = i * slice;
      planet.style.transform = `translate(-50%, -50%) rotateY(${anglePos}deg) translateZ(${radius}px)`;
    });
  }

  function spinRing() {
    ring.style.transform = `rotateY(${angle}deg)`;
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalPlanets) % totalPlanets;
      angle += slice;
      spinRing();
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalPlanets;
      angle -= slice;
      spinRing();
    });
  }

  placePlanets();
  spinRing();
});

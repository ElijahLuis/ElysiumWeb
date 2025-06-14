document.addEventListener('DOMContentLoaded', () => {
  const ring = document.getElementById('space');
  if (!ring) return;

  const planets = ring.querySelectorAll('.planet');
  const leftArrow = document.getElementById('arrow-left');
  const rightArrow = document.getElementById('arrow-right');

  const totalPlanets = planets.length;
  const slice = 360 / totalPlanets;
  // Wider radius to give planets more breathing room
  const radius = 300;
  let currentIndex = 0;

  function placePlanets() {
    planets.forEach((planet, i) => {
      const angle = i * slice;
      planet.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
  }

  function spinRing() {
    ring.style.transform = `rotateY(${-currentIndex * slice}deg)`;
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalPlanets) % totalPlanets;
      spinRing();
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalPlanets;
      spinRing();
    });
  }

  placePlanets();
  spinRing();
});

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;

  // Placeholder star data with coordinates in pixels
  const starData = [
    { name: 'Lumen', x: 80, y: 120 },
    { name: 'Shade', x: 220, y: 60 },
    { name: 'Echo', x: 400, y: 200 },
    { name: 'Pulse', x: 150, y: 340 },
    { name: 'Gleam', x: 320, y: 420 }
  ];

  starData.forEach(({ name, x, y }) => {
    const starEl = document.createElement('div');
    starEl.className = 'dummy-star';
    starEl.style.left = `${x}px`;
    starEl.style.top = `${y}px`;
    starEl.textContent = '✦';
    starEl.setAttribute('aria-label', name);
    canvas.appendChild(starEl);
  });
});

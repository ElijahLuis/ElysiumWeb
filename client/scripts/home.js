// Redirect to universe page
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('journey-btn');
  const overlay = document.getElementById('transitionOverlay');
  if (btn && overlay) {
    btn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      overlay.classList.add('fade-to-black');
      overlay.addEventListener('animationend', () => {
        window.location.href = 'universe.html';
      }, { once: true });
    });
  }
});

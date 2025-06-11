document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('journey-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.location.href = 'universe.html';
    });
  }
});

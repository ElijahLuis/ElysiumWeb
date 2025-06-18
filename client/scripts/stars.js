(function () {
  if (typeof document === 'undefined') return;
  document.addEventListener('DOMContentLoaded', () => {
    const realm = (window.location.pathname.split('/').pop() || '').replace('.html','');
    const star = document.createElement('div');
    star.id = 'collect-star';
    star.className = 'collect-star';
    star.textContent = '⭐';
    document.body.appendChild(star);

    const truths = [
      'Grief is love persevering.',
      'You do not heal by forgetting, but by remembering differently.',
      'Even the stars you can\u2019t see are still there.'
    ];

    function showChoices() {
      const overlay = document.createElement('div');
      overlay.id = 'star-overlay';
      truths.forEach(truth => {
        const btn = document.createElement('button');
        btn.className = 'truth-btn';
        btn.textContent = truth;
        btn.addEventListener('click', () => {
          try {
            localStorage.setItem(`elysium-truth-${realm}`, truth);
          } catch (e) {}
          overlay.textContent = 'Star saved \u2728';
          setTimeout(() => overlay.remove(), 800);
        });
        overlay.appendChild(btn);
      });
      document.body.appendChild(overlay);
    }

    star.addEventListener('click', showChoices);
  });
})();

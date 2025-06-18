(function(){
  if (typeof document === 'undefined') return;
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const win = document.createElement('div');
        win.className = 'space-window';
        win.textContent = 'Realm space awaits...';
        document.body.appendChild(win);
        requestAnimationFrame(() => win.classList.add('show'));
        win.addEventListener('click', () => win.remove());
      });
    });
  });
})();

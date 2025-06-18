(function(){
  if (typeof document === 'undefined') return;
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const win = document.createElement('div')
        win.className = 'space-window'
        win.textContent = 'Realm space awaits...'
        document.body.appendChild(win)
        requestAnimationFrame(() => win.classList.add('show'))

        function removeWin() {
          win.classList.remove('show')
          win.classList.add('fade-out')
          win.addEventListener('transitionend', () => win.remove(), { once: true })
        }

        win.addEventListener('click', removeWin)
        setTimeout(removeWin, 3000)
      })
    })
  })
})();

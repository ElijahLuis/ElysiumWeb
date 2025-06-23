;(function () {
  if (typeof document === 'undefined') return
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.select-btn').forEach((selectButton) => {
      selectButton.addEventListener('click', () => {
        const popupWindow = document.createElement('div')
        popupWindow.className = 'space-window'
        popupWindow.textContent = 'Realm space awaits...'
        document.body.appendChild(popupWindow)
        requestAnimationFrame(() => popupWindow.classList.add('show'))

        function closePopup() {
          popupWindow.classList.remove('show')
          popupWindow.classList.add('fade-out')
          popupWindow.addEventListener(
            'transitionend',
            () => popupWindow.remove(),
            { once: true },
          )
        }

        popupWindow.addEventListener('click', closePopup)
        setTimeout(closePopup, 2000)
      })
    })
  })
})()

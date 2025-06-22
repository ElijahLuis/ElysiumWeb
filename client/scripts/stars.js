(function () {
  if (typeof document === 'undefined') return

  document.addEventListener('DOMContentLoaded', () => {
    const realm = (window.location.pathname.split('/').pop() || '').replace(
      '.html',
      '',
    )

    const star = document.createElement('button')
    star.id = 'collect-star'
    star.className = 'collect-star'
    star.setAttribute('aria-label', 'Collect a star')
    star.textContent = '⭐'
    document.body.appendChild(star)

    const TRUTHS = [
      'Grief is love persevering.',
      'You do not heal by forgetting, but by remembering differently.',
      "Even the stars you can't see are still there.",
    ]

    function showChoices() {
      if (document.getElementById('star-overlay')) return

      const overlay = document.createElement('div')
      overlay.id = 'star-overlay'
      overlay.setAttribute('role', 'dialog')
      overlay.setAttribute('aria-live', 'polite')
      const list = document.createElement('ul')

      TRUTHS.forEach((truth) => {
        const btn = document.createElement('button')
        btn.className = 'truth-btn'
        btn.textContent = truth
        btn.setAttribute('aria-live', 'polite')
        btn.addEventListener('click', () => {
          try {
            localStorage.setItem(`elysium-truth-${realm}`, truth)
          } catch (e) {}
          overlay.textContent = 'Star saved \u2728'
          setTimeout(() => overlay.remove(), 800)
        })
        const li = document.createElement('li')
        li.appendChild(btn)
        list.appendChild(li)
      })

      overlay.appendChild(list)
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove()
      })

      document.addEventListener(
        'keydown',
        (e) => {
          if (e.key === 'Escape') overlay.remove()
        },
        { once: true },
      )

      document.body.appendChild(overlay)
    }

    star.addEventListener('click', showChoices)
  })
})()

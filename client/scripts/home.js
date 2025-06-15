document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('journey-btn')

  if (!btn) return

  const driftToHome = () => {
    const overlay = document.createElement('div')
    overlay.style.position = 'fixed'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.width = '100%'
    overlay.style.height = '100%'
    overlay.style.background = 'black'
    overlay.style.opacity = '0'
    overlay.style.transition = 'opacity 750ms ease-out'
    overlay.style.zIndex = '50'
    document.body.appendChild(overlay)

    requestAnimationFrame(() => {
      overlay.style.opacity = '1'
    })

    setTimeout(() => {
      window.location.href = 'home.html'
    }, 750)
  }

  const hasSeenJourney = localStorage.getItem('journeySeen') === 'true'

  if (hasSeenJourney) {
    btn.style.display = 'none'
    driftToHome()
    return
  }

  btn.addEventListener('click', e => {
    e.preventDefault()
    localStorage.setItem('journeySeen', 'true')
    driftToUniverse()
  })
})

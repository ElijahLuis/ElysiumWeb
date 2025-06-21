;(function () {
  function ripple(element, event, onEnd) {
    const rect = element.getBoundingClientRect()
    const size = 60
    const ring = document.createElement('span')
    ring.className = 'ripple'
    ring.style.width = ring.style.height = `${size}px`
    ring.style.left = `${event.clientX - rect.left - size / 2}px`
    ring.style.top = `${event.clientY - rect.top - size / 2}px`
    ring.style.setProperty('--hue', Math.floor(Math.random() * 360))

    element.appendChild(ring)
    ring.addEventListener(
      'animationend',
      () => {
        ring.remove()
        if (typeof onEnd === 'function') onEnd()
      },
      { once: true },
    )
  }

  window.createRainbowRipple = ripple

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button:not(.cluster-bubble)').forEach((btn) => {
      btn.style.position = 'relative'
      btn.style.overflow = 'hidden'
      btn.addEventListener('click', (e) => ripple(btn, e))
    })
  })
})()

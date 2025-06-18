;(function () {
  function ripple(element, event, onEnd) {
    const rect = element.getBoundingClientRect()
    // use a small, consistent ring size for smoother performance
    const size = 80
    const ring = document.createElement('span')
    ring.className = 'ripple'
    ring.style.width = ring.style.height = `${size}px`
    ring.style.left = `${event.clientX - rect.left - size / 2}px`
    ring.style.top = `${event.clientY - rect.top - size / 2}px`

    // ensure the effect stays clipped within its parent
    const styles = getComputedStyle(element)
    if (styles.position === 'static') element.style.position = 'relative'
    if (styles.overflow !== 'hidden') element.style.overflow = 'hidden'

    const hue = Math.floor(Math.random() * 360)
    ring.style.background = `radial-gradient(circle,
      hsla(${hue},100%,70%,0) 40%,
      hsla(${hue},100%,70%,1) 45%,
      hsla(${hue},100%,70%,1) 50%,
      hsla(${hue},100%,70%,0) 55%)`
    ring.style.boxShadow = `0 0 6px hsla(${hue},100%,70%,0.9)`

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
      if (getComputedStyle(btn).position === 'static') {
        btn.style.position = 'relative'
      }
      btn.style.overflow = 'hidden'
      btn.addEventListener('click', (e) => ripple(btn, e))
    })
  })
})()

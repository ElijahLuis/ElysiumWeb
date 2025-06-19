/**
 * Gentle parallax for a given element.
 * Exported globally so React pages can hook in.
 * The star field itself is drawn on a canvas so
 * parallax works across static and React pages.
 */
function createParallax(container, { multiplier = 12, ease = 0.1 } = {}) {
  if (!container) return { destroy() {} }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return { destroy() {} }

  let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0,
    frameId

  const onMouse = (e) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    targetX = (e.clientX - centerX) / centerX
    targetY = (e.clientY - centerY) / centerY
  }

  const onTouch = (e) => {
    const t = e.touches[0]
    if (!t) return
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    targetX = (t.clientX - centerX) / centerX
    targetY = (t.clientY - centerY) / centerY
  }

  const onTilt = (e) => {
    if (e.beta == null || e.gamma == null) return
    const maxTilt = 30
    targetX = e.gamma / maxTilt
    targetY = e.beta / maxTilt
  }

  const animate = () => {
    currentX += (targetX - currentX) * ease
    currentY += (targetY - currentY) * ease
    container.style.transform = `translate3d(${currentX * multiplier}px, ${currentY * multiplier}px, 0)`
    frameId = requestAnimationFrame(animate)
  }

  window.addEventListener('mousemove', onMouse)
  window.addEventListener('touchmove', onTouch, { passive: true })
  window.addEventListener('deviceorientation', onTilt)
  frameId = requestAnimationFrame(animate)

  return {
    destroy() {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('deviceorientation', onTilt)
      cancelAnimationFrame(frameId)
    },
  }
}

window.createParallax = createParallax

function startBackground() {
  const init = () => {
    const starsContainer = document.getElementById('stars')
    if (!starsContainer) return false

    const overlay = document.getElementById('fadeOverlay')

    const canvas = document.createElement('canvas')
    canvas.id = 'starCanvas'
    starsContainer.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    let stars = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateStars()
    }

    function generateStars() {
      const count = Math.floor((canvas.width * canvas.height) / 2500)
      stars = []
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          base: Math.random() * 0.6 + 0.2,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function draw(time = 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const alpha = s.base + Math.sin(time / 1000 + s.phase) * s.base
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      requestAnimationFrame(draw)
    }

    let parallaxInstance

    function initStars() {
      resize()
      draw()
      if (!parallaxInstance) {
        parallaxInstance = createParallax(starsContainer)
      }
      window.addEventListener('resize', resize)
    }

    if (overlay && overlay.classList.contains('start')) {
      overlay.addEventListener(
        'animationend',
        () => {
          initStars()
        },
        { once: true },
      )
    } else {
      initStars()
    }

    return true
  }

  if (!init()) {
    const observer = new MutationObserver(() => {
      if (init()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startBackground)
} else {
  startBackground()
}

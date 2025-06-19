/**
 * Gentle parallax for a given element.
 * Exported globally so React pages can hook in.
 */
function createParallax(
  container,
  { multiplier = 12, ease = 0.1, zIndex = 0 } = {},
) {
  if (!container) return { destroy() {} }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return { destroy() {} }

  container.style.zIndex = zIndex

  let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0,
    frameId

  const onPointer = (e) => {
    const src = 'touches' in e ? e.touches[0] : e
    if (!src) return
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    targetX = (src.clientX - centerX) / centerX
    targetY = (src.clientY - centerY) / centerY
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

  window.addEventListener('mousemove', onPointer)
  window.addEventListener('touchmove', onPointer, { passive: true })
  window.addEventListener('deviceorientation', onTilt)
  frameId = requestAnimationFrame(animate)

  return {
    destroy() {
      window.removeEventListener('mousemove', onPointer)
      window.removeEventListener('touchmove', onPointer)
      window.removeEventListener('deviceorientation', onTilt)
      cancelAnimationFrame(frameId)
    },
  }
}

window.createParallax = createParallax

function startBackground() {
  const starsContainer = document.getElementById('stars')
  if (!starsContainer) return

  const overlay = document.getElementById('fadeOverlay')

  function generateStars() {
    starsContainer.innerHTML = ''
    const count = Math.floor((window.innerWidth * window.innerHeight) / 3500)
    const frag = document.createDocumentFragment()
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      star.classList.add('star')
      star.style.left = `${Math.random() * window.innerWidth}px`
      star.style.top = `${Math.random() * window.innerHeight}px`
      const size = Math.random() * 1.5 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.animationDuration = `${Math.random() * 2 + 2}s`
      star.style.opacity = Math.random()
      frag.appendChild(star)
    }
    starsContainer.appendChild(frag)
  }

  let parallaxInstance

  function initStars() {
    generateStars()
    if (!parallaxInstance) {
      parallaxInstance = createParallax(starsContainer)
    }
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(generateStars, 200)
    })
  }

  if (overlay && overlay.classList.contains('start')) {
    overlay.addEventListener(
      'animationend',
      () => {
        console.log('overlay ended')
        initStars()
      },
      { once: true },
    )
  } else {
    initStars()
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startBackground)
} else {
  startBackground()
}

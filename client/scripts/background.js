document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars')
  if (!starsContainer) return

  const overlay = document.getElementById('fadeOverlay')
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  // Star generation
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
  function initStars() {
    generateStars()
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(generateStars, 200)
    })
  }

  if (overlay) {
    const style = getComputedStyle(overlay)
    if (style.animationName !== 'none') {
      overlay.addEventListener(
        'animationend',
        () => {
          console.log('overlay animation end')
          initStars()
        },
        { once: true },
      )
    } else {
      initStars()
    }
  } else {
    initStars()
  }

  // Parallax effect - stars drift gently with the cursor
  let pointerX = 0,
    pointerY = 0,
    currentX = 0,
    currentY = 0
  const ease = 0.05
  const intensity = 20
  let running = false

  function trackPointer(e) {
    const x = e.clientX ?? e.touches?.[0]?.clientX
    const y = e.clientY ?? e.touches?.[0]?.clientY
    const w = window.innerWidth
    const h = window.innerHeight
    pointerX = (x / w - 0.5) * 2
    pointerY = (y / h - 0.5) * 2
    if (!running) {
      running = true
      requestAnimationFrame(step)
    }
  }

  function step() {
    currentX += (pointerX - currentX) * ease
    currentY += (pointerY - currentY) * ease
    starsContainer.style.transform = `translate3d(${currentX * intensity}px, ${currentY * intensity}px, 0)`
    if (Math.abs(pointerX - currentX) > 0.001 || Math.abs(pointerY - currentY) > 0.001) {
      requestAnimationFrame(step)
    } else {
      running = false
    }
  }

  if (!reduceMotion) {
    window.addEventListener('mousemove', trackPointer)
    window.addEventListener('touchmove', trackPointer, { passive: true })
  }
})

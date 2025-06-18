document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars')
  if (!starsContainer) return

  const overlay = document.getElementById('fadeOverlay')
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  // Star generation
  let starsInit = false

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
    if (starsInit) return
    starsInit = true
    generateStars()
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
        console.log('fade overlay animation ended')
        initStars()
      },
      { once: true },
    )
  } else {
    initStars()
  }

  // Parallax effect respects reduced-motion preference
  if (!reduceMotion) {
    let targetX = 0,
      targetY = 0,
      currentX = 0,
      currentY = 0
    const ease = 0.08
    const range = 18
    let ticking = false

    const updatePointer = (x, y) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      targetX = ((x - centerX) / centerX) * range
      targetY = ((y - centerY) / centerY) * range
      if (!ticking) {
        requestAnimationFrame(step)
        ticking = true
      }
    }

    const pointerMove = (e) => {
      if (e.touches && e.touches[0]) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY)
      } else {
        updatePointer(e.clientX, e.clientY)
      }
    }

    function step() {
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease
      starsContainer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translateZ(0)`
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        requestAnimationFrame(step)
      } else {
        ticking = false
      }
    }

    window.addEventListener('pointermove', pointerMove, { passive: true })
    window.addEventListener('mousemove', pointerMove, { passive: true })
    window.addEventListener('touchmove', pointerMove, { passive: true })
  }
})

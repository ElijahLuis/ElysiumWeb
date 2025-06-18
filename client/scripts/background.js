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

  // Parallax effect respects reduced-motion preference
  if (!reduceMotion) {
    let pointerX = 0,
      pointerY = 0,
      currentX = 0,
      currentY = 0
    const ease = 0.08
    let animating = false

    function update() {
      currentX += (pointerX - currentX) * ease
      currentY += (pointerY - currentY) * ease
      starsContainer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      if (
        Math.abs(currentX - pointerX) > 0.1 ||
        Math.abs(currentY - pointerY) > 0.1
      ) {
        requestAnimationFrame(update)
      } else {
        animating = false
      }
    }

    const trackPointer = (e) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 30
      pointerY = (e.clientY / window.innerHeight - 0.5) * 30
      if (!animating) {
        animating = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('pointermove', trackPointer)
    window.addEventListener('mousemove', trackPointer)
  }
})

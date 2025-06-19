// Initialize the starfield once the page is ready
document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars')
  if (!starsContainer) return

  const overlay = document.getElementById('fadeOverlay')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function generateStars() {
    starsContainer.innerHTML = ''
    const count = Math.floor((window.innerWidth * window.innerHeight) / 2500)
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

  // Parallax
  if (reduceMotion) return

  let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0
  const ease = 0.1

  function animate() {
    currentX += (targetX - currentX) * ease
    currentY += (targetY - currentY) * ease
    starsContainer.style.transform = `translate3d(${currentX * 12}px, ${currentY * 12}px, 0)`
    requestAnimationFrame(animate)
  }

  window.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    targetX = (e.clientX - centerX) / centerX
    targetY = (e.clientY - centerY) / centerY
  })

  window.addEventListener(
    'touchmove',
    (e) => {
      const touch = e.touches[0]
      if (!touch) return
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      targetX = (touch.clientX - centerX) / centerX
      targetY = (touch.clientY - centerY) / centerY
    },
    { passive: true },
  )

  animate()
})


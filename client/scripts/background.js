document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars')
  if (!starsContainer) return

  const nebula1 = document.getElementById('nebula1')
  const nebula2 = document.getElementById('nebula2')

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
  let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0
  const easeFactor = 0.1

  if (!reduceMotion) {
    document.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      targetX = (e.clientX - centerX) / centerX
      targetY = (e.clientY - centerY) / centerY
    })

    function animateParallax() {
      currentX += (targetX - currentX) * easeFactor
      currentY += (targetY - currentY) * easeFactor
      const x = currentX * 10
      const y = currentY * 10
      starsContainer.style.transform = `translate(${x}px, ${y}px)`
      if (nebula1) nebula1.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px) scale(1.02)`
      if (nebula2) nebula2.style.transform = `translate(${x * 2}px, ${y * 2}px) scale(1.04)`
      requestAnimationFrame(animateParallax)
    }

    animateParallax()
  }
})

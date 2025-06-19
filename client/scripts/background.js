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

  // Parallax effect respects reduced-motion preference
  let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0
  const easeFactor = 0.1
  let rafId = null

  function updatePointer(e) {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    targetX = (e.clientX - centerX) / centerX
    targetY = (e.clientY - centerY) / centerY
    if (!rafId) rafId = requestAnimationFrame(animateParallax)
  }

  function animateParallax() {
    currentX += (targetX - currentX) * easeFactor
    currentY += (targetY - currentY) * easeFactor
    starsContainer.style.transform = `translate3d(${currentX * 15}px, ${currentY * 15}px, 0)`
    rafId = requestAnimationFrame(animateParallax)
  }

  if (!reduceMotion) {
    window.addEventListener('pointermove', updatePointer)
    window.addEventListener('mousemove', updatePointer)
  }
})

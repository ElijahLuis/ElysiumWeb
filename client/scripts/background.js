document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars')
  if (!starsContainer) return

  // Star generation
  function generateStars() {
    starsContainer.innerHTML = ''
    // more stars by increasing density
    const DENSITY = 4000
    const count = Math.floor((window.innerWidth * window.innerHeight) / DENSITY)
    const frag = document.createDocumentFragment()
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      star.classList.add('star')
      star.style.left = `${Math.random() * window.innerWidth}px`
      star.style.top = `${Math.random() * window.innerHeight}px`
      star.style.animationDuration = `${Math.random() * 3 + 2}s`
      star.style.opacity = Math.random()
      frag.appendChild(star)
    }
    starsContainer.appendChild(frag)
  }

  generateStars()

  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(generateStars, 200)
  })

  // Parallax effect with optional overrides
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  const urlParams = new URLSearchParams(window.location.search)
  const param = urlParams.get('parallax')

  try {
    if (param !== null) localStorage.setItem('parallax', param)
  } catch (e) {
    // localStorage may be unavailable; ignore failures
  }

  let stored = null
  try {
    stored = localStorage.getItem('parallax')
  } catch (e) {}

  let enableParallax = !prefersReduced
  if (stored === '1') enableParallax = true
  if (stored === '0') enableParallax = false

  if (enableParallax) {
    let targetX = 0,
      targetY = 0,
      currentX = 0,
      currentY = 0
    const easeFactor = 0.1

    document.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      targetX = (e.clientX - centerX) / centerX
      targetY = (e.clientY - centerY) / centerY
    })

    function animateParallax() {
      currentX += (targetX - currentX) * easeFactor
      currentY += (targetY - currentY) * easeFactor
      starsContainer.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`
      requestAnimationFrame(animateParallax)
    }
    animateParallax()
  }
})

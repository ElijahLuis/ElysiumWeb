// Initialize the starfield once the page is ready
document.addEventListener('DOMContentLoaded', startBackground)

function startBackground() {
  const starsContainer = document.getElementById('stars')
  if (!starsContainer) return

  // ----- Star generation -----
  function generateStars() {
    starsContainer.innerHTML = ''

    // Scale star count with the viewport for a dense sky
    const count = Math.floor((window.innerWidth * window.innerHeight) / 2500)
    const frag = document.createDocumentFragment()

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      star.classList.add('star')
      star.style.left = `${Math.random() * window.innerWidth}px`
      star.style.top = `${Math.random() * window.innerHeight}px`

      // Random twinkle and drift speeds with staggered start times
      const twinkle = (Math.random() * 2 + 2).toFixed(2)
      const drift = (Math.random() * 10 + 10).toFixed(2)
      const delay = (Math.random() * 4).toFixed(2)
      star.style.animationDuration = `${twinkle}s, ${drift}s`
      star.style.animationDelay = `${delay}s, 0s`

      star.style.opacity = (Math.random() * 0.7 + 0.3).toFixed(2)
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

  // ----- Parallax effect -----
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  if (reduceMotion) return

  let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0
  const ease = 0.08

  function updatePointer(e) {
    const { clientX, clientY } = e.touches ? e.touches[0] : e
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    targetX = (clientX - centerX) / centerX
    targetY = (clientY - centerY) / centerY
  }

  function animate() {
    currentX += (targetX - currentX) * ease
    currentY += (targetY - currentY) * ease
    starsContainer.style.transform = `translate3d(${currentX * 12}px, ${currentY * 12}px, 0)`
    requestAnimationFrame(animate)
  }

  window.addEventListener('pointermove', updatePointer, { passive: true })
  window.addEventListener('touchmove', updatePointer, { passive: true })
  animate()
}


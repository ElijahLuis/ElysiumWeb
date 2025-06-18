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
  const ease = 0.06
  const pointer = { x: 0, y: 0 }
  const offset = { x: 0, y: 0 }
  let animating = false

  function trackPointer(e) {
    pointer.x = e.clientX / window.innerWidth - 0.5
    pointer.y = e.clientY / window.innerHeight - 0.5
    if (!animating) {
      animating = true
      requestAnimationFrame(step)
    }
  }

  function step() {
    offset.x += (pointer.x - offset.x) * ease
    offset.y += (pointer.y - offset.y) * ease
    starsContainer.style.transform = `translate3d(${offset.x * 15}px, ${offset.y * 15}px, 0)`

    if (Math.abs(pointer.x - offset.x) > 0.001 || Math.abs(pointer.y - offset.y) > 0.001) {
      requestAnimationFrame(step)
    } else {
      animating = false
    }
  }

  if (!reduceMotion) {
    window.addEventListener('pointermove', trackPointer)
    window.addEventListener('mousemove', trackPointer)
  }
})

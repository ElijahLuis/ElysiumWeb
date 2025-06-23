document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars')
  if (!starsContainer) return

  // Star generation
  function generateStars() {
    starsContainer.innerHTML = ''
    const minStars = 400
    const maxStars = 600
    const pageWidth = document.documentElement.clientWidth
    const pageHeight = Math.max(document.body.scrollHeight, window.innerHeight)
    const area = pageWidth * pageHeight
    const baseCount = Math.floor(area / 5000)
    const count = Math.max(minStars, Math.min(maxStars, baseCount))
    const frag = document.createDocumentFragment()
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      star.classList.add('star')
      star.style.left = `${Math.random() * pageWidth}px`
      star.style.top = `${Math.random() * pageHeight}px`
      star.style.animationDuration = `${Math.random() * 3 + 2}s`
      star.style.opacity = Math.random().toString()
      frag.appendChild(star)
    }
    starsContainer.appendChild(frag)
  }

  generateStars()

  let lastWidth = 0,
    lastHeight = 0
  let resizeTimeout
  function checkSize() {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      const width = document.documentElement.clientWidth
      const height = Math.max(document.body.scrollHeight, window.innerHeight)
      if (width !== lastWidth || height !== lastHeight) {
        lastWidth = width
        lastHeight = height
        generateStars()
      }
    }, 200)
  }

  window.addEventListener('resize', checkSize)
  window.addEventListener('scroll', checkSize)

  // Gradient colors
  function adjust(hex, amt) {
    const col = hex.startsWith('#') ? hex.slice(1) : hex
    const num = parseInt(col, 16)
    const r = (num >> 16) + amt
    const g = ((num >> 8) & 0xff) + amt
    const b = (num & 0xff) + amt
    return (
      '#' +
      (
        0x1000000 +
        (Math.max(0, Math.min(255, r)) << 16) +
        (Math.max(0, Math.min(255, g)) << 8) +
        Math.max(0, Math.min(255, b))
      )
        .toString(16)
        .slice(1)
    )
  }

  function toRgba(hex, alpha) {
    const col = hex.startsWith('#') ? hex.slice(1) : hex
    const num = parseInt(col, 16)
    const r = num >> 16
    const g = (num >> 8) & 0xff
    const b = num & 0xff
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  function buildGradients(base) {
    const bodyStyles = getComputedStyle(document.body)
    const alpha = parseFloat(
      bodyStyles.getPropertyValue('--gradient-alpha') || '0.75',
    )
    return [
      [
        toRgba(adjust(base, -160), alpha),
        toRgba(adjust(base, -120), alpha),
        toRgba(adjust(base, -80), alpha),
        toRgba(adjust(base, -40), alpha),
      ],
      [
        toRgba(adjust(base, -120), alpha),
        toRgba(adjust(base, -80), alpha),
        toRgba(adjust(base, -40), alpha),
        toRgba(base, alpha),
      ],
      [
        toRgba(adjust(base, -80), alpha),
        toRgba(adjust(base, -40), alpha),
        toRgba(base, alpha),
        toRgba(adjust(base, 40), alpha),
      ],
      [
        toRgba(adjust(base, -40), alpha),
        toRgba(base, alpha),
        toRgba(adjust(base, 40), alpha),
        toRgba(adjust(base, -20), alpha),
      ],
    ]
  }

  const realmEl = document.querySelector('.realm')
  const realmColor =
    realmEl && getComputedStyle(realmEl).getPropertyValue('--realm-color')
  const gradients = realmColor
    ? buildGradients(realmColor.trim())
    : [
        ['#000000', '#020c1b', '#0a1f44', '#273a7f'],
        ['#020c1b', '#0a1f44', '#273a7f', '#3b3f80'],
        ['#0a1f44', '#273a7f', '#3b3f80', '#484c91'],
        ['#273a7f', '#3b3f80', '#484c91', '#2a2e5a'],
      ]

  let currentGradientIndex = 0
  function updateGradients() {
    const nextGradientIndex = (currentGradientIndex + 1) % gradients.length
    const currentColors = gradients[currentGradientIndex]
    const nextColors = gradients[nextGradientIndex]

    document.body.style.setProperty(
      '--gradient-current',
      `linear-gradient(to bottom, ${currentColors[0]}, ${currentColors[1]}, ${currentColors[2]}, ${currentColors[3]})`,
    )
    document.body.style.setProperty(
      '--gradient-next',
      `linear-gradient(to bottom, ${nextColors[0]}, ${nextColors[1]}, ${nextColors[2]}, ${nextColors[3]})`,
    )

    currentGradientIndex = nextGradientIndex
  }
  updateGradients()
  setInterval(updateGradients, 60000)

  // Parallax effect
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
})

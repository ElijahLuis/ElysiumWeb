document.addEventListener('DOMContentLoaded', () => {
  const ring = document.getElementById('space')
  if (!ring) return

  const planets = Array.from(ring.querySelectorAll('.planet'))
  const leftArrow = document.getElementById('arrow-left')
  const rightArrow = document.getElementById('arrow-right')

  const totalPlanets = planets.length
  const slice = 360 / totalPlanets
  const radius = 520
  let angle = 0

  function updatePlanets() {
    let frontmost = null
    let maxScale = 0

    planets.forEach((planet, i) => {
      const theta = angle + i * slice
      const rad = (theta * Math.PI) / 180
      const depth = (1 + Math.cos(rad)) / 2
      const scale = 0.2 + 0.8 * depth * depth
      planet.style.transform = `translate(-50%, -50%) rotateY(${theta}deg) translateZ(${radius}px) rotateY(${-theta}deg) scale(${scale})`
      planet.style.zIndex = Math.round(scale * 100)

      if (scale > maxScale) {
        maxScale = scale
        frontmost = planet
      }
    })

    planets.forEach(p => p.classList.remove('selected'))
    if (frontmost) frontmost.classList.add('selected')
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      angle += slice
      updatePlanets()
    })
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      angle -= slice
      updatePlanets()
    })
  }

  updatePlanets()
})

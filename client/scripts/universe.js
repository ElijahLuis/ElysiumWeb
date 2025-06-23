document.addEventListener('DOMContentLoaded', () => {
  const ring = document.getElementById('space')
  if (!ring) return

  const planets = Array.from(ring.querySelectorAll('.planet'))
  const quickMenu = document.getElementById('quick-menu')
  const quickDots = []

  const overlayInfo = window.overlayData || {}

  planets.forEach((p) => {
    const name = p.textContent || ''
    const data = overlayInfo[p.id] || {}

    const inner = document.createElement('span')
    inner.className = 'planet-inner'

    const label = document.createElement('span')
    label.className = 'planet-label'
    label.textContent = name

    const icon = document.createElement('span')
    icon.className = 'planet-icon'
    if (data.icon) icon.textContent = data.icon

    inner.appendChild(label)
    inner.appendChild(icon)

    const delay = -Math.random() * 8
    inner.style.animationDelay = `${delay}s, ${delay}s`

    p.textContent = ''
    p.appendChild(inner)
  })

  if (quickMenu) {
    planets.forEach((p, i) => {
      const dot = document.createElement('button')
      dot.className = 'quick-dot'
      const glow = getComputedStyle(p).getPropertyValue('--glow-color')
      if (glow) dot.style.setProperty('--dot-color', glow.trim())
      const icon = overlayInfo[p.id]?.icon
      if (icon) dot.textContent = icon
      dot.addEventListener('click', () => {
        if (focused) return
        pauseFloat()
        currentIndex = i
        angle = -slice * i
        updatePlanets()
      })
      quickMenu.appendChild(dot)
      quickDots.push(dot)
    })
    // arrange in a circle
    const radius = 60
    quickDots.forEach((dot, idx) => {
      const theta = (idx / quickDots.length) * Math.PI * 2 - Math.PI / 2
      const x = 50 + radius * Math.cos(theta)
      const y = 50 + radius * Math.sin(theta)
      dot.style.left = `${x}%`
      dot.style.top = `${y}%`
    })
  }

  const leftArrow = document.getElementById('arrow-left')
  const rightArrow = document.getElementById('arrow-right')
  const selectButton = document.getElementById('select-button')
  const overlay = document.getElementById('realm-overlay')
  let yesBtn, noBtn
  let lastFocus
  const ringElem = ring

  function pauseFloat(ms = 700) {
    if (!ringElem) return
    ringElem.classList.add('paused')
    if (ms > 0) setTimeout(() => ringElem.classList.remove('paused'), ms)
  }

  // keep focus cycling within the overlay when it is active
  function trapFocus(e) {
    if (!overlay || !overlay.classList.contains('active')) return
    if (e.key !== 'Tab') return

    const focusable = overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const totalPlanets = planets.length
  const slice = 360 / totalPlanets
  const radius = 520
  let angle = 0
  let currentIndex = 0
  let focused = false

  const startKey = window.location.hash.replace('#', '')
  if (startKey) {
    const idx = planets.findIndex((p) => p.id === startKey)
    if (idx >= 0) {
      currentIndex = idx
      angle = -slice * idx
    }
  }

  // overlay details provided globally by overlayData.js
  const overlayData = window.overlayData || {}

  function updatePlanets() {
    planets.forEach((planet, i) => {
      const theta = angle + i * slice
      const rad = (theta * Math.PI) / 180
      const depth = (1 + Math.cos(rad)) / 2
      const scale = 0.2 + 0.8 * depth * depth
      planet.style.setProperty('--theta', `${theta}deg`)
      planet.style.setProperty('--radius', `${radius}px`)
      planet.style.setProperty('--scale', scale)
      planet.style.zIndex = Math.round(scale * 100)
      planet.classList.toggle('active', i === currentIndex)
    })
    quickDots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex)
    })
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      if (focused) return
      pauseFloat()
      angle += slice
      currentIndex = (currentIndex - 1 + totalPlanets) % totalPlanets
      updatePlanets()
    })
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      if (focused) return
      pauseFloat()
      angle -= slice
      currentIndex = (currentIndex + 1) % totalPlanets
      updatePlanets()
    })
  }

  function hideOverlay() {
    if (!overlay) return
    overlay.classList.remove('active')
    setTimeout(() => {
      overlay.classList.add('hidden')
      overlay.innerHTML = ''
    }, 400)
    if (yesBtn) yesBtn.removeEventListener('click', confirmTravel)
    if (noBtn) noBtn.removeEventListener('click', revertSelection)
    // release focus trap and return focus to the element that opened the dialog
    overlay.removeEventListener('keydown', trapFocus)
    overlay.removeAttribute('tabindex')
    if (lastFocus && lastFocus.focus) lastFocus.focus()
  }

  function revertSelection() {
    hideOverlay()
    planets.forEach((p) => {
      p.classList.remove('faded', 'focused')
      p.style.removeProperty('--scale-mult')
    })
    const active = planets[currentIndex]
    active.style.removeProperty('--scale-mult')
    if (selectButton) {
      selectButton.classList.remove('fade-out')
      selectButton.classList.add('fade-in')
    }
    pauseFloat(700)
    focused = false
  }

  function confirmTravel() {
    const realm = yesBtn?.dataset.realm
    if (!realm) return

    const fadeOverlay = document.getElementById('fadeOverlay')
    if (fadeOverlay) {
      fadeOverlay.classList.remove('start')
      void fadeOverlay.offsetWidth
      fadeOverlay.classList.add('fade-in')
    }
    pauseFloat(0)

    setTimeout(() => {
      window.location.href = `${realm}.html`
    }, 600)
  }

  function showOverlay(realmKey) {
    if (!overlay) return
    const data = overlayData[realmKey]
    if (!data) return

    const source = document.getElementById(realmKey)
    if (source) {
      const glow = getComputedStyle(source).getPropertyValue('--glow-color')
      if (glow) overlay.style.setProperty('--glow-color', glow.trim())
    }

    overlay.innerHTML = ''

    const name = document.createElement('h2')
    name.textContent = realmKey.charAt(0).toUpperCase() + realmKey.slice(1)

    const icon = document.createElement('div')
    icon.textContent = data.icon
    icon.className = 'overlay-icon'
    icon.style.fontSize = '3.5rem'
    icon.style.margin = '20px 0'

    const list = document.createElement('ul')
    list.className = 'overlay-features'
    data.features.forEach((f) => {
      const li = document.createElement('li')
      li.textContent = f
      list.appendChild(li)
    })

    const confirm = document.createElement('div')
    confirm.className = 'overlay-confirm'

    const question = document.createElement('p')
    question.textContent = `Travel to ${name.textContent}?`

    yesBtn = document.createElement('button')
    yesBtn.textContent = 'Yes'
    yesBtn.className = 'confirm-btn'
    yesBtn.dataset.realm = realmKey

    noBtn = document.createElement('button')
    noBtn.textContent = 'No'
    noBtn.className = 'confirm-btn'

    const btnGroup = document.createElement('div')
    btnGroup.className = 'confirm-btn-group'
    btnGroup.appendChild(yesBtn)
    btnGroup.appendChild(noBtn)

    confirm.appendChild(question)
    confirm.appendChild(btnGroup)

    overlay.appendChild(name)
    overlay.appendChild(icon)
    overlay.appendChild(list)
    overlay.appendChild(confirm)

    overlay.classList.remove('hidden')
    overlay.classList.add('active')
    // make the overlay focusable and store the element that was focused previously
    overlay.setAttribute('tabindex', '-1')
    lastFocus = document.activeElement
    // trap focus inside the overlay so keyboard users stay within the dialog
    overlay.addEventListener('keydown', trapFocus)

    setTimeout(() => icon.classList.add('show'), 50)
    setTimeout(() => list.classList.add('show'), 250)
    setTimeout(() => confirm.classList.add('show'), 450)

    yesBtn.addEventListener('click', confirmTravel)
    noBtn.addEventListener('click', revertSelection)
    // direct keyboard focus to the first actionable element in the dialog
    yesBtn.focus()
  }

  if (selectButton) {
    selectButton.addEventListener('click', () => {
      if (focused) return
      focused = true
      selectButton.classList.remove('fade-in')
      selectButton.classList.add('fade-out')
      pauseFloat(0)
      const active = planets[currentIndex]
      planets.forEach((p, i) => {
        if (i === currentIndex) {
          p.style.setProperty('--scale-mult', 1.2)
          p.classList.add('focused')
        } else {
          p.classList.add('faded')
          p.style.removeProperty('--scale-mult')
        }
      })
      const realmKey = active.id
      showOverlay(realmKey)
    })
  }

  updatePlanets()
})

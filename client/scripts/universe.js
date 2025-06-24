document.addEventListener('DOMContentLoaded', () => {
  const initCarousel = () => {
    const ring = document.getElementById('space')
    if (!ring) return

    const planets = Array.from(ring.querySelectorAll('.planet'))
    const quickMenu = document.getElementById('quick-menu')
    const quickDots = []

    const overlayData = window.overlayData || {}

    planets.forEach((planetElement) => {
    const name = planetElement.textContent || ''
    const data = overlayData[planetElement.id] || {}

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

    planetElement.textContent = ''
    planetElement.appendChild(inner)
    })

    if (quickMenu) {
    planets.forEach((planetElement, i) => {
      const dotButton = document.createElement('button')
      dotButton.className = 'quick-dot'
      const glow =
        getComputedStyle(planetElement).getPropertyValue('--glow-color')
      if (glow) dotButton.style.setProperty('--dot-color', glow.trim())
      const icon = overlayData[planetElement.id]?.icon
      if (icon) dotButton.textContent = icon
      dotButton.addEventListener('click', () => {
        if (focused) return
        currentIndex = i
        angle = -slice * i
        updatePlanets()
      })
      quickMenu.appendChild(dotButton)
      quickDots.push(dotButton)
    })
    // arrange in a circle
    const radius = 70
    quickDots.forEach((dotButton, idx) => {
      const theta = (idx / quickDots.length) * Math.PI * 2 - Math.PI / 2
      const x = 50 + radius * Math.cos(theta)
      const y = 50 + radius * Math.sin(theta)
      dotButton.style.left = `${x}%`
      dotButton.style.top = `${y}%`
    })
    }

    const leftArrow = document.getElementById('arrow-left')
    const rightArrow = document.getElementById('arrow-right')
    const selectButton = document.getElementById('select-button')
    const overlay = document.getElementById('realm-overlay')
    let yesBtn, noBtn
    let lastFocus

  // keep focus cycling within overlay when active
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
      const idx = planets.findIndex(
        (planetElement) => planetElement.id === startKey,
      )
      if (idx >= 0) {
        currentIndex = idx
        angle = -slice * idx
      }
    }

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
    quickDots.forEach((dotButton, i) => {
      dotButton.classList.toggle('active', i === currentIndex)
    })
    }

    if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      if (focused) return
      angle += slice
      currentIndex = (currentIndex - 1 + totalPlanets) % totalPlanets
      updatePlanets()
    })
    }

    if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      if (focused) return
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
    // release focus trap and return focus to element that opened dialog
    overlay.removeEventListener('keydown', trapFocus)
    overlay.removeAttribute('tabindex')
    if (lastFocus && lastFocus.focus) lastFocus.focus()
    }

    function revertSelection() {
    hideOverlay()
    planets.forEach((planetElement) => {
      planetElement.classList.remove('faded', 'focused')
      planetElement.style.removeProperty('--scale-mult')
    })
    const active = planets[currentIndex]
    active.style.removeProperty('--scale-mult')
    if (selectButton) {
      selectButton.classList.remove('fade-out')
      selectButton.classList.add('fade-in')
    }
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
    data.features.forEach((feature) => {
      const li = document.createElement('li')
      li.textContent = feature
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
    overlay.setAttribute('tabindex', '-1')
    lastFocus = document.activeElement
    overlay.addEventListener('keydown', trapFocus)

    setTimeout(() => icon.classList.add('show'), 50)
    setTimeout(() => list.classList.add('show'), 250)
    setTimeout(() => confirm.classList.add('show'), 450)

    yesBtn.addEventListener('click', confirmTravel)
    noBtn.addEventListener('click', revertSelection)
    yesBtn.focus()
    }

    if (selectButton) {
    selectButton.addEventListener('click', () => {
      if (focused) return
      focused = true
      selectButton.classList.remove('fade-in')
      selectButton.classList.add('fade-out')
      const active = planets[currentIndex]
      planets.forEach((planetElement, i) => {
        if (i === currentIndex) {
          planetElement.style.setProperty('--scale-mult', 1.2)
          planetElement.classList.add('focused')
        } else {
          planetElement.classList.add('faded')
          planetElement.style.removeProperty('--scale-mult')
        }
      })
      const realmKey = active.id
      showOverlay(realmKey)
    })
    }

    updatePlanets()
    setTimeout(() => {
      ring
        .querySelectorAll('.planet-inner')
        .forEach((inner) => inner.classList.add('show'))
    }, 50)
  }

  const overlay = document.getElementById('fadeOverlay')
  if (overlay && overlay.classList.contains('start')) {
    overlay.addEventListener('animationend', initCarousel, { once: true })
  } else {
    setTimeout(initCarousel, 600)
  }
})

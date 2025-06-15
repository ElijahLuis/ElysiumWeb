document.addEventListener('DOMContentLoaded', () => {
  const ring = document.getElementById('space')
  if (!ring) return

  const planets = Array.from(ring.querySelectorAll('.planet'))
  const leftArrow = document.getElementById('arrow-left')
  const rightArrow = document.getElementById('arrow-right')
  const selectButton = document.getElementById('select-button')
  const overlay = document.getElementById('realm-overlay')
  let yesBtn, noBtn

  const totalPlanets = planets.length
  const slice = 360 / totalPlanets
  const radius = 520
  let angle = 0
  let currentIndex = 0
  let focused = false

  const overlayData = {
    abyss: {
      icon: '🕳️',
      features: [
        'Silent Chase',
        'Hollow Veil',
        'Frozen Nerve',
        'Bound Breath',
        'Null Horizon',
      ],
    },
    cavern: {
      icon: '🪨',
      features: [
        'False Shrine',
        'Smoky Mirror',
        'Venom Hold',
        'Itchy Bite',
        'Spiky Throne',
      ],
    },
    dross: {
      icon: '☣️',
      features: ['Putrid Force', 'Tarry Bone', 'Stolen Doll', 'Pale Shiver'],
    },
    ember: {
      icon: '🔥',
      features: ['Infernal Mammoth', 'Brazen Rhino', 'Noisy Wasp', 'Vicious Cobra'],
    },
    glare: {
      icon: '👁️',
      features: ['Fallen Eye', 'Deadlight Hall', 'Raucous Laugh'],
    },
    languish: {
      icon: '💧',
      features: ['Glass Crypt', 'Blank Prism', 'Sapphire Chamber', 'Empty House'],
    },
    mist: {
      icon: '🌫️',
      features: [
        'Lucid Thread',
        'Ancient Quiet',
        'Fractal Maze',
        'Shallow Anchor',
        'Myriad Glitch',
      ],
    },
    oasis: {
      icon: '🌴',
      features: [
        'Verdant Hearth',
        'Radiant Grove',
        'Honey Bloom',
        'Open Palm',
        'Woven Circle',
        'Twinkle Toe',
        'Soft Meadow',
      ],
    },
    trace: {
      icon: '🌀',
      features: ['Sepia Garden', 'Word Cemetery', 'Aurora Shadow', 'Butterfly Canopy'],
    },
    zenith: {
      icon: '🚀',
      features: [
        'Steadfast Anvil',
        'Primordial Pillar',
        'Luminescent Crown',
        'Omega Threshold',
      ],
    },
  }

  function updatePlanets() {
    planets.forEach((planet, i) => {
      const theta = angle + i * slice
      const rad = (theta * Math.PI) / 180
      const depth = (1 + Math.cos(rad)) / 2
      const scale = 0.2 + 0.8 * depth * depth
      planet.style.transform = `translate(-50%, -50%) rotateY(${theta}deg) translateZ(${radius}px) rotateY(${-theta}deg) scale(${scale})`
      planet.style.zIndex = Math.round(scale * 100)
      planet.classList.toggle('active', i === currentIndex)
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
  }

  function revertSelection() {
    hideOverlay()
    planets.forEach(p => {
      p.classList.remove('faded', 'focused')
    })
    const active = planets[currentIndex]
    const match = active.style.transform.match(/scale\(([^)]+)\)/)
    if (match) {
      const scale = parseFloat(match[1])
      const newScale = scale / 1.2
      active.style.transform = active.style.transform.replace(
        /scale\([^)]+\)/,
        `scale(${newScale})`
      )
    }
    if (selectButton) {
      selectButton.classList.remove('fade-out')
      selectButton.classList.add('fade-in')
    }
    focused = false
  }

  function confirmTravel() {
    const realm = yesBtn?.dataset.realm
    if (!realm) return

    const overlay = document.createElement('div')
    overlay.style.position = 'fixed'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.width = '100%'
    overlay.style.height = '100%'
    overlay.style.background = 'black'
    overlay.style.opacity = '0'
    overlay.style.transition = 'opacity 750ms ease-out'
    overlay.style.zIndex = '50'
    document.body.appendChild(overlay)

    requestAnimationFrame(() => {
      overlay.style.opacity = '1'
    })

    setTimeout(() => {
      window.location.href = `${realm}.html`
    }, 750)
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
    data.features.forEach(f => {
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

    confirm.appendChild(question)
    confirm.appendChild(yesBtn)
    confirm.appendChild(noBtn)

    overlay.appendChild(name)
    overlay.appendChild(icon)
    overlay.appendChild(list)
    overlay.appendChild(confirm)

    overlay.classList.remove('hidden')
    overlay.classList.add('active')

    setTimeout(() => icon.classList.add('show'), 50)
    setTimeout(() => list.classList.add('show'), 250)
    setTimeout(() => confirm.classList.add('show'), 450)

    yesBtn.addEventListener('click', confirmTravel)
    noBtn.addEventListener('click', revertSelection)
  }

  if (selectButton) {
    selectButton.addEventListener('click', () => {
      if (focused) return
      focused = true
      selectButton.classList.remove('fade-in')
      selectButton.classList.add('fade-out')
      const active = planets[currentIndex]
      planets.forEach((p, i) => {
        if (i === currentIndex) {
          const match = p.style.transform.match(/scale\(([^)]+)\)/)
          if (match) {
            const scale = parseFloat(match[1])
            const newScale = scale * 1.2
            p.style.transform = p.style.transform.replace(
              /scale\([^)]+\)/,
              `scale(${newScale})`
            )
          }
          p.classList.add('focused')
        } else {
          p.classList.add('faded')
        }
      })
      const realmKey = active.id
      showOverlay(realmKey)
    })
  }

  updatePlanets()
})

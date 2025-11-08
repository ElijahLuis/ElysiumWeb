document.addEventListener('DOMContentLoaded', () => {
  const initCarousel = () => {
    const ring = document.getElementById('space')
    if (!ring) return

    const planets = Array.from(ring.querySelectorAll('.planet'))
    const quickMenu = document.getElementById('quick-menu')
    const quickDots = []
    const totalPlanets = planets.length
    const slice = 360 / totalPlanets
    const radius = 520
    let angle = 0
    let currentIndex = 0
    let focused = false

    const overlayData = window.overlayData || {}

    planets.forEach((planetElement) => {
      const name = planetElement.textContent || ''
      const data = overlayData[planetElement.id] || {}

      // Enhance accessibility
      planetElement.setAttribute('role', 'option')
      planetElement.setAttribute('aria-label', `${name} realm`)
      planetElement.tabIndex = 0 // Make focusable

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

    // Add navigation hints
    const navHints = document.createElement('div')
    navHints.className = 'nav-hints'
    
    const leftHint = document.createElement('span')
    leftHint.className = 'nav-hint nav-hint-left'
    leftHint.setAttribute('aria-hidden', 'true')
    leftHint.innerHTML = '◄'
    
    const rightHint = document.createElement('span')
    rightHint.className = 'nav-hint nav-hint-right'
    rightHint.setAttribute('aria-hidden', 'true')
    rightHint.innerHTML = '►'
    
    navHints.appendChild(leftHint)
    navHints.appendChild(rightHint)
    ring.parentElement.appendChild(navHints)

    if (quickMenu) {
      planets.forEach((planetElement, i) => {
        const dotButton = document.createElement('button')
        dotButton.className = 'quick-dot'
        const glow = getComputedStyle(planetElement).getPropertyValue('--glow-color')
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
      const radius = 60 // Reduced from 70 to avoid planet overlap
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
    const quickLabel = document.getElementById('quick-label')
    const overlay = document.getElementById('realm-overlay')
    const universe = document.getElementById('universe')
    let yesBtn, noBtn
    let lastFocus
    let isConfirmationOpen = false
    let selectedConfirmButton = 'yes' // Track which confirmation button is selected

    function trapFocus(e) {
      if (!overlay || !overlay.classList.contains('active')) return
      if (e.key !== 'Tab') return

      const focusable = overlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

    const startKey = window.location.hash.replace('#', '')
    if (startKey) {
      const idx = planets.findIndex(
        (planetElement) => planetElement.id === startKey
      )
      if (idx >= 0) {
        currentIndex = idx
        angle = 90 - (slice * idx) // Adjust angle to maintain center alignment
      }
    }

    // Create ARIA live region for announcements
    const ariaAnnouncer = document.createElement('div')
    ariaAnnouncer.className = 'sr-only'
    ariaAnnouncer.setAttribute('aria-live', 'polite')
    ariaAnnouncer.setAttribute('aria-atomic', 'true')
    document.body.appendChild(ariaAnnouncer)

    function updatePlanets() {
      planets.forEach((planet, i) => {
        const theta = angle + i * slice
        const rad = (theta * Math.PI) / 180
        const depth = (1 + Math.cos(rad)) / 2
        const scale = 0.2 + 0.8 * depth * depth
        
        // Update ARIA selected state
        planet.setAttribute('aria-selected', i === currentIndex)
        
        if (i === currentIndex) {
          // Announce realm change to screen readers
          ariaAnnouncer.textContent = `${planet.getAttribute('aria-label')} selected`
        }

        planet.style.setProperty('--theta', `${theta}deg`)
        planet.style.setProperty('--radius', `${radius}px`)
        planet.style.setProperty('--scale', scale)
        planet.style.zIndex = Math.round(scale * 100)
        planet.classList.toggle('active', i === currentIndex)
      })

      // Update quick dots
      quickDots.forEach((dotButton, i) => {
        if (i === currentIndex) {
          !dotButton.classList.contains('active') && dotButton.classList.add('active')
        } else {
          dotButton.classList.contains('active') && dotButton.classList.remove('active')
        }
      })
    }

    if (leftArrow) {
      leftArrow.addEventListener('click', () => {
        if (focused) return
        angle += slice
        currentIndex = (currentIndex - 1 + totalPlanets) % totalPlanets
        updatePlanets()
        leftArrow?.classList.add('key-pressed')
        setTimeout(() => leftArrow?.classList.remove('key-pressed'), 200)
      })
    }

    if (rightArrow) {
      rightArrow.addEventListener('click', () => {
        if (focused) return
        angle -= slice
        currentIndex = (currentIndex + 1) % totalPlanets
        updatePlanets()
        rightArrow?.classList.add('key-pressed')
        setTimeout(() => rightArrow?.classList.remove('key-pressed'), 200)
      })
    }
    
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      // Step 1: Initial planet selection (pre-confirmation)
      if (!isConfirmationOpen) {
        switch (e.key) {
          case 'ArrowLeft':
            if (!focused) {
              angle += slice
              currentIndex = (currentIndex - 1 + totalPlanets) % totalPlanets
              updatePlanets()
              leftArrow?.classList.add('key-pressed')
              setTimeout(() => leftArrow?.classList.remove('key-pressed'), 200)
            }
            break
          
          case 'ArrowRight':
            if (!focused) {
              angle -= slice
              currentIndex = (currentIndex + 1) % totalPlanets
              updatePlanets()
              rightArrow?.classList.add('key-pressed')
              setTimeout(() => rightArrow?.classList.remove('key-pressed'), 200)
            }
            break
          
          case 'Enter':
            if (!focused) {
              selectButton?.click() // This will trigger showOverlay()
            }
            break
        }
        return
      }

      // Step 2: Confirmation dialog navigation
      if (isConfirmationOpen) {
        e.preventDefault()
        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowRight':
            // Toggle between Yes and No
            const selectingYes = e.key === 'ArrowLeft';
            yesBtn?.classList.toggle('selected', selectingYes);
            noBtn?.classList.toggle('selected', !selectingYes);
            // Remove default focus outline
            yesBtn?.blur();
            noBtn?.blur();
            selectedConfirmButton = selectingYes ? yesBtn : noBtn;
            break;
          
          case 'Enter':
            // Only trigger the currently selected button
            if (selectedConfirmButton) {
              // Add a quick visual feedback before executing
              selectedConfirmButton.classList.add('confirming');
              setTimeout(() => {
                selectedConfirmButton.classList.remove('confirming');
                selectedConfirmButton.click();
              }, 150);
            }
            break;
          
          case 'Escape':
            // Cancel on Escape
            noBtn?.click();
            break;
        }
      }
    })

    function hideOverlay() {
      if (!overlay) return
      
      // Re-enable navigation
      document.body.classList.remove('confirm-dialog-open')
      isConfirmationOpen = false
      
      overlay.classList.remove('active')
      setTimeout(() => {
        overlay.classList.add('hidden')
        overlay.innerHTML = ''
      }, 400)
      if (yesBtn) yesBtn.removeEventListener('click', confirmTravel)
      if (noBtn) noBtn.removeEventListener('click', revertSelection)
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

      // Disable navigation when overlay is shown
      document.body.classList.add('confirm-dialog-open')
      isConfirmationOpen = true

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
      yesBtn.tabIndex = -1 // Prevent tab focus

      noBtn = document.createElement('button')
      noBtn.textContent = 'No'
      noBtn.className = 'confirm-btn'
      noBtn.tabIndex = -1 // Prevent tab focus

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

      // Set up initial button states
      yesBtn.classList.add('selected')
      selectedConfirmButton = yesBtn

      setTimeout(() => icon.classList.add('show'), 50)
      setTimeout(() => list.classList.add('show'), 250)
      setTimeout(() => confirm.classList.add('show'), 450)

      yesBtn.addEventListener('click', confirmTravel)
      noBtn.addEventListener('click', revertSelection)
      
      // Set initial selection state
      yesBtn.classList.add('selected')
      selectedConfirmButton = yesBtn
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
      planets.forEach((p) => (p.style.visibility = 'visible'))
      if (selectButton) selectButton.classList.replace('fade-out', 'fade-in')
      if (leftArrow) leftArrow.classList.replace('fade-out', 'fade-in')
      if (rightArrow) rightArrow.classList.replace('fade-out', 'fade-in')
      if (quickLabel) quickLabel.classList.replace('fade-out', 'fade-in')
      if (quickMenu) quickMenu.classList.replace('fade-out', 'fade-in')
    }, 50)
  }

  const overlay = document.getElementById('fadeOverlay')
  if (overlay && overlay.classList.contains('start')) {
    overlay.addEventListener('animationend', initCarousel, { once: true })
  } else {
    setTimeout(initCarousel, 600)
  }
})
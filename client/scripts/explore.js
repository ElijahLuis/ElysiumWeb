// Selects a realm based on the visitor's responses
// Uses names from src/data/realmMetadata.ts

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('explore-form')
  const result = document.getElementById('explore-result')
  if (!form || !result) return

  function fadeOut(el) {
    el.style.transition = 'opacity 500ms ease-out'
    el.style.opacity = '0'
    setTimeout(() => el.classList.add('hidden'), 500)
  }

  function fadeIn(el) {
    el.classList.remove('hidden')
    el.style.opacity = '0'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 500ms ease-in'
      el.style.opacity = '1'
    })
  }

  // realm names from src/data/realmMetadata.ts
  const realms = {
    abyss: { realmName: 'Abyss', icon: '🕳️' },
    cavern: { realmName: 'Cavern', icon: '🪨' },
    dross: { realmName: 'Dross', icon: '☣️' },
    ember: { realmName: 'Ember', icon: '🔥' },
    glare: { realmName: 'Glare', icon: '👁️' },
    languish: { realmName: 'Languish', icon: '💧' },
    mist: { realmName: 'Mist', icon: '🌫️' },
    oasis: { realmName: 'Oasis', icon: '🌴' },
    trace: { realmName: 'Trace', icon: '🌀' },
    zenith: { realmName: 'Zenith', icon: '🚀' },
  }

  const keys = Object.keys(realms)

  function escapeHTML(str) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return str.replace(/[&<>"']/g, (m) => map[m])
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const scores = {}
    keys.forEach((k) => (scores[k] = 0))
    const numeric = []

    form.querySelectorAll('select').forEach((selectElement) => {
      const value = selectElement.value
      if (!isNaN(parseInt(value))) {
        numeric.push(parseInt(value, 10))
      } else if (scores[value] !== undefined) {
        scores[value] += 1
      }
    })

    if (numeric.length) {
      const average = numeric.reduce((a, b) => a + b, 0) / numeric.length
      const step = 4 / keys.length
      const index = Math.min(keys.length - 1, Math.floor((average - 1) / step))
      scores[keys[index]] += 1
    }

    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
    const key = top ? top[0] : keys[0]
    const { realmName, icon } = realms[key]
    const name = escapeHTML(realmName)
    result.innerHTML = `\n      <p class="result-intro">You feel the pull of</p>\n      <div class="result-icon">${icon}</div>\n      <a class="result-name" href="universe.html#${key}">${name.toUpperCase()}</a>`
    fadeOut(form)
    setTimeout(() => fadeIn(result), 500)

    const link = result.querySelector('.result-name')
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const overlay = document.getElementById('fadeOverlay')
        if (overlay) overlay.classList.add('fade-in')
        setTimeout(() => {
          window.location.href = link.href
        }, 600)
      })
    }
  })
})

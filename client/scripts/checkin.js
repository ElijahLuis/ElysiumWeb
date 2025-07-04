document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkin-form')
  const result = document.getElementById('result')
  if (!form || !result) return

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

  const planetMap = {
    abyss: { realm: 'Abyss', planets: ['Nocturnis', 'Umbrak', 'Nerveris'] },
    cavern: { realm: 'Cavern', planets: ['Bedesto', 'Thirsa', 'Kerelos'] },
    dross: { realm: 'Dross', planets: ['Graskul', 'Exulith'] },
    ember: { realm: 'Ember', planets: ['Fureza', 'Romana', 'Agnera'] },
    glare: { realm: 'Glare', planets: ['Rassembar', 'Censyr'] },
    languish: { realm: 'Languish', planets: ['Dolenza', 'Sedra', 'Trosta'] },
    mist: { realm: 'Mist', planets: ['Verio', 'Zonder', 'Obsceris'] },
    oasis: { realm: 'Oasis', planets: ['Merulo', 'Solene', 'Lubovu'] },
    trace: { realm: 'Trace', planets: ['Yorell', 'Renmor'] },
    zenith: { realm: 'Zenith', planets: ['Milenios', 'Eladon', 'Kalyra'] },
  }

  const realms = [
    'abyss',
    'cavern',
    'dross',
    'ember',
    'glare',
    'languish',
    'mist',
    'oasis',
    'trace',
    'zenith',
  ]

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const values = Array.from(form.querySelectorAll('select')).map((selectEl) =>
      parseInt(selectEl.value, 10),
    )
    const averageScore = values.reduce((a, b) => a + b, 0) / values.length
    const index = Math.min(
      realms.length - 1,
      Math.floor((averageScore - 1) / 0.4),
    )
    const key = realms[index]
    const { realm, planets } = planetMap[key]
    const name = planets[Math.floor(Math.random() * planets.length)]
    const safeName = escapeHTML(name)
    const safeRealm = escapeHTML(realm)
    result.innerHTML = `Your path points toward <strong>${safeName}</strong> of the <em>${safeRealm}</em> realm.`
    result.classList.remove('hidden')
    form.classList.add('hidden')
  })
})

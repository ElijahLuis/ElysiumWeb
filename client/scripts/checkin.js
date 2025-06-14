document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkin-form')
  const result = document.getElementById('result')
  if (!form || !result) return

  const planetMap = {
    abyss: { name: 'Nocturnis', realm: 'Abyss' },
    languish: { name: 'Dolenza', realm: 'Languish' },
    mist: { name: 'Verio', realm: 'Mist' },
    oasis: { name: 'Merulo', realm: 'Oasis' },
    zenith: { name: 'Milenios', realm: 'Zenith' },
  }

  form.addEventListener('submit', e => {
    e.preventDefault()
    const values = Array.from(form.querySelectorAll('select')).map(sel =>
      parseInt(sel.value, 10),
    )
    const avg = values.reduce((a, b) => a + b, 0) / values.length

    let key = 'mist'
    if (avg <= 2) key = 'abyss'
    else if (avg <= 2.8) key = 'languish'
    else if (avg <= 3.6) key = 'mist'
    else if (avg <= 4.3) key = 'oasis'
    else key = 'zenith'

    const { name, realm } = planetMap[key]
    result.innerHTML = `Your path points toward <strong>${name}</strong> of the <em>${realm}</em> realm.`
    result.classList.remove('hidden')
    form.classList.add('hidden')
  })
})


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cluster').forEach(cluster => {
    const delay = -(Math.random() * 6)
    cluster.style.setProperty('--delay', `${delay}s`)
    const start = Math.floor(Math.random() * 40) - 20
    cluster.style.setProperty('--start-offset', `${start}px`)
    const layout = Math.floor(Math.random() * 40) - 20
    cluster.style.setProperty('--layout-offset', `${layout}px`)
    const shift = Math.floor(Math.random() * 40) - 20
    cluster.style.setProperty('--shift-x', `${shift}px`)
  })

  document.querySelectorAll('.cluster').forEach(cluster => {
    const button = cluster.querySelector('.cluster-bubble')
    if (!button) return
    button.addEventListener('click', () => {
      const isOpen = cluster.classList.toggle('open')
      button.setAttribute('aria-expanded', String(isOpen))
      requestAnimationFrame(updateDivider)
    })
  })
})

function updateDivider() {
  const section = document.getElementById('realm-space')
  if (!section) return
  const openMenus = document.querySelectorAll('.cluster.open .cluster-menu')

  let maxHeight = 0
  openMenus.forEach(menu => {
    const h = menu.scrollHeight
    if (h > maxHeight) maxHeight = h
  })

  const shift = openMenus.length === 0 ? '0px' : `${Math.min(maxHeight + 20, 200)}px`
  section.style.setProperty('--divider-shift', shift)
}

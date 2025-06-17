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
  const divider = document.querySelector('.realm-divider')
  if (!divider) return
  const openMenus = document.querySelectorAll('.cluster.open .cluster-menu')
  if (openMenus.length === 0) {
    divider.style.setProperty('--divider-shift', '0px')
    return
  }
  let maxHeight = 0
  openMenus.forEach(menu => {
    const h = menu.getBoundingClientRect().height
    if (h > maxHeight) maxHeight = h
  })
  divider.style.setProperty('--divider-shift', `${maxHeight + 20}px`)
}

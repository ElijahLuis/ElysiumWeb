document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cluster').forEach(cluster => {
    const delay = -(Math.random() * 6)
    cluster.style.setProperty('--delay', `${delay}s`)
    const start = Math.floor(Math.random() * 80) - 40
    cluster.style.setProperty('--start-offset', `${start}px`)
  })

  document.querySelectorAll('.cluster').forEach(cluster => {
    const button = cluster.querySelector('.cluster-bubble')
    if (!button) return
    button.addEventListener('click', () => {
      const isOpen = cluster.classList.toggle('open')
      button.setAttribute('aria-expanded', String(isOpen))
    })
  })
})

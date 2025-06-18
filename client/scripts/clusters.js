document.addEventListener('DOMContentLoaded', () => {
  const clusters = document.querySelectorAll('.cluster')

  clusters.forEach(cluster => {
    const delay = -(Math.random() * 6)
    cluster.style.setProperty('--delay', `${delay}s`)
    const start = Math.floor(Math.random() * 40) - 20
    cluster.style.setProperty('--start-offset', `${start}px`)
    const layout = Math.floor(Math.random() * 40) - 20
    cluster.style.setProperty('--layout-offset', `${layout}px`)
    const shift = Math.floor(Math.random() * 40) - 20
    cluster.style.setProperty('--shift-x', `${shift}px`)
  })

  let active = null
  clusters.forEach(cluster => {
    const button = cluster.querySelector('.cluster-bubble')
    if (!button) return

    cluster.addEventListener('mouseenter', () => {
      if (active && active !== cluster) {
        active.classList.remove('open')
        const prev = active.querySelector('.cluster-bubble')
        if (prev) prev.setAttribute('aria-expanded', 'false')
      }
      cluster.classList.add('open')
      button.setAttribute('aria-expanded', 'true')
      active = cluster
    })

    cluster.addEventListener('mouseleave', () => {
      cluster.classList.remove('open')
      button.setAttribute('aria-expanded', 'false')
      if (active === cluster) active = null
    })
  })
})

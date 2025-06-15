// Loads the shared navigation and highlights the active page

document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('main-nav')
  if (!placeholder) return

  fetch('../partials/nav.html')
    .then(res => res.text())
    .then(html => {
      placeholder.outerHTML = html
      const nav = document.getElementById('main-nav')
      highlightCurrentPage(nav)
      enableRipples(nav)
    })
    .catch(err => console.error('Navigation failed to load', err))

  function highlightCurrentPage(nav) {
    const page = window.location.pathname.split('/').pop()
    nav.querySelectorAll('a[href]:not(.brand-link)').forEach(link => {
      if (link.getAttribute('href') === page) {
        link.setAttribute('aria-current', 'page')
      }
    })
  }

  function enableRipples(nav) {
    nav.querySelectorAll('a:not(.brand-link)').forEach(link => {
      link.addEventListener('click', event => {
        const ripple = document.createElement('span')
        const rect = link.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        ripple.className = 'ripple'
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`
        link.appendChild(ripple)
        setTimeout(() => ripple.remove(), 450)
      })
    })
  }
})

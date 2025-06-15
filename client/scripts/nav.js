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
    })
    .catch(err => console.error('Navigation failed to load', err))

  function highlightCurrentPage(nav) {
    const page = window.location.pathname.split('/').pop()
    nav
      .querySelectorAll('a[href]:not(.brand-link)')
      .forEach(link => {
        if (link.getAttribute('href') === page) {
          link.setAttribute('aria-current', 'page')
        }
      })
  }
})

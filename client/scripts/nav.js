// Loads the shared navigation and highlights the active page

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav')
  if (!nav) return

  fetch('../partials/nav.html')
    .then(res => res.text())
    .then(html => {
      nav.innerHTML = html
      markCurrentPage()
    })
    .catch(err => console.error('Navigation failed to load', err))

  function markCurrentPage() {
    const page = window.location.pathname.split('/').pop()
    nav.querySelectorAll('a[href]').forEach(link => {
      if (link.getAttribute('href') === page) {
        link.setAttribute('aria-current', 'page')
      }
    })
  }
})

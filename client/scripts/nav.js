// Loads the shared navigation and highlights the active page

document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('main-nav')
  if (!placeholder) return

  fetch('../partials/nav.html')
    .then((res) => res.text())
    .then((html) => {
      placeholder.outerHTML = html
      const nav = document.getElementById('main-nav')
      highlightCurrentPage(nav)
      enableRipples(nav)
    })
    .catch((err) => {
      console.error('Navigation failed to load', err)
      placeholder.innerHTML = [
        '<a href="home.html">Home</a>',
        '<a href="profile.html">Profile</a>',
        '<a href="explore.html">Explore</a>',
        '<a href="about.html">About</a>',
        '<a href="universe.html">Universe</a>',
      ].join(' ')
      highlightCurrentPage(placeholder)
    })

  function highlightCurrentPage(nav) {
    const page = window.location.pathname.split('/').pop()
    nav.querySelectorAll('a[href]:not(.brand-link)').forEach((link) => {
      if (link.getAttribute('href') === page) {
        link.setAttribute('aria-current', 'page')
      }
    })
  }

  function enableRipples(nav) {
    nav.querySelectorAll('a:not(.brand-link)').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault()
        if (window.createRainbowRipple) {
          createRainbowRipple(link, event, () => {
            window.location.href = link.href
          })
        } else {
          window.location.href = link.href
        }
      })
    })
  }
})

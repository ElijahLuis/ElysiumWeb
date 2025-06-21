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
      setupAutohide(nav)
    })
    .catch((err) => console.error('Navigation failed to load', err))

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

  // Hide the nav after a pause and reveal it when the pointer nears the top
  function setupAutohide(nav) {
    let hideTimeout
    const scheduleHide = () => {
      hideTimeout = setTimeout(() => nav.classList.add('nav-hidden'), 1000)
    }

    nav.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout)
      nav.classList.remove('nav-hidden')
    })
    nav.addEventListener('mouseleave', scheduleHide)

    document.addEventListener('mousemove', (e) => {
      if (
        nav.classList.contains('nav-hidden') &&
        e.clientY <= nav.offsetHeight + 20
      ) {
        nav.classList.remove('nav-hidden')
      }
    })

    scheduleHide()
  }
})

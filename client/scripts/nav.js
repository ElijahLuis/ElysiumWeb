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
        event.preventDefault()

        const ripple = document.createElement('span')
        const rect = link.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)

        ripple.className = 'ripple'
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`

        // vibrant hue for this ripple
        const hue = Math.floor(Math.random() * 360)
        ripple.style.background = `radial-gradient(circle,
            hsla(${hue}, 100%, 70%, 0) 40%,
            hsla(${hue}, 100%, 70%, 1) 45%,
            hsla(${hue}, 100%, 70%, 1) 50%,
            hsla(${hue}, 100%, 70%, 0) 55%)`
        ripple.style.boxShadow = `0 0 6px hsla(${hue}, 100%, 70%, 0.9)`

        link.appendChild(ripple)

        ripple.addEventListener(
          'animationend',
          () => {
            ripple.remove()
            window.location.href = link.href
          },
          { once: true }
        )
      })
    })
  }
})

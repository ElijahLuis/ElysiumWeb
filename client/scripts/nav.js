// Loads shared navigation and highlights active page
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav')
  if (!nav) return

  if (!nav.innerHTML.trim()) {
    nav.innerHTML = `\n      <div class="brand">\n        <a href="home.html" class="brand-link" aria-label="Elysium home">Elysium</a>\n      </div>\n      <ul>\n        <li><a href="home.html">Home</a></li>\n        <li><a href="profile.html">Profile</a></li>\n        <li><a href="explore.html">Explore</a></li>\n        <li><a href="about.html">About</a></li>\n        <li><a href="universe.html">Universe</a></li>\n        <li><a href="constellations.html">Constellations</a></li>\n      </ul>\n    `
  }

  highlightCurrentPage(nav)

  function highlightCurrentPage(nav) {
    const page = window.location.pathname.split('/').pop()
    nav.querySelectorAll('a[href]:not(.brand-link)').forEach((link) => {
      if (link.getAttribute('href') === page) {
        link.setAttribute('aria-current', 'page')
      }
    })
  }

})

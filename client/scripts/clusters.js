document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cluster-bubble').forEach(button => {
    const menu = button.nextElementSibling
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true'
      button.setAttribute('aria-expanded', String(!expanded))
      if (menu) menu.hidden = expanded
    })
  })
})

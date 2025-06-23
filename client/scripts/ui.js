// Front page UI
document.addEventListener('DOMContentLoaded', () => {
  const enterButton = document.getElementById('enterButton')
  const welcomeText = document.querySelector('header h1')
  const authModal = document.getElementById('auth-modal')
  const loginTab = document.getElementById('login-tab')
  const signupTab = document.getElementById('signup-tab')
  const loginForm = document.getElementById('login-form')
  const signupForm = document.getElementById('signup-form')
  const loginButton = document.querySelector('#login-form .submit-btn')
  const signupButton = document.querySelector('#signup-form .submit-btn')
  const stars = document.getElementById('stars')
  const body = document.body

  function sanitizeInput(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .trim()
  }

  function sanitizeForm(form) {
    const fields = form.querySelectorAll('input')
    fields.forEach(field => {
      if (field.type !== 'checkbox') {
        field.value = sanitizeInput(field.value)
      }
    })
  }

  function fadeOutElement(element, duration = 500) {
    if (element) {
      element.style.transition = `opacity ${duration}ms ease-out`
      element.style.opacity = '0'
      setTimeout(() => {
        element.style.display = 'none'
      }, duration)
    }
  }

  function fadeInElement(element, duration = 500) {
    if (element) {
      element.style.display = 'block'
      setTimeout(() => {
        element.style.transition = `opacity ${duration}ms ease-in`
        element.style.opacity = '1'
      }, 50)
    }
  }

  window.fadeInElement = fadeInElement

  if (enterButton) {
    enterButton.addEventListener('click', event => {

      fadeOutElement(welcomeText)
      fadeOutElement(enterButton)
      setTimeout(() => {
        fadeInElement(authModal)
        authModal.classList.add('active')
      }, 600)
    })
  } else {
    console.warn('Enter button not found in DOM.')
  }

  function switchTab(activeTab, inactiveTab, activeForm, inactiveForm) {
    if (activeTab && inactiveTab && activeForm && inactiveForm) {
      activeTab.classList.add('active')
      inactiveTab.classList.remove('active')
      activeForm.classList.remove('hidden')
      inactiveForm.classList.add('hidden')
    }
  }

  if (loginTab && signupTab) {
    loginTab.addEventListener('click', () =>
      switchTab(loginTab, signupTab, loginForm, signupForm)
    )
    signupTab.addEventListener('click', () =>
      switchTab(signupTab, loginTab, signupForm, loginForm)
    )
  }

  if (loginButton) {
    loginButton.addEventListener('click', event => {
      event.preventDefault()
      sanitizeForm(loginForm)
      stars.style.transition = 'opacity 1.5s ease-out'
      stars.style.opacity = '0'

      const gradientOverlay = document.createElement('div')
      gradientOverlay.style.position = 'fixed'
      gradientOverlay.style.top = '0'
      gradientOverlay.style.left = '0'
      gradientOverlay.style.width = '100%'
      gradientOverlay.style.height = '100%'
      gradientOverlay.style.background =
        'linear-gradient(to bottom, #000000, #001f3f, #3d0075, #4b0082)'
      gradientOverlay.style.opacity = '0'
      gradientOverlay.style.transition = 'opacity 1.5s ease-in'
      gradientOverlay.style.zIndex = '1'

      document.body.appendChild(gradientOverlay)

      setTimeout(() => {
        gradientOverlay.style.opacity = '1'
      }, 50)

      setTimeout(() => {
        window.location.href = '../pages/home.html'
      }, 1500)
    })
  } else {
    console.warn('Login button not found in DOM.')
  }

  if (signupButton) {
    signupButton.addEventListener('click', event => {
      event.preventDefault()
      sanitizeForm(signupForm)
      // Additional sign up logic goes here
    })
  }
})

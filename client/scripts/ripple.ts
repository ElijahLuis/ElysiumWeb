// A gentle ripple of color that radiates from any element
// It mirrors the emotion of a single click
type RippleFn = (
  element: HTMLElement,
  event: MouseEvent,
  onEnd?: () => void,
) => void

;(function () {
  function ripple(
    element: HTMLElement,
    event: MouseEvent,
    onEnd?: () => void,
  ): void {
    const rect = element.getBoundingClientRect()
    // use a small, consistent ring size for smoother performance
    const size = 60
    const ring = document.createElement('span')
    ring.className = 'ripple'
    ring.style.width = ring.style.height = `${size}px`
    ring.style.left = `${event.clientX - rect.left - size / 2}px`
    ring.style.top = `${event.clientY - rect.top - size / 2}px`

    // ensure the effect stays clipped within its parent
    const styles = getComputedStyle(element)
    if (styles.position === 'static') element.style.position = 'relative'
    if (styles.overflow !== 'hidden') element.style.overflow = 'hidden'

    function hexWithAlpha(hex: string, alpha: string): string {
      const value = hex.replace('#', '')
      return `#${value}${alpha}`
    }
    const computed = getComputedStyle(element)
    const base = (computed.getPropertyValue('--ripple-color') || '#ff69b4').trim()
    ring.style.background = `radial-gradient(circle,
      ${hexWithAlpha(base, '00')} 40%,
      ${hexWithAlpha(base, 'ff')} 45%,
      ${hexWithAlpha(base, 'ff')} 50%,
      ${hexWithAlpha(base, '00')} 55%)`
    ring.style.boxShadow = `0 0 6px ${hexWithAlpha(base, 'e6')}`

    element.appendChild(ring)
    ring.addEventListener(
      'animationend',
      () => {
        ring.remove()
        if (typeof onEnd === 'function') onEnd()
      },
      { once: true },
    )
  }

  window.createRainbowRipple = ripple

  document.addEventListener('DOMContentLoaded', () => {
    document
      .querySelectorAll<HTMLButtonElement>('button:not(.cluster-bubble)')
      .forEach((btn) => {
        if (getComputedStyle(btn).position === 'static') {
          btn.style.position = 'relative'
        }
        btn.style.overflow = 'hidden'
        btn.addEventListener('click', (e) => ripple(btn, e))
      })
  })
})()

export {}

declare global {
  interface Window {
    createRainbowRipple?: RippleFn
  }
}

import { useEffect, useRef } from 'react'

const Stars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current!
    if (!container) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    function generateStars() {
      container.innerHTML = ''
      const count = Math.floor((window.innerWidth * window.innerHeight) / 3500)
      const frag = document.createDocumentFragment()
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div')
        star.classList.add('star')
        star.style.left = `${Math.random() * window.innerWidth}px`
        star.style.top = `${Math.random() * window.innerHeight}px`
        const size = Math.random() * 1.5 + 1
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.animationDuration = `${Math.random() * 2 + 2}s`
        star.style.opacity = Math.random().toString()
        frag.appendChild(star)
      }
      container.appendChild(frag)
    }

    generateStars()
    let resizeTimeout: number
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(generateStars, 200)
    }

    window.addEventListener('resize', handleResize)

    let pointerX = 0,
      pointerY = 0,
      currentX = 0,
      currentY = 0

    if (!reduceMotion) {
      const updatePointer = (e: PointerEvent) => {
        pointerX = e.clientX / window.innerWidth - 0.5
        pointerY = e.clientY / window.innerHeight - 0.5
      }

      window.addEventListener('pointermove', updatePointer, { passive: true })

      const animate = () => {
        currentX += (pointerX - currentX) * 0.05
        currentY += (pointerY - currentY) * 0.05
        if (container) {
          container.style.transform = `translate3d(${currentX * 30}px, ${currentY * 30}px, 0)`
        }
        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }

    // fade in
    requestAnimationFrame(() => {
      container.style.opacity = '1'
    })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div id="stars" ref={containerRef} />
}

export default Stars

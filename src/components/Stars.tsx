import { useEffect, useRef } from 'react'
import useParallax from '../hooks/useParallax'

const Stars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  useParallax(containerRef)

  useEffect(() => {
    const container = containerRef.current!
    if (!container) return

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
        star.style.animationDuration = `${Math.random() * 4 + 1}s`
        star.style.opacity = (Math.random() * 0.7 + 0.3).toString()
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

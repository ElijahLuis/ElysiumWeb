import { useEffect, RefObject } from 'react'

export interface ParallaxOptions {
  multiplier?: number
  ease?: number
}

/**
 * Hooks into the shared parallax background.
 * Expects window.createParallax to be available from background.js.
 */
const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {},
) => {
  useEffect(() => {
    const el = ref.current
    const create = (window as any).createParallax as
      | ((el: HTMLElement, opts?: ParallaxOptions) => { destroy: () => void })
      | undefined

    if (!el || !create) return
    const instance = create(el, options)
    return () => instance.destroy()
  }, [ref, options])
}

export default useParallax

import {useEffect, useRef} from 'react'

export const useMountedEffect = (cb: () => void | (() => void) | Promise<void>, delay?: number) => {
  const mounted = useRef<boolean>(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      if (delay) {
        const timeout = setTimeout(() => {
          cb()
        }, delay)
        return () => clearTimeout(timeout)
      }
      const result = cb()
      return typeof result === 'function' ? result : () => {}
    }
  }, [cb, delay])
}

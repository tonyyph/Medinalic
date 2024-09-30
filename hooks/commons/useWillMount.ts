import {useEffect, useRef} from 'react'

export const useWillMount = (callback: () => void) => {
  const willMount = useRef(true)

  if (willMount.current) {
    callback()
  }

  useEffect(() => {
    willMount.current = false
  }, [])
}

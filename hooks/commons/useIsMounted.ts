import {useEffect, useState} from 'react'

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true)
    }, 300)
    return () => clearTimeout(timeout)
  }, [])
  return {isMounted}
}

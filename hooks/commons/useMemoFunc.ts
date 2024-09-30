import {useCallback, useRef} from 'react'

export function useMemoFunc<T extends (...arg: any) => any>(callback: T): T {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const memoized = useCallback((...args: any) => {
    return callbackRef.current?.(...args)
  }, [])
  return memoized as T
}

import {useEffect} from 'react'
import {UseBoundStoreWithEqualityFn} from 'zustand/traditional'
import {StoreApi} from 'zustand/vanilla'

export const useBindingStore = <T>(store: UseBoundStoreWithEqualityFn<StoreApi<T>>, initValue: T, deInitValue?: T) => {
  useEffect(() => {
    store.setState(initValue, true)
    return () => {
      store.setState(deInitValue ?? initValue, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

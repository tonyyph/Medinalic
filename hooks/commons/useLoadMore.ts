import {useRef} from 'react'
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native'
import {useMemoFunc} from './useMemoFunc'

interface UseLoadMoreProps {
  loading: boolean
  loadMore: () => void
}

export const useLoadMore = ({loading, loadMore}: UseLoadMoreProps) => {
  const previousOffset = useRef(0)

  const onMomentumScrollEnd = useMemoFunc((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    const totalHeight = event.nativeEvent.contentSize.height
    const listHeight = event.nativeEvent.layoutMeasurement.height
    const isScrollingDown = currentOffset > previousOffset.current
    const reachedThreshHold = currentOffset + listHeight >= totalHeight * 0.8
    const shouldLoad = !loading && isScrollingDown && reachedThreshHold

    if (shouldLoad) {
      loadMore()
    }

    previousOffset.current = currentOffset
  })

  return {
    onMomentumScrollEnd,
  }
}

// export const useLoadMore = ({loading, loadMore}: UseLoadMoreProps) => {
//   const shouldLoadMore = useRef(false)
//   const hasScrolled = useRef(false)

//   const onScroll = useMemoFunc((event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const currentScrollY = event.nativeEvent.contentOffset.y
//     if (currentScrollY > 0 && !hasScrolled.current) {
//       hasScrolled.current = true
//     }
//   })

//   const onEndReached = useMemoFunc(() => {
//     if (!loading && hasScrolled.current) {
//       shouldLoadMore.current = true
//     }
//   })

//   const onMomentumScrollEnd = useMemoFunc(() => {
//     if (shouldLoadMore.current) {
//       loadMore()
//       shouldLoadMore.current = false
//     }
//   })

//   return {
//     onScroll,
//     onEndReached,
//     onMomentumScrollEnd,
//   }
// }

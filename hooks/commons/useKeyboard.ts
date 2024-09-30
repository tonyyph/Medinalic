import {useEffect, useState} from 'react'
import {Keyboard, KeyboardEvent} from 'react-native'
import {KeyboardEvents} from 'react-native-keyboard-controller'
import {useSharedValue, withTiming} from 'react-native-reanimated'
import {useMountedEffect} from './useMountedEffect'

export const useKeyboard = (initHeight: number = 0) => {
  const [keyboardHeight, setKeyboardHeight] = useState(initHeight)

  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) {
      setKeyboardHeight(e.endCoordinates.height)
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0)
    }

    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide)
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return {keyboardHeight}
}

export const useAnimatedKeyboard = (initHeight: number = 0) => {
  const keyboardHeight = useSharedValue(0)

  useEffect(() => {
    const showSubscription = KeyboardEvents.addListener('keyboardWillShow', e => {
      console.log(e.height)
      keyboardHeight.value = withTiming(e.height)
    })
    const hideSubscription = KeyboardEvents.addListener('keyboardWillHide', () => {
      keyboardHeight.value = withTiming(0)
    })
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [keyboardHeight])

  useMountedEffect(async () => {
    if (initHeight) {
      keyboardHeight.value = withTiming(initHeight)
    }
  })

  return {keyboardHeight}
}

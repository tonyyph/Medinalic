import {useNavigation} from '@react-navigation/native'
import {useRef} from 'react'
import {useMemoFunc} from './useMemoFunc'

export const useBottomModalScreen = () => {
  const navigation = useNavigation()
  const ref = useRef<{dismiss: () => Promise<void>}>(null)

  const goBack = useMemoFunc(async () => {
    await ref?.current?.dismiss()
    navigation.goBack()
  })

  return {ref, goBack}
}

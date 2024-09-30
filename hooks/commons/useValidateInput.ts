import {useEffect, useRef, useState} from 'react'
import {useMemoFunc} from './useMemoFunc'

type Params<T> = {
  validate?: (value: T) => {
    error: string
    valid: boolean
  }
  defaultValue: T
}

export const useValidateInput = <T = string>({defaultValue, validate}: Params<T>) => {
  const [state, setState] = useState({error: '', valid: false})
  const [value, setValue] = useState<T>(defaultValue)
  const inputTouched = useRef(false)

  const onChangeText = useMemoFunc((text: T) => {
    if (!inputTouched.current) {
      inputTouched.current = true
    }
    setValue(text)
  })

  const onFocus = useMemoFunc(() => {
    inputTouched.current = true
  })

  useEffect(() => {
    if (inputTouched.current && validate) {
      const {valid, error} = validate(value)
      setState(prev => ({
        ...prev,
        error,
        valid,
      }))
    }
  }, [value, validate])

  const validateInput = useMemoFunc(() => {
    if (!validate) {
      return {valid: true, error: ''}
    }
    const {valid, error} = validate(value)
    setState(prev => ({
      ...prev,
      error,
      valid,
    }))
    return {valid, error}
  })

  return {...state, value, defaultValue, onFocus, onChangeText, setState, validateInput}
}

export const useValidateInputs = (inputs: Record<string, {validateInput: () => {error: string; valid: boolean}}>) => {
  const validateInputs = useMemoFunc(() => {
    const result = Object.entries(inputs).reduce(
      (acc, [key, input]) => {
        acc[key] = input.validateInput()
        return acc
      },
      {} as Record<string, {valid: boolean; error: string}>,
    )
    return result
  })

  return {validateInputs}
}


import { useReducer, useCallback } from 'react'
import { useMotionValue } from 'framer-motion'

const useTapGesture = (callback: (i) => void): [number, (e, i) => void, () => void] => {
  const [, forceUpdate] = useReducer(v => v + 1, 0);
  const currentMotionValue = useMotionValue(1)
  const updateMotionValue = useCallback((e, i) => {
    currentMotionValue.set(i.offset.y)
    callback(i.offset.y)
    forceUpdate()
  }, [])
  const restartMotionValue = useCallback(() => {
    currentMotionValue.set(0)
    forceUpdate()
  }, [])
  return [ currentMotionValue.get(), updateMotionValue, restartMotionValue ]
}

export default useTapGesture
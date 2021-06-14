
import { useReducer } from 'react'
import { useMotionValue } from 'framer-motion'

const useTapGesture = (initialValue: number, callback: (i) => void): [number, (e, i) => void, () => void] => {
  const [, forceUpdate] = useReducer(v => v + 1, 0);
  const currentMotionValue = useMotionValue(initialValue)
  const updateMotionValue = (e, i) => {
    currentMotionValue.set(initialValue - i.offset.y)
    callback(i.offset.y)
    forceUpdate()
  }
  const restartMotionValue = () => {
    currentMotionValue.set(initialValue)
    forceUpdate()
  }
  return [ currentMotionValue.get(), updateMotionValue, restartMotionValue ]
}

export default useTapGesture


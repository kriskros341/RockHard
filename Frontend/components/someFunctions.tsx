import React from 'react'


export const areAllTrue = (arrayOfBooleans: boolean[]): boolean => {
  if(arrayOfBooleans.length == 0) return false
  for(let value of arrayOfBooleans) {
    if(!value) return false
  }
  return true
}

export const isNumeric = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

export const deepComparison = (o1: any, o2: any, excuseTypeDifferences: boolean = false): boolean => {
  /* It's messy but I did it on my own ^^ */
  if(excuseTypeDifferences) {
    if(typeof o1 != 'object' && String(o1) === String(o2)) return true
  } else {
    if(o1 === o2) return true 
  }
  if(o1 == null || o2 == null) return false
  if(typeof o1 != 'object' || typeof o2 != 'object') return false
  const keysOf1 = Object.keys(o1)
  const keysOf2 = Object.keys(o2)
  if(keysOf1.length != keysOf2.length) return false
  let subObjects = []
  for(let i of keysOf1) {
    if(!keysOf2.includes(i)) return false
    if(!excuseTypeDifferences && o1[i] !== o2[i] && typeof o1[i] != 'object') return false
    if(o1[i] != o2[i] && typeof o1[i] == 'object' && o1[i] != null)
      subObjects = [...subObjects, deepComparison(o1[i], o2[i], excuseTypeDifferences)]
  }
  if(subObjects.length != 0)
    return areAllTrue(subObjects)
  return true
}

export const bindIsBetweenFunction = (lowerEnd: number, higherEnd: number) => {
  return (value: number): boolean => (value >= lowerEnd && value < higherEnd)
}

export const renderChildArrayIfIndex = (children: React.ReactNode, fn: (value: number) => boolean): JSX.Element[] => {
  return (
      React.Children.map(children, (Item, index) => 
        fn(index) &&
          React.createElement(React.Fragment, {key: `renderedConditionally__${index}`}, Item)
    )
  )
}

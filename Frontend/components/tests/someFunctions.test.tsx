import { deepComparison, areAllTrue } from '../someFunctions'

describe('Tests areAllTrue function', () => {
  test('for empty array', () => 
    expect(areAllTrue([])).toBe(false)
  )
  test('for for boolean[] of true', () => 
    expect(areAllTrue([true, true])).toBe(true)
  )
  test('for for boolean[] of false', () => 
    expect(areAllTrue([false, false])).toBe(false)
  )
  test('for for boolean[] of mixed', () => 
    expect(areAllTrue([false, true])).toBe(false)
  )
})

describe('Tests deepComparison function with simple input', () => {
  test('for input (1, 1)', () => 
    expect(deepComparison(1, 1)).toBe(true)
  )
  test('for input (1, 0)' , () => 
    expect(deepComparison(1, 0)).toBe(false)
  )
  test('for null input', () =>
    expect(deepComparison(1, null)).toBe(false)
  )
  test('for double nullish', () =>
    expect(deepComparison(null, [])).toBe(false)
  )
  test('for varying types while unallowed', () =>
    expect(deepComparison(true, 'true', false)).toBe(false)
  )
  test('for varying types while allowed', () =>
    expect(deepComparison(true, 'true', true)).toBe(true)
  )
})

const sampleObject1 = { who: 'sampleObject1', while: 'why', what: 'which', how: null, p: 1, c: true }
const sampleObject2 = {...sampleObject1, who: 'sampleObject2',l: "g"}
const sampleObject3 = {...sampleObject1, who: 'sampleObject3', l: "k"}
const sampleObject4 = {
  ...sampleObject1,
  who: 'sampleObject4',
  l: {...sampleObject2, who: 'sampleObject4_1'}
}
const sampleObject5 = {
  ...sampleObject1, 
  who: 'sampleObject5',
  l: {...sampleObject3, who: 'sampleObject5_1'}
}


describe('Tests deepComparison function with simple objects', () => {
  test('for identical 1 layer deep objects', () => {
    expect(deepComparison(sampleObject1, {...sampleObject1})).toBe(true)
  })
  test('test for one bigger 1 layer deep object', () => {
    expect(deepComparison(sampleObject1, sampleObject2)).toBe(false)
  })
  test('test for different 1 layer deep objects', () => {
    expect(deepComparison(sampleObject3, sampleObject2)).toBe(false)
  })
})

describe('Tests deepComparison function with complex objects', () => {
  test('tests for two identical 2 layer objects', () => {
    expect(deepComparison(sampleObject4, {...sampleObject4})).toBe(true)
  })
  test('tests for two different 2 layer objects', () => {
    expect(deepComparison(sampleObject4, sampleObject5)).toBe(false)
  })
})


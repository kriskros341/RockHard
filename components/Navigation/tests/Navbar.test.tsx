import { deepComparison } from "../../someFunctions";

const urlObject1 = {pathname: "/koncerty", query: {}}
const urlObject3 = {...urlObject1, query: {showMap: true}}
const urlObject2 = {pathname: "/koncerty", query: {showMap: "true"}}
const urlObject4 = {pathname: "/koncerty", query: {showMap: "true"}}
describe('practical test of deepComparison function', () => {
  test('Checking for matching path objects', () => {
    expect(deepComparison(urlObject1, {...urlObject1})).toBe(true)
    expect(deepComparison(urlObject4.query, urlObject2.query)).toBe(true)
    expect(deepComparison(urlObject4.pathname, urlObject2.pathname)).toBe(true)
    expect(deepComparison(
      {...urlObject4, query: {...urlObject4.query}}, 
      {...urlObject2, query: {...urlObject2.query}},
    )).toBe(true)
  })
  test('Checking for missmatching path objects', () => 
    expect(deepComparison(urlObject2, urlObject1)).toBe(false)
  )
  test('Checking for type missmatch in path objects', () => 
    expect(deepComparison(urlObject2, urlObject3, false)).toBe(false)
  )
  test('Checking for allowed type missmatch in path objects', () => 
    expect(deepComparison(urlObject2, urlObject3, true)).toBe(true)
  )
})
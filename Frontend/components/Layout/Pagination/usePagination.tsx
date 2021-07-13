import { useRouter } from 'next/router'
import { useState } from 'react'
import { isNumeric, bindIsBetweenFunction } from '../../someFunctions'
import { usePaginationInterface } from './PaginationTypes'

export const useStatePagination: usePaginationInterface = (itemCount, itemsPerPage) => {
  /* 
    creates pagination utilities based on inner state. 
    State pagination doesn't fill history with trash
    :param itemCount count of wrapped items
    :param itemsPerPage Determines how many items will be displayed per page
    uses the same interface as useRouterPagination
  */
  const [ currentPageNumber, setCurrentPageNumber ] = useState(0)
  const paginationControls = {
    nextPage: () => setCurrentPageNumber(v => ++v),
    previousPage: () => setCurrentPageNumber(v => --v)
  }
  const firstVisibleIndex = Math.max(
    0 + currentPageNumber * itemsPerPage, 0
  )
  const lastVisibleIndex = Math.min(
    itemsPerPage + currentPageNumber * itemsPerPage, itemCount
  )
  const isOnCurrentPage = (itemIndex: number) => {
    /* 
      Checks if index of current item is within the range of currently displayed indexes
    */
    return itemIndex >= firstVisibleIndex && itemIndex < lastVisibleIndex
  }
  return {currentPageNumber, paginationControls, isOnCurrentPage}
}

export const useRouterPagination: usePaginationInterface = (itemCount, itemsPerPage) => {
  /* 
    creates pagination utilities based on router.query. 
    :param itemCount count of wrapped items
    :param itemsPerPage Determines how many items will be displayed per page
    uses the same interface as useStatePagination
  */
  const router = useRouter()
  const getCurrentPageNumber = () => {
    const currentPageString = 
      router.query.page ? router.query.page : "0"
    const givenPageNumber = 
      typeof currentPageString == 'object' ? (
        currentPageString[0]
      ) : ( 
        currentPageString 
      )
    const currentPageNumber = isNumeric(givenPageNumber) ? (
      parseInt(givenPageNumber) 
    ) : (
      0
    )
    return currentPageNumber
  }
  const currentPageNumber = getCurrentPageNumber()
  const changePage = (fn: (v: number) => number) => {
    const currentPathname = router.pathname
    const currentQuery = router.query
    router.replace({
      pathname: currentPathname, 
      query: {...currentQuery, page: fn(currentPageNumber)}
    })
  }
  const paginationControls = {
    nextPage: () => changePage(v => ++v),
    previousPage: () => changePage(v => --v)
  }
  const firstVisibleIndex = Math.max(
    0 + currentPageNumber * itemsPerPage, 0
  )
  const lastVisibleIndex = Math.min(
    itemsPerPage + currentPageNumber * itemsPerPage, itemCount
  )
  const isOnCurrentPage = bindIsBetweenFunction(
    firstVisibleIndex, 
    lastVisibleIndex
  )
  return {currentPageNumber, paginationControls, isOnCurrentPage}
}

export default useRouterPagination

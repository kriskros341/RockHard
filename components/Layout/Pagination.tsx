import React, { useRef } from 'react'
import globalStyle from '../../styles/Page.module.scss'
import { useStatePagination, useRouterPagination } from './usePagination'

export interface PaginationControlsInterface {
  pageNumber: number,
  maxPageNumber: number,
  onNext?: () => void
  onPrevious?: () => void
}

export const DefaultPaginationControls: React.FC<PaginationControlsInterface> = ({pageNumber, maxPageNumber, onNext, onPrevious}) => {
  /* 
    My default pagination controls.
    Any substitute should extend PaginationControlsInterface
  */
  const handleNext = onNext ? () => onNext() : null
  const handlePrevious = onPrevious ? () => onPrevious() : null
  return (
    <div className={globalStyle.Pagination__ControlsContainer}>
      {pageNumber}
      <div className={globalStyle.Pagination__ControlsContent}>
        {pageNumber != 0 &&
          <button 
            onClick={handlePrevious}
            className={globalStyle.Pagination__Controls}>
            prevPage
          </button>
        }
        {pageNumber != maxPageNumber && 
          <button 
            onClick={handleNext}
            className={globalStyle.Pagination__Controls}>
            nextPage
          </button>
        }
      </div>
    </div>
  )
}


interface PaginationInterface<CustomControls> {
  itemsPerPage: number, 
  className?: string, 
  isStatePagination?: boolean
  CustomControls?: React.FC<CustomControls & PaginationControlsInterface>
}

export const Pagination: React.FC<PaginationInterface<{}>> = ({children, itemsPerPage, className, isStatePagination, CustomControls}) => {
  /* 
    Pagination component is used to limit the amount of data presented at once.
    It accepts (Element | Component)[] as Children with specified key attribute.
    :param itemsPerPage determines how mant elements can be rendered at once
    :?param className provides a way to additionally style the div that wraps children
    :?isStatePagination determines whether pagination should take place within page state. 
      This way you avoid having lot's of history entries of essentially the same page.
      You lose the ability to router.back() to last seen page though...
      
  */
  const childrenCount = React.Children.count(children)
  const { currentPageNumber, paginationControls, isOnCurrentPage } = isStatePagination ? useStatePagination(childrenCount, itemsPerPage) : useRouterPagination(childrenCount, itemsPerPage)
  const paginationRef = useRef(null)
  const scrollBackAnd = (callback: () => void) => {
    paginationRef.current.scrollTo(0, 0)
    callback()
  }
  const shouldRenderControls: boolean = childrenCount > itemsPerPage
  return (
    <div ref={paginationRef} className={`${className} ${globalStyle.Pagination__Component}`}>
      {React.Children.map(children, (Item, index) => 
        isOnCurrentPage(index) &&
          React.createElement('div', [], Item)
      )}
      {shouldRenderControls && (CustomControls ? 
        <CustomControls 
          pageNumber={currentPageNumber} 
          maxPageNumber={Math.floor(childrenCount / itemsPerPage)} 
          onNext={() => scrollBackAnd(paginationControls.nextPage)} 
          onPrevious={() => scrollBackAnd(paginationControls.previousPage)}
        />
      : 
        <DefaultPaginationControls 
          pageNumber={currentPageNumber} 
          maxPageNumber={Math.floor(childrenCount / itemsPerPage)} 
          onNext={() => scrollBackAnd(paginationControls.nextPage)} 
          onPrevious={() => scrollBackAnd(paginationControls.previousPage)}
        /> 
      )}
      </div>
  )
}

export default Pagination
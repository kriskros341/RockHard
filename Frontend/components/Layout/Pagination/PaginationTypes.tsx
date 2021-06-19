type paginationUtilitiesModel = {
  currentPageNumber: number
  paginationControls: {
    nextPage: () => void
    previousPage: () => void
  }
  isOnCurrentPage: (itemIndex: number) => boolean
}

export interface usePaginationInterface {
  (itemCount: number, itemsPerPage: number): paginationUtilitiesModel
}

export interface PaginationInterface<CustomControls = {}> {
  itemsPerPage: number, 
  className?: string, 
  usePagination?: usePaginationInterface
  CustomControls?: React.FC<CustomControls & PaginationControlsInterface>
}

export interface PaginationControlsInterface {
  pageNumber: number,
  maxPageNumber: number,
  onNext?: () => void
  onPrevious?: () => void
}

export type paginationTypesModel = 'stateBased' | 'routerBased'
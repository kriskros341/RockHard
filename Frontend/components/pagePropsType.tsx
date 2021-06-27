export type urlObjectModel = {
  pathname: string,
  query?: any
}

export type additionalButtonModel = {
  to: urlObjectModel
  text: string
  icon: string
  toggle?: boolean
}

type articleTypeModel = 'article' | 'page' 

export type pageTitleModel = {
  title: string
  type: articleTypeModel
}

export type staticPropsModel<T = {}> = {
  props: {
    pageTitle: pageTitleModel
    additionalButtons?: additionalButtonModel[]
    fetchData?: T | any
  }
}

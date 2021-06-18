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

type pageTitleModel = {
  title: string
  type: articleTypeModel
}

export type staticPropsModel = {
  props: {
    pageTitle: pageTitleModel
    additionalButtons?: additionalButtonModel[]
  }
}
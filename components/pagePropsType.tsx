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

export type staticPropsModel = {
  props: {
    pageTitle: string,
    additionalButtons: additionalButtonModel[]
  }
}
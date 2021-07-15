import globalStyle from '../../styles/Page.module.scss'


export const PageTitle = ({children}) => (
  <h2 className={globalStyle.Page__title}>
    {children}
  </h2>
)


interface PageLayoutInterface {
  TitleComponent: JSX.Element
  classNames?: string
}


const PageLayout: React.FC<PageLayoutInterface> = ({children, TitleComponent, classNames}) => {
  const classes = `
    ${globalStyle.Page__container}
    ${classNames ? classNames : ''}
  ` 
  return (
    <main 
      className={classes}
    >
      {TitleComponent}
      {children}
    </main>
  )
}


export default PageLayout

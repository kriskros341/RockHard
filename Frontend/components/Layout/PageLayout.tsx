import globalStyle from '../../styles/Page.module.scss'


export const PageTitle = ({children}) => (
  <h2 className={globalStyle.Page__title}>
    {children}
  </h2>
)


interface PageLayoutInterface {
  TitleComponent: JSX.Element
}

const PageLayout: React.FC<PageLayoutInterface> = ({children, TitleComponent}) => {
  return (
    <main className={globalStyle.Page__container}>
      {TitleComponent}
      {children}
    </main>
  )
}


export default PageLayout

import globalStyle from '../../styles/Page.module.scss'


export const PageTitle = ({children}) => (
  <h2 className={globalStyle.Page__title}>
    {children}
  </h2>
)


const PageLayout: React.FC<{TitleComponent: JSX.Element}> = ({children, TitleComponent}) => {
  return (
    <main className={globalStyle.Page__container}>
      {TitleComponent}
      {children}
    </main>
  )
}


export default PageLayout

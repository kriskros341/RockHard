import globalStyle from '../../styles/Page.module.scss'

export const PageTitle = ({children}) => (
  <h2 className={globalStyle.Page__title}>
    {children}
  </h2>
)

interface pageLayoutInterface {
  titleComponent: JSX.Element
} 

const PageLayout: React.FC<pageLayoutInterface> = ({titleComponent, children}) => {
  return (
    <main className={globalStyle.Page__container}>
      {titleComponent}
      {children}
    </main>
  )
}


export default PageLayout
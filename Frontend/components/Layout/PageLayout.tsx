import globalStyle from '../../styles/Page.module.scss'

export const PageTitle = ({children}) => (
  <h2 className={globalStyle.Page__title}>
    {children}
  </h2>
)


const PageLayout: React.FC<{}> = ({children}) => {
  return (
    <main className={globalStyle.Page__container}>
      {children}
    </main>
  )
}


export default PageLayout

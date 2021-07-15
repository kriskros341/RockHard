import { useRouter, withRouter } from "next/router"
import { staticPropsModel } from '../../components/pagePropsType'
import appStyle from '../../styles/app.module.scss'
import { performanceModel } from '../../components/Koncerty/Koncerty'
import baseUrl from '@/Misc/baseUrl'
import PageLayout from '@/Components/Layout/PageLayout'
import style from '@/Styles/Koncerty/Performance.module.scss'
import { CallendarSVG } from '@/Components/misc'

export async function getStaticPaths() {
  const performances: performanceModel[] = 
    await fetch(baseUrl)
    .then(response => response.json())
  const paths = performances.map((item) => {
    return {params: {koncert_id: item.id.toString()}}
  })
  return {
    paths: paths,
    fallback: true
  }
}


export async function getStaticProps(context: any): Promise<staticPropsModel> {  
  const performanceId = context.params.koncert_id
  const fetchData = await fetch(baseUrl+`/${performanceId}`)
    .then(r => r.json())
  return {
    props: {
      pageTitle: { 
        title: `Post z dnia`,
        pageType: 'article'
      },
      additionalButtons: [
        {
          to: {pathname: "/koncerty"},
          text: "Go Back",
          icon: '/static/ArrowBack.png'
        },
      ],
      fetchData: fetchData
    },
  }
}


const PerformanceTitle = ({bandName, tourName}) => {
  const bandNameClasses = `
    ${style.bandName}
    ${style.majorFont}
  `

  const tourNameClasses = `
    ${style.minorFont} 
    ${style.diminishedColor}
  `
  return (
    <header
      className={style.titleComponent}
    >
      <div className={bandNameClasses}>
        {bandName}
      </div>
      {tourName && (
        <div className={tourNameClasses}>
          na {tourName}
        </div>
      )}
    </header>
  )
}



interface FrameInterface {
  mirror?: boolean

}


const Frame: React.FC<FrameInterface> = ({children, mirror}) => {
  const frameClasses = `
    ${style.frame}
  `
  const boxClasses = `
    ${style.textContainer}
    ${mirror ? style.mirror : ''}
  `
  return (
    <div className={frameClasses}>
    <div className={style.imagePlaceholder}/>
      <div className={boxClasses}>
          {children}
      </div>
    </div>
  )
}



const SinglePerformance = ({router, fetchData}) => {
  const { bandName, performanceDate } = fetchData
  const date = new Date(performanceDate)
  return (
    <PageLayout
      classNames={style.defaultFont}
      TitleComponent={<PerformanceTitle {...fetchData}/>}
    >
      <Frame>
        <CallendarSVG className={style.decoration} />
        <span
          className={style.minorFont}
        >
          {date.toLocaleDateString()}
        </span>
      </Frame>
      <Frame mirror>
        <CallendarSVG className={style.decoration} />
        <span
          className={style.minorFont}
        >
          {date.toLocaleDateString()}
        </span>
      </Frame>
    </PageLayout>
  )
}


export default withRouter(SinglePerformance)

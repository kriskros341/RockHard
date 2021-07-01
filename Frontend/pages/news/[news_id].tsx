import { newsDataModel } from './index'
import { staticPropsModel } from '../../components/pagePropsType'
import appStyle from '../../styles/app.module.scss'
import { withRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())
const serverUrl = 'http://rockhard.ddns.net:3002'

export async function getStaticPaths() {
  const Posts = await fetch(`${serverUrl}/api/news`)
    .then(r => r.json())
  const paths = Posts.map((item: newsDataModel) => {
    return {params: {news_id: item.id.toString()}}
  })
  return {
    paths: paths,
    fallback: true
  }
}

export async function getStaticProps(context: any): Promise<staticPropsModel> {
  const news_id = context.params.news_id
  const newsData = await fetch(`${serverUrl}/api/news/${news_id}`).then(r => r.json())
  console.log(newsData)
  return {
    props: {
      pageTitle: {
        title: newsData.title,
        type: 'article'
      },
      additionalButtons: [
        {
          to: {pathname: "/news"},
          text: "Go Back",
          icon: '/static/ArrowBack.png'
        },
      ],
      fetchData: newsData,
    },
  }
}

const Koncert = ({router, fetchData}) => {
  return (  
    <div>{fetchData.text}</div>
  )
}

export default withRouter(Koncert)

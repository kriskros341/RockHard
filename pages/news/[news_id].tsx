import { createFakeDataArray, newsDataModel } from './index'
import { staticPropsModel } from '../../components/pagePropsType'
import appStyle from '../../styles/app.module.scss'
import { withRouter } from 'next/router'

const Posts: newsDataModel[] = createFakeDataArray()

export async function getStaticPaths() {
  let paths = []
  for(let i: number = 1; i < Posts.length; i++) {
    paths = [...paths, {params: {news_id: i.toString()}}] 
  }
  return {
    paths: paths,
    fallback: true
  }
}

export async function getStaticProps(context: any): Promise<staticPropsModel> {
  const title: string = Posts[context.params.news_id].title
  return {
    props: {
      pageTitle: {
        title: title,
        type: 'article'
      },
      additionalButtons: [
        {
          to: {pathname: "/news"},
          text: "Go Back",
          icon: '/static/ArrowBack.png'
        },
      ]
    },
  }
}

const Koncert = ({router}) => {
  const koncertId = parseInt(router.query.news_id)
  console.log(Posts[koncertId])
  return (
    <div>{Posts[koncertId] && Posts[koncertId].title}</div>
  )
}

export default withRouter(Koncert)

import { useRouter, withRouter } from "next/router"
import { Posts } from './index'
import { staticPropsModel } from '../../components/pagePropsType'
import appStyle from '../../styles/app.module.scss'

export async function getStaticPaths() {
  let paths = []
  for(let i: number = 1; i < Posts.length; i++) {
    paths = [...paths, {params: {post_id: i.toString()}}] 
  }
  return {
    paths: paths,
    fallback: true
  }
}
export async function getStaticProps(context: any): Promise<staticPropsModel> {
  const date = Posts[context.params.post_id].date
  return {
    props: {
      pageTitle: {title: `Post z dnia ${date.toLocaleDateString()}`, type: 'page'},
      additionalButtons: [
        {
          to: {pathname: "/blog"},
          text: "Go Back",
          icon: '/static/ArrowBack.png'
        },
      ]
    },
  }
}

const BlogPost = ({router}) => {
  const { post_id } = router.query
  return (
    <div>{ Posts[post_id] && Posts[post_id].title }</div>
  )
}

export default withRouter(BlogPost)
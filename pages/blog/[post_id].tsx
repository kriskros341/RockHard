import { useRouter } from "next/router"
import { Posts } from './index'
import { staticPropsModel } from '../../components/pagePropsType'

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
  const pageTitle = `Post z dnia ${date.toLocaleDateString()}`
  return {
    props: {
      pageTitle: pageTitle,
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

const BlogPost = () => {
  const router = useRouter()
  const { post_id } = router.query
  return (
    <div>{ post_id }</div>
  )
}

export default BlogPost
import { useRouter, withRouter } from "next/router"
import { staticPropsModel } from '@/Components/pagePropsType'
import appStyle from '@/Styles/app.module.scss'
import style from '@/Styles/Blog/Blog.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import PageLayout, { PageTitle } from '@/Components/Layout/PageLayout'
import Image from 'next/image'



const Postss = null 



const fetcher = (url: string) => fetch(url).then(r => r.json())
const serverUrl = 'http://rockhard.ddns.net:3002'

export async function getStaticPaths(c) {
  console.log(c)
  const Posts = await fetch(`${serverUrl}/api/blog`)
    .then(r => r.json())
  const paths = Posts.map((item) => {
    return {params: {post_id: item.id.toString()}}
  })
  return {
    paths: paths,
    fallback: true 
  }
}


export async function getStaticProps(context: any): Promise<staticPropsModel> {
  const post_id = context.params.post_id
  const postData = await fetch(`${serverUrl}/api/blog/${post_id}`).then(r => r.json())
   
  return {
    props: {
      pageTitle: {title: `Post z dnia`, type: 'page'},
      additionalButtons: [
        {
          //page?
          to: {pathname: 'back'},
          text: "Go Back",
          icon: '/static/ArrowBack.png'
        },
      ],
      fetchData: postData
    },
  }
}



const baseURL = 'http://rockhard.ddns.net:3002'

const BlogPostTitle = ({image, children}) => {
  console.log('image', image)
  return (
      <motion.div 
        className={style.PostPage__header}
      >
        <Image 
          width='630'
          height='630'
          src={image}
        />
        <div className={`${style.PostPage__title} ${style.Post__title}`}>
          {children}
        </div>
      </motion.div>
  )
}

const BlogPost = ({router, fetchData}) => {
  const articleImage = fetchData.image
  console.log('object', articleImage)
  const headerImage = articleImage ? (
      baseURL + articleImage.image 
    ) : (
      '/static/pob2.png'
    )
  return (
    <PageLayout> 
      <BlogPostTitle image={headerImage}>
        {fetchData.title}
      </BlogPostTitle> 
      {fetchData.text}
    </PageLayout>
  )
}

export default withRouter(BlogPost)

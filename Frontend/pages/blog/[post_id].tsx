import { useRouter, withRouter } from "next/router"
import { staticPropsModel } from '@/Components/pagePropsType'
import appStyle from '@/Styles/app.module.scss'
import style from '@/Styles/Blog/Blog.module.scss'
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion'
import PageLayout, { PageTitle } from '@/Components/Layout/PageLayout'
import Image from 'next/image'
import { useEffect, useState, useReducer } from 'react'


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
      pageTitle: {title: `Post z dnia`, pageType: 'page'},
      additionalButtons: [
        {
          //page?
          to: {pathname: '/blog'},
          text: "Go Back",
          icon: '/static/ArrowBack.png'
        },
      ],
      fetchData: postData
    },
  }
}



const baseURL = 'http://rockhard.ddns.net:3002'

const BlogPostTitle: React.FC<{image: string, tags: any[]}> = ({image, children, tags}) => {
  const treshold: number = 20
  const { scrollY } = useViewportScroll()
  const [ , refresh ] = useReducer(v => ++v, 1) 
  const isScrolled = () => scrollY.get() > treshold
  const [ scrolledState, setScrolled ] = useState(isScrolled())
  useEffect(() => {
    const unsubscribe = scrollY.onChange(() => {
      setScrolled(isScrolled()) 
    })
    return unsubscribe
  }, [])
  
  console.log('rerender!')


  return (
    <motion.div

      className={style.PostPage__header}
    >
      <Image 
        width='630'
        height='630'
        src={image}
      />
      <div className={style.PostPage__shortTagList}>
        {tags.slice(0, 3).map((tag) => {
          return (tag.name)
        })}
      </div>
      <motion.div 
        animate={{y: scrolledState ? 0 : '6rem', transition: {type: 'tween'}}} 
        className={`${style.PostPage__title} ${style.Post__title}`}
      >
        {children}
      </motion.div>
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
    <PageLayout TitleComponent={<h2>Koncerty</h2>}> 
      <BlogPostTitle image={headerImage} tags={fetchData.tags}>
        {fetchData.title}
      </BlogPostTitle> 
      <div className={style.PostPage__content}>
        {fetchData.text}
      </div>
    </PageLayout>
  )
}

export default withRouter(BlogPost)

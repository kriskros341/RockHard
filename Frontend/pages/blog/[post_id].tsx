import { useRouter, withRouter } from "next/router"
import { staticPropsModel } from '@/Components/pagePropsType'
import appStyle from '@/Styles/app.module.scss'
import style from '@/Styles/Blog/Blog.module.scss'
import { 
  motion, 
  AnimatePresence, 
  useViewportScroll, 
  useTransform
} from 'framer-motion'
import PageLayout, { PageTitle } from '@/Components/Layout/PageLayout'
import Image from 'next/image'
import { useEffect, useState, useReducer } from 'react'
import { useInView } from 'react-intersection-observer'


const serverUrl = 'http://rockhard.ddns.net:3002'
const fetcher = (url: string) => fetch(url).then(r => r.json())


export async function getStaticPaths(c) {
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
  const postId = context.params.post_id
  const postUrl = `${serverUrl}/api/blog/${postId}`
  const postData = await fetch(postUrl).then(r => r.json())
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


interface BLogPostTitleInterface {
  image: string
  tags: {
    
  }
}


const BlogPostHeader: React.FC<{image: string, tags: any[]}> = ({image, children, tags}) => {
  const treshold: number = 20
  const titleClasses = `
    ${style.PostPage__title} 
    ${style.Post__title}
    ${style.TitleFont}
  `
  const tagClasses = `
    ${style.TagFont}
    ${style.PostPage__tagContent}
  `
  return (
    <motion.div
      className={style.PostPage__header}
    >
      <Image 
        width='630'
        height='630'
        src={image}
      />
      <ul className={style.PostPage__shortTagList}>
        {tags.slice(0, 3).map((tag) => {
          return (
            <li className={style.PostPage__tag}>
              <span className={tagClasses}>
                {tag.tag_name}
              </span>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}

const QuotationSVG = () => {
  return (
    <svg version="1.1" id="Capa_1" x="0px" y="0px"
	    width="20" height="20" viewBox="0 0 349.078 349.078" 
	  >
      <g>
	      <path d="M150.299,26.634v58.25c0,7.9-6.404,14.301-14.304,14.301c-28.186,0-43.518,28.909-45.643,85.966h45.643
		      c7.9,0,14.304,6.407,14.304,14.304v122.992c0,7.896-6.404,14.298-14.304,14.298H14.301C6.398,336.745,0,330.338,0,322.447V199.455
		      c0-27.352,2.754-52.452,8.183-74.611c5.568-22.721,14.115-42.587,25.396-59.048c11.608-16.917,26.128-30.192,43.16-39.44
		      C93.886,17.052,113.826,12.333,136,12.333C143.895,12.333,150.299,18.734,150.299,26.634z M334.773,99.186
		      c7.896,0,14.305-6.407,14.305-14.301v-58.25c0-7.9-6.408-14.301-14.305-14.301c-22.165,0-42.108,4.72-59.249,14.023
		      c-17.035,9.248-31.563,22.523-43.173,39.44c-11.277,16.461-19.824,36.328-25.393,59.054c-5.426,22.166-8.18,47.266-8.18,74.605
		      v122.992c0,7.896,6.406,14.298,14.304,14.298h121.69c7.896,0,14.299-6.407,14.299-14.298V199.455
		      c0-7.896-6.402-14.304-14.299-14.304h-44.992C291.873,128.095,306.981,99.186,334.773,99.186z"/>
        </g>
    </svg>
  )
}


const Card = ({children}) => {
  const [
    observerRef, 
    observerInView, 
    ObserverEntry
  ] = useInView({threshold: 0.9})
  const animate = observerInView ? {} : {scale: 0.7, opacity: 0.9}
  return (
    <motion.div
      animate={animate}
      ref={observerRef}
      className={style.PostPage__similar}
    >
      <QuotationSVG />{children}<QuotationSVG />
    </motion.div>

  )
}


const BlogPost = ({router, fetchData}) => {
  const articleImage = fetchData.image
  const headerImage = articleImage ? (
      serverUrl + articleImage.image 
    ) : (
      '/static/pob2.png'
    )
  return (
    <PageLayout 
      TitleComponent={
        <h2 className={appStyle.articleTitle}>
          {fetchData.title}
        </h2>
      }> 
      <BlogPostHeader 
        image={headerImage} 
        tags={fetchData.tags}
      />
      <div className={style.PostPage__content}>
        {fetchData.text}
      </div>
      <Card>
        {fetchData.text}
      </Card>
    </PageLayout>
  )
}

export default withRouter(BlogPost)

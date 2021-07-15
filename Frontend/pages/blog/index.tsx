import style from '@/Styles/Blog/Blog.module.scss'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { staticPropsModel } from '../../components/pagePropsType'
import globalStyle from '@/Styles/app.module.scss'
import PageLayout, { PageTitle } from '@/Components/Layout/PageLayout'
import { RouterPagination } from '@/Components/Layout/Pagination/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'


type PostModel = {
  id: number
  title: string
  tags: string[]
  image: string
  date: Date
}

const serverUrl = 'http://rockhard.ddns.net:3002'

export async function getStaticProps(context): Promise<staticPropsModel> {
  const Posts = await fetch(`${serverUrl}/api/blog`)
    .then(r => r.json())
  return {
    props: {
      pageTitle: {title: `Posty`, pageType: 'page'},
      additionalButtons: [
        {
          to: {
            pathname: '/blog',
            query: {showMenu: true},
          },
          text: "Co Nowego",
          icon: '/static/ArticleIcon.png'
        },
      ],
      fetchData: Posts
    },
  }
}


const PostImage = ({image, isViewed}) => {
  const imageClasses = `
    ${style.Post__image} 
    ${isViewed && style.active}
  `
  const imageToDisplay = image ? (
    serverUrl + image.image 
    ) : (
    '/static/pob2.png'
  )
  return (
    <div className={imageClasses}>
        <Image
          width="320"
          src={imageToDisplay}
          height="320"
        />
      <div className={style.Post__image__circleHolder} />
    </div>
  )
}

const PostBody = ({title, tags}) => {
  const articleClasses = `
    ${style.Post__body} 
    ${globalStyle.borderAndShadow}
  `
  return (
    <article className={articleClasses}>
      <div className={style.Post__title}>
        {title}
      </div>
      <div className={style.Post__meta}>
        {tags.map(tag => 
          tag.tag_name + ' '
        )}
      </div>
    </article>
  )
}

const Post: React.FC<PostModel> = ({id, title, tags, image, date}) => {
  const [
    observerRef, 
    observerInView, 
    ObserverEntry
  ] = useInView({threshold: 0.8});

  return (

    <motion.div 
      className={style.Post__component} 
      ref={observerRef}
    >
      <Link href={`/blog/${id}`}>
        <div className={style.Post__container}>
          <PostImage 
            image={image} 
            isViewed={observerInView} 
          />
          <PostBody 
            title={`${title}_${id}`} 
            tags={tags} 
          />
        </div>
      </Link>
    </motion.div>
  )
}


const Blog = ({fetchData}) => {
  return (
    <PageLayout TitleComponent={
      <PageTitle>Posty</PageTitle>
      }
    >
      <RouterPagination itemsPerPage={3}>
        {fetchData.map((item, index) => (
          <Post key={item.id} {...item} />
        ))}
      </RouterPagination>
    </PageLayout>
  )
}


export default Blog

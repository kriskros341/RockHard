import style from '../../styles/Blog/Blog.module.scss'
import pageStyle from '../../styles/Page.module.scss'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { staticPropsModel } from '../../components/pagePropsType'

export async function getStaticProps(context): Promise<staticPropsModel> {
  return {
    props: {
      pageTitle: "Posty",
      additionalButtons: [
        {
          to: {
            pathname: '/blog',
            query: {showMenu: true},
          },
          text: "Co Nowego",
          icon: '/static/ArticleIcon.png'
        },
      ]
    },
  }
}

export const Posts = [
  {
    title: "Album SPiRiTS In The Forest jest z wielu względów wyjątkowy w dorobku Depeche Mode",
    tags: ["Muzyka", "Rockowa", "Albumy", "Depeche Mode"],
    image: "/static/pobrane.jpg",
    date: new Date(2021, 4, 20)
  },
  {
    title: "Album SPiRiTS In The Forest jest z wielu względów wyjątkowy w dorobku Depeche Mode",
    tags: ["Muzyka", "Rockowa", "Albumy", "Depeche Mode"],
    image: "/static/pobrane.jpg",
    date: new Date(2021, 4, 20)
  },
  {
    title: "Album SPiRiTS In The Forest jest z wielu względów wyjątkowy w dorobku Depeche Mode",
    tags: ["Muzyka", "Rockowa", "Albumy", "Depeche Mode"],
    image: "/static/pobrane.jpg",
    date: new Date(2021, 4, 20)
  },
  {
    title: "Album SPiRiTS In The Forest jest z wielu względów wyjątkowy w dorobku Depeche Mode",
    tags: ["Muzyka", "Rockowa", "Albumy", "Depeche Mode"],
    image: "/static/pobrane.jpg",
    date: new Date(2021, 4, 20)
  },
  {
    title: "Album SPiRiTS In The Forest jest z wielu względów wyjątkowy w dorobku Depeche Mode",
    tags: ["Muzyka", "Rockowa", "Albumy", "Depeche Mode"],
    image: "/static/pobrane.jpg",
    date: new Date(2021, 4, 20)
  },
]

type PostModel = {
  title: string
  tags: string[]
  image: string
  date: Date
}

const PostImage = ({image, isViewed}) => {
  return (
    <div className={`${style.Post__image} ${isViewed && style.active}`}>
        <Image
      width="320"
          src={image}
          height="320"
          >
        </Image>
      <div className={style.Post__image__circleHolder} />
    </div>
  )
}

const Post: React.FC<PostModel> = ({title, tags, image, date}) => {
  const [observerRef, observerInView, ObserverEntry] = useInView({threshold: 0.8});
  console.log(observerInView, ObserverEntry)
  return (
    <div ref={observerRef} className={style.Post__component}>
      <div className={style.Post__container}>
        <PostImage image={image} isViewed={observerInView} /> 
        <div className={style.Post__body}>
          <div className={style.Post__title}>
            {title}
          </div>
          <div className={style.Post__meta}>
            {tags.join(", ")}
          </div>
        </div>
      </div>  
    </div>
  )
}

const Blog = () => {
  console.log("jd")
  return (
    <div className={pageStyle.Page__component}>
      <div className={pageStyle.Page__container}>
        {Posts.map((item, index) => 
          <a href={`/blog/${index}`}>
            <Post key={`BlogPost__${index}`} {...item} />
          </a>
        )}
      </div>
    </div>
  )
}

export default Blog

import style from '../../styles/Blog/Blog.module.scss'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { staticPropsModel } from '../../components/pagePropsType'
import globalStyle from '../../styles/app.module.scss'
import PageLayout, { PageTitle } from '../../components/Layout/PageLayout'

export async function getStaticProps(context): Promise<staticPropsModel> {
  return {
    props: {
      pageTitle: {title: `Posty`, type: 'page'},
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
  item_id: number
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

const PostBody = ({title, tags}) => 
  <article className={`${style.Post__body} ${globalStyle.borderAndShadow}`}>
    <div className={style.Post__title}>
      {title}
    </div>
    <div className={style.Post__meta}>
      {tags.join(", ")}
    </div>
  </article>


const Post: React.FC<PostModel> = ({title, tags, image, date, item_id}) => {
  const [observerRef, observerInView, ObserverEntry] = useInView({threshold: 0.8});
  console.log(observerInView, ObserverEntry)
  return (
    <div ref={observerRef} className={style.Post__component}>
      <a href={`/blog/${item_id}`}>
        <div className={style.Post__container}>
          <PostImage image={image} isViewed={observerInView} /> 
          <PostBody title={`${title}_${item_id}`} tags={tags} />
        </div>
      </a>
    </div>
  )
}

const Blog = () => {
  return (
    <PageLayout titleComponent={<PageTitle>Koncerty</PageTitle>}>
      {Posts.map((item, index) => 
        <Post key={`BlogPost__${index}`} item_id={index} {...item} />
      )}
    </PageLayout>
  )
}


export default Blog

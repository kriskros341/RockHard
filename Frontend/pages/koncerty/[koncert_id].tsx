import { useRouter, withRouter } from "next/router"
import { staticPropsModel } from '../../components/pagePropsType'
import appStyle from '../../styles/app.module.scss'

export async function getStaticPaths() {
  let paths = []
  for(let i: number = 1; i < koncerty.length; i++) {
    paths = [...paths, {params: {post_id: i.toString()}}] 
  }
  return {
    paths: paths,
    fallback: true
  }
}

export async function getStaticProps(context: any): Promise<staticPropsModel> {
  const date = koncerty[context.params.koncert_id].date
  return {
    props: {
      pageTitle: {
        title: `Post z dnia ${date.toLocaleDateString()}`,
        type: 'article'
      },
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

export type koncertModel = {
  zespol: string,
  trasa: string,
  miejsce: string,
  date: Date,
  image?: string
  geodata: {
    latitude: number
    longitude: number
  }
}

const createFakeData = (i: number): koncertModel => {
  return {
    zespol: `Nazwa Zespołu Nazwa Zespołu_${i} `,
    trasa: `Nazwa Trasy Koncertowej_${i} `,
    miejsce: `Miejsce Koncertu Miejsce_${i} `,
    date: new Date(),
    image: Math.random() > 0.5 && '/static/pob2.png',
    geodata: {
      latitude: 51+Math.random()*4,
      longitude: 17+Math.random()*6
    }
  }
}

const createFakeDataArray = () => {
  let kon: koncertModel[] = []
  for(var i = 0; i < 10; i++) {
    kon.push(createFakeData(i))
  }
  return kon
}

export const koncerty = createFakeDataArray()

const BlogPost = ({router}) => {
  const { post_id } = router.query
  return (
    <div>
      {koncerty[post_id]}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae corrupti vero nemo eius fuga blanditiis dolores neque repudiandae nesciunt vitae iusto, enim magni ab unde ut, tempore repellendus ipsa? Perspiciatis!
    </div>
  )
}

export default withRouter(BlogPost)
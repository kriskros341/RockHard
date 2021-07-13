import { useRouter, withRouter } from "next/router"
import { staticPropsModel } from '../../components/pagePropsType'
import appStyle from '../../styles/app.module.scss'
import { performanceModel } from '../../components/Koncerty/Koncerty'


const baseUrl = 'http://rockhard.ddns.net:3002/api/koncerty'
export async function getStaticPaths() {
  const performances: performanceModel[] = 
    await fetch(baseUrl)
    .then(response => response.json())

  const paths = performances.map((item) => {
    return {params: {koncert_id: item.id.toString()}}
  })
  return {
    paths: paths,
    fallback: true
  }
}


export async function getStaticProps(context: any): Promise<staticPropsModel> {  
  const performanceId = context.params.koncert_id
  const fetchData = await fetch(baseUrl+`/${performanceId}`)
    .then(r => r.json())
  return {
    props: {
      pageTitle: { 
        title: `Post z dnia`,
        pageType: 'article'
      },
      additionalButtons: [
        {
          to: {pathname: "/blog"},
          text: "Go Back",
          icon: '/static/ArrowBack.png'
        },
      ],
      fetchData: fetchData
    },
  }
}


const BlogPost = ({router}) => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Recusandae corrupti vero nemo eius fuga blanditiis dolores 
      neque repudiandae nesciunt vitae iusto, enim magni ab unde ut, 
      tempore repellendus ipsa? Perspiciatis!
    </div>
  )
}


export default withRouter(BlogPost)

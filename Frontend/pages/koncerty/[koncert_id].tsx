import { useRouter, withRouter } from "next/router"
import { staticPropsModel } from '../../components/pagePropsType'
import appStyle from '../../styles/app.module.scss'
import { performanceModel } from '../../components/Koncerty/Koncerty'


export async function getStaticPaths() {
  const performances: performanceModel[] = await fetch('http://rockhard.ddns.net:3002/api/koncerty').then(response => response.json())
  const paths = performances.map((item) => {
    return {params: {koncert_id: item.id.toString()}}
  })
  return {
    paths: paths,
    fallback: true
  }
}


export async function getStaticProps(context: any): Promise<staticPropsModel> {  
  console.log(context)
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
      ]
    },
  }
}


const BlogPost = ({router}) => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae corrupti vero nemo eius fuga blanditiis dolores neque repudiandae nesciunt vitae iusto, enim magni ab unde ut, tempore repellendus ipsa? Perspiciatis!
    </div>
  )
}


export default withRouter(BlogPost)

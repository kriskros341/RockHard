import style from '../styles/Blog/Blog.module.scss'

export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: "Koncerty"
    },
  }
}

export default function Koncerty() {
  return (
    <div className={style.Blog__component}>
      <div className={style.Blog__container}>
        ddd
      </div>
    </div>
  )
}
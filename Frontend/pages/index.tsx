import style from '../styles/Home/Home.module.scss'
import { motion } from 'framer-motion'

export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: "Strona Główna"
    },
  }
}

export default function Home() {
  return (
    <motion.div className={style.Home__component} >
      dd
    </motion.div>
  )
}

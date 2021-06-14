import style from '../styles/Blog/Blog.module.scss'
import { motion } from 'framer-motion'

export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: "Strona Główna"
    },
  }
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

export default function Home() {
  return (
    <div className={style.Blog__component}>
      <div className={style.Blog__container}>
        ddd
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            asasasas
          </motion.div>
          <motion.div variants={item}>
            asasasas
          </motion.div>

          <motion.div variants={item}>
            asasasas
          </motion.div>
          

        </motion.div>
      </div>
    </div>
  )
}
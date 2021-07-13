import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import style from '@/Styles/app.module.scss'
import { withRouter } from 'next/router'
import pageStyle from '@/Styles/Page.module.scss'

const pageTransitionVariants = {
  //position absolute to make elements appear in the same place
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: [0, 1, 1, 1],
    scale: 1,
    transition: {
      duration: 0.3,
      type: "Interia"
    }
  },
  exit: {
    scale: 1.1
  }
}


const SwitchAnimation = ({children, router, excludedPaths}) => {
  const variants = 
    !excludedPaths.includes(router.pathname) && pageTransitionVariants
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div 
          className={style.test} 
          variants={variants} 
          initial="initial" 
          animate="animate" 
          exit="exit" 
          key={router.pathname}
        >
          <div className={pageStyle.Page__component}>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}


export default withRouter(SwitchAnimation)

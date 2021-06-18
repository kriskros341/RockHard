import style from '../styles/app.module.scss'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import Head from 'next/head' 
import Navbar from '../components/Navigation/Navbar'
import { withRouter } from 'next/router'
import pageStyle from '../styles/Page.module.scss'
import globals from '../styles/globals.scss'

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

const SwitchAnimation = withRouter(({children, router, excludedPaths}) => {
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div 
          className={style.test} 
          variants={!excludedPaths.includes(router.pathname) && pageTransitionVariants} 
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
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <style data-href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <div className={`${style.app__container}`}>
        <SwitchAnimation
          excludedPaths={['/']}
        >
          <Component {...pageProps}/>
        </SwitchAnimation>
        <Navbar additionalButtons={pageProps.additionalButtons}/>
      </div>
    </>
  )
}

export default MyApp

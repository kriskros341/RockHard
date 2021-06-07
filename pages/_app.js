import styles from '../styles/globals.scss'
import style from '../styles/app.module.scss'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import Head from 'next/head'
import Navbar, { CircleButton } from '../components/Navigation/Navbar'
import Image from 'next/image'
import { useRouter } from 'next/router'

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
      type: "tween"
    }
  },
  exit: {
    scale: 1.1
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  console.log(router)
  return (
    <>
    <Head>
      <style data-href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' />
    </Head>

    <div className={`${style.app__container}`}>
      <AnimatePresence>
        <motion.div className={style.test} variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" key={router.pathname}>
          <h2 className={style.Page__title}>
            {pageProps.pageTitle}
          </h2>
          <main className={style.app__content}>
            <Component {...pageProps} />
          </main>
        </motion.div>
      </AnimatePresence>
      <Navbar />
    </div>
    </>
  )
}

export default MyApp

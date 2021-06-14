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
      type: "Interia"
    }
  },
  exit: {
    scale: 1.1
  }
}

const Layout = ({title, children}) => {
  const router = useRouter()
  return (
    
      <AnimatePresence>
        <motion.div className={style.test} variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" key={router.pathname}>
          <h2 className={style.Page__title}>
            {title}
          </h2>
          <main className={style.app__content}>
            {children}
          </main>
        </motion.div>
      </AnimatePresence>
      
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <style data-href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <div className={`${style.app__container}`}>
        <Layout title={pageProps.pageTitle ? pageProps.pageTitle : "Page"}>
          <Component />
        </Layout>
        <Navbar additionalButtons={pageProps.additionalButtons}/>
      </div>
    </>
  )
}

export default MyApp

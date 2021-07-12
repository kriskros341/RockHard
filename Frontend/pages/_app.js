import Head from 'next/head' 
import Navbar from '../components/Navigation/Navbar'
import globals from '../styles/globals.scss'
import SwitchAnimation from '@/Components/SwitchAnimation'
import { useEffect } from 'react'



function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <style data-href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <SwitchAnimation
        excludedPaths={['/']}
      >
        <Component {...pageProps}/>
      </SwitchAnimation>
      <Navbar additionalButtons={pageProps.additionalButtons}/>
    </>
  )
}

export default MyApp

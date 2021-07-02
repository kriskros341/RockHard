import style from '../styles/Home/Home.module.scss'
import { AnimatePresence, motion, animate, useMotionValue } from 'framer-motion'
import NextImage from 'next/image'
import { useState, useReducer, useRef, useEffect } from 'react'


export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: "Strona Główna"
    },
  }
}


const Test = ({images}) => {
  const [ g, setG ] = useState(true)
  const [ n, setN ] = useState(false)
  const containerRef = useRef()
  const cardboxPosition = useMotionValue(0)
  console.log(cardboxPosition.get())
  const [ , rerender ] = useReducer(v => ++v, 1) 
  const cb = () => {
    setN(v => !v)
    cardboxPosition.set(n ? -20 : 0)
  }
  console.log('rerender')
  const l = g ? 0 : 1
  const runAnimation = () => {
    setN(true)
    setTimeout(() => setG(v => !v), 200)
    setTimeout(() => {
      setN(false)
    }, 1000)
  }
  return (
    <>
    <motion.div
      ref={containerRef}
      onClick={() => cb()}
      className={style.Home__test_container}
    >
      <AnimatePresence 
        exitBeforeEnter
        
      >
        {images[l] && (
          <motion.div 
            key={images[l]}
            className={style.Home__test}
            initial={
              {x: '-100vw', transition: {type: 'tween'}}
            }
            animate={{x: n ? 0 : -20}}
            exit={
              {x: '100vw', transition: {type: 'tween'}}
            }
          >
            <div className={style.test__overlay}></div>
            <motion.div 
              className={style.test__diskContainer}
              animate={{x: n ? 0 : 40}}
            >
              <div className={style.test__disk}>
            </div>
          </motion.div>
          <motion.div>
            <NextImage
              src={images[l]}
              width='240'
              height='240'
            />
          </motion.div>
        </motion.div> )}
      </AnimatePresence>
    </motion.div>
    <div 
      style={{marginTop: 40}}
      onClick={() => runAnimation()}
    >
    trigger animation
    </div>
    </>
  )
}



export default function Home() {
  const images = [
    '/static/DefaultIcon.png',
    '/static/pob2.png',
  ]
  return (
    <div className={style.Home__component} >
      <header className={style.Home__header}>
        <NextImage
          src={'/static/rockhard.png'}
          width={400}
          height={100}
        />
      </header>
      <div className={style.Home__content}>
        <Test images={images}/>
      </div>
    </div>
  )
}

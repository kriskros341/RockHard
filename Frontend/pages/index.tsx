import style from '../styles/Home/Home.module.scss'
import { AnimatePresence, motion, animate, useMotionValue } from 'framer-motion'
import NextImage from 'next/image'
import { useState, useReducer, useRef, useEffect } from 'react'
import { StatePagination } from '@/Components/Layout/Pagination/Pagination'
import { PaginationControlsInterface } from '@/Components/Layout/Pagination/PaginationTypes'


export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: "Strona Główna"
    },
  }
}


const TestControls: React.FC<PaginationControlsInterface> = ({pageNumber, maxPageNumber, onNext, onPrevious}) => {
  return (
    <div className={style.controls__container}>
      {pageNumber != 1 && (
        <button
          className={style.controls__button} 
          onClick={() => onPrevious()}
        >
          previousPage
        </button>
      )}
      {pageNumber}
      {pageNumber != maxPageNumber && (
        <button
          className={style.controls__button} 
          onClick={() => onNext()}
        >
          nextPage
        </button>
      )}
    </div>
  )
}


const Slide: React.FC<{image: string, title: string, animationState: Boolean}> = ({image, title, animationState}) => {
  return (
    <>
    <motion.div 
        initial={
        {x: 240*-1, opacity: 0}
      }
      animate={{opacity: 1, x: animationState ? 0 : -20, transition: {type: 'tween'}}}
      exit={
        {x: 240, opacity: 0, transition: {type: 'tween'}}
        }
    >
      <motion.div 
        className={style.test__diskContainer}
        animate={{x: animationState ? 0 : 40}}
      />
      <NextImage
        className={style.test__img}
        src={image}
        width='240'
        height='240'
      />
      
    </motion.div> 
    <AnimatePresence>
      {!animationState && (
        <motion.div 
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: 20, opacity: 0}}  
          className={style.test__title}
        >
          {title}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}


const Test = ({images}) => {
  const [ animationState, setAnimationState ] = useState(false)
  const containerRef = useRef()
  const withAnimation = (cb: () => void) => {
    setAnimationState(true)
    setTimeout(() => {
      cb()
    }, 400)
    setTimeout(() => {
      setAnimationState(false)
    }, 1000)
  }  

  const customControls = (pagintaionProps) => {
    return (
    <TestControls 
      {...pagintaionProps} 
      pageNumber={pagintaionProps.pageNumber+1} // ?!?
      onNext={() => {
        withAnimation(pagintaionProps.onNext)
      }}
      onPrevious={() => {
        withAnimation(pagintaionProps.onPrevious)
      }}
    />
   ) 
  }
  return (
    <motion.div
      ref={containerRef}
      className={style.Home__test_container}
    >
      <StatePagination
        className={style.Home__test}
        itemsPerPage={1}
        CustomControls={customControls}
      >
        {images.map(({image, title}) => (
          <Slide key={image} title={title} image={image} animationState={animationState}/>
        ))}
      </StatePagination>
    </motion.div>
  )
}


export default function Home() {
  const images = [
    {
      image: '/static/DefaultIcon.png', 
      title: "To jest testowy tytu numer 1",
    },
    {
      image: '/static/pob2.png', 
      title: "To jest testowy tytu numer 2",
    },
    {
      image: '/static/pobrane.jpg', 
      title: "To jest testowy tytu numer 3",
    }
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

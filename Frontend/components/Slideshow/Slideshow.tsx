import { useState, useCallback } from 'react'
import NextImage from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { StatePagination } from '@/Components/Layout/Pagination/Pagination'
import { PaginationControlsInterface } from '@/Components/Layout/Pagination/PaginationTypes'
import style from '@/Styles/Home/Home.module.scss'


const SlideshowControls: React.FC<PaginationControlsInterface> = ({pageNumber, maxPageNumber, onNext, onPrevious}) => {
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


const slideVariants = {
  initial: ({direction}) => 
    ({x: 240 * direction, opacity: 0}),
  visible: ({offset}) => 
    ({opacity: 1, x: offset, transition: {type: 'tween'}}),
  hidden: ({direction}) => 
    ({x: 240 * direction * -1, opacity: 0, transition: {type: 'tween'}}),
}


const Slide: React.FC<{direction: string, data: {image: string, title: string}, animationState: Boolean}> = ({direction, data, animationState}) => {
  const animationProps = {
    offset: animationState ? 0 : -20, 
    direction: direction == "left" ? -1 : 1
  }  
  return (
    <>
    <motion.div 
      variants={slideVariants}
      initial="initial"
      animate="visible"
      exit="hidden"
      custom={animationProps}
    >
      <motion.div 
        className={style.test__diskContainer}
        animate={{x: animationState ? 0 : 40}}
      />
      <NextImage
        className={style.test__img}
        src={data.image}
        width='240'
        height='240'
        priority
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
          {data.title}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}


const APProxy = (children) => (
  /*
  */
  <AnimatePresence exitBeforeEnter>
    {children}
  </AnimatePresence>
)


const useSlideAnimation = () => {
  /*
    Just some things I want to keep out of the main component
  */
  const [ animationState, setAnimationState ] = useState<boolean>(false)
  const [ slideDirection, setSlideDirection ] = useState<"left" | "right">("right")
  const slideWithAnimation = useCallback((cb: () => void) => {
    setAnimationState(true)
    setTimeout(() => {
      cb()
    }, 400)
    setTimeout(() => {
      setAnimationState(false)
    }, 1000)
  }, [])
  return { animationState, slideWithAnimation, slideDirection, setSlideDirection }
}


const Slideshow = ({images}) => {
  /*
    Component creates slideshow that uses StatePagination 
    to display one component at the time.
    not yet tsx
  */
  const { animationState, slideWithAnimation, slideDirection, setSlideDirection } = useSlideAnimation()
  const CustomControls = (pagintaionProps) => (
    <SlideshowControls 
      {...pagintaionProps} 
      pageNumber={pagintaionProps.pageNumber+1}
      onNext={() => {
        setSlideDirection("right")        
        slideWithAnimation(pagintaionProps.onNext)
      }}
      onPrevious={() => {
        setSlideDirection("left")
        slideWithAnimation(pagintaionProps.onPrevious)
      }}
    />
  )
  return (
    <motion.div
      className={style.Home__test_container}
    >
      <StatePagination
        className={style.Home__test}
        itemsPerPage={1}
        CustomControls={CustomControls}
        Proxy={(children) => APProxy(children)}
      >
        {images.map((obj) => (
          <Slide 
            key={obj.title+obj.index} 
            direction={slideDirection} 
            data={obj}
            animationState={animationState}
          />
        ))}
      </StatePagination>
    </motion.div>
  )
}


export default Slideshow

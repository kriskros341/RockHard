import ContentCutter from "./ContentCutterFeed"
import { ContentCutterInterface, ObserverControlsInterface } from './FeedTypes'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from "react"
import globalStyle from '@/Styles/Page.module.scss'

const ObserverControls: React.FC<ObserverControlsInterface> = ({expandRange, isFullyVisible, onFinishCallback}) => {
  const { ref, inView, entry } = useInView({delay: 50})
  useEffect(() => {
    inView && expandRange()
  }, [inView])
  return (
    <div className={globalStyle.test} ref={ref}>
      sadsad
    </div>
  )
}


export const AutoExpandingFeed: React.FC<ContentCutterInterface> = ({initiallyVisible, incrementBy, children}, props) => {
  const [ showx, setShowx ] = useState(initiallyVisible)
  const mockCallback = () => console.log("jd")
  console.log(showx)
  return (
    <ContentCutter 
      initiallyVisible={showx} 
      incrementBy={incrementBy}
      CustomControls={(cProps) => 
        <ObserverControls 
          {...cProps} 
          onFinishCallback={() => mockCallback()}
        />}
    >
      {children}
    </ContentCutter>
  )
}

export default AutoExpandingFeed
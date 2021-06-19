import React, { useState } from 'react'
import globalStyle from '@/Styles/Page.module.scss'
import { bindIsBetweenFunction, renderChildArrayIfIndex } from '../../someFunctions'
import { ContentCutterControlsInterface, ContentCutterInterface } from './FeedTypes'

const DefaultControls: React.FC<ContentCutterControlsInterface> = ({expandRange, isFullyVisible}) => {
  return (
  <div className={globalStyle.ContentCutter__ControlsContainer}>
    {!isFullyVisible &&
      <button 
        className={globalStyle.ContentCutter__Controls}
        onClick={() => expandRange()}
      >
        cccccccccc
      </button>
    }
  </div>
  )
}

const useContentCutter = (initiallyVisible: number = Infinity, incrementBy: number = Infinity) => {
  const [ lastShownIndex, setLastShownIndex ] = useState<number>(initiallyVisible)
  const isIndexWithinRange = bindIsBetweenFunction(0, lastShownIndex)
  const expandRange = () => setLastShownIndex(v => v + incrementBy)
  return {isIndexWithinRange, expandRange}
}

export const ContentCutter: React.FC<ContentCutterInterface> = ({children, initiallyVisible, className, incrementBy, CustomControls}) => {
  const {isIndexWithinRange, expandRange} = useContentCutter(initiallyVisible, incrementBy)
  const childrenCount = React.Children.count(children)
  return (
    <div className={`${globalStyle.ContentCutter__component} ${className}`}>
      {renderChildArrayIfIndex(children, isIndexWithinRange)}
      {CustomControls ? 
        <CustomControls
          expandRange={() => expandRange()} 
          isFullyVisible={isIndexWithinRange(childrenCount)}
        />
        :
        <DefaultControls 
          expandRange={() => expandRange()} 
          isFullyVisible={isIndexWithinRange(childrenCount)}
        />
      }
    </div>
  )
}

export default ContentCutter
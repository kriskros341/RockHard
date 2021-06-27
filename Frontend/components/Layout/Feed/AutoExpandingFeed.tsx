import ContentCutter from "./ContentCutterFeed"
import { AutomaticFeedInterface, ContentCutterInterface, ObserverControlsInterface } from './FeedTypes'
import { useInView } from 'react-intersection-observer'
import React, { useCallback, useEffect, useState } from "react"
import globalStyle from '@/Styles/Page.module.scss'
import { useSWRInfinite } from 'swr'

const ObserverControls: React.FC<ObserverControlsInterface> = ({expandRange, isFullyVisible, onFinishCallback}) => {
  const { ref, inView } = useInView({delay: 50})
  useEffect(() => {
    inView && onFinishCallback && onFinishCallback()
  }, [inView])
  return (
    <div className={globalStyle.test} ref={ref}>
      sadsad
    </div>
  )
}

const LoadingIndicator: React.FC<{isLoading: boolean}> = (isLoading) => {
  return <div>{isLoading ? "loading" : ""}</div>
}

type PathnamePositionModel = number
const searchPathnameForPattern = (pathname: string, pattern: string): PathnamePositionModel | null => {
  const re = new RegExp(`${pattern}`)
  let pathnamePattern = pathname.match(re)
  if(pathnamePattern) {
    return pathname.split("/").indexOf(pattern)
  } 
  return null
}

type QueryKeyModel = string
const searchQueryForPattern = (query: string, pattern: string): QueryKeyModel | null => {
  const getKeyFromSchemaQuery = (searchedSegment: string) => {
    const result = searchedSegment.slice(1, searchedSegment.indexOf("="))
    return result ? result : null
  }
  const re = new RegExp(`([&?][a-zA-Z_0-9]*=${pattern})`)
  const searchQueryForPattern = query.match(re)[0] //Two equal results for some reason
  return getKeyFromSchemaQuery(searchQueryForPattern)
}

type fetcherKeysModel = {
  quantity: string | number | null
  offset: string | number | null
}

const getUrlKeysFromSchema = (urlToParse: URL | string): fetcherKeysModel => {
  /* 
    If pattern exists in pathname it will be represented by it's position inside pathname
      eg. /news/get_all/:quantity: would be 3rd
    If pattern exists in query it will be represented as it's key.
      eg. q=:quantity: would be q
    Types of patterns [ pathname | query ] can be mixed
  */
  if(typeof urlToParse == 'string') {
    urlToParse = new URL(urlToParse)
  }
  const pathname = urlToParse.pathname
  const query = urlToParse.search
  return {
    quantity: searchPathnameForPattern(pathname, ':quantity:') ?? searchQueryForPattern(query, ':quantity:'),
    offset: searchPathnameForPattern(pathname, ':offset:') ?? searchQueryForPattern(query, ':offset:')
  }
}




const defaultSchemaKeys: fetcherKeysModel = {
  quantity: 'quantity',
  offset: 'offset'
}

interface IncrementalFetcherInterface {
  initiallyFetch?: number
  urlSchema?: string
  countPerFetch?: number
}


const fetcher = (url: string) => fetch(url).then(r => r.json())

const useIncrementalFetcher = (urlSchema, initiallyVisible, incrementBy, offset) => {
  const schemaKeys: fetcherKeysModel = urlSchema ? getUrlKeysFromSchema(urlSchema) : defaultSchemaKeys
  const getSwrKey = (previousPageData: any) => {
    const parseUrlSchema = (urlSchema: string, schemaKeys: fetcherKeysModel, schemaValues: fetcherKeysModel) => {
      let resultUrl: string = urlSchema
      for(let key in schemaKeys) {
        resultUrl = resultUrl.replace(`:${key}:`, schemaValues[key])
      }
      return resultUrl
    }
    const prepareUrl = (urlSchema: string, schemaKeys: fetcherKeysModel) => {
      if(!schemaKeys.quantity || !schemaKeys.offset) throw('invalid schema provided')
      const fetchValues = offset == 0 ? {quantity: initiallyVisible, offset: 0} : {quantity: incrementBy, offset: offset}
      return parseUrlSchema(urlSchema, schemaKeys, fetchValues)
    }
    if(previousPageData && !previousPageData.length) return null
    console.log(prepareUrl(urlSchema, schemaKeys))
    return prepareUrl(urlSchema, schemaKeys)
  }

  const {data, error} = useSWRInfinite(getSwrKey, fetcher)
  console.log(data)
  return {data, error, }

}



export const AutoExpandingFeed: React.FC<AutomaticFeedInterface> = ({initiallyVisible, incrementBy, ChildSchema, urlSchema}) => {
  const [ offset, setOffset ] = useState(0)
  const [ currentData, setCurrentData ] = useState([])
  const {data, error} = useIncrementalFetcher(urlSchema, initiallyVisible, incrementBy, offset)
  const increment = () => {
    data[0].length && setOffset(currentOffset => (
      currentOffset == 0 ? initiallyVisible : currentOffset + incrementBy
      ))
  }
  useEffect(() => {
    data && setCurrentData(v => [...v, ...data[0].data[0]])
      
  }, [data, setCurrentData])
  console.log(currentData)
  return (
    <ContentCutter 
      CustomControls={(controlsProps) => (
        <ObserverControls 
          {...controlsProps} 
          onFinishCallback={data ? () => increment() : null}
          expandRange={() => increment()}
        />
      )}
    >
      {currentData.map(item => (
        <ChildSchema {...item} key={`AutomaticFeedChild__${item.id}`} />
      ))}
      {data == undefined && (
        <LoadingIndicator isLoading={!data} />
      )}
    </ContentCutter>
  )
}

export default AutoExpandingFeed

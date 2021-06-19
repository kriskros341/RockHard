import ContentCutter from "./ContentCutterFeed"
import { AutomaticFeedInterface, ContentCutterInterface, ObserverControlsInterface } from './FeedTypes'
import { useInView } from 'react-intersection-observer'
import React, { useEffect, useState } from "react"
import globalStyle from '@/Styles/Page.module.scss'
import { useSWRInfinite } from 'swr'

const ObserverControls: React.FC<ObserverControlsInterface> = ({expandRange, isFullyVisible, onFinishCallback}) => {
  const { ref, inView, entry } = useInView({delay: 50})
  useEffect(() => {
    inView && onFinishCallback && onFinishCallback()
  }, [inView])
  return (
    <div className={globalStyle.test} ref={ref}>
      sadsad
    </div>
  )
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
  const getKeyFromSchemaQuery = (searchedSegment: string) =>
    searchedSegment.slice(1, searchedSegment.indexOf("="))
  const re = new RegExp(`([&?][a-zA-Z_0-9]*=${pattern})`)
  const searchQueryForPattern = query.match(re)[0] //Two equal results for some reason
  if(searchQueryForPattern) return getKeyFromSchemaQuery(searchQueryForPattern)
  return null
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
    console.log(urlToParse)
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

const parseUrlSchema = (urlSchema: string, schemaKeys: fetcherKeysModel, schemaValues: fetcherKeysModel) => {
  let resultUrl: string = urlSchema
  
  for(let key in schemaKeys) {
    resultUrl = resultUrl.replace(`:${key}:`, schemaValues[key])
  }
  return resultUrl
}

const fetcher = url => fetch(url).then(r => r.json())

const useIncrementalFetcher =  (urlSchema, initiallyFetch, countPerFetch) => {
  /*
    urlSchema should specify endpoint nad :quantity: and :offset:
  */
  const q = initiallyFetch
  const o = countPerFetch
  const prepareUrl = (urlSchema: string, schemaKeys: fetcherKeysModel) => {
    if(!schemaKeys.quantity || !schemaKeys.offset) throw('invalid schema provided')
    return parseUrlSchema(urlSchema, schemaKeys, {quantity: q, offset: o})
  }
  const url = new URL(urlSchema)
  const schemaKeys: fetcherKeysModel = urlSchema ? getUrlKeysFromSchema(url) : defaultSchemaKeys
  
  const getSwrKey = (previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null
    const preparedUrl = prepareUrl(urlSchema, schemaKeys)
    return preparedUrl
  }
  return useSWRInfinite(getSwrKey, fetcher)
}

export const AutoExpandingFeed: React.FC<AutomaticFeedInterface> = ({initiallyVisible, incrementBy, children, ChildSchema, urlSchema}, props) => {
  const [ visible, setVisible ] = useState(initiallyVisible)
  const mockCallback = () => {
    setVisible(v => v + incrementBy)
  }
  const {data, error} = useIncrementalFetcher(urlSchema, visible, visible + incrementBy)
  return (
    <ContentCutter 
      CustomControls={(controlsProps) => 
      <ObserverControls 
        {...controlsProps} 
        onFinishCallback={data ? () => mockCallback() : null}
        expandRange={() => {}}
      />}
    >
      {!error && data && data[0].map((item, index) => <ChildSchema key={`AutomaticFeedChild__${index}`} {...item} />)}
    </ContentCutter>
  )
}

export default AutoExpandingFeed
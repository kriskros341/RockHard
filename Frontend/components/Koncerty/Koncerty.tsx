import style from '../../styles/Koncerty/Koncerty.module.scss'
import pageStyle from '../../styles/Page.module.scss'
import { useRouter, withRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { CallendarSVG, MapPointSVG } from '../misc'
import 'mapbox-gl/dist/mapbox-gl.css'
import TheMap from './Map'
import globalStyle from '../../styles/app.module.scss'
import Link from 'next/link'


const mapVariants = {
  hidden: {y: "-30vh", opacity: 0.5, zIndex: -1},
  show: {y: 0, opacity: 1, transition: {type: "Inertia"}}
}
export const KoncertyMap = ({performanceData, shouldRender}) =>
  <AnimatePresence>
    {shouldRender && 
      <motion.div 
        variants={mapVariants} 
        className={style.Map__component} 
        initial="hidden" 
        animate="show"
      >
        <TheMap performanceData={performanceData} />
      </motion.div>
    }
  </AnimatePresence>

export const Koncert: React.FC<performanceCardInterface> = ({id, bandName, tourName, place, performanceDate }) => {
  const date = new Date(performanceDate).toDateString()
  const articleClasses = `
    ${style.Koncert__component} 
    ${globalStyle.borderAndShadow}
  `
  return (
    <motion.article className={articleClasses}>
      <Link href={'koncerty/'+id.toString()}>
        <div className={style.Koncert__container}>
          <div className={style.Koncert__zespol}>
            {bandName}
          </div>
          <div className={style.Koncert__trasa}>
            {tourName}
          </div>
          <div className={style.Koncert__meta}>
            <span className={style.decoration}>
              <CallendarSVG />
            </span>
            {date}
          </div>
          <div className={style.Koncert__meta}>
            <span className={style.decoration}>
              <MapPointSVG />
            </span>
            {place.placeName ? place.placeName : "TBA"}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export type placeModel = {
  lat: number
  lon: number
  placeName: string,
}


export type performanceCardModel = {
  id: number,
  bandName: string,
  tourName?: string,
  image?: any
  place: placeModel
  performanceDate: string
}

export interface performanceCardInterface extends performanceCardModel {
}

export type performanceMarkerModel = {
  id: number
  bandName: string
  image?: any
  place: placeModel 
}

export type performanceModel = performanceCardModel & performanceMarkerModel & {
  dateCreated: string,
  dateEdited: string,
}



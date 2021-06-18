import style from '../../styles/Koncerty/Koncerty.module.scss'
import pageStyle from '../../styles/Page.module.scss'
import { useRouter, withRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { CallendarSVG, MapPointSVG } from '../misc'
import 'mapbox-gl/dist/mapbox-gl.css'
import TheMap from './Map'
import globalStyle from '../../styles/app.module.scss'


const mapVariants = {
  hidden: {y: "-30vh", opacity: 0.5, zIndex: -1},
  show: {y: 0, opacity: 1, transition: {type: "Inertia"}}
}
export const KoncertyMap = ({koncertyData, shouldRender}) =>
  <AnimatePresence>
    {shouldRender && 
      <motion.div variants={mapVariants} className={style.Map__component} initial="hidden" animate="show">
        <TheMap koncertyData={koncertyData} />
      </motion.div>
    }
  </AnimatePresence>


export const Koncert: React.FC<{zespol: string, trasa: string, miejsce: string, data: string}> = ({zespol, trasa, miejsce, data}) => {
  return (
    <motion.article layout className={`${style.Koncert__component} ${globalStyle.borderAndShadow}`}>
      <div className={style.Koncert__container}>
        <div className={style.Koncert__zespol}>{zespol}</div>
        <div className={style.Koncert__trasa}>{trasa}</div>
        <div className={style.Koncert__meta}>
          <span className={style.decoration}>
            <CallendarSVG />
          </span>
          {miejsce}
        </div>
        <div className={style.Koncert__meta}>
          <span className={style.decoration}>
            <MapPointSVG />
          </span>
          {data}
        </div>
      </div>
    </motion.article>
  )
}

export type koncertModel = {
  zespol: string,
  trasa: string,
  miejsce: string,
  data: string,
  image?: string
  geodata: {
    latitude: number
    longitude: number
  }
}



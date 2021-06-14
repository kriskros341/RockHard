import style from '../../styles/Koncerty/Koncerty.module.scss'
import pageStyle from '../../styles/Page.module.scss'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { CallendarSVG, MapPointSVG } from '../misc'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map from './Map'

const Koncert: React.FC<{zespol: string, trasa: string, miejsce: string, data: string}> = ({zespol, trasa, miejsce, data}) => {
  return (
    <motion.article layout className={style.Koncert__component}>
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

const createFakeData = (i: number): koncertModel => {
  return {
    zespol: `Nazwa Zespołu Nazwa Zespołu_${i} `,
    trasa: `Nazwa Trasy Koncertowej_${i} `,
    miejsce: `Miejsce Koncertu Miejsce_${i} `,
    data: `20.04.2021_${i} `,
    image: Math.random() > 0.5 && '/static/pob2.png',
    geodata: {
      latitude: 51+Math.random()*4,
      longitude: 17+Math.random()*6
    }
  }
}

const createFakeDataArray = () => {
  let kon: koncertModel[] = []
  for(var i = 0; i < 10; i++) {
    kon.push(createFakeData(i))
  }
  return kon
}

const mapVariants = {
  hidden: {y: "-30vh", opacity: 0.5, zIndex: -1},
  show: {y: 0, opacity: 1, transition: {type: "Inertia"}}
}

export default function KoncertyComponent() {
  const [ koncerty, setKoncerty ] = useState<koncertModel[]>([])
  useEffect(() => {
    setKoncerty(createFakeDataArray())
  }, [])
  const router = useRouter()
  return (
    <div className={pageStyle.Page__component}>
      <motion.div layout className={pageStyle.Page__container}>
        <AnimatePresence>
          {router.query['showMap'] && 
            <motion.div variants={mapVariants} className={style.Map__component} initial="hidden" animate="show">
              <Map punkty={koncerty} />
            </motion.div>
          }
        </AnimatePresence>
        {koncerty.map((item: koncertModel, index) => <Koncert key={`Item${index}`} {...item} />)}

      </motion.div>
    </div>
  )
}
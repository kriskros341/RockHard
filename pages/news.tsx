import { useEffect, useState } from 'react'
import style from '../styles/Newsy/Newsy.module.scss'
import pageStyle from '../styles/Page.module.scss'
import Image from 'next/image'
import { CallendarSVG } from '../components/misc'

export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: "Co Nowego"
    },
  }
}

type newsDataModel = {
  title: string
  tags: string[]
  image?: string
  date: string
}

const createFakeData = (i: number): newsDataModel => {
  return {
    title: 'Album SPiRiTS In The Forest jest z wielu względów wyjątkowy w dorobku Depeche Mode',
    tags: ['Muzyka Rockowa', 'Albumy', 'Depeche Mode'],
    image: Math.random() > 0.5 && '/static/pob2.png',
    date: "12.05.2021"
  }
}

const createFakeDataArray = () => {
  let kon: newsDataModel[] = []
  for(var i = 0; i < 10; i++) {
    kon.push(createFakeData(i))
  }
  return kon
}

const Newsy = () => {
  const [ newsData, setNewsData ] = useState<newsDataModel[]>([])
  useEffect(() => {
    setNewsData(createFakeDataArray())
  }, [])
  return (
    <div className={pageStyle.Page__component}>
      <div className={pageStyle.Page__container}>
        {
          newsData.map((item, index) =>
            <div className={style.News__component}>
              <div className={style.News__container}>
                <div className={style.News__Image}>
                  <Image 
                    src={item.image ? item.image : '/static/EyeIcon.png'}
                    width={400}
                    height={400}
                  />
                  <div className={style.News__title}>
                    {item.title}
                  </div>
                </div>
                <div className={style.News__meta}>
                  {item.tags.join(", ")}
                  <br />
                  <span className={style.News__decoration}>
                    <CallendarSVG />
                  </span>
                  {item.date}
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Newsy
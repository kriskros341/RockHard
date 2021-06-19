import { useEffect, useState } from 'react'
import { CallendarSVG } from '../../components/misc'
import Image from 'next/image'
import Link from 'next/link'
import style from '../../styles/Newsy/Newsy.module.scss'
import globalStyle from '../../styles/app.module.scss'
import { staticPropsModel } from '../../components/pagePropsType'
import PageLayout, { PageTitle } from '../../components/Layout/PageLayout'
import AutoExpandingFeed from '../../components/Layout/Feed/AutoExpandingFeed'

export type newsDataModel = {
  title: string
  tags: string[]
  image?: string
  date: Date
}

export async function getStaticProps(context): Promise<staticPropsModel<newsDataModel[]>> {
  const data: newsDataModel[] = await fetch('http://localhost:8000/news/get_all').then(data => data.json())
  return {
    props: {
      pageTitle: {
        title: `Co Nowego`,
        type: 'page'
      },
      fetchData: data
    },
  }
}



export const createFakeData = (i: number): newsDataModel => {
  return {
    title: 'Album SPiRiTS In The Forest jest z wielu względów wyjątkowy w dorobku Depeche Mode',
    tags: ['Muzyka Rockowa', 'Albumy', 'Depeche Mode'],
    image: '/static/pob2.png',
    date: new Date()
  }
}

export const createFakeDataArray = (count: number) => {
  let kon: newsDataModel[] = []
  for(var i = 0; i < count; i++) {
    kon.push(createFakeData(i))
  }
  return kon
}

interface NewsInterface extends newsDataModel {
  news_id: number
}

const News: React.FC<NewsInterface> = ({title, tags, image, date, news_id}) => {
  return (
    <Link href={`/news/${news_id}`}>
      <article className={`${style.News__component} ${globalStyle.borderAndShadow}`}>
        <div className={style.News__container}>
          <div className={style.News__Image}>
            <Image 
              src={image ? image : '/static/pob2.png'}
              width={400}
              height={400}
              />
            <div className={style.News__title}>
              {title}_{news_id}
            </div>
          </div>
          <div className={style.News__meta}>
            {tags.join(", ")}
            <br />
            <span className={style.News__decoration}>
              <CallendarSVG />
            </span>
            {date}
          </div>
        </div>
      </article>
    </Link>
  )
}


const Newsy = ({fetchData}) => {
  return (
    <PageLayout titleComponent={<PageTitle>Newsy</PageTitle>}>
      <AutoExpandingFeed 
        initiallyVisible={9} 
        incrementBy={8}
        urlSchema={"http://localhost:8000/news/get_all?offset=:offset:&quantity=:quantity:&"}
        ChildSchema={(item:any) => <News news_id={item.id} {...item}/>}
      />
    </PageLayout>
  )
}

export default Newsy
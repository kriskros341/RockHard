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
  id: number
  title: string
  tags: {
    id: number
    tag_name: string
  }[]
  image?: string
  date: Date
}

export async function getStaticProps(context): Promise<staticPropsModel<newsDataModel[]>> {
  return {
    props: {
      pageTitle: {
        title: `Co Nowego`,
        type: 'page'
      },
    },
  }
}



interface NewsInterface extends newsDataModel {
  news_id: number
}


const News: React.FC<NewsInterface> = ({title, tags, image, date, news_id}) => {
  console.log(tags) 
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
            {tags.map(tag => 
              tag.tag_name + ' '
            )}
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
        urlSchema={"http://rockhard.ddns.net:3002/api/news?offset=:offset:&quantity=:quantity:&"}
        ChildSchema={(item:any) => <News news_id={item.id} {...item}/>}
      />
    </PageLayout>
  )
}
export default Newsy

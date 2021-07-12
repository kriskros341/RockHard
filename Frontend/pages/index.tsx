import NextImage from 'next/image'
import Slideshow from '@/Components/Slideshow/Slideshow'
import style from '../styles/Home/Home.module.scss'


type tagModel = {
  tag_name: string
  id: number
}


type serverDataModel = {
  tags: tagModel[],
  date: string,
  text: string,
  title: string,
  id: number
}


export async function getStaticProps(context) {
  const n: serverDataModel[] = await fetch('http://rockhard.ddns.net:3002/api/news').then((r) => r.json())
  const b: serverDataModel[] = await fetch('http://rockhard.ddns.net:3002/api/blog').then((r) => r.json())
  const fetchData = [...b, ...n].sort(
    (o1, o2) => 
      new Date(o1.date).valueOf() - new Date(o2.date).valueOf()
    )
    .reverse()
    .slice(0, 10)
  return {
    props: {
      pageTitle: "Strona Główna",
      fetchData: fetchData,
    },
  }
}


export default function Home({fetchData}) {
  console.log(fetchData)
  const images = [
    {
      image: '/static/DefaultIcon.png', 
      title: "To jest testowy tytul numer 1",
    },
    {
      image: '/static/pob2.png', 
      title: "To jest testowy tytul numer 2",
    },
    {
      image: '/static/RockHard.png', 
      title: "To jest testowy tytul numer 3",
    }
  ]
  return (
    <div className={style.Home__component} >
      <header className={style.Home__header}>
        <NextImage
          src={'/static/rockhard.png'}
          width={400}
          height={100}
        />
      </header>
      <div className={style.Home__content}>
        <Slideshow images={images}/>
      </div>
    </div>
  )
}


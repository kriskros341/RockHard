import globalStyle from '../../styles/app.module.scss'
import { Koncert, koncertModel, KoncertyMap } from '../../components/Koncerty/Koncerty'
import { staticPropsModel } from '../../components/pagePropsType'
import { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import PageLayout, { PageTitle } from '../../components/Layout/PageLayout'

export async function getStaticProps(context): Promise<staticPropsModel> {
  return {
    props: {
      pageTitle: {
        title: "Koncerty",
        type: 'page'
      },
      additionalButtons: [
        {
          to: {
            pathname: "/koncerty",
            query: {showMap: 'true'},
          },
          text: "Co Nowego",
          icon: '/static/MapIcon.png',
          toggle: true
        },
      ]
    }
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


const Koncerty = ({router}) => {
  const [ koncerty, setKoncerty ] = useState<koncertModel[]>([])
  useEffect(() => {
    setKoncerty(createFakeDataArray())
  }, [])
  return (
    <PageLayout titleComponent={<PageTitle>Koncerty</PageTitle>}>
      <>
        <KoncertyMap shouldRender={router.query['showMap'] == 'true'} koncertyData={koncerty}/>
        {koncerty.map((item: koncertModel, index) => 
          <Koncert key={`Item${index}`} {...item} />
        )}
      </>
    </PageLayout>
  )
}

export default withRouter(Koncerty)
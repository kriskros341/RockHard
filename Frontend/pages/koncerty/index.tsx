import globalStyle from '../../styles/app.module.scss'
import { Koncert, performanceModel, KoncertyMap } from '../../components/Koncerty/Koncerty'
import { staticPropsModel } from '../../components/pagePropsType'
import { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import PageLayout, { PageTitle } from '../../components/Layout/PageLayout'
import Image from 'next/image'

const baseUrl = 'http://rockhard.ddns.net:3002/api/koncerty'

export async function getStaticProps(context): Promise<staticPropsModel> {
  const fetchData: performanceModel = 
    await fetch(baseUrl)
    .then(r => r.json())
  return {
    props: {
      pageTitle: {
        title: "Koncerty",
        pageType: 'page'
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
      ],
      fetchData: fetchData
    }
  }
}


const Koncerty = ({router, fetchData}) => {
  const isMapActive = router.query['showMap'] == 'true'
  return (
    <PageLayout TitleComponent={<PageTitle>Koncerty</PageTitle>}>
      <>
        <KoncertyMap 
          shouldRender={isMapActive} 
          performanceData={fetchData}
        />
        {fetchData.map((performance: performanceModel, index) => 
          <Koncert 
            key={`Item${index}`} 
            {...performance}
          />
        )}
      </>
    </PageLayout>
  )
}

/*
<Image
  src='/static/loading.gif'
  width='300'
  height='60'
/>
*/

export default withRouter(Koncerty)

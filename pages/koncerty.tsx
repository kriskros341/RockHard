
import KoncertyComponent from '../components/Koncerty/Koncerty'
export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: "Koncerty",
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

const Koncerty = () => {
  return <KoncertyComponent />
}

export default Koncerty
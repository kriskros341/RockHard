import { useState, useRef, useLayoutEffect } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import style from '../../styles/Koncerty/Koncerty.module.scss'
import Image from 'next/image'
import useSupercluster from 'use-supercluster'
import {koncertModel} from './Koncerty'
import { viewStateModel, GeoJSONModel } from './mapTypes'
/*
GeoJSON Schema:
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          19.9951171875,
          52.429222277955134
        ]
      }
    }
  ]
}
*/


const defaultImage = '/static/EyeIcon.png'

const MapPoint = ({cluster, supercluster, centerViewportOnMe}) => {
  const { cluster: isCluster, point_count: pointCount } = cluster.properties
  const [ longtitude, latitude ] = cluster.geometry.coordinates
  if(isCluster) {
    return (
      <ClusterMarker 
        key={`cluster-${cluster.id}`}
        coordinates={[ longtitude, latitude ]} 
        count={pointCount}
        moveViewToPoint={() => centerViewportOnMe(longtitude, latitude)}
        leafs={supercluster.getLeaves(cluster.id, 2)}
      />
    )
  } else {
    return (
      <MapMarker
        key={`marker-${cluster.id}`}
        coordinates={[ longtitude, latitude ]}
        image={cluster.properties.image}
        fn={() => console.log(cluster.properties.image)}
      />
    )
  }
}

const MapMarker = ({coordinates, image, fn}) => {
  const [ lon, lat ] = coordinates
  return (
    <Marker
      longitude={lon}
      latitude={lat}
      offsetLeft={-20} 
      offsetTop={-10}
    >
      <div className={style.Map__marker} onClick={() => fn()} >
        <Image height={44} width={44} src={image ? image : defaultImage} />
      </div>
    </Marker>
  )
}

const ClusterMarker = ({moveViewToPoint, coordinates, count, leafs}) => {
  const [ longitude, latitude ] = coordinates
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div onClick={() => moveViewToPoint()} className={style.Map__cluster}>
        {leafs.map(item => 
          <div className={style.cluster__inner}>
            <Image
              src={item.properties.image ? item.properties.image : defaultImage}
              width={44}
              height={44}
              quality="low"
            />
          </div>
        )}
        {(count - 2) > 0 && 
          <div className={style.cluster__inner}>
            +{count - 2}
          </div>
        }
      </div>
    </Marker>
  )
}

const fetchError: boolean = false
const maxZoom: number = 20

const getMapBoundsFromRef = (mapRef) => {
  return mapRef.current ? mapRef.current
    .getMap()
    .getBounds()
    .toArray()
    .flat() : null
}

const parseData = (koncertyData) => {
  /* returns geoJSON points with image and id from passed data */
  console.log(koncertyData)
  const markers = koncertyData || []
  const parsedMarkers = markers.map((item: koncertModel, index: number): GeoJSONModel => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: item.id,
      image: item.image || defaultImage,
      category: "koncert",
    },
    geometry: {
      type: "Point",
      coordinates: [item.place.lon, item.place.lat]
    }
  })) 
  return parsedMarkers
}

const resizeMapWithWindow = (changeViewport: (changes) => void) => {
  useLayoutEffect(() => {
    adjustMapWidth()
    window.onresize = () => adjustMapWidth()
    return () => window.onresize = null
  }, [])
  const adjustMapWidth = (): void => {
    if(process.title == "browser")  {
      const maxMapWidth: number = 632
      const mapWidth = Math.min(maxMapWidth, window.innerWidth - 32) 
      changeViewport({width: mapWidth})
    }
  }
}

const Map: React.FC<{koncertyData: koncertModel[]}> = ({koncertyData}) => {

  const [viewport, setViewport] = useState<viewStateModel>({
    width: 400,
    height: 400,
    latitude: 52.274930443294224,
    longitude: 19.02275222832698,
    zoom: 4
  });
  const mapRef = useRef(null)
  const changeViewport = (changes) => setViewport({...viewport, ...changes})
  const mapData = parseData(koncertyData)
  const mapBounds = getMapBoundsFromRef(mapRef) || null
  const { clusters, supercluster } = useSupercluster({
    points: mapData, 
    bounds: mapBounds,
    zoom: viewport.zoom,
    options: { radius: 150, maxZoom: maxZoom }
  })
  const moveViewToPoint = (clusterId: number, longitude: number, latitude: number ): void => {
    /* Center map on given point */
    
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(clusterId), 20
      );
      changeViewport({
        latitude,
        longitude,
        zoom: expansionZoom,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: "auto"
      })
    }
  resizeMapWithWindow(changeViewport)
  


  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.mapboxToken}
      maxZoom={maxZoom}
      ref={mapRef}
    >
      {clusters.map((cluster: GeoJSONModel, index: number) => {
        console.log(cluster)
        return (
          <MapPoint 
            key={`cluster_${index}`}
            supercluster={supercluster}  
            cluster={cluster} 
            centerViewportOnMe={
              (lon: number, lat: number): void => moveViewToPoint(cluster.id, lon, lat)} 
          />
        )
      })}
    </ReactMapGL>
  );
}

export default Map

/*
supercluster.getLeaves(cluster.id)
https://www.leighhalliday.com/mapbox-clustering
*/

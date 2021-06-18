import { FlyToInterpolator } from 'react-map-gl'

export type viewStateModel = {
  width: number,
  height: number,
  latitude: number,
  longitude: number,
  zoom: number,
  transitionInterpolator?: FlyToInterpolator,
  transitionDuration?: any
}

export type GeoJSONModel = {
  type: string
  id?: number
  properties: (MarkerProportiesModel | ClusterProportiesModel) & {cluster: boolean}
  geometry: {
    type: string
    coordinates: number[]
  }
}

export type MarkerProportiesModel = {
  id: number
  image?: string
  category: string
}

export type ClusterProportiesModel = {
  cluster_id: number, 
  point_count: number, 
  point_count_abbreviated: number
}

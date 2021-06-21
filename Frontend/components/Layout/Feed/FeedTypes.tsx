export interface ContentCutterControlsInterface {
  expandRange: () => void
  isFullyVisible?: boolean
}

export interface ContentCutterInterface<CustomControlsInterface = {}> {
  initiallyVisible?: number 
  className?: string
  incrementBy?: number
  CustomControls?: React.FC<CustomControlsInterface & ContentCutterControlsInterface>
} 

export interface CustomLoadingInterface {
  isLoading: boolean
}

export interface AutomaticFeedInterface<ChildInterface = {}, C = {}, L = {}> {
  urlSchema: string
  initiallyVisible?: number
  className?: string
  incrementBy?: number
  CustomControls?: React.FC<ContentCutterControlsInterface & C>
  CustomLoading?: React.FC<CustomLoadingInterface & L>
  ChildSchema: React.FC<ChildInterface>
} 

export interface ObserverControlsInterface extends ContentCutterControlsInterface {
  onFinishCallback: () => void
}
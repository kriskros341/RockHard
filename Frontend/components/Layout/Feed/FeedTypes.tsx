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

export interface AutomaticFeedInterface<CustomControlsInterface = {}, T = {}> {
  urlSchema: string
  initiallyVisible?: number
  className?: string
  incrementBy?: number
  CustomControls?: React.FC<CustomControlsInterface & ContentCutterControlsInterface>
  ChildSchema: React.FC<T>
} 

export interface ObserverControlsInterface extends ContentCutterControlsInterface {
  onFinishCallback: () => void
}
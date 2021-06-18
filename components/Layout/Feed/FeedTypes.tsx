export interface ContentCutterControlsInterface {
  expandRange: () => void
  isFullyVisible?: boolean
}

export interface ContentCutterInterface<CustomControlsInterface = {}> {
  initiallyVisible: number 
  className?: string
  incrementBy?: number
  CustomControls?: React.FC<CustomControlsInterface & ContentCutterControlsInterface>
} 

export interface ObserverControlsInterface extends ContentCutterControlsInterface {
  onFinishCallback: () => void
}
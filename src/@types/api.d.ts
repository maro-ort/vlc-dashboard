type VlcState = 'stopped' | 'paused' | 'playing' | 'off' | 'unauthorized'

type VlcControls = {
  volume: number
  fullscreen: boolean
  loop: boolean
  random: boolean
  repeat: boolean
}

type VlcProgress = {
  time: number
  length: number
  position: number
}

type VlcStatus = {
  state: VlcState
  controls?: VlcControls
  progress?: VlcProgress
}
type VlcState = 'stopped' | 'paused' | 'playing' | 'off' | 'unauthorized'

type VlcCommand = 'pl_play'
| 'pl_pause'
| 'pl_stop'
| 'pl_next'
| 'pl_previous'
| 'pl_empty'
| 'pl_random'
| 'pl_loop'
| 'pl_repeat'
| 'fullscreen'
| 'pl_delete'

type VlcPlaylistItem = {
  id: string
  duration: number
  name: string
  uri: string
  current?: 'current'
}

type VlcPlaylist = VlcPlaylistItem[]

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

type VlcSendCommand = {
  command: VlcCommand
  data?: JsonType
} | {
  command: 'seek',
  data: { val: number | `+${number}` | `-${number}` | `${number}%` }
} | {
  command: 'volume',
  data: { val: number | `+${number}` | `-${number}` | `${number}%` }
}
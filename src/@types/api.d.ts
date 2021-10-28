type VlcState = 'stopped' | 'paused' | 'playing' | 'off' | 'unauthorized'

type VlcCommand = 'pl_pause'
| 'pl_stop'
| 'pl_next'
| 'pl_previous'
| 'pl_empty'
| 'pl_random'
| 'pl_loop'
| 'pl_repeat'
| 'fullscreen'

type VlcItem = {
  name: string
  uri: string
  type: 'dir' | 'file'
}

type VlcFolder = {
  folders: VlcItem[]
  files: VlcItem[]
}

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
  command: 'pl_delete',
  data: { id: string }
} | {
  command: 'pl_play',
  data?: { id: string }
} | {
  command: 'seek',
  data: { val: number | `+${number}` | `-${number}` | `${number}%` }
} | {
  command: 'volume',
  data: { val: number | `+${number}` | `-${number}` | `${number}%` }
}
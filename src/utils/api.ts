import { env } from './env'

const getPlaylist = () => {
  const endpoint = `${env('ULL_API')}/playlist`
  return fetch(endpoint).then(r => r.json())
}

const getStatus = () => {
  const endpoint = `${env('ULL_API')}`
  return fetch(endpoint, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(r => r.json())
}

const sendCommand = ({ command, data = {} }: VlcSendCommand): Promise<VlcStatus> => {
  const endpoint = `${env('ULL_API')}/cmd`

  return fetch(endpoint.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, data })
  })
  .then(r => r.json())
}

export {
  getPlaylist,
  getStatus,
  sendCommand
}
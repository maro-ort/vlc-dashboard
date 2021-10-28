import { env } from './env'

const addToPlaylist = (uris: string[]): Promise<any> => {
  const endpoint = `${env('ULL_API')}/add`
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uris })
  })
  .then(r => r.json())
}

const getFolder = ({ dir }: { dir: string }): Promise<VlcFolder> => {
  const endpoint = `${env('ULL_API')}/browse`
  return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dir })
    })
    .then(r => r.json())
}

const getPlaylist = (): Promise<VlcPlaylist> => {
  const endpoint = `${env('ULL_API')}/playlist`
  return fetch(endpoint)
    .then(r => r.json())
    .catch(() => [])
}

const getStatus = (): Promise<VlcStatus> => {
  const endpoint = `${env('ULL_API')}`
  return fetch(endpoint, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(r => r.json())
  // .catch(() => ({ state: 'off' }))
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
  addToPlaylist,
  getFolder,
  getPlaylist,
  getStatus,
  sendCommand
}
import { env } from './env'

const getStatus = () => {

  return fetch(env('ULL_API'), {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(r => r.json())
}

export {
  getStatus
}
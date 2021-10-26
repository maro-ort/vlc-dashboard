import { env } from './env'



const getStatus = () => {

  const url = `http://${env('VLC_HOST')}/requests/status.xml`
  console.log({ url });


  return fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Basic ${env('VLC_AUTH')}`
    }
  })
  .then(r => r.text())
  .then(r => {
    console.log({ r })
  })
}

export {
  getStatus
}
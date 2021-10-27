import React, { FC, useContext } from 'react'

import VlcContext from '../VlcContext'

const Status: FC = () => {

  const { status } = useContext(VlcContext) || {}

  return (
    <section id="status">
      {['off', 'unauthorized'].includes(status.state)
        ? (<h1>Dead</h1>)
        : (<h2>{status.state}</h2>)
      }
    </section>
  )
}

export default Status
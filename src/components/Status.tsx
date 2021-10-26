import React, { FC, useEffect } from 'react'

import { getStatus } from '../utils/api'

const Status: FC = () => {

  useEffect(() => {
    getStatus()
  }, [])


  return (
    <section id="status">
      ass
    </section>
  )
}

export default Status
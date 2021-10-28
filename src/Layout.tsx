import React, { FC, useContext } from 'react'

import VlcContext from './context/VlcContext'

import Browser from './sections/Browser'
import Controls from './sections/Controls'
import Playlist from './sections/Playlist'
import Progress from './sections/Progress'
import Status from './sections/Status'

const Layout: FC = () => {
  const { status } = useContext(VlcContext) || {}

  return (
    <div id="app-wrapper">
      <Status />
      {status && status.state !== 'off' && <Controls status={status} />}
      {status && status.progress && <Progress state={status.state} progress={status.progress} />}
      <Playlist />
      <Browser />
    </div>
  )
}

export default Layout
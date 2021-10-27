import React, { FC, useContext } from 'react'

import VlcContext from './context/VlcContext'

import Browser from './components/Browser'
import Controls from './components/Controls'
import Playlist from './components/Playlist'
import Progress from './components/Progress'
import Status from './components/Status'

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
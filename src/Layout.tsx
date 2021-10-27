import React, { FC, useContext, useEffect } from 'react'

import VlcContext from './VlcContext'

import Browser from './components/Browser'
import Controls from './components/Controls'
import Playlist from './components/Playlist'
import Status from './components/Status'

const Layout: FC = () => {
  const { syncStatus } = useContext(VlcContext) || {}

  // Crons
  useEffect(() => {
    syncStatus()
    const intervals = [
      setInterval(syncStatus, 3000),
    ]

    return () => {
      intervals.forEach(clearInterval)
    }
  }, [ syncStatus ])


  return (
    <div id="app-wrapper">
      <Status />
      <Controls />
      <Playlist />
      <Browser />
    </div>
  )
}

export default Layout
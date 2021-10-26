import React, { FC } from 'react'

import Browser from './components/Browser'
import Controls from './components/Controls'
import Playlist from './components/Playlist'
import Status from './components/Status'

const App: FC = () => {
  return (
    <div id="app-wrapper">
      <Status />
      <Controls />
      <Playlist />
      <Browser />

    </div>
  )
}

export default App

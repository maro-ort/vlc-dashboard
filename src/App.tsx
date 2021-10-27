import React, { FC } from 'react'
import Layout from './Layout'

import { VlcProvider } from './VlcContext'

const App: FC = () => {
  return (
    <VlcProvider>
      <Layout />
    </VlcProvider>
  )
}

export default App

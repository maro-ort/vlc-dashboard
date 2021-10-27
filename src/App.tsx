import React, { FC } from 'react'
import Layout from './Layout'

import ProvidersWrapper from './context/ProvidersWrapper'

const App: FC = () => {
  return (
    <ProvidersWrapper>
      <Layout />
    </ProvidersWrapper>
  )
}

export default App

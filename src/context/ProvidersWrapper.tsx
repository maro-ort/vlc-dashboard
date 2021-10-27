import React, { FC } from 'react'

import { EffectsProvider } from './EffectsContext'
import { VlcProvider } from './VlcContext'

const ProvidersWrapper: FC<{
  children: React.ReactNode
}> = ({
  children
}) => {
  return (
    <VlcProvider>
      <EffectsProvider>
        {children}
      </EffectsProvider>
    </VlcProvider>
  )
}

export default ProvidersWrapper
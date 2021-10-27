import React, { createContext, FC, useCallback, useEffect, useState } from 'react'

const EffectsContext = createContext<{
  isPlaylistOpen: boolean
  setIsPlaylistOpen: (is: boolean) => void
}>(undefined!)

const EffectsProvider: FC<{
  children: React.ReactNode
}> = ({
  children
}) => {
  const [ isPlaylistOpen, setIsPlaylistOpen ] = useState(false)

  const value = {
    isPlaylistOpen,
    setIsPlaylistOpen
  }
  return (
    <EffectsContext.Provider value={value}>
      {children}
    </EffectsContext.Provider>
  )
}

export { EffectsProvider }
export default EffectsContext
import React, { createContext, FC, useState } from 'react'

const EffectsContext = createContext<{
  isBrowserOpen: boolean
  setIsBrowserOpen: (is: boolean) => void
  isPlaylistOpen: boolean
  setIsPlaylistOpen: (is: boolean) => void
}>(undefined!)

const EffectsProvider: FC<{
  children: React.ReactNode
}> = ({
  children
}) => {
  const [ isBrowserOpen, setIsBrowserOpen ] = useState(false)
  const [ isPlaylistOpen, setIsPlaylistOpen ] = useState(false)

  const value = {
    isPlaylistOpen,
    setIsPlaylistOpen,
    isBrowserOpen,
    setIsBrowserOpen,
  }
  return (
    <EffectsContext.Provider value={value}>
      {children}
    </EffectsContext.Provider>
  )
}

export { EffectsProvider }
export default EffectsContext
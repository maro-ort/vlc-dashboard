import React, { createContext, FC, useCallback, useState } from 'react'

import { getStatus } from './utils/api'

const VlcContext = createContext<{
  status: VlcStatus
  syncStatus: () => void
  getProgress: () => VlcProgress
}>(undefined!)

const VlcProvider: FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [ status, setStatus ] = useState<VlcStatus>({ state: 'off' })

  const syncStatus = useCallback(async () => {
    setStatus(await getStatus())
  }, [ setStatus ])

  const getProgress = useCallback((): VlcProgress => {
    console.log({ status });
    
    return status.progress || {
      time: 0,
      length: 0,
      position: 0,
    }
  }, [ status ])

  const value = {
    status,
    syncStatus,
    getProgress
  }
  return ( 
    <VlcContext.Provider value={value}>
      {children}
    </VlcContext.Provider>
  )
}

export { VlcProvider }
export default VlcContext
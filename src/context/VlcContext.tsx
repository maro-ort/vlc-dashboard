import React, { createContext, FC, useCallback, useEffect, useState } from 'react'

import { getStatus } from '../utils/api'
import { env } from '../utils/env'

const VlcContext = createContext<{
  status: VlcStatus
}>(undefined!)

const VlcProvider: FC<{
  children: React.ReactNode
}> = ({
  children
}) => {
  const [ status, setStatus ] = useState<VlcStatus>({ state: 'off' })

  const syncStatus = useCallback(async () => {
    const s = await getStatus()
    setStatus(s)
  }, [ setStatus ])

  // Cron
  useEffect(() => {
    syncStatus()
    const interval = setInterval(syncStatus, parseInt(env('REFRESH_RATE', (200).toString())))
    return () => { clearInterval(interval) }
  }, [ syncStatus ])

  const value = {
    status,
  }
  return (
    <VlcContext.Provider value={value}>
      {children}
    </VlcContext.Provider>
  )
}

export { VlcProvider }
export default VlcContext
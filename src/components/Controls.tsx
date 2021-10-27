import React, { FC, useContext, useEffect, useState } from 'react'

import VlcContext from '../VlcContext'

const Controls: FC = () => {
  const [ progress, setProgress ] = useState<VlcProgress>()
  const { getProgress } = useContext(VlcContext)

  useEffect(() => {
    console.log(getProgress());
    
    setProgress(getProgress())
    const interval = setInterval(() => setProgress(getProgress()))
    return () => clearInterval(interval)
  }, [ setProgress ])

  return (
    <section id="controls">
      {progress && (
        <div id="progress-slider">
          {progress.position}
          <input
            type="range"
            value={progress.position * 100}
            min={0}
            max={100}
            onChange={() => ({})}
          />
        </div>
      )}
    </section>
  )
}

export default Controls
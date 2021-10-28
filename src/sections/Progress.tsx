import React, { FC } from 'react'
import cx from 'classnames'

import { toTime } from '../utils/decorators'
import{ sendCommand } from '../utils/api'

const Progress: FC<{
  state: VlcState
  progress: VlcProgress
}> = ({ state, progress }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    sendCommand({ command: 'seek', data: { val: `${parseInt(value)}%` } })
  }

  return (
    <section id="progress">
      <div id="progress-slider">
        {toTime(progress.time)} | {toTime(progress.length)}
        <input
          className={cx('bar', { '--paused': state !== 'playing' })}
          type="range"
          value={progress.position * 100}
          min={0}
          max={100}
          onChange={handleChange}
        />
      </div>
    </section>
  )
}

export default Progress

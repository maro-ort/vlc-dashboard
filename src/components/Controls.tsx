import React, { FC, useContext } from 'react'
import cx from 'classnames'

import EffectsContext from '../context/EffectsContext'

import { sendCommand } from '../utils/api'

const Controls: FC<{
  status: VlcStatus
}> = ({
  status: {
    state,
    controls
  }
}) => {
  const { setIsPlaylistOpen } = useContext(EffectsContext)

  const goToPlaylist = () => {
    setIsPlaylistOpen(true)
    document.getElementById('playlist')?.scrollIntoView()
  }

  return (
    <section id="controls">
      <div className="buttons">
        <ControlButton
          fa={cx({ 'play': state !== 'playing', 'pause': state === 'playing' })}
          onClick={() => sendCommand({ command: 'pl_pause' })}
        />
        <ControlButton
          fa="backward"
          onClick={() => sendCommand({ command: 'pl_previous' })}
        />
        <ControlButton
          fa="forward"
          onClick={() => sendCommand({ command: 'pl_next' })}
        />
        <ControlButton
          fa="list"
          onClick={goToPlaylist}
        />
        <ControlButton
          fa="expand-alt" active={controls?.fullscreen}
          onClick={() => sendCommand({ command: 'fullscreen' })}
        />
        <ControlButton
          fa="undo-alt" active={controls?.loop}
          onClick={() => sendCommand({ command: 'pl_loop' })}
        />
        <ControlButton
          fa="random" active={controls?.random}
          onClick={() => sendCommand({ command: 'pl_random' })}
        />
      </div>
    </section>
  )
}

const ControlButton: FC<{
  fa: string
  active?: boolean
  onClick: () => void
}> = ({
  fa,
  active,
  onClick
}) => {

  return (
    <div
      key={fa}
      className={cx('controls-button', fa, { '--active': active })}
      onClick={onClick}
    >
      <span className={cx(`fa fa-${fa}`)} />
    </div>
  )
}

export default Controls
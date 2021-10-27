import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import EffectsContext from '../context/EffectsContext'

import { getPlaylist } from '../utils/api'

const Playlist: FC = () => {
  const { isPlaylistOpen, setIsPlaylistOpen } = useContext(EffectsContext)
  const [ playlistItems, setPlaylistItems ] = useState<VlcPlaylist>([])

  useEffect(() => {
    if (!isPlaylistOpen) return

    getPlaylist()
      .then(setPlaylistItems)
      .finally(() => setIsPlaylistOpen(true))

  }, [ isPlaylistOpen ])

  const togglePlaylist = useCallback(() => {
    setIsPlaylistOpen(!isPlaylistOpen)
  }, [ isPlaylistOpen, setIsPlaylistOpen ])
  return (
    <section id="playlist">
      <h2
        onClick={togglePlaylist}
      >Playlist ({ isPlaylistOpen && 'open' || 'closed' })</h2>
      <div className="list">
        {playlistItems.map((item, i) => (
          <div key={i} className={cx('list-item')}>
            {item.name}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Playlist
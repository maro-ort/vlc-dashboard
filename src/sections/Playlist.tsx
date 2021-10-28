import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import EffectsContext from '../context/EffectsContext'

import { getPlaylist } from '../utils/api'
import { toTime } from '../utils/decorators'

import Expandable from '../components/Expandable'

const Playlist: FC = () => {
  const { isPlaylistOpen, setIsPlaylistOpen } = useContext(EffectsContext)
  const [ playlistItems, setPlaylistItems ] = useState<VlcPlaylist>([])

  useEffect(() => {
    getPlaylist()
      .then(r => { console.log(r); return r })
      .then(setPlaylistItems)
      
  }, [])

  useEffect(() => {
    if (!isPlaylistOpen) return
    getPlaylist()
      .then(setPlaylistItems)
      .finally(() =>{ console.log('a'); setIsPlaylistOpen(true)})
  }, [ isPlaylistOpen, setPlaylistItems, setIsPlaylistOpen ])

  const togglePlaylist = useCallback(() => {
    setIsPlaylistOpen(!isPlaylistOpen)
  }, [ isPlaylistOpen, setIsPlaylistOpen ])
  return (
    <section id="playlist">
      <h2
        className={cx('expandable-title',{
          '--expanded': isPlaylistOpen
        })}
        onClick={togglePlaylist}
    >
      <span>Playlist</span>
      <span className="fa fa-chevron-down" />
    </h2>
      <Expandable
        isExpanded={isPlaylistOpen}
      >
        <>
          <div className="controls">
            <span className="btn fa fa-times" />
            <span className="btn fa fa-folder-plus" />
          </div>
          <div className="list">
            {playlistItems.map(({ id, current, name, duration }) => (
              <div
                key={id}
                className={cx('list-item', {
                  '--playing': current
                })}
              >
                <span>{name}</span>
                <span>{toTime(duration)}</span>
                <span className="btn fa fa-times" />
                <span className="btn fa fa-play" />
              </div>
            ))}
          </div>
        </>
      </Expandable>
    </section>
  )
}

export default Playlist
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import EffectsContext from '../context/EffectsContext'

import { getPlaylist, sendCommand } from '../utils/api'
import { toTime } from '../utils/decorators'

import Expandable from '../components/Expandable'

const PlaylistItem: FC<{
  key: string
  refreshPlaylist: () => void
  item: VlcPlaylistItem
}> = ({
  refreshPlaylist,
  item: {
    id,
    current,
    name,
    duration
  }
}) => {

  const handlePlay = () => {
    sendCommand({ command: 'pl_play', data: { id } })
      .then(refreshPlaylist)
  }

  const handleDelete = () => {
    sendCommand({ command: 'pl_delete', data: { id } })
      .then(refreshPlaylist)
  }

  return (
    <div className={cx('list-item', { '--playing': current })}>
      <span>{name}</span>
      <span>{toTime(duration)}</span>
      <span onClick={handleDelete}><span className="btn fa fa-times" /></span>
      <span onClick={handlePlay}><span className="btn fa fa-play" /></span>
    </div>
  )
}

const Playlist: FC = () => {
  const { isPlaylistOpen, setIsPlaylistOpen } = useContext(EffectsContext)
  const [ playlistItems, setPlaylistItems ] = useState<VlcPlaylist>([])

  const goToBrowser = () => {
    setIsPlaylistOpen(false)
    document.getElementById('browser')?.scrollIntoView()
  }

  const handleEmpty = () => {
    sendCommand({ command: 'pl_empty' })
      .then(refreshPlaylist)
  }

  const refreshPlaylist = useCallback(() => {
    return getPlaylist()
      .then(setPlaylistItems)
      .finally(() => setIsPlaylistOpen(true))
  }, [ setIsPlaylistOpen ])

  useEffect(() => {
    getPlaylist()
      .then(setPlaylistItems)
  }, [ setIsPlaylistOpen ])

  useEffect(() => {
    if (!isPlaylistOpen) return
    refreshPlaylist()
  }, [ isPlaylistOpen, refreshPlaylist ])

  const togglePlaylist = useCallback(() => {
    setIsPlaylistOpen(!isPlaylistOpen)
  }, [ isPlaylistOpen, setIsPlaylistOpen ])

  return (
    <section id="playlist">
      <h2
        className={cx('expandable-title',{ '--expanded': isPlaylistOpen })}
        onClick={togglePlaylist}
      >
        <span>Playlist</span>
        <span className="fa fa-chevron-down" />
      </h2>
      <Expandable isExpanded={isPlaylistOpen}>
        <>
          <div className="controls">
            <span onClick={handleEmpty}><span className="btn fa fa-times" /></span>
            <span onClick={goToBrowser}><span className="btn fa fa-folder-plus" /></span>
          </div>
          <div className="list">
            {playlistItems.map(item => <PlaylistItem key={item.id} item={item} refreshPlaylist={refreshPlaylist} />)}
          </div>
        </>
      </Expandable>
    </section>
  )
}

export default Playlist
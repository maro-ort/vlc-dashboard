import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import EffectsContext from '../context/EffectsContext'

import { addToPlaylist, getFolder } from '../utils/api'
import { shortPath } from '../utils/shortPath'

import Expandable from '../components/Expandable'

const Folder: FC<{
  add: (file: VlcItem) => void
  cd: (folder: VlcItem) => void
  folder: VlcFolder
}> = ({
  add,
  cd,
  folder: {
    folders,
    files
  }
}) => {

  return (
    <div className="folder">
      {folders.length === 0 && files.length === 0 && (
        <div className="empty-folder">
          <span className="fa fa-folder" />
          <div>Empty folder</div>
        </div>
      )}
      {folders.map((folder, i) => (
        <div
          key={i}
          className="item"
        >
          <span>{folder.name}</span>
          <span onClick={() => cd(folder)}><span className="btn fa fa-level-down-alt" /></span>
        </div>
      ))}
      {files.map((file, i) => (
        <div
          key={i}
          className="item"
        >
          <span>{file.name}</span>
          <span onClick={() => add(file)}><span className="btn fa fa-plus" /></span>
        </div>
      ))}
    </div>
  )
}

const Browser: FC = () => {
  const { isBrowserOpen, setIsBrowserOpen } = useContext(EffectsContext)

  const [ currentPath, setCurrentPath ] = useState('')
  const [ folder, setFolder ] = useState<VlcFolder>({ folders: [], files: [] })

  useEffect(() => {
    getFolder({ dir: currentPath }).then(setFolder)
  }, [ currentPath ])

  const toggleBrowser = useCallback(() => {
    setIsBrowserOpen(!isBrowserOpen)
  }, [ isBrowserOpen, setIsBrowserOpen ])

  const add = (file: VlcItem) => {
    addToPlaylist([ currentPath + '/' + file.name ])
  }

  const addFolder = useCallback(() => {
    addToPlaylist(folder.files.map(({ name }) => currentPath + '/' + name))
  }, [ currentPath, folder ])

  const cd = useCallback((folder: VlcItem) => {
    setCurrentPath(currentPath + '/' + folder.name)
  }, [ currentPath, setCurrentPath ])

  const up = useCallback(() => {
    const path = currentPath.split('/')
    path.pop()
    setCurrentPath(path.join('/'))
  }, [ currentPath, setCurrentPath ])

  return (
    <section id="browser">
      <h2
        className={cx('expandable-title',{ '--expanded': isBrowserOpen })}
        onClick={toggleBrowser}
      >
        <span>Media</span>
        <span className="fa fa-chevron-down" />
      </h2>
      <Expandable isExpanded={isBrowserOpen}>
        <>
          <div className="controls">
            <span className="path">{shortPath(currentPath)}</span>
            <span onClick={addFolder}><span className="btn fa fa-plus" /></span>
            <span onClick={up}><span className="btn fa fa-level-up-alt" /></span>
          </div>
          <Folder
            folder={folder}
            add={add}
            cd={cd}
          />
        </>
      </Expandable>
    </section>
  )
}

export default Browser
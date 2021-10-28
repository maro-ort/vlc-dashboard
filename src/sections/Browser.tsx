import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import EffectsContext from '../context/EffectsContext'

import { getFolder } from '../utils/api'
import { shortPath } from '../utils/shortPath'

import Expandable from '../components/Expandable'

const Folder: FC<{
  folder: VlcFolder
  cd: (folder: VlcItem) => void
}> = ({
  cd,
  folder: {
    folders,
    files
  }
}) => {



  return (
    <div className="folder">
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
          <span><span className="btn fa fa-plus" /></span>
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
            <span><span className="btn fa fa-plus" /></span>
            <span onClick={up}><span className="btn fa fa-level-up-alt" /></span>
          </div>
          <Folder folder={folder} cd={cd} />
        </>
      </Expandable>
    </section>
  )
}

export default Browser
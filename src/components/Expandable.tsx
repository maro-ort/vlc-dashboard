import React, { useEffect, useState, useRef, FC } from 'react'
import cx from 'classnames'

const Expandable: FC<{
  className?: string
  children: React.ReactNode
  isExpanded: boolean
}> = ({
  className,
  children,
  isExpanded,
}) => {
  const elRef = useRef<HTMLDivElement>(null)
  const [ maxHeight, setMaxHeight ] = useState<number>()
  const [ currentHeight, setCurrentHeight ] = useState(0)

  useEffect(() => {
    if(!elRef.current) return
    const ref = elRef.current
    const resizeObserver = new ResizeObserver(() => {
      !maxHeight && setMaxHeight(ref?.scrollHeight)
    })
    setTimeout(() => resizeObserver.observe(ref), 1000)

    return () => {
      resizeObserver.unobserve(ref)
    }
  }, [ elRef, maxHeight ])

  useEffect(() => {
    if(isExpanded) setCurrentHeight(maxHeight ||  0)
    else setCurrentHeight(0)
  }, [ isExpanded, maxHeight ])

  return (
    <div
      ref={elRef}
      className={cx(className, {
        '--expanded': isExpanded
      })}
      style={{
        padding: !isExpanded ? '0' : '',
        maxHeight: currentHeight,
        overflow: 'hidden',
        transition: 'all .3s'
      }}
    >
      {children}
    </div>
  )

}

export default Expandable
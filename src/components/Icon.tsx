import { WindowProps } from '@/types'
import { DraggableCore, type DraggableData, type DraggableEvent } from 'react-draggable'
import { useWindows } from '@contexts/WindowsContext'
import { useCallback, useMemo, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { durFast, durMinimise, durDevelop } from '@/styles/motion'

type DragPosition = {
  x?: number
  y?: number
}

type IconPosition = {
  gridColumnStart: number
  gridRowStart: number
}

function Icon(props: { window: WindowProps }) {
  const dragAnimation = useAnimation()
  const placeholderAnimation = useAnimation()

  const { updateIconPosition, isPositionFree } = useWindows()

  const gridElementRef = useRef<HTMLDivElement | null>(null)

  const [preventDrop, setPreventDrop] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [preventClick, setPreventClick] = useState(false)
  const [placeholderPosition, setPlaceholderPosition] = useState<IconPosition | null>(null)

  const calcGridDropPosition = useMemo(
    () => (gridElement: HTMLElement | null, { x = 0, y = 0 }: DragPosition): IconPosition => {
      if (!gridElement) return { gridColumnStart: 0, gridRowStart: 0 }

      const gridRowHeight = 100
      const gridColumnWidth = 100
      const gridColumnGap = 0
      const gridRowGap = 0
      const paddingTop = 8

      return {
        gridColumnStart: Math.min(Math.ceil(x / (gridColumnWidth + gridColumnGap))),
        gridRowStart: Math.min(Math.ceil((y - paddingTop) / (gridRowHeight + gridRowGap))),
      }
    },
    []
  )

  const handleClick = () => {
    if (preventClick) {
      return
    }
    props.window.openOrFocus()
  }

  async function handleIconMove(gridDropPosition: IconPosition) {
    placeholderAnimation.start({
      opacity: 0,
      transition: { delay: durFast / 1000, duration: durDevelop / 1000 },
    })

    await dragAnimation.start({
      opacity: 0,
      scale: 0.8,
      transition: { duration: durMinimise / 1000 },
    })

    updateIconPosition(props.window.elementId, gridDropPosition)

    await dragAnimation.start({
      opacity: 1,
      scale: 1,
      transition: { duration: durMinimise / 1000 },
    })
  }

  const handleDrop = (_e: DraggableEvent, ui: DraggableData) => {
    if (!isDragging || preventDrop) {
      setIsDragging(false)
      setPlaceholderPosition(null)
      dragAnimation.set({ opacity: 1 })
      return
    }

    setTimeout(() => {
      setPreventClick(false)
    }, 100)

    setTimeout(() => {
      setPlaceholderPosition(null)
    }, 500)

    setIsDragging(false)

    const gridDropPosition = calcGridDropPosition(gridElementRef.current, { x: ui.x, y: ui.y })

    handleIconMove(gridDropPosition)
  }

  const handleDrag = useCallback(
    (_e: DraggableEvent, ui: DraggableData) => {
      if (!isDragging) {
        setIsDragging(true)
      }
      dragAnimation.set({ opacity: 0.6 })
      const gridDropPosition = calcGridDropPosition(gridElementRef.current, { x: ui.x, y: ui.y })
      setPlaceholderPosition(gridDropPosition)
      setPreventDrop(!isPositionFree(gridDropPosition))
    },
    [calcGridDropPosition, isDragging, dragAnimation, isPositionFree]
  )

  return (
    <>
      <DraggableCore onDrag={handleDrag} onStop={handleDrop}>
        <motion.div ref={gridElementRef} animate={dragAnimation}>
          <button className="iconWrapper unstyledButton" onClick={handleClick}>
            <img src={props.window.xpIcon} alt="" className="pointer-events-none icon" />
            <span className="caption">{props.window.caption}</span>
          </button>
        </motion.div>
      </DraggableCore>
      {placeholderPosition && (
        <motion.div
          className="placeholder"
          animate={placeholderAnimation}
          style={{
            backgroundColor: preventDrop ? 'rgba(155, 0, 0, 0.15)' : 'rgba(165, 165, 165, 0.14)',
            gridColumnStart: placeholderPosition.gridColumnStart,
            gridRowStart: placeholderPosition.gridRowStart,
          }}
        />
      )}
    </>
  )
}

export default Icon

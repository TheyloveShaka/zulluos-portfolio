import { WindowProps } from '@/types'

function IconTask({ window: win }: { window: WindowProps }) {
  return (
    <button
      type="button"
      id={`task-${win.elementId}`}
      className="icon-task"
      onClick={win.openOrFocus}
      aria-label={win.caption}
      title={win.caption}
    >
      <img src={win.xpIcon} alt="" className="icon-task-icon" />
      <span className="caption-task">{win.caption}</span>
    </button>
  )
}

export default IconTask

import { useWindows } from '@contexts/WindowsContext'
import PenUnderline from '@components/PenUnderline'

const AVAILABILITY = 'Kampala, Uganda · Available for work'
const SERVICE_LINE = 'Web solutions · Systems · AI products · Project leadership'
export const CLOSING_QUOTE =
  'If it can be done, I\'ll do it. Even if it can\'t, I\'ll do my best and have fun trying.'

function StickyNote() {
  const { openOrFocusWindow } = useWindows()

  return (
    <div className="sticky-note">
      <span className="sticky-note__tape" aria-hidden="true" />
      <p className="sticky-note__available">
        <span className="sticky-note__dot" aria-hidden="true" />
        {AVAILABILITY}
      </p>
      <p className="sticky-note__service">{SERVICE_LINE}</p>
      <p className="sticky-note__quote">{CLOSING_QUOTE}</p>
      <button
        type="button"
        className="sticky-note__cta group"
        onClick={() => openOrFocusWindow('hireMe')}
      >
        <span className="sticky-note__cta-label">
          Let&apos;s work together
          <PenUnderline variant="hover" />
        </span>
        <span className="sticky-note__cta-arrow" aria-hidden="true">
          →
        </span>
      </button>
    </div>
  )
}

export default StickyNote

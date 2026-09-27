import { useEffect, useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { useAnimations } from '@contexts/AnimationsContext'
import PenUnderline from '@components/PenUnderline'
import polaroid1 from '@assets/placeholders/polaroid-1.svg'

interface PolaroidSpec {
  src: string
  wellLabel: string
  caption: string
  delayMs: number
}

const POLAROIDS: PolaroidSpec[] = [
  { src: polaroid1, wellLabel: 'Portrait pending', caption: 'me, soon', delayMs: 0 },
]

const noop = (e: MouseEvent | KeyboardEvent) => {
  e.preventDefault()
}

function Polaroids() {
  const { desktopRevealed } = useAnimations()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const developed = desktopRevealed || reducedMotion

  return (
    <div className="polaroid-cluster">
      {POLAROIDS.map((p) => (
        <div
          key={p.wellLabel}
          className="polaroid"
          role="img"
          tabIndex={0}
          aria-label={`Polaroid photo, pending: ${p.caption}`}
          onClick={noop}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') noop(e)
          }}
        >
          <span className="polaroid__tape" aria-hidden="true" />
          <span className="polaroid__well" data-image-slot="ASK">
            <span
              className="polaroid__veil"
              aria-hidden="true"
              style={{
                opacity: developed ? 0 : 0.72,
                transitionDuration: reducedMotion ? '0ms' : 'var(--dur-develop)',
                transitionDelay: reducedMotion ? '0ms' : `${p.delayMs}ms`,
              }}
            />
            <img
              src={p.src}
              alt=""
              aria-hidden="true"
              style={{
                opacity: developed ? 1 : 0.35,
                transitionDuration: reducedMotion ? '0ms' : 'var(--dur-develop)',
                transitionDelay: reducedMotion ? '0ms' : `${p.delayMs}ms`,
              }}
            />
            <span className="polaroid__well-label">{p.wellLabel}</span>
          </span>
          <span className="polaroid__caption-wrap">
            <span className="polaroid__caption" aria-hidden="true">
              {p.caption}
              <PenUnderline variant="static" />
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Polaroids

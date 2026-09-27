import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { TbPlayerPause, TbPlayerPlay } from 'react-icons/tb'
import { brandedTools } from '@/data/stack'
import '@/styles/orbit.css'

interface SkillsOrbitProps {
  className?: string
}

interface RingConfig {
  radius: number
  count: number
  duration: number
  direction: 'cw' | 'ccw'
}

const RING_CONFIG: RingConfig[] = [
  { radius: 108, count: 8, duration: 18, direction: 'cw' },
  { radius: 166, count: 10, duration: 24, direction: 'ccw' },
  { radius: 224, count: 12, duration: 30, direction: 'cw' },
  { radius: 282, count: 16, duration: 38, direction: 'ccw' },
]

const CENTER = { x: 320, y: 316 }
const HEMISPHERE_SIZE = 128
const CHIP_SIZE = 32
const GLYPH_SIZE = 24

const MOBILE_SCALE = 0.536
const MOBILE_CHIP_SIZE = 20
const MOBILE_GLYPH_SIZE = 12

function chipAngle(index: number, count: number): number {
  if (count <= 1) return 270
  return 180 + (180 * index) / (count - 1)
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

function SkillsOrbit({ className = '' }: SkillsOrbitProps) {
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const isStatic = reducedMotion || isMobile

  const bodyRef = useRef<HTMLDivElement | null>(null)
  const [userPaused, setUserPaused] = useState(false)
  const [offscreenOrHidden, setOffscreenOrHidden] = useState(false)

  useEffect(() => {
    if (isStatic) return
    const node = bodyRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreenOrHidden(!entry.isIntersecting || document.hidden),
      { threshold: 0.1 }
    )
    observer.observe(node)

    const onVisibility = () => setOffscreenOrHidden(!node || document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [isStatic])

  const isPaused = userPaused || offscreenOrHidden

  const scale = isMobile ? MOBILE_SCALE : 1
  const cx = CENTER.x * scale
  const cy = CENTER.y * scale
  const chipSize = isMobile ? MOBILE_CHIP_SIZE : CHIP_SIZE
  const glyphSize = isMobile ? MOBILE_GLYPH_SIZE : GLYPH_SIZE
  const hemisphereSize = HEMISPHERE_SIZE * scale

  let toolCursor = 0
  const rings = RING_CONFIG.map(ring => {
    const chips = Array.from({ length: ring.count }, (_, i) => {
      const tool = brandedTools[toolCursor % brandedTools.length]
      toolCursor += 1
      return {
        key: `${ring.radius}-${i}`,
        angle: chipAngle(i, ring.count),
        tool,
      }
    })
    return { ...ring, radius: ring.radius * scale, chips }
  })

  const uniqueToolNames = useMemo(() => Array.from(new Set(brandedTools.map(t => t.name))), [])

  return (
    <section
      className={`orbit-panel ${className}`.trim()}
      role="group"
      aria-labelledby="skills-orbit-heading"
    >
      <div className="orbit-panel__header">
        <span id="skills-orbit-heading" className="orbit-panel__title">
          Tools I work with
        </span>
        {!isStatic && (
          <button
            type="button"
            className="orbit-panel__pause"
            aria-pressed={userPaused}
            onClick={() => setUserPaused(p => !p)}
          >
            {userPaused ? <TbPlayerPlay aria-hidden="true" size={14} /> : <TbPlayerPause aria-hidden="true" size={14} />}
            <span>{userPaused ? 'Play' : 'Pause'}</span>
          </button>
        )}
      </div>

      <div ref={bodyRef} className="orbit-panel__body grain">
        <div
          className={`orbit-fan ${!isStatic && isPaused ? 'orbit-fan--paused' : ''}`.trim()}
          style={{ height: `${cy}px` }}
        >
          <div
            className="orbit-hemisphere"
            aria-hidden="true"
            style={{
              width: `${hemisphereSize}px`,
              height: `${hemisphereSize / 2}px`,
              left: `${cx - hemisphereSize / 2}px`,
              top: `${cy - hemisphereSize / 2}px`,
              borderRadius: `${hemisphereSize / 2}px ${hemisphereSize / 2}px 0 0`,
            }}
          />

          {rings.map(ring => (
            <div
              key={`arc-${ring.radius}`}
              className="orbit-guide-arc"
              aria-hidden="true"
              style={{
                width: `${ring.radius * 2}px`,
                height: `${ring.radius * 2}px`,
                left: `${cx - ring.radius}px`,
                top: `${cy - ring.radius}px`,
              }}
            />
          ))}

          {rings.map(ring => {
            const ringAnimName = ring.direction === 'cw' ? 'orbit-ring-cw' : 'orbit-ring-ccw'
            const chipAnimName = ring.direction === 'cw' ? 'orbit-chip-counter-a' : 'orbit-chip-counter-b'
            return (
              <div
                key={ring.radius}
                className="orbit-ring"
                aria-hidden="true"
                style={{
                  left: `${cx}px`,
                  top: `${cy}px`,
                  animationName: isStatic ? undefined : ringAnimName,
                  animationDuration: isStatic ? undefined : `${ring.duration}s`,
                }}
              >
                {ring.chips.map(chip => (
                  <div
                    key={chip.key}
                    className="orbit-spoke"
                    style={{ transform: `rotate(${chip.angle}deg) translateX(${ring.radius}px)` }}
                  >
                    <div
                      className="orbit-chip"
                      style={{
                        width: `${chipSize}px`,
                        height: `${chipSize}px`,
                        marginLeft: `${-chipSize / 2}px`,
                        marginTop: `${-chipSize / 2}px`,
                        '--base-angle': `${-chip.angle}deg`,
                        animationName: isStatic ? undefined : chipAnimName,
                        animationDuration: isStatic ? undefined : `${ring.duration}s`,
                      } as CSSProperties}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width={glyphSize}
                        height={glyphSize}
                        aria-hidden="true"
                      >
                        <path d={chip.tool.icon.path} fill={`#${chip.tool.icon.hex}`} />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      <ul className="sr-only" aria-label="Complete list of tools">
        {uniqueToolNames.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  )
}

export default SkillsOrbit

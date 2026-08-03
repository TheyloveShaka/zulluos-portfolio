import React, { useCallback, useEffect, useRef, useState } from 'react'
import './powerOnScreen.css'

/**
 * PowerOnScreen — the very first thing a visitor sees.
 *
 * Replaces the old "Push to Start" logo-draw screen. Instead of a bare
 * clickable wordmark, this renders an illustrated CRT + tower setup with a
 * real power button. Clicking (or Enter/Space-ing) it plays a short CRT
 * wake — LED lights, a horizontal line snaps open, the tube flickers to
 * life — and then this component fades out to reveal the black canvas
 * underneath (`.app`'s background), which is exactly where LoadingScreen
 * picks up with the logo splash. Because both this component's own
 * background and `.app`'s background are the same near-black, that handoff
 * is a clean crossfade rather than a cut.
 *
 * `onPowerOn` fires once, after the wake animation (or, under reduced
 * motion, a simple fade) has played out — never on click itself, so the
 * caller can rely on it meaning "the machine is now actually on."
 */

type Phase = 'idle' | 'waking' | 'leaving'

interface PowerOnScreenProps {
  onPowerOn: () => void
}

const WAKE_MS = 900
const WAKE_MS_REDUCED = 120
const LEAVE_MS = 340
const LEAVE_MS_REDUCED = 220

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const PowerOnScreen: React.FC<PowerOnScreenProps> = ({ onPowerOn }) => {
  const [phase, setPhase] = useState<Phase>('idle')
  const firedRef = useRef(false)

  const handlePowerOn = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('waking')
  }, [phase])

  useEffect(() => {
    if (phase !== 'waking') return undefined
    const ms = prefersReducedMotion() ? WAKE_MS_REDUCED : WAKE_MS
    const t = window.setTimeout(() => setPhase('leaving'), ms)
    return () => window.clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'leaving') return undefined
    const ms = prefersReducedMotion() ? LEAVE_MS_REDUCED : LEAVE_MS
    const t = window.setTimeout(() => {
      if (firedRef.current) return
      firedRef.current = true
      onPowerOn()
    }, ms)
    return () => window.clearTimeout(t)
  }, [phase, onPowerOn])

  const onKeyDownContainer = (e: React.KeyboardEvent) => {
    // Convenience: the whole screen is clickable, but only the button is a
    // keyboard target — Enter/Space on the button already work for free
    // because it's a real <button>, so this just mirrors click-anywhere.
    if (e.key === 'Enter' || e.key === ' ') {
      handlePowerOn()
    }
  }

  const rootClassName = [
    'poweron-screen',
    phase === 'waking' && 'is-waking',
    phase === 'leaving' && 'is-leaving',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={rootClassName}
      onClick={handlePowerOn}
      role="presentation"
    >
      <div className="poweron-copy">
        <div className="poweron-wordmark">
          <span className="poweron-wordmark__text">Shaka's Portfolio</span>
        </div>
        <p className="poweron-name">Shaka Nathan K</p>
        <p className="poweron-title">Developer &amp; AI Engineer &mdash; Kampala, Uganda</p>
        <p className="poweron-cta">Press the power button to boot up</p>
      </div>

      <div className="poweron-illustration" onKeyDown={onKeyDownContainer}>
        <svg
          className="poweron-illustration__svg"
          viewBox="0 0 600 440"
          role="img"
          aria-label="An illustration of a retro beige desktop computer, powered off"
        >
          <defs>
            <linearGradient id="poweron-plastic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e9e3d6" />
              <stop offset="0.55" stopColor="#cdc5b4" />
              <stop offset="1" stopColor="#a89f8d" />
            </linearGradient>
            <linearGradient id="poweron-plastic-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8f8a80" />
              <stop offset="1" stopColor="#57534c" />
            </linearGradient>
            <linearGradient id="poweron-tower" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#d8d2c4" />
              <stop offset="1" stopColor="#b3ac9c" />
            </linearGradient>
            <radialGradient id="poweron-glass-sheen" cx="0.25" cy="0.2" r="0.9">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="poweron-phosphor" cx="0.5" cy="0.5" r="0.65">
              <stop offset="0" stopColor="#eaf6ff" />
              <stop offset="0.5" stopColor="#9ed0ff" />
              <stop offset="1" stopColor="#2f71cd" />
            </radialGradient>
            <clipPath id="poweron-screen-clip">
              <rect x="200" y="118" width="240" height="164" rx="6" />
            </clipPath>
            <filter id="poweron-shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* ground shadow */}
          <ellipse cx="300" cy="404" rx="215" ry="16" fill="#000" opacity="0.4" filter="url(#poweron-shadow-blur)" />

          {/* tower */}
          <g>
            <rect x="40" y="128" width="118" height="248" rx="12" fill="url(#poweron-tower)" stroke="#8b8574" strokeWidth="1" />
            <rect x="40" y="128" width="14" height="248" rx="7" fill="#00000012" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="66" y={152 + i * 8} width="60" height="3" rx="1.5" fill="#8b8574" opacity="0.55" />
            ))}
            <rect x="66" y="206" width="72" height="16" rx="2" fill="#00000018" stroke="#8b8574" strokeWidth="1" />
            <circle className="poweron-tower-led" cx="149" cy="352" r="3.5" />
            <rect x="66" y="240" width="30" height="30" rx="15" fill="#efe9dc" stroke="#8b8574" strokeWidth="1" />
          </g>

          {/* monitor stand + neck */}
          <rect x="268" y="372" width="118" height="16" rx="6" fill="url(#poweron-plastic-dark)" />
          <rect x="297" y="338" width="56" height="38" rx="4" fill="url(#poweron-plastic)" stroke="#8b8574" strokeWidth="1" />

          {/* monitor bezel */}
          <rect x="172" y="92" width="296" height="256" rx="22" fill="url(#poweron-plastic)" stroke="#8b8574" strokeWidth="1.5" />
          {/* chin / control strip */}
          <rect x="172" y="298" width="296" height="50" rx="16" fill="url(#poweron-plastic-dark)" opacity="0.35" />
          <circle cx="320" cy="323" r="5" fill="#00000022" />

          {/* screen */}
          <rect x="200" y="118" width="240" height="164" rx="6" fill="#0a0c10" stroke="#3a362c" strokeWidth="2" />
          <g clipPath="url(#poweron-screen-clip)">
            <rect x="200" y="118" width="240" height="164" fill="url(#poweron-glass-sheen)" />
            <polygon points="200,118 268,118 200,230" fill="#ffffff" opacity="0.05" />

            {/* CRT wake effect layer */}
            <rect className="poweron-scanline" x="200" y="199" width="240" height="2" fill="#eaf6ff" />
            <ellipse className="poweron-phosphor" cx="320" cy="200" rx="120" ry="82" fill="url(#poweron-phosphor)" />
          </g>

          {/* power button visual (hit target is the real <button> overlaid via CSS) */}
          <circle cx="390" cy="323" r="15" fill="#2a271f" stroke="#141310" strokeWidth="1.5" />
          <circle className="poweron-button-led-ring" cx="390" cy="323" r="15" fill="none" strokeWidth="2.5" />
        </svg>

        <button
          type="button"
          className="poweron-button"
          aria-label="Power on the computer"
          onClick={(e) => {
            e.stopPropagation()
            handlePowerOn()
          }}
          disabled={phase !== 'idle'}
        >
          <span className="poweron-button__glow" aria-hidden="true" />
          <svg className="poweron-button__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 3v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M6.5 6.5a8 8 0 1 0 11 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PowerOnScreen

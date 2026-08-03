import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import clippy, { Agent } from 'clippyts'

import WizardChat from './WizardChat'
import './wizard.css'

const GREETING = 'Welcome to Shaka\'s Portfolio! Click me if you need help.'

type PanelState = 'closed' | 'open' | 'minimized'

/**
 * The site opens on a welcome/power-on screen (PowerOnScreen.tsx) that
 * waits — indefinitely — for the visitor to click the power button. Only
 * once that happens does LoadingScreen.tsx run the rest of the boot
 * sequence: CRT wake -> logo splash -> BIOS boot text -> desktop. Whichever
 * path gets there (a real boot, or fastboot skipping straight to the
 * desktop), LoadingScreen stamps `document.body.dataset.introDone = 'true'`
 * and dispatches a `zulluos:intro-complete` window event the moment the
 * desktop is actually visible. We wait for that signal before loading
 * Merlin so he doesn't pop in on top of the boot sequence — popping in
 * mid-boot was the exact bug this replaced (Merlin used to key off
 * `#bootRoot` being hidden, which happened before the boot sequence even
 * started).
 *
 * There's a second, easy-to-miss signal too: `zulluos:intro-start` (the
 * event name is a leftover internal identifier from this project's former
 * name — it's not shown to visitors, so it's left as-is) /
 * `document.body.dataset.introStarted`, stamped the instant the visitor
 * actually powers the machine on (LoadingScreen's handlePowerOn, fired by
 * PowerOnScreen's onPowerOn callback once the power-on animation has
 * played out). The safety-net timeout below is armed only once *that*
 * fires — arming it from this hook's own mount (≈ page load) instead was a
 * real bug: the welcome screen has no time limit (a visitor can sit on it,
 * or tab away, for as long as they like), so a page-load-relative timer
 * trivially fired *before* the user even clicked the power button, popping
 * Merlin in on top of the still-off welcome screen. Gating the timer on
 * intro-start makes it mean what it's supposed to mean: "boot itself is
 * taking suspiciously long," not "it's been a while since the page
 * loaded." Fastboot never dispatches intro-start (it jumps straight to
 * intro-complete), so it's unaffected by any of this.
 */
const INTRO_START_EVENT = 'zulluos:intro-start'
const INTRO_COMPLETE_EVENT = 'zulluos:intro-complete'
const INTRO_SAFETY_NET_MS = 20000

const useDesktopReady = (): boolean => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) return undefined

    const isDone = () => document.body.dataset.introDone === 'true'
    const isStarted = () => document.body.dataset.introStarted === 'true' || isDone()

    if (isDone()) {
      setReady(true)
      return undefined
    }

    let safetyTimer: number | undefined

    const armSafetyNet = () => {
      if (safetyTimer !== undefined) return
      safetyTimer = window.setTimeout(() => setReady(true), INTRO_SAFETY_NET_MS)
    }

    // Covers the case where the intro was already underway before this
    // effect's listeners attached (e.g. a fast remount).
    if (isStarted()) armSafetyNet()

    const onIntroStart = () => armSafetyNet()
    const onIntroComplete = () => setReady(true)
    window.addEventListener(INTRO_START_EVENT, onIntroStart)
    window.addEventListener(INTRO_COMPLETE_EVENT, onIntroComplete)

    // Belt-and-suspenders poll for both signals, plus the safety net above,
    // so Merlin can never be permanently lost if an event is missed.
    const interval = window.setInterval(() => {
      if (isDone()) {
        setReady(true)
      } else if (isStarted()) {
        armSafetyNet()
      }
    }, 400)

    return () => {
      window.removeEventListener(INTRO_START_EVENT, onIntroStart)
      window.removeEventListener(INTRO_COMPLETE_EVENT, onIntroComplete)
      window.clearInterval(interval)
      if (safetyTimer !== undefined) window.clearTimeout(safetyTimer)
    }
  }, [ready])

  return ready
}

// A handful of evenly-spaced sparkle particles for Merlin's entrance poof.
const SPARKLE_PARTICLES = Array.from({ length: 7 }, (_, i) => ({
  angle: (360 / 7) * i,
  delay: Math.round((i % 3) * 45),
}))

// Roughly matches the sprite box agent.moveTo() below targets, so the
// sparkle burst lands centred on Merlin rather than at his corner anchor.
const merlinSparklePosition = () => ({
  x: window.innerWidth - 100,
  y: window.innerHeight - 120,
})

const Wizard = () => {
  const desktopReady = useDesktopReady()
  const [panel, setPanel] = useState<PanelState>('closed')
  const [sparkle, setSparkle] = useState<{ x: number; y: number } | null>(null)
  const agentRef = useRef<Agent | null>(null)
  const loadStartedRef = useRef(false)
  const idleIntervalRef = useRef<number>()
  const sparkleTimeoutRef = useRef<number>()

  useEffect(() => {
    if (!desktopReady || loadStartedRef.current) return undefined

    // Guard against React StrictMode double-invoking effects (and Vite HMR
    // remounts): clippyts appends a raw `.clippy` div straight to
    // document.body, outside React's tree, so React won't dedupe it for us.
    if (document.querySelector('.clippy')) return undefined

    loadStartedRef.current = true

    clippy.load({
      name: 'Merlin',
      successCb: (agent) => {
        agentRef.current = agent
        agent.show(true)
        agent.moveTo(window.innerWidth - 150, window.innerHeight - 170, 0)

        // Brief sparkle/poof flourish as he lands, then his usual greet.
        setSparkle(merlinSparklePosition())
        sparkleTimeoutRef.current = window.setTimeout(() => setSparkle(null), 700)

        agent.play('Greet')

        window.setTimeout(() => {
          agent.speak(GREETING, false)
        }, 800)

        const el = document.querySelector('.clippy') as HTMLElement | null
        if (el) {
          el.style.zIndex = '2147483000'
          el.setAttribute('role', 'button')
          el.setAttribute('aria-label', 'Ask Merlin')
          el.addEventListener('click', () => {
            setPanel((prev) => (prev === 'open' ? 'closed' : 'open'))
          })
        }

        const scheduleIdle = () => {
          idleIntervalRef.current = window.setTimeout(() => {
            if (!document.hidden) agent.animate()
            scheduleIdle()
          }, 22000 + Math.random() * 18000)
        }
        scheduleIdle()
      },
      failCb: (error) => {

        console.error('Merlin failed to load', error)
      },
    })

    return () => {
      if (idleIntervalRef.current) window.clearTimeout(idleIntervalRef.current)
      if (sparkleTimeoutRef.current) window.clearTimeout(sparkleTimeoutRef.current)
    }
  }, [desktopReady])

  const closeChat = useCallback(() => setPanel('closed'), [])
  const minimizeChat = useCallback(() => setPanel('minimized'), [])

  if (!desktopReady) return null

  return (
    <>
      {sparkle && (
        <div
          className="wizard-sparkle"
          style={{
            position: 'fixed',
            left: sparkle.x,
            top: sparkle.y,
            width: 0,
            height: 0,
            zIndex: 2147483000,
            pointerEvents: 'none',
          }}
        >
          {SPARKLE_PARTICLES.map((p) => (
            <span
              key={p.angle}
              className="wizard-sparkle__particle"
              style={
                {
                  '--wizard-sparkle-angle': `${p.angle}deg`,
                  '--wizard-sparkle-delay': `${p.delay}ms`,
                } as CSSProperties
              }
            />
          ))}
          <style>{`
            .wizard-sparkle__particle {
              position: absolute;
              top: 0;
              left: 0;
              width: 6px;
              height: 6px;
              margin: -3px 0 0 -3px;
              border-radius: 50%;
              background: radial-gradient(circle, #ffffff 0%, #9ed0ff 55%, rgba(47, 113, 205, 0) 100%);
              opacity: 0;
              animation: wizard-sparkle-burst 620ms ease-out forwards;
              animation-delay: var(--wizard-sparkle-delay, 0ms);
              transform: rotate(var(--wizard-sparkle-angle, 0deg)) translateX(0) scale(0.4);
            }
            @keyframes wizard-sparkle-burst {
              0% {
                opacity: 0;
                transform: rotate(var(--wizard-sparkle-angle, 0deg)) translateX(0) scale(0.4);
              }
              30% {
                opacity: 1;
              }
              100% {
                opacity: 0;
                transform: rotate(var(--wizard-sparkle-angle, 0deg)) translateX(38px) scale(1);
              }
            }
          `}</style>
        </div>
      )}
      {panel === 'open' ? (
        <WizardChat agentRef={agentRef} onClose={closeChat} onMinimize={minimizeChat} />
      ) : null}
    </>
  )
}

export default Wizard

import { useCallback, useEffect, useRef, useState } from 'react'
import clippy, { Agent } from 'clippyts'

import WizardChat from './WizardChat'
import './wizard.css'

const GREETING = 'Welcome to ZulluOS! Click me if you need help.'

type PanelState = 'closed' | 'open' | 'minimized'

/**
 * The site has a boot/loading screen (LoadingScreen.tsx) that keeps a
 * `<div id="bootRoot">` in the DOM until the user clicks through it (or
 * fastboot skips it), at which point it's hidden via `style.display = 'none'`
 * (and eventually unmounted). We don't want Merlin popping in on top of the
 * boot sequence, so we wait for that element to disappear/hide before
 * loading him — the same "is the desktop actually visible yet" signal the
 * rest of the desktop implicitly relies on.
 */
const useDesktopReady = (): boolean => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) return undefined

    const isBootScreenGone = () => {
      const boot = document.getElementById('bootRoot')
      if (!boot) return true
      return boot.style.display === 'none' || window.getComputedStyle(boot).display === 'none'
    }

    if (isBootScreenGone()) {
      setReady(true)
      return undefined
    }

    const check = () => {
      if (isBootScreenGone()) setReady(true)
    }

    const observer = new MutationObserver(check)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
      childList: true,
      subtree: true,
    })
    // Belt-and-suspenders poll, and a hard safety net so Merlin never fails
    // to appear if the boot screen's DOM shape changes in the future.
    const interval = window.setInterval(check, 400)
    const safetyNet = window.setTimeout(() => setReady(true), 20000)

    return () => {
      observer.disconnect()
      window.clearInterval(interval)
      window.clearTimeout(safetyNet)
    }
  }, [ready])

  return ready
}

const Wizard = () => {
  const desktopReady = useDesktopReady()
  const [panel, setPanel] = useState<PanelState>('closed')
  const agentRef = useRef<Agent | null>(null)
  const loadStartedRef = useRef(false)
  const idleIntervalRef = useRef<number>()

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
    }
  }, [desktopReady])

  const closeChat = useCallback(() => setPanel('closed'), [])
  const minimizeChat = useCallback(() => setPanel('minimized'), [])

  if (!desktopReady) return null

  return panel === 'open' ? (
    <WizardChat agentRef={agentRef} onClose={closeChat} onMinimize={minimizeChat} />
  ) : null
}

export default Wizard

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { WindupChildren, Pause, Pace, Effect } from 'windups'
import PowerOnScreen from './PowerOnScreen'
import {
  deviceType,
  osName,
  osVersion,
  browserName,
  browserVersion,
  engineName,
  engineVersion,
} from 'react-device-detect'

import { useWindows } from '@contexts/WindowsContext'
import { useAnimations } from '@contexts/AnimationsContext'
import { loadFastBootFlag } from '@/utils/zenFs'

// Fires once the intro finishes (naturally, skipped, or bypassed by
// fastboot) so anything waiting on the desktop being "actually visible" —
// currently just Wizard.tsx's useDesktopReady() — can react without polling
// LoadingScreen's internal state.
const INTRO_START_EVENT = 'zulluos:intro-start'
const INTRO_COMPLETE_EVENT = 'zulluos:intro-complete'

// Fired the instant the visitor actually powers the machine on (clicks the
// button on PowerOnScreen) — as opposed to intro-complete, which fires once
// the desktop is live. Wizard.tsx uses the gap between these two to arm a
// "this is taking too long" safety net *without* racing an indefinitely
// patient visitor still sitting on the pre-click welcome screen.
const signalIntroStart = () => {
  document.body.dataset.introStarted = 'true'
  window.dispatchEvent(new CustomEvent(INTRO_START_EVENT))
}

const signalIntroComplete = () => {
  document.body.dataset.introDone = 'true'
  window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT))
}

// The boot sequence is a strict pipeline:
//   welcome  — PowerOnScreen; waits (indefinitely) for the visitor to power on
//   bios     — the existing BIOS boot text (#bootRoot)
//   done     — desktop is handed off (navbar/icons animate in, Start opens)
// fastBoot skips straight from unresolved to "done".
//
// There used to be a middle "logo" stage here (LogoSplash, an OEM-style
// mark draw) between welcome and bios. It drew the old Z-mark logo, which
// has been retired — see logoBootAnimation.tsx's removal — so power-on now
// goes straight to the BIOS text. Re-add a stage here if a new mark shows
// up that's worth a splash.
type Stage = 'welcome' | 'bios' | 'done'

const LoadingScreen = () => {
  const [stage, setStage] = useState<Stage>('welcome')
  const [pattern, setPattern] = useState(false)
  const [step1, setStep1] = useState(true)
  const [step3, setStep3] = useState(true)
  // Guards against rendering PowerOnScreen for a frame before the fastboot
  // flag (read from ZenFS/IndexedDB, so not synchronously available) comes
  // back — without this, fastboot visitors would see a flash of the welcome
  // screen before it's immediately replaced by the desktop.
  const [fastBootChecked, setFastBootChecked] = useState(false)
  const { startWindow } = useWindows()
  const { navbarAnimation, iconsAnimation } = useAnimations()

  // Guards the handoff logic so it only ever runs once, whether it's
  // reached via the BIOS text finishing naturally or via fastboot.
  const handoffRef = useRef(false)

  // Shared completion path: BIOS text wrapping up hands off to the desktop.
  // Guarded so it can only run once, whichever path reaches it.
  const handleDesktopHandoff = useCallback(() => {
    if (handoffRef.current) return
    handoffRef.current = true

    setStage('done')

    navbarAnimation.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, delay: 0.1 },
    })
    iconsAnimation.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 },
    })

    setTimeout(() => {
      startWindow.openOrFocus()
    }, 450)

    signalIntroComplete()
  }, [navbarAnimation, iconsAnimation, startWindow])

  const handlePowerOn = useCallback(() => {
    signalIntroStart()
    setStage('bios')
  }, [])

  function skipLoading() {
    setStage('done')
    handoffRef.current = true

    setTimeout(() => {
      navbarAnimation.start({
        y: 0,
        opacity: 1,
        transition: { duration: 1.5, delay: 0.5 },
      })
      iconsAnimation.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 0.5 },
      })
    }, 500)

    // Fastboot skips the welcome screen and the BIOS text entirely, so it
    // never dispatches intro-start — go straight to done.
    signalIntroComplete()
  }

  useEffect(() => {
    loadFastBootFlag((isFastboot) => {
      console.log(
        '%c👋 Welcome to Shaka\'s Portfolio!',
        'color: white; background: linear-gradient(90deg, rgba(224,24,52,1) 0%, rgba(32,225,200,1) 100%); font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 5px;'
      )
      console.log(
        `%c🚀 Fastboot: %c${isFastboot ? 'On' : 'Off'}`,
        'color: #FF9800; font-size: 14px; font-weight: bold;',
        `color: ${isFastboot ? '#4CAF50' : '#F44336'}; font-size: 14px; font-weight: bold;`
      )
      if (isFastboot) {
        skipLoading()
      }
      setFastBootChecked(true)

      console.log(
        `%c💡 Tip: %cTo ${isFastboot ? 'disable' : 'enable'} fastboot and see the loading screen, execute %cfastboot ${isFastboot ? 'off' : 'on'
        }%c in the terminal.`,
        'color: #FF9800; font-size: 13px; font-weight: bold;', // Tip styling
        'font-size: 13px;', // Regular text styling
        'color: #4CAF50; font-size: 12px; font-weight: bold; background: black; padding: 2px 4px; border-radius: 3px;', // Command styling
        'font-size: 13px;' // Regular text styling after the command
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!fastBootChecked) return null

  return (
    <>
      {stage === 'welcome' && <PowerOnScreen onPowerOn={handlePowerOn} />}

      {stage === 'bios' && <div className="boot-screen" id="bootRoot">
        <div className="pattern-background">
          <div className={`pattern-mask ${pattern ? 'animate' : ''}`}></div>
          <div className="pattern-reveal">
            <div className="boot-screen-text" id="boot-text">
              <WindupChildren>
                {step3 && (
                  <Pace ms={0}>
                    Shaka's Portfolio
                    <br />
                    <Pause ms={500} />
                    {step1 && (
                      <>
                        <Pause ms={20} />
                        <br /> Checking hardware compatibility
                        <Pace ms={200}>...</Pace>
                        <Pause ms={300} />
                        <br />
                        Type: {deviceType}
                        <br /> <Pause ms={100} /> OS: {osName} Version: {osVersion}
                        <br />
                        <Pause ms={100} />
                        Browser: {browserName} Version: {browserVersion} <br />
                        <Pause ms={100} />
                        Engine: {engineName} Version: {engineVersion}
                        <Pause ms={400} /> <br />
                        Compatibility
                        <Pace ms={200}>...</Pace>
                        <Pause ms={200} /> OK
                        <Pause ms={400} />
                      </>
                    )}
                    <Effect
                      fn={() => {
                        setStep1(false)
                      }}
                    />
                    {(
                      <>
                        <br /> Loading system drivers...
                        <br /> Loading system startup scripts...
                        <br /> Verifying system configuration...
                        <br /> Initializing user interface...{' '}
                        <Pause ms={100} />
                        <br /> Loading system fonts...
                        <br /> Configuring system preferences...
                        <br /> Mounting files...
                        <Pause ms={400} />
                        <br /> Loading system services...
                        <br /> Initializing networking protocols...
                        <br /> Establishing secure connections...
                        <br /> Preparing desktop environment...
                        <br /> Optimizing system performance...
                        <Pause ms={100} />
                        <br /> Verifying system integrity...
                        <br /> Loading system log files...
                        <br /> Loading application framework...
                        <br /> Verifying user browser settings...
                        <br /> Loading system themes...
                        <br /> Scanning for available updates...
                        <Pause ms={50} />
                        <br /> Loading system resources...
                        <br /> Initializing system clock...
                        <br /> Loading system virtualization...
                        <br /> Establishing system backups...
                        <br /> Initializing system database...
                        <Pause ms={50} />
                        <br /> Verifying system licenses...
                        <br /> Initializing system multitasking...
                        <br /> Loading system security patches...
                        <br /> Initializing system memory...
                        <Pause ms={80} />
                        <br /> Loading system encryption tools...
                        <br /> Checking system for malware...
                        <br /> Loading system updates
                        <Pace ms={150}>...</Pace>
                        OK
                        <Effect
                          fn={() => {
                            setPattern(!pattern)
                          }}
                        />
                        <Pause ms={400} />
                        <br />
                        <br />
                        Loading complete...
                        <Pause ms={1300} />
                        <Effect
                          fn={() => {
                            setStep3(false)
                            handleDesktopHandoff()
                          }}
                        />
                      </>
                    )}
                  </Pace>
                )}
              </WindupChildren>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default LoadingScreen

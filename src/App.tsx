import '@/App.css'

import Projects from '@components/windows/Projects'
import Credits from '@components/windows/Credits'
import About from '@components/windows/About'
import HireMe from '@components/windows/HireMe'
import Approach from '@components/windows/Approach'
import CaseStudyViewer from '@components/windows/CaseStudyViewer'
import Xterm from '@/components/windows/Xterm'

import Start from '@components/windows/Start'
import DeviceInfo from '@components/windows/DeviceInfo'
import Icon from '@components/Icon'
import LoadingScreen from '@components/screens/LoadingScreen'
import Navbar from '@components/Navbar'
import Wizard from '@components/wizard/Wizard'
import Polaroids from '@components/desktop/Polaroids'
import StickyNote from '@components/desktop/StickyNote'
import OrbitBand from '@components/desktop/OrbitBand'

import { useTheme } from '@contexts/ThemeContext'
import { useAnimations } from '@contexts/AnimationsContext'
import { useWindows, WindowKey } from '@contexts/WindowsContext'
import { defaultIconPositions } from '@/utils/zenFs'

import { motion } from 'framer-motion'

import { useCallback, useEffect, useRef, useState } from 'react'

const parsePx = (value: string, fallback: number): number => {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : fallback
}

const App = () => {
  const { windows, windowPositions } = useWindows()
  const { themeValues } = useTheme()
  const { desktopRevealed, revealTransition } = useAnimations()

  const { closeWindow } = useWindows()
  const pdfUrl = '#'

  const [canvasHeight, setCanvasHeight] = useState<number | undefined>(undefined)
  const rafRef = useRef<number>()

  const recomputeCanvasHeight = useCallback(() => {
    if (typeof document === 'undefined') return
    const roots = document.querySelectorAll<HTMLElement>('[data-window-root], .icons, .orbit-band')
    let maxBottomDoc = 0
    roots.forEach((el) => {
      const rect = el.getBoundingClientRect()
      maxBottomDoc = Math.max(maxBottomDoc, rect.bottom + window.scrollY)
    })
    const rootStyles = getComputedStyle(document.documentElement)
    const taskbarH = parsePx(rootStyles.getPropertyValue('--taskbar-h'), 40)
    const clearance = parsePx(rootStyles.getPropertyValue('--sp-6'), 24)
    const contentBottom = maxBottomDoc > 0 ? maxBottomDoc + taskbarH + clearance : 0
    setCanvasHeight(Math.max(window.innerHeight, contentBottom))
  }, [])

  const scheduleRecompute = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(recomputeCanvasHeight)
  }, [recomputeCanvasHeight])

  useEffect(() => {
    scheduleRecompute()
    window.addEventListener('resize', scheduleRecompute)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', scheduleRecompute)
    }
  }, [
    scheduleRecompute,
    windowPositions,
    windows.about.visibility,
    windows.caseStudies.visibility,
    windows.hireMe.visibility,
    windows.approach.visibility,
    windows.caseStudy.visibility,
    windows.deviceInfo.visibility,
    windows.credits.visibility,
    windows.start.visibility,
    windows.terminal2.visibility,
  ])

  useEffect(() => {
    if (windows.resume.visibility) {
      window.open(pdfUrl, '_blank')
      closeWindow('resume')
    }
  }, [closeWindow, windows.resume.visibility])

  return (
    <>
      <div className="wallpaper-layer" style={themeValues.app} aria-hidden="true" />

      <div
        id="app"
        className="app"
        style={canvasHeight ? { minHeight: canvasHeight } : undefined}
      >
        <div className="global-live-grain" aria-hidden="true" />

        <LoadingScreen />
        <Navbar />
        <motion.ol
          className="icons"
          animate={desktopRevealed ? { opacity: 1, y: 0, transition: revealTransition } : undefined}
          initial={{ opacity: 0, y: 8 }}
        >
          {Object.entries(windows)
            .filter(([key]) => key !== 'start' && key !== 'caseStudy' && key !== 'merlinChat')
            .sort(([a], [b]) => (defaultIconPositions[a as WindowKey]?.gridRowStart ?? 99) - (defaultIconPositions[b as WindowKey]?.gridRowStart ?? 99))
            .map(([key, window]) => (
              <Icon key={key} window={window} />
            ))}
        </motion.ol>

        {windows.about.visibility && <About />}

        <Polaroids />
        <StickyNote />

        <OrbitBand />

        {windows.caseStudies.visibility && <Projects />}
        {windows.caseStudy.visibility && <CaseStudyViewer />}
        {windows.hireMe.visibility && <HireMe />}
        {windows.approach.visibility && <Approach />}
        {windows.deviceInfo.visibility && <DeviceInfo />}
        {windows.credits.visibility && <Credits />}
        {windows.start.visibility && <Start />}
        {windows.terminal2.visibility && <Xterm />}

        <Wizard />
      </div>
    </>
  )
}

export default App

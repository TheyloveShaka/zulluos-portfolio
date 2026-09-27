import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react'
import type { Transition } from 'framer-motion'
import { durFast } from '@/styles/motion'

interface AnimationsContextType {
  desktopRevealed: boolean;
  revealTransition: Transition;
  revealDesktop: (transition: Transition) => void;
}

const AnimationsContext = createContext<AnimationsContextType | undefined>(undefined)

interface AnimationsProviderProps {
  children: ReactNode;
}

export const AnimationsProvider = ({ children }: AnimationsProviderProps) => {
  const [desktopRevealed, setDesktopRevealed] = useState(false)
  const [revealTransition, setRevealTransition] = useState<Transition>({ duration: durFast / 1000, delay: 0 })

  const revealDesktop = useCallback((transition: Transition) => {
    setRevealTransition(transition)
    setDesktopRevealed(true)
  }, [])

  const value = useMemo(
    () => ({ desktopRevealed, revealTransition, revealDesktop }),
    [desktopRevealed, revealTransition, revealDesktop]
  )

  return (
    <AnimationsContext.Provider value={value}>
      {children}
    </AnimationsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAnimations = () => {
  const context = useContext(AnimationsContext)
  if (context === undefined) {
    throw new Error('useAnimations must be used within an AnimationsProvider')
  }
  return context
}

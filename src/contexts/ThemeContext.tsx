import { createContext, useContext, ReactNode, type CSSProperties } from 'react'
import xpWallpaper from '@assets/xpCompress.jpg'

const xpTheme = {
  app: {
    backgroundImage: `url(${xpWallpaper})`,
    backgroundSize: 'cover',
  },
  button: {
    WebkitFontSmoothing: 'antialiased',
    boxSizing: 'border-box',
    border: '1px solid var(--xp-btn-border)',
    background: 'var(--xp-btn-face)',
    boxShadow: 'none',
    borderRadius: 'var(--radius-control)',
  },
  window: {
    background: 'var(--xp-title-active)',
    color: 'var(--n-0)',
    borderRadius: 'var(--radius-window)',
    fontFamily: 'var(--font-ui)',
    fontWeight: 'var(--fw-bold)',
    fontSize: 'var(--fs-chrome)',
    textShadow: 'var(--text-shadow-title)',
    boxSizing: 'border-box',
  },
  windowInactive: {
    background: 'var(--xp-title-inactive)',
    color: 'var(--n-0)',
    borderRadius: 'var(--radius-window)',
    fontFamily: 'var(--font-ui)',
    fontWeight: 'var(--fw-bold)',
    fontSize: 'var(--fs-chrome)',
    textShadow: 'var(--text-shadow-title)',
    boxSizing: 'border-box',
  },
  field: {
    backgroundColor: 'var(--surface-window)',
    color: 'var(--ink-2)',
    marginTop: '-2px',
    fontWeight: 'var(--fw-regular)',
    boxSizing: 'border-box',
    borderRight: 'var(--frame-w) solid var(--xp-frame)',
    borderBottom: 'var(--frame-w) solid var(--xp-frame)',
    borderLeft: 'var(--frame-w) solid var(--xp-frame)',
  },
  closeBtn: {
    width: 'var(--hit-min)',
    height: 'var(--hit-min)',
    margin: '0 var(--sp-1)',
  },
  closeBtnGlyph: {
    color: 'var(--ink-on-color)',
    backgroundColor: 'var(--xp-close)',
    border: '1px solid var(--n-0)',
    borderRadius: 'var(--radius-control)',
    boxShadow: 'var(--shadow-btn-highlight)',
    width: 'var(--title-ctl)',
    height: 'var(--title-ctl)',
    fontSize: 'var(--fs-meta)',
    fontWeight: 'var(--fw-bold)',
    transition: 'background-color var(--dur-micro) var(--ease-out)',
  },
  navbar: {
    background: 'var(--xp-taskbar)',
  },
} satisfies Record<string, CSSProperties>

interface ThemeContextType {
  themeValues: typeof xpTheme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={{ themeValues: xpTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

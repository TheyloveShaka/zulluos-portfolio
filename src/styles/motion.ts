
export const durPress = 80
export const durMicro = 120
export const durFast = 180
export const durMinimise = 200
export const durObject = 220
export const durObjectReturn = 280
export const durHandoff = 240
export const durPen = 360
export const durDevelop = 560
export const durCaretBlink = 530
export const durCopied = 2000

export const staggerObject = 70
export const staggerIcon = 30

export const orbit1 = 18
export const orbit2 = 24
export const orbit3 = 30
export const orbit4 = 38

export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const easeLift: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const easeIn: [number, number, number, number] = [0.55, 0, 1, 0.45]
export const easeDraw: [number, number, number, number] = [0.65, 0, 0.35, 1]
export const easePress: [number, number, number, number] = [0.2, 0, 0, 1]

export const bootHandoff = {
  crossfade: durHandoff,
  taskbarRise: 120,
  aboutOpen: 300,
  polaroidsDevelop: 480,
  noteFade: 620,
  merlinAppears: 900,
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches


export const RAIL_CLEARANCE_PX = 216

export const MIN_RECOVERABLE_PX = 80

export interface Size {
  width: number
  height: number
}

export interface DocumentPosition {
  x: number
  y: number
}

export interface CanvasMetrics {
  width: number
  viewportHeight: number
}

export const getCanvasMetrics = (): CanvasMetrics => ({
  width: typeof window !== 'undefined' ? window.innerWidth : 1440,
  viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 900,
})

export const clampWindowPosition = (
  pos: DocumentPosition,
  size: Size,
  canvas: CanvasMetrics,
): DocumentPosition => {
  const maxX = Math.max(0, canvas.width - MIN_RECOVERABLE_PX)
  const minY = 0
  return {
    x: Math.min(Math.max(0, pos.x), maxX),
    y: Math.max(minY, pos.y),
  }
}

export const computeDefaultWindowPosition = (
  size: Size,
  cascadeIndex = 0,
): DocumentPosition => {
  const canvas = getCanvasMetrics()
  const railClearance = Math.min(RAIL_CLEARANCE_PX, Math.max(0, canvas.width - size.width))
  const availableWidth = Math.max(size.width, canvas.width - railClearance)
  const centeredX = railClearance + Math.max(0, (availableWidth - size.width) / 2)
  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0

  return clampWindowPosition(
    { x: centeredX + cascadeIndex * 24, y: scrollY + 24 + cascadeIndex * 24 },
    size,
    canvas,
  )
}

export const MERLIN_DOCK_MARGIN_X = 24
export const MERLIN_DOCK_MARGIN_Y_DESKTOP = 186
export const MERLIN_DOCK_MARGIN_Y_MOBILE = 150

export const clampToViewport = (pos: DocumentPosition, size: Size): DocumentPosition => {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900
  return {
    x: Math.min(Math.max(0, pos.x), Math.max(0, vw - size.width)),
    y: Math.min(Math.max(0, pos.y), Math.max(0, vh - size.height)),
  }
}

export const computeMerlinDockPosition = (size: Size): DocumentPosition => {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900
  const marginY = vw < 768 ? MERLIN_DOCK_MARGIN_Y_MOBILE : MERLIN_DOCK_MARGIN_Y_DESKTOP
  return clampToViewport(
    { x: vw - size.width - MERLIN_DOCK_MARGIN_X, y: vh - size.height - marginY },
    size,
  )
}

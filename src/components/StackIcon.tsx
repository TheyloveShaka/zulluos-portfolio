import type { SimpleIcon } from 'simple-icons'

const BODY_HEX = '#E3E3E3'

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(hexA: string, hexB: string): number {
  const lA = relativeLuminance(hexA)
  const lB = relativeLuminance(hexB)
  const lighter = Math.max(lA, lB)
  const darker = Math.min(lA, lB)
  return (lighter + 0.05) / (darker + 0.05)
}

const NEAR_BLACK_LUMINANCE = 0.02

export function isBrandColourLegible(hex: string): boolean {
  const luminance = relativeLuminance(hex)
  if (luminance < NEAR_BLACK_LUMINANCE) return false
  return contrastRatio(hex, BODY_HEX) >= 3
}

interface StackIconProps {
  icon: SimpleIcon
  className?: string
}

function StackIcon({ icon, className = '' }: StackIconProps) {
  const brandHex = `#${icon.hex}`
  const fill = isBrandColourLegible(brandHex) ? brandHex : 'var(--ink)'

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={18}
      height={18}
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} fill={fill} />
    </svg>
  )
}

export default StackIcon

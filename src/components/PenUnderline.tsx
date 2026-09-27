interface PenUnderlineProps {
  variant?: 'static' | 'hover'
  className?: string
}

function PenUnderline({ variant = 'static', className = '' }: PenUnderlineProps) {
  return (
    <svg
      className={`pen-underline pen-underline--${variant} ${className}`}
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 8.5 C 38 4.5, 82 10.5, 124 6.5 S 178 4, 198 7.5"
        pathLength={1}
      />
    </svg>
  )
}

export default PenUnderline

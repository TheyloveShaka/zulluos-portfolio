import { useState } from 'react'
import { TbCheck, TbCopy } from 'react-icons/tb'

interface CopyEmailActionProps {
  email?: string
  className?: string
}

const COPIED_HOLD_MS = 2000

function CopyEmailAction({ email, className = '' }: CopyEmailActionProps) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  if (!email) return null

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setFailed(false)
      setCopied(true)
      window.setTimeout(() => setCopied(false), COPIED_HOLD_MS)
    } catch {
      setFailed(true)
    }
  }

  return (
    <div className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1 font-ui text-small font-semibold text-luna-700 underline decoration-1 hover:text-luna-800 focus-visible:text-luna-800 active:text-luna-800 ${copied ? 'copy-email-pulse' : ''}`}
        style={{ minHeight: 'var(--hit-min)', textUnderlineOffset: '3px' }}
      >
        {copied ? <TbCheck aria-hidden="true" /> : <TbCopy aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy email'}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email address copied.' : ''}
      </span>
      {failed && (
        <span className="font-ui text-small text-danger">Copy failed. Email shown above.</span>
      )}
    </div>
  )
}

export default CopyEmailAction

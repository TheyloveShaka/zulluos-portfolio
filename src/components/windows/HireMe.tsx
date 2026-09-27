import { useState } from 'react'
import type { FormEvent } from 'react'
import { TbAlertCircle, TbCheck, TbCopy, TbMailForward } from 'react-icons/tb'
import Window from './Window'
import CopyEmailAction from '@components/CopyEmailAction'
import PenUnderline from '@components/PenUnderline'
import { useWindows } from '@contexts/WindowsContext'
import { profile } from '@/data/profile'

const OPENING_LINE =
  'Building a website, an AI-powered tool, or a system that needs to talk to another one?'
const AVAILABILITY = 'Kampala, Uganda · Available for work'

interface Service {
  title: string
  body: string
}

const SERVICES: Service[] = [
  {
    title: 'Web solutions.',
    body: 'I design and build websites and web apps, from a marketing site to a full product with logins, a database, and an admin dashboard.',
  },
  {
    title: 'LLM-powered applications and agents.',
    body: 'I build tools that use AI models to answer questions, automate a workflow, or act as an assistant inside your product.',
  },
  {
    title: 'Systems and integrations.',
    body: 'I connect the pieces, payments, data feeds, third-party APIs, so the tools you already use actually talk to each other.',
  },
  {
    title: 'Project leadership.',
    body: 'I plan the work, coordinate whoever’s building it alongside me, and stay accountable for it shipping.',
  },
]

const PROJECT_TYPES = [
  'Web solution',
  'LLM-powered app or agent',
  'Systems / integration',
  'Project leadership',
  'Something else',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormState = { name: string; email: string; projectType: string; budget: string; message: string }
const INITIAL_FORM: FormState = { name: '', email: '', projectType: PROJECT_TYPES[0], budget: '', message: '' }

function buildMailtoBody(form: FormState): string {
  return [
    'Hi Shaka,',
    '',
    'I\'m reaching out about a project.',
    '',
    `Name: ${form.name}`,
    `Project type: ${form.projectType || 'Not specified'}`,
    `Budget range: ${form.budget || 'Not specified'}`,
    '',
    form.message,
  ].join('\n')
}

function HireMe() {
  const { hireMeWindow } = useWindows()
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const [enquiryCopyState, setEnquiryCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  const emailHasError = (touched.email || submitAttempted) && !EMAIL_PATTERN.test(form.email.trim())
  const nameHasError = (touched.name || submitAttempted) && form.name.trim().length === 0
  const messageHasError = (touched.message || submitAttempted) && form.message.trim().length === 0

  const requiredFilled = form.name.trim() && form.email.trim() && form.message.trim()
  const emailConfigured = Boolean(profile.email)
  const submitDisabled = !emailConfigured || !requiredFilled

  const handleBlur = (field: keyof FormState) => setTouched((t) => ({ ...t, [field]: true }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)
    if (!emailConfigured || !requiredFilled) return
    if (!EMAIL_PATTERN.test(form.email.trim())) return

    const subject = `New project enquiry from ${form.name}`
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMailtoBody(form))}`
    window.location.href = mailto
    setStatus('success')
  }

  const handleCopyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(buildMailtoBody(form))
      setEnquiryCopyState('copied')
      window.setTimeout(() => setEnquiryCopyState('idle'), 2000)
    } catch {
      setEnquiryCopyState('failed')
    }
  }

  return (
    <Window window={hireMeWindow}>
      <div className="hire-me-content">
        <div className="hire-me__contact-col">
          <h2 className="hire-me__opening">{OPENING_LINE}</h2>
          <p className="hire-me__availability">
            <span aria-hidden="true" className="hire-me__dot" />
            {AVAILABILITY}
          </p>

          <h3 className="hire-me__services-heading">Services</h3>
          <ul className="hire-me__services">
            {SERVICES.map((service) => (
              <li key={service.title} className="hire-me__service">
                <span className="hire-me__service-title">{service.title}</span> {service.body}
              </li>
            ))}
          </ul>

          {profile.email ? (
            <div className="hire-me__direct-email">
              <span className="hire-me__direct-email-text" style={{ position: 'relative', display: 'inline-block' }}>
                {profile.email}
                <PenUnderline variant="static" />
              </span>
              <CopyEmailAction email={profile.email} />
            </div>
          ) : (
            <p className="hire-me__email-pending">
              Shaka&apos;s direct email is still being set up. In the meantime, reach him via
              LinkedIn or WhatsApp in the taskbar.
            </p>
          )}

          {profile.bookingUrl && (
            <a href={profile.bookingUrl} target="_blank" rel="noreferrer" className="hire-me__booking-link">
              Book a time to talk
            </a>
          )}
        </div>

        <div className="hire-me__form-col">
          <h3 className="hire-me__form-heading">Draft your enquiry</h3>

          {status === 'success' ? (
            <div className="hire-me__success" role="status" aria-live="polite">
              <TbMailForward aria-hidden="true" />
              <span>
                Draft opened in your email app. If it didn&apos;t, copy the email above and send
                it directly.
              </span>
            </div>
          ) : (
            <form className="hire-me__form" onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <label htmlFor="hire-name" className="field-label">Name</label>
                <input
                  id="hire-name"
                  className="field-input"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  onBlur={() => handleBlur('name')}
                  aria-invalid={nameHasError}
                  aria-describedby={nameHasError ? 'hire-name-error' : undefined}
                />
                {nameHasError && (
                  <span id="hire-name-error" className="field-error">
                    <TbAlertCircle aria-hidden="true" /> Name is required.
                  </span>
                )}
              </div>

              <div className="field-group">
                <label htmlFor="hire-email" className="field-label">Email</label>
                <input
                  id="hire-email"
                  className="field-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={emailHasError}
                  aria-describedby={emailHasError ? 'hire-email-error' : undefined}
                />
                {emailHasError && (
                  <span id="hire-email-error" className="field-error">
                    <TbAlertCircle aria-hidden="true" /> That email doesn&apos;t look right, check it and try again.
                  </span>
                )}
              </div>

              <div className="field-group">
                <label htmlFor="hire-project-type" className="field-label">Project type (optional)</label>
                <span className="field-select-wrap">
                  <select
                    id="hire-project-type"
                    className="field-select"
                    value={form.projectType}
                    onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </span>
              </div>

              <div className="field-group">
                <label htmlFor="hire-budget" className="field-label">Budget range (optional)</label>
                <input
                  id="hire-budget"
                  className="field-input"
                  type="text"
                  placeholder="Not sure yet is fine"
                  value={form.budget}
                  onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                />
              </div>

              <div className="field-group">
                <label htmlFor="hire-message" className="field-label">Message</label>
                <textarea
                  id="hire-message"
                  className="field-textarea"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  onBlur={() => handleBlur('message')}
                  aria-invalid={messageHasError}
                  aria-describedby={messageHasError ? 'hire-message-error' : undefined}
                />
                {messageHasError && (
                  <span id="hire-message-error" className="field-error">
                    <TbAlertCircle aria-hidden="true" /> Message is required.
                  </span>
                )}
              </div>

              <div className="hire-me__submit-row">
                <button type="submit" className="btn-primary" disabled={submitDisabled}>
                  Open email draft
                </button>
                <button type="button" className="btn-secondary" onClick={handleCopyEnquiry}>
                  {enquiryCopyState === 'copied' ? <TbCheck aria-hidden="true" /> : <TbCopy aria-hidden="true" />}
                  {enquiryCopyState === 'copied' ? 'Copied' : 'Copy enquiry'}
                </button>
              </div>
              {enquiryCopyState === 'failed' && (
                <span className="field-error">Copy failed. Try selecting the text instead.</span>
              )}

              <p className="hire-me__helper">
                {emailConfigured
                  ? 'Opens your email app. Nothing is sent from this website.'
                  : 'The direct email above is still being set up, so this button stays off until it is. LinkedIn and WhatsApp in the taskbar work right now.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </Window>
  )
}

export default HireMe

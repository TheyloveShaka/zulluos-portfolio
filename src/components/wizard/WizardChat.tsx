import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import type { Agent } from 'clippyts'

import { useWindows } from '@contexts/WindowsContext'
import { getWizardReply } from './wizardBrain'

interface ChatMessage {
  id: string
  from: 'merlin' | 'visitor'
  text: string
}

interface WizardChatProps {
  agentRef: MutableRefObject<Agent | null>
  onClose: () => void
  onMinimize: () => void
}

const STARTER: ChatMessage = {
  id: 'starter',
  from: 'merlin',
  text: 'Hi, I\'m Merlin! Ask me about Shaka\'s projects, skills, or how to reach him.',
}

const SUGGESTIONS = ['Projects', 'Skills', 'Contact', 'Tell me a joke']

let idCounter = 0
const nextId = () => `msg-${Date.now()}-${idCounter++}`

const WizardChat = ({ agentRef, onClose, onMinimize }: WizardChatProps) => {
  const { openOrFocusWindow } = useWindows()
  const [messages, setMessages] = useState<ChatMessage[]>([STARTER])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const respondTo = (text: string) => {
    const visitorMsg: ChatMessage = { id: nextId(), from: 'visitor', text }
    setMessages((prev) => [...prev, visitorMsg])
    setIsTyping(true)

    const delay = 400 + Math.random() * 500
    window.setTimeout(() => {
      const reply = getWizardReply(text)
      setIsTyping(false)
      setMessages((prev) => [...prev, { id: nextId(), from: 'merlin', text: reply.text }])

      const agent = agentRef.current
      if (agent) {
        if (agent.hasAnimation(reply.animation)) {
          agent.play(reply.animation)
        }
        agent.speak(reply.speak, false)
      }

      if (reply.action) {
        openOrFocusWindow(reply.action)
      }
    }, delay)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setInput('')
    respondTo(trimmed)
  }

  const handleSuggestion = (label: string) => {
    respondTo(label)
  }

  return (
    <div className="wizard-chat-root">
      <div className="wizard-chat">
        <div className="title-bar">
          <div className="title-bar-text">Ask Merlin</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onClick={onMinimize} type="button" />
            <button aria-label="Close" onClick={onClose} type="button" />
          </div>
        </div>

        <div className="window-body">
          <div className="wizard-chat-messages" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`wizard-chat-msg from-${m.from}`}>
                <div className="wizard-chat-avatar" aria-hidden="true">
                  {m.from === 'merlin' ? '🧙' : '🙂'}
                </div>
                <div className="wizard-chat-bubble">{m.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="wizard-chat-typing" aria-label="Merlin is typing">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="wizard-chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => handleSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>

          <form className="wizard-chat-inputrow" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Merlin something..."
              aria-label="Message to Merlin"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WizardChat

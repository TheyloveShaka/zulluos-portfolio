/**
 * wizardBrain.ts
 * --------------
 * Tiny, fully client-side "brain" for the Merlin chat widget. No backend,
 * no API calls — just keyword/fuzzy matching against a scripted intent list,
 * which is all a static GitHub Pages site can do.
 *
 * Matching strategy:
 *  - normalize(): lowercase + strip punctuation so "Who's Shaka?" and
 *    "who is shaka" match the same way.
 *  - Multi-word keywords ("who made you") are matched as substrings of the
 *    whole message and score higher (they're unambiguous).
 *  - Single-word keywords are matched against individual words, with a small
 *    Levenshtein-distance allowance so typos ("prjects", "conect") still hit.
 *  - The intent with the highest score wins; ties go to whichever intent is
 *    declared first in INTENTS (more specific intents are listed earlier).
 */

import { WindowKey } from '@contexts/WindowsContext'

export interface WizardIntent {
  id: string
  keywords: string[]
  responses: string[]
  /** Shorter lines for the speech balloon; falls back to responses if omitted. */
  speak?: string[]
  /** clippyts animation name to play alongside the reply. */
  animation: string
  /** Optional site action: opens a desktop window via WindowsContext. */
  action?: WindowKey
}

export interface WizardReply {
  text: string
  speak: string
  animation: string
  action?: WindowKey
}

export const normalize = (input: string): string =>
  input
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const levenshtein = (a: string, b: string): number => {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const dp: number[] = new Array(n + 1)
  for (let j = 0; j <= n; j++) dp[j] = j
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j]
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1])
      prev = tmp
    }
  }
  return dp[n]
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const INTENTS: WizardIntent[] = [
  {
    id: 'who-made-you',
    keywords: ['who made you', 'who created you', 'who are you', 'what are you', 'your creator', 'are you clippy', 'are you an ai'],
    responses: [
      'I\'m Merlin, a Microsoft Agent from 1997, resurrected via clippyts. I used to help people with Word documents; now I help people find Shaka\'s contact info.',
      'I\'m Merlin — a Microsoft Office Assistant, brought back from the dead via a library called clippyts. No paperclip cousins were harmed in the making of this portfolio.',
    ],
    speak: ['I\'m Merlin, a Microsoft Agent from 1997, resurrected via clippyts.'],
    animation: 'DoMagic1',
  },
  {
    id: 'what-is-this-site',
    keywords: ['what is this site', 'what is this', 'what is zulluos', 'what am i looking at', 'this website', 'this os', 'explain this site'],
    responses: [
      'This is ZulluOS — a Windows XP desktop, faithfully remade in the browser as Shaka\'s portfolio. It\'s adapted from kisimoff.com by Valentin Kisimov, with full credit.',
      'You\'re looking at ZulluOS: an XP-flavored desktop that doubles as a portfolio site. Double-click around, open some windows, maybe don\'t format the C: drive.',
    ],
    speak: ['This is ZulluOS: an XP desktop remade as Shaka\'s portfolio.'],
    animation: 'Explain',
  },
  {
    id: 'joke',
    keywords: ['joke', 'tell me a joke', 'funny', 'make me laugh', 'jokes'],
    responses: [
      'Why did the developer go broke? Because he used up all his cache.',
      'There are only 10 types of people: those who understand binary, and those who don\'t.',
      'I told my code a joke about UDP. It might have gotten it, I\'m not sure it got a response.',
      'Why do astronauts break up? They need space.',
      'Windows XP never dies, it just Blue Screens of Death and comes back stronger.',
    ],
    animation: 'GetAttention',
  },
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'yo', 'sup', 'howdy', 'greetings'],
    responses: [
      'Hello there! I\'m Merlin. Ask me about Shaka\'s projects, skills, or how to reach him.',
      'Hey! Welcome to ZulluOS. Poke around, or ask me a question — that\'s what I\'m here for.',
      'Howdy! Try asking who built this thing, or what he\'s been working on.',
    ],
    animation: 'Greet',
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'thx', 'appreciate it', 'cheers'],
    responses: [
      'Anytime! That\'s what I\'m digitally resurrected for.',
      'You\'re welcome! Let me know if there\'s anything else you\'d like to know.',
    ],
    animation: 'Congratulate',
  },
  {
    id: 'bye',
    keywords: ['bye', 'goodbye', 'see ya', 'later', 'cya', 'gotta go'],
    responses: [
      'See you around! Feel free to click me again if you have more questions.',
      'Goodbye! I\'ll be right here, doing my little idle animations, if you need me.',
    ],
    animation: 'Wave',
  },
  {
    id: 'story',
    keywords: ['story', 'origin story', 'how did he start', 'why does he code', 'his journey', 'how did he get into this'],
    responses: [
      'A long time ago, Shaka touched a computer to make it do something he wanted — and it worked. His life was never the same. Everything since has been about recreating that magical moment.',
    ],
    speak: ['He touched a computer, made it do something he wanted, and never stopped chasing that feeling.'],
    animation: 'Thinking',
  },
  {
    id: 'skills',
    keywords: ['skills', 'skillset', 'tech stack', 'technologies', 'what can he do', 'what does he know', 'stack', 'expertise'],
    responses: [
      'Shaka works across React/TypeScript frontends, AI engineering (LLM apps and agents), and Python & data. Basically: he builds the interface, the brains behind it, and the pipes that feed it.',
    ],
    speak: ['React/TypeScript, AI engineering with LLM apps and agents, plus Python and data.'],
    animation: 'Explain',
  },
  {
    id: 'venue-menu',
    keywords: ['venue menu', 'wedding platform', 'kampala venues', 'uganda project', 'wedding venue'],
    responses: [
      'The Venue Menu is Uganda\'s wedding & venue discovery platform, built with React 19, Supabase, Tailwind, and deployed on Vercel. It helps Kampala couples find the right venue for their big day.',
    ],
    speak: ['The Venue Menu: Uganda\'s wedding venue discovery platform, built with React and Supabase.'],
    animation: 'Explain',
    action: 'projects',
  },
  {
    id: 'zulluos-project',
    keywords: ['zulluos project', 'this portfolio', 'xp desktop', 'kisimoff', 'how was this site built'],
    responses: [
      'ZulluOS is this very portfolio — an XP desktop remake adapted from kisimoff.com by Valentin Kisimov, with full credit to the original. I live here as the built-in assistant.',
    ],
    speak: ['ZulluOS is this portfolio itself — an XP remake adapted from kisimoff.com.'],
    animation: 'Explain',
    action: 'projects',
  },
  {
    id: 'projects',
    keywords: ['projects', 'portfolio', 'show projects', 'show me projects', 'what has he built', 'his work', 'what did he build'],
    responses: [
      'Opening his Projects folder now. Highlights: The Venue Menu (a wedding venue platform for Kampala) and ZulluOS (this very desktop you\'re using).',
    ],
    speak: ['Opening Projects — The Venue Menu and ZulluOS are the highlights.'],
    animation: 'Announce',
    action: 'projects',
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach him', 'get in touch', 'hire him', 'linkedin', 'twitter', 'github', 'reach out', 'contact info'],
    responses: [
      'You can find Shaka on GitHub at github.com/TheyloveShaka, or email him at shakanathan.z@gmail.com. LinkedIn and X are coming soon.',
    ],
    speak: ['GitHub: github.com/TheyloveShaka, or email shakanathan.z@gmail.com.'],
    animation: 'Suggest',
  },
  {
    id: 'about',
    keywords: ['about', 'who is shaka', 'shaka', 'nathan', 'who built this', 'developer', 'who made this site', 'bio', 'tell me about him'],
    responses: [
      'Shaka Nathan K — Developer & AI Engineer, based in Kampala, Uganda. GitHub handle: TheyloveShaka. I\'m opening the About window for the full picture.',
    ],
    speak: ['Shaka Nathan K — Developer and AI Engineer, based in Kampala, Uganda.'],
    animation: 'Announce',
    action: 'about',
  },
  {
    id: 'interests',
    keywords: ['interests', 'hobbies', 'comic', 'astrophysics', 'movies', 'anime', 'gaming', 'sports', 'free time', 'what does he like'],
    responses: [
      'Outside of code: comic books, astrophysics, music, movies & anime, gaming, and sports. A well-rounded nerd, if you ask me.',
    ],
    speak: ['Comic books, astrophysics, music, movies and anime, gaming, and sports.'],
    animation: 'Pleased',
  },
  {
    id: 'terminal',
    keywords: ['terminal', 'cmd', 'command line', 'console', 'open terminal', 'shell'],
    responses: ['Opening the terminal for you. Try typing \'help\' once it\'s up.'],
    speak: ['Opening the terminal for you.'],
    animation: 'Writing',
    action: 'terminal2',
  },
  {
    id: 'music',
    keywords: ['music', 'winamp', 'play music', 'song', 'playlist', 'play a song'],
    responses: ['It really whips the llama\'s ass. Opening Winamp now.'],
    speak: ['Opening Winamp — it really whips the llama\'s ass.'],
    animation: 'Announce',
    action: 'winamp',
  },
]

const FALLBACK_RESPONSES = [
  'I\'m not sure I follow. Try asking about Shaka\'s projects, skills, or how to contact him.',
  'Hmm, that one\'s outside my scripted knowledge. Ask me about his projects, his skills, or say hi!',
  'I only know a handful of tricks. Try: "what are your skills", "show me your projects", or "how do I contact you".',
]

export const getWizardReply = (rawMessage: string): WizardReply => {
  const normMsg = normalize(rawMessage)
  const words = normMsg.split(' ').filter(Boolean)

  let best: WizardIntent | null = null
  let bestScore = 0

  for (const intent of INTENTS) {
    let score = 0
    for (const kw of intent.keywords) {
      const nkw = normalize(kw)
      if (nkw.includes(' ')) {
        if (normMsg.includes(nkw)) score += nkw.split(' ').length * 3
      } else if (words.includes(nkw)) {
        score += 2
      } else {
        const threshold = nkw.length > 5 ? 2 : 1
        for (const w of words) {
          if (Math.abs(w.length - nkw.length) <= 2 && levenshtein(w, nkw) <= threshold) {
            score += 1
            break
          }
        }
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = intent
    }
  }

  if (!best || bestScore === 0) {
    const text = pick(FALLBACK_RESPONSES)
    return { text, speak: text, animation: 'Confused' }
  }

  const text = pick(best.responses)
  const speak = best.speak ? pick(best.speak) : text
  return { text, speak, animation: best.animation, action: best.action }
}

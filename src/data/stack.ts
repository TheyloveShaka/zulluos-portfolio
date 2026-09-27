import {
  siClaude,
  siD3,
  siEslint,
  siGreensock,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPreact,
  siPython,
  siReact,
  siReactrouter,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

export interface StackItem {
  name: string
  icon?: SimpleIcon
}

export interface StackGroup {
  id: 'frontend' | 'backend' | 'ai' | 'leadership' | 'quality'
  label: string
  items: StackItem[]
}

export const stack: StackGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', icon: siReact },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'Vite', icon: siVite },
      { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'React Router', icon: siReactrouter },
      { name: 'Preact', icon: siPreact },
      { name: 'GSAP', icon: siGreensock },
      { name: 'D3.js', icon: siD3 },
      { name: 'Zustand' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Supabase', icon: siSupabase },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'Node.js', icon: siNodedotjs },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    items: [
      { name: 'Claude', icon: siClaude },
      { name: 'OpenAI API' },
      { name: 'Python', icon: siPython },
      { name: 'LLM apps and agents' },
    ],
  },
  {
    id: 'leadership',
    label: 'Leadership',
    items: [
      { name: 'Project planning and delegation' },
      { name: 'Requirements and specs' },
      { name: 'Client communication' },
      { name: 'Technical documentation' },
    ],
  },
  {
    id: 'quality',
    label: 'Quality',
    items: [
      { name: 'ESLint', icon: siEslint },
      { name: 'Playwright' },
      { name: 'Accessibility audits (WCAG AA)' },
      { name: 'Visual regression testing' },
    ],
  },
]

export const brandedTools = stack.flatMap(group => group.items.filter((item): item is Required<StackItem> => Boolean(item.icon)))

// Project card definitions for the Projects window.
//
// Each card renders either a static poster image or a looping video preview
// (video takes priority if both are present — see ProjectShowcase.tsx).
// Keeping `video` in the shape even though every current entry only sets
// `poster` means we don't have to touch this type again once real preview
// clips exist for a project.

import venueMenuPoster from '@assets/projects/venue-menu.svg'
import zulluOsPoster from '@assets/projects/zulluos.svg'
import placeholder3Poster from '@assets/projects/placeholder-3.svg'
import placeholder4Poster from '@assets/projects/placeholder-4.svg'

export interface ProjectData {
  id: string
  title: string
  description: string
  technologies: string
  poster: string
  video?: string
  repo?: string
  live?: string
}

export const projects: ProjectData[] = [
  {
    id: 'the-venue-menu',
    title: 'The Venue Menu',
    poster: venueMenuPoster,
    description:
      'Uganda\'s wedding & introduction-ceremony venue discovery platform. Curated venues and vendors across 13 categories, with an admin dashboard, a Google Places data pipeline, and AI-enriched listings.',
    technologies: 'React 19, TypeScript, Vite, Tailwind, Supabase, Zustand, Vercel',
    live: 'https://the-venue-menu.vercel.app',
    repo: 'https://github.com/TheyloveShaka/TheVenueMenu',
  },
  {
    id: 'zulluos',
    title: 'ZulluOS (this site)',
    poster: zulluOsPoster,
    description:
      'The XP-style portfolio you are inside right now: a boot screen, draggable windows, an xterm-powered terminal, a Winamp player, and a Merlin AI wizard assistant.',
    technologies: 'React, TypeScript, Vite, clippyts, XP.css',
    repo: 'https://github.com/TheyloveShaka/zulluos-portfolio',
  },
  {
    id: 'project-3',
    title: 'Project #3 — loading…',
    poster: placeholder3Poster,
    description: 'Something is compiling here. Check back soon.',
    technologies: '',
  },
  {
    id: 'project-4',
    title: 'Project #4 — loading…',
    poster: placeholder4Poster,
    description: 'Something is compiling here. Check back soon.',
    technologies: '',
  },
]

# Progress

Plan: `C:\Users\DELL\.claude\plans\were-going-to-do-sparkling-flute.md`. Branch: `overhaul/xp-premium`.

## Status (2026-09-24)

- Phase 0 references: done, answered, recorded in `REFERENCES.md`.
- Phase 1: done. `ART-DIRECTION.md`, `UX-SPEC.md`, `src/styles/tokens.css` (not imported yet) and `src/assets/textures/grain.png` all exist.
- Astra: done. $0.15, memo at `docs/ASTRA-DIRECTION.md`. Month to date is $11.18.
- Shaka decided (see DECISIONS.md): 0.9s boot, Merlin silent until clicked, Fira Sans Bold title bars, green buttons.
- Phase 2 Batch 1a: done and verified by the lead at 1440x900. About renders 625px wide, scrollHeight is 900, icons are visible, only token fonts are in use, and focus lands in About. Content drafts are in `docs/COPY.md` and `src/data/caseStudies.ts`.
- Bug found: a second open tab makes ZenFS IndexedDB configure fail, which blanks the app. Assigned to Batch 1b.
- Hero PASSED the lead's Law 7 review after two revision rounds (screenshots in docs/shots/approve-*).
- Shaka approved the hero with tweaks: one photo, smaller note, desktop-first layout at every width, wrapping files, Merlin visible, Instagram and WhatsApp, the reference's animated grain copied exactly. The tweak round is running (kaga-frontend-engineer, sonnet, cap 60). Batch 2 starts after it passes.
- Hero tweak round passed the lead's review (docs/shots/tweak2-*). The lead fixed icon order inline (App.tsx sort by defaultIconPositions).
- The lead added `simple-icons` (the Claude logo, official hex colours) and wrote `src/data/stack.ts` (Claude added to AI).
- Phase 2 Batch 2 running in parallel:
  - kaga-frontend-engineer (sonnet, cap 80): Case Studies folder and viewer, Hire Me form, My Approach, About stack, orbit band.
  - kaga-motion-engineer (sonnet, cap 45): SkillsOrbit component. The lead mounts it into #orbit-band afterwards.
- Sweep owed by P9: narrating comments that agents added across src (Law 4).
- Batch 2 built. Lead review passed for the Case Studies folder, the viewer, Hire Me and Approach (docs/shots/b2-*). The orbit is mounted in OrbitBand by the lead; the hemisphere-clip fix is back with the motion engineer.
- Privacy ASK: The Venue Menu summary names a real person ("Kaga Gardens' Hellen Mugisha"). Confirm with Shaka before it ships.
- Batch 2 is complete. The orbit hemisphere fix was verified by the lead (docs/shots/orbit3-1440.png).
- Batch 3 running in parallel:
  - Merlin reproduce, fix and dockable window (kaga-frontend-engineer, sonnet, cap 70)
  - walkthrough videos (general-purpose, sonnet, cap 90; named deviation: tooling work outside the crew table), outputs to public/case-studies/<id>/
- Videos: all 7 recorded and silent, under 2MB each. The lead fixed The Venue Menu live URL to https://the-venue-menu.vercel.app (thevenuemenu.ug does not resolve) and recorded it. Posters failed review (mid-scroll frames), so they are being re-recorded with hero-screenshot posters and clips that start at the hero.
- Merlin: done and verified by the lead (docs/shots/merlin-1440.png).
  - Root cause: the trailing click after a drag hit a toggle handler.
  - The chat is now the `merlinChat` window with a taskbar button.
  - The agent ran 149 calls against a cap of 70.
- Posters: re-recorded as hero screenshots, and clips now start on the hero. The lead reviewed docs/shots/posters-sheet.png and all 7 are clean. Batch 3 is complete.
- P9 integrator: DONE. 1,096 narrating comments removed, 102MB of dead media and 6 unused packages removed, lint at 0 errors, mobile task buttons, Merlin clamped and re-skinned on tokens, DOCUMENTATION.md rewritten.
- Audits RUNNING: kaga-uat-agent (sonnet) writes docs/UAT-REPORT.md and includes the launch-check items; kaga-art-director (opus) writes docs/DESIGN-AUDIT.md. P7 security remains a named deferral.
- Open for Shaka: title bar 13px vs the approved 19px, whether the site email is shakanathan.z@gmail.com, and whether Hellen Mugisha's name can be shown.
- P9 integrator list:
  - sweep narrating comments across src (Law 4)
  - remove dead code: projects.ts, ProjectShowcase.tsx, Icon.tsx and dark-theme branches, src/background legacy videos, public/index.html, output.css, theme.ts
  - show taskbar buttons on mobile, icon-only (App.css hides .nav-icon-task under 768px, so minimised windows are unrecoverable)
  - clamp the Merlin sprite inside the viewport
  - use a proper Merlin taskbar icon
  - refresh DOCUMENTATION.md
  - unify spacing, motion and copy voice
- Also check whether dist/ is tracked in git.
- Lead did inline (named): two one-line CSS fixes (clippy `display:none !important` below 768px, polaroid `min-height`), removed two narrating comments, and did an em-dash sweep of src.
- Batch 1b history: built About sales page, note, polaroids, grain, PenUnderline and ZenFS fail-soft, then failed the first Law 7 review with 9 issues:
  - icons drawn over About
  - taskbar at the top on tablet and mobile
  - broken polaroid images
  - captions spilling out of the frames
  - mobile icon grid
  - Merlin covering the CTA
  - close button
  - About width
  - cluster rule below 1200px
  
  The revision round is with the same agent, capped at 60 calls. Screenshot script: `node scripts/qa/shots.cjs <url> <tag>` writes to docs/shots/.
- Named deviation: polaroid hover and develop are built by the frontend engineer as spec'd CSS transitions. The motion engineer is kept for the orbit.

## Next

Phase 2, batch 1, the hero: boot, scroll shell, About as the sales page, note, polaroids, grain, fonts and tokens wired, ZulluOS sweep. Law 7 screenshots, then Shaka approves before batch 2.

## Waiting on Shaka (also: resume PDF, since the Resume icon opens '#', budget bands in UGX, Instagram and WhatsApp)

1. School and degree, years building, roles held (for the About paragraph).
2. Email, LinkedIn URL, booking link.
3. Live URL per case study, and confirmation of which ones are concepts.
4. Three photos plus captions.

## 2026-09-25 Close-out

- The build is done on branch overhaul/xp-premium, uncommitted. The QA scripts pass: shots errors=0 at 4 sizes, case windows with no ASK text and no em dash, Merlin 24/24.
- Still waiting on Shaka: photos, resume PDF, booking link, the real LinkedIn, Instagram and WhatsApp URLs, UGX budget bands, the school and experience paragraph, and Frozen Basket's concept status.
- Next: commit, deploy (Vercel), the P7 security audit once Hire Me is wired.

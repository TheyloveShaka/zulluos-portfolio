# Decisions

One line per settled decision. Reopening one means arguing against the record.

- 2026-09-24 Track C (feature/update on own codebase). Opus 5.5 leads, Sonnet agents build.
- 2026-09-24 Scope is UI/UX only. No backend, deploy, or quote this round.
- 2026-09-24 The current About text is the master copy. The only addition inside it is the closing quote.
- 2026-09-24 Boot goes straight into the typed diagnostic boot, then the desktop. Power-button screen removed. fastBoot kept.
- 2026-09-24 About auto-opens on arrival and renders all at once, no typewriter.
- 2026-09-24 The desktop scrolls, continuing below the fold. Taskbar and wallpaper stay fixed. Windows move with the page and open in the current viewport.
- 2026-09-24 First screen: icons left, About open, 3 placeholder polaroids top-right, sticky note beneath them.
- 2026-09-24 Skills orbit is a desktop widget below the fold.
- 2026-09-24 Role line: "Developer · AI Engineer · Project Lead".
- 2026-09-24 Quote: "If it can be done, I'll do it. Even if it can't, I'll do my best and have fun trying." Used on the note and as the About closer.
- 2026-09-24 Case studies: Kamwe Forex, UWA, Frozen Basket, Premium Liquor, Nineteen Twenty-One Flowers, The Venue Menu, Hotel site.
- 2026-09-24 Concept badge wording: "Redesign concept · A direction I proposed for this brand, not their current live site."
- 2026-09-24 Projects and Case Studies merge into one Case Studies folder. Services live inside Hire Me. My Approach is a Notepad-style essay window.
- 2026-09-24 Every ZulluOS mention is removed, and so is the GitLab icon beside GitHub.
- 2026-09-24 Photos are placeholders until Shaka supplies them.
- 2026-09-24 Walkthrough videos are real screen recordings of live sites (Playwright plus ffmpeg, silent), not AI-generated video.
- 2026-09-24 P7 security audit deferred until Hire Me is wired: no data leaves the browser this round. Named deviation.
- 2026-09-24 Art direction per ART-DIRECTION.md: Luna chrome, premium layer inside documents, "the pen on the machine" signature. Fira Sans / Bricolage Grotesque / Caveat / Fira Mono, all via @fontsource.
- 2026-09-24 Boot: about 0.9s of typed diagnostics, then a 120ms desktop reveal. Skip boot control from the first frame (Esc / Enter). fastBoot and reduced motion go straight to the desktop. (Shaka chose Astra's 900ms over the 2400ms recommendation.)
- 2026-09-24 Merlin is silent until clicked. No greeting balloon, no idle animation loop. The greeting becomes the first chat message.
- 2026-09-24 Title bars use Fira Sans Bold. trebuc.ttf is retired (unlicensed for web).
- 2026-09-24 Primary buttons are XP Start green.
- 2026-09-24 Hire Me submit is "Open email draft" via mailto. Never "Message sent".
- 2026-09-24 Hero approved with tweaks. The layout is the same at every width: files in a left column, ONE photo of Shaka top-right with a smaller note below it, and About as a floating window over the desktop (on mobile too; the mobile shortcut row is removed). Merlin stays visible in the bottom-right corner at every width, beneath windows.
- 2026-09-24 Files always stay visible. When the column runs out of height they wrap into another column, or continue below the hero area on narrow screens.
- 2026-09-24 The note reads "Web solutions · Systems · AI products · Project leadership".
- 2026-09-24 Taskbar socials: LinkedIn, GitHub, Instagram, WhatsApp. Instagram and WhatsApp show now with placeholder URLs in src/data/profile.ts (instagram.com, wa.me). The real handle and number are an ASK, and are a launch blocker until replaced.
- 2026-09-24 Grain copies aashishthakuri.com exactly, overriding ART-DIRECTION's 0.05 static grain at Shaka's instruction. A global fixed layer (200% size, offset -50%) uses a 192px black-and-white salt-and-pepper tile (mean alpha about 0.053), opacity 0.8, animated `0.5s steps(6) infinite` with his translate keyframes. Grey containers carry the same tile at 224px, opacity 0.42, multiply. The texture is our own, generated to match his statistics; his file is never copied. Reduced motion stops the animation.
- 2026-09-24 Claude is added to the AI stack group.
- 2026-09-24 Merlin click vs drag uses a 4px distance threshold, matching Window.tsx. This supersedes UX-SPEC's 6px/400ms. A click always opens or focuses the chat and never toggles it closed.
- 2026-09-24 The Venue Menu live URL is https://the-venue-menu.vercel.app (as in the About master copy). thevenuemenu.ug does not resolve.
- 2026-09-24 Walkthrough videos are real scroll-through recordings of each project (live URL for The Venue Menu, local builds for the rest), silent, under 2MB. Posters are hero screenshots.
- 2026-09-25 Window titles stay 13px (true XP). Site email is shakanathan.z@gmail.com. The Venue Menu credits Kaga Gardens by business name only, with no personal name.
- 2026-09-25 The full UAT and design-integrity audit agents were stopped at Shaka's request to cut token spend. They are replaced by the scripted QA pass (shots.cjs, case-windows-b2.cjs, merlin.cjs, all passing). Named deviation.

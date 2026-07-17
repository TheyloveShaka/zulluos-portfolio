# ZulluOS — Documentation

Technical documentation for [ZulluOS](README.md), the Windows-XP-style portfolio of **Shaka Nathan K**. This covers how the app is put together, where the content lives, how to customize it, and what's planned next.

> Adapted from [Valentin Kisimov's open-source portfolio](https://github.com/kisimoff/portfolio) — see [Credits](README.md#credits).

---

## 1. Project structure

```
src/
├── App.tsx                    # Root component: desktop icons + all windows + Merlin
├── App.css                    # Global styles, theme colors, desktop layout
├── components/
│   ├── Navbar.tsx             # Bottom taskbar: "Zullu OS" wordmark, theme toggle, socials
│   ├── Icon.tsx / IconTask.tsx# Desktop icons and taskbar entries
│   ├── logoBootAnimation.tsx  # SVG boot-logo animation (click to enter)
│   ├── theEye.tsx             # The HAL-9000-style eye on the desktop
│   ├── screens/
│   │   ├── LoadingScreen.tsx  # Boot sequence: logo → BIOS text → CPU portal video
│   │   └── Desktop.tsx
│   ├── windows/               # Each XP window: About, Projects, Credits, Start,
│   │   │                      # DeviceInfo, Winamp, Xterm (terminal)
│   │   └── Window.tsx         # Shared draggable-window wrapper
│   └── wizard/                # Merlin assistant (see §5)
│       ├── Wizard.tsx         # Loads the clippyts Merlin agent, gates on boot
│       ├── WizardChat.tsx     # "Ask Merlin" XP chat window
│       ├── wizardBrain.ts     # Scripted intent-matching engine (the "AI")
│       └── wizard.css         # XP.css chrome scoped under .wizard-chat
├── contexts/                  # WindowsContext (open/close/focus windows),
│                              # ThemeContext (dark ↔ XP Bliss), AnimationsContext
├── data/
│   └── projects.ts            # ← Single source of truth for project cards
├── utils/
│   ├── terminalCommandProcessor.ts  # Terminal commands (help, whoami, skills…)
│   └── zenFs.ts               # In-browser virtual filesystem (ZenFS)
└── assets/, img/, music/      # Posters, icons, avatar, Winamp tracks
public/
└── assets/agents/Merlin.js    # Merlin sprite data (see §5, "the Vite gotcha")
```

## 2. Boot flow

1. `LoadingScreen.tsx` renders the boot logo (`logoBootAnimation.tsx`). Clicking it starts the BIOS-style text sequence and the CPU-portal video.
2. When the portal finishes, the boot overlay (`#bootRoot`) is removed from the DOM and the desktop (icons, navbar, eye) animates in.
3. The terminal command `fastboot on` persists a flag (via ZenFS/localStorage) that skips the boot sequence on future visits; `fastboot off` restores it.
4. Merlin waits for `#bootRoot` to disappear (MutationObserver + 20s safety timeout) before appearing — see `useDesktopReady()` in `Wizard.tsx`.

## 3. Theming — and the pink-to-blue story

The upstream site used a magenta/pink palette. ZulluOS is blue. Three kinds of color had to move:

- **CSS colors** — `--accent-color` in `App.css` (`#2f71cd`), the navbar gradient, and the xterm terminal background (`#0a1a33` in `terminalCommandProcessor.ts`).
- **Baked-in video** — the CPU circuit-board background (`cpuLoop.mp4` / `cpuPortal.mp4`) is rendered magenta *inside the video file*. Rather than re-render the videos, `.video-background` and `.theEye` carry `filter: hue-rotate(-115deg)`, which shifts magenta (≈330°) to blue (≈215°) at zero runtime cost.
- **Already blue** — the XP "Bliss" wallpaper and the XP window chrome needed no change.

The theme toggle in the navbar switches between the dark desktop and the classic XP look (`ThemeContext.tsx`).

## 4. Content — where to edit what

| Content | File |
|---|---|
| About story (typewriter) | `src/components/windows/About.tsx` |
| About avatar | `src/img/shaka-avatar.svg` (placeholder — swap for a photo) |
| Project cards | `src/data/projects.ts` |
| Project posters | `src/assets/projects/*.svg` |
| Terminal identity & commands | `src/utils/terminalCommandProcessor.ts` (`user`, `machine`, `whoami`, `skills`, `socials`) |
| Social links | `src/components/Navbar.tsx` and `src/components/windows/Start.tsx` |
| Merlin's knowledge base | `src/components/wizard/wizardBrain.ts` |
| Credits | `src/components/windows/Credits.tsx` |
| Winamp playlist | `src/music/` + `src/components/windows/Winamp.tsx` |

**Adding a project** is one entry in `projects.ts`:

```ts
{
  id: 'my-project',
  title: 'My Project',
  description: 'What it does and why it matters.',
  technologies: 'React, Python, …',
  poster: myPosterImport,        // static image; `video` is also supported
  repo: 'https://github.com/TheyloveShaka/my-project',
  live: 'https://my-project.example.com',
}
```

## 5. Merlin, the wizard assistant

Merlin is the genuine 1997 Microsoft Agent character, resurrected via [`clippyts`](https://www.npmjs.com/package/clippyts). The package is fully self-contained (sprite sheets are embedded base64 data-URIs), so he works on any static host with no CDN.

**Architecture** — three layers, all in `src/components/wizard/`:

1. **`Wizard.tsx`** — loads the agent once (guarded against React StrictMode double-mounting), positions him bottom-right, plays greeting/idle animations, and toggles the chat when he's clicked.
2. **`WizardChat.tsx`** — the "Ask Merlin" window: message list, typing indicator, suggestion chips, input. Replies also trigger `agent.speak()` + a fitting animation, and some intents perform *site actions* (opening the Projects/About/terminal/Winamp windows through `WindowsContext`).
3. **`wizardBrain.ts`** — a dependency-free scripted engine: normalizes input, scores ~17 intents (weighted multi-word keyword matches + Levenshtein typo tolerance for single words), picks a random response from the matched intent, falls back to suggestions. **No API, no backend, no cost** — by design, so the site runs free on static hosting.

**The Vite gotcha (important if you upgrade clippyts or add agents):** clippyts loads agents with a template-literal dynamic import that Rollup can't statically resolve. In production the browser literally requests `/assets/agents/Merlin.js`. Two things make this work: a copy of that file lives in `public/assets/agents/`, and `vite.config.ts` has `optimizeDeps.exclude: ['clippyts']` so dev mode resolves it correctly too. If you add another character (Clippy, Bonzi, Genie…), copy its file from `node_modules/clippyts/dist/agents/` into `public/assets/agents/`.

**Styling:** `wizard.css` contains XP.css window/button/input/scrollbar rules extracted from [`xp.css`](https://github.com/botoxparty/XP.css) and re-scoped under `.wizard-chat`. XP.css is deliberately **not** imported globally — it styles bare `button`/`input` elements and would break the site's custom XP look.

**Stacking gotcha:** the chat window (`.wizard-chat-root`, z-index 2147483100) must stay *above* Merlin's `.clippy` element (2147483000). They overlap in the bottom-right corner, and at equal z-index Merlin's DOM node swallows clicks meant for the Send button.

## 6. Terminal

`Xterm.tsx` hosts an xterm.js terminal backed by a ZenFS in-browser filesystem. Commands live in `terminalCommandProcessor.ts`: standard shell fare (`ls`, `cd`, `mkdir`, `cat`, `echo`…), system fun (`neofetch`, `deviceinfo` with real client data), boot control (`fastboot`, `restart`), and identity commands (`whoami`, `skills`, `socials`). Prompt: `shaka@VOYAGER1`.

## 7. Build & deployment

```bash
npm run dev       # dev server
npm run build     # production build → dist/
npm run preview   # serve dist/ locally
npm run lint      # ESLint (some pre-existing upstream warnings remain)
```

- **Vercel** (recommended): import the repo at vercel.com/new — works with zero config, like The Venue Menu.
- **GitHub Pages**: `npm run deploy` publishes `dist/` via `gh-pages`, **but** the site would be served from `/zulluos-portfolio/`, so `vite.config.ts` needs `base: '/zulluos-portfolio/'` first. Without it, all assets 404.

## 8. Known limitations

- LinkedIn / X / Instagram links are `href="#"` placeholders (marked with `TODO` comments).
- The About avatar is a placeholder SVG, and the Resume button points nowhere yet.
- The Winamp playlist still contains the MP3 tracks inherited from the upstream repo — replace with royalty-free/owned tracks before promoting the repo.
- Projects #3 and #4 are intentional "coming soon" placeholder cards.
- Merlin's chat is scripted; it does not understand free-form questions outside its intents (that's the free-hosting trade-off — see Future Work).

## 9. Future work

Roughly in priority order:

1. **Fill the placeholders** — real LinkedIn/X/Instagram URLs, a real photo in the About window, a hosted resume PDF for the Resume icon, and real projects in slots #3/#4 (Lulimi-Lingo is a candidate once it has a README).
2. **Deploy + custom domain** — Vercel deploy, then a proper domain; re-add a `CNAME`/redirect once chosen.
3. **Give Merlin a real brain (optional)** — swap `wizardBrain.ts` for a Claude API call behind a Vercel serverless function (keeps the key server-side). The scripted brain stays as offline fallback. Cost: fractions of a cent per chat with a small model.
4. **Spotify "now playing"** — needs OAuth + a token-refresh backend, so it depends on the Vercel move: a serverless function can expose a `/api/now-playing` endpoint the desktop can poll, rendered as an XP tray widget.
5. **Own the music** — replace inherited MP3s with a royalty-free playlist themed to taste (see §8).
6. **Mobile polish** — the wizard chat already becomes a bottom sheet ≤600px; the window system itself deserves a proper small-screen audit.
7. **Performance** — the main JS bundle is ~1.9MB minified (webamp and xterm are heavy); code-split them with dynamic `import()` so they only load when the Winamp/terminal windows open.
8. **More desktop toys** — Minesweeper or Solitaire clone, a "My Computer" window listing real repos via the GitHub API, screensaver after idle (astrophysics-themed, obviously).
9. **CI** — a GitHub Action running `npm run build` + `npm run lint` on push, and auto-deploy on main.
10. **Lint cleanup** — burn down the pre-existing upstream ESLint errors (mostly `any` types and unused vars in context files).

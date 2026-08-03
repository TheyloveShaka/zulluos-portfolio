# Shaka's Portfolio — Documentation

Technical documentation for [Shaka's Portfolio](README.md), the Windows-XP-style portfolio of **Shaka Nathan K**. This covers how the app is put together, where the content lives, how to customize it, and what's planned next.

> Adapted from [Valentin Kisimov's open-source portfolio](https://github.com/kisimoff/portfolio) — see [Credits](README.md#credits).

---

## 1. Project structure

```
src/
├── App.tsx                    # Root component: desktop icons + all windows + Merlin
├── App.css                    # Global styles, theme colors, desktop layout
├── components/
│   ├── Navbar.tsx             # Bottom taskbar: wordmark, theme toggle, socials
│   ├── Icon.tsx / IconTask.tsx# Desktop icons and taskbar entries
│   ├── logoBootAnimation.tsx  # LogoSplash: stroke-draws the Z mark (BIOS splash)
│   ├── screens/
│   │   ├── PowerOnScreen.tsx  # Welcome screen: SVG PC + clickable power button
│   │   ├── LoadingScreen.tsx  # Boot state machine: welcome → logo → bios → done
│   │   └── Desktop.tsx
│   ├── windows/               # Each XP window: About, Projects, Credits, Start,
│   │   │                      # DeviceInfo, Xterm (terminal)
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
└── assets/, img/              # Posters, icons, avatar
public/
└── assets/agents/Merlin.js    # Merlin sprite data (see §5, "the Vite gotcha")
```

## 2. Boot flow

The boot sequence *is* the site's intro — there is no separate intro animation. `LoadingScreen.tsx` is a small state machine: `welcome → logo → bios → done`.

1. **`welcome`** — `PowerOnScreen.tsx` renders a full-screen SVG illustration of a CRT monitor and tower, powered down, with the site's wordmark, Shaka's name and title, and a **clickable power button** (a real `<button>`, keyboard reachable). This screen waits indefinitely for a human — nothing is on a timer here, which matters for the Merlin gating below.
2. Pressing power plays the CRT wake (the bright line snapping open vertically, with a flicker), fires `signalIntroStart()`, and advances to…
3. **`logo`** — `LogoSplash` (`logoBootAnimation.tsx`) stroke-draws the Z mark as an OEM/BIOS splash (~1.7s), then advances to…
4. **`bios`** — the BIOS-style text sequence (`#bootRoot`) types out, then hands off: taskbar and icons animate in, the Start window opens, and `signalIntroComplete()` fires.
5. **`done`** — the XP desktop, live.

`fastBoot` short-circuits straight to `done` (no welcome screen, no BIOS text) for repeat visitors. Toggle it with `fastboot on` / `fastboot off` in the site's terminal; the flag persists in ZenFS (IndexedDB), so clearing it during development means deleting the `zenfs` IndexedDB database — and note that `indexedDB.deleteDatabase` silently *blocks* while the page holds a connection, so the delete only lands after a reload.

### The two boot signals

`LoadingScreen` stamps `document.body.dataset.introStarted` when power is pressed and `introDone` when the desktop is live, dispatching matching `zulluos:intro-start` / `zulluos:intro-complete` events. `Wizard.tsx` consumes both — see §5. (Those event names are an internal string constant left over from this project's former name; they're just a private channel between the two files and aren't shown to visitors, so renaming them isn't part of this pass.)

## 3. Theming — one OS look, and the pink-to-blue story

**Shaka's Portfolio ships the classic Windows XP look only.** The upstream project had a second "dark"/neon theme (a looping magenta circuit-board video with a HAL-9000-style eye) and a navbar toggle to switch between them. That whole layer was removed: `ThemeContext.tsx` now pins `theme = 'xp'`, and `theEye.tsx`, `ToggleButton.tsx`, and `cpuLoop.mp4` are deleted.

Two consequences worth knowing if you dig in:

- `Icon.tsx` and `IconTask.tsx` still branch on `themeState === 'dark'`. Those branches are now unreachable, which is why `themeState` stays in the context (typed as the single-member union `'xp'`) rather than being ripped out — they can be simplified whenever someone touches those files.
- The Credits window used to open **only** by clicking the eye. With the eye gone it has a desktop icon instead (`App.tsx` filters out only `start`). Don't re-hide it — that window carries the attribution to the original author.

The remaining pink-to-blue work, since the upstream palette was magenta:

- **CSS colors** — `--accent-color` in `App.css` (`#2f71cd`), the navbar gradient, and the xterm terminal background (`#0a1a33` in `terminalCommandProcessor.ts`).
- **Already blue** — the XP "Bliss" wallpaper and XP window chrome needed no change.

### A trap in `App.css`

`App.css` carries an inherited `*:focus { outline: 0 !important }` (plus `button { outline: none }`). That wildcard means **no outline-based focus ring can ever win**, whatever its specificity — so keyboard users get no focus indicator anywhere on the site. `PowerOnScreen` works around it locally by drawing its focus ring with `box-shadow`, which that rule doesn't touch. Fixing this properly across the site is item 3 in §9.

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

1. **`Wizard.tsx`** — loads the agent once (guarded against React StrictMode double-mounting), positions him bottom-right, plays greeting/idle animations, and toggles the chat when he's clicked. He is gated on the boot signals from §2 so he only appears once the desktop is live.
2. **`WizardChat.tsx`** — the "Ask Merlin" window: message list, typing indicator, suggestion chips, input. Replies also trigger `agent.speak()` + a fitting animation, and some intents perform *site actions* (opening the Projects/About/terminal windows through `WindowsContext`).
3. **`wizardBrain.ts`** — a dependency-free scripted engine: normalizes input, scores ~17 intents (weighted multi-word keyword matches + Levenshtein typo tolerance for single words), picks a random response from the matched intent, falls back to suggestions. **No API, no backend, no cost** — by design, so the site runs free on static hosting.

**The Vite gotcha (important if you upgrade clippyts or add agents):** clippyts loads agents with a template-literal dynamic import that Rollup can't statically resolve. In production the browser literally requests `/assets/agents/Merlin.js`. Two things make this work: a copy of that file lives in `public/assets/agents/`, and `vite.config.ts` has `optimizeDeps.exclude: ['clippyts']` so dev mode resolves it correctly too. If you add another character (Clippy, Bonzi, Genie…), copy its file from `node_modules/clippyts/dist/agents/` into `public/assets/agents/`.

**Styling:** `wizard.css` contains XP.css window/button/input/scrollbar rules extracted from [`xp.css`](https://github.com/botoxparty/XP.css) and re-scoped under `.wizard-chat`. XP.css is deliberately **not** imported globally — it styles bare `button`/`input` elements and would break the site's custom XP look.

**Stacking gotcha:** the chat window (`.wizard-chat-root`, z-index 2147483100) must stay *above* Merlin's `.clippy` element (2147483000). They overlap in the bottom-right corner, and at equal z-index Merlin's DOM node swallows clicks meant for the Send button.

**Timing gotcha (bitten twice):** `useDesktopReady()` has a safety-net timer so Merlin can't be lost forever if the "desktop is live" signal never fires. That timer must only start once `intro-start` has fired — i.e. after the visitor presses power — **never at page load**. The welcome screen waits indefinitely for a human, so a page-load timer means anyone who reads the copy for 20 seconds gets a wizard materialising on top of a powered-off computer. If you touch this, verify by sitting on the welcome screen for a minute without clicking.

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
- **GitHub Pages**: `npm run deploy` publishes `dist/` via `gh-pages`, **but** the site would be served from `/zulluos-portfolio/` (the repo name, unchanged by this rename), so `vite.config.ts` needs `base: '/zulluos-portfolio/'` first. Without it, all assets 404.

## 8. Known limitations

- LinkedIn / X / Instagram links are `href="#"` placeholders (marked with `TODO` comments).
- The About avatar is a placeholder SVG, and the Resume button points nowhere yet.
- Projects #3 and #4 are intentional "coming soon" placeholder cards.
- Merlin's chat is scripted; it does not understand free-form questions outside its intents (that's the free-hosting trade-off — see Future Work).

## 9. Future work

Roughly in priority order:

1. **Fill the placeholders** — real LinkedIn/X/Instagram URLs, a real photo in the About window, a hosted resume PDF for the Resume icon, and real projects in slots #3/#4 (Lulimi-Lingo is a candidate once it has a README).
2. **Deploy + custom domain** — Vercel deploy, then a proper domain; re-add a `CNAME`/redirect once chosen.
3. **Restore focus indicators site-wide** — remove the blanket `*:focus { outline: 0 !important }` from `App.css` (see §3) and replace it with a proper `:focus-visible` ring, auditing every interactive surface so nothing looks accidental. This is a WCAG 2.4.7 failure inherited from upstream.
4. **Give Merlin a real brain (optional)** — swap `wizardBrain.ts` for a Claude API call behind a Vercel serverless function (keeps the key server-side). The scripted brain stays as offline fallback. Cost: fractions of a cent per chat with a small model.
5. **Spotify "now playing"** — needs OAuth + a token-refresh backend, so it depends on the Vercel move: a serverless function can expose a `/api/now-playing` endpoint the desktop can poll, rendered as an XP tray widget.
6. **Mobile polish** — the wizard chat already becomes a bottom sheet ≤600px; the window system itself deserves a proper small-screen audit.
7. **Performance** — code-split the heavier windows (xterm) with dynamic `import()` so they only load when the terminal window opens.
8. **More desktop toys** — Minesweeper or Solitaire clone, a "My Computer" window listing real repos via the GitHub API, screensaver after idle (astrophysics-themed, obviously).
9. **CI** — a GitHub Action running `npm run build` + `npm run lint` on push, and auto-deploy on main.
10. **Lint cleanup** — burn down the pre-existing upstream ESLint errors (mostly `any` types and unused vars in context files).

# Shaka's Portfolio — Shaka Nathan K's Portfolio

Shaka's Portfolio is an interactive, Windows-XP-styled portfolio for **Shaka Nathan K**, a Developer & AI Engineer based in Kampala, Uganda. Instead of a static page, you switch it on: a retro PC sits on the welcome screen waiting for you to press its power button, and the machine boots into a full XP desktop with draggable windows, a working terminal, and a Merlin wizard assistant.

## What it is

- **Power on** — visitors are met by an illustrated CRT and tower with a clickable power button. Pressing it wakes the screen, draws the logo as a BIOS splash, runs the boot text, and lands on the desktop. A `fastboot` toggle skips it for repeat visitors.
- **Draggable windows** — About, Projects, Credits, Resume, and Device Info all open as classic resizable/draggable XP-style windows.
- **Terminal** — a real in-browser shell (`xterm.js` + `@zenfs/core`) with commands like `help`, `ls`, `neofetch`, `whoami`, `skills`, and `socials`.
- **Merlin** — a clippy-style wizard assistant that pops in to help visitors get oriented.

## Tech stack

- React 18 + TypeScript
- Vite (build tool, dev server)
- Framer Motion (animations)
- xterm.js + @zenfs/core (in-browser terminal & virtual filesystem)
- clippyts (Merlin assistant)
- xp.css (Windows XP visual chrome)
- Tailwind CSS

## Documentation

See **[DOCUMENTATION.md](DOCUMENTATION.md)** for the architecture guide (boot flow, window system, Merlin's brain, theming), a content-editing cheat-sheet, deployment notes, and the future-work roadmap.

## Development

```bash
npm run dev       # start the Vite dev server
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Deploy

```bash
npm run deploy    # builds and publishes dist/ via gh-pages
```

## Credits

Shaka's Portfolio is **forked and adapted from [kisimoff.com](https://kisimoff.com)**, the original open-source portfolio created by **Valentin Kisimov** — see the source at [github.com/kisimoff/portfolio](https://github.com/kisimoff/portfolio). The overall concept, the Windows-XP-style window system, the boot sequence, and the terminal all originate from his work. Huge thanks to Valentin for open-sourcing such a polished project.

Additional credits carried over from the original project:

- **Logo & CPU Portal animation** — [Valentin Ivanov](https://www.hivaldesign.com/), an RSA Award-winning animation. Watch it [here](https://www.youtube.com/watch?v=6k12O1iADwc).
- **Inspiration** — the OS-as-portfolio concept was inspired by [Poolside FM](https://poolsuite.net/).
- **Merlin assistant** — powered by [clippy-js](https://github.com/pi0/clippy.js) / [clippyts](https://www.npmjs.com/package/clippyts).
- **Windows XP look & feel** — [xp.css](https://github.com/botoxparty/XP.css).
- Libraries: [Xterm.js](https://xtermjs.org/), [ZenFS](https://zenfs.dev/core/), [react-device-detect](https://www.npmjs.com/package/react-device-detect), [react-draggable](https://www.npmjs.com/package/react-draggable), [react-ip-details](https://www.npmjs.com/package/react-ip-details), [framer-motion](https://www.npmjs.com/package/framer-motion).

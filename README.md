# ZulluOS — Shaka Nathan K's Portfolio

ZulluOS is an interactive, Windows-XP-styled portfolio for **Shaka Nathan K**, a Developer & AI Engineer based in Kampala, Uganda. Instead of a static page, the site boots like a desktop OS: a logo/boot animation, draggable windows, a working terminal, a Winamp-style music player, and a Merlin wizard assistant guide you through the experience.

## What it is

- **Boot screen** — a CPU-portal intro animation that "boots" the OS on load, with a fastboot toggle for repeat visitors.
- **Draggable windows** — About, Projects, Credits, Resume, and Device Info all open as classic resizable/draggable XP-style windows.
- **Terminal** — a real in-browser shell (`xterm.js` + `@zenfs/core`) with commands like `help`, `ls`, `neofetch`, `whoami`, `skills`, and `socials`.
- **Winamp** — an embedded `webamp` player for a bit of 2000s nostalgia.
- **Merlin** — a clippy-style wizard assistant that pops in to help visitors get oriented.

## Tech stack

- React 18 + TypeScript
- Vite (build tool, dev server)
- Framer Motion (animations)
- xterm.js + @zenfs/core (in-browser terminal & virtual filesystem)
- webamp (Winamp emulation)
- clippyts (Merlin assistant)
- xp.css (Windows XP visual chrome)
- Tailwind CSS

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

ZulluOS is **forked and adapted from [kisimoff.com](https://kisimoff.com)**, the original open-source portfolio created by **Valentin Kisimov** — see the source at [github.com/kisimoff/portfolio](https://github.com/kisimoff/portfolio). The overall concept, the Windows-XP-style window system, the boot sequence, and the terminal all originate from his work. Huge thanks to Valentin for open-sourcing such a polished project.

Additional credits carried over from the original project:

- **Logo & CPU Portal animation** — [Valentin Ivanov](https://www.hivaldesign.com/), an RSA Award-winning animation. Watch it [here](https://www.youtube.com/watch?v=6k12O1iADwc).
- **Eye design** — inspired by [HAL-9000](https://en.wikipedia.org/wiki/HAL_9000), built with Midjourney and Framer Motion.
- **Inspiration** — the OS-as-portfolio concept was inspired by [Poolside FM](https://poolsuite.net/).
- **Merlin assistant** — powered by [clippy-js](https://github.com/pi0/clippy.js) / [clippyts](https://www.npmjs.com/package/clippyts).
- **Windows XP look & feel** — [xp.css](https://github.com/botoxparty/XP.css).
- Libraries: [Xterm.js](https://xtermjs.org/), [ZenFS](https://zenfs.dev/core/), [Webamp](https://github.com/captbaritone/webamp), [react-device-detect](https://www.npmjs.com/package/react-device-detect), [react-draggable](https://www.npmjs.com/package/react-draggable), [react-ip-details](https://www.npmjs.com/package/react-ip-details), [framer-motion](https://www.npmjs.com/package/framer-motion).

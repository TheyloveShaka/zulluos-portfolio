# UX Spec: Shaka's Portfolio (XP Premium)

P2 deliverable. Written against `docs/REFERENCES.md`, `docs/DECISIONS.md`, `docs/CREW-LOG.md`, `scripts/astra/brief.md`, a direct read of the current codebase (files named throughout), and `docs/ASTRA-DIRECTION.md` (single-shot consultant memo, gpt-6-astra), folded in per §0.1 below. Art direction (colour, type, grain, motion timing) is being locked in parallel, this spec references those by **role**, not value, even where Astra's memo proposed specific hex/font/ms values. `docs/ART-DIRECTION.md` and `docs/IMAGE-PLAN.md` do not exist yet at time of writing; image slots below are IDs for that pass to resolve, not files.

Acceptance criteria are numbered per section (`AC-<SECTION>-n`) so the UAT agent can walk them one at a time. Every ASK is a named gap, not a guess.

---

## 0. Scope carried from Decisions/References

- No power-on click screen. Boot is the typed diagnostic text only. (`DECISIONS.md` line 8)
- Desktop scrolls; taskbar and wallpaper stay fixed; windows move with the page and open in the current viewport. (line 10)
- About auto-opens on arrival, renders at once, no typewriter. (lines 6, 9)
- Icons left, About open, 3 polaroids top-right, sticky note beneath, skills orbit below the fold. (lines 9, 11, 12)
- Projects + Case Studies merge into one Case Studies folder; Services live inside Hire Me; My Approach is a Notepad-style window. (line 17)
- Every ZulluOS mention removed; GitLab icon removed. (line 18)
- Role line, quote, and concept-badge copy are locked (lines 13, 14, 16), quoted verbatim below where relevant, not re-authored.

### 0.1 Astra memo: what's folded in, what departs

The coordinator asked me to read `docs/ASTRA-DIRECTION.md` §1, 3, 6, 7, 8 and fold in what fits before finalising, noting departures with a reason. I read the full memo for context; colour and font values (§2 dos/don'ts, §4, and the pixel-precise motion-timing figures in §2 and §5) are **not** adopted, those stay the art director's call per the coordinator's own instruction, regardless of how specific Astra got. Everything structural, behavioural, and IA-level below is folded into the relevant section.

**Adopted:**
- About as the five-second sales page: name, role, location/availability, one-line proposition, then the two CTAs, all visible without scrolling, master copy after. (§6)
- Copy-email as its own action inside About's hero block, not only inside Hire Me, this actually restores `REFERENCES.md` R10, which names both destinations; my first pass had wrongly consolidated it into Hire Me only. (§6, §8)
- Exact 1440 and 375 coordinates for icon rail, About, polaroids, note, single-column 80px-wide icon rail replaces my earlier 2-column 100px grid assumption; it's a real improvement (frees the canvas for the sales-page hero) and the numbers are internally consistent with each other. (§2)
- Icon order leads with About (reinforces the sales-page verdict), then Case Studies, Hire Me, My Approach.txt. (§2.1)
- Window positioning: document coordinates, open at `scrollY + 24`, title-bar-only drag with a 4px threshold, clamp so ≥80px of title bar stays recoverable, taskbar activation scrolls the window into view. (§4, §5)
- Canvas height computed from actual content (lowest element + taskbar + safe area + clearance), not an authored guess, replaces the fixed ~1780px/~1650px figures in my first pass. (§4.4)
- Only the single most-visible video preview autoplays in the Case Studies folder; every other tile shows its poster regardless of its own visibility. Touch gets a persistent tap-to-play control rather than relying on hover/scroll. (§7.1)
- "Outcome not yet measured" as the honest fallback where a case study has no verified metric, instead of leaving the field ambiguous. (§7.2, §12)
- Hire Me framed as "draft an enquiry" / "open an email draft," never "message sent", my first pass already avoided the false-success wording but hadn't named the pattern this cleanly. Explicit no-fabricated-response-time rule added.
- Four named services (Web solutions / LLM-powered applications and agents / Systems and integrations / Project leadership) instead of my first pass's compressed three, matches the rest of the IA already treating AI as its own category (stack groups). (§8)
- Skills orbit gets a visible Pause control and an explicit "pause when hidden or offscreen" rule, on top of the `aria-hidden` treatment I already had. (§11.3)
- Merlin: explicit idle / opening / open / closing lifecycle: a click always **opens or focuses** the chat, it never closes it, closing is only ever the window's own close control or its taskbar button. This corrects my first pass, which had a click *toggle* the panel; Astra's model is the more standard one and removes an entire class of "click did something unexpected" bugs, which is the exact complaint in brief item 6. (§10)
- Single-click (never double-click) to open any desktop icon or folder tile, an explicit AC now, not an assumption. (§2, §7.1)
- Explorer-style chrome details for the Case Studies folder (menu row, address row, status strip) and firm window sizes for the folder/viewer/Hire Me windows. (§7)
- `overscroll-behavior-y: contain` on internal window scrollers, no global wheel interception, re-clamp persisted window positions on resize. (§4)

**Departed (kept my own call, reason given):**
- **Boot length is left open, not capped.** Astra caps the typed boot at 900ms plus a "Skip" control from frame one. The coordinator's own brief is explicit that Shaka wants the code boot to be seen. I'm not resolving this, see the open questions at the end. I **do** adopt the "Skip" affordance on its own merits (it's opt-in and doesn't shorten the boot for anyone who wants to watch it), just not the 900ms cap.
- **Merlin stays the existing roaming, dockable sprite**, not Astra's proposed static 48px desktop-icon shortcut at a fixed `x28,y568`. The coordinator's summary of Astra's memo keeps Merlin's idle/opening/open/closing lifecycle framing but doesn't ask for a relocation, and `REFERENCES.md` R11 already settled "assistant as a dockable window with its own taskbar button" against the current roaming-sprite implementation, that's a different axis than where he sits on the desktop. No reason to re-open his position.
- **Whether Merlin greets unprompted on load is left open, not decided.** Astra says "no unsolicited speech" flatly; the coordinator flagged this specific point as Shaka's call. Current code auto-speaks a greeting 800ms after load, flagged as a named open item, not changed either direction.
- **No separate "Contacts" icon.** Astra's icon table adds one, opening "Hire Me's contact section." `DECISIONS.md` line 17 already settled that services and contact both live inside one Hire Me window, a second icon pointing at a sub-anchor of the window it already sits beside adds an icon without adding a destination. Terminal, Resume, Device Info, and Credits fill that rail slot instead, per the orchestrator's own instruction to keep them unless I argue otherwise (§2.1), I have no argument to cut them, and Astra's memo never actually argues to cut them either, it just didn't enumerate them because they weren't its focus.
- **Mobile "More" menu is repurposed**, not dropped: Astra's four-cell mobile row (About / Work / Hire Me / More) with More exposing "Approach, Contacts and Merlin" is adopted structurally, but More's contents become My Approach.txt, Terminal, Resume, Device Info, and Credits (Contacts dropped for the same reason as above; Merlin stays a persistent floating sprite rather than a menu entry, consistent with the previous point).
- **Spacing/measure numbers that are really layout facts** (window sizes, gaps, the 64-character essay measure, 44px control heights) are treated as this spec's own concrete coordinates, the same way I already hand-specified pixel positions for polaroids and icons in my first pass, not as "the art director's spacing scale." Numbers that are purely decorative/timing (grain opacity, exact hex, button-feedback milliseconds) are excluded.

---

## 1. Route map

Single-page app, one URL (`/`), no router. "Routes" below are window/desktop states, not URLs, noted for the backend engineer since there is no server-rendered routing to design around.

| Screen/state | Purpose | Layout tree | Access |
|---|---|---|---|
| Boot | First paint, typed diagnostic | Full-viewport overlay, no chrome | Public |
| Desktop (base) | Icon rail, wallpaper, taskbar | Fixed wallpaper + fixed taskbar + scrollable desktop canvas | Public |
| About window | Sales-page hero + bio + stack | Draggable window over desktop canvas | Public |
| Case Studies folder | Explorer-style thumbnail grid of 7 studies | Draggable window, scrollable body | Public |
| Case study viewer | One study's video + essay | Draggable window, scrollable body, opens from a folder tile | Public |
| Hire Me | Availability + services + form | Draggable window, scrollable body | Public |
| My Approach.txt | Notepad-style essay | Draggable window, scrollable body | Public |
| Terminal, Resume, Device Info, Credits | Existing utility windows, unchanged in kind | Draggable windows | Public |
| Merlin chat | Assistant conversation | Windowed (see §10), taskbar entry | Public |

No authenticated or admin surface exists in this build. If Hire Me ever gains a backend, that inbox view would be the first admin-level route, out of scope this round per `DECISIONS.md` line 2.

---

## 2. Desktop map

Single-column icon rail replaces the current 2-column `.icons` CSS grid (structural improvement adopted from Astra, §0.1), it clears far more canvas for the About hero, polaroids, and note than a wide grid would.

### 2.1 Icon list and order (all breakpoints)

DOM order (and therefore default tab order, see §13) must equal reading order, independent of whatever CSS places them visually:

1. About
2. Case Studies
3. Hire Me
4. My Approach.txt
5. Terminal
6. Resume
7. Device Info
8. Credits

About leads: it's the sales page (§0.1, §6), and its icon exists mainly to reopen it once closed, leading the rail reinforces where the eye should land regardless. Case Studies replaces Projects. Hire Me and My Approach.txt are new. Terminal, Resume, Device Info, and Credits stay, kept per the orchestrator's own instruction unless argued against, and there's no argument to cut them here (see §0.1 on the "Contacts" icon Astra proposed instead).

`WindowKey` should read: `'about' | 'caseStudies' | 'hireMe' | 'approach' | 'terminal2' | 'resume' | 'deviceInfo' | 'credits' | 'start' | 'merlinChat'`, drops `'projects'`, adds `'caseStudies'`, `'hireMe'`, `'approach'`, `'merlinChat'` (§10 explains the last one).

Every icon and folder tile opens on a **single click**, never a double-click requirement. XP-authenticity loses to usability here.

### 2.2 Coordinates: 1440×900

Coordinates start at the desktop's top-left, after boot.

| Element | Position and size |
|---|---|
| Icon rail | `x16, y24`; 80px-wide column, 88px vertical pitch, 8 cells (About → Credits, §2.1) |
| About window | `x120, y32`; 864 × 756px |
| Three polaroids | `x1024 / 1154 / 1284, y44`; 128 × 164px each |
| Sticky note | `x1036, y244`; 352 × 228px |
| Below-fold cue | `x132, y820`; small text hint with a downward affordance, telling the visitor there's more below, supplements, doesn't replace, the native scrollbar |
| Skills orbit panel | horizontally centred, top edge ≈`y960`; 640 × 360px sunken panel (§11.3) |
| Case Studies shortcut | centred, below the orbit panel with a clear gap |
| Taskbar | `x0, y860`; 1440 × 40px, fixed |

The icon rail (x16–96), About (x120–984), and the polaroid/note cluster (x1024–1408) don't overlap at any point, 40px of clear gutter between the rail and About, and About's right edge sits 40px clear of the polaroid cluster's left edge.

Canvas total height is **not** an authored constant (see §4.4's formula), it falls out of wherever the lowest of {skills orbit panel, Case Studies shortcut} lands, plus taskbar clearance.

### 2.3 Coordinates: 768×1024

Same rail, same relative roles, scaled down, nothing restructures:

- Icon rail: same `x16, y24`, 80px/88px pitch, unchanged, it's already narrow.
- About window: `width: 560px`, positioned `left: max(120px, (768 - 560) / 2)` so it never collides with the rail.
- Polaroid cluster: same top-right anchor, frames scaled to ≈120×155px.
- Sticky note: beneath, ≈150×150px.
- Skills orbit: ≈460×260px, same below-the-fold placement.

### 2.4 Coordinates: 375×812 (structural change, not a squeeze)

The absolute-canvas model does not survive at this width. Mobile gets its own structure, in this order, and per Astra's adopted correction, polaroids and the note move **below** About, not above it, so a photo cluster never sits between the visitor and Shaka's name:

1. **Shortcut row**, `x8, y8`, 359 × 56px, four 80px cells: **About, Work** (Case Studies, short label to fit the cell; exact wording is content's call), **Hire Me, More**. **More** opens a simple menu exposing My Approach.txt, Terminal, Resume, Device Info, and Credits (§0.1, Contacts dropped, Merlin stays a floating sprite, not a menu entry).
2. **About window**, `x8, y76`, 359 × 488px. Title bar 30px, body padding 16px, body scrolls vertically with a visible scrollbar. Name, role, availability, proposition, and both CTAs must all be visible without scrolling this window (§6.5), only the master copy below them requires the internal scroll.
3. **Polaroids**, below About, `x18 / 139 / 260, y584`; 96 × 126px each, static rotations (reduced from desktop's), no hover lift (nothing to lift on touch).
4. **Sticky note**, `x16, y734`; 343 × 206px. Enters the next screen rather than displacing the CTAs above.
5. **Below-the-fold band**, skills orbit (≈343×210px) then the Case Studies shortcut as a full-width button.
6. Desktop content ends with ≥68px bottom clearance above the taskbar.
7. Remaining windows (Case Studies, Hire Me, My Approach.txt, etc.) open as near-full-width overlays (`width: 359px` i.e. viewport minus 16px margin) when opened from the shortcut row or More menu, entering document flow rather than floating (§4.6).

**AC-DESK-1**: At 1440×900, the icon rail, About window, and polaroid/note cluster do not overlap at any point in the boot-to-desktop sequence.
**AC-DESK-2**: At 375×812, no element requires horizontal scroll to reach; the shortcut row is a fixed 4-cell layout (no horizontal scroll needed), everything else is single-column vertical.
**AC-DESK-3**: DOM order of the 8 icons matches the order in §2.1 at every breakpoint, regardless of CSS placement.
**AC-DESK-4**: At 375×812, no polaroid or note pixel appears above About's bottom edge in document order.
**AC-DESK-5**: Every icon and folder tile opens on a single click; no interactive element in this spec requires a double-click.

---

## 3. Boot flow

Code today: `src/components/screens/LoadingScreen.tsx`. `Stage = 'welcome' | 'bios' | 'done'`, `PowerOnScreen` renders during `'welcome'`, `handlePowerOn` moves to `'bios'`, `handleDesktopHandoff` (lines ~72–94) moves to `'done'` and calls `startWindow.openOrFocus()` 450ms later. `skipLoading` (~101–149) is the fastBoot path.

Per `DECISIONS.md` line 8, the power-button screen is removed. The state machine collapses:

- **New `Stage = 'bios' | 'done'`.** No `'welcome'`. The component mounts, fastboot flag resolves (existing `loadFastBootFlag` async check, gates on `fastBootChecked` exactly as today), and if fastboot is off it starts directly in `'bios'`, the typed text begins on first paint with no click required. `handlePowerOn`/`PowerOnScreen`/`signalIntroStart` become dead code to remove; `signalIntroComplete` is still fired at handoff since Wizard.tsx's `useDesktopReady()` depends on it (see §10).
- **A "Skip" control is visible from the first frame of the boot text** (adopted from Astra, §0.1), a small, unobtrusive link/button, always reachable by keyboard, that jumps straight to `handleDesktopHandoff()`. It doesn't shorten anything for a visitor who ignores it.
- **What the visitor sees, in order**: (1) blank/boot-screen background appears, (2) the existing typed BIOS text runs (`"Shaka's Portfolio"` → hardware check → the long driver/service list → `"Loading complete..."`), (3) at the end of that sequence, navbar and icons animate in and **About auto-opens** 450ms later.
- **Timing**: keep the existing typed-text pacing (`Pace`/`Pause` values already in the file). **Total boot duration is an open question, see the end of this document; do not cap it at 900ms without Shaka's sign-off.** The one confirmed change: `handleDesktopHandoff` calls `aboutWindow.openOrFocus()` instead of `startWindow.openOrFocus()`, About is the window that auto-opens on arrival, not the Start menu.
- **fastBoot**: unchanged in effect, simplified in cause. With `'welcome'` gone, fastboot for a returning visitor means: stage starts at `'done'` immediately, no boot text renders at all, navbar/icons animate in on mount, About opens 450ms later.
- **Reduced motion** (`prefers-reduced-motion: reduce`): the per-character typewriter effect (`windups`) is a motion effect for a vestibular-sensitive visitor, not just decoration. Reduced-motion visitors get the full boot text block rendered at once (no `WindupChildren` stagger), held on screen briefly (900ms, this fixed, short hold is fine to lock regardless of the open question above, since it's specifically the reduced-motion path, not the default experience) then handoff. Navbar/icon entrance drop the `y` translate and become opacity-only fades at 150ms.
- **Which window is open/focused at the end**: **About**, per `DECISIONS.md` line 9.
- **Focus management**: on handoff, move keyboard focus into the About window rather than leaving it on `document.body`. Land it on the window's close button (`aria-label="Close Window"`, already present in `Window.tsx`), the first focusable element in the window's DOM order, and a predictable "you are now inside a window" anchor. Do not autofocus into the middle of body text.

**AC-BOOT-1**: On first visit (no fastboot flag), boot text begins typing within one animation frame of mount, no click, no logo, no power-button screen renders at any point.
**AC-BOOT-2**: On a returning visit with fastboot on, the boot screen never renders; the desktop with About already open is visible on first paint.
**AC-BOOT-3**: At the end of boot (real, fastboot, or Skip), the About window is open and focus (`document.activeElement`) is inside it, not on `body`.
**AC-BOOT-4**: With `prefers-reduced-motion: reduce` set, the boot text renders without a per-character stagger, holds for a short fixed beat, and the navbar/icon entrance has no vertical translate.
**AC-BOOT-5**: A visible "Skip" control is present from the first frame of the boot text and, when activated, immediately runs the same handoff as a natural finish.
**AC-BOOT-6**: No console reference to a power-on click handler remains reachable in the shipped bundle (dead-code check, not just visual).

---

## 4. Scroll model

Code today: `body { overflow: hidden }` (`App.css:135`), `.app` is a `100vh`/`100dvh` flex `column-reverse` container holding Navbar, the icons `<ol>`, and windows (`App.tsx`). That's a fixed, non-scrolling single screen.

### 4.1 Layer structure

Three layers:

1. **Wallpaper layer**, `position: fixed; inset: 0; z-index: 0; background-size: cover`. Not `background-attachment: fixed` on `body`, that has known mobile-Safari repaint bugs; a genuinely fixed-position element is the reliable version of "the wallpaper never moves."
2. **Desktop scroll surface**, replaces `.app`'s role as a fixed 100vh box. Becomes a normal-flow container with `min-height: 100dvh` as a floor (so short content still fills the viewport) but grows beyond that based on real content per §4.4, holding the icon rail, windows, polaroids, sticky note, skills orbit, and Case Studies shortcut. `column-reverse` is dropped.
3. **Taskbar (Navbar)**, `position: fixed`, pinned to the bottom on desktop/tablet, pinned to the **top** on mobile (existing mobile CSS at `App.css:1319` already does this, keep it; mobile browser chrome at the bottom makes a fixed-bottom taskbar unreliable). `z-index` above every window body.

The actual scroll happens on `html`/`body` (remove `overflow: hidden` at `App.css:135`) rather than an inner `overflow-y: auto` div, native scroll behaviors (keyboard, touch, momentum) work for free, and window coordinates stay in normal document space instead of requiring manual scroll-offset math.

### 4.2 Window coordinate space

Windows are absolutely positioned within the desktop scroll surface, **not** fixed to the viewport. A window dragged to `y: 1200` stays at `y: 1200` in document space and scrolls off the top of the viewport like any other page content.

`react-draggable`'s `bounds` should constrain dragging to the scroll surface's own bounding rect, clamped per §4.3, never `bounds="parent"` scoped to one viewport-height slice.

**Drag mechanics**: title-bar only (`.handle`, excluding the close button, already scoped correctly in `Window.tsx`'s `cancel=".close-window"`), and drag doesn't engage until the pointer has moved **4px** from `mousedown`, this stops a click-to-focus on the title bar from being misread as a micro-drag, and is the same disambiguation principle as Merlin's click/drag threshold in §10. Disable text selection only while a drag is actually in progress. Implementation note: never add `scrollY` twice when computing a drag delta, a window's document-space position and the pointer's viewport-space position are two different coordinate systems, and mixing them is the single most common way this kind of feature drifts.

### 4.3 Position persistence and clamping

Icon positions already persist via `saveIconPositions`/`loadIconPositions` in `src/utils/zenFs.ts`. Add a second persisted map, same pattern: `windowPositions.json`, `Record<WindowKey, {x: number, y: number}>`. On drag stop, write the new document-space `{x, y}`. On open, if a persisted position exists, use it; if not, compute a default per §4.4.

Clamp on every write and on every viewport resize: `x` stays within the canvas width, `y` stays `≥ 0`, and **at least 80px of the title bar always remains reachable**, a window can never be dragged (or left, after a resize) somewhere it can't be recovered from. On resize/breakpoint change, re-clamp stored positions rather than reusing a desktop-saved coordinate verbatim, a 1440px-saved `x` is meaningless once the canvas is 375px wide (moot in practice since dragging is disabled on mobile, §4.6, but the re-clamp still has to run before that width is reached, e.g. a visitor resizing a desktop browser window down).

### 4.4 Canvas height and where a newly opened window lands

Canvas height is computed from actual content, not authored as a fixed number: it's `max(100dvh, bottom edge of the lowest element on the page) + taskbar height + safe-area inset + 24px clearance`. The "lowest element" is whichever of {skills orbit panel, Case Studies shortcut, an open window dragged unusually low} currently sits furthest down. This replaces guessing a total in advance, the numbers in §2.2–2.4 place the base desktop elements; the frontend engineer measures where they actually land once real content (video posters, essay length) is in and the formula does the rest.

A window with no persisted position opens at `y: scrollY + 24`, horizontally centred within the canvas width available to the right of the icon rail. This is simpler and more predictable than centering in the viewport (my first pass's approach), a tall window opened this way can't get top-and-bottom clipped by a short viewport, and it matches how a visitor expects a "new thing just appeared" to behave: near the top of what they're currently looking at, not floating mysteriously centred. If a second window opens without the visitor scrolling in between, add a small cascade offset (`+24px` on both axes) so it doesn't land in an unreadable exact stack with the first.

About is the one exception with a fixed initial position (§2.2–2.4), it auto-opens at boot, when scroll position is always `0`.

### 4.5 Z-index stack

Bottom to top: wallpaper (0) → desktop decorations not inside a window, icon rail, polaroids, note, orbit (10) → open windows, ordered by the existing `openWindowsQueue` index + 5 scheme already in `WindowsContext.tsx` → taskbar, fixed above all window bodies (500) → Merlin sprite and his chat window, viewport-fixed like today, effectively topmost (existing `2147483000` inline z-index on `.clippy`).

### 4.6 Keyboard, touch, and taskbar recovery

- **Keyboard scrolling**: falls out for free once real document scroll replaces the fixed-height flex box. Verify no window's internal scrollable body (`max-h-[70vh] overflow-y-auto`) traps the page's scroll keys when that window isn't focused; give every such internal scroller `overscroll-behavior-y: contain` so scrolling to its end doesn't chain into scrolling the page behind it.
- **No global wheel interception, anywhere.** Native scroll only, a mouse wheel over open wallpaper scrolls the desktop; there is no custom JS wheel handler layered on top of it.
- **Mobile touch**: dragging is disabled outright on mobile (§2.4 already establishes windows open static-in-stack, entering document flow, not free-floating). A finger drag on empty desktop area scrolls the page; there's no title-bar drag gesture to conflict with it at this breakpoint.
- **Taskbar activation recovers lost windows**: clicking a window's taskbar button doesn't just toggle focus silently if that window is currently scrolled out of view, it also scrolls the window's title bar into view (smooth scroll, or an instant jump under reduced motion). This is the direct fix for the risk a scrolling, position-persisting desktop otherwise creates: a window dragged far down and forgotten about should never become effectively lost.
- **Taskbar safe area**: mobile taskbar (pinned top, §4.1) gets safe-area padding so it clears a notch/dynamic island.

**AC-SCROLL-1**: `body`/`html` scroll natively; there is no inner div with its own scrollbar duplicating page scroll.
**AC-SCROLL-2**: The wallpaper does not move at any scroll position.
**AC-SCROLL-3**: The taskbar does not move at any scroll position and its buttons remain clickable while a window is open above it.
**AC-SCROLL-4**: Dragging a window down, then scrolling the page, moves the window with the page content.
**AC-SCROLL-5**: A window dragged to a custom position and then reloaded (same session, fastboot on) reopens at that same custom position, re-clamped if the viewport has since changed size.
**AC-SCROLL-6**: Opening a window with no persisted position opens it at `scrollY + 24`, horizontally centred in the available canvas width, regardless of current scroll depth.
**AC-SCROLL-7**: On a touch device, dragging on empty desktop space scrolls the page; no window can be dragged at all at 375×812.
**AC-SCROLL-8**: Clicking a taskbar button for a window that's open but scrolled out of view scrolls it back into view.
**AC-SCROLL-9**: No window can be dragged, or left after a resize, such that fewer than 80px of its title bar remains on-canvas and reachable.
**AC-SCROLL-10**: A title-bar mousedown followed by less than 4px of movement before mouseup focuses the window without moving it; the same gesture with ≥4px of movement moves it.

---

## 5. Window chrome (applies to every window, not just the new ones)

Code today: `src/components/windows/Window.tsx`. Title bar (`.handle`, draggable, doubles as focus-on-mousedown), caption, close button, body (`themeValues.field`). This shell is reused by every window in this spec, About, Case Studies folder, case study viewer, Hire Me, My Approach.txt, and (per §10) Merlin's chat, replacing its current bespoke markup.

**AC-WIN-1**: Every window listed in §1 uses the same `Window.tsx` shell, no window has its own one-off title bar implementation (Merlin's chat currently does; §10 requires it to migrate).
**AC-WIN-2**: Clicking anywhere in a window's body brings it to front without requiring the title bar specifically.
**AC-WIN-3**: Every window's close button has an accessible name (existing `aria-label="Close Window"` pattern) and is reachable by keyboard, with a minimum 44×44px hit area at any breakpoint.
**AC-WIN-4**: Dragging any window is only possible via its title bar, excluding the close button, and only engages past the 4px threshold (§4.2).

---

## 6. About window: the sales page

Code today: `src/components/windows/About.tsx`. Currently: avatar image, then the full master-copy text run through `WindupChildren` (typewriter). `DECISIONS.md` lines 6 and 9 already required a role block above the copy and the typewriter's removal; Astra's memo (§0.1) sharpens exactly what that block needs to answer in five seconds.

Top-to-bottom structure, single scrollable window body (grows to `max-h-[70vh]`, then scrolls internally, never taller than that, so About never pushes the taskbar or overflows a short viewport):

1. **Hero block, everything below must be visible without scrolling the window, at every breakpoint (§2.2–2.4):**
   1. **Name**, Shaka's full name, as a heading.
   2. **Role line**, **"Developer · AI Engineer · Project Lead"** (locked copy, `DECISIONS.md` line 13, verbatim, maximum two lines at any width).
   3. **Location + availability**, one short line pairing where he's based with his current availability status (content agent's exact wording; the pairing and brevity are this spec's call, informed by Astra's structure).
   4. **Proposition**, one sentence stating what he builds and how he works (again, content's wording, the constraint is "one sentence, plain, no jargon-stacking").
   5. **Two CTAs**, adjacent, equal size: **"View case studies"** → opens Case Studies folder. **"Hire me"** → opens Hire Me window. Minimum 44px tap-target height at every breakpoint (desktop side-by-side with a small gap; mobile full-width, stacked with a small gap between).
   6. **Copy-email**, as a separate, smaller action below the CTA pair, not folded into either CTA (restores `REFERENCES.md` R10, which names About as one of copy-email's two homes; my first pass had wrongly dropped this). Same copy/paste/"Copied"-for-~2s behavior as Hire Me's instance (§8), one behavior, two homes, not two different mechanisms.
2. **Avatar image**, existing slot, `IMG-ABOUT-AVATAR` (currently an SVG illustration; confirm with the imagery pass whether it stays illustrative or becomes a photo, not one of the three polaroid photo ASKs).
3. **Master copy**, the existing seven paragraphs, verbatim, no edits, no additions except the closing quote (§6.4 below). Renders all at once on window open, no typewriter.
4. **ASK slot, experience/school paragraph**: content pending from Shaka (school, degree, years building, roles held, `docs/PROGRESS.md` "Waiting on Shaka" #1). Reserves space directly after the master copy and before the quote; ships with a visibly-marked placeholder state, never invented plausible-sounding detail ("Studied at [University]") standing in for a real fact, Astra's memo is explicit that fabricated education is worse than an honest gap, and I agree.
5. **Quote, as closer**: **"If it can be done, I'll do it. Even if it can't, I'll do my best and have fun trying."** (`DECISIONS.md` line 14, verbatim). Last thing in the window before the stack groups.
6. **Grouped stack list** (R5): five labelled groups, **Frontend / Backend / AI / Leadership / Quality**, each holding full-colour brand-stack icons with labels (R4), two columns per group. Do not invent a brand icon for a group that doesn't have one (Leadership has none, label-only entries there, per Astra's adversarial note against inventing brands for non-technical skills).

**Scrolling vs growing**: the window grows with content up to `70vh`, then scrolls internally past that.

**AC-ABOUT-1**: At every breakpoint, the name, role line, location/availability, proposition, and both CTAs are all visible in the About window without any scrolling.
**AC-ABOUT-2**: The role line reads exactly "Developer · AI Engineer · Project Lead".
**AC-ABOUT-3**: "View case studies" opens the Case Studies folder window; "Hire me" opens the Hire Me window; both via the shared `openOrFocusWindow` mechanism (bring-to-front if already open, not a duplicate window).
**AC-ABOUT-4**: The master-copy paragraphs render character-for-character identical to the current `About.tsx` text, with no typewriter animation, full text present in the DOM immediately on window open.
**AC-ABOUT-5**: The quote appears once, as the last text element before the stack groups.
**AC-ABOUT-6**: The stack list is grouped under exactly five labelled headings: Frontend, Backend, AI, Leadership, Quality; no group displays an invented brand icon it doesn't actually have.
**AC-ABOUT-7**: The window body never exceeds `70vh`; content beyond that scrolls inside the window.
**AC-ABOUT-8**: Until the experience/school paragraph content is supplied, its slot renders a visibly-placeholder state, never fabricated-but-plausible text.
**AC-ABOUT-9**: Clicking About's copy-email action copies the correct address and shows the same "Copied" confirmation behavior specified for Hire Me (§8).

---

## 7. Case Studies folder + case study viewer

Replaces the current `Projects` window (`src/data/projects.ts`). Two windows: the folder (thumbnail grid, Explorer-style chrome) and the viewer (one study).

### 7.1 Folder window

- **Chrome**: 920 × 680px on desktop, viewport width minus 16px on mobile. Explorer-style furniture: a menu row, an address row reading "Portfolio / Case Studies," and a status strip reading "7 case studies."
- **Grid**: two columns with a consistent gap, collapsing to one column below a tablet-ish width.
- **Tile anatomy**: a 16:9 sunken video/poster frame, study name/headline beneath, eyebrow (role path · domain · scope), one-line summary, dot-separated evidence row, and, only when `isConcept: true`, the concept badge reading **"Redesign concept · A direction I proposed for this brand, not their current live site."** (`DECISIONS.md` line 16, verbatim). Real/live studies carry no badge.
- **Video behavior, only one tile plays at a time.** `IntersectionObserver` still gates mounting (a tile's video never loads until it's scrolled into the folder window's own visible area), but the folder tracks a single "currently playing" tile, whichever qualifying tile has the highest visibility, and only that one autoplays (muted, looped). Every other tile, regardless of its own visibility, shows its poster. This avoids the exact failure Astra's adversarial pass calls out: several tiles decoding video simultaneously reads as noise, not proof, and costs real battery/bandwidth on mobile hardware. Autoplay is also disabled outright under `prefers-reduced-motion: reduce` and a data-saver preference (`navigator.connection?.saveData` where available), those visitors get posters everywhere plus the touch control below.
- **Touch gets a persistent, always-visible tap-to-play control** on each tile, not a hover-only affordance, since touch has no hover and scroll-triggered autoplay is unreliable to depend on as the only path to seeing a preview move.
- **Sort order**: The Venue Menu leads (real, live, Shaka's own end-to-end product, the strongest verified proof point), then Kamwe Forex, UWA, Frozen Basket, Premium Liquor, Nineteen Twenty-One Flowers, and Hotel site, in that fixed order.
- **The 7 studies**: Kamwe Forex, UWA, Frozen Basket, Premium Liquor, Nineteen Twenty-One Flowers, The Venue Menu, Hotel site.
- A single click/`Enter` on a tile opens that study in the viewer window (§7.2), never a double-click, never an in-place accordion that rearranges the folder itself.

### 7.2 Case study viewer

880 × 740px desktop, 359px-wide mobile. One scrollable window body, document-paper surface inside the grey chrome, essay text capped at **64 characters** per line regardless of window width (a measure, not a pixel value, holds proportionally as the window is resized/dragged).

Top to bottom:

1. **Video**, top of window, same muted/loop/autoplay/`playsInline`/`IntersectionObserver`-mount contract as the folder tile, independently mounted (opening the viewer doesn't depend on the folder tile's play state, and it counts as its own "one visible video" scope separate from the folder). **Loading state**: poster shown until `canplay`. **Error state**: permanent poster, never a broken-media icon.
2. **Lara card**: eyebrow, headline, one-line summary, a dot-separated metric row. **Where a metric isn't verified, the row states "Outcome not yet measured" rather than a plausible-looking invented number**, this is a hard rule, not a stopgap; a fabricated metric is worse than an honest gap.
3. **Concept badge**, when `isConcept: true`, placed immediately below the headline and above the video, not buried in a tooltip, exact copy per §7.1.
4. **Expandable essay sections**, five, always in this order: **Problem / Constraints / What I did / Outcome / What I took from it**. Accordion pattern: each header a `<button aria-expanded aria-controls>`, each panel `role="region" aria-labelledby`. `Enter`/`Space` toggles the focused header; `Tab` moves between headers in document order.
5. **Live / repo links**, icon links, `target="_blank" rel="noreferrer"`, present only when that field is set (§12, most are ASK); an unset field removes the link entirely rather than rendering it disabled.

**AC-CS-1**: The folder window contains exactly 7 tiles, in the fixed order given in §7.1, inside Explorer-style chrome (menu row, address row, status strip).
**AC-CS-2**: A tile's video only begins loading once scrolled into the folder's visible area; at any moment, at most one tile across the whole folder is actually playing video, every other qualifying tile shows a poster.
**AC-CS-3**: With `prefers-reduced-motion: reduce` or a data-saver preference active, no tile autoplays video; all show posters, each with a visible tap/click-to-play control.
**AC-CS-4**: Every `isConcept: true` study's tile and viewer both display the exact concept-badge string; no `isConcept: false` study shows any badge.
**AC-CS-5**: Opening a tile never requires more than one click, and never rearranges the folder grid itself.
**AC-CSV-1**: Opening a tile opens an independent viewer window for that study; opening a second tile while the first viewer is open opens a second, independent viewer.
**AC-CSV-2**: The viewer's video shows its poster immediately on error, with no broken-media icon and no infinite spinner.
**AC-CSV-3**: All five essay sections are present, in the fixed order, on every case study.
**AC-CSV-4**: Each accordion header's `aria-expanded` reflects its current state and toggles via both mouse and keyboard.
**AC-CSV-5**: A study with no `live` or `repo` value renders no link for that field at all.
**AC-CSV-6**: A metric field with no verified value renders "Outcome not yet measured," never a fabricated number.
**AC-CSV-7**: No line of essay body text exceeds 64 characters at any window width the viewer can be resized to.

---

## 8. Hire Me window

New window. 760 × 680px on desktop: a 240px service/contact column, a consistent gap, then the form filling the remaining width. Mobile stacks the service/contact column above the form.

- **Opening copy**: a direct question naming the three practice areas (web / AI / systems), paired with a location + availability line matching the sticky note's wording exactly (§11.2) so the two surfaces never contradict each other. Exact sentences are content's call.
- **Services**, four, matching the rest of the IA's AI/backend split (a correction from my first pass's compressed three, per §0.1): **Web solutions**, **LLM-powered applications and agents**, **Systems and integrations**, **Project leadership**. Each gets one sentence describing an actual deliverable, not a buzzword, content agent's job, this spec only fixes the count and the split.
- **Direct email and booking link** shown above the form, in the service/contact column, not buried below it. If the booking link isn't configured yet, it's omitted outright rather than linking to `#` (§8's ASK below).
- **Copy-email**: address shown as plain text next to a copy control. Click copies it, the control's label flips to **"Copied"** for ~2 seconds (R10's own value) then reverts, and the state change is announced via `aria-live` so a screen-reader visitor gets the same confirmation a sighted one sees, the exact scale/easing of any visual pulse on click is the art director's motion-language call, not locked here.
- **Form fields**: name, email, project type, budget range, message. Labels sit above their fields. Minimum 44px control height; the message field has a minimum 120px height. The budget-range field includes a low-commitment option for a visitor who genuinely doesn't know yet, it must not force a guess.
  - *Idle*: empty, placeholder/label visible, default border.
  - *Focus-visible*: a visible keyboard-focus ring, distinct from mouse-click focus (matching the site-wide focus-indicator fix already in the git log), it must read clearly against both the wallpaper and the flat window body, whatever exact construction the art director settles on.
  - *Invalid*: shown only after a blur or a submit attempt, never mid-first-keystroke; inline error text names the specific problem.
  - *Disabled*: not applicable to any field here.
- **Submit button states**: idle (enabled once name, email, and message are non-empty; project type and budget range stay optional), submitting, success, error.
- **No backend this round** (`DECISIONS.md` line 21). The form is framed throughout as **drafting an enquiry**, not sending a message, its action **opens a local email draft via `mailto:`**, pre-filled from the form fields, and the UI states outright that nothing is transmitted from the site itself. **The literal phrase "Message sent" (or any equivalent false-success claim) must never appear anywhere in this flow.** Because a `mailto:` handoff can't report back whether the visitor's mail client actually opened, the success state's copy says only that the email app should now open, with the copy-email control immediately visible right there as a fallback. **No response-time promise** is made anywhere in this window (no "we'll reply within X" claim this build can't actually back). Error state is reserved for client-side validation failures only, there's no server round-trip to fail against, and per `DECISIONS.md` line 21 no form data leaves the browser except via the visitor's own mail client, by the visitor's own action.
- **Booking link**: ASK, URL pending from Shaka (`PROGRESS.md` #2), omitted entirely until supplied, per the rule above, not shown as a disabled placeholder.

**AC-HIRE-1**: All five fields (name, email, project type, budget range, message) are present; name, email, and message are required, project type and budget range are not; budget range includes an "unsure" option.
**AC-HIRE-2**: An invalid-email submit attempt shows an inline error on the email field and does not trigger the `mailto:` handoff.
**AC-HIRE-3**: A valid submit assembles a `mailto:` link containing the name, project type, budget range, and message as submitted, and attempts to open it.
**AC-HIRE-4**: After a valid submit, the UI shows a success state whose copy does not claim delivery, states plainly that nothing was transmitted from the site, and keeps the copy-email control visible from that state. The string "Message sent" does not appear anywhere in the flow.
**AC-HIRE-5**: Clicking the copy-email control copies the correct address, flips the label to "Copied" for ~2 seconds before reverting, and triggers an `aria-live` announcement of the same.
**AC-HIRE-6**: The booking link is entirely absent from the DOM until a real URL is supplied, not present as a disabled or `#` link.
**AC-HIRE-7**: Tabbing through the form visits fields in visual order, each showing a focus-visible ring on keyboard focus only.
**AC-HIRE-8**: No text anywhere in this window promises a specific response time.

---

## 9. My Approach.txt

New window, Notepad-style per `DECISIONS.md` line 17 (explicitly not the "Zandani approach cards and stat row" idea `REFERENCES.md` rejects).

- Renders as plain running text inside the standard `Window.tsx` shell, no cards, no stat row.
- **Line length cap**: 64 characters (same measure as the case-study essay, §7.2, for consistency across the site's two long-form reading surfaces).
- **Content slot**: intent only, this is where Shaka's actual working philosophy goes. Content agent's job; this spec only fixes the container and its reading-width rule.

**AC-APPROACH-1**: The window renders as continuous text with no card/grid subdivisions.
**AC-APPROACH-2**: No line of body text exceeds 64 characters at any window width.
**AC-APPROACH-3**: The window uses the same `Window.tsx` chrome as every other window.

---

## 10. Merlin

Code today: `src/components/wizard/Wizard.tsx` (raw `click` listener on `.clippy`, ~146–154; idle-animation `setTimeout` loop, ~156–162) and `src/components/wizard/WizardChat.tsx` (bespoke chat markup, not the shared `Window.tsx`, no taskbar entry). Brief item 6: "Merlin glitches after you click him. Fix it."

**Likely cause of the glitch**: a native `click` event fires on `.clippy` whenever `mousedown` and `mouseup` land on the same element, regardless of pointer travel between them. If clippyts' own dragging is implemented via `mousedown`/`mousemove`/`mouseup` on that same element, every completed drag also fires a trailing `click`, which the current code always reads as "toggle the chat panel", producing exactly the reported symptom.

**The lifecycle, made explicit** (adopted from Astra, §0.1, a real improvement over my first pass's plain open/closed toggle):

- **`idle`**, Merlin present on screen (existing roaming, dockable sprite, position and behavior otherwise unchanged from today, §0.1), occasionally playing his idle animation on the existing randomized timer.
- **`opening`**, brief transitional state while the chat window animates in after a qualifying click.
- **`open`**, chat window visible and interactive.
- **`closing`**, brief transitional state while the chat window animates out (minimize or close).

**Click vs. drag, and what a click actually does, this is the core fix:**

- Track `mousedown` position and timestamp on `.clippy`.
- On `mouseup`/native `click`, compute distance moved and elapsed time since that `mousedown`.
- If distance < 6px **and** elapsed time < 400ms: it's a **click**.
- Otherwise: it's a **drag**, and it does nothing to the chat's state, no matter where it ends.
- **A qualifying click never closes the chat.** If the chat is `idle`/closed, a click opens it (`idle → opening → open`). If the chat is already `open`, a click on Merlin **focuses/brings it forward**, it does not close or minimize it. This corrects my first pass, which had a click toggle the panel open/closed, that's the more standard model but it's also *exactly* the shape of "glitchy" behavior the brief complains about (a drag or an accidental second click silently closing a conversation someone's in the middle of). Closing or minimizing only ever happens via the chat window's own close/minimize control, or its taskbar button.

**Idle animation** must not fire while the chat is `open` or `opening`, check state before calling `agent.animate()` (or clear/re-arm the existing `scheduleIdle` timer on state change), and cancel all of Merlin's timers on unmount, not just the ones currently cleaned up.

**Chat as a real window**: `WizardChat.tsx`'s bespoke `.wizard-chat-root` shell is replaced by the shared `Window.tsx` shell (§5); Merlin's chat becomes a real `WindowKey` (`'merlinChat'`) participating in the same `openOrFocusWindow`/`closeWindow`/z-index queue as every other window, which gets it a taskbar button (`IconTask`) for free, following the same focus/minimize contract every other taskbar button already uses.

**AC-MERLIN-1**: Dragging Merlin any distance ≥6px or for ≥400ms does not open, close, focus, or otherwise touch the chat's state, regardless of release point.
**AC-MERLIN-2**: A qualifying click (< 6px, < 400ms) on Merlin while the chat is closed opens it; the same click while the chat is already open brings it to front, it never closes or minimizes it.
**AC-MERLIN-3**: The idle animation never plays while the chat's state is `opening` or `open`.
**AC-MERLIN-4**: Repeating a drag-then-release on Merlin ten times in a row never changes the chat's open/closed state (deterministic, drag never touches it, per AC-MERLIN-1).
**AC-MERLIN-5**: The chat window has a taskbar button, visible only while the chat is open, that minimizes/restores it using the same contract as any other window's taskbar button.
**AC-MERLIN-6**: The chat window uses the shared `Window.tsx` title bar and close button, not bespoke markup.
**AC-MERLIN-7**: All of Merlin's timers (idle-animation, sparkle) are cancelled on unmount, verified by mounting and immediately unmounting the component in a test and confirming no timer fires afterward.

---

## 11. Polaroids, sticky note, and skills orbit

Behavior only, visual styling (frame colours, tape, grain, exact rotation values) is art direction's territory; the pixel positions/sizes below are this spec's layout facts (§0.1), not style picks.

### 11.1 Polaroids

Static position (rejecting draggable polaroids per `REFERENCES.md`'s Rejecting list). On hover (mouse) or focus (keyboard), each straightens to 0°, lifts, and scales per R1's values, desktop only; mobile polaroids (§2.4) are static with no hover lift, since there's no hover on touch and a lift-on-tap would just be a flash with nothing to compare it to. Each polaroid is focusable (so keyboard users get the same moment mouse users get on hover) but its click/`Enter`/`Space` is a deliberate **no-op**, these are decorative photographs, not links; do not wire a placeholder `href="#"`. Alt text carries caption content. Photos themselves are **ASK**, placeholders until Shaka supplies them (`DECISIONS.md` line 19, `PROGRESS.md` #4), and those placeholders must be **visibly labelled as pending** ("Portrait pending" or equivalent), never a stock/generic face standing in as if it were real, and never an invented location caption.

### 11.2 Sticky note

Static position beneath the polaroid cluster (desktop) or beneath the polaroids in the mobile stack (§2.4). Content, top to bottom: availability first, the personal quote second, a contact link last. The quote is the same text as About's closer (§6.4), this is the one piece of copy that appears twice by design, per `DECISIONS.md` line 14. The note's only interactive element is its contact link/CTA, which **opens Hire Me**. Hover changes only the link's underline treatment; the note itself does not bounce or otherwise animate as a whole, and this is identical under reduced motion (there's nothing to reduce). The entire note is not a click target, only the explicit link is.

### 11.3 Skills orbit

A sunken XP-utility-panel treatment, labelled with a short heading naming its purpose (content's exact wording, but it must read as "here's the toolset," not be unlabelled). A visible **Pause control** sits in the panel, letting a visitor stop the rotation without relying on their system's reduced-motion setting, hovering the panel also pauses the whole fan (not per-icon). The panel pauses itself automatically whenever it's scrolled offscreen or the document tab is hidden, regardless of the Pause control's state, for the same reason video autoplay gets gated in §7.1: animating something nobody can see burns battery for nothing. Reduced motion and mobile both render a static fan (no rotation at all, Pause control still present but inert). All orbit instances, the rotating icons themselves, are `aria-hidden="true"`; the accessible, authoritative version of this information is About's grouped stack list (§6, point 6). Do not invent a brand icon for a group/skill that has none (matches §6's same rule).

**AC-DECOR-1**: Hovering (desktop) or focusing (keyboard, any breakpoint) a polaroid triggers the straighten/lift/scale treatment on desktop, or nothing beyond a focus ring on mobile; clicking or pressing Enter on any polaroid navigates nowhere.
**AC-DECOR-2**: Until real photos are supplied, each polaroid placeholder is visibly labelled as pending, not rendered as if it were a real photo.
**AC-DECOR-3**: The sticky note's quote text is character-for-character identical to the quote in About's closer.
**AC-DECOR-4**: Clicking the sticky note's contact link opens the Hire Me window; no other part of the note is clickable.
**AC-DECOR-5**: At 375×812, polaroids render below About, as a non-overlapping horizontal strip, and the note renders below the polaroids as a full-width block.
**AC-DECOR-6**: The skills orbit's Pause control stops the rotation; the rotation also stops automatically when the panel scrolls offscreen or the document tab is hidden, without requiring the visitor to find the Pause control first.
**AC-DECOR-7**: The skills orbit and its ~46 decorative icon instances are absent from the tab sequence (`aria-hidden="true"`), and every skill they represent is independently confirmed present in About's grouped stack list.

---

## 12. Content model

New data lives in `src/data/`, alongside the existing `projects.ts` (retired, its two "loading…" placeholder cards and its self-referential `zulluos` entry, §14, are dropped rather than migrated).

```ts
// src/data/caseStudies.ts
export interface CaseStudyMetric {
  label: string
  value: string        // "Outcome not yet measured" is a valid value, not an error state (§7.2)
  verified: boolean     // false => render the "not yet measured" fallback regardless of `value`
}

export interface CaseStudySection {
  id: 'problem' | 'constraints' | 'what-i-did' | 'outcome' | 'what-i-took-from-it'
  heading: string
  body: string
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  isConcept: boolean
  eyebrow: string
  headline: string
  summary: string
  metrics: CaseStudyMetric[]
  sections: CaseStudySection[]   // always exactly 5, fixed order per §7.2
  stack: string[]
  video?: string                 // muted loop source; absent = poster-only
  poster: string                  // required, loading/error fallback
  live?: string
  repo?: string
}

// src/data/stack.ts
export interface StackGroup {
  id: 'frontend' | 'backend' | 'ai' | 'leadership' | 'quality'
  label: string
  items: { name: string; icon?: string }[]   // icon omitted where no real brand exists (e.g. Leadership), never invented
}

// src/data/services.ts
export interface Service {
  id: string
  name: string   // "Web solutions" / "LLM-powered applications and agents" / "Systems and integrations" / "Project leadership"
  intent: string  // one-line description of an actual deliverable, content agent's copy
}
```

Per-study ASK status (from `PROGRESS.md` "Waiting on Shaka" #3):

| id | isConcept | live | repo | video |
|---|---|---|---|---|
| the-venue-menu | **false** (confirmed) | known | known | ASK, real screen recording, not yet captured |
| kamwe-forex | ASK | ASK | ASK | ASK |
| uwa | ASK | ASK | ASK | ASK |
| frozen-basket | ASK | ASK | ASK | ASK |
| premium-liquor | ASK | ASK | ASK | ASK |
| nineteen-twenty-one-flowers | ASK | ASK | ASK | ASK |
| hotel-site | ASK | ASK | ASK | ASK |

All seven need `eyebrow`, `headline`, `summary`, `metrics` (with `verified` set honestly per study, not defaulted to `true`), and all five `sections` written, a content-agent task against this shape, not an ASK from Shaka (he confirms facts, doesn't write prose).

**Image/video slot IDs** (for `docs/IMAGE-PLAN.md`, not yet written):

- `IMG-ABOUT-AVATAR`
- `IMG-POLAROID-1`, `IMG-POLAROID-2`, `IMG-POLAROID-3` (photos ASK, visibly-pending placeholders per §11.1)
- `IMG-CASESTUDY-<id>-POSTER` × 7
- `VID-CASESTUDY-<id>-LOOP` × 7 (real screen recordings, Playwright + ffmpeg, silent, target under 2MB each, `DECISIONS.md` line 20, not AI-generated)

**AC-CONTENT-1**: `caseStudies.ts` exports exactly 7 `CaseStudy` records, each with exactly 5 `sections` in the fixed order from §7.2.
**AC-CONTENT-2**: Only `the-venue-menu` has `isConcept: false` and populated `live`/`repo` at this stage; every other study's `isConcept`/`live`/`repo` is either a confirmed value from Shaka or explicitly marked pending, not silently guessed.
**AC-CONTENT-3**: No case study record references the retired `projects.ts` placeholder entries (`project-3`, `project-4`, `zulluos`).
**AC-CONTENT-4**: No `CaseStudyMetric` with `verified: false` renders anything other than the "not yet measured" fallback text.

---

## 13. States sweep and keyboard order

Every new interactive element, all applicable states. "-" means the state does not apply.

| Element | Hover | Focus-visible | Active | Disabled | Empty | Loading | Error |
|---|---|---|---|---|---|---|---|
| Desktop icon (×8) | existing icon-hover treatment | existing ring | existing |, |, |, |, |
| Polaroid | straighten/lift/scale, desktop only | same as hover (all breakpoints) |, |, |, |, |, |
| Sticky note contact link | underline change only | ring | pressed |, |, |, |, |
| Skills orbit Pause control | button hover | ring | pressed (rotation stops) |, |, |, |, |
| Skills orbit icons |, (`aria-hidden`) |, |, |, |, |, |, |
| Case Studies shortcut | button hover | ring | pressed |, |, |, |, |
| Case Studies folder tile | overlay/tech list + repo/live icons on hover **and keyboard focus** | ring |, |, | n/a, 7 known studies | poster until mount + `canplay`; only one tile plays at a time (§7.1) | video fails → permanent poster |
| Case study viewer accordion header | subtle hover | ring, `aria-expanded` reflects state | pressed |, |, |, |, |
| Case study viewer video |, |, |, |, |, | poster until `canplay` | poster permanently |
| Hire Me form field | border hover | visible ring (keyboard only) |, |, | placeholder text |, | inline message after blur/submit |
| Hire Me submit button | hover | ring | pressed | disabled until name/email/message non-empty |, | "submitting" label while composing the `mailto:` |, |
| Copy-email (About and Hire Me) | hover | ring | pressed → label flips to "Copied," `aria-live` announces it |, |, |, |, |
| Booking link |, | ring |, | absent entirely until URL supplied (§8) |, |, |, |
| Merlin (`.clippy`) | existing clippyts hover | ring, `role="button"` |, |, |, |, | agent load failure already logged (`failCb`), Merlin simply never appears, no error UI needed |
| Merlin chat taskbar button | existing taskbar hover | existing ring |, |, |, |, |, |
| Merlin chat message log |, |, |, |, |, | typing indicator (existing) |, |
| Boot "Skip" control | hover | ring | pressed |, |, |, |, |

**Keyboard order after boot** (document order to author, matching §3's focus landing and §2.1's DOM order):

1. About window's close button (focus lands here at boot handoff, §3)
2. About's remaining focusables in visual order: name/role (not focusable, static text) → "View case studies" CTA → "Hire me" CTA → copy-email action → any links inside the master copy → then the stack groups (recommend the icons themselves are **not** individually focusable, accessible as a labelled list via group headings, same reasoning as the orbit)
3. Desktop icons, in the §2.1 order: About, Case Studies, Hire Me, My Approach.txt, Terminal, Resume, Device Info, Credits
4. Polaroids (1, 2, 3), focusable, no-op per §11.1
5. Sticky note's contact link
6. Skills orbit's Pause control (the one focusable thing in that widget, the orbit icons themselves stay out of the tab order, §11.3)
7. Case Studies shortcut (below fold)
8. Merlin (`.clippy`)

Any window opened after boot (Case Studies, Hire Me, My Approach.txt, a case study viewer, Merlin's chat) receives focus on its own close button the moment it opens, one rule for "a window just opened," not a special case for the first one.

**AC-STATE-1**: Every row above with a non-"-" Focus-visible state shows a visible focus ring on keyboard `Tab` navigation and shows no such ring on mouse click.
**AC-STATE-2**: Tabbing from page load visits elements in exactly the order listed above.
**AC-STATE-3**: The skills orbit's rotating icons are confirmed absent from the tab sequence; its Pause control is confirmed present in it.
**AC-STATE-4**: A screen reader announces the full skill set via About's grouped stack list even though the orbit is hidden from it.
**AC-STATE-5**: Every focus ring in this table remains visibly distinct against both the wallpaper (where an element sits directly on it) and the flat grey window body (exact construction, width/colour/double-ring, is the art director's call, but it must pass a contrast check in both contexts).

---

## 14. ZulluOS removal + GitLab icon removal

Repo-wide search (case-insensitive, excluding `node_modules`) for "zulluos" found it in 13 files. Two, `scripts/astra/brief.md` and `docs/DECISIONS.md`, are this build's own planning record of the decision to remove the name and stay as history. That leaves **11 files** actually carrying the old name into the shipped product or its immediate docs:

| File | What's there |
|---|---|
| `src/data/projects.ts` | A card with `id: 'zulluos'`; moot once `projects.ts` is retired per §12. |
| `src/img/zullu-icon.svg` | Old-brand icon asset, delete if unused, don't just rename. |
| `src/index.css` | Reference to check and remove. |
| `src/components/wizard/wizard.css` | Reference to check and remove. |
| `src/components/wizard/wizardBrain.ts` | Reference to check and remove, check whether it's a user-visible reply string (must go) or an internal key. |
| `src/components/wizard/Wizard.tsx` | Internal event-name strings (`'zulluos:intro-start'`, `'zulluos:intro-complete'`) plus a comment noting they're a leftover internal identifier. Rename the strings anyway (e.g. `'portfolio:intro-start'`), costs nothing, and `DECISIONS.md` line 18 says "every mention." |
| `src/components/screens/LoadingScreen.tsx` | Same two event-name strings, consumer side, rename in lockstep with Wizard.tsx's dispatch side. |
| `src/App.css` | Reference to check and remove. |
| `public/safari-pinned-tab.svg` | Old brand mark, replace or remove; the Z-mark logo is already retired per `LoadingScreen.tsx`'s own comment. |
| `public/favicon.svg` | Same as above. |
| `DOCUMENTATION.md` | Still describes the site under its old name, update or fold into `docs/`. |

Also check, per Astra's release-discipline note: any **persisted storage key** (ZenFS/IndexedDB) for the string, current keys (`/iconPositions.json`, `/fastBootFlag.json`, and the new `/windowPositions.json` from §4.3) don't contain it, but confirm again once the event-name rename above lands, since a careless rename could introduce a new key that does.

**GitLab icon**: exactly one file, `src/components/Navbar.tsx`, imports `IoLogoGitlab`, renders it as the third social icon (currently `href="#"`, a placeholder anyway). Per brief item 3 and `DECISIONS.md` line 18, this icon is removed outright, the social row goes from three icons to two (LinkedIn, GitHub).

**AC-CLEAN-1**: No string "zulluos" (any case) appears in any file under `src/` or `public/`, and no persisted storage key contains it, after this pass.
**AC-CLEAN-2**: `public/favicon.svg` and `public/safari-pinned-tab.svg` no longer render the retired Z-mark.
**AC-CLEAN-3**: `Navbar.tsx`'s social row renders exactly two icons, LinkedIn and GitHub, at any breakpoint.
**AC-CLEAN-4**: `DOCUMENTATION.md` no longer describes the site under the old name.

---

## 15. User flows

Three flows carry this business. The IA above exists to serve these.

### 15.1 Discover the work
Land on desktop (About open, sales-page hero visible without scrolling) → **"View case studies"** CTA → Case Studies folder → open a tile (single click) → read the Lara card + expand a section or two → live/repo link (leaves the site) or back to the folder.
*IA check*: About's CTA is the shortest path in; nothing requires finding the Case Studies rail icon first.

### 15.2 Get convinced, then reach out
Any entry point (About's hero CTA, a case study, the sticky note, the Hire Me rail icon) → Hire Me → read availability + the four services → fill the form and get an email draft opened (§8), or copy the email directly, or use the booking link once supplied.
*IA check*: four destinations converge on Hire Me (About's CTA, About's copy-email, the sticky note's link, the rail icon), deliberately redundant, since this is the conversion path.

### 15.3 Get to know Shaka the person, not just the work
Land on desktop → About's hero + master copy + (once supplied) the experience/school paragraph + the quote → stack groups for a skims-first read, or the skills orbit as the playful, non-literal version of the same information → optionally Merlin, for a conversational version of the same facts.
*IA check*: this justifies keeping both the orbit (delight) and the grouped stack list (accessible, literal), they serve the same fact to two different visitor postures.

**AC-FLOW-1**: From boot handoff, reaching the Case Studies folder takes exactly one interaction (the About CTA).
**AC-FLOW-2**: From any of About, a case study viewer, or the sticky note, reaching the Hire Me form takes exactly one interaction.
**AC-FLOW-3**: A visitor who never opens Merlin can still access every fact Merlin can state through the desktop windows alone, Merlin is additive, never load-bearing.

---

## Open questions: Shaka's call, not decided here

1. **Boot length.** Astra's memo caps the typed diagnostic boot at 900ms plus a "Skip" control. The brief says Shaka wants the code boot to be seen. This spec keeps the existing typed-text pacing and adds the Skip control (harmless either way) but does **not** impose the 900ms cap, that trade-off (a fast, low-friction load vs. a boot sequence that's part of the experience) is Shaka's to make.
2. **Whether Merlin greets unprompted on load.** Current code auto-speaks a greeting ~800ms after Merlin appears. Astra's memo says no unsolicited speech; nothing in the settled `DECISIONS.md`/`REFERENCES.md` record resolves this either way. Left as-is (auto-greet keeps firing) pending Shaka's preference, this spec's §10 lifecycle work doesn't depend on the answer either way.

## Summary of open ASKs (content/assets, traced to `docs/PROGRESS.md`)

1. Experience/school paragraph content, About §6, ASK slot 4.
2. Email address (for `mailto:` + copy-email) and booking link URL, Hire Me §8.
3. Live URL and concept-confirmation per case study (6 of 7 pending), §12 table.
4. Three photos + captions for the polaroids, §11.1, `IMG-POLAROID-1/2/3`.

None of these block building the surrounding UI, every slot above has a specified placeholder/pending state so the frontend build does not stall on them.

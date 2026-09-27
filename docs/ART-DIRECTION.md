# Art Direction

P1 deliverable, Art Director, 2026-09-24. Binding on every agent. Tokens live in `src/styles/tokens.css` (not imported yet). Grain tile: `src/assets/textures/grain.png`. If a value you need is not here or in the token file, ask. Do not invent it.

Inputs read: `docs/REFERENCES.md`, `docs/DECISIONS.md`, `docs/CREW-LOG.md`, `scripts/astra/brief.md`, `docs/ASTRA-DIRECTION.md`, the parallel `docs/UX-SPEC.md` (read only), the codebase, and the running site at 800x600 (power screen, boot, desktop, About, Merlin greeting).

What I saw on the running site: title bars in the bundled Trebuchet with a navy text shadow, typed monospace About body on flat `#E3E3E3`, 4px blue frames, a taskbar whose brand label is set far larger than anything in the windows, Merlin speaking unprompted over the desktop, and the GitLab icon still in the tray. The chrome is recognisably XP. What's missing is anything that sounds like Shaka personally.

---

## 1. The direction

**XP Luna is the machine. Shaka's hand is written on top of it.** The chrome stays faithful Luna: blue gradient title bars, 3px frames, bevelled grey controls, Bliss, the green Start button. That chrome is the nostalgia, and the nostalgia gets the visit. The premium layer lives only inside windows and on the physical objects on the desktop: warm document paper with a capped measure, an expressive grotesque on authored headings, a fine static grain on the grey bodies, polaroids and a sticky note held on with tan tape. One personal mark runs through all of it: a ballpoint-blue handwriting voice and a single pen underline stroke, wherever Shaka speaks for himself. This comes from the About copy: a kid who made a machine do what he wanted. The OS is the machine. The pen is the kid.

### Blend rules (Astra section 2, adopted with the edits marked)

Do:
1. Keep Luna chrome on every window: 30px title bar, 3px frame (2px under 768px), bevelled controls. About, essays, Hire Me and Merlin's chat all share it.
2. Build hierarchy with space on a 4px base: groups 8 to 16px inside, 24 to 32px between.
3. Use the display face only on authored content: the name, the role line, case-study titles and section headings. Menus, tabs, buttons, labels and window titles stay in the UI face. *(Edit: the display face is Bricolage Grotesque, not Manrope. See section 4.)*
4. Put media inside XP containers: a 1px sunken frame plus a filename strip.
5. Use one motion vocabulary: 120ms feedback, 180ms windows, 220ms object hover (section 8). *(Edit: button feedback moves from 140 to 120ms so it lands on the scale.)*

Don't:
1. No glassmorphism. Remove the taskbar backdrop blur. No translucent bodies, no blurred backdrops.
2. No pills. Circles are allowed only on the orbit chips, the availability dot and the dotted hemisphere.
3. Window titles stay at 13px. Title bars are never replaced with site headers.
4. No frameless floating cards on the wallpaper. Case studies live in a folder window.
5. No interaction tax. Nothing has to finish animating before you can click, and nothing is hidden behind a gesture.

### Astra ledger

| Astra call | Verdict | Reason |
|---|---|---|
| XP stays, About is the sales page | Adopt | Keeps the hook and fixes the hierarchy. |
| Noto Sans for chrome and body | **Overrule**: Fira Sans | Noto Sans Latin is drawn on the Open Sans skeleton (banned by default) and reads as Android system UI. Fira Sans was built for small low-DPI phone screens and has a mono sibling. |
| Manrope for display | **Overrule**: Bricolage Grotesque | Manrope is a cool geometric SaaS face that sits too close to any sans body. Bricolage has ink traps and quirky joins, so it reads as "wild, personal" while staying professional. |
| Caveat for handwriting | Adopt | Defended in section 4. |
| Ubuntu Mono for boot | **Overrule**: Fira Mono | Same skeleton as Fira Sans, so the typed boot and the desktop read as one machine. |
| Role line 28/34 | **Adjust**: 25/31 | At 40/28 the name only beats the role by 1.43x. On a 1.25 ladder, 40/25 gives 1.6x and the name wins the first glance. |
| Title gradient `#0A246A > #0865E7 > #0054E3` | **Overrule** | `#0A246A` is the Windows Classic title colour. We keep the Luna gradient already shipping (tokenised in section 3). |
| `#4B5563` secondary ink | **Overrule**: `#4E5561` | `#4B5563` is Tailwind gray-600 exactly. Ours is computed to hold 4.82:1 even on the sunken panel with grain. |
| `#124A88` link and primary CTA fill | Adopt for links. **Overrule** for the CTA fill | A blue button inside a window with a blue frame and title bar blends into the chrome. The CTA takes XP's own call to action, the Start-button green. |
| `#166534` availability | **Overrule**: `#1E6A26` | `#166534` is Tailwind green-800. Ours comes from the Start-green ramp. |
| Concept badge `#FFF0C2 / #9A6700 / #553B00` | **Adjust**: `#FDF0C8 / #A26F12 / #563B06` | `#9A6700` is GitHub Primer's attention token. Ours is computed (section 3). |
| Window top corners 6px | **Overrule**: 8px | Real Luna tops are about 8px and the build ships 8px today. 6px would read as a regression. |
| Grain: static PNG, black, normal blend, 0.035 | **Adjust** opacity to 0.05 | At 0.035 the mean shift is about 3.6 grey levels, which a mid-range Android panel does not show. At 0.05 ink still measures 10.90:1 on the darkest pixel. |
| Polaroid develop 0.35 to 1 over 280ms | **Adjust**: 560ms with a sepia veil | At 280ms it reads as a generic fade, not a develop. It never blocks input. |
| Focus: 2px `#124A88` plus a white ring | **Adjust**: dual ring, near-white gap plus `#0A246A` | Mathematically at least 3.71:1 against any background, including Bliss sky and blue chrome (section 7.6). |
| Motion 140 / 180 / 220ms, transform and opacity only | Adopt (140 becomes 120) | Stays on the token scale. |
| Orbit: labelled utility, Pause, static on mobile | Adopt | |
| Placeholder labels "Portrait pending" and so on | Adopt | |
| Boot capped at 900ms | **Shaka decides**. I recommend 2400ms plus Skip | Section 10(a). |
| Merlin: no unsolicited speech | Adopt as recommendation, **Shaka decides** | Section 10(b). |
| Remove taskbar blur | Adopt | |

---

## 2. Colour distribution

- **About 60% neutral**: grey window bodies with grain, document paper, fields. On the desktop itself Bliss is the 60%, and we do not recolour it.
- **About 30% Luna blue**: title bars, frames, taskbar, links, selection, the focus ring navy.
- **About 10% accent**: Start green (one primary button per window, the availability signal, the Start button), note yellow (one object) and pen ink (section 9). Green never decorates. If two green buttons are visible in one window, one of them is wrong.

**No dark mode, deliberately.** XP Luna is the product, and commit `3c7cd37` removed the second theme on purpose. An inverted XP is not XP. Declare `color-scheme: only light` on `:root` and add `<meta name="color-scheme" content="only light">`. This opts out of Chromium's auto-dark and stops dark-mode browsers from repainting fields and scrollbars. UAT: verify on Samsung Internet with its dark mode on, since that browser is common on Ugandan Android phones.

---

## 3. Palette

Contrast method: WCAG 2.x relative luminance (sRGB linearised with the 0.04045 threshold, L = 0.2126R + 0.7152G + 0.0722B, ratio = (L1 + 0.05) / (L2 + 0.05)), computed in Python on 2026-09-24. Figures marked (h) were worked by hand with the same formula. Text needs 4.5:1 (3:1 at 24px, or 18.66px bold). UI boundaries and indicators need 3:1.

### 3.1 Primary: Luna blue (hue about 214deg)

| Token | Hex | Role | Reason |
|---|---|---|---|
| `--luna-50` | `#EEF4FC` | Tile hover, callout fill | Hover tint stays in the chrome's hue family |
| `--luna-100` | `#DCE8F9` | Tile pressed or selected, combo button top | |
| `--luna-200` | `#B9D0F2` | Tile hover border, combo button bottom | |
| `--luna-300` | `#8DB2E8` | Scrollbar thumb fill, orbit guide dots | |
| `--luna-400` | `#5E91DC` | Scrollbar thumb hover | |
| `--luna-500` | `#2F71CD` | **Anchor.** Heritage accent, tile pressed border | Retained from the current build: it is the site's recognisable blue |
| `--luna-600` | `#235DB3` | Field hover border, scrollbar thumb border | 4.48:1 on grain grey |
| `--luna-700` | `#124A88` | **Links**, callout rule, info | A darker Luna for reading. 6.22:1 on the darkest grain pixel |
| `--luna-800` | `#0E3A6C` | Link hover and active, combo chevron | |
| `--luna-900` | `#0A246A` | **Focus ring** outer | Deepest Luna. It carries the dual ring on light surfaces |

Chrome (heritage values, tokenised as shipped in `ThemeContext.tsx`):

| Token | Value | Role |
|---|---|---|
| `--xp-title-active` | `linear-gradient(0deg, #003BD6 2%, #0066FD 15%, #0064FD 20%, #0058E6 85%, #368FFC 95%, #0D60E8 98%)` | Active title bar |
| `--xp-title-inactive` | `linear-gradient(0deg, #3F5C9E 2%, #4E6FB3 15%, #4A68AB 85%, #6C88C6 95%, #5874B4 98%)` | Inactive title bar. Designed so title text still passes, which Luna's pale original did not |
| `--xp-frame` | `#003BD6` | Window frame, 3px (2px under 768px) |
| `--xp-taskbar` | `linear-gradient(0deg, #1741A3 0%, #2258D6 9%, #2363DF 22%, #2258D6 82%, #3678CE 93%, #2258D6 100%)` | Taskbar, opaque, no blur |
| `--xp-taskbar-btn` / `-active` | `#2A68D6` / `#173F96` | Open-window buttons |
| `--xp-tray` | `#0A70C6` | Notification area and clock |
| `--xp-select` | `#316AC5` | `::selection`, selected icon caption |
| `--xp-close` / `-hover` / `-pressed` | `#E2583E` / `#D24B31` / `#B63E28` | Close button. Hover goes darker, not lighter as XP did, so the glyph keeps 3:1 |
| `--xp-ctl` | `#2E7BEA` | Minimise and maximise fill |
| `--xp-btn-face` | `linear-gradient(180deg, #FBFBF8 0%, #ECEBE5 86%, #D8D0C4 100%)` | Standard XP button face (heritage) |
| `--xp-btn-border` | `#003C74` | Standard button border (heritage) |
| `--xp-hover-glow` | `#F8B330`, highlight `#FFF0CF` | **Luna hover language**: the amber inner glow on every button |

### 3.2 Secondary: paper (warm, the physical layer)

Why warm: the OS is cool blue, and the objects Shaka put on it are paper. This warm and cool contrast is where "personal" lives.

| Token | Hex | Role |
|---|---|---|
| `--paper-50` | `#FAF8F2` | Document paper in the viewer and Approach |
| `--paper-100` | `#F7F2E8` | Polaroid frame (R1) |
| `--paper-edge` | `#E2DCCD` | 1px paper sheet edge |
| `--paper-300` | `#E4DAC4` | Photo placeholder fill |
| `--paper-tape` | `rgba(181,155,105,.56)`, multiply | Tape strips (R1) |
| `--paper-900` | `#332A17` | Sticky note body ink |
| `--note` | `#FFF1A8` | Sticky note paper |
| `--note-edge` | `#D7C779` | Note 1px edge |
| `--tooltip` | `#FFFFE1` | XP tooltip yellow: Merlin's balloon and tooltips |

### 3.3 Accent: Start green

| Token | Hex | Role |
|---|---|---|
| `--green-500` | `#2A8032` | Primary button gradient top |
| `--green-600` | `#1E6A26` | Primary button gradient bottom, availability text and dot (`--success`) |
| `--green-700` | `#185A1F` | Primary button border and pressed state |
| `--green-boot` | `#72D07A` | Boot "OK" only |

Reason: in XP, green meant "go". The Start button was the one green control on the screen, and it is the only hue in our chrome that isn't blue.

### 3.4 Neutral ramp (cool, tinted toward Luna hue 214deg by 5 to 12% saturation)

| Token | Hex | Role |
|---|---|---|
| `--n-0` | `#FAFBFE` | Text on blue and green, focus-ring gap, bevel highlight. Used instead of `#FFFFFF`: it has a slight Luna tint and passes everywhere white would |
| `--field` | `#FBFCFD` | Inputs, Explorer content pane, Approach edit area |
| `--n-50` | `#F3F4F6` | Menu and overlay surface |
| `--n-100` | `#EAEBEE` | Menu row, status strip, scrollbar track, filename strip |
| `--n-150` | `#E3E3E3` | **Window body.** The one untinted neutral: it is the look the brief names, and the grain supplies the texture |
| `--n-200` | `#D9DADE` | Sunken utility panel (orbit) |
| `--n-300` | `#BDC1C8` | Decorative dividers, disabled borders, chip borders |
| `--n-400` | `#979DA7` | Bevel shadow edge, media frame border |
| `--n-500` | `#737A85` | Disabled text only |
| `--n-600` | `#4E5561` | **Secondary ink** (`--ink-2`) |
| `--n-800` | `#2A2F37` | Poster fill, placeholder label, balloon border |
| `--n-900` | `#20242A` | **Main ink** (`--ink`). No `#000000`: pure black next to the grey reads harsh, and this keeps the Luna tint |

Also `--pen` `#1F3D99`: ballpoint blue, the signature ink (section 9).

### 3.5 Semantic

| Token | Hex | Use |
|---|---|---|
| `--success` | `#1E6A26` | Availability. Always shown with the words, never colour alone |
| `--danger` | `#A8322B` | Field errors. A brick red taken from the close button's family, not stock red |
| `--concept-fill` / `-border` / `-ink` | `#FDF0C8` / `#A26F12` / `#563B06` | Concept badge (warning family) |
| `--info` | `#124A88` | Same as the link. Info is never decorative |

### 3.6 Surfaces

| Elevation | Token | Treatment |
|---|---|---|
| Desktop | wallpaper | Bliss, a fixed layer, never recoloured |
| Window (raised) | `--n-150` plus grain | Frame plus `--shadow-window` |
| Paper (inset document) | `--paper-50` | 1px `--paper-edge`, `--shadow-paper` |
| Sunken panel | `--n-200` plus grain | `--bevel-sunken` |
| Field | `--field` | 1px `--field-border`, inset hairline |
| Overlay (menu, tooltip) | `--n-50` or `--tooltip` | `--shadow-menu` |

### 3.7 Grain maths

The composite of black noise at alpha `a` under layer opacity `o` is `c' = c x (1 - o x a)`. The tile's measured mean alpha is 0.451 and its max is 1.0. With `o = 0.05`:
- Body `#E3E3E3` (227): the darkest pixel is 227 x 0.95 = 215.65, which is `#D8D8D8`. The mean is 227 x (1 - 0.05 x 0.451) = 221.9, which is `#DEDEDE`.
- Sunken `#D9DADE`: the darkest pixel is `#CECFD3`.

Contrast is quoted against the darkest pixel, which is the worst case. A glyph actually sits on the local mean, which is better.

### 3.8 Contrast table (every text and UI pair that ships)

| Pair | Ratio | Need | Result |
|---|---|---|---|
| Ink `#20242A` on body `#E3E3E3` | 12.15 | 4.5 | Pass |
| Ink on body plus grain, darkest `#D8D8D8` | **10.90** | 4.5 | Pass |
| Ink on body plus grain, mean `#DEDEDE` | 11.57 | 4.5 | Pass |
| Ink-2 `#4E5561` on body | 5.85 | 4.5 | Pass |
| Ink-2 on body plus grain, darkest | **5.27** | 4.5 | Pass |
| Ink on sunken plus grain `#CECFD3` | 10.02 | 4.5 | Pass |
| Ink-2 on sunken plus grain | 4.82 | 4.5 | Pass |
| Link `#124A88` on body plus grain | 6.22 | 4.5 | Pass |
| Link hover `#0E3A6C` on body plus grain | 7.98 | 4.5 | Pass |
| Link on paper `#FAF8F2` | 8.38 | 4.5 | Pass |
| Link on note `#FFF1A8` | 7.79 | 4.5 | Pass |
| Pen `#1F3D99` on body plus grain / body / note / polaroid / paper | 6.72 / 7.49 / 8.42 / 8.61 / 9.05 | 4.5 | Pass |
| Success `#1E6A26` on body plus grain / note | 4.67 / 5.85 | 4.5 | Pass |
| Note ink `#332A17` on note | 12.40 | 4.5 | Pass |
| Ink-2 on note | 6.58 | 4.5 | Pass |
| Danger `#A8322B` on body plus grain / field | 4.65 / 6.48 | 4.5 | Pass |
| Ink / ink-2 on field `#FBFCFD` | 15.18 / 7.31 | 4.5 | Pass |
| Ink / ink-2 on paper | 14.68 / 7.07 | 4.5 | Pass |
| Ink / ink-2 on luna-50 (tile hover, callout) | 14.09 / 6.28 | 4.5 | Pass |
| Ink-2 on luna-100 (tile pressed) | 6.06 | 4.5 | Pass |
| Concept ink on concept fill | 9.13 | 4.5 | Pass |
| `--n-0` on primary top `#2A8032` / bottom `#1E6A26` | 4.80 / 6.45 | 4.5 | Pass |
| Ink on the lightest XP button stop `#D8D0C4` | 10.20 | 4.5 | Pass |
| Title text on the lightest stop under the glyphs `#0066FD` / mid `#0058E6` | 4.70 / 5.74 | 4.5 | Pass |
| Title text on the inactive glyph zone `#4E6FB3` | 4.75 (h) | 4.5 | Pass |
| Taskbar text on `#2363DF` / `#2258D6` | 5.17 / 5.91 | 4.5 | Pass. The `#3678CE` band at 93% (4.29) sits below the glyphs |
| Taskbar button text on `#2A68D6` | 5.0 (h) | 4.5 | Pass |
| Clock on tray `#0A70C6` | 4.89 (h) | 4.5 | Pass. `#0F87E6` measured 3.61 and was rejected |
| Selection text on `#316AC5` | 5.08 | 4.5 | Pass |
| Ink on tooltip `#FFFFE1` | 15.32 | 4.5 | Pass |
| Ink on orbit header `#E4E3DC` | 12.11 | 4.5 | Pass |
| Placeholder label `#2A2F37` on `#E4DAC4` | 9.69 | 4.5 | Pass |
| Boot text `#C8D1D9` / dim `#8A96A3` / OK `#72D07A` on `#0B0D10` | 12.58 / 6.46 / 10.21 | 4.5 | Pass |
| Overlay text `--n-0` on the video scrim over a white frame (composite about `#363941`) | 11.2 (h) | 4.5 | Pass |
| Icon caption `--n-0` on its halo `#06163D` | 17.06 | 4.5 | Pass. Against bare wallpaper it is 1.03 to 2.95, so the halo is mandatory |
| Disabled `#737A85` on body / on disabled field `#EEEFF1` | 3.37 / 3.76 | exempt | Kept at 3:1 or better anyway |
| UI: field border `#516D8F` on body plus grain / field | 3.75 / 5.20 | 3.0 | Pass. XP's `#7F9DB9` measured about 2.3 and was rejected |
| UI: field hover border `#235DB3` on body plus grain | 4.48 | 3.0 | Pass |
| UI: danger border on field | 6.48 | 3.0 | Pass |
| UI: secondary button border `#003C74` on body | 8.62 | 3.0 | Pass |
| UI: primary button body on window body | 5.20 | 3.0 | Pass |
| UI: close glyph on rest / hover / pressed | 3.56 / 4.24 / 5.47 | 3.0 | Pass. The lighter XP hover `#EC7058` measured 2.89 and was rejected |
| UI: scrollbar thumb border `#235DB3` on track | 5.36 | 3.0 | Pass |
| UI: concept border on fill / paper | 3.83 / 4.10 | 3.0 | Pass |
| UI: Pause button border `#737A85` on header | 3.36 | 3.0 | Pass |
| UI: focus ring `#0A246A` on grain / paper / note / field | 9.97 / 13.42 / 12.49 / 13.88 | 3.0 | Pass |
| UI: focus gap `--n-0` on title / taskbar / green | 5.74 / 5.17 / 6.45 | 3.0 | Pass |
| UI: **dual ring worst case on any background** | **3.71** | 3.0 | Pass (derivation in 7.6) |

Wallpaper, measured by sampling `xpCompress.jpg` (1920x1200). Icon rail: darkest `#4194FD`, median `#90CCFE`, lightest `#FFFFFF`. Polaroid zone: darkest `#0D66FE`. Hill: darkest `#08070E`, median `#3C6003`.

---

## 4. Typography

### 4.1 Families

| Role | Family | Package (self-hosted, `font-display: swap` from Fontsource) | Weights | Licence |
|---|---|---|---|---|
| UI and body: chrome, menus, buttons, labels, paragraphs, numerals | **Fira Sans** | `@fontsource/fira-sans` 5.3.x: `400.css`, `600.css`, `700.css`, `400-italic.css` | 400, 600, 700, 400i | SIL OFL 1.1 |
| Display: name, role, case-study titles, section heads, Start label | **Bricolage Grotesque** (variable, wght) | `@fontsource-variable/bricolage-grotesque` 5.3.x: `index.css`. Family name `'Bricolage Grotesque Variable'` | 500, 600, 700, 800 | SIL OFL 1.1 |
| Handwriting (the signature) | **Caveat** (variable, wght) | `@fontsource-variable/caveat` 5.3.x: `index.css`. Family name `'Caveat Variable'` | 500, 600 | SIL OFL 1.1 |
| Boot, terminal, filename strips | **Fira Mono** | `@fontsource/fira-mono` 5.3.x: `400.css` | 400 | SIL OFL 1.1 |

Licence files ship in each package. The OFL permits self-hosting on a commercial site.

**Why Fira Sans.** XP's chrome voice was Trebuchet MS in the title bars and Tahoma in dialogs: humanist, open, built for low-resolution screens. Fira Sans comes from the same brief: Erik Spiekermann drew it for Firefox OS phones, so 13px chrome stays crisp on the mid-range Android screens most Kampala visitors will use. It has true tabular figures, `latin-ext` coverage (including ŋ for Luganda names), and a mono sibling. It is not on the banned list. It is still well known, and that's acceptable: it is the quiet half of a contrast pairing.

**Why Bricolage Grotesque.** The brief asks for Aashish's "wild, personal, creative" inside a professional frame. Bricolage is a grotesque with ink traps and slightly unruly joins that show at 25px and above. At 40/700 it reads like a person, not a SaaS dashboard, and it keeps the humanist quirk Trebuchet had. **Pairing relationship:** a contrast pairing. Expressive grotesque display against a humanist workhorse, both warm and neither geometric.

**Why Caveat, which is widely used.** The note quote is fixed copy that must be read, not glanced at, at 21px on a phone. Caveat has the largest x-height and the most regular letter widths among the free ballpoint-style scripts, and its weight axis lets the stroke match a real ballpoint at 500. A more characterful script (Homemade Apple, Reenie Beanie) fails that legibility test at 16px on the polaroid captions.

**Why Fira Mono.** It is the same skeleton as Fira Sans, so the typed boot hands over to a desktop in the same letterforms.

**Retire:** `src/fonts/trebuc.ttf` (Microsoft font, webfont redistribution not licensed), `Montserrat-*.ttf` (never loaded, and banned by default), `UbuntuMono-*.ttf`, and the `@font-face` at `App.css:77-81`.

### 4.2 One system on every text node

- `html { font-family: var(--font-ui); font-variant-numeric: lining-nums proportional-nums; }`
- `button, input, select, textarea { font: inherit; color: inherit; }` Browsers do not inherit fonts into form controls. Without this, Hire Me renders in system fonts.
- xterm: `new Terminal({ fontFamily: "'Fira Mono', monospace", fontSize: 13 })`. react-console-emulator: set `contentStyle`/`inputStyle` to `var(--font-mono)`.
- clippyts: override `.clippy-balloon`, `.clippy-content` to `font: 400 13px/18px var(--font-ui); color: var(--ink); background: var(--tooltip)`.
- Numerals: `font-variant-numeric: tabular-nums` on the clock, the status strip ("7 case studies"), dates, budget ranges and the filename-strip durations. Prose keeps proportional lining figures. Display numerals in Bricolage are fine as they are.
- `font-synthesis: none` globally, so there are no faux bold or faux italic weights.

### 4.3 Scale (ratio 1.25 for documents, fixed 13px for chrome)

| Token | 375px | 1440px | Line height | Family / weight | Tracking | Use |
|---|---|---|---|---|---|---|
| `--fs-display-xl` | 28 | 40 | 1.1 | Bricolage 700 | -0.02em | Name |
| `--fs-display-l` | 20 | 25 | 1.24 | Bricolage 500 | -0.012em | Role line |
| `--fs-display-m` | 23 | 31 | 1.2 | Bricolage 700 | -0.015em | Case-study title |
| `--fs-title` | 18 | 20 | 1.3 | Bricolage 600 | -0.005em | Tile headline, essay section heads |
| `--fs-lead` | 15 | 18 | 1.5 | Fira Sans 400 | 0 | Proposition line |
| `--fs-body` | 15 | 16 | 1.55 | Fira Sans 400 | 0 | Paragraphs, capped at 64ch |
| `--fs-ui` | 15 | 15 | 1 | Fira Sans 600 | 0.005em | CTA labels |
| `--fs-small` | 14 | 14 | 1.5 | Fira Sans 400 | 0 | Tile summary, tertiary actions |
| `--fs-chrome` | 13 | 13 | 18px | Fira Sans 400 (700 on title bars) | 0 | Menus, labels, title bars, taskbar |
| `--fs-meta` | 12 | 12 | 18px | Fira Sans 600 eyebrow, 400 meta | 0.02em | Eyebrow, evidence row, status strip |
| `--fs-hand-note` | 21 | 23 | 1.17 | Caveat 500 | 0 | Note quote, About closer |
| `--fs-hand-caption` | 16 | 18 | 1.1 | Caveat 500 | 0.01em | Polaroid captions |
| `--fs-hand-head` | 24 | 26 | 1.15 | Caveat 600 | 0 | "What I took from it" |
| `--fs-boot` | 12 | 14 | 1.45 | Fira Mono 400 | 0 | Boot |

Fluid values are in the token file as `clamp()`, linear between 375 and 1440. Title-bar text is 13px Fira Sans 700 in `--n-0` with `text-shadow: 1px 1px 0 #0A1F7A`, which is the Luna emboss. Nothing uses the taskbar's current oversized brand label size.

### 4.4 Load strategy

1. Import the CSS in `main.tsx` in this order: fira-mono 400, fira-sans 400/600/700, bricolage variable, caveat variable, fira-sans 400-italic.
2. Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `index.html` for four files only, via Vite `?url` imports or copied paths:
   `fira-mono-latin-400-normal.woff2` (the boot is first paint), `fira-sans-latin-400-normal.woff2`, `fira-sans-latin-700-normal.woff2` (title bars at handoff), `bricolage-grotesque-latin-wght-normal.woff2` (the name is the first thing read).
3. **Nothing blocks the boot.** The boot renders at once in Fira Mono or its fallback and never awaits `document.fonts`.
4. When the boot starts, fire and forget `document.fonts.load()` for `600 13px 'Fira Sans'`, `500 23px 'Caveat Variable'` and `600 26px 'Caveat Variable'`. Caveat is warmed during the boot and never preloaded. The italic loads on demand.
5. Metric-matched fallbacks: generate `'Fira Sans Fallback'`, `'Bricolage Fallback'` and `'Caveat Fallback'` (all from `local('Arial')`) and `'Fira Mono Fallback'` (from `local('Courier New')`), each with `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override`, using Capsize metrics (`@capsizecss/metrics`) or `fontaine`. Do not hand-guess the numbers. The token stacks already name these families.
6. Budget: the four preloaded files must total 110KB or less, and all latin woff2 must total 240KB or less. Measure in `dist/`. If Bricolage latin-wght is over 60KB, report it and do not swap faces yourself.

---

## 5. Spacing, radius, elevation

**Spacing** on a 4px base: `--sp-1` 4, `--sp-2` 8, `--sp-3` 12, `--sp-4` 16, `--sp-5` 20, `--sp-6` 24, `--sp-7` 28, `--sp-8` 32, `--sp-10` 40, `--sp-12` 48, `--sp-16` 64. Related items take 8 to 16px. Groups and sections take 24 to 32px. Content layout comes before containers: About does not box its groups.

**Radius, by rule, never uniform:**

| Token | Value | Only on |
|---|---|---|
| `--radius-0` | 0 | Inputs, selects, textarea (XP fields were square), media frames, photos, menus, the taskbar |
| `--radius-paper` | 1px | Polaroid frame, sticky note, document paper |
| `--radius-control` | 3px | Buttons, taskbar buttons, title-bar controls, badges, tile hover rect, icon hover rect |
| `--radius-tile` | 6px | Brand-icon tiles in the stack list, tooltip and Merlin balloon |
| `--radius-window` | 8px 8px 0 0 | Window tops only |
| `--radius-start` | 0 10px 10px 0 | Start button only |
| `--radius-round` | 50% | Orbit chips, availability dot, dotted hemisphere |

**Elevation.** Every shadow is tinted navy `rgb(14,26,58)` or `rgb(8,24,72)`, never black. Low opacity, and paired: a tight contact shadow plus a soft ambient one.

| Token | Value | Use |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(14,26,58,.14)` | Orbit chips, icon tiles |
| `--shadow-paper` | `0 1px 2px rgba(14,26,58,.10), 0 4px 14px rgba(14,26,58,.08)` | Document paper |
| `--shadow-object` | `0 1px 2px rgba(14,26,58,.14), 0 3px 7px rgba(14,26,58,.20)` | Polaroid at rest |
| `--shadow-object-lift` | `0 3px 5px rgba(14,26,58,.12), 0 10px 18px rgba(14,26,58,.25)` | Polaroid on hover |
| `--shadow-note` | `1px 2px 3px rgba(14,26,58,.14), 2px 8px 14px rgba(14,26,58,.16)` | Sticky note |
| `--shadow-window` | `0 2px 4px rgba(8,24,72,.22), 0 12px 28px rgba(8,24,72,.24)` | Active window |
| `--shadow-window-inactive` | `0 2px 4px rgba(8,24,72,.16), 0 8px 18px rgba(8,24,72,.14)` | Inactive window |
| `--shadow-menu` | `2px 3px 5px rgba(8,24,72,.30)` | Menus and tooltips (XP used a hard offset) |
| `--bevel-raised` | `inset 1px 1px 0 #FAFBFE, inset -1px -1px 0 #979DA7` | Toolbar and header strips |
| `--bevel-sunken` | `inset 1px 1px 0 #979DA7, inset -1px -1px 0 #FAFBFE` | Sunken panels, media frames |
| `--shadow-press` | `inset 0 2px 3px rgba(8,30,12,.28)` | Primary pressed |
| `--shadow-press-neutral` | `inset 0 2px 3px rgba(14,26,58,.22)` | Secondary and taskbar pressed |

---

## 6. Grain

- **Asset:** `src/assets/textures/grain.png`, 128x128, greyscale plus alpha. Every pixel is black, and alpha follows a Gaussian (mean 0.45, sd 0.22, clipped 0 to 1) quantised to 32 levels, with seed 2026 so it is reproducible. 18,036 bytes. The measured mean alpha is 0.451.
- **Technique:**
  ```css
  .grain { position: relative; isolation: isolate; background-color: var(--n-150); }
  .grain::before { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
    background: url("../assets/textures/grain.png") repeat 0 0 / var(--grain-size);
    opacity: var(--grain-opacity); mix-blend-mode: normal; }
  ```
  `isolation` plus `z-index: -1` puts the noise above the surface colour and below every child. There is no text shadow to compensate.
- **Tile size:** `--grain-size: 128px` (CSS px). On 2x screens each noise cell covers 2x2 device pixels, which reads as film grain rather than static.
- **Opacity:** `--grain-opacity: 0.05` on window bodies. Sunken panels use the same value (4.82:1 floor verified).
- **Included:** grey window bodies (About, Hire Me, the viewer's grey surround, Approach's grey margin, Merlin chat body) and grey utility panels (orbit panel, stack group area).
- **Excluded:** title bars, frames, taskbar, wallpaper, document paper, polaroid frames and photos, note paper, video and posters, inputs and fields, the Explorer content pane, menus, tooltips, the boot screen.
- **Never:** animated grain, canvas or SVG `feTurbulence` at runtime, or grain over text on paper.
- **Verification (UAT):** screenshot About at 100% and 200% zoom and sample the pixel under a body glyph. It must match the figures in section 3.8.

---

## 7. Object specs

Global rules for every interactive object: the hover styles apply only under `@media (hover: hover) and (pointer: fine)`. Touch targets are 44x44px or larger (use a pseudo-element to extend the hit area when the visible control is smaller). Every state change uses the tokens in section 8.

### 7.1 Sticky note

- **Desktop:** 352x228px, padding 18px, `--note` fill, 1px `--note-edge`, `--radius-paper`, rotate(-1deg), `--shadow-note`. Tape: 68x20px, `--paper-tape` with multiply blend, centred, overlapping the top edge by 8px, rotate(+2deg) relative to the note.
- **Content, top to bottom:**
  1. 8px `--success` dot (radius-round) plus **Available for work**, Fira Sans 700 15/21 in `--paper-900`.
  2. Service line, Fira Sans 400 13/19 in `--paper-900`.
  3. The quote in Caveat 500 `--fs-hand-note`, `--pen`.
  4. The CTA link, Fira Sans 600 14px in `--luna-700` with a trailing "→".
- **CTA hover:** the pen underline (section 9) draws under the label over `--dur-pen` with `--ease-draw`, and the arrow moves translateX(3px) over `--dur-micro`. The note itself never moves.
- **Focus-visible:** dual ring on the link (it rotates with the note).
- **Active:** link colour `--luna-800`, the arrow returns to 0.
- **Disabled:** none.
- **Reduced motion:** the underline appears fully drawn on hover, with no draw and no arrow shift.
- **Mobile (at or below 767px):** 343x206px, padding 16px, quote at 21/24, rotate(-0.5deg), no hover. The CTA stays a text link with a 44px hit area.
- **Tablet (768px):** same as desktop.
- Only the CTA is interactive. The note surface is not a click target.

### 7.2 Polaroids (3, placeholders, marked ASK)

- **Desktop:** 128x164px frame, `--paper-100`, padding 10px at the sides and top, 34px caption strip, `--radius-paper`, `--shadow-object`. Rotations -3deg, +1.5deg, +3deg. Tape: 48x16px, `--paper-tape` multiply, centred on the top edge, rotations +4deg, -3deg, +2deg.
- **Photo well:** 108x120px, `--radius-0`, `--paper-300` fill with an inset 1px `rgba(14,26,58,.10)`. Placeholder content: a Tabler `TbPhoto` 20px glyph in `--n-800` above the label "Portrait pending", "Building pending" or "Kampala pending" in Fira Sans 600 12/16 `--n-800` (9.69:1). Add `data-image-slot="ASK"` on each well. No stock faces and no invented places.
- **Caption:** Caveat 500 `--fs-hand-caption`, `--pen`, centred. The caption copy is the content agent's call.
- **Develop (first view only):** a `--develop-veil` layer (`#4A3F2E`) over the well fades from 0.72 to 0, and the well content fades from 0.35 to 1, over `--dur-develop` with `--ease-out`, staggered `--stagger-object` left to right. It starts at handoff plus 480ms (section 8.2). Opacity only.
- **Hover (fine pointers):** rotate to 0deg, translateY(-12px), scale(1.025) over `--dur-object` with `--ease-lift`. The return takes 280ms with `--ease-out`. The shadow crossfades to `--shadow-object-lift` via a pseudo-element's opacity, so the box-shadow itself is never animated.
- **Focus / active / disabled:** not applicable. Polaroids are `role="img"` with alt text and are not focusable, so keyboard users lose nothing.
- **Reduced motion:** no develop (rendered final), no lift or rotate. Hover only crossfades the lift shadow.
- **Mobile:** 96x126px, padding 6px at the sides and top, 30px caption strip, captions 16/18, tape 36x12px, rotations kept and static, no hover. Never draggable.

### 7.3 Skills orbit panel

- **Desktop panel:** 640x360px, `--n-200` plus grain, `--bevel-sunken`, `--radius-0`.
- **Header strip:** 26px tall, `linear-gradient(180deg, #F5F5F1, #E4E3DC)`, `--bevel-raised`. "Tools I work with" in Fira Sans 700 13px `--ink`.
- **Pause control** at the right of the header: a 22px-high XP standard button (section 7.5 secondary, compact) with a 44px hit area. It shows `TbPlayerPause` 14px plus "Pause", and when paused it swaps to `TbPlayerPlay` plus "Play" with `aria-pressed`.
- **Geometry (Astra adopted):**
  - centre (320, 316), clipped to the upper half;
  - rings at radii 108 / 166 / 224 / 282 carrying 8 / 10 / 12 / 16 chips.
- **Guide arcs:** 1px dashed `--luna-300` at 45% opacity.
- **Dotted hemisphere:** 128px diameter, `radial-gradient(circle, var(--luna-300) 1px, transparent 1.5px) 0 0 / 6px 6px`, masked to a half-disc.
- **Chips:** 32px circle, `--field` fill, 1px `--n-300`, `--shadow-xs`, holding an 18px Simple Icons glyph in its brand colour. The chip gives low-contrast brand colours (JavaScript yellow, for example) a ground. All chips are `aria-hidden`.
- **Motion:** ring containers rotate linearly at `--orbit-1` to `--orbit-4` (18 / 24 / 30 / 38s), alternating direction, and the chips counter-rotate so they stay upright.
- **Hover over the panel:** the whole fan pauses (`animation-play-state: paused`). The hovered chip scales to 1.12 over `--dur-micro` and shows its name below in Fira Sans 600 12px `--ink` on a `--tooltip` label. This is a bonus, because the grouped list is the authoritative version.
- **Pause control states:** hover shows the amber inner glow, focus shows the dual ring, and active is pressed.
- **Offscreen or document hidden:** paused through IntersectionObserver and `visibilitychange`.
- **Disabled:** not applicable.
- **Reduced motion:** a static fan, and the Pause control is not rendered because there is nothing to pause.
- **Mobile:** 343x210px, geometry scaled uniformly (x0.536), static, no control, and chips at 20px with 12px glyphs.

### 7.4 Concept badge

- **Style:** inline-block, max-width 100% (it wraps). Padding 4px 8px, `--concept-fill`, 1px `--concept-border`, `--radius-control`. Text is Fira Sans 12/18 `--concept-ink`: "Redesign concept" in 700, then " · " and the rest of the sentence in 400. No icon, no tooltip.
- **Placement:** directly under the viewer title and above the media. The tile shows the same badge above its eyebrow.
- **States:** not interactive, so it has no hover, focus, active or disabled state.
- **Reduced motion:** not applicable.
- **Mobile:** same size, full-width wrap.

### 7.5 CTA buttons

The shared rule is Luna's: **hover is an amber inner glow** (`inset 0 0 0 2px #F8B330, inset 0 2px 0 2px #FFF0CF`). The fill never lightens, so text contrast never drops on hover.

| | Primary (Start green) | Secondary (XP standard) | Tertiary (text action, for example Copy email) |
|---|---|---|---|
| **Size** | 44px high, padding 0 20px, minimum width 128px, `--radius-control` | Same | 44px hit area, visible text only |
| **Type** | Fira Sans 600 `--fs-ui` in `--n-0`, `text-shadow: 0 1px 0 rgba(8,40,12,.35)` | Fira Sans 600 `--fs-ui` in `--ink` | Fira Sans 600 `--fs-small` in `--luna-700`, underline 1px, offset 3px, leading 16px Tabler glyph |
| **Rest** | `linear-gradient(180deg, #2A8032, #1E6A26)`, 1px `--green-700`, `inset 0 1px 0 rgba(250,251,254,.28)` | `--xp-btn-face`, 1px `--xp-btn-border` | |
| **Hover** | Amber glow added | Amber glow added | Underline 2px, colour `--luna-800` |
| **Focus-visible** | Dual ring (7.6) | Dual ring | Dual ring |
| **Active** | `linear-gradient(180deg, #1E6A26, #185A1F)`, `--shadow-press`, label translateY(1px), no glow | Reversed face `linear-gradient(180deg, #D8D0C4, #ECEBE5 14%, #F4F3EE)`, `--shadow-press-neutral`, label translateY(1px) | `--luna-800`, no underline change |
| **Disabled** | Takes the secondary-disabled look, because a pale green reads as success: flat `#F1F1EE`, 1px `--n-300`, text `--n-500`, `cursor: not-allowed`, no hover | Same as primary-disabled | `--n-500`, no underline |
| **Loading** | Not used this round (mailto and clipboard are instant) | | |
| **Reduced motion** | Colour changes only, no translate | Same | Same |
| **Mobile** | Full width in About (UX), 44px, 8px gap | Same | Same |

Assignment: **primary goes on "View case studies"** in About, and on "Open email draft" in Hire Me. There is at most one primary per window. Reason: proof comes before the enquiry, and Hire Me already has two other first-viewport routes (the sticky note and the desktop icon). "Hire me" in About is secondary.

### 7.6 Focus ring

- **Spec:**
  ```css
  :focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px var(--focus-gap), 0 0 0 4px var(--focus-ring);
  }
  ```
  `--focus-gap` is `#FAFBFE` and `--focus-ring` is `#0A246A`. The transparent outline is what Windows forced-colours mode draws. Radius follows the element's own.
- **Why it works everywhere:** one ring is near-white (L 0.965) and one is navy (L 0.0204). The worst background is the one where both contrasts are equal, at L = sqrt(1.015 x 0.0704) - 0.05 = 0.223, and there each ring still gives **3.71:1**. Against any other colour one ring does better. This covers Bliss, blue chrome, green buttons and yellow paper with one rule.
- **Inputs:** use `:focus` (a text field always shows focus) plus a border in `--luna-700`.
- **Timing:** appears instantly, never animated. It replaces the ad-hoc ring at `App.css` (`.icon-task :focus-visible` and friends).
- **Reduced motion:** identical.
- **Mobile:** identical, and it only shows with a hardware keyboard.

### 7.7 Case Studies folder tile

- **Explorer window chrome:**
  - Menu row: `--n-100`, Fira Sans 13px.
  - Address row: a `--field` box with a `--field-border` border, reading "Portfolio / Case Studies".
  - Status strip: `--n-100` with a top border in `--n-300`, Fira Sans 12px `--ink-2`, tabular numerals.
  - Content pane: `--field`, no grain.
- **Tile:** padding 12px, 1px transparent border (so hover does not shift layout), `--radius-control`, transparent fill.
- **Media:** 16:9, 1px `--n-400`, `--bevel-sunken`, `--radius-0`, poster fill `--n-800`. If there is no video yet, centre "Walkthrough pending" in Fira Sans 600 13px `--n-100`.
- **Filename strip** under the media: 22px, `--n-100`, Fira Mono 12px `--ink-2`, for example `venue-menu-walkthrough.mp4 · 0:12`.
- **Text:**
  - Eyebrow: Fira Sans 600 12/18 `--ink-2`, sentence case, +0.02em.
  - Headline: Bricolage 600 `--fs-title` `--ink`.
  - Summary: Fira Sans 400 14/21 `--ink`.
  - Evidence row: Fira Sans 400 12/18 `--ink-2`, " · " separators.
  - Concept badge above the eyebrow where applicable.
- **Hover:** fill `--luna-50`, border `--luna-200`, over `--dur-micro`. The overlay fades in over `--dur-fast`. The scrim is `linear-gradient(to top, rgba(10,14,24,.82), rgba(10,14,24,0) 60%)`. The tech list is Fira Sans 12px `--n-0`. Repo and Live are compact secondary buttons (28px visible, 44px hit area) with Tabler glyphs, and are omitted when there is no link.
- **Focus-visible:** dual ring on the tile, plus the same overlay as hover.
- **Active (pressed):** fill `--luna-100`, border `--luna-500`.
- **Selected (its viewer is open):** stays at the pressed styling so the visitor can see where they came from.
- **Disabled:** none.
- **Loading:** the poster stays until the first frame, with no spinner.
- **Error:** the video fails silently back to the poster.
- **Reduced motion or Save-Data:** no autoplay. Show a persistent "Play walkthrough" compact secondary button under the media.
- **Mobile:** one column. Overlay content moves below the media and stays visible. Play is persistent. Hover is off.

### 7.8 Viewer document paper

- **Window body:** grey with grain. Inside it sits a sheet: `--paper-50`, 1px `--paper-edge`, `--radius-paper`, `--shadow-paper`. Padding is 40px 48px on desktop, 32px 28px at 768px, and 20px 16px at 375px, where the sheet also goes edge to edge inside the body.
- **Measure:** text column max-width 64ch.
- **Title:** Bricolage 700 `--fs-display-m`.
- **Concept badge**, then a meta row in Fira Sans 13px `--ink-2` with tabular dates.
- **Sections:** 32px apart. Heads are Bricolage 600 `--fs-title`. Paragraphs are Fira Sans `--fs-body` in `--ink`, 16px apart.
- **"What I took from it":** the head is set in Caveat 600 `--fs-hand-head` `--pen` with the pen underline (the signature).
- **Callout:** fill `--luna-50`, 3px left rule in `--luna-700`, padding 12px 16px, `--radius-control` on the right corners only.
- **Media:** sunken frame plus filename strip, as in 7.7.
- **"Outcome not yet measured":** Fira Sans 400 italic `--ink-2`.
- **Links in the essay:** tertiary style without the icon. Visited links are not restyled.
- **Scrollbar:** section 7.10.
- **Reduced motion:** static, apart from the window open (section 8).

### 7.9 Hire Me form controls

- **Label:** Fira Sans 600 13/18 `--ink`, 6px above the field. Optional fields add " (optional)" in 400 `--ink-2`. No asterisk-only markers.
- **Field (input and select):**
  - Size: 44px high, padding 0 12px, `--radius-0`.
  - Colours: `--field` fill, 1px `--field-border` (`#516D8F`), `box-shadow: inset 1px 1px 0 rgba(14,26,58,.08)`.
  - Text: Fira Sans 400 **16px** `--ink`. 16px stops iOS zooming on focus.
- **Select:** `appearance: none`, with a 22px XP combo button inside the right edge: `linear-gradient(180deg, --luna-100, --luna-200)`, 1px `--luna-600`, radius 2px, and a `TbChevronDown` 14px in `--luna-800`. Rendered as a background SVG with padding-right 40px.
- **Textarea:** minimum 120px high, padding 10px 12px, line height 1.5, vertical resize only.
- **Hover:** border `--luna-600`.
- **Focus:** border `--luna-700` plus the dual ring.
- **Invalid** (after blur or a submit attempt, never while typing): border `--danger`. Below the field, `TbAlertCircle` 16px and a Fira Sans 13px message in `--danger`, wired with `aria-invalid` and `aria-describedby`.
- **Disabled:** fill `#EEEFF1`, border `--n-300`, text `--n-500`, `cursor: not-allowed`.
- **Autofill:** `-webkit-autofill` gets `box-shadow: inset 0 0 0 100px var(--field)` and `-webkit-text-fill-color: var(--ink)`.
- **Placeholder:** none, except format hints, which use `--ink-2`.
- **Helper line:** "Opens your email app. Nothing is sent from this website." in Fira Sans 13px `--ink-2`.
- **After "Open email draft":** an inline `TbMailForward` plus "Draft opened in your email app" in `--ink-2`, announced with `aria-live="polite"`. Never "Message sent".
- **Copy email:** tertiary. Feedback is in section 8.3. If the clipboard is denied, show the label "Copy failed. Email shown above.", select the email text, and use `--ink-2`, not danger.
- **Reduced motion:** colour changes only.
- **Mobile:** full-width fields, contact block above the form (UX), 16px text kept.

### 7.10 Chrome states (every other interactive element)

- **Title-bar controls:**
  - 21x21px, `--radius-control`, 1px `rgba(250,251,254,.7)` border. Minimise and maximise use `--xp-ctl` with a `--n-0` glyph.
  - Close: rest `--xp-close`, hover `--xp-close-hover`, pressed `--xp-close-pressed` with `--shadow-press-neutral`.
  - Minimise and maximise hover: add `inset 0 0 0 1px rgba(250,251,254,.55)`.
  - Focus: dual ring.
  - Hit area: 30x30 on desktop, 44x44 on mobile, through a pseudo-element.
- **Desktop icons:**
  - Caption: Fira Sans 400 13/16 `--n-0` with `text-shadow: 0 1px 2px rgba(6,22,61,.9), 0 0 6px rgba(6,22,61,.55)`.
  - Hover: a rect in `rgba(250,251,254,.16)` with a 1px `rgba(250,251,254,.35)` border, `--radius-control`.
  - Selected or active: caption fill `--xp-select`, plus a 35% `--xp-select` tint over the icon.
  - Focus: dual ring.
- **Taskbar buttons:**
  - Size: 32px high, `--radius-control`, Fira Sans 13px `--n-0`.
  - Rest: `--xp-taskbar-btn`, 1px `rgba(250,251,254,.35)` border.
  - Hover: `inset 0 0 0 1px rgba(250,251,254,.45)`.
  - Active or focused window: `--xp-taskbar-btn-active` with `--shadow-press-neutral`.
  - Focus: dual ring.
- **Start button** (if UX keeps it): a green gradient as in the primary button, `--radius-start`, the word "start" in Bricolage 800 17px lowercase `--n-0`, and the same hover and active states as the primary.
- **Clock:** Fira Sans 12px tabular numerals on `--xp-tray`.
- **Links:** described in 7.5 tertiary.
- **Scrollbars (internal scrollers):**
  - Size: 14px wide on desktop, 8px on mobile.
  - Track: `--n-100`. Thumb: `--luna-300` fill, 1px `--luna-600` border, `--radius-control`. Thumb hover: `--luna-400`.
  - Firefox: `scrollbar-color: var(--luna-400) var(--n-100)`.
- **Merlin's balloon:** `--tooltip` fill, 1px `--n-800`, `--radius-tile`, Fira Sans 13/18 `--ink`.

---

## 8. Motion language

### 8.1 Tokens

| Token | Value | Class |
|---|---|---|
| `--dur-press` | 80ms | Pressed state |
| `--dur-micro` | 120ms | Button and link feedback, copy scale, tile hover fill |
| `--dur-fast` | 180ms | Window open, overlay fade, icon fade |
| `--dur-object` | 220ms | Polaroid lift |
| `--dur-handoff` | 240ms | Boot to desktop crossfade |
| `--dur-pen` | 360ms | Pen underline draw |
| `--dur-develop` | 560ms | Polaroid develop |
| `--dur-copied` | 2000ms | "Copied" hold |
| `--stagger-object` | 70ms | Polaroids, left to right |
| `--stagger-icon` | 30ms | Desktop icons, top to bottom |
| `--orbit-1..4` | 18s / 24s / 30s / 38s | Orbit rings, inner to outer |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances and windows: decisive, no bounce (XP never bounced) |
| `--ease-lift` | `cubic-bezier(0.22, 1, 0.36, 1)` | Object lift, soft landing |
| `--ease-in` | `cubic-bezier(0.55, 0, 1, 0.45)` | Exits and minimise |
| `--ease-draw` | `cubic-bezier(0.65, 0, 0.35, 1)` | Pen stroke: slow start and finish, like a hand |
| `--ease-press` | `cubic-bezier(0.2, 0, 0, 1)` | Press and release |
| linear | | Orbit only |

Framer-motion needs numbers. Mirror these values in one TypeScript module (for example `src/styles/motion.ts`), and treat `tokens.css` as the source of truth. Only transform and opacity animate. Nothing moves body copy or a field while someone is typing. No motion delays a click.

### 8.2 Boot to desktop handoff (t0 = the last boot line finished)

| t | What happens |
|---|---|
| During boot | The desktop is already mounted under the boot layer. Pointer events stay on the boot layer (Skip) until t0. |
| t0 | The boot layer fades from opacity 1 to 0 over `--dur-handoff` (`--ease-draw`). It is a crossfade, like a monitor switching signal. Astra's 120ms reads as a glitch after a typed intro. |
| t0 + 120 | The taskbar rises from translateY(40px) to 0 over `--dur-fast` (`--ease-out`). Icons fade in over `--dur-fast`, staggered `--stagger-icon` top to bottom. |
| t0 + 300 | About opens with the window-open motion. UX's "450ms later" becomes 300ms: that is when the crossfade is visually done. |
| t0 + 300 | A Fira Mono block caret (`▌`, `aria-hidden`) after the name blinks 3 times (530ms cycle, steps) and removes itself. The boot's cursor lands in About. |
| t0 + 480 | The polaroids develop, staggered 70ms. The sticky note fades in over `--dur-fast` at t0 + 620, with no movement. |
| t0 + 900 | Merlin appears (static, per the section 10(b) recommendation). |

Everything is interactive from t0 + 300. The composition settles by about t0 + 1180.

### 8.3 Interaction classes

- **Window open:** opacity 0 to 1 and scale 0.98 to 1, origin at the top centre, over `--dur-fast` with `--ease-out`.
- **Window close:** fades to 0 opacity and scales to 0.98 over `--dur-micro` with `--ease-in`.
- **Minimise:** a transform toward the taskbar button's rect over 200ms with `--ease-in`. Restore is the reverse over 200ms with `--ease-out`.
- **Focus change:** the title bar swaps to its inactive state instantly, as XP did.
- **Buttons:** hover in over `--dur-micro`, press in over `--dur-press` with `--ease-press`, release over `--dur-micro`.
- **Polaroid develop and hover:** see 7.2.
- **Orbit:** see 7.3.
- **Pen underline:** `stroke-dashoffset` runs from the path length to 0 over `--dur-pen` with `--ease-draw`, and back out over `--dur-micro`.
- **Copy email:**
  - On click, the label changes from "Copy email" to "Copied" instantly, and the icon changes from `TbCopy` to `TbCheck`.
  - The button scales 1 to 1.03 to 1 (`--dur-micro` each way, `--ease-out`), and `aria-live` announces "Email address copied".
  - After `--dur-copied` the label crossfades back over `--dur-micro`.
- **Tile overlay:** fades over `--dur-fast`.

### 8.4 Reduced motion (a designed static state, not "off")

| Element | Reduced |
|---|---|
| Boot | The whole log appears at once and holds 600ms before handoff. Skip is still available. |
| Handoff | The crossfade stays (it is opacity only). The taskbar has no translate. Icons have no stagger. The caret does not render. |
| Windows | Open and close are opacity only over `--dur-micro`. No scale, no minimise flight. |
| Polaroids | Final state, no develop, no lift. The hover only crossfades the shadow. |
| Orbit | Static fan, no Pause control. |
| Pen underline | Rendered complete, no draw. |
| Copy email | Label swap only, no scale. |
| Buttons and tiles | Colour changes only. No translate on press. |
| Video | No autoplay. |

The token file sets `--dur-object`, `--dur-develop`, `--dur-pen` and the staggers to 0ms under `prefers-reduced-motion: reduce`. Components still have to drop the transforms themselves.

---

## 9. Signature: the pen on the machine

**The move:** Shaka's own voice is set in Caveat in ballpoint ink (`--pen` `#1F3D99`), with one hand-drawn underline stroke. It is the only handwriting on the site, and it appears only where he speaks personally, over an OS that is otherwise pure Luna.

**The stroke:** SVG, `viewBox="0 0 200 12"`, `preserveAspectRatio="none"`, with path
`M2 8.5 C 38 4.5, 82 10.5, 124 6.5 S 178 4, 198 7.5`, `stroke: var(--pen)`, `stroke-width: 2`, `stroke-linecap: round`, `fill: none`, `vector-effect: non-scaling-stroke`. It sits 10px high, 2px below the baseline, and spans the underlined words plus 4px on each side. It is built as one `<PenUnderline>` component and never redrawn per use.

**It must appear in all of these:**
1. **Sticky note:** the quote in pen, and the CTA hover draws the stroke.
2. **Polaroids:** all three captions in pen.
3. **About:** the closing quote in Caveat 500 `--fs-hand-note` `--pen`, with a static stroke under "have fun trying." Only the font changes. The words are the master copy, verbatim.
4. **Case-study viewer:** the "What I took from it" head in pen with the stroke, in every case study.
5. **Hire Me:** a static stroke under the direct email address, marking the fastest route.

**Rules:**
- Never on chrome, buttons, labels, form fields or body paragraphs.
- At most one stroke visible per window.
- Caveat is never set below 16px.
- `--pen` is never a link colour. The note CTA's text stays `--luna-700`, and only its underline is pen.

---

## 10. Decisions needing Shaka

a. **Boot length.**
   - Today: the scripted pauses and paces in `LoadingScreen.tsx:164-243` add up to about 6.3s.
   - Astra: 900ms.
   - **Recommendation: 2400ms of typed diagnostics.** Characters type at 8ms, "..." at 90ms per dot, and the pauses are trimmed to fit. Add **Skip boot** from the first frame: a Fira Mono 13px text button in the bottom-right, 44px hit area, triggered by Esc or Enter.
   - Why: that is long enough to read as a machine starting up (your stated wish), and short enough that link to desktop stays under 3s on a typical Kampala 4G load. The same session repeats via fastBoot.
   - Your options: 900ms / **2400ms** / keep about 6s.

b. **Merlin.**
   - **Recommendation:** no unsolicited speech. He stands idle bottom-right from t0 + 900, with no greeting balloon and no idle animation loop. Clicking him opens the chat window, where the greeting is the first message.
   - Why: the unprompted "Welcome to Shaka's Portfolio!" competes with About for the first five seconds. That is exactly when a visitor has to read your name and role.
   - Your options: **silent until clicked** / one greeting 8s after arrival, once per session / as today.

c. **Title-bar font.**
   - Trebuchet MS is a Microsoft font. We are not licensed to self-host the bundled `trebuc.ttf`.
   - **Recommendation:** use Fira Sans Bold (free). The title bars will look slightly narrower than today.
   - The alternative is a paid Trebuchet MS webfont licence from Monotype, priced by pageviews, which you would buy.

d. **Green primary buttons.** "View case studies" and "Open email draft" use XP Start-button green instead of blue. Say so if you want blue. My case is in section 1's ledger.

e. **Optional ask:** a phone photo of your handwritten "Shaka" on white paper. We would vectorise it in pen ink as a sign-off under the About closer. Without it there is no sign-off, since adding one without your handwriting would be invented content.

---

## 11. Handoff notes for the frontend engineer

- Import `src/styles/tokens.css` once, first, in `main.tsx`.
- Wire Tailwind to the variables and **replace** the theme keys, don't extend them. Set `theme.colors`, `theme.fontFamily`, `theme.boxShadow`, `theme.borderRadius`, `theme.fontSize` and `theme.transitionTimingFunction` to token-backed maps only. Then `bg-blue-500`, `font-sans` or `rounded-lg` fail to compile. Remove the ad-hoc `accent-color`, `f-text-color` and `close-window-hover` keys in `tailwind.config.js`.
- Replace the hardcoded values in `ThemeContext.tsx` (window gradient, field border `#003bd6`, button gradient, close `#ee6247`, navbar gradient, and the `transition: all 0.5s` / `0.8s` / `1.5s` values) with tokens. The motion replacements are in section 8. `transition: all` is banned: name the properties.
- `xp.css` is a dependency. It must not supply fonts or colours to our components. Scope or remove any global import.
- Grep target for the audit: no hex outside `tokens.css`, no Tailwind default palette classes, no `font-family` literals, no `box-shadow` literals.

## 1. HERO VERDICT

**Keep XP as the interface. Make the open About window the sales page.** The current ingredients do not guarantee a five-second answer: photos, a wizard and a boot sequence compete with the professional introduction. Fix the hierarchy, not the metaphor.

### At 1440 × 900

Coordinates below start at the desktop’s top-left, after boot.

| Element | Position and size | Treatment |
|---|---|---|
| Desktop icons | x16, y24; 80px-wide rail; 88px vertical pitch | Order: About, Case Studies, Hire Me, My Approach, Contacts. Contacts opens Hire Me’s contact section. |
| About window | x120, y32; 864 × 756px | Active Luna title bar, 30px high. Body padding: 28px. |
| Three polaroids | x1024 / 1154 / 1284, y44; each 128 × 164px | Keep their collective footprint outside About. |
| Sticky note | x1036, y244; 352 × 228px | Availability first, quote second, contact link last. |
| Merlin shortcut | x28, y568; 48px icon | Opens an assistant window. No unsolicited speech. |
| Below-fold cue | x132, y820 | “Scroll for tools and approach ↓”, 13px. |
| Taskbar | x0, y860; 1440 × 40px | Fixed. Start, open-window buttons, GitHub, clock. Remove GitLab. |

About’s first body block:

1. **“Shaka Nathan K”**, 40/44px.
2. **“Developer · AI Engineer · Project Lead”**, 28/34px, maximum two lines.
3. “Kampala, Uganda · Available for web, AI and project leadership work”, 15/22px.
4. “I build web solutions and systems, and lead projects from idea to delivery.”, 18/27px.
5. **View case studies** and **Hire me**, adjacent 44px-high buttons, 12px gap. Copy-email is a separate text action below.

Then a 24px gap and the master About copy, unchanged except for the agreed closing quote. Stack groups follow it. Render everything immediately; scrolling is not a reveal animation.

**Eye order:** name and role, CTA pair, availability note. The photos must not exceed the hero’s combined text-and-button area in contrast or size.

### At 375 × 812

Do not shrink the desktop arrangement proportionally.

- Taskbar: fixed at y768, height 44px plus any bottom safe-area inset.
- Desktop shortcuts: x8, y8, width 359px, height 56px. Four 80px cells: About, Work, Hire Me, More. More exposes Approach, Contacts and Merlin.
- About: x8, y76, width 359px, height 488px. Title bar 30px; body padding 16px; body scrolls vertically with a visible scrollbar.
- Name: 28/32px. Role: 20/26px, two lines. Availability: 13/19px. Proposition: 15/22px.
- CTA buttons: full width, 44px high, 8px gap. Both must be visible without scrolling About.
- Polaroids move **below About**, at x18 / 139 / 260, y584; each 96 × 126px.
- Sticky note follows at x16, y734; 343 × 206px. It enters the next screen rather than displacing the CTAs.
- Desktop content ends with at least 68px bottom clearance.

This is an explicit mobile adaptation of the top-right photo composition. Do not put 250px of memorabilia before Shaka’s name.

**Five-second verdict:** yes after these changes. The first visible window states who, what and what next. Cut unsolicited Merlin animation, duplicate Projects icons and competing introduction slogans. Keep the full biography inside About, not above the CTA block.

Boot: typed diagnostics for at most 900ms, then a 120ms desktop reveal. Provide “Skip boot” from the first frame. `fastBoot` and reduced motion go directly to the desktop.

## 2. PREMIUM ON XP: THE BLEND RULES

The contemporary layer belongs **inside documents**, not around the operating system.

### Five dos

1. **Preserve Luna chrome:** 30px blue title bars, 3px blue window frames, beveled controls, square taskbar buttons. Use the same chrome for About, essays, contact and assistant.
2. **Create hierarchy with spacing:** 8px base grid; 28px desktop document padding; 16px mobile padding; 24px between document sections.
3. **Use display typography only for authored content:** Manrope on name, role and case-study headings. Keep menus, tabs, buttons and window titles in Noto Sans.
4. **Put media inside XP containers:** screenshots and video sit in 1px sunken frames with a filename or status strip.
5. **Use one motion vocabulary:** 140ms button feedback, 180ms window opening, 220ms object hover. Animate transform and opacity only.

### Five don’ts

1. **No glassmorphism:** remove taskbar backdrop blur. No translucent window bodies or blurred modal backdrops.
2. **No pill-shaped UI:** content buttons use 3px radius; XP window corners use 6px top corners. No 999px tags.
3. **No oversized editorial chrome:** window titles remain 13px, never 24px. Do not replace title bars with website headers.
4. **No floating studio cards:** the case-study grid lives in a folder window, not in frameless white cards scattered on wallpaper.
5. **No interaction tax:** no double-click requirement, hidden contact gesture, drag-to-discover content or animation that must finish before clicking.

## 3. ADVERSARIAL PASS

### 1. Forty-six endlessly orbiting icons

**Failure:** 8 / 10 / 12 / 16 icons can imply forty-six distinct competencies, consume rendering time and compete with proof of work.

**Replacement:** retain the locked fan geometry and desktop timings, but make it a labelled desktop utility: “Tools I work with”. Repeated icons are decorative instances, not additional skills. The adjacent static, grouped list is authoritative. Pause offscreen and provide Pause animation. Mobile uses the same fan without rotation.

### 2. Three placeholder photographs with entrance effects

**Failure:** anonymous stock portraits would invent biography; a prominent “developing” sequence makes the owner’s identity wait for decoration.

**Replacement:** retain frames, tape, rotations and 70ms stagger. Use visibly labelled placeholders: “Portrait pending”, “Building pending”, “Kampala pending”. No invented faces or locations. Develop through opacity, not blur. Treat real photos as a launch-readiness item, not a reason to manufacture assets.

### 3. Transferring grain at 0.3 opacity

**Failure:** the source’s screen-blended noise on dark surfaces does not transfer to `#E3E3E3`. It can erase the difference between shading, text and noise.

**Replacement:** retain static grain, but use bounded black noise at 0.035 opacity, normal blending, underneath content. Section 4 defines the contrast floor.

### 4. Autoplay on every visible project card

**Failure:** six simultaneously decoding recordings are not six times more persuasive. They distract from outcomes and stress mobile hardware.

**Replacement:** retain silent inline autoplay for the **one active, visible preview**. Mount media only after intersection. Other cards show posters. Disable autoplay for reduced motion and data-saving preferences. Touch receives a persistent Play walkthrough control.

### 5. A Hire Me form with no backend

**Failure:** a successful-looking submission that sends nothing loses work and misrepresents the UI-only scope.

**Replacement:** retain all five fields. Label the form “Draft your enquiry”. Its action is **Open email draft**, generated locally with `mailto:`. Explain: “Opens your email app. Nothing is sent from this website.” Offer Copy enquiry and direct email alongside it. Never display “Message sent”.

Do not expand the master biography with invented school or tenure details. The school request conflicts with the settled copy rule and lacks facts. Omit education until verified source material exists.

## 4. TYPE AND COLOUR

Self-host WOFF2 files. Remove unloaded Montserrat references and reliance on the current Trebuchet asset’s licensing.

| Use | Free-licensed family | 1440px | 375px |
|---|---|---|---|
| XP chrome | Noto Sans, 400/700 | 13/18px; title 700 | 13/18px; title 700 |
| Body | Noto Sans, 400/600 | 16/25px | 15/23px |
| Name | Manrope, 700 | 40/44px | 28/32px |
| Role | Manrope, 600 | 28/34px | 20/26px |
| Case-study headline | Manrope, 700 | 30/36px | 23/29px |
| Handwriting | Caveat, 500 | Note 23/27px; captions 18/20px | Note 21/24px; captions 16/18px |
| Boot | Ubuntu Mono, 400 | 14/20px | 12/18px |

Noto Sans, Manrope and Caveat use the SIL Open Font License; Ubuntu Mono uses the Ubuntu Font Licence. Ship licence files. Load body and display first; handwriting must not block boot completion.

### Palette

- Luna accent: `#2F71CD`, retained.
- Title gradient: `#0A246A` → `#0865E7` → `#0054E3`.
- Window body: `#E3E3E3`, retained.
- Main ink: `#20242A`.
- Secondary ink: `#4B5563`.
- Link and primary CTA fill: `#124A88`; white button text.
- Document paper: `#FAF8F2`.
- Polaroid frame: `#F7F2E8`.
- Note paper: `#FFF1A8`; note ink: `#332A17`.
- Availability: `#166534`, always accompanied by text.
- Concept badge: fill `#FFF0C2`, border `#9A6700`, text `#553B00`.

**Body contrast:** on untextured `#E3E3E3`, `#20242A` is approximately **12.2:1**, and `#4B5563` approximately **5.9:1**. With the specified grain’s darkest composite, approximately `#DBDBDB`, they remain approximately **11.3:1** and **5.5:1**.

Grain implementation:

- One cached 128 × 128 transparent PNG tile containing black noise only.
- Pseudo-element over the flat grey background, `opacity: .035`, `mix-blend-mode: normal`.
- Isolate the surface; place text, borders and controls above the texture.
- `pointer-events: none`; no animation, canvas or runtime SVG turbulence.
- Apply to grey window bodies and grey utility panels only. Exclude title bars, videos, photographs, note paper, inputs and taskbar.
- Verify these contrast floors against rendered screenshots. Do not compensate for heavier grain by adding text shadows.

## 5. THREE OBJECTS

### Sticky note

Desktop: 352 × 228px, 18px padding, rotation `-1deg`, `#FFF1A8`, 1px `#D7C779` edge. Shadow: `2px 4px 8px #00000026`. A 68 × 20px tan tape strip overlaps its top by 8px.

Use Noto Sans 15/21px, 700 for **Available for work** and 13/19px for “Web solutions · Systems · Project leadership”. The exact quote uses Caveat 23/27px:

“If it can be done, I'll do it. Even if it can't, I'll do my best and have fun trying.”

Bottom action: **Let’s work together →**, opening Hire Me. Hover changes only the link underline; the note does not bounce. Reduced motion is identical. Mobile: 343 × 206px, 16px padding, 21/24px quote. Entire note is not a mystery click target.

### Polaroids

Desktop frame: 128 × 164px, 10px sides/top, 34px caption strip, `#F7F2E8`. Rotations: `-3deg`, `1.5deg`, `3deg`. Tape: 48 × 16px, `rgba(181,155,105,.56)`, multiply blend.

Hover-capable pointers: straighten to 0deg, translateY(-12px), scale(1.025), 220ms ease-out; shadow changes from `0 3px 7px #00000033` to `0 10px 18px #00000040`.

First view: image opacity 0.35 → 1 over 280ms, staggered 70ms. Reduced motion: fully visible, no transform. Mobile: 96 × 126px, 6px sides/top, 30px caption strip; static rotations and no hover lift. Never draggable.

### Skills orbit

A 640 × 360px sunken XP utility panel below the fold. Header 26px: “Tools I work with”; Pause control at top-right.

Fan centre: `(320, 316)`. Ring radii: 108 / 166 / 224 / 282px. Counts: 8 / 10 / 12 / 16; icon size 24px. Clip to the upper hemisphere. Use a 128px dotted hemisphere at the centre.

Rotate ring containers linearly at 18 / 24 / 30 / 38s, alternating direction; counter-rotate glyphs. Hover pauses the whole fan. Reduced motion and mobile render a static fan. Mobile panel: 343 × 210px, geometry scaled uniformly, no tooltip-only information.

All orbital instances are `aria-hidden`. The accessible skills list remains grouped under Frontend, Backend, AI, Leadership and Quality, with two labelled columns and full-colour brand icons where a real brand exists. Do not invent brands for leadership skills.

## 6. CASE STUDIES AND HIRE ME INSIDE XP WINDOWS

### Folder, then viewer

Case Studies opens as an Explorer-style window: 920 × 680px on desktop; viewport width minus 16px on mobile. Include menu row, address row “Portfolio / Case Studies”, and a status strip reading “7 case studies”.

Thumbnail view: two columns with a 16px gap; one column below 640px. Each item contains:

- 16:9 sunken video/poster frame.
- Eyebrow: **role path · domain · scope**, 12/18px.
- Project headline: 20/26px.
- One-line summary: 14/21px.
- Dot-separated evidence row: 12/18px.

Lead with **The Venue Menu**, because the supplied biography establishes end-to-end involvement. Follow with Kamwe Forex, UWA, Frozen Basket, Premium Liquor, Nineteen Twenty-One Flowers and Hotel site.

Do not invent results. Where verified metrics are absent, use factual scope labels and state “Outcome not yet measured” inside the essay.

A single click opens a viewer window, not an accordion that rearranges the folder. Viewer: 880 × 740px desktop, 359px wide mobile. Document paper inside grey chrome; text capped at 64ch. Structure:

**Problem / Constraints / What I did / Outcome / What I took from it**

Use 32px between sections, 16px paragraphs, and inline callouts with a 3px `#124A88` left rule. Add role, collaborators, dates and links only when documented.

For concept work, place the badge immediately below the title and above media:

**Redesign concept · A direction I proposed for this brand, not their current live site.**

Use the palette’s amber treatment, 12/18px, 1px border, 3px radius. Let it wrap. Do not hide the disclaimer in a tooltip or advertise an unrelated current site as Shaka’s implementation.

Video overlay: tech list and labelled Repo / Live links on hover **and keyboard focus**. Touch keeps controls visible. Omit unavailable links.

### Hire Me

Desktop window: 760 × 680px. Body: 240px service/contact column, 24px gap, remaining width for the form. Mobile stacks contact before form.

Opening copy:

**Have a web, AI or systems project?**  
“Kampala, Uganda · Available for project work and project leadership.”

Services: Web solutions, LLM-powered applications and agents, Systems and integrations, Project leadership. Each gets one sentence describing an actual deliverable.

Form: Name, Email, Project type, Budget range, Message. Labels above fields, 44px control height, message minimum 120px. Budget includes “Not sure yet”. No fabricated response-time promise.

Show verified direct email and booking link above the form. If booking is not configured, omit it rather than linking to `#`. Copy-email changes to **Copied** for 2,000ms, scales to 1.03 for 120ms, and announces success through `aria-live`; reduced motion skips scaling.

## 7. SCROLLING DESKTOP

The main hazards are coordinate drift, lost windows, nested scrolling and taskbar obstruction.

- Remove `body { overflow: hidden }` and the `.app` / `.icons` 100vh constraints. Use `min-height: 100dvh`.
- Wallpaper is its own fixed layer with `background-size: cover`, not `background-attachment: fixed`.
- Desktop is a positioned document-space canvas. Store window x/y in document coordinates. Never add `scrollY` twice during dragging.
- New desktop windows open at `scrollY + 24px`, horizontally centred within the available area.
- Drag using the title bar only, excluding controls. Require 4px movement before drag begins. Disable text selection only during an active drag.
- Clamp x within the canvas and y above zero. Always keep at least 80px of title bar recoverable.
- Taskbar activation restores the window and scrolls its title bar into view. Include Move to current view and Reset layout in its menu.
- Desktop About and viewers have one labelled internal scroller. Use `overscroll-behavior-y: contain`; wheel over wallpaper scrolls the desktop. Never implement global wheel interception.
- Mobile disables dragging and resizing. Opened windows enter document flow and receive focus; closed windows relinquish their height. About’s bounded initial scroller preserves the specified first-screen composition.
- Compute canvas height from window bottoms and widgets, not a fixed 200vh guess. Add taskbar height, safe area and 24px clearance.
- On resize, re-clamp stored desktop positions. Do not reuse 1440px coordinates on phones.

My Approach remains a Notepad essay window, not another card grid.

## 8. TOP RISKS

- **Boot abandonment:** cap the sequence at 900ms. Never wait for video, photos or the assistant before showing the desktop.
- **Media cost:** use 720p, 24fps, 8–15-second silent recordings without audio tracks. Target under 2MB per clip. Only one visible preview plays; pause hidden, minimized and offscreen media.
- **Animation cost:** pause orbit when offscreen or the document is hidden. No animated grain, blur transitions or permanent `will-change` on every icon.
- **Merlin instability:** use explicit idle, opening, open and closing states. Repeated clicks focus the existing dockable assistant window. Cancel timers on unmount. Give it its own taskbar button. UI-only scripted assistance must not claim to be a live AI service.
- **Keyboard exclusion:** single-click shortcuts, visible 2px `#124A88` focus outlines with a white separating ring, labelled window controls and 44px touch hit areas. Model windows as labelled nonmodal regions, not focus-trapping dialogs.
- **Toy perception:** no fake terminal errors, fabricated metrics, invented education, mystery navigation or pretend message delivery. The first click on Work must reach evidence; the first click on Hire Me must reach a usable contact route.
- **Release discipline:** test 375 × 812, 1440 × 900, 200% zoom, keyboard-only and reduced motion. Screenshot every locked reference move beside its source. Search visible copy, metadata and storage keys for “ZulluOS”. Record the deferred security audit explicitly, and do not collect or transmit form data this round.
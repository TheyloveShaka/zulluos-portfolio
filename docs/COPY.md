# Copy

P6 deliverable. Drafts only, every line needs Shaka's sign-off before it ships. Voice
throughout: first person, confident, plain, warm, matching the About master copy. No em
dashes anywhere in this document. Anything I couldn't source is marked `ASK:` rather than
guessed.

One string is reused verbatim in three places by design, so it should be edited in one spot
if Shaka ever changes it: **"Kampala, Uganda · Available for work"**. It appears in About's
hero, the sticky note, and Hire Me's opening block. Keeping it identical everywhere is what
makes the note, the hero, and the enquiry window read as one voice instead of three drafts.

---

## 1. About hero

**Name:** Shaka Nathan K

**Role line (locked, verbatim):** Developer · AI Engineer · Project Lead

**Availability line:** Kampala, Uganda · Available for work

**Proposition (one sentence):** I build web platforms and AI-powered tools end to end, and
lead the projects that need someone to own the whole thing.

**CTAs (locked labels):** View case studies · Hire me

**Copy-email action label:** Copy email → (on click) Copied → (after ~2s) reverts to Copy
email. Same behaviour as Hire Me's copy-email control (see section 5).

### Master copy (verbatim, unchanged, do not alter a word of this)

> Hi! I'm Shaka! Let me tell you a bit about me. It all began when I was a kid and I touched a computer to try to make it do something I wanted. And it worked. My life has never been the same since. From that moment on, I was hooked.
>
> Every interaction with tech since has really just been me chasing that same magic - poking around in settings I didn't understand, breaking things on purpose to see how they worked, and slowly figuring out how to bend a machine to my will.
>
> That chase eventually turned into a career. I'm a Developer & AI Engineer based in Kampala, Uganda, and I still get the same rush today that I did back then.
>
> On the frontend, I build with React and TypeScript, on the AI side I'm deep into LLM-powered apps and agents, and underneath it all I lean on Python and data to make sense of things.
>
> Lately that's meant building real products end-to-end - like The Venue Menu, Uganda's wedding & venue discovery platform.
>
> Outside of code, I'm a comic-book fan, an astrophysics nerd who can't stop reading about black holes, a music lover, I'm always behind on some movie or anime, and you'll usually find me either gaming or watching sports when I'm not building something.

**Closing quote (locked, verbatim, exact placement per UX-SPEC §6.4, last line before the
stack groups):**

> If it can be done, I'll do it. Even if it can't, I'll do my best and have fun trying.

### ASK: experience and education paragraph (Lara-style)

This slot sits between the master copy and the closing quote. I can't write it without
these facts from Shaka, and none of the below should be invented or approximated in the
meantime, the slot should render its own visibly-pending state until answered:

- `ASK:` How many years has he been building professionally, and since when (a year, not a
  guess, e.g. "building since 2019")?
- `ASK:` What's his professional path so far, freelance, in-house, agency, his own product?
  Company or client names only if he wants them named.
- `ASK:` Any schooling relevant to this, degree, bootcamp, self-taught? Institution name only
  if he wants it public. If self-taught, that is a real, fine answer, say so plainly rather
  than implying formal schooling that didn't happen.
- `ASK:` Any certifications, courses, or specific milestones worth naming (first paid client,
  first shipped product, etc.)?
- `ASK:` Whether he wants "AI Engineer" grounded with a concrete example beyond The Venue
  Menu (already named in the master copy), e.g. a specific agent or LLM feature he's proud of.

---

## 2. Grouped stack

Built only from what the About master copy states directly (React, TypeScript, LLM-powered
apps and agents, Python) and what actually appears in the seven case-study repos' own
`package.json` files. Icon names are `react-icons/si` exports, verified against this repo's
own installed `node_modules/react-icons/si/index.d.ts`. No icon is invented for anything
without a real Simple Icons entry, `Zustand` has none there, so it ships label-only.

### Frontend

| Item | Icon |
|---|---|
| React | `SiReact` |
| TypeScript | `SiTypescript` |
| Next.js | `SiNextdotjs` |
| Vite | `SiVite` |
| Tailwind CSS | `SiTailwindcss` |
| React Router | `SiReactrouter` |
| Preact | `SiPreact` |
| GSAP | `SiGreensock` |
| D3.js | `SiD3Dotjs` |
| Zustand | *(no icon, Simple Icons has none)* |

### Backend

| Item | Icon |
|---|---|
| Supabase | `SiSupabase` |
| PostgreSQL | `SiPostgresql` |
| Node.js | `SiNodedotjs` |

### AI

| Item | Icon |
|---|---|
| OpenAI API | `SiOpenai` |
| Python | `SiPython` |

*(About's own copy says "LLM-powered apps and agents"; that's a practice, not a single
brand, so it isn't a separate tile, it's the reason the OpenAI and Python tiles are grouped
under AI rather than Backend.)*

### Leadership

No brand icons, per ART-DIRECTION 7 and UX-SPEC §6 point 6, these aren't products.

- Project planning and delegation
- Requirements and specs (SRS documents, build plans)
- Client communication
- Technical documentation

### Quality

| Item | Icon |
|---|---|
| ESLint | `SiEslint` |
| Playwright | `SiPlaywright` |
| Accessibility audits (WCAG AA) | *(no icon, a practice)* |
| Visual regression testing | *(no icon, a practice)* |

`ASK:` Shaka, confirm you're comfortable with "Leadership" and "Quality" listing practices
rather than products, that's deliberate (UX-SPEC forbids inventing a brand icon for a skill
that has none), but say so if you'd rather cut either group down to fewer, stronger items.

---

## 3. Sticky note

1. **Available for work** (paired with the success dot, per ART-DIRECTION 7.1)
2. Web solutions · Systems · Project leadership
3. Quote (pen voice, exact, verbatim): "If it can be done, I'll do it. Even if it can't,
   I'll do my best and have fun trying."
4. CTA label: **Let's work together** (the trailing arrow is a rendered glyph, not text,
   per ART-DIRECTION 7.1, so the label string itself is just the four words)

---

## 4. Polaroid placeholder captions

Per ART-DIRECTION §7.2, the photo well itself carries a fixed technical label ("Portrait
pending" and its siblings), that part isn't mine to write. The caption strip beneath each
well (Caveat, pen voice) is content's call. Kept short and honestly "pending", not
pretending a real photo is already there:

1. "me, soon"
2. "mid-build, as usual"
3. "on its way"

---

## 5. Hire Me

**Opening line:** Building a website, an AI-powered tool, or a system that needs to talk to
another one?

**Availability line (must match the sticky note exactly):** Kampala, Uganda · Available for
work

**Services (four, each one sentence, a real deliverable, not a buzzword):**

1. **Web solutions.** I design and build websites and web apps, from a marketing site to a
   full product with logins, a database, and an admin dashboard.
2. **LLM-powered applications and agents.** I build tools that use AI models to answer
   questions, automate a workflow, or act as an assistant inside your product.
3. **Systems and integrations.** I connect the pieces, payments, data feeds, third-party
   APIs, so the tools you already use actually talk to each other.
4. **Project leadership.** I plan the work, coordinate whoever's building it alongside me,
   and stay accountable for it shipping.

**Form labels and helper text:**

| Field | Label | Helper / notes |
|---|---|---|
| Name | Name | required |
| Email | Email | required. Invalid-email error: "That email doesn't look right, check it and try again." |
| Project type | Project type (optional) | Options: Web solution · LLM-powered app or agent · Systems / integration · Project leadership · Something else |
| Budget range | Budget range (optional) | Options: `ASK:` Shaka's real budget bands in UGX, e.g. under X, X to Y, Y and above, plus a locked low-commitment option: **Not sure yet** |
| Message | Message | required, minimum 120px field height |

- **Submit button label:** Open email draft
- **Helper line under the form (locked phrasing, ART-DIRECTION 7.9 and Astra both converge
  on this exact sentence, keep it as is):** Opens your email app. Nothing is sent from this
  website.
- **Success state copy:** Draft opened in your email app. If it didn't, copy the email above
  and send it directly.
- **Copy-email control:** label "Copy email" → "Copied" for ~2s → reverts. `aria-live`
  announcement: "Email address copied."
- **Copy-email failure fallback:** Copy failed. Email shown above.
- **No response-time promise anywhere** (per AC-HIRE-8), so nothing here says "I'll reply
  within X."

**Booking link:** `ASK:` Shaka, the URL for a booking/calendar link, if you want one. Until
supplied it's omitted from the DOM entirely, never a disabled or `#` link (AC-HIRE-6).

**Direct email:** `ASK:` confirm the exact address to show and to build the `mailto:` and
copy-email actions from (the existing site may already have one wired, if so, reuse it and
just confirm it's current).

**Mailto body template:**

```
Subject: New project enquiry from {name}

Hi Shaka,

I'm reaching out about a project.

Name: {name}
Project type: {projectType || "Not specified"}
Budget range: {budgetRange || "Not specified"}

{message}
```

---

## 6. My Approach.txt

Notepad-style essay, plain running text, no cards. About 300 words, written as Shaka, in his
voice, grounded in how he actually works (references, plan, act, audit, human checkpoints,
mobile by default, images as the product, no filler). The build method itself is not named.

> Before I write a line of code, I look. I pull real references, actual sites that solve a
> piece of the problem well, and I name the specific thing worth taking from each one. Not a
> vague feeling, a specific move: this exact spacing, this exact interaction, this exact way
> of grouping information. If I can't point at it, I don't trust it.
>
> Then I plan. A build gets broken into phases, each with its own job: the visual direction,
> the structure of the pages, the actual components, the copy, the security pass, the check
> that it works. I write the plan down before I touch code, because a plan I can point back
> to is worth more than one I'm improvising as I go.
>
> Only then do I build. And building isn't the last step, checking is. Every build gets
> looked over before I call it done: security, whether it actually works the way it's
> supposed to, and whether it matches the direction I set out to hit. I don't sign off on my
> own work without looking at it the way a stranger would.
>
> There's a human checkpoint in that process too. Before something ships, someone who isn't
> me looks at it and says yes or no. That's not bureaucracy, it's the difference between "I
> think this is good" and "this is actually good."
>
> Mobile isn't an afterthought I get to after the desktop version looks nice. I design for a
> small screen from the start, because most of the people who'll actually see a site are
> holding one in their hand, not sitting at a desk.
>
> And images are not decoration, they're the product. A site with the right words and the
> wrong pictures still feels cheap. I source real images, generate the ones I can't source,
> or say plainly what's still missing, never a stand-in dressed up as the real thing.
>
> No filler. If a sentence doesn't earn its place, it doesn't ship.

(303 words.)

---

## 7. Merlin's first chat message

Sourced from the existing unsolicited greeting in `src/components/wizard/Wizard.tsx`
("Welcome to Shaka's Portfolio! Click me if you need help.") and the existing opening line
in `src/components/wizard/WizardChat.tsx` ("Hi, I'm Merlin! Ask me about Shaka's projects,
skills, or how to reach him."). Per `DECISIONS.md`, Merlin no longer speaks unprompted, this
becomes the first message inside the chat once it's opened, keeping the spirit of both,
shortened:

> Hey, I'm Merlin. Ask me about Shaka's work, his stack, or how to reach him.

---

## 8. Metadata (recommendation for `index.html`, not applied here)

Single-page app, one route (`/`), per UX-SPEC §1. The recommendations below cover that one
route. If the site ever gains real per-case-study URLs, each would want its own title,
description, and OG tags built the same way, flagged here rather than assumed.

| Field | Value |
|---|---|
| `<title>` | `Shaka Nathan K · Developer, AI Engineer, Project Lead` (55 characters) |
| Meta description | `Shaka Nathan K is a developer, AI engineer, and project lead based in Kampala, Uganda. See real case studies and how to work with him.` (~140 characters) |
| OG title | Same as `<title>` |
| OG description | `Developer, AI engineer, and project lead in Kampala, Uganda. Real case studies, a working stack, and a fast way to get in touch.` |
| OG type | `website` |
| OG image | `ASK:` a real 1200x630 image, the avatar/illustration alone will look stretched at that ratio, this needs its own composed image, not a crop of `IMG-ABOUT-AVATAR` |
| Twitter card | `summary_large_image`, same title/description as OG |
| Canonical URL | `ASK:` the production domain this portfolio deploys to |
| `theme-color` | `ASK:` the art director's `--xp-title-active` gradient has no single hex; pick the mid-stop `#0064FD` unless told otherwise |

`ASK:` no `<meta name="color-scheme" content="only light">` tag currently exists per
ART-DIRECTION §2's "no dark mode" call, worth confirming with the frontend engineer it's
been added, since it's a metadata line and could be missed if each agent assumes another
owns it.

---

## Notes for whoever wires this in

- Every `ASK:` above is a real gap, not a placeholder for me to guess later. Nothing
  downstream should treat an `ASK:` line as filled in.
- I read the whole site's worth of copy together before finalising this file: hero, note,
  Hire Me, and the approach essay all use the same plain, first-person register the master
  copy already sets, no line here reaches for agency language the rest of the site doesn't use.
- Prices for the case studies (section below, `src/data/caseStudies.ts`) are quoted in UGX
  only where the source repo itself quoted UGX; nothing was converted or invented.

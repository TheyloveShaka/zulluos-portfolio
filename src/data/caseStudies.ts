
export interface CaseStudyMetric {
  label: string
  value: string
  verified: boolean
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
  sections: CaseStudySection[]
  stack: string[]
  video?: string
  poster: string
  live?: string
  repo?: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'the-venue-menu',
    title: 'The Venue Menu',
    client: 'The Venue Menu (Kaga Gardens)',
    isConcept: false,
    eyebrow: 'Full-stack development · Wedding vendor discovery · Kampala, Uganda',
    headline: 'Uganda\'s wedding vendor discovery platform, built end to end',
    summary:
      'A searchable directory of Kampala wedding vendors and venues, curated with Kaga Gardens, that I built and still run.',
    metrics: [
      { label: 'Vendor categories', value: '13 categories', verified: true },
      { label: 'Stack', value: 'React 19, Supabase', verified: true },
      { label: 'Admin', value: 'Vendor and waitlist dashboard', verified: true },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem',
        body:
          'Kampala wedding couples had no single place to find and compare vendors, venues, caterers, photographers, decorators, by price, capacity, and real reviews. Vendors themselves had no shared platform to be found on.',
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        body:
          'No existing dataset of Kampala vendors to start from. Every price needed to read in UGX, not USD. The whole thing had to run on a real database with public read access and a private admin, not a static brochure site.',
      },
      {
        id: 'what-i-did',
        heading: 'What I did',
        body:
          '- Designed and built the whole product on React 19, TypeScript, and Vite, with Supabase for the database, auth, and storage.\n- Modelled 13 vendor categories, with extra fields for venues specifically: seating capacity, parking, catering policy, accommodation.\n- Built a data pipeline that pulls vendor listings from Google Places, then enriches descriptions and taglines with OpenAI.\n- Added a shortlist feature, backed by Zustand, so a couple can save vendors and share the list over WhatsApp.\n- Built the admin dashboard Kaga Gardens uses directly to manage vendors and read waitlist signups, with row-level security controlling who can write.',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body:
          'Outcome not yet measured. The platform is live and Kaga Gardens manages it directly through the admin dashboard; visitor and booking numbers are not yet tracked.',
      },
      {
        id: 'what-i-took-from-it',
        heading: 'What I took from it',
        body:
          'Owning a product end to end, not just the code, taught me how much of "done" is actually the data pipeline and the admin someone else has to use every day.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'Zustand', 'React Router', 'OpenAI API'],
    video: '/case-studies/the-venue-menu/walkthrough.mp4',
    poster: '/case-studies/the-venue-menu/poster.webp',
    live: 'https://the-venue-menu.vercel.app',
    repo: 'https://github.com/TheyloveShaka/TheVenueMenu',
  },
  {
    id: 'kamwe-forex',
    title: 'Kamwe Forex',
    client: 'Kamwe Forex Bureau',
    isConcept: true,
    eyebrow: 'Brand-adherence rebuild · Forex bureau · Kampala, Uganda',
    headline: 'A live rate board for a Bank of Uganda licensed forex bureau',
    summary:
      'A redesign concept for kamweforex.com that puts real-time exchange rates first and never shows a live clock over stale numbers.',
    metrics: [
      { label: 'Stack', value: 'Next.js 15, GSAP', verified: true },
      { label: 'Currencies', value: '7 currencies quoted', verified: true },
      { label: 'Motion', value: 'Two distinct scroll gestures', verified: true },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem',
        body:
          'The live site printed a running clock above exchange rates that were hardcoded from 2023, so a visitor read three-year-old numbers as today\'s. Foreign exchange, the bureau\'s core product, didn\'t appear in the main navigation at all.',
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        body:
          'Every string of copy had to stay exactly as the client wrote it, including source typos (\'Logogo\' for Lugogo, \'Todays Exchange Rates\' with no apostrophe). No database, no admin, the client sets rates manually today.',
      },
      {
        id: 'what-i-did',
        heading: 'What I did',
        body:
          '- Rebuilt the rate board to pull live mid-market rates from a currency API, with a fallback source, labelling every number honestly as live, fallback, or stale.\n- Gave the bureau\'s own buy and sell spread its own config file, so the markup that funds the business is legible instead of hidden.\n- Designed two distinct motion gestures, EXCHANGE (a swap) and TRANSFER (a one-way trip), so Forex Exchange and Money Transfer feel like different actions, not two buttons doing the same thing.\n- Added a Foreign Exchange entry to the navigation; on the live site it existed nowhere a visitor could click to.',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body: 'Outcome not yet measured. This is a redesign concept, not the bureau\'s live site.',
      },
      {
        id: 'what-i-took-from-it',
        heading: 'What I took from it',
        body:
          'A live clock over a stale number is a small bug that costs real trust. Fixing what a number claims about itself mattered more than any animation on the page.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'D3.js'],
    video: '/case-studies/kamwe-forex/walkthrough.mp4',
    poster: '/case-studies/kamwe-forex/poster.webp',
    live: 'https://kamwe-forex.vercel.app',
    repo: 'https://github.com/TheyloveShaka/kamwe-forex',
  },
  {
    id: 'uwa',
    title: 'Uganda Wildlife Authority',
    client: 'Uganda Wildlife Authority (speculative, unaffiliated)',
    isConcept: true,
    eyebrow: 'Speculative redesign · Conservation & tourism · Uganda\'s national parks',
    headline: 'Ten national parks, told as ten different landscapes instead of one grid',
    summary:
      'A speculative redesign of ugandawildlife.org\'s front page, not affiliated with, commissioned by, or endorsed by UWA.',
    metrics: [
      { label: 'Parks', value: '10 national parks', verified: true },
      { label: 'Stack', value: 'Vite, React 19, GSAP', verified: true },
      { label: 'Image weight', value: 'Park photos optimised 4.09MB to 1.57MB', verified: true },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem',
        body:
          'The existing site flattened ten genuinely different landscapes, gorillas, savannah, the Nile, into one grid of identical tiles, behind a heavy mega-menu.',
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        body:
          'This is not a commissioned project. UWA\'s own photographs are copyrighted and used here only to demonstrate the design, so the repository stays private and every asset carries a documented replacement plan.',
      },
      {
        id: 'what-i-did',
        heading: 'What I did',
        body:
          '- Designed the Park Strip, ten vertical panels that expand on hover or keyboard focus, where each park\'s name is masked beneath its own photograph so the image physically interrupts the letters.\n- Drew Uganda\'s actual national boundary from OpenStreetMap data as a single lightweight path, and placed each park on it as a real position rather than a marker in an outline.\n- Gated the hero video behind screen width, connection speed, and reduced-motion preference, so a visitor on 3G still gets a fast, complete page with a still image instead.\n- Left two pages that publish no content on the live site as honest \'content pending\' states, rather than inventing copy UWA never wrote.',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body:
          'Outcome not yet measured. This is a speculative redesign, not UWA\'s live site, and the repository is kept private for photo licensing reasons.',
      },
      {
        id: 'what-i-took-from-it',
        heading: 'What I took from it',
        body:
          'Depth can come from masking a real photograph instead of a drop shadow. Restraint everywhere else is what let the one bold idea land.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP'],
    video: '/case-studies/uwa/walkthrough.mp4',
    poster: '/case-studies/uwa/poster.webp',
    repo: 'https://github.com/TheyloveShaka/uwa-redesign',
  },
  {
    id: 'frozen-basket',
    title: 'Frozen Basket',
    client: 'Frozen Basket',
    // ASK: confirm with Shaka whether Frozen Basket runs this rebuild live.
    isConcept: true,
    eyebrow: 'Front-end rebuild · Dessert & ice cream retail · Kisementi, Kampala',
    headline: 'A candy-coloured menu of 178 flavours that still passes contrast checks',
    summary:
      'A redesign concept for frozenbasketug.com built around the shop\'s own 43 menu groups and 178 flavours, not a generic ice cream template.',
    metrics: [
      { label: 'Menu', value: '178 flavours, 43 groups', verified: true },
      { label: 'Stack', value: 'Next.js 15, GSAP', verified: true },
      { label: 'Layout shift', value: '0.000 CLS on both routes', verified: true },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem',
        body:
          'Frozen Basket\'s real menu, 178 flavours across ice cream, boba, waffles, and crepes, had no way to be browsed online beyond a generic framework template, and the site\'s own metadata quoted a price range its actual menu didn\'t match.',
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        body:
          'Every price, category name, and photograph had to come from the client\'s own menu data, verbatim, with no re-categorising or tidying. No backend and no cart, so ordering still routes through a real conversation with the shop.',
      },
      {
        id: 'what-i-did',
        heading: 'What I did',
        body:
          '- Modelled the full menu, 43 groups and 178 flavours, from the client\'s own menu PDF into structured data, instead of a flat product grid.\n- Built a ten-colour token system with pastel ingredient tints for 58 flavours, so a candy palette still clears WCAG AA text contrast.\n- Designed three states for product photography, cut out, windowed behind glass, and a plinth-only placeholder for the one flavour with no photo, so a missing asset never looks like a broken image.\n- Held both routes to zero layout shift, verified against a production build rather than the dev server.',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body:
          'Outcome not yet measured. This is a redesign concept; confirm with Shaka whether it has since gone live for the client.',
      },
      {
        id: 'what-i-took-from-it',
        heading: 'What I took from it',
        body:
          'A ten-colour palette and 58 flavours aren\'t a contradiction if you\'re strict about which layer text is allowed to sit on.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Playwright'],
    video: '/case-studies/frozen-basket/walkthrough.mp4',
    poster: '/case-studies/frozen-basket/poster.webp',
    repo: 'https://github.com/TheyloveShaka/frozen-basket',
  },
  {
    id: 'premium-liquor',
    title: 'Premium Liquor',
    client: 'Premium Liquor',
    isConcept: true,
    eyebrow: 'Redesign concept · Wine & spirits retail · Lugogo, Kampala',
    headline: 'A bottle carousel that re-themes the whole page to whatever you\'re looking at',
    summary:
      'A redesign concept for thepremiumliquor.com where swiping through bottles changes the page\'s colours to match each one\'s own branding.',
    metrics: [
      { label: 'Stack', value: 'Preact, GSAP, Lenis', verified: true },
      { label: 'Ordering', value: 'WhatsApp checkout, no backend', verified: true },
      { label: 'Prices', value: 'Sourced from the brand\'s own live menu', verified: true },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem',
        body:
          'The brand\'s actual product, rare wines and spirits with real personality per bottle, had no way to show off any single bottle; a generic grid treats a rare cognac the same as a shelf staple.',
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        body:
          'No backend and no payments. Every price came from the live site\'s own menu page and had to stay accurate to it. Ordering can only route through WhatsApp.',
      },
      {
        id: 'what-i-did',
        heading: 'What I did',
        body:
          '- Built a side-to-side bottle carousel, swipe on phone, arrows or keys on desktop, where the whole page\'s theme shifts to match the bottle\'s own branding as you move.\n- Sampled the company\'s ink-and-copper wordmark to build the fixed theme the rest of the site, About, storefront, contact, sits on.\n- Wired every \'Order Now\' to a WhatsApp deep link pre-filled with the item, so an interested visitor reaches an actual person, not a dead cart.\n- Wrote an image pipeline that compresses every bottle and storefront photo into two sizes of WebP automatically.',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body: 'Outcome not yet measured. This is a redesign concept, not the brand\'s current live site.',
      },
      {
        id: 'what-i-took-from-it',
        heading: 'What I took from it',
        body:
          'Letting the page\'s own colour react to what you\'re looking at made browsing bottles feel physical instead of like scrolling a list.',
      },
    ],
    stack: ['Preact', 'GSAP'],
    video: '/case-studies/premium-liquor/walkthrough.mp4',
    poster: '/case-studies/premium-liquor/poster.webp',
    repo: 'https://github.com/TheyloveShaka/Premium-liquor',
  },
  {
    id: 'nineteen-twenty-one-flowers',
    title: 'Nineteen Twenty One Flowers',
    client: 'Nineteen Twenty One Flowers',
    isConcept: true,
    eyebrow: 'Redesign concept · Florist & bouquet delivery · Kampala, Uganda',
    headline: 'A florist site built around one animated bouquet and a WhatsApp cart',
    summary:
      'A redesign concept for Nineteen Twenty One Flowers with a soft-pink, hand-drawn feel and ordering that hands off straight to WhatsApp.',
    metrics: [
      { label: 'Pages', value: '4 pages, plain HTML, CSS, JS', verified: true },
      { label: 'Ordering', value: 'WhatsApp cart, no backend', verified: true },
      { label: 'Hero motion', value: '92-frame bouquet animation', verified: true },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem',
        body:
          'A florist selling a visually delicate product needed a site that felt handmade and warm, not another framework-default e-commerce template.',
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        body:
          'No build step, plain HTML, CSS, and vanilla JS across four pages, with a strict rule that each page\'s own agent could only touch its own files. No backend or payment processor, checkout hands off to WhatsApp.',
      },
      {
        id: 'what-i-did',
        heading: 'What I did',
        body:
          '- Built a shared design system, tokens, a floating pill nav, a cart drawer, from scratch in plain CSS, so four static pages read as one product.\n- Embedded a 92-frame SMIL bouquet animation directly as an image, so the hero\'s signature motion needs no JavaScript to run.\n- Designed the cart drawer to build a pre-filled WhatsApp order message from whatever\'s inside it, with pay-on-delivery stated plainly.\n- Added scroll-in reveals across every section, with a full \'prefers-reduced-motion\' fallback that shows all content immediately.',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body: 'Outcome not yet measured. This is a redesign concept, not the brand\'s current live site.',
      },
      {
        id: 'what-i-took-from-it',
        heading: 'What I took from it',
        body:
          'A site doesn\'t need a framework to feel considered. Four plain HTML pages with one disciplined token file held together fine.',
      },
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    video: '/case-studies/nineteen-twenty-one-flowers/walkthrough.mp4',
    poster: '/case-studies/nineteen-twenty-one-flowers/poster.webp',
    repo: 'https://github.com/TheyloveShaka/nineteen-twenty-one-flowers',
  },
  {
    id: 'hotel-site',
    title: 'Kaga Hotel',
    client: 'Kaga Hotel (speculative, fictional concept)',
    isConcept: true,
    eyebrow: 'Concept prototype · Immersive hotel experience · Kampala, Uganda',
    headline: 'A hotel site where scrolling is a walk through the building, not a menu',
    summary:
      'A speculative concept for a fictional Kampala hotel, where the elevator is the navigation and every floor opens onto a different part of the building.',
    metrics: [
      { label: 'Stage', value: 'Figma clickable prototype', verified: true },
      { label: 'Structure', value: '4 scroll chapters', verified: true },
      { label: 'Build status', value: 'Generated stills and video, coded build not started', verified: true },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'Problem',
        body:
          'A hotel site that just lists rooms and a booking form doesn\'t give a guest any sense of the place itself before they arrive.',
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        body:
          'Kaga Hotel is a fictional property, invented for this concept, not a real, bookable business. Every shot had to stay in one lighting state, dusk into blue hour, and one building, an ivory-stone tower, with no other brand name in any image.',
      },
      {
        id: 'what-i-did',
        heading: 'What I did',
        body:
          '- Designed the journey as four chapters, arrival, reception, an elevator, and the room or facility a guest chooses, so navigation is a physical act inside the building rather than a menu bar.\n- Specified every generated image and video clip frame by frame, locking the building, the lighting, and the camera angle so continuity holds across the whole sequence.\n- Built the concept as a clickable Figma prototype first, with the coded, scroll-driven build planned to follow once the direction is approved.\n- Set every sign in every generated image to read \'Kaga Hotel\' and nothing else, so no other brand leaks into the fiction.',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body:
          'Outcome not yet measured. This is a concept prototype for a fictional hotel, not a commissioned or bookable property.',
      },
      {
        id: 'what-i-took-from-it',
        heading: 'What I took from it',
        body:
          'Making navigation a physical act, an elevator instead of a menu, only works if you\'re willing to plan every single frame around it.',
      },
    ],
    stack: ['Figma', 'AI-generated imagery'],
    video: '/case-studies/hotel-site/walkthrough.mp4',
    poster: '/case-studies/hotel-site/poster.webp',
  },
]

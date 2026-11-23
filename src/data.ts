import type {
  Project,
  SocialMediaItem,
  FeaturedPosterItem,
  InstagramFeedItem,
  DesignShowcaseItem,
  Experience,
  SkillGroup,
} from './types'

// ─────────────────────────────────────────────────────────────
// 1. University Projects (Wide macOS Browser Frame layout)
// ─────────────────────────────────────────────────────────────
export const UNIVERSITY_PROJECTS: Project[] = [
  {
    id: 'lumina-lms',
    title: 'Lumina LMS',
    subtitle: 'UI/UX Design & Front-End Web',
    year: '2026',
    category: 'university',
    context:
      'Designed the end-to-end user interface, student/teacher dashboards, and system architecture for an interactive e-learning platform built with React.js, TypeScript, and Python.',
    tags: ['React.js', 'TypeScript', 'UI/UX Design', 'System Architecture'],
    accentColor: 'rgba(139, 92, 246, 0.15)',
    glowColor: 'rgba(139, 92, 246, 0.28)',
    documentation: ['/docs/lumina-1.jpg', '/docs/lumina-2.jpg', '/docs/lumina-3.jpg'],
    caseStudy: {
      overview:
        'Lumina LMS is a modern e-learning platform designed from the ground up to deliver an intuitive, accessible, and engaging experience for both students and educators. The project spanned full end-to-end product design — from initial research and wireframes to a fully coded front-end implementation.',
      role:
        'I owned the complete product design lifecycle: user research, information architecture, wireframing, high-fidelity UI design in Figma, and front-end development with React.js and TypeScript. I also co-designed the system architecture and API contracts with the backend team.',
      documentation: ['/docs/lumina-1.jpg', '/docs/lumina-2.jpg', '/docs/lumina-3.jpg'],
      demoUrl: '[ISI_URL_DEMO]',
      figmaUrl: '[ISI_URL_FIGMA]',
      repoUrl: '[ISI_URL_REPO_ATAU_DRIVE]',
      qaBreakdown: {
        testingScope: [
          'Usability Evaluation across 15 student and educator user tasks',
          'Cross-Browser & Responsive Validation (Chrome, Safari, Firefox, Edge)',
          'WCAG 2.1 AA Color Contrast & Screen-Reader Semantic Checks',
          'Component State Regression (Empty states, Error toasts, Loading skeletons)',
        ],
        keyFindings: [
          'Identified and resolved 18 UI boundary clipping issues on mobile breakpoints (<375px)',
          'Fixed assignment submission state desync where slow networks triggered duplicate API posts',
          'Refactored contrast on secondary metadata tags to reach 4.5:1 ratio for accessibility compliance',
        ],
        qualityImpact:
          'Boosted first-time task completion rate from 74% to 92% during user acceptance testing with 0 critical UI blockers.',
        artifacts: {
          title: 'Usability Task Completion Matrix & Accessibility Audit',
          type: 'Usability Audit',
          caption: 'Evaluated 15 user flows with severity ratings (P1–P4) and verified fixes before release.',
        },
      },
    },
  },
  {
    id: 'majormatch',
    title: 'MajorMatch',
    subtitle: 'Product Design & Mobile App',
    year: '2025–2026',
    category: 'university',
    context:
      'Built an AI-powered college major recommendation application integrating Machine Learning, FastAPI, Python, and Flutter with a streamlined user journey.',
    tags: ['Flutter', 'FastAPI', 'Product Design', 'AI Integration'],
    accentColor: 'rgba(16, 185, 129, 0.12)',
    glowColor: 'rgba(16, 185, 129, 0.24)',
    documentation: ['/docs/majormatch-1.jpg', '/docs/majormatch-2.jpg'],
    caseStudy: {
      overview:
        'MajorMatch is an AI-powered mobile application that helps prospective university students discover their ideal college major through a conversational, personalized recommendation engine powered by a machine learning model trained on academic aptitude and interest data.',
      role:
        'I led product design and contributed to the Flutter front-end implementation. I designed the entire user journey — from onboarding flow to recommendation results — and worked closely with the ML team to translate model outputs into clear, actionable UI decisions.',
      documentation: ['/docs/majormatch-1.jpg', '/docs/majormatch-2.jpg'],
      demoUrl: '[ISI_URL_DEMO]',
      figmaUrl: '[ISI_URL_FIGMA]',
      repoUrl: '[ISI_URL_REPO_ATAU_DRIVE]',
      qaBreakdown: {
        testingScope: [
          'FastAPI Endpoint Contract Validation & Mock Response Edge Cases',
          'Form Input Validation (Special characters, incomplete surveys, rapid taps)',
          'Flutter State Management & Recommendation Result Persistence',
        ],
        keyFindings: [
          'Caught ML response timeout on cold starts and implemented an optimistic shimmer skeleton screen',
          'Fixed memory leak on repeatedly swiping recommendation carousel cards on low-end Android devices',
        ],
        qualityImpact:
          'Reduced app unhandled exceptions to 0% and ensured seamless recommendation delivery under unpredictable mobile networks.',
        artifacts: {
          title: 'API Boundary Test Cases & Survey Form Edge Matrix',
          type: 'Test Case Matrix',
          caption: 'Documented 34 test cases covering network degradation, payload bounds, and model fallbacks.',
        },
      },
    },
  },
  {
    id: 'bliss-social',
    title: 'Bliss Social Space',
    subtitle: 'Web Development',
    year: '2026',
    category: 'university',
    context:
      'Developed a responsive web-based cashier and ordering system designed for fast order flow and clean operational usability.',
    tags: ['Front-End Web', 'UI Design', 'Ordering System'],
    accentColor: 'rgba(245, 158, 11, 0.12)',
    glowColor: 'rgba(245, 158, 11, 0.24)',
    documentation: ['/docs/bliss-1.jpg'],
    caseStudy: {
      overview:
        'Bliss Social Space is a web-based point-of-sale and ordering system built for a café/social space environment. The focus was on minimizing staff training time, reducing order errors, and providing a visually clean interface that works equally well on tablet and desktop.',
      role:
        'I handled all front-end development and UI design. This included the order management interface, menu browsing, real-time cart updates, and print-ready receipt generation.',
      documentation: ['/docs/bliss-1.jpg'],
      demoUrl: '[ISI_URL_DEMO]',
      figmaUrl: '[ISI_URL_FIGMA]',
      repoUrl: '[ISI_URL_REPO_ATAU_DRIVE]',
      qaBreakdown: {
        testingScope: [
          'Real-time Cart Calculation Testing (Discounts, Tax, Split-bills, Vouchers)',
          'Receipt Generation & Thermal Printer Layout Formatting Verification',
          'Touch Target Usability Audit on 10-inch Tablet Screens in Café Lighting',
        ],
        keyFindings: [
          'Caught floating-point rounding discrepancy in tax calculation on mixed-discount items',
          'Eliminated double-charge race condition caused by rapid multi-clicks on "Pay Now" button',
        ],
        qualityImpact:
          'Order processing errors dropped by 60% and checkout speed improved from 4 minutes to under 90 seconds.',
        artifacts: {
          title: 'Financial Logic & POS Checkout Regression Checklist',
          type: 'Regression Checklist',
          caption: 'Verified 40+ POS scenarios including offline recovery, bill splits, and thermal printing.',
        },
      },
    },
  },
]

// ─────────────────────────────────────────────────────────────
// 2. QA & Testing Dedicated Entries
// ─────────────────────────────────────────────────────────────
export const QA_TESTING_PROJECTS: Project[] = [
  {
    id: 'jurnalkas-qa',
    title: 'JurnalKas — Quality Assurance Internship',
    subtitle: 'Software Quality Assurance • Financial Web & Mobile App',
    year: '2026',
    category: 'qa-testing',
    context:
      'Executed end-to-end manual testing, test case authoring, bug lifecycle management in JIRA, and regression testing for a high-traffic financial management application.',
    tags: [
      'Manual Testing',
      'Test Case Design',
      'Bug Reporting (JIRA)',
      'Regression Testing',
      'Financial Usability',
    ],
    accentColor: 'rgba(14, 165, 233, 0.15)',
    glowColor: 'rgba(14, 165, 233, 0.3)',
    documentation: ['/docs/jurnalkas-1.jpg', '/docs/jurnalkas-2.jpg'],
    caseStudy: {
      overview:
        'During my Quality Assurance Internship at JurnalKas, I was responsible for safeguarding software quality and user trust across a multi-tenant financial management application. Given the sensitive nature of financial ledger data, transactions, and reporting calculations, my focus was on establishing rigorous test cases, catching edge-case bugs early, and validating new feature releases before deployment.',
      role:
        'Quality Assurance Intern. I designed test matrices, authored detailed test cases with step-by-step reproduction guidelines, logged and tracked defects in JIRA with dev triage, and led regression verification cycles on staging environments.',
      documentation: ['/docs/jurnalkas-1.jpg', '/docs/jurnalkas-2.jpg'],
      demoUrl: '[ISI_URL_DEMO]',
      figmaUrl: '[ISI_URL_FIGMA]',
      repoUrl: '[ISI_URL_REPO_ATAU_DRIVE]',
      qaBreakdown: {
        testingScope: [
          'Functional Manual Testing across Transaction Creation, Account Reconciliation, and PDF Export',
          'Boundary Value Analysis (Zero values, negative numbers, max integer bounds, decimal rounding)',
          'Regression Testing Cycles on Web (Chrome/Firefox) & Mobile Web views before each deployment sprint',
          'Defect Tracking & Verification in JIRA with reproduction steps, environment details, and screen recordings',
          'Usability & Cognitive Load Evaluation to simplify financial jargon for micro-business owners',
        ],
        keyFindings: [
          'Critical: Caught rounding discrepancy in multi-tax invoice export where compound VAT mismatched subtotal by cents',
          'Major: Identified race condition allowing duplicate expense entries when user double-tapped submit on slow 3G',
          'Medium: Found session expiration bug on ledger pagination that cleared unsaved filter preferences without warning',
          'Usability: Reported ambiguous delete confirmation dialog that caused accidental record archiving, resolved via dev collaboration',
        ],
        qualityImpact:
          'Zero critical bugs slipped into production across 6 release sprints. Reduced average bug turnaround cycle time by 35% through standardized bug documentation with clear logs and reproduction steps.',
        artifacts: {
          title: 'JurnalKas Test Case Specification & JIRA Bug Report Sheet',
          type: 'Bug Report Sheet',
          caption: 'Standardized defect log tracking ID, module, severity (Blocker/Critical/Major), expected vs actual behavior, and resolution status.',
        },
      },
    },
  },
]

// Backwards compatibility
export const PROJECTS: Project[] = UNIVERSITY_PROJECTS

// ─────────────────────────────────────────────────────────────
// 3. Social Media Content (12 Distinct Instagram Reels with cover paths)
// ─────────────────────────────────────────────────────────────
export const SOCIAL_MEDIA_ITEMS: SocialMediaItem[] = [
  {
    id: 'reel-01',
    title: 'Short-Form Reel #01',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Featured Reel',
    thumbnailUrl: '/reels/reel-01.jpg',
    externalUrl: 'https://www.instagram.com/reel/DVINGUVEqmI/?gwpx=MWwxM2llangwMnY3Ng==',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Viral Content',
    duration: '0:45',
    accentColor: 'rgba(239, 68, 68, 0.15)',
    glowColor: 'rgba(239, 68, 68, 0.3)',
    hookText: '"Mastering high-impact hooks and narrative rhythm for short-form retention."',
    tags: ['Video Editing', 'Motion Graphics', 'Retention Hook'],
  },
  {
    id: 'reel-02',
    title: 'Short-Form Reel #02',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-02.jpg',
    externalUrl: 'https://www.instagram.com/reel/DU-7IFoEtTz/?jplx=d2xwYjM0dWF3OTA1',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Educational Reel',
    duration: '0:42',
    accentColor: 'rgba(14, 165, 233, 0.15)',
    glowColor: 'rgba(14, 165, 233, 0.3)',
    hookText: '"Breaking down complex concepts with clear visual analogies and screen graphics."',
    tags: ['Motion Graphics', 'Fast-Paced Cut', 'Explainer'],
  },
  {
    id: 'reel-03',
    title: 'Short-Form Reel #03',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-03.jpg',
    externalUrl: 'https://www.instagram.com/reel/DUe8uhaEm1X/?dmpr=MWZ1Y3c3dndxaWFmag==',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Creative Storytelling',
    duration: '0:38',
    accentColor: 'rgba(168, 85, 247, 0.15)',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    hookText: '"Storytelling that connects: framing key insights into relatable narrative beats."',
    tags: ['Storyboarding', 'Sound FX', 'Creative Direction'],
  },
  {
    id: 'reel-04',
    title: 'Short-Form Reel #04',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-04.jpg',
    externalUrl: 'https://www.instagram.com/reel/DUXWMXLkpCe/?knvt=MWdkcG5iN2xuYmZ3cw==',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Brand Strategy',
    duration: '0:50',
    accentColor: 'rgba(16, 185, 129, 0.15)',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    hookText: '"Turning audience curiosity into actionable insights with visual proof."',
    tags: ['Brand Voice', 'Kinetic Text', 'Social Strategy'],
  },
  {
    id: 'reel-05',
    title: 'Short-Form Reel #05',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-05.jpg',
    externalUrl: 'https://www.instagram.com/reel/DUBtP8OEptq/?knvt=MXFmN2YwajNvcWdxMg==',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Motion & Visuals',
    duration: '0:35',
    accentColor: 'rgba(245, 158, 11, 0.15)',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    hookText: '"Fast-paced visual energy designed to stop the infinite scroll immediately."',
    tags: ['Beat Sync', 'Speed Ramping', 'Visual Hook'],
  },
  {
    id: 'reel-06',
    title: 'Short-Form Reel #06',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-06.jpg',
    externalUrl: 'https://www.instagram.com/reel/DTQT8NxEn87/?fqnt=a2xoOGw5MTMyeWw4',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Product Spotlight',
    duration: '0:40',
    accentColor: 'rgba(236, 72, 153, 0.15)',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    hookText: '"Highlighting key product features with macro closeups and crisp sound FX."',
    tags: ['Feature Tour', 'Macro Zoom', 'Audio Design'],
  },
  {
    id: 'reel-07',
    title: 'Short-Form Reel #07',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-07.jpg',
    externalUrl: 'https://www.instagram.com/reel/CqCvYtitjBG/?jplx=a2YxeTB0YmZ5ZGpz',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Podcast Highlights',
    duration: '0:48',
    accentColor: 'rgba(20, 184, 166, 0.15)',
    glowColor: 'rgba(20, 184, 166, 0.3)',
    hookText: '"Capturing powerful interview soundbites with expressive dynamic captions."',
    tags: ['Multicam Cut', 'Audio Cleanup', 'Subtitles'],
  },
  {
    id: 'reel-08',
    title: 'Short-Form Reel #08',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-08.jpg',
    externalUrl: 'https://www.instagram.com/reel/DY9uhsrzuLU/?fqnt=cGs3eWduMjFqZ3Q0',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Tutorial & Tips',
    duration: '0:52',
    accentColor: 'rgba(99, 102, 241, 0.15)',
    glowColor: 'rgba(99, 102, 241, 0.3)',
    hookText: '"Step-by-step tutorial breakdown formatted for rapid comprehension."',
    tags: ['Tutorial Steps', 'Screen Recording', 'Infographic'],
  },
  {
    id: 'reel-09',
    title: 'Short-Form Reel #09',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-09.jpg',
    externalUrl: 'https://www.instagram.com/reel/DY6x7enTsck/?jplx=djdqa2hreTRuZ2hk',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Trending Format',
    duration: '0:30',
    accentColor: 'rgba(244, 63, 94, 0.15)',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    hookText: '"Leveraging trending social formats with original creative execution."',
    tags: ['Trend Jacking', 'Fast Edit', 'Sound Sync'],
  },
  {
    id: 'reel-10',
    title: 'Short-Form Reel #10',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-10.jpg',
    externalUrl: 'https://www.instagram.com/reel/DYxYPq6zNLa/?lqvp=MWk1aHN3d3FvcjN1cw==',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Creative Direction',
    duration: '0:44',
    accentColor: 'rgba(132, 204, 22, 0.15)',
    glowColor: 'rgba(132, 204, 22, 0.3)',
    hookText: '"Refined aesthetic framing with editorial typography and cinematic color tones."',
    tags: ['Cinematic Look', 'Editorial Cut', 'Color Grading'],
  },
  {
    id: 'reel-11',
    title: 'Short-Form Reel #11',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-11.jpg',
    externalUrl: 'https://www.instagram.com/reel/DYn30OlTGNb/',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Visual Design',
    duration: '0:36',
    accentColor: 'rgba(6, 182, 212, 0.15)',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    hookText: '"Interactive design micro-moments showcased through crisp screen recordings."',
    tags: ['UI Showcase', 'Motion Design', 'App Flow'],
  },
  {
    id: 'reel-12',
    title: 'Short-Form Reel #12',
    platform: 'Instagram Reels',
    viewsCount: 0,
    viewsLabel: 'Reel Highlight',
    thumbnailUrl: '/reels/reel-12.jpg',
    externalUrl: 'https://www.instagram.com/reel/DYW-W_CTNha/',
    notes: 'Edited short-form video content—update title, view count, and editing notes as needed.',
    category: 'Brand Campaign',
    duration: '0:46',
    accentColor: 'rgba(217, 70, 239, 0.15)',
    glowColor: 'rgba(217, 70, 239, 0.3)',
    hookText: '"Campaign promotional edit connecting brand story with clear viewer value."',
    tags: ['Promo Reel', 'Brand Voice', 'Call to Action'],
  },
]

// ─────────────────────────────────────────────────────────────
// 4A. Featured Posters (5 Local Image Cards)
// ─────────────────────────────────────────────────────────────
export const FEATURED_POSTERS: FeaturedPosterItem[] = [
  {
    id: 'poster-if-mart',
    title: 'IF-MART — We Are Open',
    category: 'Promotional Poster • HMIF UAI',
    imageUrl: '/poster-if-mart.jpeg',
    aspectRatio: 'aspect-[3/4]',
    accentColor: 'rgba(59, 130, 246, 0.18)',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    notes: 'Official opening and promotional showcase poster for IF-MART, Student Association of Informatics (HMIF UAI).',
  },
  {
    id: 'poster-buynana',
    title: 'Buynana Chips — Promo Exclusive',
    category: 'Product & Promo Poster • HMIF UAI',
    imageUrl: '/poster-buynana.jpeg',
    aspectRatio: 'aspect-[3/4]',
    accentColor: 'rgba(245, 158, 11, 0.18)',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    notes: 'Commercial product launch and exclusive student discount promotional poster for Buynana Chips.',
  },
  {
    id: 'poster-farewell-ef',
    title: 'Farewell Event Invitation (Retro UI)',
    category: 'Event Poster • EF Efekta FX Sudirman',
    imageUrl: '/poster-farewell-ef.jpeg',
    aspectRatio: 'aspect-[3/4]',
    accentColor: 'rgba(16, 185, 129, 0.18)',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    notes: 'Retro macOS & pixel UI-inspired farewell gathering invitation designed for EF Efekta English First FX Sudirman.',
  },
  {
    id: 'poster-open-donasi',
    title: 'Urban Ramfest — Open Donasi',
    category: 'Social Campaign Poster',
    imageUrl: '/poster-bukber.jpg',
    aspectRatio: 'aspect-[3/4]',
    accentColor: 'rgba(139, 92, 246, 0.18)',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    notes: 'Community fundraising and donation campaign visual designed for the Urban Ramadhan Festival.',
  },
  {
    id: 'poster-bukber',
    title: 'Bukber Extraordinary Bogor',
    category: 'Community Event Poster',
    imageUrl: '/poster-bukber.png',
    aspectRatio: 'aspect-[3/4]',
    accentColor: 'rgba(236, 72, 153, 0.18)',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    notes: 'Festive community gathering key visual and social media poster for Extraordinary Bogor.',
  },
]

// ─────────────────────────────────────────────────────────────
// 4B. Instagram Feeds & Carousels (16 Live Embed Cards)
// ─────────────────────────────────────────────────────────────
export const INSTAGRAM_FEED_ITEMS: InstagramFeedItem[] = [
  {
    id: 'feed-01',
    title: 'Instagram Feed #01',
    shortcode: 'DWG4YuNEpn0',
    externalUrl: 'https://www.instagram.com/p/DWG4YuNEpn0/?jplx=d2NvMWFxeDNlcGcw',
    category: 'Carousel & Feed Design',
    accentColor: 'rgba(139, 92, 246, 0.15)',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    notes: 'Visual feed layout designed for high engagement and smooth visual continuity.',
  },
  {
    id: 'feed-02',
    title: 'Instagram Carousel #02',
    shortcode: 'DVOh8MWkraq',
    externalUrl: 'https://www.instagram.com/p/DVOh8MWkraq/?img_index=3&knvt=enBpY3B5cGN4a2I=',
    category: 'Multi-Slide Carousel',
    accentColor: 'rgba(59, 130, 246, 0.15)',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    notes: 'Informative multi-slide carousel highlighting design concepts and swipe retention.',
  },
  {
    id: 'feed-03',
    title: 'Instagram Carousel #03',
    shortcode: 'DT1vADwEkn5',
    externalUrl: 'https://www.instagram.com/p/DT1vADwEkn5/?img_index=3&jplx=MWtncThwd3IzYWFxMw==',
    category: 'Multi-Slide Carousel',
    accentColor: 'rgba(16, 185, 129, 0.15)',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    notes: 'Clean typography and structured layout designed for editorial storytelling.',
  },
  {
    id: 'feed-04',
    title: 'Instagram Carousel #04',
    shortcode: 'DXg01YZE0n6',
    externalUrl: 'https://www.instagram.com/p/DXg01YZE0n6/?img_index=4&evlk=M281aDluN2NrYjFk',
    category: 'Multi-Slide Carousel',
    accentColor: 'rgba(245, 158, 11, 0.15)',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    notes: 'Step-by-step breakdown carousel with consistent color system.',
  },
  {
    id: 'feed-05',
    title: 'Instagram Feed #05',
    shortcode: 'DXRXB_fE7Md',
    externalUrl: 'https://www.instagram.com/p/DXRXB_fE7Md/?lqvp=dGNjYzl5Mngyc2I1',
    category: 'Campaign Visual',
    accentColor: 'rgba(239, 68, 68, 0.15)',
    glowColor: 'rgba(239, 68, 68, 0.3)',
    notes: 'Dynamic social media graphic optimized for mobile viewing.',
  },
  {
    id: 'feed-06',
    title: 'Instagram Feed #06',
    shortcode: 'DXJlUCOk9nB',
    externalUrl: 'https://www.instagram.com/p/DXJlUCOk9nB/?knvt=bzF1bWZyc2t2djZk',
    category: 'Product Spotlight',
    accentColor: 'rgba(6, 182, 212, 0.15)',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    notes: 'Visual showcase focusing on clarity and compelling call to action.',
  },
  {
    id: 'feed-07',
    title: 'Instagram Carousel #07',
    shortcode: 'DW6JQbvE-f7',
    externalUrl: 'https://www.instagram.com/p/DW6JQbvE-f7/?img_index=3&dmpr=MWR1ZHNoZTlyc2E3MQ==',
    category: 'Multi-Slide Carousel',
    accentColor: 'rgba(168, 85, 247, 0.15)',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    notes: 'Swipeable educational carousel with balanced white space and contrast.',
  },
  {
    id: 'feed-08',
    title: 'Instagram Carousel #08',
    shortcode: 'DWkf02fkyXn',
    externalUrl: 'https://www.instagram.com/p/DWkf02fkyXn/?img_index=3&jplx=OHM2MTVkbzd1ZDZo',
    category: 'Multi-Slide Carousel',
    accentColor: 'rgba(14, 165, 233, 0.15)',
    glowColor: 'rgba(14, 165, 233, 0.3)',
    notes: 'Modern editorial slide deck tailored for digital creators.',
  },
  {
    id: 'feed-09',
    title: 'Instagram Feed #09',
    shortcode: 'DWGvmsak2yK',
    externalUrl: 'https://www.instagram.com/p/DWGvmsak2yK/?hvrq=Y3g1ZjU1ZXh1azhs',
    category: 'Brand Announcement',
    accentColor: 'rgba(236, 72, 153, 0.15)',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    notes: 'High-contrast graphic designed to capture scroll attention.',
  },
  {
    id: 'feed-10',
    title: 'Instagram Feed #10',
    shortcode: 'DV7_8K5EzvD',
    externalUrl: 'https://www.instagram.com/p/DV7_8K5EzvD/?hvrq=N3FnY2RkeGJoejdu',
    category: 'Event Highlight',
    accentColor: 'rgba(34, 197, 94, 0.15)',
    glowColor: 'rgba(34, 197, 94, 0.3)',
    notes: 'Community announcement post with distinct focal hierarchy.',
  },
  {
    id: 'feed-11',
    title: 'Instagram Feed #11',
    shortcode: 'DVvdXTXE5D_',
    externalUrl: 'https://www.instagram.com/p/DVvdXTXE5D_/?evlk=MWNwdjJsM2o2bW10Mg==',
    category: 'Social Graphic',
    accentColor: 'rgba(251, 146, 60, 0.15)',
    glowColor: 'rgba(251, 146, 60, 0.3)',
    notes: 'Warm tonal palette with clear typography and minimal clutter.',
  },
  {
    id: 'feed-12',
    title: 'Instagram Carousel #12',
    shortcode: 'DVgf3RUkyIk',
    externalUrl: 'https://www.instagram.com/p/DVgf3RUkyIk/?img_index=3&jplx=MXR5MnQwcm5vMTZ0Yw==',
    category: 'Multi-Slide Carousel',
    accentColor: 'rgba(139, 92, 246, 0.15)',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    notes: 'Multi-slide narrative structure demonstrating sequential concepts.',
  },
  {
    id: 'feed-13',
    title: 'Instagram Feed #13',
    shortcode: 'DVd4Pq1E1pN',
    externalUrl: 'https://www.instagram.com/p/DVd4Pq1E1pN/?bqrl=MW1xdm1jcTd2dWRzZQ==',
    category: 'Promo Post',
    accentColor: 'rgba(59, 130, 246, 0.15)',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    notes: 'Concise promotional graphic highlighting key benefits.',
  },
  {
    id: 'feed-14',
    title: 'Instagram Carousel #14',
    shortcode: 'DVbKWs8kwYW',
    externalUrl: 'https://www.instagram.com/p/DVbKWs8kwYW/?img_index=2&lqvp=MXFkbGQwbDF3cTk0MA==',
    category: 'Multi-Slide Carousel',
    accentColor: 'rgba(16, 185, 129, 0.15)',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    notes: 'Informational carousel format with structured cards and icons.',
  },
  {
    id: 'feed-15',
    title: 'Instagram Carousel #15',
    shortcode: 'DVYcB72E3ZZ',
    externalUrl: 'https://www.instagram.com/p/DVYcB72E3ZZ/?img_index=3&gwpx=anB2cnAxcWtuYTJy',
    category: 'Multi-Slide Carousel',
    accentColor: 'rgba(244, 63, 94, 0.15)',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    notes: 'Impactful slide transitions maintaining viewer interest.',
  },
  {
    id: 'feed-16',
    title: 'Instagram Feed #16',
    shortcode: 'DLwzMcMyaav',
    externalUrl: 'https://www.instagram.com/p/DLwzMcMyaav/?avpt=dXk1aHA3cnZhNDA1',
    category: 'Showcase Feed',
    accentColor: 'rgba(147, 51, 234, 0.15)',
    glowColor: 'rgba(147, 51, 234, 0.3)',
    notes: 'Brand visual identity exploration and grid arrangement.',
  },
]

// ─────────────────────────────────────────────────────────────
// 4C. Conceptual Design Showcase (Legacy / Case Studies)
// ─────────────────────────────────────────────────────────────
export const DESIGN_SHOWCASE_ITEMS: DesignShowcaseItem[] = [
  {
    id: 'poster-tech-expo',
    title: 'Informatics Tech Expo & Hackathon 2026',
    format: 'Event Poster',
    aspectRatio: 'aspect-[3/4]',
    year: '2026',
    description:
      'Official key visual and promotional poster for the annual University Informatics Expo featuring modern brutalist typography and dark cyberpunk aesthetics.',
    tools: ['Figma', 'Adobe Illustrator', 'Photoshop'],
    accentColor: 'rgba(139, 92, 246, 0.18)',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    concept:
      'Combining high-contrast editorial typography with isometric circuitry grids. Structured to communicate dates, competition tracks, and registration QR seamlessly from a distance.',
    figmaUrl: '[ISI_URL_FIGMA]',
    previewType: 'poster-tech',
  },
  {
    id: 'feed-design-systems',
    title: '"Design Systems in Practice" Carousel Feed',
    format: 'Carousel Feed',
    aspectRatio: 'aspect-[4/5]',
    year: '2026',
    description:
      'A 10-slide educational Instagram carousel detailing component tokenization, dark mode color science, and atomic design workflows.',
    tools: ['Figma', 'Design Systems', 'Micro-copywriting'],
    accentColor: 'rgba(16, 185, 129, 0.18)',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    concept:
      'Dark obsidian UI cards with vivid neon accents. Visual slide-to-slide continuity with horizontal connector lines that drive swipe retention.',
    figmaUrl: '[ISI_URL_FIGMA]',
    previewType: 'feed-carousel',
  },
  {
    id: 'poster-campus-gathering',
    title: 'BEM FST Campus Gathering & Leadership Summit',
    format: 'Brand Identity Poster',
    aspectRatio: 'aspect-[3/4]',
    year: '2026',
    description:
      'Visual identity poster designed for the Faculty of Science & Technology student leadership summit at Universitas Al Azhar Indonesia.',
    tools: ['Figma', 'Adobe Photoshop'],
    accentColor: 'rgba(245, 158, 11, 0.18)',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    concept:
      'Architectural geometric layout inspired by modernist Swiss design with warm ambient lighting effects and bold serif accents.',
    figmaUrl: '[ISI_URL_FIGMA]',
    previewType: 'poster-campus',
  },
  {
    id: 'feed-fintech-launch',
    title: 'Fintech Feature Launch & Social Feed Grid',
    format: 'Social Campaign',
    aspectRatio: 'aspect-[4/5]',
    year: '2026',
    description:
      'Modular social media campaign feed celebrating a new budget tracking feature release with seamless 3-post grid interconnectivity.',
    tools: ['Figma', 'UI Design', 'Vector Illustration'],
    accentColor: 'rgba(14, 165, 233, 0.18)',
    glowColor: 'rgba(14, 165, 233, 0.35)',
    concept:
      'Continuous panoramic design spreading across multiple Instagram grid posts. Showcases app micro-interactions against subtle glassy gradient backdrops.',
    figmaUrl: '[ISI_URL_FIGMA]',
    previewType: 'feed-fintech',
  },
  {
    id: 'feed-accessibility-guide',
    title: 'Web Accessibility (WCAG 2.1) Developer Guide',
    format: 'Carousel Feed',
    aspectRatio: 'aspect-[4/5]',
    year: '2026',
    description:
      'Swipeable visual guide breaking down contrast ratios, keyboard navigation standards, and screen reader semantic HTML patterns.',
    tools: ['Figma', 'Technical Writing'],
    accentColor: 'rgba(236, 72, 153, 0.18)',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    concept:
      'High accessibility compliance baked directly into the poster design itself, utilizing high-contrast tokens, readable sans-serif scales, and clear visual tables.',
    figmaUrl: '[ISI_URL_FIGMA]',
    previewType: 'feed-guide',
  },
  {
    id: 'poster-cyber-security',
    title: 'Cybersecurity Awareness & Privacy Campaign',
    format: 'Event Poster',
    aspectRatio: 'aspect-[3/4]',
    year: '2026',
    description:
      'Minimalist editorial poster highlighting password hygiene, zero-trust mindset, and digital privacy best practices for university students.',
    tools: ['Adobe Illustrator', 'Figma'],
    accentColor: 'rgba(239, 68, 68, 0.18)',
    glowColor: 'rgba(239, 68, 68, 0.35)',
    concept:
      'Noir aesthetic with striking monochromatic typography, wireframe security padlock vector iconography, and emergency amber warning elements.',
    figmaUrl: '[ISI_URL_FIGMA]',
    previewType: 'poster-cyber',
  },
]

// ─────────────────────────────────────────────────────────────
// Experiences & Skills
// ─────────────────────────────────────────────────────────────
export const WORK_EXPERIENCES: Experience[] = [
  {
    role: 'Software Quality Assurance Intern',
    company: 'jurnalkas.com',
    period: 'Aug 2026 – Oct 2026',
    bullets: [
      'Evaluated UI/UX consistency and user flows across mobile and web platforms for a newly launched MSME financial management app, ensuring an intuitive interface.',
      'Identified usability friction and edge cases, providing structured feedback to refine design patterns, layout alignment, and visual hierarchy.',
      'Designed and executed user-centric test scenarios mapping complete user journeys (e.g., transaction logging, financial reporting) to validate functional and visual UX reliability.',
      'Collaborated closely with cross-functional teams to align functional requirements with seamless design execution, reducing user drop-off during core workflows.',
    ],
  },
  {
    role: 'Editor and Graphic Designer Intern',
    company: 'PT Kasisolusi',
    period: 'Dec 2025 – May 2026',
    bullets: [
      'Produced and published high-performing social media video content, reaching over 6.2 million views and driving record audience engagement.',
      'Curated and updated multimedia content across various social media platforms to maintain audience engagement.',
      'Designed visually striking graphics for social media campaigns, increasing engagement rates and audience reach.',
    ],
  },
]

export const ORGANIZATION_EXPERIENCES: Experience[] = [
  {
    role: 'Creative Media',
    company: 'BEM FST (Faculty of Science and Technology)',
    period: '2026 – Present',
    bullets: [
      'Produced end-to-end multimedia coverage (planning, shooting, and editing) for orientation and faculty launch events.',
      'Coordinated schedules, locations, and talent for efficient on-site production and rapid post-event delivery.',
      'Optimized content for social platforms and internal archives, ensuring consistent visual identity and audience engagement.',
    ],
  },
  {
    role: 'Creative Media',
    company: 'HMIF (Himpunan Mahasiswa Informatika)',
    period: '2025 – 2026',
    bullets: [
      'Designed creative multimedia materials including posters, flyers, and digital graphics to support communication and branding efforts.',
      'Developed innovative visual storytelling techniques through digital media to expand student audience reach.',
      'Designed and produced custom logos and branding materials for multiple events to maintain a consistent visual identity.',
    ],
  },
  {
    role: 'Steering Committee of Creative Media',
    company: 'HISTORIZ (Faculty of Science & Technology Event)',
    period: '2025',
    bullets: [
      'Chaired the Steering Committee of Creative Media, leading strategic planning and decision-making for multimedia content across student activities and events.',
      'Developed and implemented standards for creative media production to maintain consistent, high-quality video and photo coverage.',
    ],
  },
  {
    role: 'Creative Economy',
    company: 'HMIF (Himpunan Mahasiswa Informatika)',
    period: '2024 – 2025',
    bullets: [
      'Fostered students\' interests and talents in the creative economy within informatics, focusing on technology-driven entrepreneurship.',
      'Initiated and managed programs including IF Merch (merchandise sales), IF MART (food & beverage sales), and INKUBATOR IT (laptop/computer repair entrepreneurship).',
    ],
  },
]

// Backwards compatibility
export const EXPERIENCES: Experience[] = WORK_EXPERIENCES

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Web & App Dev',
    skills: ['React.js', 'TypeScript', 'HTML / CSS', 'Flutter', 'Python', 'FastAPI', 'Tailwind CSS'],
  },
  {
    label: 'UI/UX & Visual Design',
    skills: ['Figma', 'Prototyping', 'Design Systems', 'User Research', 'Wireframing'],
  },
  {
    label: 'Quality Assurance',
    skills: [
      'Manual Testing',
      'Test Case Writing',
      'Bug Reporting (JIRA)',
      'Regression Testing',
      'Usability Testing',
      'Boundary Value Analysis',
    ],
  },
  {
    label: 'Media & Content',
    skills: ['Video Editing', 'Motion Graphics', 'Graphic Design', 'Content Strategy', 'Short-Form Video'],
  },
]

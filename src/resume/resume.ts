/* ─── Resume content ───────────────────────────────────────────────
   Edit everything below — the resume page (ResumePage.tsx) renders
   from this file, and the Download button prints it to PDF.
------------------------------------------------------------------- */

export interface Job {
  org: string
  meta: string
  role: string
  period: string
  points: string[]
}

export interface Project {
  name: string
  tag: string
  points: string[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

export const resume = {
  name: 'RISHAV DAS',
  title: 'Web Developer (Frontend & UI/UX)',
  portfolio: 'rdjverse.com',
  portfolioHref: 'https://rdjverse.com',
  email: 'hello@rdjverse.com',
  location: 'India',
  links: [
    { label: 'GitHub', href: 'https://github.com/rdjverse' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/rdjverse' },
  ],
  summary:
    'UI/UX Designer & Frontend Developer with over a year of experience crafting responsive, user-friendly, and visually engaging websites. Blends design thinking with clean, functional code to deliver digital experiences that are intuitive and impactful. Delivered 5+ projects, improving performance and user engagement through responsive, accessible design. Currently expanding into React.js and no-code tools (Framer & Wix Studio).',
  experience: [
    {
      org: 'COINEDONE',
      meta: 'Kochi, Kerala, India · Remote (Feb 2026 – Present · 8 mos)',
      role: 'Frontend — Visual Web Developer and AI Prompting | Full-time',
      period: '',
      points: [
        'Visual web development with AI-assisted workflows — prompting, prototyping and shipping production interfaces faster.',
        'Own frontend delivery for product surfaces; bridging design intent and performant React implementation.',
      ],
    },
    {
      org: 'REMEDIO TECHNOLOGIES PVT LTD',
      meta: 'On-site (Sep 2025 – Dec 2025 · 4 mos)',
      role: 'Frontend Developer | Full-time',
      period: '',
      points: [
        'Built and maintained frontend features for core product flows with a focus on reliability and polish.',
        'Collaborated on-site with design and backend to ship iterative improvements.',
      ],
    },
    {
      org: 'GRAPPLTECH',
      meta: 'Remote (Jul 2024 – Aug 2024 · 2 mos)',
      role: 'Developer | Internship',
      period: '',
      points: [
        'Internship — built frontend tasks, learned production workflows and shipping cadence.',
      ],
    },
  ] as Job[],
  projects: [
    {
      name: 'STORELYFT.COM',
      tag: 'Ecommerce Website',
      points: [
        'Built a modern e-commerce platform with user-friendly navigation and optimized product layouts.',
        'Enhanced site performance through clean code, SEO basics, and cross-browser testing.',
      ],
    },
    {
      name: 'DOCTOR’S HUB',
      tag: 'Online Appointment System',
      points: [
        'Designed and prototyped a healthcare appointment booking system with a user-friendly scheduling flow.',
        'Focused on ease of navigation and responsive UI for patients and doctors.',
      ],
    },
    {
      name: 'ORBITDYNAMIX',
      tag: 'Portfolio Website',
      points: [
        'Designed and developed a personal brand portfolio showcasing UI/UX projects and web development skills.',
        'Implemented a responsive, mobile-first layout for a consistent experience across devices.',
      ],
    },
    {
      name: 'CAMCORE',
      tag: 'UI/UX & Prototype',
      points: [
        'Created high-fidelity prototypes and user flows for a scalable business website concept.',
        'Conducted wireframing and usability testing to refine the experience.',
      ],
    },
  ] as Project[],
  skills: [
    { group: 'Design', items: ['Figma', 'Wireframing', 'Prototyping', 'Usability testing'] },
    { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Bootstrap'] },
    { group: 'Expanding', items: ['React.js', 'Framer', 'Wix Studio'] },
  ] as SkillGroup[],
}

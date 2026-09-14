import { resume } from './resume'

const F = 'var(--font-display)'
const TEAL = '#115E59'

const NAV = [
  { label: 'HOME', href: '#' },
  { label: 'WORK', href: '#projects' },
  { label: 'ABOUT', href: '#philosophy' },
  { label: 'RESUME', href: '#resume' },
  { label: 'CONTACT', href: '#contact' },
]

function SectionHead({ children }: { children: string }) {
  return (
    <h2
      className="text-[12px] font-bold tracking-[0.02em] mb-2.5"
      style={{ fontFamily: F, color: '#111', borderBottom: '1px solid #C9C9C9', paddingBottom: 5 }}
    >
      {children}
    </h2>
  )
}

export default function ResumePage() {
  const onDownload = () => window.print()

  return (
    <div className="min-h-screen" style={{ background: '#FFFCF3', color: '#111' }}>
      {/* Top nav */}
      <header className="no-print max-w-[1200px] mx-auto px-6 md:px-10 pt-7 pb-2 flex items-center justify-between gap-4">
        <a href="#" className="text-[12px] font-semibold tracking-[0.12em]" style={{ fontFamily: F }}>
          RDJVERSE
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[12px] tracking-[0.12em] transition-opacity hover:opacity-60"
              style={{
                fontFamily: F,
                fontWeight: n.label === 'RESUME' ? 700 : 400,
                textDecoration: n.label === 'RESUME' ? 'underline' : 'none',
                textUnderlineOffset: 4,
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a
            href="https://linkedin.com/in/rdjverse"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-[12px] tracking-[0.12em] transition-opacity hover:opacity-60"
            style={{ fontFamily: F }}
          >
            LINKEDIN
          </a>
          <button
            onClick={onDownload}
            className="px-6 py-2.5 rounded-full text-[12px] tracking-[0.06em] transition-opacity hover:opacity-85"
            style={{ fontFamily: F, background: '#111', color: '#FFFCF3', cursor: 'pointer' }}
          >
            Download Resume
          </button>
        </div>
      </header>

      {/* Sheet */}
      <main className="max-w-[880px] mx-auto px-4 md:px-6 pt-8 pb-24">
        <div
          className="resume-sheet rounded-xl px-7 py-9 md:px-11 md:py-11"
          style={{ background: '#FFFFFF', border: '1px solid #E3D5B8', boxShadow: '0 30px 80px -40px rgba(120,90,30,0.25)' }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="font-black tracking-tight leading-none" style={{ fontFamily: F, fontSize: 'clamp(1.5rem,4vw,2rem)' }}>
                {resume.name}
              </h1>
              <p className="mt-1.5 text-[10.5px] tracking-[0.04em]" style={{ fontFamily: F }}>
                <span className="font-bold">{resume.title}</span>
                <span style={{ color: '#555' }}> | My Portfolio: </span>
                <a href={resume.portfolioHref} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, fontWeight: 700 }}>
                  {resume.portfolio}
                </a>
              </p>
              <p className="mt-3 text-[11px] leading-[1.7]" style={{ fontFamily: F, color: '#333', maxWidth: '62ch' }}>
                {resume.summary}
              </p>
            </div>
            <div className="text-[10.5px] leading-[1.8] md:text-right shrink-0" style={{ fontFamily: F, color: '#333' }}>
              <p>
                <span className="font-bold">Email:</span> {resume.email}
              </p>
              <p>
                <span className="font-bold">Location:</span> {resume.location}
              </p>
              {resume.links.map((l) => (
                <p key={l.label}>
                  <span className="font-bold">{l.label}:</span>{' '}
                  <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: TEAL }}>
                    {l.href.replace('https://', '')}
                  </a>
                </p>
              ))}
            </div>
          </div>

          {/* Columns */}
          <div className="mt-7 grid md:grid-cols-[1.65fr_1fr] gap-8">
            {/* Left */}
            <div>
              <SectionHead>Work Experience</SectionHead>
              {resume.experience.map((job) => (
                <div key={job.org} className="mb-5">
                  <p className="text-[11px] font-bold" style={{ fontFamily: F, color: TEAL }}>
                    {job.org} <span className="font-normal" style={{ color: '#555' }}>| {job.meta}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] font-bold" style={{ fontFamily: F }}>
                    {job.role}
                  </p>
                  <ul className="mt-1.5 space-y-1.5 text-[10.5px] leading-[1.65]" style={{ fontFamily: F, color: '#333' }}>
                    {job.points.map((p, i) => (
                      <li key={i} className="flex gap-1.5">
                        <span aria-hidden="true">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mt-6">
                <SectionHead>Projects</SectionHead>
                {resume.projects.map((p) => (
                  <div key={p.name} className="mb-4">
                    <p className="text-[11px] font-bold" style={{ fontFamily: F, color: TEAL }}>
                      {p.name} <span className="font-normal" style={{ color: '#555' }}>| {p.tag}</span>
                    </p>
                    <ul className="mt-1 space-y-1 text-[10.5px] leading-[1.65]" style={{ fontFamily: F, color: '#333' }}>
                      {p.points.map((pt, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span aria-hidden="true">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <SectionHead>Skills</SectionHead>
              {resume.skills.map((g) => (
                <div key={g.group} className="mb-3.5">
                  <p className="text-[10.5px] font-bold" style={{ fontFamily: F }}>
                    {g.group}
                  </p>
                  <p className="mt-0.5 text-[10.5px] leading-[1.7]" style={{ fontFamily: F, color: '#333' }}>
                    • {g.items.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Page no. */}
          <p className="mt-8 text-right text-[10px]" style={{ fontFamily: F, color: '#999' }}>
            01
          </p>
        </div>
      </main>
    </div>
  )
}

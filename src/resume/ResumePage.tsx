import { resume } from './resume'
import cvPdf from '../assets/resume/RishavDas_CV.pdf'

const BLUE = '#1E6CB4'

function SectionHeading({ children }: { children: string }) {
  return (
    <h2
      className="text-[12.5px] md:text-[11px] font-bold tracking-[0.04em] uppercase mb-2.5 md:mb-2 flex items-center gap-2"
      style={{ color: BLUE, fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <span className="w-[2px] h-[12px] md:h-[11px] rounded-full shrink-0" style={{ background: '#8B5CF6' }} aria-hidden="true" />
      {children}
    </h2>
  )
}

function BulletList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-2 md:space-y-1.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2 text-[12.5px] md:text-[10.5px] leading-[1.65] md:leading-[1.65]" style={{ color }}>
          <span className="shrink-0 select-none" aria-hidden="true">
            •
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ResumePage({ darkMode = true }: { darkMode?: boolean }) {
  const BODY = darkMode ? '#F5F5F5' : '#1A1A1A'
  const MUTED = darkMode ? '#9CA3AF' : '#6B7280'
  const PAGE_BG = darkMode ? '#0A0A0A' : '#FFFFFF'
  const BORDER = darkMode ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)'

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: PAGE_BG }}>
      {/* Content — no white card, text adapts to theme, accounts for fixed FloatingNavbar */}
      <main className="max-w-[880px] mx-auto px-3 md:px-6 pt-24 md:pt-28 pb-10 md:pb-16">
        <div
          className="resume-sheet overflow-hidden transition-colors duration-300 rounded-[16px] md:rounded-[24px]"
          style={{ border: `1px solid ${BORDER}` }}
        >
          <div className="px-5 md:px-10 py-6 md:py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <h1
                  className="font-black tracking-[-0.02em] leading-none"
                  style={{
                    fontFamily: 'Georgia, Times New Roman, serif',
                    fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                    color: BODY,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {resume.name}
                </h1>
                <p
                  className="mt-2 text-[13.5px] md:text-[12.5px] font-medium"
                  style={{ color: BODY, fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {resume.title}
                </p>
              </div>

              <div
                className="text-[12px] md:text-[10px] leading-[1.7] md:text-right shrink-0"
                style={{ color: BODY, fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                <p className="font-semibold">{resume.location}</p>
                <p>{resume.phone}</p>
                <p>
                  <a
                    href={`mailto:${resume.email}`}
                    className="hover:underline hover:!text-[#8B5CF6] transition-colors"
                    style={{ color: BLUE }}
                  >
                    {resume.email}
                  </a>
                </p>
                <p className="font-semibold">
                  <a
                    href={resume.portfolioHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:!text-[#8B5CF6] transition-colors"
                    style={{ color: BODY }}
                  >
                    {resume.portfolio}
                  </a>
                  {' | '}
                  <a
                    href={resume.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:!text-[#8B5CF6] transition-colors"
                    style={{ color: BODY }}
                  >
                    GitHub
                  </a>
                  {' | '}
                  <a
                    href={resume.linkedinHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:!text-[#8B5CF6] transition-colors"
                    style={{ color: BODY }}
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-5 md:mt-6 h-px w-full" style={{ background: BORDER }} />

            {/* Two columns */}
            <div className="mt-6 md:mt-8 grid md:grid-cols-[1.7fr_0.95fr] gap-6 md:gap-10">
              {/* Left */}
              <div>
                <SectionHeading>Professional Summary</SectionHeading>
                <div className="mb-5 md:mb-5">
                  <BulletList items={resume.summary} color={BODY} />
                </div>

                <SectionHeading>Work Experience</SectionHeading>
                <div className="space-y-5 md:space-y-5 mb-1">
                  {((resume as any).experiences ?? [(resume as any).experience]).map((exp: any, idx: number) => (
                    <div key={idx}>
                      <p className="text-[12.5px] md:text-[11px] font-bold leading-tight" style={{ color: BODY }}>
                        {exp.org}
                      </p>
                      <p className="text-[11.5px] md:text-[10.5px] italic mt-1" style={{ color: MUTED }}>
                        / {exp.period} /
                      </p>
                      <div className="mt-2 md:mt-2">
                        <BulletList items={exp.points} color={BODY} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 md:mt-5">
                  <SectionHeading>Projects</SectionHeading>
                  <div className="space-y-4 md:space-y-4">
                    {resume.projects.map((p) => (
                      <div key={p.name}>
                        <p className="text-[12.5px] md:text-[11px] font-bold" style={{ color: BODY }}>
                          <span className="underline underline-offset-2" style={{ textDecorationColor: BODY }}>{p.name}</span>
                          <span className="font-normal"> - {p.tag}</span>
                        </p>
                        <div className="mt-1.5 md:mt-1.5">
                          <BulletList items={p.points} color={BODY} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                <SectionHeading>Skills</SectionHeading>
                <ul className="space-y-1.5 md:space-y-1 mb-6 md:mb-6">
                  {resume.skills.map((s) => (
                    <li key={s} className="flex gap-2 text-[12.5px] md:text-[10.5px] leading-[1.6]" style={{ color: BODY }}>
                      <span className="shrink-0" aria-hidden="true">
                        •
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

                <SectionHeading>Education</SectionHeading>
                <ul className="space-y-2.5 md:space-y-2.5 mb-6 md:mb-6">
                  {resume.education.map((e, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] md:text-[10.5px] leading-[1.55] md:leading-[1.55]" style={{ color: BODY }}>
                      <span className="shrink-0 mt-[1px]" aria-hidden="true">
                        •
                      </span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>

                <SectionHeading>Language</SectionHeading>
                <ul className="space-y-1.5 md:space-y-1">
                  {resume.languages.map((l) => (
                    <li key={l} className="flex gap-2 text-[12.5px] md:text-[10.5px] leading-[1.6]" style={{ color: BODY }}>
                      <span className="shrink-0" aria-hidden="true">
                        •
                      </span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only Download — additive, hidden on tablet/desktop */}
        <div className="mobile-resume-download mt-8 flex justify-center md:hidden">
          <a
            href={cvPdf}
            download="RishavDas_CV.pdf"
            aria-label="Download resume"
            className="group relative inline-flex items-center justify-center h-12 px-8 rounded-full font-display font-medium overflow-hidden border transition-colors duration-300 hover:border-white max-w-full"
            style={{
              borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)',
              color: darkMode ? '#F5F5F5' : '#1A1A1A',
            }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Download Resume</span>
            <span className="absolute inset-0 bg-[#8B5CF6] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" aria-hidden="true" />
          </a>
        </div>
      </main>
    </div>
  )
}

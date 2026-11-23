import { useState } from 'react'
import { WORK_EXPERIENCES, ORGANIZATION_EXPERIENCES, SKILL_GROUPS } from '../data'
import { BriefcaseIcon, LayersIcon } from './Icons'

export function AboutExperience() {
  const [activeTab, setActiveTab] = useState<'work' | 'organization'>('work')

  const currentExperiences =
    activeTab === 'work' ? WORK_EXPERIENCES : ORGANIZATION_EXPERIENCES

  return (
    <section id="about" className="relative py-24 px-5">
      {/* Top separator */}
      <div className="max-w-[1040px] mx-auto mb-16">
        <div
          className="h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          }}
        />
      </div>

      <div className="max-w-[1040px] mx-auto">
        {/* Section eyebrow */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3">
            About &amp; Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary leading-tight">
            Who I am &amp;{' '}
            <em className="font-serif italic font-normal">what I do.</em>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ──── LEFT: About + Skills ──── */}
          <div>
            {/* Bio card */}
            <div
              className="rounded-2xl p-6 md:p-7 mb-8"
              style={{
                background: '#131318',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <h3 className="text-base font-semibold text-text-primary mb-4">About</h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                I combine{' '}
                <span className="text-text-primary font-medium">Front-End Web Development</span>{' '}
                (React.js, TypeScript, HTML/CSS, Flutter) and{' '}
                <span className="text-text-primary font-medium">UI/UX Design</span>{' '}
                (Figma) to build digital products that are both technically sound and genuinely
                pleasant to use.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Alongside product work, I bring hands-on{' '}
                <span className="text-text-primary font-medium">Software Quality Assurance</span>{' '}
                experience — writing test cases, executing regression cycles, and catching bugs
                before they reach users.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                I also produce digital media — from short-form video and motion graphics to social
                content strategy — blending creative storytelling with data-driven optimisation.
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-6">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-secondary/50 mb-2.5">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ──── RIGHT: Experience with Segmented Switcher ──── */}
          <div>
            {/* Experience Header with Segmented Pill Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
              <h3 className="text-base font-semibold text-text-primary">Experience</h3>

              <div
                className="inline-flex p-1 rounded-xl border self-start sm:self-auto"
                style={{
                  background: 'rgba(19, 19, 24, 0.95)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                }}
                role="tablist"
                aria-label="Experience type toggle"
              >
                <button
                  role="tab"
                  aria-selected={activeTab === 'work'}
                  onClick={() => setActiveTab('work')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
                  style={{
                    background: activeTab === 'work' ? '#F4F4F6' : 'transparent',
                    color: activeTab === 'work' ? '#0B0B0E' : '#9A9AA6',
                    boxShadow:
                      activeTab === 'work' ? '0 2px 8px rgba(244, 244, 246, 0.15)' : 'none',
                  }}
                >
                  <BriefcaseIcon size={12} />
                  <span>Work Experience</span>
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full"
                    style={{
                      background: activeTab === 'work' ? '#0B0B0E' : 'rgba(255, 255, 255, 0.08)',
                      color: activeTab === 'work' ? '#F4F4F6' : 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {WORK_EXPERIENCES.length}
                  </span>
                </button>

                <button
                  role="tab"
                  aria-selected={activeTab === 'organization'}
                  onClick={() => setActiveTab('organization')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
                  style={{
                    background: activeTab === 'organization' ? '#F4F4F6' : 'transparent',
                    color: activeTab === 'organization' ? '#0B0B0E' : '#9A9AA6',
                    boxShadow:
                      activeTab === 'organization'
                        ? '0 2px 8px rgba(244, 244, 246, 0.15)'
                        : 'none',
                  }}
                >
                  <LayersIcon size={12} />
                  <span>Organization</span>
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full"
                    style={{
                      background:
                        activeTab === 'organization' ? '#0B0B0E' : 'rgba(255, 255, 255, 0.08)',
                      color:
                        activeTab === 'organization' ? '#F4F4F6' : 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {ORGANIZATION_EXPERIENCES.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Timeline cards */}
            <div className="relative animate-fade-in" key={activeTab}>
              {/* Vertical line */}
              <div
                className="absolute left-[11px] top-2 bottom-6 w-px"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.02))',
                }}
              />

              <div className="flex flex-col gap-0">
                {currentExperiences.map((exp, i) => (
                  <ExperienceCard
                    key={`${activeTab}-${i}`}
                    exp={exp}
                    isLast={i === currentExperiences.length - 1}
                    isOrganization={activeTab === 'organization'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ExperienceCardProps {
  exp: { role: string; company: string; period: string; bullets: string[] }
  isLast: boolean
  isOrganization?: boolean
}

function ExperienceCard({ exp, isLast, isOrganization = false }: ExperienceCardProps) {
  return (
    <div className={`relative pl-8 ${isLast ? 'pb-0' : 'pb-7'}`}>
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1 w-[23px] h-[23px] rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: '#131318',
          border: '1px solid rgba(255,255,255,0.14)',
          color: isOrganization ? '#38bdf8' : '#a78bfa',
        }}
      >
        {isOrganization ? <LayersIcon size={11} /> : <BriefcaseIcon size={11} />}
      </div>

      {/* Card */}
      <div
        className="rounded-xl p-5"
        style={{
          background: '#131318',
          border: '1px solid rgba(255,255,255,0.07)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = 'rgba(255,255,255,0.16)'
          el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.35)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = 'rgba(255,255,255,0.07)'
          el.style.boxShadow = 'none'
        }}
      >
        <span className="text-[11px] text-text-secondary/50 font-medium font-mono">
          {exp.period}
        </span>
        <h4 className="text-sm font-semibold text-text-primary mt-0.5 mb-0.5 leading-snug">
          {exp.role}
        </h4>
        <p className="text-xs text-text-secondary mb-3 font-medium text-sky-400/80">
          {exp.company}
        </p>
        <ul className="flex flex-col gap-1.5">
          {exp.bullets.map((b, j) => (
            <li
              key={j}
              className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed"
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: 'rgba(154,154,166,0.5)' }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


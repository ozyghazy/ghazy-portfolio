import { useState, useEffect, useCallback } from 'react'
import type { CaseStudy } from '../types'
import { isPlaceholder } from '../config'
import {
  XIcon,
  ExternalLinkIcon,
  FigmaIcon,
  GitHubIcon,
} from './Icons'

export interface CaseStudyModalProjectData {
  title: string
  subtitle?: string
  year?: string
  tags: string[]
  accentColor: string
  glowColor: string
  documentation?: string[]
  caseStudy: CaseStudy
}

interface CaseStudyModalProps {
  project: CaseStudyModalProjectData
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const { caseStudy } = project
  const [activeZoomImage, setActiveZoomImage] = useState<string | null>(null)
  const docs = project.documentation || caseStudy.documentation || []

  // Esc to close (first closes zoomed image, then modal)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeZoomImage) {
          setActiveZoomImage(null)
        } else {
          onClose()
        }
      }
    },
    [activeZoomImage, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const showDemo = !isPlaceholder(caseStudy.demoUrl)
  const showFigma = !isPlaceholder(caseStudy.figmaUrl)
  const showRepo = !isPlaceholder(caseStudy.repoUrl)
  const hasLinks = showDemo || showFigma || showRepo

  return (
    <>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
      >
        {/* ── Modal panel ── */}
        <div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{
            background: '#131318',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Accent glow at the top */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: 2,
              background: `linear-gradient(90deg, transparent, ${project.glowColor}, transparent)`,
              borderRadius: '0 0 4px 4px',
              zIndex: 1,
            }}
          />

          {/* ── Sticky header ── */}
          <div
            className="sticky top-0 z-10 flex items-start justify-between px-6 pt-5 pb-4"
            style={{
              background: 'rgba(19,19,24,0.97)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="min-w-0 flex-1 pr-4">
              <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                {project.tags.slice(0, 4).map((t) => (
                  <span key={t} className="tag-pill text-[10px]">
                    {t}
                  </span>
                ))}
                {project.year && (
                  <span className="text-xs text-text-secondary/40 font-mono">{project.year}</span>
                )}
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-text-primary leading-tight">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="text-xs text-text-secondary mt-0.5">{project.subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all mt-0.5"
              aria-label="Close case study"
            >
              <XIcon size={18} />
            </button>
          </div>

          {/* ── Body ── */}
          <div className="px-6 py-7 flex flex-col gap-8">
            {/* Overview */}
            <ModalSection title="Overview">
              <p className="text-text-secondary leading-relaxed text-sm">{caseStudy.overview}</p>
            </ModalSection>

            {/* Role */}
            <ModalSection title="My Role & Ownership">
              <p className="text-text-secondary leading-relaxed text-sm">{caseStudy.role}</p>
            </ModalSection>

            {/* Project Documentation Gallery */}
            {docs.length > 0 && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary/60 mb-3.5">
                  Project Documentation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {docs.map((imgSrc, idx) => (
                    <DocumentationImageCard
                      key={idx}
                      src={imgSrc}
                      alt={`${project.title} documentation ${idx + 1}`}
                      onZoom={() => setActiveZoomImage(imgSrc)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Action buttons */}
            {hasLinks && (
              <div className="flex flex-wrap gap-2 pt-1">
                {showDemo && (
                  <ModalActionButton href={caseStudy.demoUrl} icon={<ExternalLinkIcon size={13} />}>
                    Live Demo
                  </ModalActionButton>
                )}
                {showFigma && (
                  <ModalActionButton href={caseStudy.figmaUrl} icon={<FigmaIcon size={13} />}>
                    Figma / Design
                  </ModalActionButton>
                )}
                {showRepo && (
                  <ModalActionButton href={caseStudy.repoUrl} icon={<GitHubIcon size={13} />}>
                    GitHub / Drive
                  </ModalActionButton>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Zoom View for Documentation Image */}
      {activeZoomImage && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 animate-fade-in"
          style={{ background: 'rgba(0, 0, 0, 0.92)', backdropFilter: 'blur(16px)' }}
          onClick={() => setActiveZoomImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Documentation full preview"
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveZoomImage(null)}
              className="absolute -top-10 right-0 sm:top-2 sm:right-2 z-10 p-2 rounded-full bg-black/60 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/10"
              aria-label="Close zoomed image"
            >
              <XIcon size={18} />
            </button>

            <img
              src={activeZoomImage}
              alt="Project documentation preview"
              className="max-h-[85vh] w-auto max-w-full object-contain rounded-xl border border-white/15 shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}

interface DocumentationImageCardProps {
  src: string
  alt: string
  onZoom: () => void
}

function DocumentationImageCard({ src, alt, onZoom }: DocumentationImageCardProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <div
      onClick={onZoom}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onZoom()
      }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#131318] aspect-video transition-all duration-300 hover:border-white/25 focus:outline-none focus:ring-1 focus:ring-white/30"
      aria-label={`Zoom ${alt}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center bg-white/[0.02]">
          <span className="text-[11px] font-mono text-text-secondary/50">Image Preview</span>
        </div>
      )}

      {/* Subtle hover overlay hint */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
        <span className="text-[10px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-lg">
          Click to Zoom ↗
        </span>
      </div>
    </div>
  )
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary/60 mb-3">
        {title}
      </h3>
      {children}
    </section>
  )
}

function ModalActionButton({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-secondary text-xs px-4 py-2 gap-1.5"
    >
      {icon}
      {children}
    </a>
  )
}

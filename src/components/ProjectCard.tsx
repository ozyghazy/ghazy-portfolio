import { useState, useMemo } from 'react'
import type {
  Project,
  SocialMediaItem,
  FeaturedPosterItem,
  InstagramFeedItem,
  DesignShowcaseItem,
  ProjectCategory,
} from '../types'
import {
  UNIVERSITY_PROJECTS,
  QA_TESTING_PROJECTS,
  SOCIAL_MEDIA_ITEMS,
  FEATURED_POSTERS,
  INSTAGRAM_FEED_ITEMS,
} from '../data'
import { getInstagramReelShortcode, getInstagramPostShortcode } from '../config'
import { BrowserFrame, PreviewFrame } from './BrowserFrame'
import { CaseStudyModal } from './CaseStudyModal'
import { DesignPreviewModal } from './DesignPreviewModal'
import { PosterLightboxModal } from './PosterLightboxModal'
import {
  ArrowUpRightIcon,
  EyeIcon,
  LayersIcon,
  SparkleIcon,
  ShieldCheckIcon,
  InstagramIcon,
} from './Icons'

// ─────────────────────────────────────────────────────────────
// 1. University & QA Project Card (Wide macOS Browser Frame)
// ─────────────────────────────────────────────────────────────

interface ProjectBrowserCardProps {
  project: Project
  index: number
  featured?: boolean
  badgeLabel?: string
  customPreviewType?: 'qa-financial' | 'qa-suite' | 'default'
}

export function ProjectBrowserCard({
  project,
  index,
  featured = false,
  badgeLabel,
  customPreviewType = 'default',
}: ProjectBrowserCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  const open = () => setModalOpen(true)

  return (
    <>
      <article
        className="relative cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={open}
        tabIndex={0}
        role="button"
        aria-label={`Open ${project.title} case study`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') open()
        }}
      >
        {/* Ambient glow behind card */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-20px -10px',
            background: `radial-gradient(ellipse at 50% 20%, ${project.glowColor} 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0.3,
            filter: 'blur(28px)',
            transition: 'opacity 0.4s ease',
            zIndex: 0,
            pointerEvents: 'none',
            borderRadius: '20px',
          }}
        />

        {/* Browser frame */}
        <div
          className="relative z-10"
          style={{
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <BrowserFrame title={`${project.title.toLowerCase().replace(/\s+/g, '-')}.project`}>
            {/* Preview visual */}
            <div
              style={{
                transform: hovered ? 'scale(1.015)' : 'scale(1)',
                transition: 'transform 0.35s ease',
                transformOrigin: 'top center',
              }}
            >
              <PreviewFrame
                accentColor={project.accentColor}
                glowColor={project.glowColor}
                label={project.title}
                index={index}
                customType={customPreviewType}
              />
            </div>

            {/* Card info */}
            <div className="p-6 md:p-7">
              {/* Meta row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs text-text-secondary font-medium">
                      {project.subtitle}
                    </span>
                    <span className="text-text-secondary/30 text-xs">·</span>
                    <span className="text-xs text-text-secondary/60">{project.year}</span>
                    {(featured || badgeLabel) && (
                      <>
                        <span className="text-text-secondary/30 text-xs">·</span>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: project.accentColor,
                            border: `1px solid ${project.glowColor}`,
                            color: 'rgba(255,255,255,0.85)',
                          }}
                        >
                          {badgeLabel || (featured ? 'Flagship' : '')}
                        </span>
                      </>
                    )}
                  </div>
                  <h3
                    className={`font-semibold text-text-primary ${featured ? 'text-2xl' : 'text-xl'}`}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Arrow button */}
                <div
                  className="flex-shrink-0 p-2 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: hovered ? project.accentColor : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${hovered ? project.glowColor : 'rgba(255,255,255,0.08)'}`,
                    color: hovered ? '#fff' : '#9A9AA6',
                    transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
                  }}
                >
                  <ArrowUpRightIcon size={16} />
                </div>
              </div>

              {/* Context */}
              <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-2">
                {project.context}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Click hint */}
              <p
                className="text-xs mt-4 transition-opacity duration-200 flex items-center gap-1.5"
                style={{ color: 'rgba(154,154,166,0.4)', opacity: hovered ? 1 : 0 }}
              >
                <span>Click to read full case study &amp; QA metrics →</span>
              </p>
            </div>
          </BrowserFrame>
        </div>
      </article>

      {modalOpen && <CaseStudyModal project={project} onClose={() => setModalOpen(false)} />}
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// 2. Social Media Content Card (Live Instagram Reel Embed in Card)
// ─────────────────────────────────────────────────────────────

interface SocialMediaCardProps {
  item: SocialMediaItem
}

function SocialMediaCard({ item }: SocialMediaCardProps) {
  const [hovered, setHovered] = useState(false)
  const shortcode = getInstagramReelShortcode(item.externalUrl)

  // Badge label calculation: show formatted number if > 0, otherwise custom label
  const displayViewsBadge =
    item.viewsCount > 0
      ? `${item.viewsCount >= 1000000 ? (item.viewsCount / 1000000).toFixed(1) + 'M' : item.viewsCount.toLocaleString()} Views`
      : item.viewsLabel

  return (
    <article
      className="relative group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#131318',
        borderColor: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)'
          : '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Ambient glow behind card */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-10px',
          background: `radial-gradient(circle at 50% 25%, ${item.glowColor} 0%, transparent 68%)`,
          opacity: hovered ? 0.8 : 0.2,
          filter: 'blur(24px)',
          transition: 'opacity 0.35s ease',
          zIndex: 0,
          borderRadius: '24px',
          pointerEvents: 'none',
        }}
      />

      {/* ── 1. Live Instagram Reel Embed Frame (aspect-[9/16]) ── */}
      <div
        className="relative z-10 w-full aspect-[9/16] overflow-hidden bg-black/80 border-b border-white/5"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {shortcode ? (
          <iframe
            src={`https://www.instagram.com/reel/${shortcode}/embed/`}
            className="w-full h-full border-0"
            title={item.title}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-text-secondary">
            <InstagramIcon size={32} />
            <span className="text-xs mt-2 font-medium">{item.title}</span>
          </div>
        )}
      </div>

      {/* ── 2. Card Info Cleanly Positioned Below Embedded Frame ── */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-[#131318]">
        <div>
          {/* Header Row: Platform Tag & Views Count Badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/80 flex items-center gap-1.5">
              <InstagramIcon size={12} />
              {item.category || item.platform}
            </span>

            {/* Views Badge */}
            <span
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm"
              style={{
                background: item.accentColor,
                border: `1px solid ${item.glowColor}`,
                color: '#fff',
                boxShadow: `0 0 12px ${item.glowColor}`,
              }}
            >
              <EyeIcon size={11} />
              {displayViewsBadge}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2 mb-1 group-hover:text-white transition-colors">
            {item.title}
          </h3>

          {/* Notes */}
          <p className="text-xs text-text-secondary/80 line-clamp-2 leading-relaxed">
            {item.notes}
          </p>
        </div>

        {/* Action Button: Watch Reel on Instagram */}
        <div className="pt-1">
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-2 px-3 rounded-xl w-full justify-center gap-2 font-medium transition-all"
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.12)',
              color: '#F4F4F6',
            }}
          >
            <InstagramIcon size={13} />
            <span>Watch Reel</span>
            <ArrowUpRightIcon size={12} />
          </a>
        </div>
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────
// 3. Featured Poster Card (Crisp Local Image with Lightbox Zoom)
// ─────────────────────────────────────────────────────────────

interface FeaturedPosterCardProps {
  poster: FeaturedPosterItem
}

function FeaturedPosterCard({ poster }: FeaturedPosterCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const open = () => setModalOpen(true)

  return (
    <>
      <article
        className="relative group cursor-pointer flex flex-col rounded-2xl overflow-hidden border transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={open}
        tabIndex={0}
        role="button"
        aria-label={`Open ${poster.title} preview`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') open()
        }}
        style={{
          background: '#131318',
          borderColor: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)'
            : '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        {/* Ambient glow behind card */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-10px',
            background: `radial-gradient(circle at 50% 30%, ${poster.glowColor || 'rgba(139,92,246,0.3)'} 0%, transparent 68%)`,
            opacity: hovered ? 0.75 : 0.2,
            filter: 'blur(24px)',
            transition: 'opacity 0.35s ease',
            zIndex: 0,
            borderRadius: '24px',
            pointerEvents: 'none',
          }}
        />

        {/* Card Header Titlebar */}
        <div
          className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b"
          style={{
            borderColor: 'rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.025)',
          }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/70 truncate pr-2">
            {poster.category}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: poster.glowColor || '#38bdf8' }}
          />
        </div>

        {/* Poster Visual Frame with subtle hover zoom */}
        <div className="relative z-10 w-full aspect-[3/4] overflow-hidden bg-black/80 flex items-center justify-center">
          {!imgError ? (
            <img
              src={poster.imageUrl}
              alt={poster.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out"
              style={{
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
              }}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <LayersIcon size={32} className="text-text-secondary/60 mb-2" />
              <span className="text-xs text-text-secondary">{poster.title}</span>
            </div>
          )}

          {/* Hover inspect pill overlay */}
          <div
            className="absolute bottom-3 right-3 z-20 transition-opacity duration-200"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <span
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-lg"
              style={{
                background: 'rgba(244,244,246,0.95)',
                color: '#0B0B0E',
              }}
            >
              Zoom Poster
              <ArrowUpRightIcon size={10} />
            </span>
          </div>

          {/* Bottom subtle gradient on image */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(19,19,24,0.7))',
            }}
          />
        </div>

        {/* Bottom Card Summary */}
        <div className="relative z-10 p-4 pt-3.5 border-t border-white/5 flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-sm font-semibold text-text-primary line-clamp-1 mb-1 group-hover:text-white transition-colors">
              {poster.title}
            </h3>
            {poster.notes && (
              <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                {poster.notes}
              </p>
            )}
          </div>
        </div>
      </article>

      {modalOpen && <PosterLightboxModal poster={poster} onClose={() => setModalOpen(false)} />}
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// 4. Instagram Feed & Carousel Card (Live Embed in Card)
// ─────────────────────────────────────────────────────────────

interface InstagramFeedCardProps {
  item: InstagramFeedItem
}

function InstagramFeedCard({ item }: InstagramFeedCardProps) {
  const [hovered, setHovered] = useState(false)
  const shortcode = item.shortcode || getInstagramPostShortcode(item.externalUrl)

  return (
    <article
      className="relative group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#131318',
        borderColor: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)'
          : '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Ambient glow behind card */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-10px',
          background: `radial-gradient(circle at 50% 25%, ${item.glowColor || 'rgba(139,92,246,0.3)'} 0%, transparent 68%)`,
          opacity: hovered ? 0.75 : 0.2,
          filter: 'blur(24px)',
          transition: 'opacity 0.35s ease',
          zIndex: 0,
          borderRadius: '24px',
          pointerEvents: 'none',
        }}
      />

      {/* ── 1. Live Instagram Post/Carousel Embed Frame ── */}
      <div
        className="relative z-10 w-full min-h-[440px] sm:min-h-[460px] h-[460px] overflow-hidden bg-black/80 border-b border-white/5"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {shortcode ? (
          <iframe
            src={`https://www.instagram.com/p/${shortcode}/embed/`}
            className="w-full h-full border-0"
            title={item.title}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-text-secondary">
            <InstagramIcon size={32} />
            <span className="text-xs mt-2 font-medium">{item.title}</span>
          </div>
        )}
      </div>

      {/* ── 2. Card Bottom Info & Action Panel ── */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/70 flex items-center gap-1.5">
              <InstagramIcon size={11} className="text-pink-400" />
              {item.category || 'Instagram Feed'}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-text-primary line-clamp-1 mb-1">
            {item.title}
          </h3>
          {item.notes && (
            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-3">
              {item.notes}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-white/5">
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.1)',
              color: '#F4F4F6',
            }}
          >
            <InstagramIcon size={13} />
            <span>Open Post</span>
            <ArrowUpRightIcon size={12} />
          </a>
        </div>
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────
// 5. Conceptual Design Showcase Card (Legacy)
// ─────────────────────────────────────────────────────────────

interface DesignCardProps {
  item: DesignShowcaseItem
}

export function DesignCard({ item }: DesignCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  const open = () => setModalOpen(true)

  return (
    <>
      <article
        className="relative group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={open}
        tabIndex={0}
        role="button"
        aria-label={`Open ${item.title} preview`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') open()
        }}
      >
        {/* Ambient glow behind card */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-10px',
            background: `radial-gradient(circle at 50% 40%, ${item.glowColor} 0%, transparent 65%)`,
            opacity: hovered ? 0.7 : 0.2,
            filter: 'blur(24px)',
            transition: 'opacity 0.35s ease',
            zIndex: 0,
            borderRadius: '20px',
            pointerEvents: 'none',
          }}
        />

        {/* Card Frame */}
        <div
          className="relative z-10 rounded-2xl overflow-hidden border transition-all duration-300"
          style={{
            background: '#131318',
            borderColor: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
            boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Top Titlebar */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b"
            style={{
              borderColor: 'rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/70">
              {item.format}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.glowColor }} />
              <span className="text-[10px] text-text-secondary/50 font-mono">{item.year}</span>
            </div>
          </div>

          {/* Visual Artwork Box with subtle hover zoom */}
          <div
            className={`relative w-full ${item.aspectRatio} overflow-hidden flex flex-col justify-between p-5`}
            style={{
              background: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.04) 0%, rgba(9,9,12,0.98) 100%)',
            }}
          >
            {/* Inner background illustration */}
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out flex items-center justify-center p-6"
              style={{
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <div
                className="w-full h-full rounded-xl flex flex-col items-center justify-center p-4 border border-white/10 text-center"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: item.accentColor, border: `1px solid ${item.glowColor}` }}
                >
                  <LayersIcon size={18} />
                </div>
                <h4 className="text-sm font-bold text-text-primary/90 px-2 line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[10px] text-text-secondary/60 mt-2 line-clamp-2 max-w-[200px]">
                  {item.concept}
                </p>
              </div>
            </div>

            {/* Click to inspect overlay indicator */}
            <div
              className="absolute bottom-3 right-3 z-10 transition-opacity duration-200"
              style={{ opacity: hovered ? 1 : 0 }}
            >
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-lg"
                style={{
                  background: 'rgba(244,244,246,0.95)',
                  color: '#0B0B0E',
                }}
              >
                Inspect Artwork
                <ArrowUpRightIcon size={10} />
              </span>
            </div>
          </div>

          {/* Bottom Card Summary */}
          <div className="p-4 pt-3.5 border-t border-white/5">
            <h3 className="text-sm font-semibold text-text-primary mb-1 line-clamp-1 group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-3">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tools.map((tool) => (
                <span key={tool} className="tag-pill text-[10px] px-2 py-0.5">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {modalOpen && <DesignPreviewModal item={item} onClose={() => setModalOpen(false)} />}
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// Main WorksSection with Category Tabs (including QA & Testing)
// ─────────────────────────────────────────────────────────────

interface CategoryTabConfig {
  id: ProjectCategory
  label: string
  count: number
  description: string
  icon?: React.ReactNode
}

export function WorksSection() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('university')

  // Automatic sorting by view count from highest to lowest
  const sortedSocialMediaItems = useMemo(() => {
    return [...SOCIAL_MEDIA_ITEMS].sort((a, b) => {
      if (b.viewsCount !== a.viewsCount) {
        return b.viewsCount - a.viewsCount
      }
      return 0
    })
  }, [])

  const TABS: CategoryTabConfig[] = [
    {
      id: 'university',
      label: 'University Project',
      count: UNIVERSITY_PROJECTS.length,
      description: 'Full-stack & UI/UX product systems built for academic and real-world deployment.',
    },
    {
      id: 'qa-testing',
      label: 'QA & Testing',
      count: QA_TESTING_PROJECTS.length,
      description: 'End-to-end manual test matrices, JIRA bug management, regression cycles, and usability audits.',
      icon: <ShieldCheckIcon size={12} />,
    },
    {
      id: 'social-media',
      label: 'Social Media Content',
      count: SOCIAL_MEDIA_ITEMS.length,
      description: 'Live Instagram Reel player embeds with auto view-count sorting and direct reel access.',
    },
    {
      id: 'poster-feed',
      label: 'Designed Poster and Feed',
      count: FEATURED_POSTERS.length + INSTAGRAM_FEED_ITEMS.length,
      description: '5 featured local posters and 16 Instagram feed & carousel embeds.',
    },
  ]

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0]

  return (
    <section id="work" className="relative py-24 px-5">
      {/* Top separator */}
      <div className="max-w-[1040px] mx-auto mb-16">
        <div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
        />
      </div>

      <div className="max-w-[1040px] mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3 flex items-center gap-2">
            Selected Works
            <SparkleIcon size={12} />
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary leading-tight">
            Projects I've built, <em className="font-serif italic font-normal">tested</em> &amp; designed.
          </h2>
          <p className="text-text-secondary mt-3 text-sm max-w-xl">
            Explore my work across software development, software quality assurance, short-form Instagram Reels, and graphic design.
          </p>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="mb-10">
          <div
            className="inline-flex p-1 rounded-2xl border flex-wrap gap-1 max-w-full"
            style={{
              background: 'rgba(19, 19, 24, 0.9)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
            }}
            role="tablist"
            aria-label="Portfolio category filter"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2"
                  style={{
                    background: isActive ? '#F4F4F6' : 'transparent',
                    color: isActive ? '#0B0B0E' : '#9A9AA6',
                    boxShadow: isActive ? '0 4px 16px rgba(244, 244, 246, 0.15)' : 'none',
                  }}
                >
                  {tab.icon && (
                    <span className={isActive ? 'text-sky-600' : 'text-sky-400'}>{tab.icon}</span>
                  )}
                  <span>{tab.label}</span>
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? '#0B0B0E' : 'rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#F4F4F6' : 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Subtitle helper description */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
            <p className="text-xs text-text-secondary/70 font-medium">
              {currentTab.description}
            </p>
            {activeTab === 'social-media' && (
              <span className="text-[10px] font-mono text-text-secondary/50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Sorted by view count (Highest to Lowest)
              </span>
            )}
          </div>
        </div>

        {/* ── Tab Panels ── */}

        {/* 1. University Project Layout (macOS Browser Frame Stack) */}
        {activeTab === 'university' && (
          <div
            id="panel-university"
            role="tabpanel"
            aria-labelledby="tab-university"
            className="flex flex-col gap-10 animate-fade-in"
          >
            {UNIVERSITY_PROJECTS.map((project, i) => (
              <div key={project.id} className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <span className="text-xs text-text-secondary/40 font-mono font-medium tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                    {i === 0 ? ' — Flagship' : ''}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
                <ProjectBrowserCard project={project} index={i} featured={i === 0} />
              </div>
            ))}
          </div>
        )}

        {/* 2. QA & Testing Layout (Dedicated JurnalKas & QA Suite in macOS Browser Frame) */}
        {activeTab === 'qa-testing' && (
          <div
            id="panel-qa-testing"
            role="tabpanel"
            aria-labelledby="tab-qa-testing"
            className="flex flex-col gap-10 animate-fade-in"
          >
            {QA_TESTING_PROJECTS.map((project, i) => (
              <div key={project.id} className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <span className="text-xs text-text-secondary/40 font-mono font-medium tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                    {i === 0 ? ' — Flagship Internship' : ''}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
                <ProjectBrowserCard
                  project={project}
                  index={i}
                  featured={i === 0}
                  badgeLabel={i === 0 ? 'Featured QA Internship' : 'QA Suite'}
                  customPreviewType={i === 0 ? 'qa-financial' : 'qa-suite'}
                />
              </div>
            ))}
          </div>
        )}

        {/* 3. Social Media Content Layout (12 Live Instagram Reel Embeds with auto-sort) */}
        {activeTab === 'social-media' && (
          <div
            id="panel-social-media"
            role="tabpanel"
            aria-labelledby="tab-social-media"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in"
          >
            {sortedSocialMediaItems.map((item) => (
              <SocialMediaCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* 4. Designed Poster and Feed Layout (Sub-section A Posters + Sub-section B Feeds) */}
        {activeTab === 'poster-feed' && (
          <div
            id="panel-poster-feed"
            role="tabpanel"
            aria-labelledby="tab-poster-feed"
            className="flex flex-col gap-14 animate-fade-in"
          >
            {/* ── Sub-section A: Featured Posters (5 Local Image Cards) ── */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400 font-mono">
                      Sub-section A
                    </span>
                    <span className="text-text-secondary/40">•</span>
                    <h3 className="text-xl font-semibold text-text-primary">Featured Posters</h3>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                      {FEATURED_POSTERS.length} Posters
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Crisp vertical poster cards with subtle hover zoom and click-to-zoom Lightbox inspection.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURED_POSTERS.map((poster) => (
                  <FeaturedPosterCard key={poster.id} poster={poster} />
                ))}
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="relative py-2">
              <div
                className="h-px w-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                }}
              />
            </div>

            {/* ── Sub-section B: Instagram Feeds & Carousels (16 Live Embed Cards) ── */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 font-mono">
                      Sub-section B
                    </span>
                    <span className="text-text-secondary/40">•</span>
                    <h3 className="text-xl font-semibold text-text-primary">
                      Instagram Feeds &amp; Carousels
                    </h3>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                      {INSTAGRAM_FEED_ITEMS.length} Posts
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Live interactive Instagram embeds rendering directly on cards with title badges and external post links.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {INSTAGRAM_FEED_ITEMS.map((item) => (
                  <InstagramFeedCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Backwards compatibility export
export const ProjectCard = ProjectBrowserCard
export const UniversityProjectCard = ProjectBrowserCard

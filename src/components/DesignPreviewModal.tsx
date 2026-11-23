import { useEffect, useCallback } from 'react'
import type { DesignShowcaseItem } from '../types'
import { isPlaceholder } from '../config'
import { XIcon, FigmaIcon, ExternalLinkIcon, LayersIcon } from './Icons'

interface DesignPreviewModalProps {
  item: DesignShowcaseItem
  onClose: () => void
}

export function DesignPreviewModal({ item, onClose }: DesignPreviewModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const showFigma = !isPlaceholder(item.figmaUrl)

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} design preview`}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl"
        style={{
          background: '#131318',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent glow line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: 2,
            background: `linear-gradient(90deg, transparent, ${item.glowColor}, transparent)`,
            borderRadius: '0 0 4px 4px',
            zIndex: 1,
          }}
        />

        {/* Modal Header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between px-6 pt-5 pb-4"
          style={{
            background: 'rgba(19,19,24,0.96)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="min-w-0 flex-1 pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: item.accentColor,
                  border: `1px solid ${item.glowColor}`,
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                {item.format}
              </span>
              <span className="text-xs text-text-secondary/40 font-mono">{item.year}</span>
            </div>
            <h2 className="text-xl font-semibold text-text-primary leading-tight">{item.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all mt-0.5"
            aria-label="Close design preview"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Main Visual Artwork Canvas */}
          <div
            className="relative w-full rounded-xl overflow-hidden flex items-center justify-center p-6 md:p-10 border border-white/10"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.03) 0%, rgba(10,10,13,0.95) 100%)',
            }}
          >
            {/* Ambient backlight glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 65%)`,
                opacity: 0.35,
                filter: 'blur(36px)',
              }}
            />

            {/* Poster / Feed preview canvas */}
            <div
              className={`relative z-10 w-full max-w-sm ${item.aspectRatio} rounded-lg shadow-2xl overflow-hidden flex flex-col justify-between p-5 border border-white/15`}
              style={{
                background: '#0D0D11',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Inner graphic composition */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-text-secondary/70">
                  {item.format}
                </span>
                <span className="w-2 h-2 rounded-full" style={{ background: item.glowColor }} />
              </div>

              <div className="my-auto py-6 flex flex-col items-center text-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1"
                  style={{ background: item.accentColor, border: `1px solid ${item.glowColor}` }}
                >
                  <LayersIcon size={24} />
                </div>
                <h3 className="text-base font-bold text-text-primary px-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary/70 max-w-xs leading-relaxed line-clamp-3">
                  {item.concept}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-text-secondary/50 font-mono">
                <span>Ghazy R. Haq</span>
                <span>{item.tools[0]}</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-secondary/60 mb-2">
                Overview & Purpose
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-secondary/60 mb-2">
                Design Concept & Layout
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">{item.concept}</p>
            </div>
          </div>

          {/* Tools & Links */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <div>
              <span className="text-xs text-text-secondary/50 block mb-1.5 font-medium">Tools & Focus</span>
              <div className="flex flex-wrap gap-1.5">
                {item.tools.map((t) => (
                  <span key={t} className="skill-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {showFigma && (
              <a
                href={item.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs px-4 py-2 self-start sm:self-auto gap-1.5"
              >
                <FigmaIcon size={14} />
                Inspect in Figma
                <ExternalLinkIcon size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

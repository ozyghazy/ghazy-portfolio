import { useEffect, useCallback } from 'react'
import type { FeaturedPosterItem } from '../types'
import { XIcon, ExternalLinkIcon, SparkleIcon } from './Icons'

interface PosterLightboxModalProps {
  poster: FeaturedPosterItem
  onClose: () => void
}

export function PosterLightboxModal({ poster, onClose }: PosterLightboxModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fade-in"
      style={{ background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${poster.title} Lightbox`}
    >
      <div
        className="relative flex flex-col items-center max-w-4xl w-full max-h-[94vh] rounded-2xl overflow-hidden"
        style={{
          background: '#131318',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div
          className="w-full flex items-center justify-between px-5 py-3.5 border-b"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.08)',
            background: 'rgba(255, 255, 255, 0.03)',
          }}
        >
          <div className="flex flex-col min-w-0 pr-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/70 flex items-center gap-1.5">
              <SparkleIcon size={10} />
              {poster.category}
            </span>
            <h3 className="text-base font-semibold text-text-primary truncate mt-0.5">
              {poster.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={poster.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <span>View Full Resolution</span>
              <ExternalLinkIcon size={12} />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <XIcon size={18} />
            </button>
          </div>
        </div>

        {/* Center Canvas with Poster */}
        <div
          className="relative w-full flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-black/60"
          style={{
            minHeight: '340px',
            maxHeight: 'calc(94vh - 120px)',
          }}
        >
          {/* Ambient backlight glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '320px',
              height: '320px',
              background: `radial-gradient(circle, ${poster.glowColor || 'rgba(139,92,246,0.3)'} 0%, transparent 70%)`,
              filter: 'blur(45px)',
              opacity: 0.5,
            }}
            aria-hidden="true"
          />

          <img
            src={poster.imageUrl}
            alt={poster.title}
            className="relative z-10 max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            onError={(e) => {
              const target = e.currentTarget
              if (!target.src.endsWith('poster-bukber.png')) {
                target.src = '/poster-bukber.png'
              }
            }}
          />
        </div>

        {/* Bottom Details Footer */}
        {poster.notes && (
          <div
            className="w-full px-5 py-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
              background: 'rgba(19, 19, 24, 0.95)',
            }}
          >
            <p className="text-xs text-text-secondary leading-relaxed">
              {poster.notes}
            </p>
            <a
              href={poster.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center gap-1 text-xs text-sky-400 font-medium"
            >
              <span>Full resolution</span>
              <ExternalLinkIcon size={11} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

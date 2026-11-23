import { useEffect, useCallback } from 'react'
import type { SocialMediaItem } from '../types'
import { getInstagramReelShortcode } from '../config'
import { XIcon, InstagramIcon, ArrowUpRightIcon, EyeIcon } from './Icons'

interface ReelModalProps {
  item: SocialMediaItem
  onClose: () => void
}

export function ReelModal({ item, onClose }: ReelModalProps) {
  const shortcode = getInstagramReelShortcode(item.externalUrl)

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

  const displayViewsBadge =
    item.viewsCount > 0
      ? `${item.viewsCount >= 1000000 ? (item.viewsCount / 1000000).toFixed(1) + 'M' : item.viewsCount.toLocaleString()} Views`
      : item.viewsLabel

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} video player`}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl flex flex-col"
        style={{
          background: '#131318',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
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
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 border-b"
          style={{
            background: 'rgba(19,19,24,0.96)',
            borderColor: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-4">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <InstagramIcon size={14} />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-text-primary truncate">{item.title}</h2>
              <span className="text-[11px] text-text-secondary/60">
                {item.platform} • {displayViewsBadge}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Modal Content Split: Video Player + Editorial Details */}
        <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column: Instagram 9:16 Live Embed Frame */}
          <div className="md:col-span-6 flex justify-center w-full">
            <div
              className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center"
              style={{
                background: '#0a0a0d',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              {shortcode ? (
                <iframe
                  src={`https://www.instagram.com/reel/${shortcode}/embed/`}
                  className="w-full h-full border-0"
                  title={item.title}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                />
              ) : (
                <div className="p-6 text-center flex flex-col items-center gap-3">
                  <InstagramIcon size={32} />
                  <p className="text-xs text-text-secondary">Shortcode not detected</p>
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs"
                  >
                    Open Directly on Instagram
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Video Overview & Production Notes */}
          <div className="md:col-span-6 flex flex-col gap-5">
            {/* Meta tags row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                style={{
                  background: item.accentColor,
                  border: `1px solid ${item.glowColor}`,
                  color: '#fff',
                }}
              >
                <EyeIcon size={12} />
                {displayViewsBadge}
              </span>

              {item.category && (
                <span className="tag-pill text-xs px-2.5 py-1">
                  {item.category}
                </span>
              )}

              {item.duration && (
                <span className="text-xs text-text-secondary/50 font-mono">
                  {item.duration}
                </span>
              )}
            </div>

            {/* Title & Hook */}
            <div>
              <h1 className="text-xl font-bold text-text-primary leading-snug mb-2">
                {item.title}
              </h1>
              {item.hookText && (
                <blockquote
                  className="p-3 rounded-xl border border-white/10 text-xs italic font-serif text-text-primary/90 leading-relaxed"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {item.hookText}
                </blockquote>
              )}
            </div>

            {/* Editing Notes Card */}
            <div
              className="p-4 rounded-xl border flex flex-col gap-1.5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                borderColor: 'rgba(255,255,255,0.07)',
              }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary/60">
                Production &amp; Editing Notes
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                {item.notes}
              </p>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary/50 block mb-2">
                  Key Editing Techniques
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-pill text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs justify-center py-2.5 px-4 gap-2 font-semibold flex-1"
              >
                <InstagramIcon size={14} />
                <span>Open on Instagram</span>
                <ArrowUpRightIcon size={12} />
              </a>

              <button
                onClick={onClose}
                className="btn-secondary text-xs justify-center py-2.5 px-4"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

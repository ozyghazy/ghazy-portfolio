import type { SocialMediaItem } from '../types'

interface ReelVisualCoverProps {
  item: SocialMediaItem
}

export function ReelVisualCover({ item }: ReelVisualCoverProps) {
  // Waveform bar heights for dynamic audio look
  const waveformBars = [35, 60, 90, 45, 80, 100, 70, 85, 50, 95, 65, 40]

  return (
    <div
      className="absolute inset-0 w-full h-full z-0 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-105"
      style={{
        background: `radial-gradient(ellipse at 50% 25%, ${item.accentColor.replace('0.15', '0.45')} 0%, rgba(20, 20, 28, 0.95) 60%, #09090D 100%)`,
      }}
    >
      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient glowing orb */}
      <div
        className="absolute w-56 h-56 rounded-full pointer-events-none"
        style={{
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 70%)`,
          opacity: 0.6,
          filter: 'blur(32px)',
        }}
      />

      {/* ── Viewfinder Camera HUD overlay ── */}
      <div className="absolute inset-x-5 top-14 flex items-center justify-between text-[9px] font-mono tracking-widest text-white/40 pointer-events-none z-10">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          REC
        </span>
        <span className="text-white/30">4K · 60FPS</span>
        <span>{item.duration || '00:45'}</span>
      </div>

      {/* Viewfinder corner brackets */}
      <div className="absolute top-12 left-4 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-12 right-4 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />

      {/* ── Central Graphic & Hook typography ── */}
      <div className="absolute inset-x-5 top-24 bottom-32 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
        {/* Topic Pill */}
        <span
          className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          {item.category || 'Short-Form Reel'}
        </span>

        {/* Hook Headline */}
        <p className="text-sm sm:text-base font-serif italic text-white/95 px-2 leading-relaxed drop-shadow-md line-clamp-3 mb-4">
          {item.hookText || `"${item.title}"`}
        </p>

        {/* Audio Waveform Equalizer Mockup */}
        <div className="flex items-end gap-1 h-6 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
          <span className="text-[9px] font-mono text-white/50 mr-1.5">♫</span>
          {waveformBars.map((height, i) => (
            <span
              key={i}
              className="w-0.5 rounded-full transition-all duration-300"
              style={{
                height: `${height * 0.16}px`,
                background: i % 2 === 0 ? item.glowColor : 'rgba(255,255,255,0.7)',
                opacity: 0.8,
              }}
            />
          ))}
          <span className="text-[8px] font-mono text-white/40 ml-1.5 uppercase">Sync</span>
        </div>
      </div>
    </div>
  )
}

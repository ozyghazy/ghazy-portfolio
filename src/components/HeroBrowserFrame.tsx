import { SITE_CONFIG } from '../config'
import { BrowserFrame } from './BrowserFrame'
import { WhatsAppIcon, ArrowUpRightIcon } from './Icons'

export function HeroBrowserFrame() {
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background ambient glows ── */}
      <div
        className="ambient-glow"
        style={{
          width: 800,
          height: 550,
          top: '-5%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.11) 0%, transparent 68%)',
        }}
      />
      <div
        className="ambient-glow"
        style={{
          width: 450,
          height: 380,
          bottom: '10%',
          left: '-5%',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)',
        }}
      />
      <div
        className="ambient-glow"
        style={{
          width: 360,
          height: 300,
          bottom: '15%',
          right: '-5%',
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl lg:max-w-6xl mx-auto">

        {/* ── Top Status Pill: Centered above window ── */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium cursor-default transition-colors hover:border-white/20"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#9A9AA6',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-emerald-400"
              style={{
                boxShadow: '0 0 8px rgba(52,211,153,0.7)',
                animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
              }}
            />
            <span>Available for opportunities →</span>
          </div>
        </div>

        {/* ── Backlit browser frame with 2-Column Editorial Split ── */}
        <div className="relative">
          {/* Soft ambient backlight behind the frame */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '24px',
              background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.12) 40%, rgba(16,185,129,0.06) 65%, transparent 75%)',
              filter: 'blur(45px)',
              zIndex: -1,
              transform: 'scale(1.04) translateY(12px)',
            }}
          />

          <BrowserFrame title="ghazy.dev — portfolio">
            <div className="relative grid grid-cols-1 lg:grid-cols-12 items-end overflow-hidden">
              
              {/* ── Left Column: Content & Stats ── */}
              <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 lg:p-12 z-20 flex flex-col justify-between">
                <div>
                  {/* Display headline */}
                  <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-text-primary leading-[1.2] tracking-tight mb-5">
                    Designing intuitive{' '}
                    <em className="font-serif font-normal" style={{ fontStyle: 'italic' }}>
                      interfaces
                    </em>
                    , building modern{' '}
                    <em className="font-serif font-normal" style={{ fontStyle: 'italic' }}>
                      web apps
                    </em>{' '}
                    &amp; crafting digital{' '}
                    <em className="font-serif font-normal" style={{ fontStyle: 'italic' }}>
                      stories
                    </em>
                    .
                  </h1>

                  {/* Bio */}
                  <p className="text-text-secondary text-base sm:text-[1.05rem] leading-relaxed max-w-xl mb-7">
                    Informatics student at{' '}
                    <span className="text-text-primary/90 font-medium">Universitas Al Azhar Indonesia</span>{' '}
                    focusing on Front-End Web Development, UI/UX Product Design, Software Quality
                    Assurance, and high-impact digital content.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 items-center mb-8">
                    <button onClick={scrollToWork} className="btn-primary">
                      Explore Selected Works
                      <ArrowUpRightIcon size={15} />
                    </button>
                    <a
                      href={SITE_CONFIG.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <WhatsAppIcon size={15} />
                      WhatsApp Me
                    </a>
                  </div>
                </div>

                {/* Subtle horizontal hairline divider */}
                <div
                  className="w-full h-px mb-6"
                  style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))' }}
                />

                {/* 4-column metrics row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pt-1">
                  {[
                    { value: '4+', label: 'Projects shipped' },
                    { value: '6.2M+', label: 'Content views' },
                    { value: '2', label: 'Internships' },
                    { value: '4', label: 'Organizations' },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight font-sans">
                        {value}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5 leading-snug">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right Column: Cutout Portrait Seamlessly Blended ── */}
              <div className="lg:col-span-5 relative w-full flex items-end justify-center lg:justify-end self-end h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] xl:h-[530px] overflow-hidden">
                {/* Soft subtle radial backlight glow behind the portrait */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: '300px',
                    height: '340px',
                    bottom: '10%',
                    right: '5%',
                    background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.28) 0%, rgba(59,130,246,0.16) 42%, rgba(16,185,129,0.06) 68%, transparent 75%)',
                    filter: 'blur(36px)',
                    transform: 'scale(1.2)',
                    zIndex: 1,
                  }}
                  aria-hidden="true"
                />

                {/* Ambient top rim highlight */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: '200px',
                    height: '200px',
                    top: '5%',
                    right: '20%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
                    filter: 'blur(28px)',
                    zIndex: 1,
                  }}
                  aria-hidden="true"
                />

                {/* Cutout Portrait Image with bottom torso fade mask */}
                <img
                  src="/hero-portrait.png"
                  alt="Ghazy Rafizahul Haq"
                  className="relative z-10 w-auto h-full max-h-[340px] sm:max-h-[400px] md:max-h-[460px] lg:max-h-[500px] xl:max-h-[530px] object-contain object-bottom select-none pointer-events-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)]"
                  loading="eager"
                  decoding="async"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 68%, rgba(0,0,0,0.7) 84%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 68%, rgba(0,0,0,0.7) 84%, transparent 100%)',
                  }}
                />

                {/* Subtle bottom gradient to guarantee clean blend into #131318 window edge */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-20"
                  style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(19,19,24,0.92))',
                  }}
                  aria-hidden="true"
                />
              </div>

            </div>
          </BrowserFrame>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <button
            onClick={scrollToWork}
            className="flex flex-col items-center gap-2 group"
            aria-label="Scroll to work section"
            style={{ color: 'rgba(154,154,166,0.45)' }}
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase group-hover:text-text-secondary transition-colors">
              SCROLL ↓
            </span>
            <div
              className="w-px h-8 group-hover:opacity-80 transition-opacity"
              style={{
                background: 'linear-gradient(to bottom, currentColor, transparent)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          </button>
        </div>

      </div>
    </section>
  )
}

import React from 'react'

// ──────────────────────────────────────────────
// BrowserFrame — the macOS-style window wrapper
// ──────────────────────────────────────────────

interface BrowserFrameProps {
  title?: string
  children: React.ReactNode
  className?: string
  titleBarContent?: React.ReactNode
}

export function BrowserFrame({
  title,
  children,
  className = '',
  titleBarContent,
}: BrowserFrameProps) {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-titlebar">
        {/* Three window dots */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="window-dot" style={{ background: '#FF5F57' }} />
          <div className="window-dot" style={{ background: '#FEBC2E' }} />
          <div className="window-dot" style={{ background: '#28C840' }} />
        </div>

        {/* Center title */}
        {title && (
          <div className="flex-1 flex justify-center px-4">
            <span
              className="text-xs font-medium truncate max-w-[240px]"
              style={{ color: 'rgba(154,154,166,0.6)' }}
            >
              {title}
            </span>
          </div>
        )}

        {/* Optional right content */}
        {titleBarContent ? (
          <div className="ml-auto flex-shrink-0">{titleBarContent}</div>
        ) : (
          <div className="w-16 flex-shrink-0" />
        )}
      </div>

      {children}
    </div>
  )
}

// ──────────────────────────────────────────────
// PreviewFrame — rich placeholder "screenshot"
// ──────────────────────────────────────────────

interface PreviewFrameProps {
  accentColor: string
  glowColor: string
  label: string
  index: number
  customType?: 'qa-financial' | 'qa-suite' | 'default'
}

export function PreviewFrame({
  accentColor,
  glowColor,
  label,
  index,
  customType = 'default',
}: PreviewFrameProps) {
  if (customType === 'qa-financial') {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: 200, background: 'rgba(0,0,0,0.3)' }}
        aria-label={`Preview of ${label}`}
        role="img"
      >
        <QADashboardPreview accentColor={accentColor} glowColor={glowColor} />
        <div className="absolute bottom-3 right-3 pointer-events-none z-20">
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            QA Test Run Suite
          </span>
        </div>
      </div>
    )
  }

  if (customType === 'qa-suite') {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: 200, background: 'rgba(0,0,0,0.3)' }}
        aria-label={`Preview of ${label}`}
        role="img"
      >
        <QAAccessibilityPreview accentColor={accentColor} glowColor={glowColor} />
        <div className="absolute bottom-3 right-3 pointer-events-none z-20">
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            WCAG &amp; RBAC Matrix
          </span>
        </div>
      </div>
    )
  }

  const patterns = [
    // 0 — Lumina LMS: Dashboard layout
    <LuminaPreview key="lumina" accentColor={accentColor} glowColor={glowColor} />,
    // 1 — MajorMatch: Mobile card
    <MajorMatchPreview key="major" accentColor={accentColor} glowColor={glowColor} />,
    // 2 — Bliss: POS table
    <BlissPreview key="bliss" accentColor={accentColor} glowColor={glowColor} />,
    // 3 — Kasisolusi: Video grid
    <ContentPreview key="content" accentColor={accentColor} glowColor={glowColor} />,
  ]

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: 200, background: 'rgba(0,0,0,0.25)' }}
      aria-label={`Preview of ${label}`}
      role="img"
    >
      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          zIndex: 0,
        }}
      />

      <div className="relative z-10" style={{ minHeight: 200 }}>
        {patterns[index % patterns.length]}
      </div>

      {/* "Screenshot placeholder" label */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-20">
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: 'rgba(0,0,0,0.5)',
            color: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          Screenshot Placeholder
        </span>
      </div>
    </div>
  )
}

// ── QA Previews ──

function QADashboardPreview({ accentColor, glowColor }: { accentColor: string; glowColor: string }) {
  return (
    <div
      className="p-5 flex flex-col gap-3 relative"
      style={{ minHeight: 200, boxShadow: `inset 0 1px 0 ${glowColor}` }}
    >
      {/* Top QA metrics header */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Total Cases', value: '124' },
          { label: 'Passed Rate', value: '98.4%' },
          { label: 'Bugs Fixed', value: '45' },
          { label: 'Crit in Prod', value: '0' },
        ].map((m, i) => (
          <div
            key={i}
            className="p-2 rounded-lg flex flex-col justify-center border border-white/5"
            style={{ background: i === 3 ? 'rgba(16,185,129,0.1)' : accentColor }}
          >
            <span className="text-[9px] uppercase tracking-wider text-text-secondary/60">
              {m.label}
            </span>
            <span
              className="text-xs font-bold font-mono"
              style={{ color: i === 3 ? '#34d399' : '#F4F4F6' }}
            >
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* JIRA Defect Lifecycle progress track */}
      <div
        className="p-3 rounded-lg border border-white/5 flex flex-col gap-1.5"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="flex items-center justify-between text-[10px] text-text-secondary/70">
          <span>Sprint 6 Regression Verification</span>
          <span className="text-emerald-400 font-bold">100% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex">
          <div className="h-full bg-emerald-500" style={{ width: '82%' }} />
          <div className="h-full bg-sky-400" style={{ width: '14%' }} />
          <div className="h-full bg-amber-400" style={{ width: '4%' }} />
        </div>
      </div>

      {/* Test Case Rows */}
      <div className="flex flex-col gap-1 font-mono text-[10px]">
        {[
          { id: 'JK-042', name: 'Multi-Tax Invoicing Compound Rounding', status: 'VERIFIED' },
          { id: 'JK-051', name: 'Duplicate Expense Rapid Click Race Condition', status: 'RESOLVED' },
        ].map((tc, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-2.5 py-1.5 rounded-md border border-white/5"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sky-400 font-bold">{tc.id}</span>
              <span className="text-text-secondary truncate max-w-[220px]">{tc.name}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              {tc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function QAAccessibilityPreview({ accentColor, glowColor }: { accentColor: string; glowColor: string }) {
  return (
    <div className="p-5 flex flex-col gap-3" style={{ minHeight: 200 }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-text-primary">WCAG 2.1 AA Compliance Score</span>
        <span
          className="px-2 py-0.5 rounded text-[10px] font-bold border"
          style={{ background: accentColor, borderColor: glowColor, color: '#e9d5ff' }}
        >
          100 / 100 Lighthouse
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['Contrast Ratio (4.5:1)', 'Keyboard Traps 0', 'RBAC Leak 0'].map((item, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-lg border border-white/5 text-[10px] text-center font-medium"
            style={{ background: accentColor }}
          >
            <span className="text-emerald-400 mr-1">✓</span>
            {item}
          </div>
        ))}
      </div>
      <div
        className="mt-auto p-3 rounded-lg border border-white/5 flex items-center justify-between text-xs"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <span className="text-text-secondary text-[11px]">60 Test Scenarios Passed</span>
        <span className="text-text-primary text-[11px] font-mono font-bold">Release Ready</span>
      </div>
    </div>
  )
}

// ── Individual preview illustrations ──

function LuminaPreview({ accentColor, glowColor }: { accentColor: string; glowColor: string }) {
  return (
    <div className="p-5 flex flex-col gap-3" style={{ minHeight: 200 }}>
      <div className="flex items-center gap-3">
        <div className="h-5 w-24 rounded-md" style={{ background: accentColor }} />
        <div className="flex-1" />
        <div className="h-4 w-16 rounded-full" style={{ background: glowColor, opacity: 0.5 }} />
        <div className="h-5 w-5 rounded-full" style={{ background: accentColor }} />
      </div>
      <div className="flex gap-3 flex-1">
        <div className="w-28 flex flex-col gap-2 flex-shrink-0">
          {[85, 65, 75, 55, 70].map((w, i) => (
            <div
              key={i}
              className="h-5 rounded-md"
              style={{
                background: i === 0 ? accentColor : glowColor,
                width: `${w}%`,
                opacity: i === 0 ? 1 : 0.4,
              }}
            />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2 mb-1">
            {[accentColor, glowColor, accentColor].map((c, i) => (
              <div
                key={i}
                className="h-14 rounded-lg"
                style={{ background: c, opacity: i === 1 ? 0.5 : 0.8 }}
              />
            ))}
          </div>
          <div className="h-2 rounded-full" style={{ background: accentColor, width: '90%', opacity: 0.6 }} />
          <div className="h-2 rounded-full" style={{ background: glowColor, width: '70%', opacity: 0.4 }} />
          <div className="h-2 rounded-full" style={{ background: glowColor, width: '80%', opacity: 0.3 }} />
        </div>
      </div>
    </div>
  )
}

function MajorMatchPreview({ accentColor, glowColor }: { accentColor: string; glowColor: string }) {
  return (
    <div className="p-5 flex gap-4 items-start" style={{ minHeight: 200 }}>
      <div
        className="w-20 flex-shrink-0 rounded-2xl flex flex-col items-center justify-start overflow-hidden"
        style={{ background: accentColor, minHeight: 170, padding: '10px 8px' }}
      >
        <div className="w-8 h-1 rounded-full bg-white/30 mb-3" />
        <div className="w-full h-10 rounded-lg bg-white/20 mb-2" />
        <div className="w-full h-2 rounded-full bg-white/30 mb-1" />
        <div className="w-3/4 h-2 rounded-full bg-white/20 mb-3" />
        <div className="w-full h-7 rounded-full bg-white/25 mb-2" />
        <div className="w-full h-7 rounded-full bg-white/15" />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="h-5 rounded-md" style={{ background: accentColor, width: '75%' }} />
        <div className="h-3 rounded-full" style={{ background: glowColor, width: '90%', opacity: 0.5 }} />
        <div className="h-3 rounded-full" style={{ background: glowColor, width: '65%', opacity: 0.35 }} />
        <div className="flex gap-1.5 flex-wrap mt-1">
          {['Flutter', 'FastAPI', 'AI ML'].map((t) => (
            <div
              key={t}
              className="px-2 py-0.5 rounded-full text-[9px] font-semibold"
              style={{ background: accentColor, color: 'rgba(255,255,255,0.8)' }}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <div className="h-7 rounded-lg w-full" style={{ background: accentColor }} />
        </div>
      </div>
    </div>
  )
}

function BlissPreview({ accentColor, glowColor }: { accentColor: string; glowColor: string }) {
  return (
    <div className="p-5 flex flex-col gap-3" style={{ minHeight: 200 }}>
      <div className="flex gap-2 items-center">
        <div className="h-5 rounded-md" style={{ background: accentColor, width: '30%' }} />
        <div className="flex-1" />
        <div className="h-5 w-16 rounded-md" style={{ background: glowColor, opacity: 0.5 }} />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-7 rounded-lg flex items-center px-2 gap-2" style={{ background: accentColor }}>
          <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.5)', width: '40%' }} />
          <div className="ml-auto h-4 w-10 rounded-md" style={{ background: 'rgba(255,255,255,0.3)' }} />
        </div>
        {[80, 65, 75].map((w, i) => (
          <div
            key={i}
            className="h-6 rounded-lg flex items-center px-2 gap-2"
            style={{ background: glowColor, opacity: 0.5 - i * 0.1 }}
          >
            <div className="h-2 rounded-full bg-white/30" style={{ width: `${w - 20}%` }} />
            <div className="ml-auto h-3 w-8 rounded-md bg-white/20" />
          </div>
        ))}
      </div>
      <div
        className="mt-auto h-9 rounded-lg flex items-center justify-end px-3 gap-3"
        style={{ background: accentColor, opacity: 0.9 }}
      >
        <div className="h-2 w-12 rounded-full bg-white/30" />
        <div className="h-2 w-16 rounded-full bg-white/50" />
      </div>
    </div>
  )
}

function ContentPreview({ accentColor, glowColor }: { accentColor: string; glowColor: string }) {
  return (
    <div className="p-5 flex flex-col gap-3" style={{ minHeight: 200 }}>
      <div className="flex gap-3 mb-1">
        {['6.2M+', '1M+', '↑ Organic'].map((s, i) => (
          <div
            key={s}
            className="flex-1 h-9 rounded-lg flex flex-col items-center justify-center"
            style={{
              background: i === 0 ? accentColor : glowColor,
              opacity: i === 0 ? 1 : 0.5,
            }}
          >
            <span className="text-[9px] font-bold text-white/80">{s}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg flex items-center justify-center"
            style={{
              background: accentColor,
              opacity: 1 - (i - 1) * 0.25,
              aspectRatio: '9/16',
              maxHeight: 90,
            }}
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-white/70 ml-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

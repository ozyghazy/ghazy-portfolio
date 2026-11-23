import { useState, useEffect } from 'react'
import { SITE_CONFIG, isPlaceholder } from '../config'
import { WhatsAppIcon, MenuIcon, XIcon } from './Icons'

const SUBTITLE_ROLES = [
  'Web Developer & UI/UX Designer',
  'Software QA & Testing',
  'Creative Designer & Video Editor',
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % SUBTITLE_ROLES.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const showLinkedIn = !isPlaceholder(SITE_CONFIG.linkedin)
  const showResume = !isPlaceholder(SITE_CONFIG.resume)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(11, 11, 14, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* ── Left: Brand ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col leading-tight min-w-0 text-left hover:opacity-80 transition-opacity"
          aria-label="Scroll to top"
        >
          <span className="text-sm font-semibold text-text-primary truncate tracking-tight">
            {SITE_CONFIG.name}
          </span>
          <div className="relative h-5 min-w-[230px] overflow-hidden hidden sm:block">
            {SUBTITLE_ROLES.map((role, i) => {
              const isActive = i === roleIndex
              const isExiting =
                i === (roleIndex - 1 + SUBTITLE_ROLES.length) % SUBTITLE_ROLES.length

              let stateClass = 'opacity-0 translate-y-2.5 blur-[2px] pointer-events-none'
              if (isActive) {
                stateClass = 'opacity-100 translate-y-0 blur-0 pointer-events-auto'
              } else if (isExiting) {
                stateClass = 'opacity-0 -translate-y-2.5 blur-[2px] pointer-events-none'
              }

              return (
                <span
                  key={role}
                  className={`absolute inset-0 flex items-center text-[11px] text-text-secondary whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${stateClass}`}
                >
                  {role}
                </span>
              )
            })}
          </div>
        </button>

        {/* ── Center: Nav links (desktop) ── */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <NavLink onClick={() => scrollTo('work')}>Work</NavLink>
          <NavLink onClick={() => scrollTo('about')}>About</NavLink>
          <NavLink onClick={() => scrollTo('contact')}>Contact</NavLink>
        </nav>

        {/* ── Right: External links + WhatsApp pill (desktop) ── */}
        <div className="hidden md:flex items-center gap-2">
          {showLinkedIn && (
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              LinkedIn
            </a>
          )}
          {showResume && (
            <a
              href={SITE_CONFIG.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              Resume
            </a>
          )}
          <a
            href={SITE_CONFIG.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav-pill"
          >
            <WhatsAppIcon size={12} />
            WhatsApp
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden btn-ghost p-2 -mr-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ease-in-out ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(11,11,14,0.98)', backdropFilter: 'blur(20px)' }}
      >
        <nav className="flex flex-col px-6 pt-8 gap-1">
          {(['work', 'about', 'contact'] as const).map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left py-3.5 px-4 text-lg font-semibold text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-all capitalize"
            >
              {id}
            </button>
          ))}
          <div className="h-px my-4" style={{ background: 'rgba(255,255,255,0.07)' }} />
          {showLinkedIn && (
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-4 text-sm font-medium text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-all flex items-center justify-between"
            >
              LinkedIn <span className="opacity-40">↗</span>
            </a>
          )}
          {showResume && (
            <a
              href={SITE_CONFIG.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-4 text-sm font-medium text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-all flex items-center justify-between"
            >
              Resume <span className="opacity-40">↗</span>
            </a>
          )}
          <a
            href={SITE_CONFIG.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 btn-whatsapp justify-center text-base py-3.5"
          >
            <WhatsAppIcon size={18} />
            WhatsApp Me
          </a>
        </nav>
      </div>
    </header>
  )
}

function NavLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg hover:bg-white/5 transition-all duration-200 group"
    >
      {children}
      <span className="absolute bottom-1 left-4 right-4 h-px bg-text-primary/0 group-hover:bg-text-primary/20 transition-all duration-200" />
    </button>
  )
}

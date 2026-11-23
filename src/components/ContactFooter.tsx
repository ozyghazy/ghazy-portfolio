import { SITE_CONFIG, isPlaceholder } from '../config'
import {
  WhatsAppIcon,
  EmailIcon,
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
} from './Icons'

interface SocialLinkProps {
  href: string
  label: string
  children: React.ReactNode
}

function SocialLink({ href, label, children }: SocialLinkProps) {
  const isEmail = href.startsWith('mailto:')
  return (
    <a
      href={href}
      target={isEmail ? undefined : '_blank'}
      rel={isEmail ? undefined : 'noopener noreferrer'}
      className="p-2.5 rounded-xl transition-all duration-200 group"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#9A9AA6',
      }}
      aria-label={label}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.background = 'rgba(255,255,255,0.1)'
        el.style.borderColor = 'rgba(255,255,255,0.18)'
        el.style.color = '#F4F4F6'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.background = 'rgba(255,255,255,0.05)'
        el.style.borderColor = 'rgba(255,255,255,0.08)'
        el.style.color = '#9A9AA6'
        el.style.transform = 'translateY(0)'
      }}
    >
      {children}
    </a>
  )
}

export function ContactFooter() {
  const showLinkedIn = !isPlaceholder(SITE_CONFIG.linkedin)
  const showGitHub = !isPlaceholder(SITE_CONFIG.github)
  const showInstagram = !isPlaceholder(SITE_CONFIG.instagram)
  const showEmail = !isPlaceholder(SITE_CONFIG.email)
  const emailHref = `mailto:${SITE_CONFIG.email}`

  return (
    <section id="contact" className="relative py-28 px-5 overflow-hidden">
      {/* Top separator */}
      <div className="max-w-[1040px] mx-auto mb-16">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
      </div>

      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 90%, rgba(37,211,102,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1040px] mx-auto relative z-10">
        {/* Content */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-5">
            Get In Touch
          </p>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-semibold text-text-primary leading-tight mb-6">
            Let's build something{' '}
            <em className="font-serif italic font-normal">thoughtful</em> together.
          </h2>

          {/* Sub-copy */}
          <p className="text-text-secondary leading-relaxed mb-10 max-w-lg mx-auto">
            Whether you have a project in mind, want to collaborate, or just want to say
            hello — my inbox and WhatsApp are always open.
          </p>

          {/* Primary CTA */}
          <div className="flex justify-center mb-10">
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-8 py-4 shadow-lg"
              style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.2)' }}
            >
              <WhatsAppIcon size={20} />
              WhatsApp Me
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* WhatsApp always shown */}
            <SocialLink href={SITE_CONFIG.whatsapp} label="WhatsApp">
              <WhatsAppIcon size={18} />
            </SocialLink>

            {/* Email — shown if configured */}
            {showEmail && (
              <SocialLink href={emailHref} label={`Email ${SITE_CONFIG.email}`}>
                <EmailIcon size={18} />
              </SocialLink>
            )}

            {/* LinkedIn */}
            {showLinkedIn && (
              <SocialLink href={SITE_CONFIG.linkedin} label="LinkedIn">
                <LinkedInIcon size={18} />
              </SocialLink>
            )}

            {/* GitHub */}
            {showGitHub && (
              <SocialLink href={SITE_CONFIG.github} label="GitHub">
                <GitHubIcon size={18} />
              </SocialLink>
            )}

            {/* Instagram / Behance */}
            {showInstagram && (
              <SocialLink href={SITE_CONFIG.instagram} label="Instagram / Behance">
                <InstagramIcon size={18} />
              </SocialLink>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-20 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary/40">
            <span>
              © {SITE_CONFIG.footerYear} {SITE_CONFIG.name}. Built with React &amp; TypeScript.
            </span>
            <span className="text-text-secondary/30">Designed with care in Jakarta.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

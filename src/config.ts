// ─────────────────────────────────────────────────────────
// Site-wide configuration — update links here, nowhere else.
// ─────────────────────────────────────────────────────────

export const SITE_CONFIG = {
  name: 'Ghazy Rafizahul Haq',
  subtitle: 'Web Developer & UI/UX Designer',
  email: 'ozyghazy9@gmail.com',
  whatsapp: 'https://wa.link/wxxvtq',
  linkedin: 'https://www.linkedin.com/in/ghazy-rafizahul-haq-9262202ab',
  github: '[ISI_URL_GITHUB]',
  instagram: '[ISI_URL_SOSMED]',
  resume: '[ISI_URL_CV_PDF_ATAU_DRIVE]',
  footerYear: '2026',
}

/** Returns true if a URL is still an unfilled placeholder or empty. */
export function isPlaceholder(url: string): boolean {
  return !url || url.startsWith('[ISI_') || url === '#'
}

/** Extracts Instagram Reel shortcode from URL */
export function getInstagramReelShortcode(url: string): string {
  if (!url) return ''
  const match = url.match(/\/reel\/([a-zA-Z0-9_-]+)/)
  return match ? match[1] : ''
}

/** Extracts Instagram Post/Feed shortcode from URL */
export function getInstagramPostShortcode(url: string): string {
  if (!url) return ''
  const match = url.match(/\/p\/([a-zA-Z0-9_-]+)/)
  return match ? match[1] : ''
}

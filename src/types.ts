export type ProjectCategory = 'university' | 'qa-testing' | 'social-media' | 'poster-feed'

export interface QABreakdown {
  testingScope: string[]
  keyFindings: string[]
  qualityImpact: string
  artifacts?: {
    title: string
    type: 'Test Case Matrix' | 'Bug Report Sheet' | 'Regression Checklist' | 'Usability Audit'
    caption?: string
  }
}

export interface CaseStudy {
  overview: string
  role: string
  features?: string[]
  outcome?: string
  demoUrl: string
  figmaUrl: string
  repoUrl: string
  documentation?: string[]
  qaBreakdown?: QABreakdown
}

export interface Project {
  id: string
  title: string
  subtitle: string
  year: string
  context: string
  tags: string[]
  accentColor: string
  glowColor: string
  category?: ProjectCategory
  documentation?: string[]
  caseStudy: CaseStudy
}

export interface SocialMediaItem {
  id: string
  title: string
  platform: string
  viewsCount: number
  viewsLabel: string
  thumbnailUrl?: string
  externalUrl: string
  notes: string
  category?: string
  engagement?: string
  duration?: string
  accentColor: string
  glowColor: string
  hookText?: string
  tags: string[]
  caseStudy?: CaseStudy
}

export interface FeaturedPosterItem {
  id: string
  title: string
  category: string
  imageUrl: string
  aspectRatio?: string
  accentColor?: string
  glowColor?: string
  notes?: string
}

export interface InstagramFeedItem {
  id: string
  title: string
  shortcode: string
  externalUrl: string
  category?: string
  accentColor?: string
  glowColor?: string
  notes?: string
}

export interface DesignShowcaseItem {
  id: string
  title: string
  format: 'Event Poster' | 'Carousel Feed' | 'Social Campaign' | 'Brand Identity Poster'
  aspectRatio: 'aspect-[3/4]' | 'aspect-[4/5]' | 'aspect-square'
  year: string
  description: string
  tools: string[]
  accentColor: string
  glowColor: string
  concept: string
  figmaUrl: string
  previewType: 'poster-tech' | 'feed-carousel' | 'poster-campus' | 'feed-fintech' | 'feed-guide' | 'poster-cyber'
}

export interface Experience {
  role: string
  company: string
  period: string
  bullets: string[]
}

export interface SkillGroup {
  label: string
  skills: string[]
}

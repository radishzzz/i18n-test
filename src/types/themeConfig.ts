import type { Link, Meta } from 'astro-seo'
import type {
  AvailableLanguage,
  BooleanString,
  InputPosition,
  Loading,
  Mapping,
  Repo,
  Theme,
} from 'giscus'
import type { LANGUAGES } from '../i18n.ts'

export interface ThemeConfig {
  site: ConfigSite
  appearance: ConfigAppearance
  seo: ConfigSEO
  comment: Partial<ConfigComment>
  rss: ConfigRSS
  analytics: ConfigAnalytics
  latex: ConfigLaTeX
}

export interface ConfigSite {
  title: string
  subtitle: string
  author: string
  description: string
  website: string
  pageSize: number
  socialLinks: { name: string, href: string }[]
  navLinks: { name: string, href: string }[]
  categoryMap: { name: string, path: string }[]
  footer: string[]
}

export interface ConfigAppearance {
  theme: 'light' | 'dark'
  locale: keyof typeof LANGUAGES
  colorsDark: Colors
  colorsLight: Colors
  fonts: Fonts
}

export interface ConfigSEO {
  twitter: string
  meta: Partial<Meta>[]
  link: Partial<Link>[]
}

export interface ConfigComment {
  waline?: Waline
  twikoo?: Twikoo
  disqus?: Disqus
  giscus?: Giscus
}

export interface ConfigRSS {
  fullText?: boolean
  /** https://github.com/RSSNext/follow */
  follow?: { feedId: string, userId: string }
}

export interface ConfigAnalytics {
  /** google analytics */
  googleAnalyticsId: string
  umamiAnalyticsId: string
}

export interface ConfigLaTeX {
  katex: boolean
}

interface Colors {
  primary: string
  background: string
}

interface Fonts {
  header: string
  ui: string
  // TODO: 未实现
  _article?: string
  _code?: string
}

interface Waline {
  serverURL: string
  lang?: string
  search?: boolean
  comment?: boolean
  pageview?: boolean
  imageUploader?: boolean
  emoji?: string[]
  meta?: string[]
  requiredMeta?: string[]
  login?: string
  locale?: Record<string, string>
}

interface Twikoo {
  envId: string
  region?: string
  lang?: string
}

interface Disqus {
  shortname: string
}

interface Giscus {
  repo: Repo
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: Mapping
  term?: string
  strict: BooleanString
  reactionsEnabled: BooleanString
  emitMetadata: BooleanString
  inputPosition: InputPosition
  theme: Theme
  lang: AvailableLanguage
  loading: Loading
}

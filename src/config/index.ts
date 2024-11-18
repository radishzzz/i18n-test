import type { ThemeConfig } from '~/types'

export const SUPPORTED_LANGUAGES = ['zh', 'en', 'es', 'ru', 'ja'] as const
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

export const defaultConfig: ThemeConfig = {
  site: {
    title: '活版印字',
    subtitle: 'Typography',
    author: 'Moeyua',
    description: {
      zh: '发现排版之美',
      en: 'Rediscover the beauty of typography',
      es: 'Redescubre la belleza de la tipografía',
      ru: 'Откройте для себя красоту типографики',
      ja: 'タイポグラフィーの美しさを再発見',
    },
    website: 'https://astro-theme-typography.vercel.app/',
    pageSize: 5,
    socialLinks: [
      {
        name: 'github',
        href: 'https://github.com/moeyua/astro-theme-typography',
      },
      {
        name: 'rss',
        href: '/atom.xml',
      },
      {
        name: 'twitter',
        href: 'https://github.com/moeyua/astro-theme-typography',
      },
      {
        name: 'mastodon',
        href: 'https://github.com/moeyua/astro-theme-typography',
      },
    ],
    navLinks: [
      {
        name: 'Posts',
        href: '/',
      },
      {
        name: 'Archive',
        href: '/archive',
      },
      {
        name: 'Categories',
        href: '/categories',
      },
      {
        name: 'About',
        href: '/about',
      },
    ],
    categoryMap: [{ name: '胡适', path: 'hu-shi' }],
    footer: [
      '© %year <a target="_blank" href="%website">%author</a>',
      'Theme <a target="_blank" href="https://github.com/Moeyua/astro-theme-typography">Typography</a> by <a target="_blank" href="https://moeyua.com">Moeyua</a>',
      'Proudly published with <a target="_blank" href="https://astro.build/">Astro</a>',
    ],
  },
  appearance: {
    locale: 'zh',
    colorsLight: {
      primary: '#333333',
      background: '#ffffff',
    },
    colorsDark: {
      primary: '#dbdbdb',
      background: '#121212',
    },
    fonts: {
      header:
        '"HiraMinProN-W6","Source Han Serif CN","Source Han Serif SC","Source Han Serif TC",serif',
      ui: '"Source Sans Pro","Roboto","Helvetica","Helvetica Neue","Source Han Sans SC","Source Han Sans TC","PingFang SC","PingFang HK","PingFang TC",sans-serif',
    },
  },
  seo: {
    twitter: '@moeyua13',
    meta: [],
    link: [],
  },
  rss: {
    fullText: true,
  },
  comment: {
    waline: {
      serverURL: 'https://comment.radishzz.cc',
      emoji: [
        '//unpkg.com/@waline/emojis@1.2.0/bmoji',
        '//unpkg.com/@waline/emojis@1.2.0/tw-emoji',
      ],
      search: false,
      imageUploader: false,
    },
  },
  analytics: {
    googleAnalyticsId: '',
    umamiAnalyticsId: '',
  },
  latex: {
    katex: false,
  },
}

export const themeConfig = defaultConfig

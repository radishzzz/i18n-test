import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
import type { Post } from '~/types'

// 统一使用简短语言代码
export const LANGUAGES = ['zh', 'en', 'es', 'ru', 'ja'] as const
export type Language = typeof LANGUAGES[number]

export async function getPosts() {
  const posts = await getCollection('posts')
  posts.sort((a, b) => {
    return dayjs(a.data.pubDate).isBefore(dayjs(b.data.pubDate)) ? 1 : -1
  })

  return posts.map(post => ({
    ...post,
    data: {
      ...post.data,
      lang: extractLanguageFromSlug(post.slug),
      canonicalSlug: generateCanonicalSlug(post.slug),
    },
  }))
}

export async function getPostsByLang(lang: Language) {
  const posts = await getPosts()
  return posts.filter(post => post.data.lang === lang)
}

function extractLanguageFromSlug(slug: string): Language {
  const lang = slug.split('/')[0].toLowerCase() as Language
  return LANGUAGES.includes(lang) ? lang : 'en'
}

function generateCanonicalSlug(slug: string): string {
  return slug.split('/').slice(1).join('/')
}

export async function getCategories(lang?: Language) {
  const posts = await getPosts()
  const categories = new Map<string, Post[]>()

  const filteredPosts = lang
    ? posts.filter(post => post.data.lang === lang)
    : posts

  for (const post of filteredPosts) {
    if (post.data.categories) {
      for (const c of post.data.categories) {
        const posts = categories.get(c) || []
        posts.push(post)
        categories.set(c, posts)
      }
    }
  }

  return categories
}

const parser = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

export function getPostDescription(post: Post) {
  if (post.data.description) {
    return post.data.description
  }

  const html = parser.render(post.body)
  const sanitized = sanitizeHtml(html, { allowedTags: [] })
  return sanitized.slice(0, 400)
}

export function formatDate(date: Date, format: string = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

export function getPathFromCategory(
  category: string,
  category_map: { name: string, path: string }[],
  lang?: Language,
) {
  const mappingPath = category_map.find(l => l.name === category)
  const path = mappingPath ? mappingPath.path : category
  const cleanPath = path.replace(/^\/+|\/+$/g, '')
  return lang ? `${lang}/${cleanPath}` : cleanPath
}

export function isValidLanguage(lang: string): lang is Language {
  return LANGUAGES.includes(lang as Language)
}

export function getDefaultLanguage(): Language {
  return 'en'
}

// 获取语言的原生名称
export function getLanguageName(lang: Language): string {
  const names: Record<Language, string> = {
    zh: '中文',
    en: 'English',
    es: 'Español',
    ru: 'Русский',
    ja: '日本語',
  }
  return names[lang]
}

import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
import type { Post } from '~/types'

// 添加支持的语言列表
export const LANGUAGES = ['en', 'es', 'ru'] as const
type Language = typeof LANGUAGES[number]

// 修改 getPosts 函数
export async function getPosts() {
  const posts = await getCollection('posts')
  posts.sort((a, b) => {
    return dayjs(a.data.pubDate).isBefore(dayjs(b.data.pubDate)) ? 1 : -1
  })

  // 为每篇文章添加规范的 slug
  return posts.map(post => ({
    ...post,
    data: {
      ...post.data,
      // 从文章路径中提取语言
      lang: extractLanguageFromSlug(post.slug),
      // 生成统一的 canonicalSlug
      canonicalSlug: generateCanonicalSlug(post.slug),
    },
  }))
}

// 按语言获取文章
export async function getPostsByLang(lang: Language) {
  const posts = await getPosts()
  return posts.filter(post => post.data.lang === lang)
}

// 从文章 slug 中提取语言
function extractLanguageFromSlug(slug: string): Language {
  // 假设你的内容集合中的 slug 格式为 "en/hometown" 或类似格式
  const lang = slug.split('/')[0] as Language
  return LANGUAGES.includes(lang) ? lang : 'en' // 默认返回英语
}

// 生成统一的规范 slug
function generateCanonicalSlug(slug: string): string {
  // 移除语言前缀，获取最后一部分作为规范 slug
  // 例如: "en/hometown" -> "hometown"
  return slug.split('/').slice(1).join('/')
}

// 其余函数保持不变
export async function getCategories() {
  const posts = await getPosts()
  const categories = new Map<string, Post[]>()

  for (const post of posts) {
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

const parser = new MarkdownIt()
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
) {
  const mappingPath = category_map.find(l => l.name === category)
  return mappingPath ? mappingPath.path : category
}

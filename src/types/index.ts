import type { CollectionEntry } from 'astro:content'
import type { Language } from '~/utils'

// 扩展 Post 类型以包含必需的语言字段
export type Post = CollectionEntry<'posts'> & {
  data: {
    lang: Language
    canonicalSlug: string
  }
}

export * from './themeConfig'

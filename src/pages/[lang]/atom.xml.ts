import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
import { SUPPORTED_LANGUAGES, themeConfig } from '~/config'
import type { SupportedLanguage } from '~/config'
import type { Post } from '~/types'

const parser = new MarkdownIt()
const { title, description, website, author } = themeConfig.site
const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img'])

export function getStaticPaths() {
  return SUPPORTED_LANGUAGES.map(lang => ({
    params: { lang },
  }))
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as SupportedLanguage
  const langPosts = await getCollection('posts', ({ data }) => data.lang === lang)

  return rss({
    title,
    description: description[lang],
    site: website,
    items: langPosts.map(post => getPostItem(post, lang)),
    customData: getCustomData(),
  })
}

function getCustomData() {
  const follow = themeConfig.rss.follow
  if (!follow)
    return ''
  const { feedId, userId } = follow
  return `<follow_challenge><feedId>${feedId}</feedId><userId>${userId}</userId></follow_challenge>`
}

function getPostItem(post: Post, lang: SupportedLanguage) {
  const postItem = {
    link: `/${lang}/posts/${post.slug}/`,
    author: post.data.author ?? author,
    content: getPostContent(post),
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.description,
    customData: post.data.customData,
    categories: post.data.categories,
    commentsUrl: post.data.commentsUrl,
    source: post.data.source,
    enclosure: post.data.enclosure,
  }

  return postItem
}

function getPostContent(post: Post) {
  const isFullText = themeConfig.rss.fullText
  if (!isFullText)
    return post.data.description
  return sanitizeHtml(parser.render(post.body), { allowedTags })
}

import { defineMiddleware } from 'astro:middleware'
import type { SupportedLanguage } from '~/config'
import { LANGUAGES } from '~/i18n.ts'

export const onRequest = defineMiddleware(async (context, next) => {
  // 从 URL 路径获取当前语言
  const urlLang = context.params.lang as SupportedLanguage

  // 获取对应语言的翻译
  const localeTranslate = LANGUAGES[urlLang]

  function validateKey(key: string): key is keyof typeof localeTranslate {
    return key in localeTranslate
  }

  context.locals.translate = (key, param) => {
    if (!validateKey(key))
      return key
    if (!param)
      return localeTranslate[key]
    return localeTranslate[key].replace('%d', param.toString())
  }

  return next()
})

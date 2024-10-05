import { HttpMethod } from '../types'
import { Article } from '../types/article'

import { fetchApi } from './fetch-api'

export function addArticle(article: Article, token?: string) {
  return fetchApi<Article>('/articles', {
    method: HttpMethod.POST,
    data: article,
    token,
  })
}

import { HttpMethod } from '../types'
import { Article } from '../types/article'

import { fetchApi } from './fetch-api'

export function addArticle(token?: string) {
  return fetchApi<Article>('/articles', {
    method: HttpMethod.POST,
    token,
  })
}

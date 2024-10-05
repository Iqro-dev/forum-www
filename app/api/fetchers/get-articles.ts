import { Article } from '../types/article'

import { fetchApi } from './fetch-api'

export function getArticles(token?: string) {
  return fetchApi<Article[]>('/articles', {
    token,
  })
}

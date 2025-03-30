'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/utils'
import { ACCESS_TOKEN } from '../api/constants'
import { getArticles } from '../api/fetchers/get-articles'
import { getProfile } from '../api/fetchers/get-profile'
import { Profile } from '../api/types'
import { CreateArticle } from '../components/articles/create-article'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Separator } from '../components/ui/separator'

export default async function FeedPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) return redirect('/login')

  const accessToken = cookies().get(ACCESS_TOKEN)?.value
  let profile: Profile | undefined

  profile = await getProfile(accessToken)

  const articles = await getArticles(accessToken)

  console.log(articles)

  return (
    <main className="flex flex-col items-center w-screen pt-4 px-12 gap-12">
      <section className="md:px-0 w-full md:w-1/2 flex justify-center">
        {profile._id && <CreateArticle profile={profile} />}
      </section>

      <article className="w-full md:w-1/2">
        <span className="text-3xl font-bold">Feed</span>

        <div className="flex flex-col gap-8 pt-4">
          {articles.map(article => (
            <Card key={article._id} className="border-border">
              <CardHeader></CardHeader>

              <Separator className="w-full px-0" />

              <CardContent>{article.content}</CardContent>
            </Card>
          ))}
        </div>
      </article>
    </main>
  )
}

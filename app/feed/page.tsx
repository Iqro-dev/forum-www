'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/utils'
import { Profile } from '../api/types'
import { ACCESS_TOKEN } from '../api/constants'
import { getProfile } from '../api/fetchers/get-profile'
import { CreateArticle } from '../components/articles/create-article'

export default async function FeedPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) return redirect('/login')

  const accessToken = cookies().get(ACCESS_TOKEN)?.value
  let profile: Profile | undefined

  profile = await getProfile(accessToken)

  return (
    <main className="flex flex-col items-center w-screen pt-4 gap-4">
      <section className="md:px-0 px-12 w-full flex justify-center">
        {profile._id && <CreateArticle profile={profile} />}
      </section>

      <article className="w-1/2">
        <span className="text-3xl font-bold">Feed</span>
      </article>
    </main>
  )
}

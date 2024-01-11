import { cookies } from 'next/headers'
import { LayoutProps } from '../types/props'
import { ACCESS_TOKEN } from '../api/constants'
import { getProfile } from '../api/fetchers/get-profile'

export default async function FeedLayout({ children }: LayoutProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const profile = await getProfile(accessToken)

  return (
    <div className="flex">
      <main>{children}</main>
    </div>
  )
}

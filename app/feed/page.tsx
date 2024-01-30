import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/utils'

export default function FeedPage() {
  if (!isAuthenticated()) return redirect('/login')

  return (
    <div className="flex justify-center pt-4">
      <div className="flex justify-left w-1/3">
        <span className="text-4xl font-bold">Feed</span>
      </div>
    </div>
  )
}

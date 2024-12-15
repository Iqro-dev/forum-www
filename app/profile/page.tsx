'use client'

import { ProfileAvatar } from '../components/profile/avatar'
import { Card, CardHeader } from '../components/ui/card'

export default function Profile() {
  return (
    <Card className="w-3/4 pt-12 border-none">
      <CardHeader className="w-full bg-gray-800 rounded-t-full">
        <ProfileAvatar className="w-36 h-36 ml-12" />
      </CardHeader>
    </Card>
  )
}

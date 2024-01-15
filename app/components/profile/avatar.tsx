import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

import { cn } from '@/utils/cn'

export interface ProfileAvatarProps {
  src?: string
  displayName?: string
  className?: string
}

export function ProfileAvatar({
  src,
  displayName,
  className,
}: ProfileAvatarProps) {
  return (
    <Avatar className={cn('rounded-full', className)}>
      <AvatarImage className="rounded-full" src={src} alt={displayName} />

      <AvatarFallback>{displayName?.slice(0, 1)}</AvatarFallback>
    </Avatar>
  )
}

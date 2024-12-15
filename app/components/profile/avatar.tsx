import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

import { cn } from '@/utils/cn'

export type ProfileAvatarProps = Readonly<{
  src?: string
  displayName?: string
  className?: string
}>

export function ProfileAvatar({
  src,
  displayName,
  className,
}: ProfileAvatarProps) {
  return (
    <Avatar className="rounded-full">
      <AvatarImage
        className={cn('rounded-full', className)}
        src={src ?? 'https://github.com/shadcn.png'}
        alt={displayName}
      />

      <AvatarFallback>{displayName?.slice(0, 1)}</AvatarFallback>
    </Avatar>
  )
}

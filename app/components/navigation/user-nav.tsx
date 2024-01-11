'use client'

import { CaretSortIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { ProfileAvatar } from '../profile/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Profile } from '@/app/api/types'
import { useAuth } from '@/app/hooks/use-auth'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

export interface UserNavProps {
  profile: Profile
}

export function UserNav({ profile }: UserNavProps) {
  const { logout } = useAuth()

  const router = useRouter()

  const queryClient = useQueryClient()

  const handleLogout = async () => {
    logout().then(res => {
      if (res.error)
        return toast({
          title: 'Whoops!',
          description: res.error,
          status: 'error',
        })

      queryClient.clear()

      router.push('/')
      router.refresh
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="flex justify-between w-max"
        >
          <div className="flex flex-row items-center gap-2">
            <ProfileAvatar
              src={'https://github.com/shadcn.png'}
              displayName={'Username'}
              className="bg-black text-white dark:bg-white dark:text-black w-6 h-6 text-base"
            />

            <span className="truncate max-w-[75px] md:max-w-[100px]">
              Username
            </span>
          </div>

          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

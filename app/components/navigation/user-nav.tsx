'use client'

import { CaretSortIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '../ui/button'
import { ProfileAvatar } from '../profile/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { toast } from '../ui/use-toast'

import { useAuth } from '@/app/hooks/use-auth'
import { User } from '@/app/api/types'
import Link from 'next/link'

export interface UserNavProps {
  profile?: User
}

export function UserNav({ profile }: UserNavProps) {
  const { logout } = useAuth()

  const router = useRouter()

  const queryClient = useQueryClient()

  const handleLogout = async () => {
    const response = await logout()

    if (response.error)
      return toast({
        title: 'Whoops!',
        description: response.error,
        variant: 'destructive',
      })

    queryClient.clear()

    router.push('/')
    router.refresh()
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
              {profile?.username}
            </span>
          </div>

          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <Link href="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>

        <DropdownMenuItem onClick={() => handleLogout()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

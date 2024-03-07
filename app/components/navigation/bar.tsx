import Link from 'next/link'

import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'

import { UserNav } from './user-nav'

import { User } from '@/app/api/types'

export interface NavbarProps {
  profile?: User
}

export function Navbar({ profile }: NavbarProps) {
  return (
    <header className="flex flex-row items-center justify-between top-0 sticky border-b border-border p-2">
      <Link href="/">
        <span className="text-2xl font-semibold">Forum</span>
      </Link>

      <div className="flex flex-row gap-2 justify-center items-center">
        {profile?.username ? (
          <UserNav profile={profile} />
        ) : (
          <>
            <Link href="/register">
              <Button variant="outline">Sign up</Button>
            </Link>

            <Link href="/login">
              <Button>Log in</Button>
            </Link>
          </>
        )}

        <ModeToggle />
      </div>
    </header>
  )
}

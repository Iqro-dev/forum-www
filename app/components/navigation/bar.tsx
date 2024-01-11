import Link from 'next/link'
import { ModeToggle } from '../mode-toggle'
import { UserNav } from './user-nav'
import { Button } from '../ui/button'
import { Profile } from '@/app/api/types'

export interface NavbarProps {
  profile?: Profile
}

export function Navbar({ profile }: NavbarProps) {
  return (
    <header className="flex flex-row items-center justify-between top-0 sticky border-b border-border p-2">
      <span className="text-2xl font-semibold">Forum</span>

      <div className="flex flex-row gap-2 justify-center items-center">
        {profile ? (
          <UserNav profile={profile} />
        ) : (
          <Link href="/login">
            <Button>Log in</Button>
          </Link>
        )}

        <ModeToggle />
      </div>
    </header>
  )
}

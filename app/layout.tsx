import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './components/providers/theme-provider'
import { Navbar } from './components/navigation/bar'
import { Toaster } from './components/ui/toaster'
import { LayoutProps } from './types/props'
import { cookies } from 'next/headers'
import { ACCESS_TOKEN } from './api/constants'
import { getProfile } from './api/fetchers/get-profile'
import { RootProviders } from './providers'

export const metadata: Metadata = {
  title: 'Forum',
  description: '1.0 version',
}

export default async function RootLayout({ children }: LayoutProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const profile = await getProfile(accessToken)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <RootProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar profile={profile} />

            {children}

            <Toaster />
          </ThemeProvider>
        </RootProviders>
      </body>
    </html>
  )
}

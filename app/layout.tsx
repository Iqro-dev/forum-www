import './globals.css'
import { cookies } from 'next/headers'
import { type Metadata } from 'next'

import { ThemeProvider } from './components/providers/theme-provider'
import { Navbar } from './components/navigation/bar'
import { Toaster } from './components/ui/toaster'
import { LayoutProps } from './types/props'
import { ACCESS_TOKEN } from './api/constants'
import { getProfile } from './api/fetchers/get-profile'
import { RootProviders } from './providers'
import { TooltipProvider } from './components/ui/tooltip'

export const metadata: Metadata = {
  title: 'Forum',
  description: '1.0 version',
}

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const profile = await getProfile(accessToken)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <RootProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <Navbar profile={profile} />

              <div className="flex justify-center">{children}</div>

              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </RootProviders>
      </body>
    </html>
  )
}

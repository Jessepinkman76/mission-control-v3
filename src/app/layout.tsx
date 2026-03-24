import type { Metadata } from 'next'
import './globals.css'
import { MobileHeader, DesktopSidebar } from '../components/Navigation'

export const metadata: Metadata = {
  title: 'Mission Control - Empire Julien',
  description: 'Dashboard central de supervision des agents IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-zinc-950 text-zinc-100">
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <DesktopSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Mobile Header */}
            <MobileHeader />
            
            {/* Page Content */}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

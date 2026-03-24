'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  id: string
  label: string
  emoji: string
  href: string
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', emoji: '📊', href: '/' },
  { id: 'agents', label: 'Agents', emoji: '👥', href: '/agents' },
  { id: 'tasks', label: 'Tâches', emoji: '📋', href: '/tasks' },
  { id: 'stats', label: 'Stats', emoji: '📈', href: '/stats' },
]

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <span className="text-lg">🧪</span>
            </div>
            <span className="font-bold text-lg">Mission Control</span>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`lg:hidden fixed top-14 left-0 bottom-0 w-72 z-50 bg-[#111118] border-r border-white/[0.06] transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                    : 'hover:bg-white/[0.04] text-slate-300'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </Link>
            )
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold">
              J
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Julien</p>
              <p className="text-xs text-slate-500">CEO Empire</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for fixed header */}
      <div className="lg:hidden h-14" />
    </>
  )
}

export function DesktopSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[#111118] border-r border-white/[0.06] min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-xl">🧪</span>
          </div>
          <div>
            <span className="font-bold text-lg">Mission Control</span>
            <p className="text-xs text-slate-500">v3.0</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                  : 'hover:bg-white/[0.04] text-slate-300 hover:text-slate-100'
              }`}
            >
              <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'grayscale-0' : 'grayscale-[0.3]'}`}>
                {item.emoji}
              </span>
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50" />
              )}
            </Link>
          )
        })}
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14141c] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold shadow-lg shadow-violet-500/25">
            J
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Julien</p>
            <p className="text-xs text-slate-500">CEO Empire</p>
          </div>
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </aside>
  )
}

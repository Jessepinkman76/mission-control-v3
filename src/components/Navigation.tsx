'use client'

import { useState } from 'react'
import Link from 'next/link'

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

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧪</span>
            <span className="font-bold text-lg">Mission Control</span>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
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
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`lg:hidden fixed top-14 left-0 bottom-0 w-64 z-40 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Spacer for fixed header */}
      <div className="lg:hidden h-14" />
    </>
  )
}

export function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen">
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧪</span>
          <span className="font-bold text-lg">Mission Control</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-zinc-800">
        <p className="text-xs text-gray-500 text-center">
          Empire Julien • v3.0
        </p>
      </div>
    </aside>
  )
}

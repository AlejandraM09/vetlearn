'use client'
// src/components/layout/Navbar.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LogOut, Bell } from 'lucide-react'
import type { UserSession } from '@/types'

const NAV_LINKS = [
  { href: '/dashboard',  label: 'Inicio' },
  { href: '/modulos',    label: 'Módulos' },
  { href: '/especies',   label: 'Especies' },
  { href: '/quiz',       label: 'Quiz' },
  { href: '/asistente',  label: 'Asistente' },
  { href: '/perfil',     label: 'Perfil' },
]

export default function Navbar({ user }: { user: UserSession }) {
  const pathname = usePathname()
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 h-16 flex items-center justify-between gap-4">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2.5 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
          <span className="text-white text-sm font-display font-bold">V</span>
        </div>
        <span className="font-display font-semibold text-gray-900 hidden sm:block">VetLearn</span>
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href || pathname.startsWith(link.href + '/') ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* XP pill */}
        <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-display font-semibold">
          <span>⭐</span>
          <span>{user.xp} XP</span>
        </div>

        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
          <Bell size={16} />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-display font-semibold">
            {initials}
          </div>
          <span className="hidden lg:block text-sm font-medium text-gray-700">{user.name.split(' ')[0]}</span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors text-gray-400"
          title="Cerrar sesión"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  )
}

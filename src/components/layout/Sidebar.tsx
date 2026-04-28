'use client'
// src/components/layout/Sidebar.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Heart, HelpCircle, MessageCircle, User } from 'lucide-react'

const LINKS = [
  { href: '/dashboard', label: 'Inicio',    icon: LayoutDashboard },
  { href: '/modulos',   label: 'Módulos',   icon: BookOpen },
  { href: '/especies',  label: 'Especies',  icon: Heart },
  { href: '/quiz',      label: 'Quiz',      icon: HelpCircle },
  { href: '/asistente', label: 'VetBot',    icon: MessageCircle },
  { href: '/perfil',    label: 'Mi perfil', icon: User },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-56 border-r border-gray-100 bg-white pt-6 pb-4 px-3 gap-1">
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
              ${active
                ? 'bg-teal-50 text-teal-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <Icon size={16} className={active ? 'text-teal-600' : 'text-gray-400'} />
            {label}
          </Link>
        )
      })}
    </aside>
  )
}

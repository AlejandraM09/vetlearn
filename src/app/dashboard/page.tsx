// src/app/dashboard/page.tsx
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { BookOpen, Heart, HelpCircle, TrendingUp, ChevronRight } from 'lucide-react'

export const metadata = { title: 'Dashboard — VetLearn' }

const QUICK_ACCESS = [
  { href: '/modulos',   label: 'Módulos',   desc: 'Fichas informativas y guías', icon: '📚', color: 'bg-teal-50 text-teal-700', border: 'border-teal-100' },
  { href: '/especies',  label: 'Especies',  desc: 'Parámetros fisiológicos',      icon: '🐾', color: 'bg-blue-50 text-blue-700',  border: 'border-blue-100' },
  { href: '/quiz',      label: 'Quiz',      desc: 'Pon a prueba tu conocimiento', icon: '🧠', color: 'bg-amber-50 text-amber-700', border: 'border-amber-100' },
  { href: '/asistente', label: 'VetBot',    desc: 'Tutor inteligente',            icon: '🤖', color: 'bg-purple-50 text-purple-700', border: 'border-purple-100' },
]

export default async function DashboardPage() {
  const session = await auth()
  const user = session!.user

  const [modulesCount, attemptsData] = await Promise.all([
    prisma.moduleProgress.count({ where: { userId: user.id, completed: true } }),
    prisma.quizAttempt.aggregate({
      where: { userId: user.id },
      _avg: { score: true },
      _count: true,
    }),
  ])

  const avgScore = attemptsData._avg.score
    ? Math.round((attemptsData._avg.score / 3) * 100)
    : 0

  const stats = [
    { label: 'Módulos completados', value: modulesCount, icon: '📚', color: 'text-teal-600' },
    { label: 'Promedio en quizzes', value: `${avgScore}%`, icon: '📊', color: 'text-blue-600' },
    { label: 'Quiz realizados', value: attemptsData._count, icon: '🧠', color: 'text-amber-600' },
    { label: 'Nivel actual', value: `Nivel ${user.level}`, icon: '⭐', color: 'text-purple-600' },
  ]

  const firstName = user.name.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="flex flex-col gap-8 animate-slide-up">
      {/* Hero */}
      <div className="card p-8 bg-gradient-to-r from-teal-600 to-teal-500 text-white border-0 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5" />
        <div className="relative z-10">
          <p className="text-teal-100 text-sm font-medium mb-1">{greeting},</p>
          <h1 className="font-display text-3xl font-semibold mb-2">{firstName} 👋</h1>
          <p className="text-teal-100 text-sm mb-6 max-w-md">
            Continúa tu aprendizaje en veterinaria. Tienes contenido nuevo esperándote.
          </p>
          <div className="flex gap-3">
            <Link href="/modulos" className="bg-white text-teal-700 rounded-xl px-5 py-2.5 text-sm font-display font-semibold hover:bg-teal-50 transition-colors">
              Continuar aprendiendo
            </Link>
            <Link href="/especies" className="border border-white/30 text-white rounded-xl px-5 py-2.5 text-sm font-display hover:bg-white/10 transition-colors">
              Ver especies
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`font-display text-2xl font-semibold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div>
        <h2 className="section-title mb-4">Acceso rápido</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACCESS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`card p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border ${item.border} group`}
            >
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-xl mb-3`}>
                {item.icon}
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-sm mb-1">{item.label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              <ChevronRight size={14} className="text-gray-400 mt-3 group-hover:text-teal-600 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended today */}
      <div>
        <h2 className="section-title mb-4">Aprende hoy</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Link href="/modulos/tipos-agujas" className="card p-6 hover:shadow-md transition-all hover:-translate-y-0.5 border-l-4 border-teal-400 group">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💉</span>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-gray-900 mb-1">Tipos de agujas</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Calibres, usos y vías de administración. Esencial para cualquier procedimiento.</p>
                <span className="badge-tag bg-teal-50 text-teal-700 mt-3">Módulo recomendado</span>
              </div>
            </div>
          </Link>
          <Link href="/especies" className="card p-6 hover:shadow-md transition-all hover:-translate-y-0.5 group">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🐕</span>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-gray-900 mb-1">Parámetros del perro</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Consulta temperatura, FC, FR y más valores fisiológicos del paciente más común.</p>
                <span className="badge-tag bg-blue-50 text-blue-700 mt-3">Consulta rápida</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

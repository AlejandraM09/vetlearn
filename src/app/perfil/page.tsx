// src/app/perfil/page.tsx
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Mi perfil — VetLearn' }

export default async function PerfilPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      badges: { include: { badge: true }, orderBy: { earnedAt: 'desc' } },
      quizAttempts: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { quiz: { select: { title: true } } },
      },
      progress: {
        where: { completed: true },
        include: { module: { select: { title: true, icon: true } } },
      },
    },
  })

  if (!user) redirect('/login')

  const allBadges = await prisma.badge.findMany({ orderBy: { xpReward: 'asc' } })
  const earnedIds = new Set(user.badges.map(ub => ub.badgeId))

  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const xpForNextLevel = user.level * 1000
  const xpPct = Math.round((user.xp % xpForNextLevel) / xpForNextLevel * 100)

  return (
    <div className="flex flex-col gap-6 animate-slide-up max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-gray-900">Mi perfil</h1>

      {/* Profile card */}
      <div className="card p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-display text-2xl font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500 mt-0.5">@{user.username} · {user.role === 'ADMIN' ? '👑 Administrador' : '🎓 Estudiante'}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="badge-tag bg-amber-50 text-amber-700">Nivel {user.level}</span>
            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${xpPct}%` }} />
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">{user.xp} / {xpForNextLevel} XP</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Módulos completados', value: user.progress.length, icon: '📚' },
          { label: 'Quiz realizados',     value: user.quizAttempts.length, icon: '🧠' },
          { label: 'Insignias ganadas',   value: user.badges.length, icon: '🏅' },
        ].map(s => (
          <div key={s.label} className="card p-5 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-display text-2xl font-semibold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div>
        <h2 className="section-title mb-3">Logros e insignias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {allBadges.map(badge => {
            const earned = earnedIds.has(badge.id)
            return (
              <div
                key={badge.id}
                className={`card p-4 text-center transition-all ${earned ? '' : 'opacity-40 grayscale'}`}
              >
                <span className="text-3xl block mb-2">{badge.icon}</span>
                <p className="font-display text-sm font-semibold text-gray-900">{badge.name}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{badge.description}</p>
                {earned && (
                  <span className="badge-tag bg-green-50 text-green-700 mt-2 text-[10px]">✓ Obtenido</span>
                )}
                {!earned && (
                  <span className="badge-tag bg-gray-50 text-gray-400 mt-2 text-[10px]">Bloqueado</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent quiz history */}
      {user.quizAttempts.length > 0 && (
        <div>
          <h2 className="section-title mb-3">Historial de quizzes</h2>
          <div className="card divide-y divide-gray-100">
            {user.quizAttempts.map(attempt => {
              const pct = Math.round((attempt.score / attempt.total) * 100)
              return (
                <div key={attempt.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm flex-shrink-0
                    ${pct >= 70 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                    {pct}%
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{attempt.quiz.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {attempt.score}/{attempt.total} correctas · +{attempt.xpEarned} XP
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(attempt.createdAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Completed modules */}
      {user.progress.length > 0 && (
        <div>
          <h2 className="section-title mb-3">Módulos completados</h2>
          <div className="flex flex-wrap gap-2">
            {user.progress.map(p => (
              <span key={p.id} className="badge-tag bg-teal-50 text-teal-700 border border-teal-100">
                {p.module.icon} {p.module.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

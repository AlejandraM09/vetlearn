// src/app/modulos/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import Link from 'next/link'

export const metadata = { title: 'Módulos — VetLearn' }

export default async function ModulosPage() {
  const session = await auth()

  const modules = await prisma.module.findMany({
    where: { published: true },
    include: {
      _count: { select: { cards: true } },
      progress: { where: { userId: session!.user.id } },
    },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="flex flex-col gap-6 animate-slide-up">
      <div>
        <h1 className="font-display text-2xl font-semibold text-gray-900">Módulos educativos</h1>
        <p className="text-gray-500 text-sm mt-1">Aprende con fichas informativas, imágenes y consejos prácticos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map(mod => {
          const progress = mod.progress[0]
          const pct = progress?.percentage ?? 0
          return (
            <Link
              key={mod.slug}
              href={`/modulos/${mod.slug}`}
              className="card p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: mod.color + '20' }}
                >
                  {mod.icon}
                </div>
                {progress?.completed && (
                  <span className="badge-tag bg-green-50 text-green-700">✓ Completado</span>
                )}
              </div>

              <div>
                <h2 className="font-display font-semibold text-gray-900 mb-1">{mod.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{mod.description}</p>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                  <span>{mod._count.cards} fichas</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: mod.color }}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

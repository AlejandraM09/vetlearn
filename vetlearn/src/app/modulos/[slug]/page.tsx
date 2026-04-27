// src/app/modulos/[slug]/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Lightbulb } from 'lucide-react'

export async function generateStaticParams() {
  const mods = await prisma.module.findMany({ select: { slug: true } })
  return mods.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const m = await prisma.module.findUnique({ where: { slug: params.slug } })
  return { title: m ? `${m.title} — VetLearn` : 'Módulo — VetLearn' }
}

export default async function ModuleDetailPage({ params }: { params: { slug: string } }) {
  const mod = await prisma.module.findUnique({
    where: { slug: params.slug },
    include: { cards: { orderBy: { order: 'asc' } } },
  })

  if (!mod) notFound()

  return (
    <div className="flex flex-col gap-6 animate-slide-up max-w-3xl">
      <Link href="/modulos" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 transition-colors">
        <ChevronLeft size={14} /> Módulos
      </Link>

      {/* Header */}
      <div className="card p-6" style={{ borderLeft: `4px solid ${mod.color}` }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: mod.color + '20' }}>
            {mod.icon}
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-gray-900">{mod.title}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{mod.description}</p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-5">
        {mod.cards.map((card, i) => (
          <div key={card.id} className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-display font-bold text-white"
                style={{ background: mod.color }}
              >
                {i + 1}
              </span>
              <h2 className="font-display font-semibold text-gray-900">{card.title}</h2>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">{card.content}</p>

            {card.tips.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={14} className="text-amber-600" />
                  <span className="text-xs font-display font-semibold text-amber-700 uppercase tracking-wide">Consejos prácticos</span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {card.tips.map((tip, j) => (
                    <li key={j} className="text-sm text-amber-800 flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

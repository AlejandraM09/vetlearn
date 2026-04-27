// src/app/especies/[slug]/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import SpeciesChecker from '@/components/species/SpeciesChecker'

export async function generateStaticParams() {
  const species = await prisma.species.findMany({ select: { slug: true } })
  return species.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const sp = await prisma.species.findUnique({ where: { slug: params.slug } })
  return { title: sp ? `${sp.name} — VetLearn` : 'Especie — VetLearn' }
}

export default async function SpeciesDetailPage({ params }: { params: { slug: string } }) {
  const session = await auth()

  const species = await prisma.species.findUnique({
    where: { slug: params.slug },
    include: {
      parameters: { orderBy: { order: 'asc' } },
      favorites: { where: { userId: session!.user.id } },
    },
  })

  if (!species) notFound()

  const isFavorite = species.favorites.length > 0

  return (
    <div className="flex flex-col gap-6 animate-slide-up max-w-3xl">
      <Link href="/especies" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 transition-colors">
        <ChevronLeft size={14} /> Volver a especies
      </Link>

      {/* Header */}
      <div className="card p-6 flex items-center gap-5">
        <span className="text-6xl">{species.emoji}</span>
        <div>
          <h1 className="font-display text-2xl font-semibold text-gray-900">{species.name}</h1>
          <p className="text-gray-400 italic text-sm mt-0.5">{species.latinName}</p>
          <div className="flex gap-2 mt-3">
            <span className="badge-tag bg-teal-50 text-teal-700">
              {species.parameters.length} parámetros
            </span>
            {isFavorite && (
              <span className="badge-tag bg-red-50 text-red-500">❤ Favorita</span>
            )}
          </div>
        </div>
      </div>

      {/* Parameters grid */}
      <div>
        <h2 className="section-title mb-3">Valores de referencia</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {species.parameters.map(p => (
            <div key={p.id} className="param-card">
              <div className="status-dot bg-green-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">{p.label}</span>
              <div className="font-display text-xl font-semibold text-gray-900">
                {p.value} <span className="text-sm font-normal text-gray-400">{p.unit}</span>
              </div>
              <span className="text-xs text-gray-400">Rango: {p.rangeMin} – {p.rangeMax} {p.unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive checker */}
      <SpeciesChecker parameters={species.parameters} />
    </div>
  )
}

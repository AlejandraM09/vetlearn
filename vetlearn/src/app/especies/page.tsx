// src/app/especies/page.tsx
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata = { title: 'Especies — VetLearn' }

export default async function EspeciesPage() {
  const session = await auth()

  const species = await prisma.species.findMany({
    include: {
      _count: { select: { favorites: true } },
      favorites: { where: { userId: session!.user.id } },
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="flex flex-col gap-6 animate-slide-up">
      <div>
        <h1 className="font-display text-2xl font-semibold text-gray-900">Parámetros fisiológicos</h1>
        <p className="text-gray-500 text-sm mt-1">Selecciona una especie para ver sus parámetros normales y verificar tus mediciones.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {species.map(sp => (
          <Link
            key={sp.slug}
            href={`/especies/${sp.slug}`}
            className="card p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
          >
            <span className="text-5xl block mb-3">{sp.emoji}</span>
            <h2 className="font-display font-semibold text-gray-900">{sp.name}</h2>
            <p className="text-xs text-gray-400 mt-1 italic">{sp.latinName}</p>
            <div className="mt-3 text-xs text-teal-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Ver parámetros →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

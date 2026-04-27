// src/app/api/species/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const species = await prisma.species.findMany({
    include: {
      parameters: { orderBy: { order: 'asc' } },
      favorites: { where: { userId: session.user.id } },
    },
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(
    species.map(sp => ({
      ...sp,
      isFavorite: sp.favorites.length > 0,
      favorites: undefined,
    }))
  )
}

// src/app/api/species/[slug]/favorite/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(_req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const species = await prisma.species.findUnique({ where: { slug: params.slug } })
  if (!species) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const existing = await prisma.favoriteSpecies.findUnique({
    where: { userId_speciesId: { userId: session.user.id, speciesId: species.id } },
  })

  if (existing) {
    await prisma.favoriteSpecies.delete({ where: { id: existing.id } })
    return NextResponse.json({ isFavorite: false })
  } else {
    await prisma.favoriteSpecies.create({
      data: { userId: session.user.id, speciesId: species.id },
    })
    return NextResponse.json({ isFavorite: true })
  }
}

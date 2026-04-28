// src/app/api/quiz/attempt/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({
  quizId:  z.string(),
  score:   z.number().int().min(0),
  total:   z.number().int().min(1),
  answers: z.array(z.number()),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })

  const { quizId, score, total, answers } = parsed.data
  const xpEarned = score * 50

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId:   session.user.id,
      quizId,
      score,
      total,
      xpEarned,
      answers,
    },
  })

  // Update user XP
  await prisma.user.update({
    where: { id: session.user.id },
    data:  { xp: { increment: xpEarned } },
  })

  return NextResponse.json({ attempt, xpEarned })
}

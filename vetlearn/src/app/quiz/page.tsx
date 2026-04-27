// src/app/quiz/page.tsx
import { prisma } from '@/lib/prisma'
import QuizClient from '@/components/quiz/QuizClient'

export const metadata = { title: 'Quiz — VetLearn' }

export default async function QuizPage() {
  const quizzes = await prisma.quiz.findMany({
    include: {
      questions: { orderBy: { order: 'asc' } },
      _count: { select: { attempts: true } },
    },
  })

  return (
    <div className="flex flex-col gap-6 animate-slide-up max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-gray-900">Quiz interactivo</h1>
        <p className="text-gray-500 text-sm mt-1">Responde correctamente para ganar XP y avanzar de nivel.</p>
      </div>
      {quizzes.map(quiz => (
        <QuizClient key={quiz.id} quiz={quiz} />
      ))}
    </div>
  )
}

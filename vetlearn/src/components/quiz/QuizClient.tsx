'use client'
// src/components/quiz/QuizClient.tsx
import { useState } from 'react'
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react'
import type { QuizWithQuestions } from '@/types'

export default function QuizClient({ quiz }: { quiz: QuizWithQuestions }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [xp, setXp] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const q = quiz.questions[current]
  const total = quiz.questions.length
  const pct = Math.round((current / total) * 100)

  const handleSelect = (i: number) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === q.correctIndex) {
      setXp(x => x + 50)
      setCorrect(c => c + 1)
    }
  }

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setDone(true)
    }
  }

  const reset = () => {
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setXp(0)
    setCorrect(0)
    setDone(false)
  }

  if (done) {
    const pctScore = Math.round((correct / total) * 100)
    return (
      <div className="card p-8 text-center">
        <span className="text-6xl block mb-4">{pctScore >= 70 ? '🎉' : '📚'}</span>
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">
          {pctScore >= 70 ? '¡Excelente!' : 'Sigue practicando'}
        </h2>
        <p className="text-gray-500 mb-6">
          {correct} de {total} correctas · {xp} XP ganados
        </p>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
          <div
            className={`h-full rounded-full transition-all ${pctScore >= 70 ? 'bg-green-400' : 'bg-amber-400'}`}
            style={{ width: `${pctScore}%` }}
          />
        </div>
        <button onClick={reset} className="btn-outline gap-2">
          <RotateCcw size={14} /> Intentar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="card p-6 flex flex-col gap-5">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display font-semibold text-gray-800">{quiz.title}</h2>
          <span className="text-xs text-gray-400">{current + 1} / {total}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Question */}
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Pregunta {current + 1}</p>
        <h3 className="font-display font-semibold text-gray-900 text-base leading-snug">{q.text}</h3>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option'
          if (answered) {
            if (i === q.correctIndex) cls += ' correct'
            else if (i === selected && i !== q.correctIndex) cls += ' wrong'
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              <span className="inline-flex items-center gap-2">
                {answered && i === q.correctIndex && <CheckCircle size={14} className="text-green-600 flex-shrink-0" />}
                {answered && i === selected && i !== q.correctIndex && <XCircle size={14} className="text-red-500 flex-shrink-0" />}
                {opt}
              </span>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div className={`p-4 rounded-xl text-sm leading-relaxed ${selected === q.correctIndex ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <strong>{selected === q.correctIndex ? '✓ Correcto. ' : '✗ Incorrecto. '}</strong>
          {q.explanation}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">⭐ {xp} XP acumulados</span>
        {answered && (
          <button onClick={handleNext} className="btn-primary">
            {current < total - 1 ? 'Siguiente' : 'Ver resultado'}
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  )
}

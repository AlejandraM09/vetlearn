'use client';

import { useMemo, useState } from 'react';

const questions = [
  {
    question: '¿Cuál es la temperatura normal de un perro adulto?',
    options: ['35.5 - 36.7°C', '38.3 - 39.2°C', '40.0 - 41.5°C'],
    answer: '38.3 - 39.2°C',
  },
  {
    question: '¿Qué instrumento se usa para medir profundidad de bolsas periodontales?',
    options: ['Sonda periodontal', 'Portagujas', 'Aguja hipodérmica'],
    answer: 'Sonda periodontal',
  },
  {
    question: '¿Cuál es el tiempo de llenado capilar normal en un gato?',
    options: ['≤ 2 segundos', '4 - 5 segundos', 'No aplica'],
    answer: '≤ 2 segundos',
  },
];

export function InteractiveQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const currentQuestion = questions[index];

  const feedback = useMemo(() => {
    if (!selected) return '';
    return selected === currentQuestion.answer ? '¡Correcto!' : `La respuesta correcta es: ${currentQuestion.answer}`;
  }, [selected, currentQuestion]);

  const handleNext = () => {
    if (!selected) return;
    if (selected === currentQuestion.answer) {
      setScore((value) => value + 1);
    }
    setSelected(null);
    if (index + 1 < questions.length) {
      setIndex((value) => value + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-secondary">Quiz interactivo</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Refuerza tus conocimientos básicos</h2>
        </div>
        <div className="rounded-full bg-primary/10 px-4 py-2 text-primary">{score} / {questions.length}</div>
      </div>

      {!completed ? (
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-lg font-semibold text-slate-900">{currentQuestion.question}</p>
          </div>
          <div className="grid gap-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                className={`w-full rounded-3xl border px-5 py-4 text-left transition ${selected === option ? 'border-primary bg-primary/10 text-slate-900' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-primary'}`}
              >
                {option}
              </button>
            ))}
          </div>
          {selected && <p className="text-sm text-slate-600">{feedback}</p>}
          <button
            type="button"
            disabled={!selected}
            onClick={handleNext}
            className="inline-flex items-center rounded-3xl bg-primary px-6 py-3 text-white transition hover:bg-[#125835] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {index + 1 < questions.length ? 'Siguiente pregunta' : 'Ver resultado'}
          </button>
        </div>
      ) : (
        <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-slate-800">
          <p className="text-xl font-semibold">Quiz completado</p>
          <p className="mt-3">Obtuviste {score} de {questions.length} respuestas correctas.</p>
          <p className="mt-2 text-slate-600">Repasa las preguntas para mejorar tu rapidez diagnóstica.</p>
        </div>
      )}
    </div>
  );
}

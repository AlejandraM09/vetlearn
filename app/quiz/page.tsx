import { InteractiveQuiz } from '@/components/interactive-quiz';

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">Evaluación práctica</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Quiz interactivo de veterinaria</h1>
          <p className="mt-4 text-slate-600">Pon a prueba tus conocimientos con preguntas de opción múltiple y recibe retroalimentación inmediata.</p>
        </section>

        <InteractiveQuiz />
      </div>
    </main>
  );
}

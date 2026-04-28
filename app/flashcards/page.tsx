import { FlashcardsWidget } from '@/components/flashcards-widget';

export default function FlashcardsPage() {
  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">Refuerzo visual</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Flashcards educativas</h1>
          <p className="mt-4 text-slate-600">Repasa términos clave de veterinaria con tarjetas prácticas y fáciles de memorizar.</p>
        </section>

        <FlashcardsWidget />
      </div>
    </main>
  );
}

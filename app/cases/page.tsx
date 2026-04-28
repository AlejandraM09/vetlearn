import Link from 'next/link';
import { getCaseStudies } from '@/lib/dataService';

export default async function CasesPage() {
  const cases = await getCaseStudies();

  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-secondary">Casos clínicos</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">Toma decisiones con escenarios reales</h1>
              <p className="mt-4 max-w-2xl text-slate-600">Elige el instrumento correcto, interpreta signos clínicos y recibe retroalimentación educativa al instante.</p>
            </div>
            <Link href="/" className="rounded-full bg-primary px-6 py-3 text-white transition hover:bg-[#125835]">Ir al inicio</Link>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
          {cases.map((caseStudy) => (
            <article key={caseStudy.slug} className="rounded-3xl bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
              <div className="inline-flex items-center gap-3 rounded-full bg-red-100 px-4 py-2 text-red-700 text-sm font-semibold">{caseStudy.category}</div>
              <h2 className="mt-6 text-2xl font-semibold text-slate-900">{caseStudy.title}</h2>
              <p className="mt-4 text-slate-600">{caseStudy.summary}</p>
              <Link href={`/cases/${caseStudy.slug}`} className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-white transition hover:bg-[#125835]">Ver caso</Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

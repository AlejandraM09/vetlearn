import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCaseBySlug } from '@/lib/dataService';

interface CasePageProps {
  params: { slug: string };
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const caseStudy = await getCaseBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-secondary">Caso clínico</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">{caseStudy.title}</h1>
              <p className="mt-4 text-slate-600">{caseStudy.summary}</p>
            </div>
            <Link href="/cases" className="rounded-full bg-primary px-6 py-3 text-white transition hover:bg-[#125835]">Volver a casos</Link>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Escenario</h2>
          <p className="mt-4 text-slate-600">{caseStudy.scenario}</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {caseStudy.decisions.map((decision) => (
            <article key={decision.label} className="rounded-3xl bg-slate-50 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{decision.label}</h3>
              <p className="mt-3 text-slate-600">{decision.description}</p>
              <div className="mt-4 rounded-3xl bg-white p-4 text-slate-700">
                <p className="font-semibold">Retroalimentación:</p>
                <p className="mt-2">{decision.feedback}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

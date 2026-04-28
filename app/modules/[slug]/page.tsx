import { notFound } from 'next/navigation';
import { getModuleBySlug } from '@/lib/dataService';

interface ModulePageProps {
  params: { slug: string };
}

export default async function ModuleDetailPage({ params }: ModulePageProps) {
  const module = await getModuleBySlug(params.slug);

  if (!module) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">Módulo educativo</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">{module.title}</h1>
          <p className="mt-4 text-slate-600">{module.description}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-secondary">Lecciones</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{module.lessons}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-secondary">Especial</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{module.highlight}</p>
            </div>
          </div>
        </section>

        {module.details && (
          <section className="rounded-3xl bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-900">{module.details.overview}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {module.details.cards.map((card: { title: string; description: string }) => (
                <article key={card.title} className="rounded-3xl bg-slate-50 p-6">
                  <h3 className="font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-slate-600">{card.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

import { notFound } from 'next/navigation';
import { getSpeciesBySlug, getSpecies } from '@/lib/dataService';

interface SpeciesPageProps {
  params: { slug: string };
}

export default async function SpeciesDetailPage({ params }: SpeciesPageProps) {
  const speciesList = await getSpecies();
  const species = speciesList.find((item) => item.slug === params.slug);
  const details = await getSpeciesBySlug(params.slug);

  if (!species || !details) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">Ficha clínica</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">{species.name}</h1>
          <p className="mt-3 text-slate-600">{species.subtitle} — consulta los valores vitales y compara con otras especies.</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-900">Rangos fisiológicos</h2>
            <div className="mt-6 space-y-4 text-slate-700">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-secondary">Temperatura</p>
                <p className="mt-2 text-xl font-semibold">{details.temperature}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-secondary">Frecuencia cardíaca</p>
                <p className="mt-2 text-xl font-semibold">{details.heartRate}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-secondary">Frecuencia respiratoria</p>
                <p className="mt-2 text-xl font-semibold">{details.respiratoryRate}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-secondary">Peso promedio</p>
                <p className="mt-2 text-xl font-semibold">{details.weightRange}</p>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl bg-gradient-to-br from-primary/10 to-surface p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Consulta rápida</p>
            <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-lg font-semibold text-slate-900">Llenado capilar</p>
              <p className="mt-3 text-slate-600">{details.capillaryRefill}</p>
            </div>
            <button className="mt-6 w-full rounded-3xl bg-primary px-5 py-4 text-white transition hover:bg-[#125835]">Marcar como favorito</button>
          </aside>
        </section>
      </div>
    </main>
  );
}

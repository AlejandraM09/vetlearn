import { SpeciesCard } from '@/components/species-card';
import { getSpecies } from '@/lib/dataService';

export default async function PhysiologyPage() {
  const speciesList = await getSpecies();

  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-secondary">Parámetros fisiológicos</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">Selecciona una especie para consultar valores clínicos</h1>
              <p className="mt-4 max-w-2xl text-slate-600">Temperatura, frecuencia cardíaca, respiratoria y otras referencias clave para cada animal.</p>
            </div>
            <div className="rounded-3xl bg-primary/10 p-6 text-primary shadow-soft">
              <p className="font-semibold">Modo consulta rápida</p>
              <p className="mt-2 text-sm text-slate-700">Revisa rangos normales y compara especies con un solo clic.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
          {speciesList.map((species) => (
            <SpeciesCard key={species.slug} species={species} />
          ))}
        </section>
      </div>
    </main>
  );
}

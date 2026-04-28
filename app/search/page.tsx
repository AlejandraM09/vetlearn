import { SearchPanel } from '@/components/search-panel';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">Buscador inteligente</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Encuentra contenido por palabra clave</h1>
          <p className="mt-4 text-slate-600">Explora módulos, parámetros y temas rápidos con autocompletado y resultados organizados.</p>
        </section>

        <SearchPanel />
      </div>
    </main>
  );
}

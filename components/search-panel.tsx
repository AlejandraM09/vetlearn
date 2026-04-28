'use client';

import { useEffect, useState } from 'react';

interface SearchResult {
  modules: Array<{ slug: string; title: string; description: string }>;
  topics: string[];
}

export function SearchPanel() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({ modules: [], topics: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults({ modules: [], topics: [] });
      return;
    }

    const token = setTimeout(async () => {
      setLoading(true);
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
      setLoading(false);
    }, 250);

    return () => clearTimeout(token);
  }, [query]);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      <label className="relative block w-full">
        <span className="sr-only">Buscar</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Busca por palabra clave, módulo o caso..."
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
      </label>
      <div className="mt-6 space-y-4">
        {loading && <p className="text-sm text-slate-500">Buscando...</p>}
        {!loading && !query && <p className="text-sm text-slate-500">Escribe para explorar contenidos por categoría y palabras clave.</p>}

        {query && !loading && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-secondary">Resultados de módulos</h3>
              {results.modules.length ? (
                <ul className="mt-4 space-y-3">
                  {results.modules.map((module) => (
                    <li key={module.slug} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="font-semibold text-slate-900">{module.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{module.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-slate-500">No se encontraron módulos para esta búsqueda.</p>
              )}
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-secondary">Temas rápidos</h3>
              {results.topics.length ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {results.topics.map((topic) => (
                    <span key={topic} className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">{topic}</span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">No hay coincidencias en temas rápidos.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

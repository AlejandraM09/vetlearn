import Link from 'next/link';

export interface SpeciesCardProps {
  species: {
    name: string;
    subtitle: string;
    image: string;
    slug: string;
  };
}

export function SpeciesCard({ species }: SpeciesCardProps) {
  return (
    <Link href={`/physiology/${species.slug}`} className="group block overflow-hidden rounded-3xl bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-3xl bg-slate-100 p-3 text-3xl flex items-center justify-center">🐾</div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">{species.subtitle}</p>
          <h3 className="text-xl font-semibold text-slate-900">{species.name}</h3>
        </div>
      </div>
      <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-slate-600">Consulta rangos vitales y notas clínicas para esta especie.</div>
    </Link>
  );
}

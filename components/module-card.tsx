import Link from 'next/link';

export interface ModuleCardProps {
  module: {
    title: string;
    description: string;
    category: string;
    lessons: number;
    slug: string;
    highlight: string;
  };
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link href={`/modules/${module.slug}`} className="group block overflow-hidden rounded-3xl bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{module.category}</div>
      <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-primary">{module.title}</h3>
      <p className="mt-3 text-slate-600">{module.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span>{module.lessons} lecciones</span>
        <span>{module.highlight}</span>
      </div>
    </Link>
  );
}

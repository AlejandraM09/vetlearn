import Link from 'next/link';
import { ModuleCard } from '@/components/module-card';
import { getModules } from '@/lib/dataService';

export default async function ModulesPage() {
  const modules = await getModules();

  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-secondary">Módulos educativos</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">Biblioteca de herramientas veterinarias</h1>
              <p className="mt-4 max-w-2xl text-slate-600">Aprende con recursos visuales, fichas y consejos prácticos para cada instrumento y procedimiento.</p>
            </div>
            <Link href="/" className="rounded-full bg-primary px-6 py-3 text-white transition hover:bg-[#125835]">Volver al inicio</Link>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </section>
      </div>
    </main>
  );
}

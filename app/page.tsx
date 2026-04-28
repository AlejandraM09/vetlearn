import Link from 'next/link';
import { SearchBar } from '@/components/search-bar';
import { ModuleCard } from '@/components/module-card';
import { ProgressSummary } from '@/components/progress-summary';
import { featuredTopics, quickModules, recommendedModules } from '@/data/mockData';

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-6 md:px-10 bg-surface text-slate-900">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 rounded-3xl bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-secondary">Bienvenida, estudiante</p>
              <h1 className="text-4xl font-semibold text-slate-900">Aprende veterinaria con claridad y práctica.</h1>
              <p className="max-w-2xl text-slate-600">Explora módulos didácticos, consulta parámetros fisiológicos y refuerza tus decisiones con casos clínicos interactivos.</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/5 p-6 text-slate-900 shadow-soft">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Progreso del curso</p>
              <p className="mt-4 text-3xl font-semibold">75%</p>
              <p className="text-sm text-slate-500 mt-2">3 módulos restantes · Sigue con tu práctica diaria</p>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] mb-10">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold mb-4">Búsqueda clínica rápida</h2>
              <SearchBar placeholder="Buscar temas, instrumentos o casos..." />
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
                {featuredTopics.map((topic) => (
                  <span key={topic} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">{topic}</span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {quickModules.map((module) => (
                <Link key={module.slug} href={module.href} className="rounded-3xl bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
                  <p className="text-sm uppercase tracking-[0.18em] text-secondary">{module.category}</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{module.title}</h3>
                  <p className="mt-3 text-slate-600">{module.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <ProgressSummary />
            <div className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold">Aprende hoy</h3>
              <p className="mt-3 text-slate-600">Tema recomendado: Tipos de agujas y su uso en anestesia local.</p>
              <Link href="/modules" className="inline-flex items-center mt-5 rounded-full bg-primary px-5 py-3 text-white shadow-md transition hover:bg-[#125835]">
                Ver módulo
              </Link>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-2 mb-10">
          <article className="rounded-3xl bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm uppercase tracking-[0.22em] text-secondary">Evaluación</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Prueba tus conocimientos</h2>
            <p className="mt-3 text-slate-600">Responde un quiz rápido para reforzar los conceptos prácticos.</p>
            <Link href="/quiz" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-white transition hover:bg-[#125835]">Ir al quiz</Link>
          </article>
          <article className="rounded-3xl bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm uppercase tracking-[0.22em] text-secondary">Memoria visual</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Flashcards educativas</h2>
            <p className="mt-3 text-slate-600">Repasa fichas visuales con términos clave y definiciones fáciles de recordar.</p>
            <Link href="/flashcards" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-white transition hover:bg-[#125835]">Ver flashcards</Link>
          </article>
        </section>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-secondary">Módulos educativos</p>
              <h2 className="text-3xl font-semibold">Contenido estructurado para principiantes</h2>
            </div>
            <Link href="/modules" className="text-primary font-semibold">Ver todos</Link>
          </div>

          <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
            {recommendedModules.map((module) => (
              <ModuleCard key={module.slug} module={module} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

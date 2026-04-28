export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-surface px-4 py-6 md:px-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-secondary">Perfil</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">Ruta de aprendizaje</h1>
              <p className="mt-4 max-w-2xl text-slate-600">Tu progreso, logros y historial clínico están organizados para crecer paso a paso.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 text-slate-700 shadow-soft">
              <p className="text-sm text-slate-500">Nivel actual</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">Residente 1</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Progreso general</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">62%</p>
            <p className="mt-3 text-slate-600">Completa más módulos para desbloquear tu próxima insignia.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Insignias</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">Curioso clínico</li>
              <li className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">Módulo de instrumentación completado</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Historial</p>
            <ol className="mt-4 space-y-3 text-slate-600">
              <li>08 Abr - Quiz de agujas: 90%</li>
              <li>05 Abr - Caso clínico perro: revisión</li>
              <li>01 Abr - Módulo de sondas: completado</li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}

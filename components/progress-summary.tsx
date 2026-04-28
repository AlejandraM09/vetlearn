export function ProgressSummary() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-secondary">Seguimiento</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">Progreso mensual</h3>
        </div>
        <div className="rounded-full bg-primary/10 px-4 py-2 text-primary">Top 5%</div>
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <span>Casos completados</span>
        <span>6 / 8</span>
      </div>
    </div>
  );
}

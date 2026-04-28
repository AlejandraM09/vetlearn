interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = 'Buscar...' }: SearchBarProps) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Buscar</span>
      <input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
    </label>
  );
}

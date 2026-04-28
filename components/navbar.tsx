import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold text-slate-900">Clinical Curator Vet</Link>
          <Link href="/search" className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary transition hover:bg-primary/20 md:hidden">Buscar</Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex text-slate-700">
          <Link href="/">Inicio</Link>
          <Link href="/modules">Módulos</Link>
          <Link href="/physiology">Parámetros</Link>
          <Link href="/cases">Casos</Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/flashcards">Flashcards</Link>
          <Link href="/profile">Perfil</Link>
        </nav>
      </div>
    </header>
  );
}

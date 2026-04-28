// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <span className="text-6xl block mb-4">🐾</span>
        <h1 className="font-display text-3xl font-semibold text-gray-900 mb-2">Página no encontrada</h1>
        <p className="text-gray-500 mb-6">El contenido que buscas no existe o fue movido.</p>
        <Link href="/dashboard" className="btn-primary inline-flex">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
